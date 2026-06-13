'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'

const categoryLabels = {
  all: 'All Products',
  makeup: 'Makeup',
  body: 'Body',
  hair: 'Hair',
  fragrance: 'Fragrance',
  skincare: 'Skincare',
  'gift-sets': 'Gift Sets',
}

export default function ProductCatalog() {
  const params = useParams()
  const router = useRouter()
  
  // Extract category from optional catch-all route [[...category]]
  const categorySegment = params.category?.[0]
  const activeSection = categorySegment && categoryLabels[categorySegment] ? categorySegment : 'all'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [categorySegment])

  // Fetch products from database API
  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load products:', err)
        setLoading(false)
      })
  }, [])

  // Sorting logic
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return (b.rating || 5) - (a.rating || 5)
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    })
  }, [products, sortBy])

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      return activeSection === 'all' || product.category === activeSection
    })
  }, [sortedProducts, activeSection])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleFilterChange = (filterType, filterValue, isChecked) => {
    console.log(filterType, filterValue, isChecked)
  }

  const sectionLabel = categoryLabels[activeSection] || categoryLabels.all

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="rounded-[2rem] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.12),transparent_35%)]">
            <div
              className="relative h-[320px] sm:h-[420px] md:h-[480px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1591343395902-1adcb454c2e4?auto=format&fit=crop&w=1600&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12">
                <p className="uppercase tracking-[0.3em] text-xs text-white/70 mb-4">{sectionLabel}</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-3xl">
                  Shop {sectionLabel} Essentials
                </h1>
                <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/85">
                  Discover the signature collection for beauty rituals, nourishing treats, and essential gift sets.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {['all', 'makeup', 'body', 'hair', 'fragrance', 'skincare', 'gift-sets'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  router.push(section === 'all' ? '/shop' : `/shop/${section}`)
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === section
                    ? 'bg-brown text-white shadow-lg shadow-brown/10'
                    : 'bg-white text-brown border border-brown/10 hover:bg-brown/5'
                }`}
              >
                {categoryLabels[section]}
              </button>
            ))}
          </div>

          <div className="text-sm text-charcoal/60">
            <p className="mb-2">Curated essentials for every look — from dewy skin to evening glamour.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <CategoryFilter onFilterChange={handleFilterChange} />

          <div className="flex-1">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-charcoal/70">
                Showing <span className="font-semibold">{paginatedProducts.length}</span> of{' '}
                <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-charcoal">
                  Sort by:
                </label>
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

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 rounded-[2rem] bg-white animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-charcoal/70">
                <p>No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}

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
                  {[...Array(totalPages)].map((_, i) => {
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
    </div>
  )
}
