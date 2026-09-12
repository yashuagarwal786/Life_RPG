import type { QuestCategory, QuestDifficulty, AttributeKey } from '@/types'

// ─── Category Configuration ───────────────────────────────────

export const CATEGORY_CONFIG: Record<QuestCategory, { 
  label: string
  emoji: string
  color: string
  description: string
}> = {
  fitness: {
    label: 'Fitness',
    emoji: '💪',
    color: 'text-red-400',
    description: 'Physical training and exercise'
  },
  coding: {
    label: 'Coding',
    emoji: '💻',
    color: 'text-blue-400',
    description: 'Programming and development'
  },
  study: {
    label: 'Study',
    emoji: '📚',
    color: 'text-purple-400',
    description: 'Learning and education'
  },
  reading: {
    label: 'Reading',
    emoji: '📖',
    color: 'text-sky-400',
    description: 'Books and literature'
  },
  creativity: {
    label: 'Creativity',
    emoji: '🎨',
    color: 'text-pink-400',
    description: 'Art, music, and creative projects'
  },
  social: {
    label: 'Social',
    emoji: '🤝',
    color: 'text-green-400',
    description: 'Social activities and networking'
  },
  habit: {
    label: 'Habit',
    emoji: '🔄',
    color: 'text-amber-400',
    description: 'Daily habits and routines'
  },
  other: {
    label: 'Other',
    emoji: '✨',
    color: 'text-purple-300',
    description: 'Miscellaneous quests'
  }
}

// ─── Difficulty Configuration ─────────────────────────────────

export const DIFFICULTY_CONFIG: Record<QuestDifficulty, {
  label: string
  color: string
  bg: string
  multiplier: number
  description: string
}> = {
  easy: {
    label: 'Easy',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    multiplier: 1,
    description: 'Quick tasks, 5-15 minutes'
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    multiplier: 2,
    description: 'Standard tasks, 15-60 minutes'
  },
  hard: {
    label: 'Hard',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    multiplier: 3,
    description: 'Challenging tasks, 1-3 hours'
  },
  legendary: {
    label: 'Legendary',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    multiplier: 5,
    description: 'Epic challenges, 3+ hours'
  }
}

// ─── Attribute Configuration (from attributes.ts) ────────────

export const ATTRIBUTE_CONFIG: Record<AttributeKey, {
  label: string
  icon: string
  color: string
  gradient: string
  description: string
}> = {
  strength: {
    label: 'Strength',
    icon: '⚔️',
    color: 'text-red-400',
    gradient: 'from-red-600 to-red-800',
    description: 'Physical power from fitness quests'
  },
  intelligence: {
    label: 'Intelligence',
    icon: '🧠',
    color: 'text-blue-400',
    gradient: 'from-blue-600 to-blue-800',
    description: 'Mental acuity from study & coding'
  },
  agility: {
    label: 'Agility',
    icon: '🏃',
    color: 'text-emerald-400',
    gradient: 'from-emerald-600 to-emerald-800',
    description: 'Speed and reflexes from fitness'
  },
  endurance: {
    label: 'Endurance',
    icon: '🛡️',
    color: 'text-amber-400',
    gradient: 'from-amber-600 to-amber-800',
    description: 'Resilience from daily habits'
  },
  charisma: {
    label: 'Charisma',
    icon: '💬',
    color: 'text-pink-400',
    gradient: 'from-pink-600 to-pink-800',
    description: 'Social influence from social quests'
  },
  creativity: {
    label: 'Creativity',
    icon: '🎨',
    color: 'text-purple-400',
    gradient: 'from-purple-600 to-purple-800',
    description: 'Imagination from creative quests'
  },
  wisdom: {
    label: 'Wisdom',
    icon: '📖',
    color: 'text-sky-400',
    gradient: 'from-sky-600 to-sky-800',
    description: 'Deep knowledge from coding & study'
  }
}

// ─── Rarity Configuration ─────────────────────────────────────

export const RARITY_CONFIG = {
  common: {
    label: 'Common',
    color: 'text-gray-400',
    bg: 'bg-gray-400/10',
    border: 'border-gray-400/30'
  },
  rare: {
    label: 'Rare',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30'
  },
  epic: {
    label: 'Epic',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30'
  },
  legendary: {
    label: 'Legendary',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30'
  }
}
