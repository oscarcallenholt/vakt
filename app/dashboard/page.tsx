import { DashboardClient } from './client'
import { createClient } from '@/lib/supabase/server'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { data: company },
    { data: subs },
    { data: alerts },
  ] = await Promise.all([
    supabase.from('companies').select('*').eq('id', COMPANY_ID).single(),
    supabase.from('subscriptions').select('*').eq('company_id', COMPANY_ID).eq('status', 'active').order('cost_per_month', { ascending: false }),
    supabase.from('alerts').select('*').eq('company_id', COMPANY_ID).eq('status', 'open').order('created_at', { ascending: false }),
  ])

  const subList = subs ?? []
  const alertList = alerts ?? []

  const perManad = Math.round(subList.reduce((s, r) => s + Number(r.cost_per_month), 0))

  const catMap: Record<string, { namn: string; farg: string }> = {
    software:   { namn: 'Mjukvara',            farg: '#6C72FF' },
    telephony:  { namn: 'Telefoni & internet', farg: '#FF9E7A' },
    insurance:  { namn: 'Försäkring',          farg: '#59CFA0' },
    marketing:  { namn: 'Marknadsföring',      farg: '#CDBFFF' },
    other:      { namn: 'Övrigt',              farg: '#F2A03C' },
  }

  const catTotals: Record<string, number> = {}
  for (const s of subList) {
    catTotals[s.category] = (catTotals[s.category] ?? 0) + Number(s.cost_per_month)
  }

  const kategorier = Object.entries(catTotals)
    .map(([cat, total]) => ({
      namn:  catMap[cat]?.namn  ?? cat,
      farg:  catMap[cat]?.farg  ?? '#888',
      andel: perManad > 0 ? Math.round((total / perManad) * 100) : 0,
    }))
    .sort((a, b) => b.andel - a.andel)

  const trialSubs = subList.filter(s => s.is_trial || s.status === 'trial')
  const attAtgarda = alertList.length

  const fornyelser = subList
    .filter(s => s.next_renewal)
    .sort((a, b) => new Date(a.next_renewal).getTime() - new Date(b.next_renewal).getTime())
    .slice(0, 5)
    .map(s => ({
      datum:     new Date(s.next_renewal).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }),
      namn:      s.name,
      kr:        Number(s.cost_per_month),
      not:       [catMap[s.category]?.namn, s.binding_months ? `${s.binding_months} mån bindning` : 'ingen bindning'].filter(Boolean).join(' · '),
      bradskande: s.is_trial || s.status === 'trial',
    }))

  const nastaFornyelse = fornyelser[0]?.datum ?? '—'
  const sparatIAr = Math.round(
    alertList.filter(a => a.type === 'savings' && a.amount_saved).reduce((s, a) => s + Number(a.amount_saved), 0)
  )

  const fynd = alertList.map(a => ({
    id:     a.id,
    typ:    (a.type === 'savings' ? 'besparing' : a.type === 'urgent' ? 'bradskande' : 'uppmarksamhet') as 'besparing' | 'bradskande' | 'uppmarksamhet',
    titel:  a.title,
    detalj: a.detail ?? '',
    action: a.type === 'savings' ? 'Visa' : a.type === 'urgent' ? 'Säg upp' : 'Utkast',
  }))

  return (
    <DashboardClient
      company={company?.name ?? 'Ditt företag'}
      perManad={perManad}
      perAr={perManad * 12}
      lopande={subList.length}
      attAtgarda={attAtgarda}
      sparatIAr={sparatIAr}
      nastaFornyelse={nastaFornyelse}
      kategorier={kategorier}
      fynd={fynd}
      fornyelser={fornyelser}
    />
  )
}
