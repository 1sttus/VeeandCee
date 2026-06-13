import { useMemo } from 'react'
import { useCart } from '../context/CartContext'
import products from '../data/products'

export default function Compare() {
  const { addToCart } = useCart()
  // In a real app, IDs would come from URL query params or state
  const compareIds = [1, 2, 3] 
  const compareItems = useMemo(() => products.filter(p => compareIds.includes(p.id)), [])

  const rows = [
    { label: 'Price', key: 'price', format: (v) => `$${v.toFixed(2)}` },
    { label: 'Category', key: 'category' },
    { label: 'Rating', key: 'rating', format: (v) => `${v} / 5` },
    { label: 'Benefits', key: 'benefits', format: (v) => v?.join(', ') || 'Natural hydration' },
    { label: 'Ingredients', key: 'ingredients', format: (v) => v?.slice(0, 3).join(', ') + '...' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 font-serif text-4xl font-bold text-brown">Product Comparison</h1>
      
      <div className="overflow-x-auto rounded-[2rem] border border-brown/10 bg-white shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brown/5">
              <th className="min-w-[200px] p-8 text-sm uppercase tracking-widest text-charcoal/50">Feature</th>
              {compareItems.map(item => (
                <th key={item.id} className="min-w-[250px] p-8">
                  <img src={item.image} alt={item.name} className="mb-4 h-32 w-32 rounded-2xl object-cover" />
                  <h3 className="font-serif text-xl font-bold text-brown">{item.name}</h3>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-4 rounded-full bg-brown px-4 py-2 text-xs font-semibold text-white hover:bg-dark-brown"
                  >
                    Add to Cart
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brown/5">
            {rows.map(row => (
              <tr key={row.label} className="hover:bg-cream/30">
                <td className="p-8 text-sm font-semibold text-brown bg-cream/20">{row.label}</td>
                {compareItems.map(item => (
                  <td key={item.id} className="p-8 text-sm text-charcoal/80">
                    {row.format ? row.format(item[row.key]) : item[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}