'use client'

import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import ProductCard from '@/components/ProductCard'

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotals } = useCart()
  const { wishlist } = useWishlist()
  const router = useRouter()
  const totals = calculateTotals()

  if (!cartItems.length) {
    return (
      <div className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mx-auto mb-8 max-w-2xl rounded-[2rem] border border-white/30 bg-white/90 p-12 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 h-40 w-40 mx-auto rounded-full bg-gradient-to-br from-gold/30 via-white/60 to-cream flex items-center justify-center shadow-inner">
              <span className="text-4xl font-serif text-brown">♡</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-brown mb-4">Your cart awaits</h1>
            <p className="text-sm text-charcoal/70 mb-8">
              Every luxury ritual begins with your favorite essentials. Add a product to continue.
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="inline-flex items-center gap-2 rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white hover:bg-dark-brown transition-colors"
            >
              Continue shopping <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brown">Your Cart</h1>
            <p className="text-sm text-charcoal/70">Refined rituals, carefully curated.</p>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-brown hover:bg-gold/90 transition-colors"
          >
            Proceed to checkout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemId = item.id || item._id
              return (
                <div
                  key={itemId}
                  className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-3xl object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-charcoal">{item.name}</p>
                        <p className="text-sm text-charcoal/60">{item.category}</p>
                        {item.soldOut && (
                          <span className="mt-2 inline-flex rounded-full bg-rose/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose">
                            Sold Out
                          </span>
                        )}
                        {!item.soldOut && item.stockQuantity <= 5 && (
                          <span className="mt-2 inline-flex rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:items-end">
                      <div className="flex items-center gap-2 rounded-full border border-brown/10 bg-cream px-3 py-2 text-sm text-charcoal">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(itemId)}
                          className="rounded-full p-1 hover:bg-brown/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-[2rem] text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(itemId)}
                          className="rounded-full p-1 hover:bg-brown/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(itemId)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/10 px-4 py-2 text-xs font-semibold text-rose transition hover:bg-rose/20"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 text-sm text-charcoal/70">
                    <span>Price per item</span>
                    <span>${(item.price || 0).toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4 text-base font-semibold text-charcoal">
                    <span>Total</span>
                    <span>${((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-brown mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${totals.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-charcoal">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="mt-6 w-full rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white hover:bg-dark-brown transition-colors"
              >
                Checkout now
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/30 bg-cream/90 p-6 shadow-xl backdrop-blur-xl text-sm text-charcoal/70">
              <p className="font-semibold text-brown mb-3">Shipping details</p>
              <p>Complimentary express delivery and premium packaging are included with your order.</p>
            </div>
          </aside>
        </div>

        {wishlist.length > 0 && (
          <section className="mt-16">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-brown">Saved for Later</h2>
                <p className="text-sm text-charcoal/70">Wishlist items you may want to add before checkout.</p>
              </div>
              <span className="text-sm text-charcoal/70">{wishlist.length} items saved</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
