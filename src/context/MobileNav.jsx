import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, Heart, User, LayoutGrid } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileNav() {
  const { cartCount } = useCart()
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Shop', path: '/shop' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: User, label: 'Profile', path: '/account' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-brown/10 bg-white/80 pb-safe backdrop-blur-xl md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link key={item.label} to={item.path} className="relative flex flex-col items-center gap-1 p-2">
              <item.icon size={20} className={isActive ? 'text-brown' : 'text-charcoal/60'} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-brown' : 'text-charcoal/60'}`}>{item.label}</span>
              
              <AnimatePresence>
                {item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white shadow-sm"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {isActive && (
                <motion.div layoutId="navIndicator" className="absolute -bottom-1 h-1 w-1 rounded-full bg-brown" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}