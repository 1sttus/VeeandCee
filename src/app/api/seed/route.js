import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import User from '@/models/User'
import products from '@/data/products'

const ADMIN_NAME = process.env.ADMIN_NAME || 'V&C Admin Console'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@veeandcee.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'VeeAndCee@2026'

export async function GET(req) {
  try {
    await dbConnect()

    const { searchParams } = new URL(req.url)
    const force = searchParams.get('force') === 'true'

    const existingProductCount = await Product.countDocuments()
    const shouldSeedProducts = force || existingProductCount === 0

    let insertedProducts = []
    if (shouldSeedProducts) {
      if (force) {
        await Product.deleteMany({})
      }

      const productsToInsert = products.map(({ id: _legacyId, ...rest }) => ({
        ...rest,
        category: rest.category?.toLowerCase() || 'makeup',
        discount: rest.discount ?? 0,
        stockQuantity: rest.stockQuantity ?? 15,
        sold: rest.sold ?? 0,
        visible: rest.visible ?? true,
        featured: rest.featured ?? false,
      }))

      insertedProducts = await Product.insertMany(productsToInsert)
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)
    const adminUser = await User.findOneAndUpdate(
      { email: ADMIN_EMAIL.toLowerCase() },
      {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        isAdmin: true,
      },
      { new: true, upsert: true, runValidators: true }
    )

    return NextResponse.json(
      {
        message: shouldSeedProducts
          ? 'Database seeded successfully with products and admin user.'
          : 'Products already exist. Admin user was upserted. Use ?force=true to reseed products.',
        products: {
          inserted: insertedProducts.length,
          skipped: shouldSeedProducts ? 0 : existingProductCount,
        },
        admin: {
          id: adminUser._id.toString(),
          email: adminUser.email,
          isAdmin: adminUser.isAdmin,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seeding database failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
