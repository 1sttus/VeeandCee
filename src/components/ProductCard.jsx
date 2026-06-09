import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 text-gold text-xs">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="card-hover rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative product-image-container aspect-square bg-cream overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-gold/20 text-brown px-2 py-1 rounded text-xs font-semibold">
            {product.badge}
          </div>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-rose/20 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-rose text-rose' : 'text-charcoal'}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif font-semibold text-brown text-sm hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-charcoal/60 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            {renderStars(product.rating)}
            {product.reviews && <span className="text-xs text-charcoal/50">({product.reviews})</span>}
          </div>
        )}

        {/* Price */}
        <div className="pt-2 border-t border-brown/10">
          <div className="font-serif font-bold text-brown text-lg">
            ${product.price}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-brown hover:bg-dark-brown text-white py-2 rounded btn-hover transition-colors font-medium text-sm flex items-center justify-center gap-2">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
