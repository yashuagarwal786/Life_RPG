'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { motion } from 'framer-motion'

const CLASSES = [
  {
    id: 'warrior',
    name: 'Warrior',
    emoji: '⚔️',
    description: 'Strength & Agility',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'mage',
    name: 'Mage',
    emoji: '🧙',
    description: 'Intelligence & Wisdom',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'rogue',
    name: 'Rogue',
    emoji: '🗡️',
    description: 'Agility & Speed',
    color: 'from-gray-500 to-slate-500',
  },
  {
    id: 'ranger',
    name: 'Ranger',
    emoji: '🏹',
    description: 'Wisdom & Charisma',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string>('warrior')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set('avatar_class', selectedClass)

    try {
      const result = await signup(formData)
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
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-obsidian-800/80 backdrop-blur border border-arcane-500/30 rounded-2xl p-8 shadow-2xl shadow-arcane/20">
          {/* Logo */}
          <Link href="/" className="text-center block mb-2 hover:opacity-80 transition">
            <h1 className="text-4xl font-black text-white">LIFE RPG</h1>
            <p className="text-sm text-arcane-400 uppercase tracking-widest mt-2">
              Create your adventure
            </p>
          </Link>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-parchment-100 mb-2">
                Character Name
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your name"
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

            {/* Class Selection */}
            <div>
              <label className="block text-sm font-semibold text-parchment-100 mb-4">
                Choose Your Class
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CLASSES.map((classOption) => (
                  <motion.button
                    key={classOption.id}
                    type="button"
                    onClick={() => setSelectedClass(classOption.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedClass === classOption.id
                        ? `border-arcane-400 bg-arcane-500/20 ring-2 ring-arcane-400`
                        : `border-arcane-500/30 bg-obsidian-700 hover:bg-obsidian-600`
                    }`}
                  >
                    <div className="text-3xl mb-2">{classOption.emoji}</div>
                    <div className="font-bold text-white text-sm">{classOption.name}</div>
                    <div className="text-xs text-parchment-600">{classOption.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-arcane-600 hover:bg-arcane-500 text-white border border-arcane-500/50 hover:border-arcane-400 shadow-arcane hover:shadow-arcane transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Begin Your Adventure'}
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
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-arcane-400 hover:text-arcane-300 transition"
            >
              Log in here
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
