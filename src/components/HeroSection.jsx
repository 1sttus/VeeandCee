import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage, 
  ctaText = 'Shop Now', 
  ctaLink = '/shop/skincare',
  layout = 'center' 
}) {
  return (
    <section 
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 ${layout === 'right' ? 'text-right' : ''}`}>
        <div className="fade-in max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            {subtitle}
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
    </section>
  )
}
