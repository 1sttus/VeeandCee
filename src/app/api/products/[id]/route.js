import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { verifyToken } from '@/lib/auth'
import mongoose from 'mongoose'

const getRouteId = async (params) => {
  const resolvedParams = await params
  return resolvedParams?.id
}

const findProductByRouteId = (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null
  return Product.findById(id)
}

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const id = await getRouteId(params)

    const product = await findProductByRouteId(id)
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
    const id = await getRouteId(params)

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const body = await req.json()
    
    // Normalize data if category is updated
    if (body.category) {
      body.category = body.category.toLowerCase()
    }

    const product = id && mongoose.Types.ObjectId.isValid(id)
      ? await Product.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
      : null

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
    const id = await getRouteId(params)

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const product = id && mongoose.Types.ObjectId.isValid(id)
      ? await Product.findByIdAndDelete(id)
      : null
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
