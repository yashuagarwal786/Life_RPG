'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, Clock } from 'lucide-react'
import type { Quest } from '@/types'
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '@/lib/rpg/config'
import Link from 'next/link'

interface QuestCardProps {
  quest: Quest
  onComplete?: (questId: string) => Promise<void>
  isLoading?: boolean
}

export default function QuestCard({ quest, onComplete, isLoading }: QuestCardProps) {
  const category = CATEGORY_CONFIG[quest.category]
  const difficulty = DIFFICULTY_CONFIG[quest.difficulty]

  const statusConfig = {
    active: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Active' },
    completed: { icon: Check, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Completed' },
    failed: { icon: X, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Failed' },
  }

  const status = statusConfig[quest.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rpg-card p-5 hover:shadow-arcane transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl">{category.emoji}</span>
          <div className="flex-1">
            <h3 className="font-cinzel font-bold text-white line-clamp-2">{quest.title}</h3>
            {quest.description && (
              <p className="text-xs text-purple-400/60 mt-1 line-clamp-2">{quest.description}</p>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${status.bg}`}>
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded-md ${difficulty.bg}`}>
            <span className={`font-medium ${difficulty.color}`}>{difficulty.label}</span>
          </span>
          <span className={category.color}>{category.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <div>
            <p className="text-purple-400/60 text-xs">XP Reward</p>
            <p className="font-bold text-blue-400">{quest.xp_reward}</p>
          </div>
          <div>
            <p className="text-purple-400/60 text-xs">Gold Reward</p>
            <p className="font-bold text-yellow-400">{quest.gold_reward}</p>
          </div>
        </div>

        {quest.status === 'active' && onComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(quest.id)}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-sm disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Completing...' : 'Complete'}
          </motion.button>
        )}
      </div>

      {quest.due_date && (
        <p className="text-xs text-purple-400/40 mt-3 pt-3 border-t border-purple-400/10">
          Due: {new Date(quest.due_date).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  )
}
