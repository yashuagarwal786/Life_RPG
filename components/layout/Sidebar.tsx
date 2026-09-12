'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import {
  LayoutDashboard, Sword, User, ShoppingBag, Package, LogOut, Menu, X, Zap
} from 'lucide-react'
import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { href: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/quests/new', icon: Sword,            label: 'New Quest' },
  { href: '/character',  icon: User,             label: 'Character' },
  { href: '/shop',       icon: ShoppingBag,      label: 'Shop'      },
  { href: '/inventory',  icon: Package,          label: 'Inventory' },
]

interface SidebarProps {
  profile: { username: string; level: number; gold: number; avatar_class: string } | null
}

const CLASS_EMOJI: Record<string, string> = {
  warrior: '⚔️', mage: '🧙', rogue: '🗡️', ranger: '🏹'
}

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(() => logout())
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-purple-900/20">
        <div className="w-8 h-8 rounded-lg bg-arcane-600 flex items-center justify-center shadow-arcane">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-cinzel font-bold text-white">Life RPG</span>
      </div>

      {/* Profile summary */}
      {profile && (
        <div className="px-4 py-4 border-b border-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-arcane-600/20 border border-arcane-500/30 flex items-center justify-center text-lg">
              {CLASS_EMOJI[profile.avatar_class] ?? '⚔️'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-purple-100 truncate">{profile.username}</p>
              <p className="text-xs text-purple-400/60">Level {profile.level} · 💰 {profile.gold}g</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-arcane-600/20 text-purple-100 border border-arcane-500/30'
                  : 'text-purple-400/70 hover:text-purple-100 hover:bg-purple-900/20'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-purple-900/20">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-400/70 hover:text-red-400 hover:bg-red-900/10 transition-all duration-200 w-full"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-obsidian-900 border-r border-purple-900/20 min-h-screen fixed left-0 top-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-obsidian-950/90 backdrop-blur-xl border-b border-purple-900/20 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-arcane-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-cinzel font-bold text-white text-sm">Life RPG</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-purple-300 hover:text-white"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-30"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-obsidian-900 border-r border-purple-900/20 z-40 flex flex-col"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
