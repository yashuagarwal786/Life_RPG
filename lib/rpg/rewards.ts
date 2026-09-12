import type { QuestDifficulty } from '@/types'

// ─── Base rewards by difficulty ───────────────────────────────

export const BASE_REWARDS: Record<QuestDifficulty, { xp: number; gold: number }> = {
  easy:      { xp: 50,  gold: 10 },
  medium:    { xp: 150, gold: 30 },
  hard:      { xp: 350, gold: 75 },
  legendary: { xp: 750, gold: 200 },
}

/**
 * Compute final XP and gold rewards, including streak bonus.
 * Streak bonus: +10% XP per streak day, capped at +50%
 */
export function computeRewards(
  difficulty: QuestDifficulty,
  streakCount: number
): { xp: number; gold: number; streakBonus: number } {
  const base = BASE_REWARDS[difficulty]
  const streakMultiplier = Math.min(0.5, streakCount * 0.1)
  const streakBonus = Math.round(base.xp * streakMultiplier)

  return {
    xp: base.xp + streakBonus,
    gold: base.gold,
    streakBonus,
  }
}

// ─── Display helpers ──────────────────────────────────────────

export const DIFFICULTY_CONFIG: Record<
  QuestDifficulty,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  easy:      { label: 'Easy',      icon: '🌱', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  medium:    { label: 'Medium',    icon: '⚔️',  color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/30'   },
  hard:      { label: 'Hard',      icon: '🔥',  color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
  legendary: { label: 'Legendary', icon: '🐉',  color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
}

export const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  study:      { label: 'Study',      icon: '📚', color: 'text-blue-400'   },
  coding:     { label: 'Coding',     icon: '💻', color: 'text-green-400'  },
  fitness:    { label: 'Fitness',    icon: '💪', color: 'text-red-400'    },
  reading:    { label: 'Reading',    icon: '📖', color: 'text-yellow-400' },
  creativity: { label: 'Creativity', icon: '🎨', color: 'text-pink-400'   },
  social:     { label: 'Social',     icon: '🤝', color: 'text-cyan-400'   },
  habit:      { label: 'Habit',      icon: '🔄', color: 'text-orange-400' },
  other:      { label: 'Other',      icon: '⭐', color: 'text-gray-400'   },
}
