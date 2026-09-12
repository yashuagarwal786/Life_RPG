'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { motion } from 'framer-motion'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [verificationSent, setVerificationSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if verification was just sent
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification_sent') === 'true') {
      setVerificationSent(true)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-obsidian-900 via-obsidian-800 to-obsidian-900 flex items-center justify-center p-4">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-arcane-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-arcane-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-obsidian-800/80 backdrop-blur border border-arcane-500/30 rounded-2xl p-8 shadow-2xl shadow-arcane/20">
          {/* Logo */}
          <Link href="/" className="text-center block mb-8 hover:opacity-80 transition">
            <h1 className="text-4xl font-black text-white mb-2">LIFE RPG</h1>
            <p className="text-sm text-arcane-400 uppercase tracking-widest">Welcome back, adventurer</p>
          </Link>

          {/* Success Message */}
          {verificationSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm"
            >
              ✅ Verification email sent! Check your inbox to confirm your email address.
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm space-y-2"
            >
              <p className="font-semibold">⚠️ {error}</p>
              {error.toLowerCase().includes('email') && error.toLowerCase().includes('not') && (
                <div className="text-xs mt-2 pt-2 border-t border-red-500/30 space-y-1">
                  <p>📧 Check your email for a confirmation link</p>
                  <p>💡 If you don't see it, check your spam folder</p>
                  <p className="mt-2">
                    <Link href="/resend-verification" className="text-arcane-300 hover:text-arcane-200 underline">
                      Resend verification email →
                    </Link>
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-parchment-100 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="adventurer@example.com"
                className="w-full px-4 py-3 bg-obsidian-700 border border-arcane-500/30 rounded-lg text-parchment-100 placeholder-parchment-700 focus:outline-none focus:ring-2 focus:ring-arcane-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-parchment-100 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-obsidian-700 border border-arcane-500/30 rounded-lg text-parchment-100 placeholder-parchment-700 focus:outline-none focus:ring-2 focus:ring-arcane-500 focus:border-transparent transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-arcane-600 hover:bg-arcane-500 text-white border border-arcane-500/50 hover:border-arcane-400 shadow-arcane hover:shadow-arcane transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Enter the Adventure'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-arcane-500/30 to-transparent"></div>
            <span className="text-xs text-parchment-600 uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-arcane-500/30 to-transparent"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-parchment-300 text-sm">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-arcane-400 hover:text-arcane-300 transition"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-parchment-600 hover:text-parchment-400 text-sm transition"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
