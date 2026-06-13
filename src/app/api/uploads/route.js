import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { verifyToken } from '@/lib/auth'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function getCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL
  if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL is not configured')
  }

  const parsed = new URL(cloudinaryUrl)
  return {
    cloudName: parsed.hostname,
    apiKey: parsed.username,
    apiSecret: parsed.password,
  }
}

function signUploadParams(params, apiSecret) {
  const signatureBase = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  return crypto.createHash('sha1').update(`${signatureBase}${apiSecret}`).digest('hex')
}

function normalizeFolder(folder) {
  const fallback = 'veeandcee/uploads'
  if (!folder) return fallback

  const cleanFolder = folder
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]/g, '')
    .replace(/^\/+|\/+$/g, '')

  return cleanFolder ? `veeandcee/${cleanFolder.replace(/^veeandcee\/?/, '')}` : fallback
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const folder = normalizeFolder(formData.get('folder'))

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WEBP, or GIF images are allowed' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Image must be 5MB or smaller' }, { status: 400 })
    }

    if (folder.includes('/products')) {
      const user = verifyToken(req)
      if (!user?.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized administrative upload' }, { status: 403 })
      }
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
    const timestamp = Math.round(Date.now() / 1000)
    const uploadParams = { folder, timestamp }
    const signature = signUploadParams(uploadParams, apiSecret)

    const cloudinaryForm = new FormData()
    cloudinaryForm.append('file', file)
    cloudinaryForm.append('api_key', apiKey)
    cloudinaryForm.append('timestamp', timestamp.toString())
    cloudinaryForm.append('folder', folder)
    cloudinaryForm.append('signature', signature)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: cloudinaryForm,
    })
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Cloudinary upload failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(
      {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
