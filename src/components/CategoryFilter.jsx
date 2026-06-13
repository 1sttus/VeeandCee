'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FilterSection = ({ title, section, expanded, onToggle, children }) => (
  <div className="mb-6">
    <button
      onClick={() => onToggle(section)}
      className="w-full flex items-center justify-between mb-3 pb-2 border-b border-brown/10 hover:text-brown transition-colors"
    >
      <h3 className="font-serif font-semibold text-brown text-sm uppercase">{title}</h3>
      <ChevronDown
        size={18}
        className={`transition-transform ${expanded ? '' : '-rotate-90'}`}
      />
    </button>
    {expanded && <div className="space-y-3">{children}</div>}
  </div>
)

export default function CategoryFilter({ onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    concern: true,
    priceRange: true,
    rating: true,
  })

  const categories = [
    { id: 'cleansers', label: 'Cleansers', count: 12 },
    { id: 'serums', label: 'Serums & Oils', count: 18 },
    { id: 'moisturizers', label: 'Moisturizers', count: 15 },
    { id: 'masks', label: 'Masks', count: 8 },
  ]

  const concerns = [
    { id: 'hydration', label: 'Hydration' },
    { id: 'antiaging', label: 'Anti-Aging' },
    { id: 'brightening', label: 'Brightening' },
    { id: 'sensitivity', label: 'Sensitivity' },
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <aside className="hidden lg:block w-48 pr-6 space-y-8">
      {/* Category Filter */}
      <FilterSection
        title="Category"
        section="category"
        expanded={expandedSections.category}
        onToggle={toggleSection}
      >
        {categories.map(cat => (
          <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-brown/30 text-brown"
              onChange={(e) => onFilterChange?.('category', cat.id, e.target.checked)}
            />
            <span className="text-sm text-charcoal hover:text-brown transition-colors">
              {cat.label} <span className="text-charcoal/50">({cat.count})</span>
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Concern Filter */}
      <FilterSection
        title="Concern"
        section="concern"
        expanded={expandedSections.concern}
        onToggle={toggleSection}
      >
        {concerns.map(concern => (
          <label key={concern.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-brown/30 text-brown"
              onChange={(e) => onFilterChange?.('concern', concern.id, e.target.checked)}
            />
            <span className="text-sm text-charcoal hover:text-brown transition-colors">
              {concern.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        section="priceRange"
        expanded={expandedSections.priceRange}
        onToggle={toggleSection}
      >
        <input
          type="range"
          min="0"
          max="500"
          className="w-full"
          onChange={(e) => onFilterChange?.('price', e.target.value)}
        />
        <div className="flex justify-between text-xs text-charcoal/60">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Rating"
        section="rating"
        expanded={expandedSections.rating}
        onToggle={toggleSection}
      >
        {[5, 4, 3, 2, 1].map(rating => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rating}
              className="w-4 h-4 border-brown/30 text-brown"
              onChange={(e) => onFilterChange?.('rating', e.target.value)}
            />
            <span className="text-sm text-charcoal">
              {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
            </span>
          </label>
        ))}
      </FilterSection>
    </aside>
  )
}
