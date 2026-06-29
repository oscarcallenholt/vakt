'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Pencil, Trash2, AlertCircle,
  CheckCircle, Pause, XCircle, Filter,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { SubscriptionModal } from '@/components/SubscriptionModal'
import type { SubscriptionFormData } from '@/components/SubscriptionModal'
import { deleteSubscription } from '@/lib/actions'
import { fmtKr } from '@/lib/data'

type Sub = {
  id: string
  name: string
  vendor: string | null
  category: string
  cost_per_month: number
  billing_cycle: string
  next_renewal: string | null
  status: string
  is_trial: boolean
  binding_months: number | null
  notes: string | null
}

interface Props { subscriptions: Sub[] }

const CAT: Record<string, { label: string; color: string; bg: string }> = {
  software:  { label: 'Mjukvara',            color: 'var(--brand-deep)',  bg: 'var(--brand-tint)' },
  telephony: { label: 'Telefoni & internet',  color: 'var(--peach-deep)', bg: 'var(--peach-tint)' },
  insurance: { label: 'Försäkring',           color: 'var(--mint-text)',  bg: 'var(--mint-tint)'  },
  marketing: { label: 'Marknadsföring',       color: '#8B5000',           bg: '#FFF4E8'            },
  other:     { label: 'Övrigt',              color: 'var(--text-2)',     bg: 'var(--border)'      },
}

const STATUS: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  active:    { label: 'Aktiv',      color: 'var(--mint-text)',  bg: 'var(--mint-tint)',   icon: CheckCircle },
  trial:     { label: 'Provperiod', color: 'var(--peach-deep)', bg: 'var(--peach-tint)',  icon: AlertCircle },
  paused:    { label: 'Pausad',     color: 'var(--text-2)',     bg: 'var(--border)',       icon: Pause       },
  cancelled: { label: 'Uppsagd',   color: 'var(--text-3)',     bg: 'var(--bg)',           icon: XCircle     },
}

const ALL_CATS = [
  { value: 'all', label: 'Alla' },
  { value: 'software',  label: 'Mjukvara' },
  { value: 'telephony', label: 'Telefoni' },
  { value: 'insurance', label: 'Försäkring' },
  { value: 'marketing', label: 'Marknadsföring' },
  { value: 'other',     label: 'Övrigt' },
]

