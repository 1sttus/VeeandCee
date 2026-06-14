'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileNav from '@/context/MobileNav'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { OrderProvider } from '@/context/OrderContext'

export default function LayoutClient({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <div className="flex flex-col min-h-screen bg-cream overflow-x-hidden">
              {!isAdminRoute && <Navbar />}
              <main className={isAdminRoute ? '' : 'flex-grow'}>{children}</main>
              {!isAdminRoute && <Footer />}
              {!isAdminRoute && <MobileNav />}
            </div>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
