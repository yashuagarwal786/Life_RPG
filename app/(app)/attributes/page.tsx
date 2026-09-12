import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AttributeStat from '@/components/ui/AttributeStat'
import type { AttributeKey } from '@/types'

export default async function AttributesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch character attributes
  const { data: attributes, error } = await supabase
    .from('character_attributes')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error || !attributes) {
    return <div className="text-red-400">Error loading attributes</div>
  }

  const attributeKeys: AttributeKey[] = ['strength', 'intelligence', 'agility', 'endurance', 'charisma', 'creativity', 'wisdom']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-cinzel font-black text-white mb-2">Character Attributes</h1>
        <p className="text-purple-400/60">Your stats grow as you complete quests in different categories</p>
      </div>

      {/* Attribute Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attributeKeys.map(attr => (
          <AttributeStat
            key={attr}
            attribute={attr}
            value={attributes[attr as keyof typeof attributes] as number}
            maxValue={100}
          />
        ))}
      </div>

      {/* Attribute Info */}
      <div className="rpg-card p-6 space-y-4">
        <h2 className="font-cinzel font-bold text-xl text-white">How to Improve Attributes</h2>
        
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-2xl">⚔️</span>
            <div>
              <p className="font-semibold text-white">Strength</p>
              <p className="text-sm text-purple-400/60">Increases with Fitness quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <p className="font-semibold text-white">Intelligence</p>
              <p className="text-sm text-purple-400/60">Increases with Study and Coding quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">🏃</span>
            <div>
              <p className="font-semibold text-white">Agility</p>
              <p className="text-sm text-purple-400/60">Increases with Fitness quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="font-semibold text-white">Endurance</p>
              <p className="text-sm text-purple-400/60">Increases with Habit quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold text-white">Charisma</p>
              <p className="text-sm text-purple-400/60">Increases with Social quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-semibold text-white">Creativity</p>
              <p className="text-sm text-purple-400/60">Increases with Creativity quests</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-semibold text-white">Wisdom</p>
              <p className="text-sm text-purple-400/60">Increases with Study and Coding quests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="rpg-card p-6">
        <h2 className="font-cinzel font-bold text-xl text-white mb-4">Difficulty Multipliers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-lg bg-green-400/10">
            <p className="text-sm font-bold text-green-400 mb-1">Easy</p>
            <p className="text-lg font-bold text-green-300">1x</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-yellow-400/10">
            <p className="text-sm font-bold text-yellow-400 mb-1">Medium</p>
            <p className="text-lg font-bold text-yellow-300">2x</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-400/10">
            <p className="text-sm font-bold text-orange-400 mb-1">Hard</p>
            <p className="text-lg font-bold text-orange-300">3x</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-400/10">
            <p className="text-sm font-bold text-purple-400 mb-1">Legendary</p>
            <p className="text-lg font-bold text-purple-300">5x</p>
          </div>
        </div>
      </div>
    </div>
  )
}
