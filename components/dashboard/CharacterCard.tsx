'use client'

import { motion } from 'framer-motion'
import { getLevelProgress } from '@/lib/rpg/xp'
import { getStreakDisplay } from '@/lib/rpg/streak'
import type { Profile } from '@/types'
import Link from 'next/link'
import { Sword, Plus } from 'lucide-react'

const CLASS_DATA: Record<string, { emoji: string; color: string; title: string }> = {
  warrior: { emoji: '⚔️', color: 'text-red-400',    title: 'Warrior' },
  mage:    { emoji: '🧙', color: 'text-blue-400',   title: 'Mage'    },
  rogue:   { emoji: '🗡️', color: 'text-green-400',  title: 'Rogue'   },
  ranger:  { emoji: '🏹', color: 'text-yellow-400', title: 'Ranger'  },
}

export default function CharacterCard({ profile }: { profile: Profile }) {
  const progress = getLevelProgress(profile.xp)
  const streak = getStreakDisplay(profile.streak_count)
  const cls = CLASS_DATA[profile.avatar_class] ?? CLASS_DATA['warrior']

  return (
    <div className="rpg-card p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-arcane-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-arcane-600/20 border-2 border-arcane-500/40 flex items-center justify-center text-3xl shadow-arcane">
              {cls.emoji}
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-xl text-white">{profile.username}</h2>
              <p className={`text-sm font-medium ${cls.color}`}>{cls.title}</p>
              <p className="text-xs text-purple-400/60 mt-0.5">{streak.emoji} {streak.label}</p>
            </div>
          </div>

          {/* Level badge */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-arcane-600 to-arcane-800 flex flex-col items-center justify-center shadow-arcane border border-arcane-400/30">
              <p className="font-cinzel font-black text-xl text-white leading-none">{progress.level}</p>
              <p className="text-[9px] text-arcane-200 uppercase tracking-widest">Level</p>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-purple-400/60 uppercase tracking-wider">Experience</span>
            <span className="text-xs text-purple-300 font-medium">
              {progress.xpIntoLevel.toLocaleString()} / {progress.xpNeededForNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="xp-bar">
            <motion.div
              className="xp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress.progressPercent}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              aria-label={`${progress.progressPercent}% to next level`}
              role="progressbar"
              aria-valuenow={progress.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-xs text-purple-400/50 mt-1 text-right">
            {(progress.xpNeededForNextLevel - progress.xpIntoLevel).toLocaleString()} XP to Level {progress.level + 1}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-obsidian-900/60 rounded-xl p-3 text-center border border-purple-900/20">
            <p className="font-cinzel font-bold text-lg text-purple-100">{profile.xp.toLocaleString()}</p>
            <p className="text-xs text-purple-400/60">Total XP</p>
          </div>
          <div className="bg-obsidian-900/60 rounded-xl p-3 text-center border border-gold-600/20">
            <p className="font-cinzel font-bold text-lg gold-text">{profile.gold.toLocaleString()}</p>
            <p className="text-xs text-purple-400/60">Gold</p>
          </div>
          <div className="bg-obsidian-900/60 rounded-xl p-3 text-center border border-orange-600/20">
            <p className="font-cinzel font-bold text-lg text-orange-400">{profile.streak_count}</p>
            <p className="text-xs text-purple-400/60">Day Streak</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/quests/new" className="rpg-button-primary flex-1 flex items-center justify-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> New Quest
          </Link>
          <Link href="/character" className="rpg-button-ghost flex items-center justify-center gap-2 text-sm px-4">
            <Sword className="w-4 h-4" /> Attributes
          </Link>
        </div>
      </div>
    </div>
  )
}
