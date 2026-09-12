import type { Profile } from '@/types'

/**
 * Calculate new streak based on last quest date.
 * - Same day → streak unchanged (return null = no update needed)
 * - +1 consecutive day → streak++
 * - Gap > 1 day → streak resets to 1
 */
export function calculateNewStreak(profile: Profile): {
  streak_count: number
  last_quest_date: string
} | null {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  if (!profile.last_quest_date) {
    return { streak_count: 1, last_quest_date: todayStr }
  }

  if (profile.last_quest_date === todayStr) {
    // Already completed a quest today — no streak update needed
    return null
  }

  const lastDate = new Date(profile.last_quest_date)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (profile.last_quest_date === yesterdayStr) {
    // Consecutive day — increment streak
    return { streak_count: profile.streak_count + 1, last_quest_date: todayStr }
  }

  // Gap > 1 day — reset streak
  return { streak_count: 1, last_quest_date: todayStr }
}

/**
 * Get streak display data: color and label.
 */
export function getStreakDisplay(streakCount: number): {
  emoji: string
  label: string
  color: string
} {
  if (streakCount >= 30) return { emoji: '⚡', label: `${streakCount} Day Streak!`, color: 'text-yellow-400' }
  if (streakCount >= 7)  return { emoji: '🔥', label: `${streakCount} Day Streak!`, color: 'text-orange-400' }
  if (streakCount >= 3)  return { emoji: '🔥', label: `${streakCount} Day Streak`,  color: 'text-ember-500'  }
  if (streakCount >= 1)  return { emoji: '🔥', label: `${streakCount} Day Streak`,  color: 'text-red-400'   }
  return { emoji: '❄️', label: 'No streak yet', color: 'text-gray-500' }
}
