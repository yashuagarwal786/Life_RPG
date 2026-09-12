'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  subtext?: string
  color?: 'blue' | 'yellow' | 'green' | 'purple' | 'red' | 'orange'
}

const colorConfig = {
  blue: 'from-blue-600 to-blue-800',
  yellow: 'from-yellow-600 to-yellow-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  red: 'from-red-600 to-red-800',
  orange: 'from-orange-600 to-orange-800',
}

export default function StatCard({ icon, label, value, subtext, color = 'blue' }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="rpg-card p-6 text-center"
    >
      <div className={`w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-br ${colorConfig[color]} flex items-center justify-center text-2xl shadow-lg`}>
        {icon}
      </div>
      <p className="text-purple-400/60 text-sm uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-white font-cinzel">{value}</p>
      {subtext && <p className="text-xs text-purple-400/40 mt-1">{subtext}</p>}
    </motion.div>
  )
}
