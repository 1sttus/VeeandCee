import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'

export default function Checkout() {
  const { cartItems, calculateTotals, clearCart } = useCart()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const totals = useMemo(() => calculateTotals(), [calculateTotals, cartItems])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!cartItems.length) return

    setLoading(true)
    const order = {
      id: `VC-${Date.now()}`,
      products: cartItems,
      quantity: totals.itemCount,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
    }

    setTimeout(() => {
      addOrder(order)
      clearCart()
      setLoading(false)
      navigate('/order-success', { state: { orderId: order.id } })
    }, 600)
  }

  if (!cartItems.length) {
    return (
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-brown mb-4">Your cart is empty</h1>
          <p className="text-charcoal/70 mb-8">Add your ritual essentials first before checkout.</p>
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white hover:bg-dark-brown transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/30 bg-white/90 p-8 shadow-xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50 mb-3">Checkout</p>
              <h1 className="text-4xl font-serif font-bold text-brown mb-4">Complete your ritual</h1>
              <p className="text-sm text-charcoal/70">Securely confirm your order and personalize the delivery details.</p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/30 bg-cream/90 p-8 shadow-xl backdrop-blur-xl">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-charcoal">
                  Full name
                  <input required className="w-full rounded-3xl border border-brown/20 bg-white px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
                <label className="space-y-2 text-sm text-charcoal">
                  Email address
                  <input type="email" required className="w-full rounded-3xl border border-brown/20 bg-white px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
                <label className="space-y-2 text-sm text-charcoal md:col-span-2">
                  Shipping address
                  <input required className="w-full rounded-3xl border border-brown/20 bg-white px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
                <label className="space-y-2 text-sm text-charcoal">
                  City
                  <input required className="w-full rounded-3xl border border-brown/20 bg-white px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
                <label className="space-y-2 text-sm text-charcoal">
                  Postal code
                  <input required className="w-full rounded-3xl border border-brown/20 bg-white px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
              </div>

              <div className="mt-8 rounded-[2rem] border border-brown/10 bg-white p-6">
                <h2 className="text-lg font-semibold text-brown mb-4">Payment summary</h2>
                <div className="space-y-3 text-sm text-charcoal/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span>${totals.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-charcoal">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="mt-8 w-full rounded-full bg-brown px-6 py-4 text-base font-semibold text-white shadow-xl hover:bg-dark-brown transition-colors disabled:opacity-60">
                {loading ? 'Processing order...' : 'Place order securely'}
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-brown mb-4">Order snapshot</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" loading="lazy" />
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal">{item.name}</p>
                      <p className="text-sm text-charcoal/60">Qty {item.quantity}</p>
                    </div>
                    <span className="font-medium text-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/30 bg-cream/90 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="font-semibold text-brown mb-3">Why Vee & Cee?</h3>
              <ul className="space-y-3 text-sm text-charcoal/70">
                <li>• Premium packaging with sustainable luxury.</li>
                <li>• Fast delivery and complimentary express service.</li>
                <li>• 30-day return policy on ritual essentials.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
