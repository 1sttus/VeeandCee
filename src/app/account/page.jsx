'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, ShoppingBag, Heart, Upload, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AccountPage() {
  const { user, loading, logout, updateUser } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  if (loading) {
    return <div className="min-h-[50vh] px-4 py-20 text-center text-charcoal/70">Loading account...</div>
  }

  if (!user) {
    router.replace('/login?next=/account')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const uploadProfileImage = async (file) => {
    if (!file) return

    setMessage('')
    setError('')
    setUploading(true)
    try {
      const uploadBody = new FormData()
      uploadBody.append('file', file)
      uploadBody.append('folder', 'profiles')

      const uploadResponse = await fetch('/api/uploads', {
        method: 'POST',
        body: uploadBody,
      })
      const uploadData = await uploadResponse.json()
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Image upload failed')
      }

      const token = localStorage.getItem('veeandcee_token')
      const profileResponse = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileImage: uploadData.url }),
      })
      const profileData = await profileResponse.json()
      if (!profileResponse.ok) {
        throw new Error(profileData.error || 'Profile update failed')
      }

      updateUser(profileData.user)
      setMessage('Profile picture updated.')
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="bg-cream px-4 py-16 text-charcoal">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">My account</p>
        <div className="mt-4 flex flex-col gap-6 border-b border-brown/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-brown/10 bg-white">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User size={34} className="text-brown/45" />
              )}
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-brown">{user.name}</h1>
              <p className="mt-2 text-sm text-charcoal/70">{user.email}</p>
              <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/15 bg-white px-4 py-2 text-xs font-semibold text-brown transition hover:bg-brown/5">
                <Upload size={15} />
                {uploading ? 'Uploading...' : 'Change photo'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={uploading}
                  onChange={(event) => uploadProfileImage(event.target.files?.[0])}
                  className="sr-only"
                />
              </label>
              {message && <p className="mt-2 text-xs text-emerald-700">{message}</p>}
              {error && <p className="mt-2 text-xs text-rose">{error}</p>}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-5 py-3 text-sm font-semibold text-brown transition hover:bg-brown/5"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Link href="/shop" className="rounded-[2rem] border border-brown/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <ShoppingBag className="text-brown" size={24} />
            <h2 className="mt-4 text-lg font-semibold text-brown">Shop products</h2>
            <p className="mt-2 text-sm text-charcoal/70">Browse the current VeeandCee catalog.</p>
          </Link>
          <Link href="/wishlist" className="rounded-[2rem] border border-brown/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <Heart className="text-brown" size={24} />
            <h2 className="mt-4 text-lg font-semibold text-brown">Wishlist</h2>
            <p className="mt-2 text-sm text-charcoal/70">Return to saved favorites.</p>
          </Link>
          {user.isAdmin && (
            <Link href="/admin" className="rounded-[2rem] border border-brown/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <ShoppingBag className="text-brown" size={24} />
              <h2 className="mt-4 text-lg font-semibold text-brown">Admin console</h2>
              <p className="mt-2 text-sm text-charcoal/70">Manage catalog, orders, and customers.</p>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
