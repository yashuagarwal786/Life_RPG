import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CharacterCard from '@/components/dashboard/CharacterCard'
import StatCard from '@/components/ui/StatCard'
import QuestCard from '@/components/ui/QuestCard'
import Link from 'next/link'
import { Plus, Sword, Zap, Users, Gift } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return <div className="text-red-400">Error loading profile</div>
  }

  // Fetch character attributes
  const { data: attributes } = await supabase
    .from('character_attributes')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch active quests (limit 5)
  const { data: activeQuests = [] } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch completed today count
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { data: completedToday = [] } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .gte('completed_at', today.toISOString())
    .lte('completed_at', new Date().toISOString())

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-cinzel font-black text-white mb-2">Dashboard</h1>
          <p className="text-purple-400/60">Welcome back, Adventurer</p>
        </div>
      </div>

      {/* Character Card */}
      <CharacterCard profile={profile} />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon="⚡"
          label="Quests Today"
          value={(completedToday || []).length}
          color="blue"
        />
        <StatCard
          icon="💰"
          label="Gold"
          value={profile.gold.toLocaleString()}
          color="yellow"
        />
        <StatCard
          icon="🔥"
          label="Streak"
          value={profile.streak_count}
          subtext="days"
          color="orange"
        />
        <StatCard
          icon="✨"
          label="Active"
          value={(activeQuests || []).length}
          subtext="quests"
          color="purple"
        />
      </div>

      {/* Attributes Overview */}
      {attributes && (
        <div className="rpg-card p-6">
          <h2 className="font-cinzel font-bold text-xl text-white mb-4">Character Attributes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['strength', 'intelligence', 'agility', 'endurance', 'charisma', 'creativity', 'wisdom'] as const).map((attr) => (
              <div key={attr} className="text-center p-3 rounded-lg bg-arcane-600/10 border border-arcane-500/30">
                <p className="text-2xl mb-1">{
                  attr === 'strength' ? '⚔️' :
                  attr === 'intelligence' ? '🧠' :
                  attr === 'agility' ? '🏃' :
                  attr === 'endurance' ? '🛡️' :
                  attr === 'charisma' ? '💬' :
                  attr === 'creativity' ? '🎨' :
                  '📖'
                }</p>
                <p className="text-xs text-purple-400/60 mb-1 capitalize">{attr}</p>
                <p className="text-lg font-bold text-arcane-200">{attributes[attr as keyof typeof attributes]}</p>
              </div>
            ))}
          </div>
          <Link href="/attributes" className="text-arcane-300 hover:text-arcane-200 text-sm mt-4 inline-block">
            View detailed stats →
          </Link>
        </div>
      )}

      {/* Active Quests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cinzel font-bold text-xl text-white">Active Quests</h2>
          <Link
            href="/quests"
            className="text-arcane-300 hover:text-arcane-200 text-sm font-semibold flex items-center gap-1"
          >
            View All <Sword className="w-4 h-4" />
          </Link>
        </div>
        {(activeQuests || []).length > 0 ? (
          <div className="space-y-3">
            {(activeQuests || []).map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <div className="rpg-card p-8 text-center">
            <p className="text-purple-400/60 mb-4">No active quests yet</p>
            <Link href="/quests?tab=create" className="inline-block px-4 py-2 bg-arcane-600 hover:bg-arcane-500 text-white font-semibold rounded-lg transition-colors">
              Create Your First Quest
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/quests?tab=create"
          className="rpg-card p-6 hover:shadow-arcane transition-all hover:scale-105 text-center group"
        >
          <div className="text-4xl mb-3">⚔️</div>
          <h3 className="font-cinzel font-bold text-white mb-1">New Quest</h3>
          <p className="text-xs text-purple-400/60">Create a new quest</p>
        </Link>

        <Link
          href="/shop"
          className="rpg-card p-6 hover:shadow-arcane transition-all hover:scale-105 text-center group"
        >
          <div className="text-4xl mb-3">🏪</div>
          <h3 className="font-cinzel font-bold text-white mb-1">Shop</h3>
          <p className="text-xs text-purple-400/60">Browse and purchase items</p>
        </Link>

        <Link
          href="/inventory"
          className="rpg-card p-6 hover:shadow-arcane transition-all hover:scale-105 text-center group"
        >
          <div className="text-4xl mb-3">🎒</div>
          <h3 className="font-cinzel font-bold text-white mb-1">Inventory</h3>
          <p className="text-xs text-purple-400/60">Your items and equipment</p>
        </Link>
      </div>
    </div>
  )
}
