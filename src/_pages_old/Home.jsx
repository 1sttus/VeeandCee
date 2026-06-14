import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import TestimonialCard from '../components/TestimonialCard'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - Replace with API calls
  const trendingProducts = [
    {
      id: 1,
      name: 'Radiant Veil Foundation',
      description: 'Silky coverage with luminous finish',
      price: 68,
      image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=900&q=80',
      rating: 4.9,
      reviews: 208,
      badge: 'Best Seller',
      stockQuantity: 14,
    },
    {
      id: 2,
      name: 'Velvet Petal Lipstick',
      description: 'Creamy color with satin comfort',
      price: 42,
      image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=900&q=80',
      rating: 4.8,
      reviews: 134,
      stockQuantity: 25,
    },
    {
      id: 3,
      name: 'Twilight Eye Palette',
      description: 'Rich, blendable mineral shades',
      price: 78,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      rating: 4.7,
      reviews: 97,
      stockQuantity: 10,
    },
    {
      id: 7,
      name: 'Moonlit Night Serum',
      description: 'Overnight recovery with botanical retinol',
      price: 84,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
      rating: 4.9,
      reviews: 120,
      stockQuantity: 15,
    },
    {
      id: 8,
      name: 'Satin Silk Eye Mask',
      description: 'Pure silk for ultimate beauty rest',
      price: 25,
      image: 'https://images.unsplash.com/photo-1583002271842-870024976451?auto=format&fit=crop&w=900&q=80',
      rating: 5.0,
      reviews: 210,
      stockQuantity: 0,
    },
  ]

  const trendingCategories = [
    { id: 'all', label: 'All Products', color: 'bg-brown' },
    { id: 'face', label: 'Face', color: 'bg-gold' },
    { id: 'eyes', label: 'Eyes', color: 'bg-rose' },
    { id: 'lips', label: 'Lips', color: 'bg-brown/70' },
  ]

  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=900&q=80',
      timeframe: 'Day 21',
      category: 'Before & After',
      quote: 'My skin has never felt this plump. The transformation is undeniable.',
      author: 'Sarah J.',
    },
    {
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=900&q=80',
      timeframe: 'Day 30',
      category: 'Results',
      quote: 'Visible difference in my fine lines. This is now a staple in my routine.',
      author: 'Elena V.',
    },
    {
      image: 'https://images.unsplash.com/photo-1598454444233-9df315278494?auto=format&fit=crop&w=900&q=80',
      timeframe: 'Day 14',
      category: 'Transformation',
      quote: 'The natural glow is undeniable. I finally feel confident in my own skin.',
      author: 'Marcus T.',
    },
  ]

  const journalArticles = [
    {
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80',
      title: 'The 5-Minute Morning Glow Ritual',
      excerpt: 'Master a skincare ritual that feels luxurious and effortless.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80',
      title: 'Decoding Botanical Ingredients',
      excerpt: 'Discover the power of nature in every drop of your routine.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1501005173677-1ef0c287b13c?auto=format&fit=crop&w=900&q=80',
      title: 'Green Hydration Secrets',
      excerpt: 'Unlock long-lasting moisture with clean, calm formulas.',
      link: '#',
    },
  ]

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero Section */}
      <HeroSection
        title="The Art of Complexion"
        subtitle="Discover elevated essentials designed for luminous, natural beauty in every ritual."
        backgroundImage="https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1600&q=80"
        ctaText="Explore Now"
        ctaLink="/shop/skincare"
      />

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {trendingCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${selectedCategory === cat.id
                  ? 'bg-brown text-white'
                  : 'bg-white text-brown border border-brown/20 hover:border-brown'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown">Trending Now</h2>
          <a href="/shop/skincare" className="flex items-center gap-2 text-gold hover:text-gold/80 font-medium text-sm">
            View All <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white/30 rounded-2xl my-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown text-center mb-4">The Glow Journal</h2>
        <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
          Real stories, real results from our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Journal Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown">The Ritual Journal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journalArticles.map((article, idx) => (
            <article key={idx} className="card-hover rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-semibold text-brown text-lg mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <a href={article.link} className="text-gold font-medium text-sm hover:text-gold/80 transition-colors">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-brown/5 to-gold/5 rounded-2xl p-8 md:p-16 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles size={32} className="text-gold" />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brown mb-4">
            Concierge AI
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-xl mx-auto">
            Receive a personalized skincare analysis and curated ritual in seconds.
          </p>
          <button className="bg-brown hover:bg-dark-brown text-white font-semibold py-3 px-8 rounded-lg btn-hover transition-colors">
            Start Analysis
          </button>
        </div>
      </section>
    </div>
  )
}
