import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { serializeUser, signToken } from '@/lib/auth'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@veeandcee.com'

export async function POST(req) {
  try {
    await dbConnect()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await User.findOne({ email: email.toLowerCase(), isAdmin: true })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid administrative credentials. Access denied.' },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch || user.email !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid administrative credentials. Access denied.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        token: signToken(user),
        user: serializeUser(user),
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
