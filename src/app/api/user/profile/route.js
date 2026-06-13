import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { serializeUser, verifyToken } from '@/lib/auth'

export async function PUT(req) {
  try {
    await dbConnect()

    const tokenUser = verifyToken(req)
    if (!tokenUser) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }

    const { name, profileImage } = await req.json()
    const updates = {}

    if (typeof name === 'string' && name.trim()) {
      updates.name = name.trim()
    }

    if (typeof profileImage === 'string') {
      updates.profileImage = profileImage
    }

    const user = await User.findByIdAndUpdate(tokenUser._id, updates, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: serializeUser(user) }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
