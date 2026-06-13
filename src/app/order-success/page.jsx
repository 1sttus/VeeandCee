'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useOrders } from '@/context/OrderContext'

function OrderSuccessInner() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const { getOrderById } = useOrders()
  const order = getOrderById(orderId)

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mx-auto mb-10 max-w-2xl rounded-[2rem] border border-white/30 bg-white/90 p-10 shadow-2xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-charcoal/50 mb-4">Order confirmed</p>
          <h1 className="text-4xl font-serif font-bold text-brown mb-4">Thank you for your ritual</h1>
          <p className="text-sm text-charcoal/70 mb-8">
            Your order is being prepared for premium delivery. You will receive a confirmation email with tracking
            details.
          </p>
          <div className="rounded-3xl bg-cream/90 border border-brown/10 p-6 text-left text-sm text-charcoal/75">
            <p className="font-semibold text-charcoal mb-2">Order ID</p>
            <p className="mb-4 text-lg text-brown">{order?.id || orderId || 'Unavailable'}</p>
            <p className="mb-2">
              {order ? `Order total: $${Number(order.total || 0).toFixed(2)}` : ''}
            </p>
            <p className="mb-2">
              {order ? `Items: ${order.items?.length || 0}` : ''}
            </p>
            <p>{order ? `Status: ${order.status}` : 'Order details will appear in your order history.'}</p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white hover:bg-dark-brown transition-colors"
            >
              Continue shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-brown/20 bg-cream px-8 py-3 text-sm font-semibold text-charcoal hover:bg-brown/5 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={
      <div className="pb-24 md:pb-0 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mx-auto mb-10 max-w-2xl rounded-[2rem] border border-white/30 bg-white/90 p-10 shadow-2xl backdrop-blur-xl animate-pulse">
            <div className="h-6 w-32 bg-slate-200 rounded mx-auto mb-4" />
            <div className="h-10 w-80 bg-slate-200 rounded mx-auto mb-4" />
          </div>
        </div>
      </div>
    }>
      <OrderSuccessInner />
    </Suspense>
  )
}
