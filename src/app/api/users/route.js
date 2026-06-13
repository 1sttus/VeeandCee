import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Order from '@/models/Order'
import { verifyToken } from '@/lib/auth'

export async function GET(req) {
  try {
    await dbConnect()

    const user = verifyToken(req)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 403 })
    }

    const dbUsers = await User.find({ isAdmin: false }).select('-password')

    // Enhance users data with statistics (total orders, lifetime spending)
    const enhancedUsers = await Promise.all(
      dbUsers.map(async (u) => {
        const userOrders = await Order.find({ email: u.email })
        const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0)

        const obj = u.toObject()
        return {
          ...obj,
          id: obj._id.toString(),
          orders: userOrders.length,
          lifetimeValue: totalSpent,
        }
      })
    )

    return NextResponse.json(enhancedUsers, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
