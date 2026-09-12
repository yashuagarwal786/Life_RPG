'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleResend(e: React.FormEvent) {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        setStatus('error')
        setMessage(error.message)
        return
      }

      setStatus('success')
      setMessage(`Verification email sent to ${email}. Check your inbox!`)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
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
            <p className="text-sm text-arcane-400 uppercase tracking-widest">Resend Verification</p>
          </Link>

          {/* Status Messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm"
            >
              ✅ {message}
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              ❌ {message}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleResend} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-parchment-100 mb-2">
                Email Address
              </label>
              <p className="text-xs text-parchment-600 mb-3">
                Enter the email address associated with your account to receive a new verification link.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-4 py-3 bg-obsidian-700 border border-arcane-500/30 rounded-lg text-parchment-100 placeholder-parchment-700 focus:outline-none focus:ring-2 focus:ring-arcane-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-arcane-600 hover:bg-arcane-500 text-white border border-arcane-500/50 hover:border-arcane-400 shadow-arcane hover:shadow-arcane transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Resend Verification Email'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-arcane-500/30 to-transparent"></div>
            <span className="text-xs text-parchment-600 uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-arcane-500/30 to-transparent"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-parchment-300 text-sm">
            Ready to log in?{' '}
            <Link href="/login" className="font-semibold text-arcane-400 hover:text-arcane-300 transition">
              Go back to login
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-parchment-600 hover:text-parchment-400 text-sm transition">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
