import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ShopClientPage from './shop-client'

export default async function ShopPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch all shop items
  const { data: items = [] } = await supabase
    .from('shop_items')
    .select('*')
    .order('rarity', { ascending: false })

  // Fetch user profile for gold
  const { data: profile } = await supabase
    .from('profiles')
    .select('gold')
    .eq('id', user.id)
    .single()

  // Fetch user's owned items
  const { data: ownedItems = [] } = await supabase
    .from('user_inventory')
    .select('item_id')
    .eq('user_id', user.id)

  const ownedItemIds = new Set((ownedItems || []).map(i => i.item_id))

  return <ShopClientPage items={items || []} gold={profile?.gold || 0} ownedItemIds={ownedItemIds} />
}
