import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import PropTypes from 'prop-types'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlistItem, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const soldOut = product.stockQuantity <= 0
  const lowStock = !soldOut && product.stockQuantity <= 5

  const renderStars = (rating) => (
    <div className="flex gap-1 text-gold text-xs" aria-label={`Rating ${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  )

  return (
    <div className="rounded-[2rem] overflow-hidden bg-white shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative aspect-square bg-cream overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {soldOut ? (
            <span className="rounded-full bg-rose/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose font-semibold">Sold Out</span>
          ) : lowStock ? (
            <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">Low Stock</span>
          ) : null}
          {product.badge && <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{product.badge}</span>}
        </div>
        <button
          onClick={() => toggleWishlistItem(product)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow-sm transition hover:bg-rose/10"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
        >
          <Heart size={18} className={wishlisted ? 'fill-rose text-rose' : 'text-charcoal'} />
        </button>
      </div>

      <div className="p-5 space-y-3">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-serif text-base font-semibold text-brown transition-colors hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal/70 line-clamp-2">{product.description}</p>

        {product.rating && (
          <div className="flex items-center justify-between">
            {renderStars(product.rating)}
            <span className="text-xs text-charcoal/60">{product.reviews} reviews</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-brown/10">
          <div>
            <p className="text-sm text-charcoal/70">Price</p>
            <p className="font-serif text-xl font-bold text-brown">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <button
          disabled={soldOut}
          onClick={(event) => addToCart(product, 1, event)}
          className={`w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition ${soldOut ? 'bg-slate-300 cursor-not-allowed' : 'bg-brown hover:bg-dark-brown'}`}
        >
          {soldOut ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    badge: PropTypes.string,
    stockQuantity: PropTypes.number,
  }).isRequired,
}
