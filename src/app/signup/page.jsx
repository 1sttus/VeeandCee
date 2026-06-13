'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Mail, Upload, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [profileImage, setProfileImage] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password, profileImage })
      router.push('/account')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const uploadProfileImage = async (file) => {
    if (!file) return

    setError(null)
    setUploading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', 'profiles')

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Image upload failed')
      }

      setProfileImage(data.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-cream px-4 py-16 text-charcoal">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-brown/10 bg-white p-8 shadow-[0_24px_80px_rgba(139,115,85,0.12)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Join the ritual</p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-brown">Create account</h1>
        <p className="mt-3 text-sm leading-6 text-charcoal/70">
          Save your wishlist, sync your cart, and track every order.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="flex items-center gap-4 rounded-3xl border border-brown/10 bg-cream p-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white">
              {profileImage ? (
                <img src={profileImage} alt="Profile preview" className="h-full w-full object-cover" />
              ) : (
                <User size={28} className="text-brown/45" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-brown">Profile picture</p>
              <p className="mt-1 text-xs text-charcoal/60">JPG, PNG, WEBP, or GIF up to 5MB.</p>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/15 bg-white px-4 py-2 text-xs font-semibold text-brown transition hover:bg-brown/5">
                <Upload size={15} />
                {uploading ? 'Uploading...' : 'Upload photo'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={uploading || submitting}
                  onChange={(event) => uploadProfileImage(event.target.files?.[0])}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-brown">Full name</span>
            <span className="relative mt-2 block">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                autoComplete="name"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brown">Email</span>
            <span className="relative mt-2 block">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                autoComplete="email"
              />
            </span>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-brown">Password</span>
              <span className="relative mt-2 block">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                  autoComplete="new-password"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-brown">Confirm</span>
              <span className="relative mt-2 block">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.confirm}
                  onChange={(event) => updateField('confirm', event.target.value)}
                  className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                  autoComplete="new-password"
                />
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white transition hover:bg-dark-brown disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Creating account...' : 'Create account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-6 text-sm text-charcoal/70">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brown hover:text-dark-brown">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
