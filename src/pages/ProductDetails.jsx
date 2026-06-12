import { useState } from 'react'
import { ShoppingCart, Heart, Share2, ChevronDown } from 'lucide-react'
import ReviewCard from '../components/ReviewCard'
import ProductCard from '../components/ProductCard'
import TestimonialCard from '../components/TestimonialCard'
import MobileNav from '../components/MobileNav'

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)

  // Mock product data
  const product = {
    id: 1,
    name: 'Luminaire Restorative Serum',
    rating: 4.8,
    reviews: 324,
    price: 128.0,
    images: [
      'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522336572468-17ff1b91a8dd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523381217340-3f3e0f63052b?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'A potent, lightweight serum designed to awaken your skin\'s natural brilliance. Formulated with rare botanical extracts and a triple-peptide complex to visibly firm, brighten, and deeply hydrate.',
    benefits: [
      { icon: '✨', label: 'Brightening' },
      { icon: '💧', label: 'Deep Hydration' },
      { icon: '🛡️', label: 'Protection' },
    ],
    ingredients: [
      'Rosehip Oil: Rich in Vitamin A and C to encourage cell turnover.',
      'Niacinamide: Visibly improves enlarged pores and uneven skin tone.',
      'Hyaluronic Acid: Multi-molecular weights for deep layer hydration.',
    ],
    relatedProducts: [
      {
        id: 2,
        name: 'Velvet Night Balm',
        price: 110,
        image: 'https://images.unsplash.com/photo-1534531688091-6c16e3c4a402?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        reviews: 89,
      },
      {
        id: 3,
        name: 'Golden Elixir Oil',
        price: 95,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviews: 156,
      },
      {
        id: 4,
        name: 'Silk Cleanser',
        price: 62,
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        reviews: 234,
      },
    ],
    testimonials: [
      {
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
        timeframe: 'Day 21',
        category: 'User Results',
        quote: 'My skin has never felt this plump. The radiance is completely gone.',
        author: 'Sarah J.',
      },
    ],
    customerReviews: [
      {
        title: 'Truly Transformative',
        rating: 5,
        content: "I used this serum twice daily for a week. Within the first week, my skin felt completely transformed. The product is lightweight and absorbs almost instantly. My skin looks more plump, dewy and much more hydrated. It's become the highlight of my morning ritual. Highly recommend for anyone with sensitive skin looking for radiance.",
        author: 'Amanda N.',
        authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        date: '2 days ago',
        verified: true,
      },
      {
        title: 'Pure Indulgence',
        rating: 4,
        content: 'The texture is heavenly and it absorbs without instantly. My makeup sits so beautifully over it. The price is premium but it\'s worth every drop.',
        author: 'Lauren W.',
        authorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
        date: '1 week ago',
        verified: true,
      },
    ],
  }

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
    <div className="pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-charcoal/60 mb-8">
          <a href="/" className="hover:text-brown">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop/skincare" className="hover:text-brown">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-brown font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="product-image-container aspect-square bg-cream rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-brown' : 'border-brown/10'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product alternate view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-brown mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-medium text-charcoal/70">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>
            </div>

            <p className="text-charcoal/80 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="flex gap-6 py-4">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{benefit.icon}</span>
                  <p className="text-xs text-center text-charcoal/70 font-medium">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="border-t border-b border-brown/10 py-6">
              <div className="text-4xl font-serif font-bold text-brown mb-2">
                ${product.price}
              </div>
              <p className="text-sm text-green-600 font-medium">✓ In Stock</p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal">Quantity:</span>
                <div className="flex items-center border border-brown/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-brown/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r border-brown/10">
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

              <button className="w-full bg-rose/20 hover:bg-rose/30 text-brown font-semibold py-3 rounded-lg btn-hover transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="w-full bg-brown hover:bg-dark-brown text-white font-semibold py-3 rounded-lg btn-hover transition-colors">
                Buy It Now
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-brown/20 rounded-lg hover:bg-brown/5 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-rose text-rose' : 'text-charcoal'}
                  />
                  <span className="font-medium text-sm">Wishlist</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-brown/20 rounded-lg hover:bg-brown/5 transition-colors">
                  <Share2 size={20} className="text-charcoal" />
                  <span className="font-medium text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-sm text-brown font-semibold mb-1">✓ Complimentary Express Shipping</p>
              <p className="text-xs text-charcoal/70">Estimated Delivery: Oct 12 - Oct 14</p>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4 mb-16">
          {/* Ingredients */}
          <button
            onClick={() => toggleSection('ingredients')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">Ingredients</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSection === 'ingredients' ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSection === 'ingredients' && (
            <div className="p-4 bg-cream/30 rounded-lg space-y-2">
              {product.ingredients.map((ingredient, idx) => (
                <p key={idx} className="text-sm text-charcoal/80">
                  {ingredient}
                </p>
              ))}
            </div>
          )}

          {/* How to Use */}
          <button
            onClick={() => toggleSection('usage')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">How to Use</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSection === 'usage' ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSection === 'usage' && (
            <div className="p-4 bg-cream/30 rounded-lg text-sm text-charcoal/80">
              <p className="mb-3">Apply 2-3 drops to clean, damp skin in the morning and evening. Gently press into skin, allowing it to absorb fully before applying moisturizer.</p>
              <p>For best results, use alongside our Velvet Night Balm for a complete ritual.</p>
            </div>
          )}

          {/* Shipping & Returns */}
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 bg-white border border-brown/10 rounded-lg hover:bg-cream/50 transition-colors"
          >
            <span className="font-serif font-semibold text-brown text-lg">Shipping & Returns</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSection === 'shipping' ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSection === 'shipping' && (
            <div className="p-4 bg-cream/30 rounded-lg text-sm text-charcoal/80 space-y-2">
              <p><strong>Express Shipping:</strong> Free on all orders</p>
              <p><strong>Delivery:</strong> 2-3 business days</p>
              <p><strong>Returns:</strong> 30-day return policy. Items must be unopened and in original packaging.</p>
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        {product.testimonials.length > 0 && (
          <section className="mb-16 bg-white/50 p-8 rounded-2xl">
            <h2 className="text-2xl font-serif font-bold text-brown mb-6">Real Transformations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.testimonials.map((testimonial, idx) => (
                <TestimonialCard key={idx} testimonial={testimonial} />
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brown mb-2">Community Reviews</h2>
              <p className="text-charcoal/70">
                4.8 out of 5 based on {product.customerReviews.length} reviews
              </p>
            </div>
            <button className="bg-brown hover:bg-dark-brown text-white font-semibold py-2 px-6 rounded-lg btn-hover transition-colors text-sm">
              Write a Review
            </button>
          </div>

          <div>
            {product.reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>

          <button className="w-full py-3 border border-brown/20 rounded-lg font-medium text-brown hover:bg-brown/5 transition-colors">
            Load More Reviews
          </button>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-brown mb-8">Complete the Ritual</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      </div>

      <MobileNav />
    </div>
  )
}
