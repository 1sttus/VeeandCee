import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { serializeUser, signToken } from '@/lib/auth'

export async function POST(req) {
  try {
    await dbConnect()

    const { name, email, password, profileImage } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      profileImage: profileImage || '',
      isAdmin: false, // Default is regular user
    })

    await user.save()

    const token = signToken(user)

    return NextResponse.json(
      {
        token,
        user: serializeUser(user),
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
