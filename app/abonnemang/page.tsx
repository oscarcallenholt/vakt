import { createClient } from '@/lib/supabase/server'
import { AbonnemangClient } from './client'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

export default async function AbonnemangPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('company_id', COMPANY_ID)
    .order('cost_per_month', { ascending: false })

  return <AbonnemangClient subscriptions={data ?? []} />
}
