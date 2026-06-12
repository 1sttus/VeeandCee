import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (!searchTerm.trim()) return
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    setSearchTerm('')
    setIsSearchOpen(false)
    setIsMenuOpen(false)
  }

  const menuItems = [
    { label: 'Skincare', href: '/shop/skincare' },
    { label: 'Makeup', href: '/shop/makeup' },
    { label: 'Body', href: '/shop/body' },
    { label: 'Hair', href: '/shop/hair' },
    { label: 'Fragrance', href: '/shop/fragrance' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-serif font-bold text-brown">VeeandCee</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-charcoal hover:text-brown transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen((open) => !open)}
              className="p-2 hover:bg-brown/5 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-charcoal" />
            </button>
            <button
              onClick={() => navigate('/wishlist')}
              className="p-2 hover:bg-brown/5 rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-charcoal" />
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="p-2 hover:bg-brown/5 rounded-lg transition-colors" aria-label="Account">
                  <User size={20} className="text-charcoal" />
                </Link>
                <button onClick={logout} className="text-sm text-charcoal hover:text-brown">Log out</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm text-charcoal hover:text-brown">Sign in</Link>
                <Link to="/signup" className="text-sm text-brown font-medium">Create account</Link>
              </div>
            )}
            <Link to="/cart" className="p-2 hover:bg-brown/5 rounded-lg transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} className="text-charcoal" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-brown/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center justify-end mt-4 space-x-3">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products, gift sets, FAQs..."
              className="w-full max-w-sm rounded-full border border-brown/20 bg-white px-4 py-2 text-sm text-charcoal focus:outline-none focus:border-brown"
            />
            <button
              type="submit"
              className="rounded-full bg-brown px-5 py-2 text-sm text-white hover:bg-dark-brown transition-colors"
            >
              Go
            </button>
          </form>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-2 text-sm font-medium text-charcoal hover:bg-brown/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 border-t mt-2">
              {user ? (
                <div className="space-y-2">
                  <Link to="/account" className="block text-charcoal">Account</Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false) }} className="block text-left text-charcoal">Log out</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" className="block text-charcoal">Sign in</Link>
                  <Link to="/signup" className="block text-brown font-medium">Create account</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
