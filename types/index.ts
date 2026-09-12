// ============================================================
// Life RPG — Shared TypeScript Types
// ============================================================

export type AvatarClass = 'warrior' | 'mage' | 'rogue' | 'ranger'
export type QuestCategory = 'study' | 'coding' | 'fitness' | 'reading' | 'creativity' | 'social' | 'habit' | 'other'
export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary'
export type QuestStatus = 'active' | 'completed' | 'failed'
export type ItemType = 'theme' | 'badge' | 'title' | 'avatar_frame'
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary'

// ─── Database Row Types ───────────────────────────────────────

export interface Profile {
  id: string
  username: string
  avatar_class: AvatarClass
  level: number
  xp: number
  gold: number
  streak_count: number
  last_quest_date: string | null
  equipped_theme: string
  created_at: string
  updated_at: string
}

export interface CharacterAttributes {
  id: string
  user_id: string
  strength: number
  intelligence: number
  agility: number
  endurance: number
  charisma: number
  creativity: number
  wisdom: number
  updated_at: string
}

export interface Quest {
  id: string
  user_id: string
  title: string
  description: string | null
  category: QuestCategory
  difficulty: QuestDifficulty
  xp_reward: number
  gold_reward: number
  status: QuestStatus
  due_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface ShopItem {
  id: string
  name: string
  description: string | null
  type: ItemType
  cost: number
  icon: string
  rarity: ItemRarity
  metadata: Record<string, unknown>
}

export interface InventoryItem {
  id: string
  user_id: string
  item_id: string
  purchased_at: string
  is_equipped: boolean
  shop_items?: ShopItem
}

export interface Badge {
  id: string
  name: string
  description: string | null
  icon: string
  condition_type: string
  condition_value: number
}

export interface UserBadge {
  user_id: string
  badge_id: string
  earned_at: string
  badges?: Badge
}

// ─── UI / Application Types ───────────────────────────────────

export interface QuestReward {
  xp: number
  gold: number
  streakBonus: number
  totalXp: number
  leveledUp: boolean
  newLevel: number
  oldLevel: number
  attributeGains: Partial<Record<keyof AttributeStats, number>>
  newBadges: Badge[]
}

export interface AttributeStats {
  strength: number
  intelligence: number
  agility: number
  endurance: number
  charisma: number
  creativity: number
  wisdom: number
}

export interface CreateQuestInput {
  title: string
  description?: string
  category: QuestCategory
  difficulty: QuestDifficulty
  due_date?: string
}

export interface LevelProgress {
  level: number
  currentXp: number
  xpIntoLevel: number
  xpNeededForNextLevel: number
  progressPercent: number
  xpForCurrentLevel: number
  xpForNextLevel: number
}

export type AttributeKey = keyof AttributeStats
