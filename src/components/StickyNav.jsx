// src/components/StickyNav.jsx
// Mobile‑only sticky navigation with glassmorphism effect.

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyNav() {
  const [open, setOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Hide on large screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex justify-center p-2">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-x-0 bottom-full mb-2 bg-white/30 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl p-4 flex flex-col space-y-2"
          >
            {/* Navigation links – reuse same items as main nav */}
            <Link href="/" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Home
            </Link>
            <Link href="/shop/skincare" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Skincare
            </Link>
            <Link href="/shop/makeup" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Makeup
            </Link>
            <Link href="/shop/body" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Body
            </Link>
            <Link href="/shop/hair" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Hair
            </Link>
            <Link href="/shop/fragrance" className="text-center text-sm font-medium text-charcoal hover:text-brown">
              Fragrance
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
