import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { verifyToken } from '@/lib/auth'

export async function PUT(req, { params }) {
  try {
    await dbConnect()
    const { id } = params

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const { status } = await req.json()
    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const obj = order.toObject()
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
