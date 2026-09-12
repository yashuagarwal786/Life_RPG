'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createQuestSchema } from '@/lib/validations/quest'
import { computeRewards } from '@/lib/rpg/rewards'
import { getAttributeGains } from '@/lib/rpg/attributes'
import { calculateNewStreak } from '@/lib/rpg/streak'
import { levelFromXp, checkLevelUp } from '@/lib/rpg/xp'
import type { QuestDifficulty, QuestCategory, QuestReward } from '@/types'

// ─── Create Quest ─────────────────────────────────────────────

export async function createQuest(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const rawData = {
    title:       formData.get('title') as string,
    description: formData.get('description') as string,
    category:    formData.get('category') as string,
    difficulty:  formData.get('difficulty') as string,
    due_date:    formData.get('due_date') as string || undefined,
  }

  const result = createQuestSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const { difficulty } = result.data
  const { xp, gold } = computeRewards(difficulty as QuestDifficulty, 0)

  const { error } = await supabase.from('quests').insert({
    user_id:     user.id,
    title:       result.data.title,
    description: result.data.description || null,
    category:    result.data.category,
    difficulty:  result.data.difficulty,
    xp_reward:   xp,
    gold_reward:  gold,
    due_date:    result.data.due_date || null,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// ─── Complete Quest ───────────────────────────────────────────

export async function completeQuest(questId: string): Promise<{ error?: string; reward?: QuestReward }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Fetch quest
  const { data: quest, error: questError } = await supabase
    .from('quests')
    .select('*')
    .eq('id', questId)
    .eq('user_id', user.id)
    .single()

  if (questError || !quest) return { error: 'Quest not found' }
  if (quest.status !== 'active') return { error: 'Quest is not active' }

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) return { error: 'Profile not found' }

  // Compute rewards with streak bonus
  const streakUpdate = calculateNewStreak(profile)
  const effectiveStreak = streakUpdate ? streakUpdate.streak_count : profile.streak_count
  const { xp, gold, streakBonus } = computeRewards(quest.difficulty as QuestDifficulty, profile.streak_count)

  // Calculate new XP and level
  const oldXp = profile.xp
  const newXp = oldXp + xp
  const oldLevel = levelFromXp(oldXp)
  const newLevel = levelFromXp(newXp)
  const leveledUp = newLevel > oldLevel
  const newGold = profile.gold + gold

  // Attribute gains
  const attributeGains = getAttributeGains(quest.category as QuestCategory, quest.difficulty as QuestDifficulty)

  // --- Batch updates ---

  // 1. Mark quest as completed
  const { error: questUpdateError } = await supabase
    .from('quests')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', questId)

  if (questUpdateError) return { error: questUpdateError.message }

  // 2. Update profile (XP, gold, level, streak)
  const profileUpdate: Record<string, unknown> = {
    xp: newXp,
    gold: newGold,
    level: newLevel,
  }
  if (streakUpdate) {
    profileUpdate.streak_count = streakUpdate.streak_count
    profileUpdate.last_quest_date = streakUpdate.last_quest_date
  }

  const { error: profileUpdateError } = await supabase
    .from('profiles')
    .update(profileUpdate)
    .eq('id', user.id)

  if (profileUpdateError) return { error: profileUpdateError.message }

  // 3. Update character attributes
  const { data: attrs } = await supabase
    .from('character_attributes')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (attrs) {
    const attrUpdate: Record<string, number> = {}
    for (const [key, gain] of Object.entries(attributeGains)) {
      const current = attrs[key as keyof typeof attrs] as number
      attrUpdate[key] = current + (gain ?? 0)
    }

    await supabase
      .from('character_attributes')
      .update(attrUpdate)
      .eq('user_id', user.id)
  }

  // 4. Check & award badges
  const newBadges = await checkAndAwardBadges(supabase, user.id, {
    newLevel,
    streak: effectiveStreak,
    questCategory: quest.category,
    questDifficulty: quest.difficulty,
  })

  revalidatePath('/dashboard')
  revalidatePath('/character')
  revalidatePath(`/quests/${questId}`)

  return {
    reward: {
      xp,
      gold,
      streakBonus,
      totalXp: newXp,
      leveledUp,
      newLevel,
      oldLevel,
      attributeGains,
      newBadges,
    },
  }
}

// ─── Abandon Quest ────────────────────────────────────────────

export async function abandonQuest(questId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('quests')
    .update({ status: 'failed' })
    .eq('id', questId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// ─── Badge check helper ───────────────────────────────────────

async function checkAndAwardBadges(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
  context: { newLevel: number; streak: number; questCategory: string; questDifficulty: string }
) {
  // Fetch all badges
  const { data: allBadges } = await supabase.from('badges').select('*')
  if (!allBadges) return []

  // Fetch already-earned badges
  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set((earnedBadges || []).map((b: { badge_id: string }) => b.badge_id))

  // Count completed quests
  const { count: completedCount } = await supabase
    .from('quests')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')

  // Count category-specific quests
  const { count: categoryCount } = await supabase
    .from('quests')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')
    .eq('category', context.questCategory)

  const newlyEarned = []

  for (const badge of allBadges) {
    if (earnedIds.has(badge.id)) continue

    let earned = false
    switch (badge.condition_type) {
      case 'quests_completed':
        earned = (completedCount ?? 0) >= badge.condition_value
        break
      case 'level':
        earned = context.newLevel >= badge.condition_value
        break
      case 'streak':
        earned = context.streak >= badge.condition_value
        break
      case `category_${context.questCategory}`:
        earned = (categoryCount ?? 0) >= badge.condition_value
        break
      case 'legendary_quests':
        earned = context.questDifficulty === 'legendary'
        break
    }

    if (earned) {
      await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id })
      newlyEarned.push(badge)
    }
  }

  return newlyEarned
}
