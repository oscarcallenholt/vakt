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
    updated_at:      new Date().toISOString(),
  }).eq('id', id).eq('company_id', COMPANY_ID)

  if (error) throw new Error(error.message)
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

export async function deleteSubscription(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('subscriptions').delete().eq('id', id).eq('company_id', COMPANY_ID)
  if (error) throw new Error(error.message)
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

export async function resolveAlert(id: string) {
  const supabase = createAdminClient()
  await supabase.from('alerts').update({ status: 'resolved' }).eq('id', id)
  revalidatePath('/dashboard')
  revalidatePath('/abonnemang')
}

export async function dismissAlert(id: string) {
  const supabase = createAdminClient()
  await supabase.from('alerts').update({ status: 'dismissed' }).eq('id', id)
  revalidatePath('/dashboard')
}

/* ─── Email connections ─── */

export async function saveEmailConnection(formData: FormData) {
  const supabase = createAdminClient()
  const email    = formData.get('email') as string
  const password = formData.get('password') as string
  const host     = formData.get('imap_host') as string
  const port     = Number(formData.get('imap_port')) || 993

  const { error } = await supabase.from('email_connections').insert({
    company_id:    COMPANY_ID,
    email,
    imap_password: password,
    imap_host:     host,
    imap_port:     port,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/installningar')
  revalidatePath('/scanner')
}

export async function deleteEmailConnection(id: string) {
  const supabase = createAdminClient()
  await supabase.from('email_connections').delete().eq('id', id).eq('company_id', COMPANY_ID)
  revalidatePath('/installningar')
  revalidatePath('/scanner')
}

/* ─── Discovered subscriptions ─── */

export async function importDiscoveredSubscription(id: string) {
  const supabase = createAdminClient()

  const { data: disc } = await supabase
    .from('discovered_subscriptions')
    .select('*')
    .eq('id', id)
    .single()

  if (!disc) throw new Error('Hittades inte')

  await supabase.from('subscriptions').insert({
    company_id:     COMPANY_ID,
    name:           disc.name,
    vendor:         disc.vendor,
    category:       disc.category ?? 'other',
    cost_per_month: disc.cost_per_month ?? 0,
    billing_cycle:  disc.billing_cycle ?? 'monthly',
    next_renewal:   disc.next_renewal,
    status:         'active',
    notes:          disc.source_sender ? `Hittad via AI i mail från ${disc.source_sender}` : null,
  })

  await supabase
    .from('discovered_subscriptions')
    .update({ status: 'imported' })
    .eq('id', id)

  revalidatePath('/scanner')
  revalidatePath('/abonnemang')
  revalidatePath('/dashboard')
}

export async function skipDiscoveredSubscription(id: string) {
  const supabase = createAdminClient()
  await supabase
    .from('discovered_subscriptions')
    .update({ status: 'skipped' })
    .eq('id', id)
  revalidatePath('/scanner')
}
