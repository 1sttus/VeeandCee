// src/app/api/admin/hero/route.js
import dbConnect from '@/lib/db';
import Hero from '@/models/Hero';

export async function GET(request) {
  await dbConnect();
  const hero = await Hero.findOne();
  return new Response(JSON.stringify(hero || {}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  await dbConnect();
  const { title, subtitle, ctaText, ctaLink, imageUrl } = await request.json();
  const hero = await Hero.findOneAndUpdate(
    {},
    { title, subtitle, ctaText, ctaLink, imageUrl },
    { upsert: true, new: true }
  );
  return new Response(JSON.stringify(hero), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
