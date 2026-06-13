// src/app/api/admin/clear-products/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req) {
  try {
    await dbConnect();
    const user = verifyToken(req);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    await Product.deleteMany({});
    return NextResponse.json({ message: 'All products cleared' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
