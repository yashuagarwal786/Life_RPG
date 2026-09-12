'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { AttributeKey, AttributeStats } from '@/types'
import { ATTRIBUTE_CONFIG } from '@/lib/rpg/config'

interface AttributeStatProps {
  attribute: AttributeKey
  value: number
  maxValue?: number
  showGain?: number
}

export default function AttributeStat({ attribute, value, maxValue = 100, showGain }: AttributeStatProps) {
  const config = ATTRIBUTE_CONFIG[attribute]
  const percentage = (value / maxValue) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <p className="font-semibold text-white">{config.label}</p>
            <p className="text-xs text-purple-400/60">{config.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${config.color}`}>{value}</p>
          {showGain ? (
            <p className="text-sm text-green-400 font-semibold">+{showGain}</p>
          ) : (
            <p className="text-xs text-purple-400/60">/{maxValue}</p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-obsidian-800 rounded-full overflow-hidden border border-purple-400/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${config.gradient}`}
        />
      </div>
    </motion.div>
  )
}
