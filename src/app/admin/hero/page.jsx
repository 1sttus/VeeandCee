// src/app/admin/hero/page.jsx
// Admin page to edit the hero section (image, title, subtitle, CTA)

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroAdmin() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [ctaLink, setCtaLink] = useState('/shop/skincare');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const router = useRouter();

  // Load existing hero via API
  useEffect(() => {
    async function loadHero() {
      const res = await fetch('/api/hero');
      if (res.ok) {
        const hero = await res.json();
        if (hero) {
          setTitle(hero.title || '');
          setSubtitle(hero.subtitle || '');
          setCtaText(hero.ctaText || 'Shop Now');
          setCtaLink(hero.ctaLink || '/shop/skincare');
          setPreviewUrl(hero.imageUrl || '');
        }
      }
    }
    loadHero();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = previewUrl;
    if (imageFile) {
      const form = new FormData();
      form.append('file', imageFile);
      form.append('folder', 'hero');
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      } else {
        console.error('Upload failed');
        return;
      }
    }
    const payload = { title, subtitle, ctaText, ctaLink, imageUrl };
    await fetch('/api/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    alert('Hero updated');
    router.refresh();
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hero Section Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Text</label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Link</label>
          <input
            type="text"
            value={ctaLink}
            onChange={(e) => setCtaLink(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hero Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-2 max-h-48 object-cover rounded" />
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gold text-brown font-semibold rounded hover:bg-gold/90"
        >
          Save Hero
        </button>
      </form>
    </section>
  );
}
