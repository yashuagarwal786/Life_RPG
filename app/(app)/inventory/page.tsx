import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import InventoryClientPage from './inventory-client'

export default async function InventoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch user's inventory with shop item details
  const { data: inventoryItems = [] } = await supabase
    .from('user_inventory')
    .select(`
      id,
      item_id,
      purchased_at,
      is_equipped,
      shop_items (*)
    `)
    .eq('user_id', user.id)
    .order('purchased_at', { ascending: false })

  return <InventoryClientPage inventoryItems={inventoryItems as any} />
}
