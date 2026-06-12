import { createContext, useContext, useEffect, useState } from 'react'

const WISHLIST_KEY = 'veeandcee_wishlist'
const RECENTLY_VIEWED_KEY = 'veeandcee_recently_viewed'

const WishlistContext = createContext(null)

function getLocalStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => getLocalStorage(WISHLIST_KEY, []))
  const [recentlyViewed, setRecentlyViewed] = useState(() => getLocalStorage(RECENTLY_VIEWED_KEY, []))

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToWishlist = (product) => {
    setWishlist((current) => {
      if (current.some((item) => item.id === product.id)) return current
      return [...current, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist((current) => current.filter((item) => item.id !== id))
  }

  const toggleWishlistItem = (product) => {
    setWishlist((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current.filter((item) => item.id !== product.id)
      }
      return [...current, product]
    })
  }

  const isWishlisted = (id) => wishlist.some((item) => item.id === id)

  const trackProductView = (product) => {
    if (!product || !product.id) return
    setRecentlyViewed((current) => {
      const updated = [product, ...current.filter((item) => item.id !== product.id)]
      return updated.slice(0, 10)
    })
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlistItem, isWishlisted, recentlyViewed, trackProductView }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}

export default WishlistContext
