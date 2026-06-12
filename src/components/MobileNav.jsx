import { Link } from 'react-router-dom'
import { Home, ShoppingBag, Heart, MessageSquare, User } from 'lucide-react'

export default function MobileNav() {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingBag, label: 'Shop', href: '/shop' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MessageSquare, label: 'Chat', href: '/chat' },
    { icon: User, label: 'Profile', href: '/account' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brown/10 z-40">
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
