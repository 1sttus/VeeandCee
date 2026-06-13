'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const user = await login({ email, password })
      const next = new URLSearchParams(window.location.search).get('next')
      router.push(next || (user.isAdmin ? '/admin' : '/account'))
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-cream px-4 py-16 text-charcoal">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-brown/10 bg-white shadow-[0_24px_80px_rgba(139,115,85,0.12)] md:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center md:block" />
        <div className="p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Welcome back</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-brown">Sign in</h1>
          <p className="mt-3 text-sm leading-6 text-charcoal/70">
            Access your orders, wishlist, and saved cart.
          </p>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-brown">Email</span>
              <span className="relative mt-2 block">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                  autoComplete="email"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-brown">Password</span>
              <span className="relative mt-2 block">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-brown/15 bg-cream px-12 py-3 text-sm outline-none transition focus:border-brown"
                  autoComplete="current-password"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white transition hover:bg-dark-brown disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Signing in...' : 'Sign in'}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-sm text-charcoal/70">
            New to VeeandCee?{' '}
            <Link href="/signup" className="font-semibold text-brown hover:text-dark-brown">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
