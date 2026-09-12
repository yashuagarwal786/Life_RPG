import type { QuestCategory, QuestDifficulty, AttributeStats, AttributeKey } from '@/types'

// ─── Category → Attribute mapping ────────────────────────────

interface AttributeGain {
  attribute: AttributeKey
  amount: number
}

const CATEGORY_ATTRIBUTE_MAP: Record<QuestCategory, AttributeGain[]> = {
  fitness:    [{ attribute: 'strength', amount: 2 }, { attribute: 'agility', amount: 1 }],
  coding:     [{ attribute: 'intelligence', amount: 1 }, { attribute: 'wisdom', amount: 2 }],
  study:      [{ attribute: 'intelligence', amount: 2 }, { attribute: 'wisdom', amount: 1 }],
  reading:    [{ attribute: 'intelligence', amount: 1 }, { attribute: 'wisdom', amount: 1 }],
  creativity: [{ attribute: 'creativity', amount: 2 }, { attribute: 'intelligence', amount: 1 }],
  social:     [{ attribute: 'charisma', amount: 2 }],
  habit:      [{ attribute: 'endurance', amount: 2 }],
  other:      [{ attribute: 'endurance', amount: 1 }],
}

const DIFFICULTY_MULTIPLIER: Record<QuestDifficulty, number> = {
  easy:      1,
  medium:    2,
  hard:      3,
  legendary: 5,
}

/**
 * Calculate attribute gains for completing a quest.
 */
export function getAttributeGains(
  category: QuestCategory,
  difficulty: QuestDifficulty
): Partial<AttributeStats> {
  const gains: Partial<AttributeStats> = {}
  const multiplier = DIFFICULTY_MULTIPLIER[difficulty]
  const mappings = CATEGORY_ATTRIBUTE_MAP[category]

  for (const { attribute, amount } of mappings) {
    gains[attribute] = (gains[attribute] ?? 0) + amount * multiplier
  }

  return gains
}

// ─── Attribute display helpers ────────────────────────────────

export const ATTRIBUTE_CONFIG: Record<
  AttributeKey,
  { label: string; icon: string; color: string; gradient: string; description: string }
> = {
  strength:     { label: 'Strength',     icon: '⚔️',  color: 'text-red-400',    gradient: 'bg-str-gradient',  description: 'Physical power from fitness quests' },
  intelligence: { label: 'Intelligence', icon: '🧠',  color: 'text-blue-400',   gradient: 'bg-int-gradient',  description: 'Mental acuity from study & coding' },
  agility:      { label: 'Agility',      icon: '🏃',  color: 'text-emerald-400',gradient: 'bg-agi-gradient',  description: 'Speed and reflexes from fitness' },
  endurance:    { label: 'Endurance',    icon: '🛡️',  color: 'text-amber-400',  gradient: 'bg-end-gradient',  description: 'Resilience from daily habits' },
  charisma:     { label: 'Charisma',     icon: '💬',  color: 'text-pink-400',   gradient: 'bg-cha-gradient',  description: 'Social influence from social quests' },
  creativity:   { label: 'Creativity',   icon: '🎨',  color: 'text-purple-400', gradient: 'bg-cre-gradient',  description: 'Imagination from creative quests' },
  wisdom:       { label: 'Wisdom',       icon: '📖',  color: 'text-sky-400',    gradient: 'bg-wis-gradient',  description: 'Deep knowledge from coding & study' },
}

export const ATTRIBUTE_KEYS: AttributeKey[] = [
  'strength', 'intelligence', 'agility', 'endurance', 'charisma', 'creativity', 'wisdom',
]
