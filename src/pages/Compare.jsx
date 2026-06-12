import { Link } from 'react-router-dom'
import products from '../data/products'
import MobileNav from '../components/MobileNav'

export default function Compare() {
  const baseline = products[0]
  const comparison = products.find((item) => item.id === 4) || products[1]

  const attributes = [
    { label: 'Price', a: `$${baseline.price.toFixed(2)}`, b: `$${comparison.price.toFixed(2)}` },
    { label: 'Rating', a: `${baseline.rating} / 5`, b: `${comparison.rating} / 5` },
    { label: 'Benefits', a: baseline.benefits?.join(', ') || baseline.description, b: comparison.benefits?.join(', ') || comparison.description },
    { label: 'Ingredients', a: baseline.ingredients?.join(', ') || 'Premium botanicals', b: comparison.ingredients?.join(', ') || 'Nourishing extracts' },
    { label: 'Stock status', a: baseline.soldOut ? 'Sold out' : baseline.stockQuantity <= 5 ? 'Low stock' : 'In stock', b: comparison.soldOut ? 'Sold out' : comparison.stockQuantity <= 5 ? 'Low stock' : 'In stock' },
  ]

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">Product Comparison</p>
          <h1 className="text-4xl font-serif font-bold text-brown mt-3">Compare your ritual favorites</h1>
          <p className="text-sm text-charcoal/70 mt-3">Side-by-side details, pricing, and ingredients to choose the perfect luxury formula.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mb-10">
          {[baseline, comparison].map((product) => (
            <div key={product.id} className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-xl">
              <img src={product.image} alt={product.name} className="h-64 w-full rounded-[2rem] object-cover mb-5" loading="lazy" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">{product.category}</p>
                <h2 className="text-2xl font-serif font-bold text-brown">{product.name}</h2>
                <p className="text-sm text-charcoal/70">{product.description}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="rounded-full bg-gold/10 px-3 py-2 text-xs font-semibold text-brown">{product.soldOut ? 'Sold out' : 'In stock'}</span>
                  {product.stockQuantity <= 5 && !product.soldOut && <span className="rounded-full bg-rose/10 px-3 py-2 text-xs font-semibold text-rose">Low stock</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/30 bg-cream/90 p-6 shadow-xl backdrop-blur-xl overflow-x-auto">
          <table className="min-w-full text-left text-sm text-charcoal">
            <thead>
              <tr className="border-b border-brown/10">
                <th className="py-4 px-4 text-xs uppercase tracking-[0.3em] text-charcoal/60">Feature</th>
                <th className="py-4 px-4 text-xs uppercase tracking-[0.3em] text-charcoal/60">{baseline.name}</th>
                <th className="py-4 px-4 text-xs uppercase tracking-[0.3em] text-charcoal/60">{comparison.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brown/10">
              {attributes.map((row) => (
                <tr key={row.label} className="bg-white/80">
                  <td className="px-4 py-5 font-semibold text-charcoal">{row.label}</td>
                  <td className="px-4 py-5 text-charcoal/70">{row.a}</td>
                  <td className="px-4 py-5 text-charcoal/70">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white hover:bg-dark-brown transition-colors">
            Explore other products
          </Link>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
