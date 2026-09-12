'use client'

import React, { useState } from 'react'
import { equipItem } from '@/app/actions/shop'
import type { InventoryItem, ShopItem } from '@/types'
import { motion } from 'framer-motion'

interface InventoryWithItem extends Omit<InventoryItem, 'shop_items'> {
  shop_items?: ShopItem
}

interface InventoryClientPageProps {
  inventoryItems: InventoryWithItem[]
}

export default function InventoryClientPage({ inventoryItems: initialItems }: InventoryClientPageProps) {
  const [items, setItems] = useState(initialItems)
  const [equipId, setEquipId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  // Group by type
  const itemsByType = {
    theme: items.filter(i => i.shop_items?.type === 'theme'),
    badge: items.filter(i => i.shop_items?.type === 'badge'),
    title: items.filter(i => i.shop_items?.type === 'title'),
    avatar_frame: items.filter(i => i.shop_items?.type === 'avatar_frame'),
  }

  const handleEquip = async (inventoryId: string, itemType?: string) => {
    setEquipId(inventoryId)
    setError('')
    setSuccess('')

    try {
      const result = await equipItem(inventoryId, itemType || 'theme')
      if (result.error) {
        setError(result.error)
      } else {
        setItems(items.map(item =>
          item.id === inventoryId ? { ...item, is_equipped: true } : item
        ))
        setSuccess('Item equipped!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to equip item')
    } finally {
      setEquipId('')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-cinzel font-black text-white mb-2">Inventory</h1>
        <p className="text-purple-400/60">Manage your items and equipment</p>
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

      {items.length === 0 ? (
        <div className="rpg-card p-12 text-center">
          <p className="text-purple-400/60 mb-4">Your inventory is empty</p>
          <a href="/shop" className="inline-block px-4 py-2 bg-arcane-600 hover:bg-arcane-500 text-white font-semibold rounded-lg transition-colors">
            Visit the Shop
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Themes */}
          {itemsByType.theme.length > 0 && (
            <div>
              <h2 className="font-cinzel font-bold text-xl text-white mb-4">🎨 Themes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsByType.theme.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rpg-card p-6 text-center border-2 transition-all ${
                      item.is_equipped
                        ? 'border-emerald-400 bg-emerald-600/5'
                        : 'border-purple-400/30'
                    }`}
                  >
                    <div className="text-4xl mb-3">{item.shop_items?.icon}</div>
                    <h3 className="font-cinzel font-bold text-white mb-2">{item.shop_items?.name}</h3>
                    {item.is_equipped && (
                      <div className="inline-block px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold mb-3">
                        ✓ Equipped
                      </div>
                    )}
                    {!item.is_equipped && (
                      <button
                        onClick={() => handleEquip(item.id, 'theme')}
                        disabled={equipId === item.id}
                        className="w-full px-4 py-2 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold disabled:opacity-50 transition-colors"
                      >
                        {equipId === item.id ? 'Equipping...' : 'Equip'}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          {itemsByType.badge.length > 0 && (
            <div>
              <h2 className="font-cinzel font-bold text-xl text-white mb-4">🏆 Badges</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {itemsByType.badge.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rpg-card p-6 text-center"
                  >
                    <div className="text-3xl mb-2">{item.shop_items?.icon}</div>
                    <p className="text-sm font-semibold text-white line-clamp-2">{item.shop_items?.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Titles */}
          {itemsByType.title.length > 0 && (
            <div>
              <h2 className="font-cinzel font-bold text-xl text-white mb-4">👑 Titles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsByType.title.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rpg-card p-6 text-center border-2 transition-all ${
                      item.is_equipped
                        ? 'border-emerald-400 bg-emerald-600/5'
                        : 'border-purple-400/30'
                    }`}
                  >
                    <div className="text-4xl mb-3">{item.shop_items?.icon}</div>
                    <h3 className="font-cinzel font-bold text-white mb-2">{item.shop_items?.name}</h3>
                    {item.is_equipped && (
                      <div className="inline-block px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold mb-3">
                        ✓ Equipped
                      </div>
                    )}
                    {!item.is_equipped && (
                      <button
                        onClick={() => handleEquip(item.id, 'title')}
                        disabled={equipId === item.id}
                        className="w-full px-4 py-2 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold disabled:opacity-50 transition-colors"
                      >
                        {equipId === item.id ? 'Equipping...' : 'Equip'}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Avatar Frames */}
          {itemsByType.avatar_frame.length > 0 && (
            <div>
              <h2 className="font-cinzel font-bold text-xl text-white mb-4">🖼️ Avatar Frames</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsByType.avatar_frame.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rpg-card p-6 text-center border-2 transition-all ${
                      item.is_equipped
                        ? 'border-emerald-400 bg-emerald-600/5'
                        : 'border-purple-400/30'
                    }`}
                  >
                    <div className="text-4xl mb-3">{item.shop_items?.icon}</div>
                    <h3 className="font-cinzel font-bold text-white mb-2">{item.shop_items?.name}</h3>
                    {item.is_equipped && (
                      <div className="inline-block px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold mb-3">
                        ✓ Equipped
                      </div>
                    )}
                    {!item.is_equipped && (
                      <button
                        onClick={() => handleEquip(item.id, 'avatar_frame')}
                        disabled={equipId === item.id}
                        className="w-full px-4 py-2 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold disabled:opacity-50 transition-colors"
                      >
                        {equipId === item.id ? 'Equipping...' : 'Equip'}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
