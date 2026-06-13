import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'

export async function GET(req) {
  try {
    await dbConnect()

    const tokenUser = verifyToken(req)
    if (!tokenUser) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }

    const dbUser = await User.findById(tokenUser._id).populate('cart.product')
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Map cart array to include details expected by the frontend
    const cartItems = dbUser.cart
      .map((item) => {
        if (!item.product) return null
        const productObj = item.product.toObject()
        return {
          ...productObj,
          id: productObj._id.toString(),
          quantity: item.quantity,
        }
      })
      .filter(Boolean)

    return NextResponse.json(cartItems, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()

    const tokenUser = verifyToken(req)
    if (!tokenUser) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }

    const { cart } = await req.json()
    if (!cart) {
      return NextResponse.json({ error: 'Cart content is required' }, { status: 400 })
    }

    // Map items from client `{ id, quantity }` to schema format `{ product: ObjectId, quantity }`
    const mappedCart = cart.map((item) => ({
      product: item.id || item.product,
      quantity: item.quantity,
    }))

    const dbUser = await User.findByIdAndUpdate(
      tokenUser._id,
      { cart: mappedCart },
      { new: true }
    )

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Cart synced successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
