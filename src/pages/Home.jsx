import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import TestimonialCard from '../components/TestimonialCard'
import MobileNav from '../components/MobileNav'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - Replace with API calls
  const trendingProducts = [
    {
      id: 1,
      name: 'Golden Dew Elixir',
      description: 'Luminous facial serum',
      price: 84,
      image: 'https://via.placeholder.com/300x300?text=Golden+Dew+Elixir',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'Velvet Night Balm',
      description: 'Recovery treatment',
      price: 110,
      image: 'https://via.placeholder.com/300x300?text=Velvet+Night+Balm',
      rating: 4.9,
      reviews: 89,
      badge: 'Best Seller',
    },
  ]

  const trendingCategories = [
    { id: 'skincare', label: 'Skincare', color: 'bg-rose' },
    { id: 'serums', label: 'Serums', color: 'bg-gold' },
    { id: 'cleansers', label: 'Cleansers', color: 'bg-brown' },
  ]

  const testimonials = [
    {
      image: 'https://via.placeholder.com/300x300?text=Testimonial+1',
      timeframe: 'Day 21',
      category: 'Before & After',
      quote: 'My skin has never felt this plump. The radiance is completely gone.',
      author: 'Sarah J.',
    },
    {
      image: 'https://via.placeholder.com/300x300?text=Testimonial+2',
      timeframe: 'Day 30',
      category: 'Results',
      quote: 'Visible difference in my fine lines. This is now a staple in my routine.',
      author: 'Elena V.',
    },
    {
      image: 'https://via.placeholder.com/300x300?text=Testimonial+3',
      timeframe: 'Day 14',
      category: 'Transformation',
      quote: 'The brightness is undeniable. I woke up looking refreshed.',
      author: 'Marcus T.',
    },
  ]

  const journalArticles = [
    {
      image: 'https://via.placeholder.com/400x300?text=Morning+Glow',
      title: 'The 5-Minute Morning Glow Ritual',
      excerpt: 'Master a skincare routine...',
      link: '#',
    },
    {
      image: 'https://via.placeholder.com/400x300?text=Botanical',
      title: 'Decoding Botanical Ingredients',
      excerpt: 'Discover the power of nature...',
      link: '#',
    },
    {
      image: 'https://via.placeholder.com/400x300?text=Green',
      title: 'Green Hydration Secrets',
      excerpt: 'Unlock hydration from within...',
      link: '#',
    },
  ]

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero Section */}
      <HeroSection
        title="Rituals of Radiance"
        subtitle="Discover curated skincare that elevates your beauty routine into a sanctuary of self-care."
        backgroundImage="https://via.placeholder.com/1600x600?text=Hero+Banner"
        ctaText="Shop the Edit"
        ctaLink="/shop/skincare"
      />

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {trendingCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
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

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
