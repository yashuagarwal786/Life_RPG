'use client'

import React, { useState, useCallback } from 'react'
import { createQuest, completeQuest } from '@/app/actions/quests'
import QuestCard from '@/components/ui/QuestCard'
import type { Quest } from '@/types'
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '@/lib/rpg/config'

interface QuestsClientPageProps {
  quests: Quest[]
}

function QuestForm({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError('')
    setIsLoading(true)
    try {
      const result = await createQuest(formData)
      if (result.error) {
        setError(result.error)
      } else {
        onSuccess()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="rpg-card p-6 space-y-4">
      <h2 className="font-cinzel font-bold text-xl text-white">Create New Quest</h2>

      {error && (
        <div className="p-3 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">Quest Title</label>
        <input
          type="text"
          name="title"
          required
          placeholder="e.g., Complete a 30-minute workout"
          className="w-full px-4 py-2 rounded-lg bg-obsidian-800 border border-purple-400/30 text-white placeholder-purple-400/40 focus:outline-none focus:border-arcane-400/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Add details about this quest..."
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-obsidian-800 border border-purple-400/30 text-white placeholder-purple-400/40 focus:outline-none focus:border-arcane-400/60 transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Category</label>
          <select
            name="category"
            required
            defaultValue="other"
            className="w-full px-4 py-2 rounded-lg bg-obsidian-800 border border-purple-400/30 text-white focus:outline-none focus:border-arcane-400/60 transition-colors"
          >
            {Object.entries(CATEGORY_CONFIG).map(([key, { label, emoji }]) => (
              <option key={key} value={key}>
                {emoji} {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Difficulty</label>
          <select
            name="difficulty"
            required
            defaultValue="medium"
            className="w-full px-4 py-2 rounded-lg bg-obsidian-800 border border-purple-400/30 text-white focus:outline-none focus:border-arcane-400/60 transition-colors"
          >
            {Object.entries(DIFFICULTY_CONFIG).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">Due Date (Optional)</label>
        <input
          type="date"
          name="due_date"
          className="w-full px-4 py-2 rounded-lg bg-obsidian-800 border border-purple-400/30 text-white focus:outline-none focus:border-arcane-400/60 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 rounded-lg bg-arcane-600 hover:bg-arcane-500 text-white font-semibold disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Creating...' : 'Create Quest'}
      </button>
    </form>
  )
}

export default function QuestsClientPage({ quests: initialQuests }: QuestsClientPageProps) {
  const [questList, setQuestList] = useState(initialQuests)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [completingId, setCompletingId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const filteredQuests = questList.filter(q => {
    if (filter === 'active') return q.status === 'active'
    if (filter === 'completed') return q.status === 'completed'
    return true
  })

  const handleComplete = useCallback(async (questId: string) => {
    setCompletingId(questId)
    setError('')
    try {
      const result = await completeQuest(questId)
      if (result.error) {
        setError(result.error)
      } else {
        setQuestList(questList.map(q => 
          q.id === questId ? { ...q, status: 'completed' as const } : q
        ))
      }
    } catch (err) {
      setError('Failed to complete quest')
    } finally {
      setCompletingId('')
    }
  }, [questList])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-cinzel font-black text-white mb-2">Quests</h1>
        <p className="text-purple-400/60">Track and complete your life quests</p>
      </div>

      <QuestForm onSuccess={() => window.location.reload()} />

      <div className="space-y-4">
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                filter === f
                  ? 'bg-arcane-600 text-white'
                  : 'bg-obsidian-800 text-purple-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {filteredQuests.length > 0 ? (
          <div className="space-y-3">
            {filteredQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={quest.status === 'active' ? handleComplete : undefined}
                isLoading={completingId === quest.id}
              />
            ))}
          </div>
        ) : (
          <div className="rpg-card p-8 text-center">
            <p className="text-purple-400/60">No {filter === 'all' ? '' : filter} quests</p>
          </div>
        )}
      </div>
    </div>
  )
}
