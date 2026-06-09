import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import MobileNav from '../components/MobileNav'

export default function ProductCatalog() {
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Mock product data
  const allProducts = [
    {
      id: 1,
      name: 'Illuminating Nectar',
      description: 'Radiant serum',
      price: 124,
      image: 'https://via.placeholder.com/300x300?text=Illuminating+Nectar',
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: 'Velvet Veil Cream',
      description: 'Luxe moisturizer',
      price: 88,
      image: 'https://via.placeholder.com/300x300?text=Velvet+Veil+Cream',
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      name: 'Midnight Renewal',
      description: 'Night treatment',
      price: 145,
      image: 'https://via.placeholder.com/300x300?text=Midnight+Renewal',
      rating: 4.7,
      reviews: 89,
      badge: 'NEW',
    },
    {
      id: 4,
      name: 'Silk Cloud Balm',
      description: 'Silky balm',
      price: 62,
      image: 'https://via.placeholder.com/300x300?text=Silk+Cloud+Balm',
      rating: 4.6,
      reviews: 112,
    },
    {
      id: 5,
      name: 'Golden Elixir',
      description: 'Facial oil',
      price: 110,
      image: 'https://via.placeholder.com/300x300?text=Golden+Elixir',
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 6,
      name: 'Aura Eye Gel',
      description: 'Eye treatment',
      price: 74,
      image: 'https://via.placeholder.com/300x300?text=Aura+Eye+Gel',
      rating: 4.7,
      reviews: 167,
      badge: 'BEST SELLER',
    },
    {
      id: 7,
      name: 'Restorative Elixir',
      description: 'Serum complex',
      price: 95,
      image: 'https://via.placeholder.com/300x300?text=Restorative+Elixir',
      rating: 4.9,
      reviews: 245,
    },
    {
      id: 8,
      name: 'Luminous Night Oil',
      description: 'Night serum',
      price: 78,
      image: 'https://via.placeholder.com/300x300?text=Night+Oil',
      rating: 4.5,
      reviews: 98,
    },
    {
      id: 9,
      name: 'Purifying Cleanser',
      description: 'Gentle cleanser',
      price: 54,
      image: 'https://via.placeholder.com/300x300?text=Purifying+Cleanser',
      rating: 4.8,
      reviews: 189,
    },
    {
      id: 10,
      name: 'Hydra Mask',
      description: 'Weekly mask',
      price: 68,
      image: 'https://via.placeholder.com/300x300?text=Hydra+Mask',
      rating: 4.7,
      reviews: 134,
    },
    {
      id: 11,
      name: 'Radiant Gold Serum',
      description: 'Brightening serum',
      price: 185,
      image: 'https://via.placeholder.com/300x300?text=Radiant+Gold+Serum',
      rating: 4.9,
      reviews: 256,
    },
    {
      id: 12,
      name: 'Velvet Essence',
      description: 'Luxe essence',
      price: 85,
      image: 'https://via.placeholder.com/300x300?text=Velvet+Essence',
      rating: 4.6,
      reviews: 145,
    },
  ]

  // Sorting logic
  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleFilterChange = (filterType, filterValue, isChecked) => {
    // Handle filter changes here
    console.log(filterType, filterValue, isChecked)
  }

  return (
    <div className="pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-charcoal/60 mb-8">
          <a href="/" className="hover:text-brown">Home</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-brown">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-brown font-medium">Skincare</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-brown mb-2">The Skincare Collection</h1>
          <p className="text-charcoal/70">Curated rituals designed for pure indulgence and visible results. Every drop is a promise of sensory luxury.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <CategoryFilter onFilterChange={handleFilterChange} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-charcoal/70">
                Showing <span className="font-semibold">{paginatedProducts.length}</span> of <span className="font-semibold">{sortedProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-charcoal">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="px-3 py-2 border border-brown/20 rounded-lg text-sm bg-white text-charcoal focus:outline-none focus:border-brown"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-brown/10 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(Math.min(totalPages, 12))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-brown text-white'
                            : 'bg-brown/10 text-brown hover:bg-brown/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  {totalPages > 12 && <span className="px-2">...</span>}
                  {totalPages > 12 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-brown text-white'
                          : 'bg-brown/10 text-brown hover:bg-brown/20'
                      }`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-brown/10 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