export function AbonnemangClient({ subscriptions }: Props) {
  const router = useRouter()
  const [query, setQuery]         = useState('')
  const [cat, setCat]             = useState('all')
  const [statusFilter, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing]     = useState<SubscriptionFormData | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return subscriptions.filter(s => {
      if (cat !== 'all' && s.category !== cat) return false
      if (statusFilter !== 'all' && s.status !== statusFilter) return false
      if (q && !s.name.toLowerCase().includes(q) && !(s.vendor ?? '').toLowerCase().includes(q)) return false
      return true
    })
  }, [subscriptions, query, cat, statusFilter])

  const totalPerManad = filtered.reduce((s, r) => s + Number(r.cost_per_month), 0)
  const allActive     = subscriptions.filter(s => s.status === 'active').length
  const allTrial      = subscriptions.filter(s => s.status === 'trial').length

  function openEdit(s: Sub) {
    setEditing({
      id:             s.id,
      name:           s.name,
      vendor:         s.vendor ?? '',
      category:       s.category as SubscriptionFormData['category'],
      cost_per_month: s.cost_per_month,
      billing_cycle:  (s.billing_cycle ?? 'monthly') as SubscriptionFormData['billing_cycle'],
      next_renewal:   s.next_renewal ?? '',
      status:         s.status as SubscriptionFormData['status'],
      is_trial:       s.is_trial,
      binding_months: s.binding_months ?? '',
      notes:          s.notes ?? '',
    })
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    if (!confirm('Ta bort detta abonnemang?')) return
    setDeletingId(id)
    startTransition(async () => {
      await deleteSubscription(id)
      setDeletingId(null)
      router.refresh()
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Topbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,246,242,0.9)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px', height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/dashboard"><Logo size={24} /></Link>
          <nav style={{ display: 'flex', gap: '4px' }}>
            {[
              { href: '/dashboard',    label: 'Översikt' },
              { href: '/abonnemang',   label: 'Abonnemang' },
              { href: '/dashboard',    label: 'Rapporter' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                padding: '6px 14px', borderRadius: 'var(--r-sm)',
                fontSize: '14px', fontWeight: 500, textDecoration: 'none',
                background: item.label === 'Abonnemang' ? 'var(--brand-tint)' : 'transparent',
                color: item.label === 'Abonnemang' ? 'var(--brand-deep)' : 'var(--text-2)',
              }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '8px 18px', borderRadius: '10px',
            background: 'var(--brand-deep)', color: '#fff',
            fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <Plus size={15} strokeWidth={2.5} /> Nytt abonnemang
        </button>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* Page header + stats */}
        <div style={{ marginBottom: '28px' }}>
          <h1 className="font-display" style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '20px' }}>
            Abonnemang
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { label: 'Totalt / mån',    value: fmtKr(Math.round(subscriptions.reduce((s, r) => s + Number(r.cost_per_month), 0))), sub: `${fmtKr(Math.round(subscriptions.reduce((s, r) => s + Number(r.cost_per_month), 0) * 12))} / år` },
              { label: 'Aktiva',          value: `${allActive} st`,   sub: 'löpande avtal' },
              { label: 'Provperioder',    value: `${allTrial} st`,    sub: allTrial > 0 ? 'kräver beslut' : 'inga just nu' },
              { label: 'Kategorier',      value: `${new Set(subscriptions.map(s => s.category)).size} st`, sub: 'olika tjänstetyper' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border-card)',
                borderRadius: 'var(--r-lg)', padding: '16px 20px',
                boxShadow: 'var(--shadow-xs)',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>{s.label}</p>
                <p className="font-display" style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '4px' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{
          display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={15} color="var(--text-3)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Sök på namn eller leverantör…"
              style={{
                width: '100%', padding: '9px 12px 9px 36px',
                borderRadius: '10px', border: '1.5px solid var(--border)',
                background: 'var(--surface)', fontSize: '14px',
                color: 'var(--ink)', fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {ALL_CATS.map(c => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                style={{
                  padding: '7px 14px', borderRadius: '99px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: '13px', fontWeight: 600,
                  background: cat === c.value ? 'var(--brand-deep)' : 'var(--surface)',
                  color: cat === c.value ? '#fff' : 'var(--text-2)',
                  border: cat === c.value ? 'none' : '1.5px solid var(--border)',
                  transition: 'all .12s',
                } as React.CSSProperties}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter} onChange={e => setStatus(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: '10px',
              border: '1.5px solid var(--border)', background: 'var(--surface)',
              fontSize: '13px', color: 'var(--ink)', fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            <option value="all">Alla statusar</option>
            <option value="active">Aktiv</option>
            <option value="trial">Provperiod</option>
            <option value="paused">Pausad</option>
            <option value="cancelled">Uppsagd</option>
          </select>
        </div>

        {/* Result count */}
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>
            {filtered.length} abonnemang · {fmtKr(Math.round(totalPerManad))} / mån
          </span>
        </div>

        {/* List */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
          }}>
            {['Tjänst', 'Kategori', 'Kostnad / mån', 'Förnyelse', 'Status', ''].map(h => (
              <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</span>
            ))}
          </div>

          <AnimatePresence>
            {filtered.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <Filter size={32} color="var(--border)" style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '6px' }}>Inga abonnemang hittade</p>
                <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>Prova ett annat filter eller lägg till ett nytt abonnemang</p>
              </div>
            ) : filtered.map((s, i) => {
              const catCfg    = CAT[s.category]    ?? CAT.other
              const statusCfg = STATUS[s.status]   ?? STATUS.active
              const StatusIcon = statusCfg.icon
              const renewal = s.next_renewal
                ? new Date(s.next_renewal).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: '2-digit' })
                : '—'
              const isDeleting = deletingId === s.id

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px',
                    padding: '14px 20px', alignItems: 'center',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    opacity: isDeleting ? 0.4 : 1,
                    transition: 'background .12s, opacity .15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  {/* Tjänst */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: catCfg.bg, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: catCfg.color }}>
                        {(s.vendor ?? s.name)[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{s.name}</p>
                      {s.vendor && <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>{s.vendor}</p>}
                    </div>
                  </div>

                  {/* Kategori */}
                  <span style={{
                    display: 'inline-block',
                    fontSize: '12px', fontWeight: 600,
                    color: catCfg.color, background: catCfg.bg,
                    borderRadius: '99px', padding: '3px 10px',
                    width: 'fit-content',
                  }}>
                    {catCfg.label}
                  </span>

                  {/* Kostnad */}
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
                    {fmtKr(Number(s.cost_per_month))}
                  </span>

                  {/* Förnyelse */}
                  <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>{renewal}</span>

                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <StatusIcon size={13} color={statusCfg.color} strokeWidth={2.5} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: statusCfg.color }}>{statusCfg.label}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEdit(s)} style={actionBtn} title="Redigera">
                      <Pencil size={14} color="var(--text-2)" />
                    </button>
                    <button onClick={() => handleDelete(s.id)} disabled={isDeleting} style={{ ...actionBtn, opacity: isDeleting ? 0.4 : 1 }} title="Ta bort">
                      <Trash2 size={14} color="var(--danger)" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </main>

      <SubscriptionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        initial={editing}
      />
    </div>
  )
}

const actionBtn: React.CSSProperties = {
  width: '30px', height: '30px', borderRadius: '7px',
  border: 'none', background: 'var(--bg)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}
