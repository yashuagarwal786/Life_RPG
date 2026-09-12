import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QuestsClientPage from './quests-client'

export default async function QuestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch all quests for this user
  const { data: quests = [], error } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-400">Error loading quests</div>
  }

  return <QuestsClientPage quests={quests || []} />
}
