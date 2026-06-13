'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WISHLIST_KEY = 'veeandcee_wishlist'
const RECENT_KEY = 'veeandcee_recently_viewed'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_KEY)
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist))

      const savedRecent = localStorage.getItem(RECENT_KEY)
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const toggleWishlistItem = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id || item._id === product._id)
      if (exists) return prev.filter((item) => item.id !== product.id && item._id !== product._id)
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => wishlist.some((item) => item.id === id || item._id === id)

  const trackProductView = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id && item._id !== product._id)
      return [product, ...filtered].slice(0, 10)
    })
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlistItem, isWishlisted, recentlyViewed, trackProductView }}
    >
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