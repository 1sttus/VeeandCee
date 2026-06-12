import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import MobileNav from '../components/MobileNav'

export default function ProductCatalog() {
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSection, setActiveSection] = useState('all')
  const itemsPerPage = 12

  // Mock product data
  const allProducts = [
    {
      id: 1,
      name: 'Radiant Veil Foundation',
      description: 'Weightless finish for a flawless complexion',
      price: 68,
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 198,
      category: 'face',
      badge: 'Best Seller',
    },
    {
      id: 2,
      name: 'Velvet Petal Lipstick',
      description: 'Satin color with hydrating comfort',
      price: 42,
      image: 'https://images.unsplash.com/photo-1513149739851-50f01dfcbd75?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 164,
      category: 'lips',
    },
    {
      id: 3,
      name: 'Twilight Eye Palette',
      description: 'Sheen and matte shades for evening glow',
      price: 78,
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 123,
      category: 'eyes',
    },
    {
      id: 4,
      name: 'Sculpting Sable Brush',
      description: 'Effortless blending for every contour',
      price: 36,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 112,
      category: 'face',
    },
    {
      id: 5,
      name: 'Dewy Skin Mist',
      description: 'Hydrating mist for instant glow',
      price: 34,
      image: 'https://images.unsplash.com/photo-1536305030016-72a4e91f6912?auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      reviews: 88,
      category: 'face',
    },
    {
      id: 6,
      name: 'Golden Halo Illuminator',
      description: 'Light-reflecting liquid highlighter',
      price: 54,
      image: 'https://images.unsplash.com/photo-1580910051074-b03d7da5f1b8?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 212,
      category: 'face',
      badge: 'New',
    },
    {
      id: 7,
      name: 'Petal Soft Balm',
      description: 'Nourishing balm for lips and cheeks',
      price: 29,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 137,
      category: 'lips',
    },
    {
      id: 8,
      name: 'Silk Finish Primer',
      description: 'Smoothing base for makeup longevity',
      price: 46,
      image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviews: 154,
      category: 'face',
    },
    {
      id: 9,
      name: 'Illuminating Lash Serum',
      description: 'Nourishing formula for fuller lashes',
      price: 52,
      image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d1?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 180,
      category: 'eyes',
    },
    {
      id: 10,
      name: 'Velvet Brow Gel',
      description: 'Soft hold for polished arches',
      price: 28,
      image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      reviews: 71,
      category: 'eyes',
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

  // Category filtering
  const filteredProducts = sortedProducts.filter((product) => {
    return activeSection === 'all' || product.category === activeSection
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleFilterChange = (filterType, filterValue, isChecked) => {
    // Handle filter changes here
    console.log(filterType, filterValue, isChecked)
  }

  return (
    <div className="pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="rounded-[2rem] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.12),transparent_35%)]">
            <div className="relative h-[320px] sm:h-[420px] md:h-[480px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80')" }}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12">
                <p className="uppercase tracking-[0.3em] text-xs text-white/70 mb-4">Complexion Rituals</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-3xl">The Art of Complexion</h1>
                <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/85">Discover the signature collection for luminous skin, effortless coverage, and timeless radiance.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {['all', 'face', 'eyes', 'lips'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === section
                    ? 'bg-brown text-white shadow-lg shadow-brown/10'
                    : 'bg-white text-brown border border-brown/10 hover:bg-brown/5'
                }`}
              >
                {section === 'all' ? 'All Products' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-sm text-charcoal/60">
            <p className="mb-2">Curated essentials for every look — from dewy skin to evening glamour.</p>
          </div>
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
