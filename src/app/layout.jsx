// src/app/layout.jsx
import { Inter, Playfair_Display } from 'next/font/google';
import LayoutClient from './layout-client';
import '../index.css';
import HeroSection from '@/components/HeroSection';
import StickyNav from '@/components/StickyNav';
import Hero from '@/models/Hero'; // server-side model

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
});

export const viewport = {
  themeColor: '#F5F1ED',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'VeeandCee - Premium Skincare & Cosmetics',
  description: "Nurturing your skin's innate radiance through the art of sustainable, ethical, and sensory skincare designed for results.",
  keywords: 'cosmetics, skincare, beauty, serums, moisturizers, cleansers',
};

export default async function RootLayout({ children }) {
  // Fetch hero data server-side
  let hero = null;
  try {
    hero = await Hero.findOne();
  } catch (e) {
    console.warn('Hero fetch error', e);
  }

  const heroProps = hero
    ? {
        title: hero.title,
        subtitle: hero.subtitle,
        backgroundImage: hero.imageUrl,
        ctaText: hero.ctaText,
        ctaLink: hero.ctaLink,
      }
    : {
        title: 'Welcome to VeeandCee',
        subtitle: 'Premium Skincare & Cosmetics',
        backgroundImage: '/default-hero.jpg',
        ctaText: 'Shop Now',
        ctaLink: '/shop/skincare',
      };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-charcoal">
        <StickyNav />
        <LayoutClient>
          <HeroSection {...heroProps} />
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
