import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import Product from '@/models/Product'
import { verifyToken } from '@/lib/auth'

export async function GET(req) {
  try {
    await dbConnect()

    const user = verifyToken(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }

    let query = {}
    if (!user.isAdmin) {
      // Regular users only see their own orders
      query.email = user.email.toLowerCase()
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    const serializedOrders = orders.map((order) => {
      const obj = order.toObject()
      return {
        ...obj,
        id: obj._id.toString(),
      }
    })

    return NextResponse.json(serializedOrders, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()

    const user = verifyToken(req) // Optional user link
    const body = await req.json()

    const {
      customerName,
      email,
      items,
      subtotal,
      deliveryFee,
      total,
      shippingAddress,
      paymentMethod,
    } = body

    if (!customerName || !email || !items || items.length === 0 || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 })
    }

    // 1. Sanity check: Ensure sufficient stock for all items
    for (const item of items) {
      const dbProduct = await Product.findById(item.product)
      if (!dbProduct) {
        return NextResponse.json({ error: `Product ${item.name} not found in catalog` }, { status: 404 })
      }
      if (dbProduct.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product: ${dbProduct.name}. Available: ${dbProduct.stockQuantity}` },
          { status: 400 }
        )
      }
    }

    // 2. Decrement stock and increment sold count
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stockQuantity: -item.quantity,
          sold: item.quantity,
        },
      })
    }

    // 3. Create the order document
    const orderData = {
      customerName,
      email: email.toLowerCase(),
      items,
      subtotal,
      deliveryFee,
      total,
      shippingAddress,
      paymentMethod,
    }

    if (user && user._id !== 'admin_id_veeandcee') {
      orderData.user = user._id
    }

    const order = new Order(orderData)
    await order.save()

    const obj = order.toObject()
    return NextResponse.json(
      {
        ...obj,
        id: obj._id.toString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
