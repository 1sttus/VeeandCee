import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const results = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    if (!normalized) return []

    return products.filter((product) =>
      [product.name, product.description, product.category]
        .some((value) => value.toLowerCase().includes(normalized))
    )
  }, [query])

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Search results</h1>
          <p className="text-sm text-charcoal/70">Showing results for <span className="font-semibold">{query || 'everything'}</span>.</p>
        </div>

        {query ? (
          results.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
              <h2 className="font-serif font-bold text-brown text-2xl mb-4">No matches found</h2>
              <p className="text-charcoal/70">Try a different term like “hydration”, “rose”, or “lip”.</p>
            </div>
          )
        ) : (
          <div className="mt-10 rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-bold text-brown text-2xl mb-4">Type a search term to explore products</h2>
            <p className="text-charcoal/70">Your search lives here — product names, descriptions, categories, and fragrance names are searchable.</p>
          </div>
        )}
      </div>
    </div>
  )
}
