import React from 'react'
import { motion } from 'framer-motion'
import type { Badge as BadgeType } from '@/types'

interface BadgeProps {
  badge: BadgeType
  earned: boolean
  earnedAt?: string
}

export default function Badge({ badge, earned, earnedAt }: BadgeProps) {
  return (
    <motion.div
      whileHover={earned ? { scale: 1.05 } : undefined}
      className={`
        flex flex-col items-center justify-center p-4 rounded-lg border-2
        ${earned
          ? 'bg-arcane-600/20 border-arcane-400/60 text-white'
          : 'bg-obsidian-800 border-obsidian-700 text-purple-400/40'}
      `}
    >
      <div className="text-3xl mb-2">{badge.icon}</div>
      <h3 className="font-semibold text-sm text-center">{badge.name}</h3>
      {earned && earnedAt && (
        <p className="text-xs text-purple-400/60 mt-1">
          {new Date(earnedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  )
}
