import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { verifyToken } from '@/lib/auth'

export async function GET(req) {
  try {
    await dbConnect()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const q = searchParams.get('q')
    const showAll = searchParams.get('all') === 'true'

    const query = {}
    if (!showAll) {
      query.visible = true
    }

    if (category && category.toLowerCase() !== 'all') {
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-')
      query.category = { $regex: new RegExp(`^${normalizedCategory}$`, 'i') }
    }

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ]
    }

    const products = await Product.find(query).sort({ createdAt: -1 })

    const serializedProducts = products.map((product) => {
      const obj = product.toObject()
      return {
        ...obj,
        id: obj._id.toString(),
      }
    })

    return NextResponse.json(serializedProducts, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const body = await req.json()
    
    // Normalize properties
    const productData = {
      ...body,
      category: body.category?.toLowerCase() || 'makeup',
    }

    const product = new Product(productData)
    await product.save()

    const obj = product.toObject()
    return NextResponse.json(
      {
        ...obj,
        id: obj._id.toString(),
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
