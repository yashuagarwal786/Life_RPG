import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, level, gold, avatar_class')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-obsidian-950">
      <Sidebar profile={profile} />
      {/* Main content offset for desktop sidebar */}
      <div className="lg:pl-64 pt-14 lg:pt-0">
        <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
