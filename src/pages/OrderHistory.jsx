import { useMemo } from 'react'
import { useOrders } from '../context/OrderContext'

export default function OrderHistory() {
  const { orders } = useOrders()

  const groupedOrders = useMemo(() => orders, [orders])

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">Order history</p>
          <h1 className="text-4xl font-serif font-bold text-brown mt-3">Your past rituals</h1>
          <p className="text-sm text-charcoal/70 mt-3">Review your completed, processing, and upcoming orders from the Vee & Cee experience.</p>
        </div>

        {groupedOrders.length ? (
          <div className="space-y-6">
            {groupedOrders.map((order) => (
              <div key={order.id} className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-charcoal/60">Order ID</p>
                    <h2 className="text-xl font-semibold text-brown">{order.id}</h2>
                  </div>
                  <div className="rounded-full bg-gold/10 px-4 py-2 text-sm font-semibold text-brown">{order.status}</div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.6fr]">
                  <div className="space-y-3">
                    {order.products.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 rounded-3xl border border-brown/10 bg-cream/80 p-4">
                        <img className="h-16 w-16 rounded-3xl object-cover" src={item.image} alt={item.name} loading="lazy" />
                        <div>
                          <p className="font-semibold text-charcoal">{item.name}</p>
                          <p className="text-sm text-charcoal/60">Qty {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[2rem] border border-brown/10 bg-cream/75 p-4 text-sm text-charcoal/80">
                    <p className="mb-2 font-semibold text-charcoal">Summary</p>
                    <div className="flex justify-between mb-2"><span>Items</span><span>{order.quantity}</span></div>
                    <div className="flex justify-between mb-2"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between mb-2"><span>Delivery</span><span>${order.deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between font-semibold"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
                    <p className="mt-4 text-xs text-charcoal/60">Ordered on {order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/30 bg-cream/90 p-10 text-center shadow-xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-brown mb-3">No orders yet</h2>
            <p className="text-sm text-charcoal/70">Start your first luxury ritual and it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
