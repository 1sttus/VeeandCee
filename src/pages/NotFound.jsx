import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif font-bold text-brown mb-4">404</h1>
        <p className="text-2xl font-serif text-brown mb-4">Page Not Found</p>
        <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to discovering beauty.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brown hover:bg-dark-brown text-white font-semibold py-3 px-8 rounded-lg btn-hover transition-colors"
        >
          Back to Home <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}
