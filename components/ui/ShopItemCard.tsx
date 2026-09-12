'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ShopItem } from '@/types'
import { RARITY_CONFIG } from '@/lib/rpg/config'

interface ShopItemCardProps {
  item: ShopItem
  owned?: boolean
  onPurchase?: () => Promise<void>
  isLoading?: boolean
}

export default function ShopItemCard({ item, owned, onPurchase, isLoading }: ShopItemCardProps) {
  const rarity = RARITY_CONFIG[item.rarity]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: owned ? 1 : 1.05 }}
      className={`rpg-card p-6 text-center relative overflow-hidden border-2 transition-all
        ${owned 
          ? 'border-emerald-400/30 bg-emerald-600/5' 
          : `${rarity.border}`}
      `}
    >
      {owned && (
        <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold">
          ✓ Owned
        </div>
      )}

      <div className="text-4xl mb-3">{item.icon}</div>
      <h3 className="font-cinzel font-bold text-white mb-1">{item.name}</h3>
      
      <div className={`inline-block px-2 py-1 rounded-md ${rarity.bg} mb-3`}>
        <p className={`text-xs font-bold ${rarity.color}`}>{rarity.label}</p>
      </div>

      {item.description && (
        <p className="text-xs text-purple-400/60 mb-4 line-clamp-2">{item.description}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-purple-400/20">
        <div className="flex items-center gap-1">
          <span className="text-xl">💰</span>
          <p className="font-bold text-yellow-400">{item.cost}</p>
        </div>

        {!owned && onPurchase && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPurchase()}
            disabled={isLoading}
            className="px-3 py-1 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold text-sm disabled:opacity-50 transition-colors"
          >
            {isLoading ? '...' : 'Buy'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
