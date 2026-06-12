import { Camera, Bookmark, Music2 } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { label: 'Skincare', href: '#' },
      { label: 'Makeup', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Gift Sets', href: '#' },
      { label: 'Subscriptions', href: '#' },
    ],
    support: [
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  return (
    <footer className="bg-cream border-t border-brown/10 mt-20">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Description */}
          <div>
            <h3 className="text-xl font-serif font-bold text-brown mb-4">VeeandCee</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Nurturing your skin's innate radiance through the art of sustainable, ethical, and sensory skincare designed for results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-brown mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-charcoal/70 hover:text-brown transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-serif font-semibold text-brown mb-4">Customer Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-charcoal/70 hover:text-brown transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Social */}
        <div className="border-t border-brown/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-charcoal/60">
              © {currentYear} VeeandCee. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-charcoal/60 hover:text-brown transition-colors">
                Privacy Policy
              </a>
              <span className="text-charcoal/30">•</span>
              <a href="#" className="text-sm text-charcoal/60 hover:text-brown transition-colors">
                Terms of Service
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 hover:bg-brown/5 rounded-full transition-colors" aria-label="Instagram">
                <Camera size={18} className="text-charcoal" />
              </a>
              <a href="#" className="p-2 hover:bg-brown/5 rounded-full transition-colors" aria-label="Pinterest">
                <Bookmark size={18} className="text-charcoal" />
              </a>
              <a href="#" className="p-2 hover:bg-brown/5 rounded-full transition-colors" aria-label="TikTok">
                <Music2 size={18} className="text-charcoal" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
