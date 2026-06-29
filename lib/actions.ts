'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from './supabase/admin'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

/* ─── Subscription CRUD ─── */

export async function createSubscription(formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from('subscriptions').insert({
    company_id:      COMPANY_ID,
    name:            formData.get('name') as string,
    vendor:          (formData.get('vendor') as string) || null,
    category:        formData.get('category') as string,
    cost_per_month:  Number(formData.get('cost_per_month')),
    billing_cycle:   (formData.get('billing_cycle') as string) || 'monthly',
    next_renewal:    (formData.get('next_renewal') as string) || null,
    status:          (formData.get('status') as string) || 'active',
    is_trial:        formData.get('is_trial') === 'true',
    binding_months:  formData.get('binding_months') ? Number(formData.get('binding_months')) : null,
    notes:           (formData.get('notes') as string) || null,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

export async function updateSubscription(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from('subscriptions').update({
    name:           formData.get('name') as string,
    vendor:         (formData.get('vendor') as string) || null,
    category:       formData.get('category') as string,
    cost_per_month: Number(formData.get('cost_per_month')),
    billing_cycle:  (formData.get('billing_cycle') as string) || 'monthly',
    next_renewal:   (formData.get('next_renewal') as string) || null,
    status:         (formData.get('status') as string) || 'active',
    is_trial:       formData.get('is_trial') === 'true',
    binding_months: formData.get('binding_months') ? Number(formData.get('binding_months')) : null,
    notes:          (formData.get('notes') as string) || null,
    updated_at:     new Date().toISOString(),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

export async function deleteSubscription(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('subscriptions').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

/* ─── Alert actions ─── */

export async function resolveAlert(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('alerts').update({ status: 'resolved' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
  revalidatePath('/abonnemang')
}

export async function dismissAlert(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('alerts').update({ status: 'dismissed' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
}
