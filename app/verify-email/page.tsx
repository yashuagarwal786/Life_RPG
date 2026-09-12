'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get the token from URL using window.location
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const type = params.get('type')

        if (!token || type !== 'email') {
          setStatus('error')
          setMessage('Invalid verification link. Please try again.')
          return
        }

        const supabase = createClient()

        // Verify the email with the token
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        })

        if (error) {
          setStatus('error')
          setMessage(error.message)
          return
        }

        setStatus('success')
        setMessage('Email verified successfully!')

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } catch (err) {
        setStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [router])

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
        <div className="bg-obsidian-800/80 backdrop-blur border border-arcane-500/30 rounded-2xl p-8 shadow-2xl shadow-arcane/20 text-center">
          {status === 'loading' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-arcane-500/30 border-t-arcane-500"
              />
              <h2 className="text-2xl font-bold text-white mb-2">Verifying Email</h2>
              <p className="text-parchment-300">Please wait while we confirm your email...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
              >
                <span className="text-4xl">✓</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-parchment-300">Your account is confirmed. Redirecting to dashboard...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
              >
                <span className="text-4xl">✕</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-red-300 mb-6">{message}</p>

              <div className="space-y-3">
                <Link
                  href="/resend-verification"
                  className="block w-full px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-arcane-600 hover:bg-arcane-500 text-white border border-arcane-500/50 hover:border-arcane-400 shadow-arcane hover:shadow-arcane transition"
                >
                  Resend Verification Email
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-obsidian-700 hover:bg-obsidian-600 text-parchment-300 border border-arcane-500/30 hover:border-arcane-400 transition"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
