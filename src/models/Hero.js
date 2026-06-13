import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // Cloudinary URL
  title: { type: String, required: true },
  subtitle: { type: String },
  ctaText: { type: String, default: 'Shop Now' },
  ctaLink: { type: String, default: '/shop/skincare' },
  // optional fields for multiple slides could be added later
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
