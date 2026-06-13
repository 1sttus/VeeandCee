import { Inter, Playfair_Display } from 'next/font/google'
import LayoutClient from './layout-client'
import '../index.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

export const viewport = {
  themeColor: '#F5F1ED',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: 'VeeandCee - Premium Skincare & Cosmetics',
  description:
    "Nurturing your skin's innate radiance through the art of sustainable, ethical, and sensory skincare designed for results.",
  keywords: 'cosmetics, skincare, beauty, serums, moisturizers, cleansers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-charcoal">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
