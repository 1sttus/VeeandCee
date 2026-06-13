// src/app/api/hero/route.js
import { NextResponse } from 'next/server';

// Placeholder hero data
const placeholderHero = {
  title: 'Welcome to VeeandCee',
  subtitle: 'Premium Cosmetics',
  ctaText: 'Shop Now',
  ctaLink: '/shop/skincare',
  imageUrl: '/placeholder-hero.jpg',
};

export async function GET() {
  // Return static placeholder data
  return NextResponse.json(placeholderHero);
}

export async function POST(request) {
  // In production, this would update the hero in the database.
  // For now, simply echo back the received payload.
  const payload = await request.json();
  const updatedHero = { ...placeholderHero, ...payload };
  return NextResponse.json(updatedHero);
}
