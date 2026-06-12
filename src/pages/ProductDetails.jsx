import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import MobileNav from '../components/MobileNav'
import products from '../data/products'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { toggleWishlistItem, isWishlisted, trackProductView } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [expandedSection, setExpandedSection] = useState(null)

  const product = useMemo(
    () => products.find((item) => item.id.toString() === id) || products[0],
    [id]
  )

  useEffect(() => {
    trackProductView(product)
  }, [product, trackProductView])

  const wishlisted = isWishlisted(product.id)
  const soldOut = product.stockQuantity <= 0
  const lowStock = !soldOut && product.stockQuantity <= 5

  const relatedProducts = useMemo(
    () => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3),
    [product]
  )

  const renderStars = (rating) => (
    <div className="flex gap-0.5 text-gold" aria-label={`Rating ${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-lg">{i < Math.floor(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  )

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
            <div className="aspect-square rounded-[2rem] bg-cream overflow-hidden">
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
              <h1 className="text-4xl font-serif font-bold text-brown mb-2">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">{renderStars(product.rating)}<span className="text-sm font-medium text-charcoal/70">{product.reviews} reviews</span></div>
                <span className="rounded-full bg-cream px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold font-semibold">{product.category}</span>
              </div>
            </div>

            <p className="text-charcoal/80 leading-relaxed">{product.description}</p>

            <div className="rounded-[2rem] border border-brown/10 bg-white/90 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-charcoal/60">Price</p>
                  <p className="text-4xl font-serif font-bold text-brown">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal/60">Stock</p>
                  <p className={`font-semibold ${soldOut ? 'text-rose' : lowStock ? 'text-gold' : 'text-emerald-700'}`}>
                    {soldOut ? 'Sold out' : lowStock ? 'Low stock' : `${product.stockQuantity} available`}
                  </p>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal/50">{product.soldOut ? 'Unavailable for checkout' : 'Luxury shipping included'}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-charcoal">Quantity</span>
                <div className="flex items-center border border-brown/20 rounded-full overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-brown/5 transition-colors"
                    aria-label="Decrease quantity"
                  >-
                  </button>
                  <span className="px-5 py-3 text-sm font-semibold text-charcoal">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stockQuantity || prev + 1))}
                    className="px-4 py-3 hover:bg-brown/5 transition-colors"
                    aria-label="Increase quantity"
                  >+
                  </button>
                </div>
              </div>

              <button
                type="button"
                disabled={soldOut}
                onClick={(event) => addToCart(product, quantity, event)}
                className={`w-full rounded-full px-4 py-4 text-sm font-semibold text-white transition ${soldOut ? 'bg-slate-300 cursor-not-allowed' : 'bg-brown hover:bg-dark-brown'}`}
              >
                {soldOut ? 'Sold out' : 'Add to cart'}
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => toggleWishlistItem(product)}
                  className={`flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${wishlisted ? 'border-rose bg-rose/10 text-rose' : 'border-brown/20 bg-white text-charcoal hover:bg-brown/5'}`}
                >
                  <Heart size={20} className={wishlisted ? 'fill-rose text-rose' : 'text-charcoal'} />
                  {wishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
                </button>
                <Link to="/compare" className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/20 bg-white px-4 py-3 text-sm font-semibold text-charcoal hover:bg-brown/5 transition-colors">
                  <Share2 size={20} className="text-charcoal" />
                  Compare products
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gold/20 bg-gold/10 p-5 text-sm text-charcoal/80">
              <p className="font-semibold text-brown mb-2">Complimentary Luxe Delivery</p>
              <p>Premium packaging and expedited shipping are included with every order.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-16">
          <button
            type="button"
            onClick={() => toggleSection('benefits')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-3xl hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown">Benefits</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'benefits' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'benefits' && (
            <div className="p-4 bg-cream/30 rounded-3xl text-charcoal/80">
              <p>{product.benefits?.join(' ') || 'Reviving, smoothing, and illuminating botanical benefits for an elevated ritual.'}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => toggleSection('ingredients')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-3xl hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown">Ingredients</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'ingredients' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'ingredients' && (
            <div className="p-4 bg-cream/30 rounded-3xl text-charcoal/80">
              <p>{product.ingredients?.join(', ') || 'Luxury botanicals, nourishing oils, and skin-enhancing actives.'}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-3xl hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown">Shipping & Returns</span>
            <ChevronDown size={20} className={`transition-transform ${expandedSection === 'shipping' ? '' : '-rotate-90'}`} />
          </button>
          {expandedSection === 'shipping' && (
            <div className="p-4 bg-cream/30 rounded-3xl text-charcoal/80 space-y-2">
              <p><strong>Express Shipping:</strong> Free on all orders.</p>
              <p><strong>Returns:</strong> 30-day window for unopened or gently used products.</p>
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
