'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from './AuthContext'

const CART_KEY = 'veeandcee_cart'
const DELIVERY_FEE = 0
const DEFAULT_TOAST_DURATION = 2800

const CartContext = createContext(null)

function getInitialCart() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

function normalizeProduct(product) {
  const normalized = {
    ...product,
    stockQuantity: Number(product.stockQuantity ?? 15),
    quantitySold: Number(product.quantitySold ?? 0),
    featured: Boolean(product.featured),
    soldOut: Number(product.stockQuantity ?? 15) <= 0,
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return normalized
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [toast, setToast] = useState(null)
  const [cartPulse, setCartPulse] = useState(false)
  const [flyState, setFlyState] = useState(null)
  const cartIconRef = useRef(null)
  const toastTimer = useRef(null)
  const isInitialMount = useRef(true)

  // 1. Initial cart load (from localStorage or MongoDB depending on user status)
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('veeandcee_token')
          const response = await fetch('/api/user/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const data = await response.json()
            setCartItems(data)
            return
          }
        } catch (err) {
          console.error('Failed to load cart from database:', err)
        }
      }

      // Fallback/guest load from localStorage
      setCartItems(getInitialCart())
    }

    loadCart()
  }, [user])

  // 2. Sync cart to localStorage and optionally to MongoDB when updated
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))

    const syncCart = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('veeandcee_token')
          await fetch('/api/user/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cart: cartItems }),
          })
        } catch (err) {
          console.error('Failed to sync cart to database:', err)
        }
      }
    }

    const timer = setTimeout(syncCart, 500)
    return () => clearTimeout(timer)
  }, [cartItems, user])

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0)
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const total = subtotal + DELIVERY_FEE
    return {
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      itemCount,
    }
  }, [cartItems])

  const calculateTotals = () => {
    return totals
  }

  const showToast = (message) => {
    setToast(message)
    setCartPulse(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), DEFAULT_TOAST_DURATION)
    window.setTimeout(() => setCartPulse(false), 350)
  }

  const triggerFlyAnimation = (originRect, product) => {
    if (!originRect) return
    const cartIconRect = cartIconRef.current?.getBoundingClientRect()
    const targetCoords = cartIconRect
      ? { x: cartIconRect.left + cartIconRect.width / 2, y: cartIconRect.top + cartIconRect.height / 2 }
      : { x: typeof window !== 'undefined' ? window.innerWidth - 40 : 1000, y: 40 }

    setFlyState({
      id: `${product.id || product._id}-${Date.now()}`,
      product,
      start: {
        x: originRect.left + originRect.width / 2,
        y: originRect.top + originRect.height / 2,
      },
      target: targetCoords,
    })
  }

  const addToCart = (product, quantity = 1, event) => {
    const normalized = normalizeProduct(product)

    if (normalized.soldOut) {
      showToast('This product is sold out.')
      return
    }

    const currentRect = event?.currentTarget?.getBoundingClientRect()
    if (currentRect) {
      triggerFlyAnimation(currentRect, normalized)
    }

    setCartItems((current) => {
      const existing = current.find((item) => item.id === normalized.id || item._id === normalized._id)
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, normalized.stockQuantity)
        return current.map((item) =>
          item.id === existing.id || item._id === existing._id ? { ...item, quantity: newQty } : item
        )
      }
      return [...current, { ...normalized, quantity: Math.min(quantity, normalized.stockQuantity) }]
    })

    showToast(`${normalized.name} added to cart.`)
  }

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id && item._id !== id))
    showToast('Product removed from cart.')
  }

  const increaseQuantity = (id) => {
    setCartItems((current) =>
      current.map((item) => {
        if (item.id !== id && item._id !== id) return item
        const nextQty = Math.min(item.quantity + 1, item.stockQuantity)
        return { ...item, quantity: nextQty }
      })
    )
  }

  const decreaseQuantity = (id) => {
    setCartItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id && item._id !== id) return item
        const nextQty = Math.max(item.quantity - 1, 0)
        return nextQty > 0 ? { ...item, quantity: nextQty } : []
      })
    )
  }

  const clearCart = () => {
    setCartItems([])
    showToast('Cart cleared.')
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        calculateTotals,
        totals,
        cartCount: totals.itemCount,
        cartPulse,
        toast,
        cartIconRef,
      }}
    >
      {children}
      <AnimatePresence>
        {flyState && (
          <motion.div
            key={flyState.id}
            className="pointer-events-none fixed z-50 h-10 w-10 rounded-full bg-gold/90 shadow-xl border border-white"
            initial={{ x: flyState.start.x, y: flyState.start.y, opacity: 1, scale: 1 }}
            animate={{ x: flyState.target.x, y: flyState.target.y, scale: [1, 1.3, 0.4], opacity: [1, 0.8, 0] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onAnimationComplete={() => setFlyState(null)}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed right-4 bottom-4 z-50 rounded-3xl bg-brown/95 px-5 py-4 text-sm text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export default CartContext
