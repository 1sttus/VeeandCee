import { useState } from 'react'
import { Trash2, Plus, Minus, ArrowRight, TrendingUp } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import MobileNav from '../components/MobileNav'

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Radiant Gold Serum',
      size: '30ML / ARTISAN COLLECTION',
      price: 185.00,
      quantity: 1,
      image: 'https://via.placeholder.com/120x120?text=Serum',
    },
    {
      id: 2,
      name: 'Botanical Cleansing Balm',
      size: '100G / ESSENTIAL RITUAL',
      price: 92.00,
      quantity: 1,
      image: 'https://via.placeholder.com/120x120?text=Balm',
    },
  ])

  const recommendedProducts = [
    {
      id: 10,
      name: 'Ritual Sleep Mist',
      description: 'Enchanting sleep mist',
      price: 45,
      image: 'https://via.placeholder.com/300x300?text=Sleep+Mist',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 11,
      name: 'Quartz Sculptor',
      description: 'Sculpting tool',
      price: 68,
      image: 'https://via.placeholder.com/300x300?text=Quartz',
      rating: 4.7,
      reviews: 98,
    },
  ]

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const tax = subtotal * 0.083
  const total = subtotal + shipping + tax

  return (
    <div className="pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold text-brown mb-2">Your Cart</h1>
        <p className="text-charcoal/70 mb-12">Refined rituals, carefully curated.</p>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal/70 mb-6">Your cart is empty</p>
            <a href="/shop/skincare" className="inline-flex items-center gap-2 bg-brown text-white font-semibold py-3 px-8 rounded-lg btn-hover transition-colors">
              Continue Shopping <ArrowRight size={20} />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border border-brown/10">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-brown mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-charcoal/60 mb-3 uppercase">
                        {item.size}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-brown/20 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-brown/5 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium border-l border-r border-brown/10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-brown/5 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:text-rose text-charcoal/60 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-serif font-bold text-brown text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <p className="text-xs text-charcoal/60">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Notice */}
              <div className="mt-6 p-4 bg-gold/10 border-l-4 border-gold rounded-lg">
                <p className="text-sm text-brown font-semibold mb-1">✓ Complimentary Express Shipping</p>
                <p className="text-xs text-charcoal/70">Estimated arrival: Oct 12 - Oct 14</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-brown/10 sticky top-24">
                <h3 className="font-serif font-bold text-brown text-lg mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-brown/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Subtotal</span>
                    <span className="font-medium text-charcoal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Shipping</span>
                    <span className="font-medium text-gold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">VAX Included</span>
                    <span className="font-medium text-charcoal">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-lg text-brown">Total</span>
                  <span className="font-serif font-bold text-2xl text-brown">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-gold hover:bg-gold/90 text-brown font-bold py-3 rounded-lg btn-hover transition-colors mb-3 uppercase text-sm">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-charcoal/60 text-center">
                  Secure transaction encrypted via V&C Guard.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-charcoal/70">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal/70">
                  <span>✓</span>
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal/70">
                  <span>✓</span>
                  <span>Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complete the Ritual Section */}
        {cartItems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-brown mb-8">Complete the Ritual</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <MobileNav />
    </div>
  )
}
