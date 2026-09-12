'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signupSchema, loginSchema } from '@/lib/validations/auth'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
    avatar_class: (formData.get('avatar_class') as string) || 'warrior',
  }

  const result = signupSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const { email, password, username, avatar_class } = result.data

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, avatar_class },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Don't redirect - let the client show verification message
  // User needs to verify email first
  revalidatePath('/', 'layout')
  return { success: true, message: 'Check your email to verify your account' }
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const { email, password } = result.data

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
