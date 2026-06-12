import { createContext, useContext, useState, useEffect } from 'react'

const WISHLIST_KEY = 'veeandcee_wishlist'
const RECENT_KEY = 'veeandcee_recently_viewed'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]')
    } catch { return [] }
  })

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const toggleWishlistItem = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) return prev.filter((item) => item.id !== product.id)
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => wishlist.some((item) => item.id === id)

  const trackProductView = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id)
      return [product, ...filtered].slice(0, 10)
    })
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlistItem, isWishlisted, recentlyViewed, trackProductView }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}

export default WishlistContext