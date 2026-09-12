import type { LevelProgress } from '@/types'

/**
 * Non-linear XP formula: XP required to reach level N = floor(100 × N^1.5)
 * Level 1 = 0 XP (starting)
 * Level 2 = 283 XP
 * Level 5 = 1118 XP
 * Level 10 = 3162 XP
 * Level 20 = 8944 XP
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0
  return Math.floor(100 * Math.pow(level, 1.5))
}

/**
 * Calculate which level corresponds to a total XP amount.
 */
export function levelFromXp(totalXp: number): number {
  let level = 1
  while (xpForLevel(level + 1) <= totalXp) {
    level++
  }
  return level
}

/**
 * Returns full level progress information from a total XP value.
 */
export function getLevelProgress(totalXp: number): LevelProgress {
  const level = levelFromXp(totalXp)
  const xpForCurrentLevel = xpForLevel(level)
  const xpForNextLevel = xpForLevel(level + 1)
  const xpIntoLevel = totalXp - xpForCurrentLevel
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel
  const progressPercent = Math.min(100, Math.round((xpIntoLevel / xpNeededForNextLevel) * 100))

  return {
    level,
    currentXp: totalXp,
    xpIntoLevel,
    xpNeededForNextLevel,
    progressPercent,
    xpForCurrentLevel,
    xpForNextLevel,
  }
}

/**
 * Returns number of XP from old total to new total that crossed a level boundary.
 * Returns the new level if a level-up occurred, otherwise null.
 */
export function checkLevelUp(oldXp: number, newXp: number): number | null {
  const oldLevel = levelFromXp(oldXp)
  const newLevel = levelFromXp(newXp)
  return newLevel > oldLevel ? newLevel : null
}
