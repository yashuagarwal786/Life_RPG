'use client'

import React, { useState, useCallback } from 'react'
import { purchaseItem } from '@/app/actions/shop'
import ShopItemCard from '@/components/ui/ShopItemCard'
import type { ShopItem } from '@/types'
import { RARITY_CONFIG } from '@/lib/rpg/config'

interface ShopClientPageProps {
  items: ShopItem[]
  gold: number
  ownedItemIds: Set<string>
}

export default function ShopClientPage({ items: initialItems, gold: initialGold, ownedItemIds: initialOwnedIds }: ShopClientPageProps) {
  const [items] = useState(initialItems)
  const [gold, setGold] = useState(initialGold)
  const [ownedIds, setOwnedIds] = useState(initialOwnedIds)
  const [filter, setFilter] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all')
  const [purchasingId, setPurchasingId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true
    return item.rarity === filter
  })

  const handlePurchase = useCallback(async (itemId: string, cost: number) => {
    setPurchasingId(itemId)
    setError('')
    setSuccess('')

    if (gold < cost) {
      setError(`Not enough gold! You need ${cost - gold} more gold.`)
      setPurchasingId('')
      return
    }

    try {
      const result = await purchaseItem(itemId)
      if (result.error) {
        setError(result.error)
      } else {
        setGold(gold - cost)
        setOwnedIds(new Set([...Array.from(ownedIds), itemId]))
        setSuccess('Item purchased successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to purchase item')
    } finally {
      setPurchasingId('')
    }
  }, [gold, ownedIds])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-cinzel font-black text-white mb-2">Shop</h1>
          <p className="text-purple-400/60">Browse and purchase awesome items with your gold</p>
        </div>
        <div className="rpg-card px-6 py-3 text-center">
          <p className="text-purple-400/60 text-sm uppercase tracking-wider mb-1">Your Gold</p>
          <p className="text-2xl font-bold text-yellow-400 font-cinzel">{gold.toLocaleString()}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-lg bg-emerald-600/10 border border-emerald-500/30 text-emerald-400">
          {success}
        </div>
      )}

      {/* Rarity Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'common', 'rare', 'epic', 'legendary'] as const).map(f => {
          const config = f === 'all' ? null : RARITY_CONFIG[f]
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                filter === f
                  ? 'bg-arcane-600 text-white'
                  : config
                  ? `${config.bg} ${config.color} hover:text-white`
                  : 'bg-obsidian-800 text-purple-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Items' : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && ` (${items.filter(i => i.rarity === f).length})`}
            </button>
          )
        })}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <ShopItemCard
              key={item.id}
              item={item}
              owned={ownedIds.has(item.id)}
              onPurchase={ownedIds.has(item.id) ? undefined : () => handlePurchase(item.id, item.cost)}
              isLoading={purchasingId === item.id}
            />
          ))}
        </div>
      ) : (
        <div className="rpg-card p-12 text-center">
          <p className="text-purple-400/60 mb-4">No items found in this category</p>
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 bg-arcane-600 hover:bg-arcane-500 text-white font-semibold rounded-lg transition-colors"
          >
            Browse all items
          </button>
        </div>
      )}

      {/* Item Type Info */}
      <div className="rpg-card p-6">
        <h2 className="font-cinzel font-bold text-xl text-white mb-4">Item Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-semibold text-white mb-1">🎨 Themes</p>
            <p className="text-xs text-purple-400/60">Customize your UI theme</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">🏆 Badges</p>
            <p className="text-xs text-purple-400/60">Display your achievements</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">👑 Titles</p>
            <p className="text-xs text-purple-400/60">Show off your status</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">🖼️ Frames</p>
            <p className="text-xs text-purple-400/60">Avatar customization</p>
          </div>
        </div>
      </div>
    </div>
  )
}
