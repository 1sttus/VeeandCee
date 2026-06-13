'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

function SearchResultsInner() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)
    fetch(`/api/products?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Search failed:', err)
        setLoading(false)
      })
  }, [query])

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Search results</h1>
          <p className="text-sm text-charcoal/70">
            Showing results for <span className="font-semibold">&quot;{query || 'everything'}&quot;</span>.
          </p>
        </div>

        {query ? (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 rounded-[2rem] bg-white animate-pulse" />
              ))}
            </div>
          ) : results.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
              <h2 className="font-serif font-bold text-brown text-2xl mb-4">No matches found</h2>
              <p className="text-charcoal/70">Try a different term like &quot;hydration&quot;, &quot;rose&quot;, or &quot;lip&quot;.</p>
            </div>
          )
        ) : (
          <div className="mt-10 rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-bold text-brown text-2xl mb-4">Type a search term to explore products</h2>
            <p className="text-charcoal/70">
              Your search lives here — product names, descriptions, and categories are searchable.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-10 w-48 bg-white animate-pulse rounded mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 rounded-[2rem] bg-white animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchResultsInner />
    </Suspense>
  )
}
