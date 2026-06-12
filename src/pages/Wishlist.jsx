import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useAuth()

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Your Wishlist</h1>
          <p className="text-sm text-charcoal/70">Products you’ve loved and saved for later. Tap any item to view details or add it to cart.</p>
        </div>

        {wishlist.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-bold text-brown text-2xl mb-4">Your wishlist is empty</h2>
            <p className="text-charcoal/70">Browse the collection and tap the heart on a product to save it for later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
