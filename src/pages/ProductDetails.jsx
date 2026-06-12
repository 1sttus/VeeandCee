import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'
import TestimonialCard from '../components/TestimonialCard'
import MobileNav from '../components/MobileNav'
import products from '../data/products'

export default function ProductDetails() {
  const { id } = useParams()
  const { wishlist, toggleWishlistItem } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [expandedSection, setExpandedSection] = useState(null)

  const product = useMemo(
    () => products.find((item) => item.id.toString() === id) || products[0],
    [id]
  )

  const isWishlisted = wishlist.some((item) => item.id === product.id)

  const relatedProducts = useMemo(
    () => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3),
    [product]
  )

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-gold">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">
            {i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    )
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-charcoal/60 mb-8 flex flex-wrap gap-2">
          <Link to="/" className="hover:text-brown">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brown">Shop</Link>
          <span>/</span>
          <span className="text-brown font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="product-image-container aspect-square bg-cream rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 min-w-0">
            <div>
              <h1 className="text-4xl font-serif font-bold text-brown mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-medium text-charcoal/70">
                    {product.reviews} reviews
                  </span>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  {product.category}
                </span>
              </div>
            </div>

            <p className="text-charcoal/80 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="border-t border-b border-brown/10 py-6">
              <div className="text-4xl font-serif font-bold text-brown mb-2">
                ${product.price}
              </div>
              <p className="text-sm text-green-600 font-medium">✓ In Stock</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-charcoal">Quantity:</span>
                <div className="flex items-center border border-brown/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-brown/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r border-brown/10 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-brown/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="w-full bg-brown hover:bg-dark-brown text-white font-semibold py-3 rounded-lg btn-hover transition-colors">
                Add to Cart
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => toggleWishlistItem(product)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                    isWishlisted ? 'bg-rose/10 border-rose text-rose' : 'border-brown/20 hover:bg-brown/5 text-charcoal'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : 'text-charcoal'} />
                  <span className="font-medium text-sm">{isWishlisted ? 'Saved to wishlist' : 'Add to wishlist'}</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-brown/20 hover:bg-brown/5 transition-colors text-charcoal">
                  <Share2 size={20} />
                  <span className="font-medium text-sm">Share</span>
                </button>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-sm text-brown font-semibold mb-1">✓ Complimentary Express Shipping</p>
              <p className="text-xs text-charcoal/70">Estimated Delivery: 2-3 business days</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-16">
          <button
            onClick={() => toggleSection('ingredients')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">Ingredients</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'ingredients' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'ingredients' && (
            <div className="p-4 bg-cream/30 rounded-lg space-y-2 text-charcoal/80">
              <p>Rosehip Oil: rich in Vitamin A and C helps smooth and brighten.</p>
              <p>Niacinamide: reduces the appearance of pores and evens skin tone.</p>
              <p>Hyaluronic Acid: multi-weight hydration for plump, soft skin.</p>
            </div>
          )}

          <button
            onClick={() => toggleSection('usage')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">How to Use</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'usage' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'usage' && (
            <div className="p-4 bg-cream/30 rounded-lg text-sm text-charcoal/80">
              <p className="mb-3">Apply 2-3 drops to clean, damp skin in the morning and evening. Press gently into skin until fully absorbed.</p>
              <p>Layer with your favorite moisturizer and use nightly for a luminous, balanced finish.</p>
            </div>
          )}

          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">Shipping & Returns</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'shipping' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'shipping' && (
            <div className="p-4 bg-cream/30 rounded-lg text-sm text-charcoal/80 space-y-2">
              <p><strong>Express Shipping:</strong> Free on all orders.</p>
              <p><strong>Returns:</strong> 30-day return window for unopened or gently used products.</p>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-brown mb-8">Complete the Ritual</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      <MobileNav />
    </div>
  )
}
