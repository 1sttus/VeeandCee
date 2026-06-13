// src/lib/cloudinary.js
// Simple Cloudinary upload helper using the CLOUDINARY_URL env variable.
// Expects CLOUDINARY_URL in the format: cloudinary://<api_key>:<api_secret>@<cloud_name>

import { v2 as cloudinary } from 'cloudinary';

// Parse CLOUDINARY_URL
const cloudinaryUrl = process.env.CLOUDINARY_URL || '';
const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
if (match) {
  const [, apiKey, apiSecret, cloudName] = match;
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else {
  console.warn('Invalid CLOUDINARY_URL, Cloudinary not configured');
}

/**
 * Upload an image buffer to Cloudinary.
 * @param {Buffer|string} file - The file buffer or path.
 * @param {Object} [options] - Optional Cloudinary upload options.
 * @returns {Promise<Object>} The upload response from Cloudinary.
 */
export async function uploadImage(file, options = {}) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: options.folder || 'veeandcee',
      ...options,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}
