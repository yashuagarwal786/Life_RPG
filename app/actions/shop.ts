'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

// ─── Purchase Item ────────────────────────────────────────────

export async function purchaseItem(itemId: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Fetch item
  const { data: item, error: itemError } = await supabase
    .from('shop_items')
    .select('*')
    .eq('id', itemId)
    .single()

  if (itemError || !item) return { error: 'Item not found' }

  // Check already owned
  const { data: existing } = await supabase
    .from('user_inventory')
    .select('id')
    .eq('user_id', user.id)
    .eq('item_id', itemId)
    .single()

  if (existing) return { error: 'You already own this item' }

  // Check gold
  const { data: profile } = await supabase
    .from('profiles')
    .select('gold')
    .eq('id', user.id)
    .single()

  if (!profile || profile.gold < item.cost) {
    return { error: `Not enough Gold. Need ${item.cost}, have ${profile?.gold ?? 0}` }
  }

  // Deduct gold
  const { error: goldError } = await supabase
    .from('profiles')
    .update({ gold: profile.gold - item.cost })
    .eq('id', user.id)

  if (goldError) return { error: goldError.message }

  // Add to inventory
  const { error: inventoryError } = await supabase
    .from('user_inventory')
    .insert({ user_id: user.id, item_id: itemId })

  if (inventoryError) {
    // Refund gold on failure
    await supabase
      .from('profiles')
      .update({ gold: profile.gold })
      .eq('id', user.id)
    return { error: inventoryError.message }
  }

  revalidatePath('/shop')
  revalidatePath('/inventory')
  return { success: true }
}

// ─── Equip Item ───────────────────────────────────────────────

export async function equipItem(inventoryId: string, itemType: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Unequip all items of same type
  const { data: ownedItems } = await supabase
    .from('user_inventory')
    .select('id, shop_items(type)')
    .eq('user_id', user.id)

  const sameTypeIds = (ownedItems || [])
    .filter((inv: any) => inv.shop_items?.type === itemType)
    .map((inv: any) => inv.id)

  if (sameTypeIds.length > 0) {
    await supabase
      .from('user_inventory')
      .update({ is_equipped: false })
      .in('id', sameTypeIds)
  }

  // Equip the selected item
  const { error } = await supabase
    .from('user_inventory')
    .update({ is_equipped: true })
    .eq('id', inventoryId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  // If it's a theme, update profile.equipped_theme
  if (itemType === 'theme') {
    const { data: invItem } = await supabase
      .from('user_inventory')
      .select('shop_items(metadata)')
      .eq('id', inventoryId)
      .single()

    const themeKey = (invItem?.shop_items as { metadata?: { key?: string } })?.metadata?.key
    if (themeKey) {
      await supabase.from('profiles').update({ equipped_theme: themeKey }).eq('id', user.id)
    }
  }

  revalidatePath('/inventory')
  return { success: true }
}
