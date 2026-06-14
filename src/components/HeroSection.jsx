'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

// 1. Import your local images from your src/img folder
// (Adjust the '../' relative paths depending on how deep this file sits inside src)
import slide1 from '../img/hero_1.png'
import slide2 from '../img/hero_2.png'
import slide3 from '../img/hero_3.png'

const defaultSlides = [
  {
    title: 'The Art of Complexion',
    subtitle: 'Discover elevated essentials designed for luminous, natural beauty in every ritual.',
    image: slide1, // 2. Pass the imported image object directly here
  },
  {
    title: 'Rituals That Glow',
    subtitle: 'Layer botanical skincare and soft-focus color for a calm, polished finish.',
    image: slide2,
  },
  {
    title: 'Clean Beauty, Made Sensory',
    subtitle: 'Build your everyday edit with refined formulas for skin, body, and mood.',
    image: slide3,
  },
]

// ... rest of your component code

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  slides = defaultSlides,
  ctaText = 'Shop Now',
  ctaLink = '/shop/skincare',
  layout = 'center'
}) {
  const resolvedSlides = slides?.length
    ? slides
    : [{ title, subtitle, image: backgroundImage }]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (resolvedSlides.length <= 1) return undefined

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % resolvedSlides.length)
    }, 5500)

    return () => window.clearInterval(interval)
  }, [resolvedSlides.length])

  const currentSlide = resolvedSlides[activeSlide]

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {resolvedSlides.map((slide, index) => (
        <div
          key={`${slide.title}-${slide.image}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ backgroundImage: `url(${slide.image || slide.backgroundImage})` }}
          aria-hidden={index !== activeSlide}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 ${layout === 'right' ? 'text-right' : ''}`}>
        <div key={activeSlide} className="fade-in max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            {currentSlide.title || title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            {currentSlide.subtitle || subtitle}
          </p>
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-brown font-semibold py-3 px-8 rounded-lg btn-hover transition-colors"
          >
            {ctaText}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {resolvedSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-gold' : 'w-2.5 bg-white/70 hover:bg-white'
              }`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
