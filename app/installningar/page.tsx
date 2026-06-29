import { createClient } from '@/lib/supabase/server'
import { InstallningarClient } from './client'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

export default async function InstallningarPage() {
  const supabase = await createClient()

  const { data: connections } = await supabase
    .from('email_connections')
    .select('id, email, imap_host, imap_port, last_scanned_at, created_at')
    .eq('company_id', COMPANY_ID)
    .order('created_at')

  return <InstallningarClient connections={connections ?? []} />
}
