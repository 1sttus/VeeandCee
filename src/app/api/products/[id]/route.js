import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { verifyToken } from '@/lib/auth'

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const { id } = params

    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const obj = product.toObject()
    return NextResponse.json(
      {
        ...obj,
        id: obj._id.toString(),
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect()
    const { id } = params

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const body = await req.json()
    
    // Normalize data if category is updated
    if (body.category) {
      body.category = body.category.toLowerCase()
    }

    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const obj = product.toObject()
    return NextResponse.json(
      {
        ...obj,
        id: obj._id.toString(),
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect()
    const { id } = params

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
