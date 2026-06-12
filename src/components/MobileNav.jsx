import { Link } from 'react-router-dom'
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react'

export default function MobileNav() {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingBag, label: 'Shop', href: '/shop' },
    { icon: ShoppingCart, label: 'Cart List', href: '/cart' },
    { icon: User, label: 'Profile', href: '/account' },
  ]

  return (
    <nav className="md:hidden fixed inset-x-4 bottom-4 rounded-3xl bg-white border border-brown/10 shadow-2xl z-50 backdrop-blur-sm">
      <div className="flex justify-around items-center h-20 px-4">
        {navItems.map(item => (
          <Link
            key={item.label}
            to={item.href}
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-cream transition-colors group"
            aria-label={item.label}
          >
            <item.icon size={24} className="text-charcoal group-hover:text-brown transition-colors" />
            <span className="text-xs text-charcoal group-hover:text-brown transition-colors font-medium">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
