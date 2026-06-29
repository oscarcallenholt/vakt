import { createClient } from '@/lib/supabase/server'
import { ScannerClient } from './client'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

export default async function ScannerPage() {
  const supabase = await createClient()

  const [{ data: connections }, { data: pending }, { data: imported }] = await Promise.all([
    supabase
      .from('email_connections')
      .select('id, email, last_scanned_at')
      .eq('company_id', COMPANY_ID),
    supabase
      .from('discovered_subscriptions')
      .select('*')
      .eq('company_id', COMPANY_ID)
      .eq('status', 'pending')
      .order('confidence', { ascending: false }),
    supabase
      .from('discovered_subscriptions')
      .select('*')
      .eq('company_id', COMPANY_ID)
      .eq('status', 'imported')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  return (
    <ScannerClient
      connections={connections ?? []}
      pending={pending ?? []}
      imported={imported ?? []}
    />
  )
}
