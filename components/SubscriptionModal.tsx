'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2 } from 'lucide-react'
import { createSubscription, updateSubscription } from '@/lib/actions'

export type SubStatus = 'active' | 'trial' | 'paused' | 'cancelled'
export type SubCategory = 'software' | 'telephony' | 'insurance' | 'marketing' | 'other'
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly'

export interface SubscriptionFormData {
  id?: string
  name: string
  vendor: string
  category: SubCategory
  cost_per_month: number | string
  billing_cycle: BillingCycle
  next_renewal: string
  status: SubStatus
  is_trial: boolean
  binding_months: number | string
  notes: string
}

const EMPTY: SubscriptionFormData = {
  name: '', vendor: '', category: 'software',
  cost_per_month: '', billing_cycle: 'monthly',
  next_renewal: '', status: 'active',
  is_trial: false, binding_months: '', notes: '',
}

interface Props {
  open: boolean
  onClose: () => void
  initial?: SubscriptionFormData | null
}

const CATEGORIES: { value: SubCategory; label: string }[] = [
  { value: 'software',   label: 'Mjukvara' },
  { value: 'telephony',  label: 'Telefoni & internet' },
  { value: 'insurance',  label: 'Försäkring' },
  { value: 'marketing',  label: 'Marknadsföring' },
  { value: 'other',      label: 'Övrigt' },
]

const BILLING: { value: BillingCycle; label: string }[] = [
  { value: 'monthly',   label: 'Månadsvis' },
  { value: 'quarterly', label: 'Kvartalsvis' },
  { value: 'yearly',    label: 'Årsvis' },
]

const STATUSES: { value: SubStatus; label: string }[] = [
  { value: 'active',    label: 'Aktiv' },
  { value: 'trial',     label: 'Provperiod' },
  { value: 'paused',    label: 'Pausad' },
  { value: 'cancelled', label: 'Uppsagd' },
]

export function SubscriptionModal({ open, onClose, initial }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<SubscriptionFormData>(EMPTY)
  const [error, setError] = useState('')
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : EMPTY)
      setError('')
      setTimeout(() => firstInputRef.current?.focus(), 80)
    }
  }, [open, initial])

  if (!open) return null

  function set<K extends keyof SubscriptionFormData>(k: K, v: SubscriptionFormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Namn krävs.')
    if (!form.cost_per_month) return setError('Kostnad krävs.')

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.set(k, String(v)))

    startTransition(async () => {
      try {
        if (form.id) await updateSubscription(form.id, fd)
        else await createSubscription(fd)
        onClose()
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Något gick fel.')
      }
    })
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(22,18,40,0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--surface)',
        borderRadius: '20px',
        width: '100%', maxWidth: '560px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-card)',
        overflow: 'hidden',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px' }}>
              {form.id ? 'Redigera abonnemang' : 'Nytt abonnemang'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-2)', marginTop: '2px' }}>
              Fyll i uppgifterna nedan
            </p>
          </div>
          <button onClick={onClose} style={{ ...iconBtn, marginLeft: '16px' }}>
            <X size={18} color="var(--text-2)" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Name + Vendor */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Namn *">
                <input
                  ref={firstInputRef}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="ex. Fortnox"
                  style={inputStyle}
                />
              </Field>
              <Field label="Leverantör">
                <input
                  value={form.vendor}
                  onChange={e => set('vendor', e.target.value)}
                  placeholder="ex. Fortnox AB"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Category + Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Kategori">
                <select value={form.category} onChange={e => set('category', e.target.value as SubCategory)} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={e => set('status', e.target.value as SubStatus)} style={inputStyle}>
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>
            </div>

            {/* Cost + Billing */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Kostnad / mån (kr) *">
                <div style={{ position: 'relative' }}>
                  <input
                    type="number" min="0" step="1"
                    value={form.cost_per_month}
                    onChange={e => set('cost_per_month', e.target.value)}
                    placeholder="0"
                    style={{ ...inputStyle, paddingRight: '40px' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--text-3)', fontWeight: 600 }}>kr</span>
                </div>
              </Field>
              <Field label="Betalningsintervall">
                <select value={form.billing_cycle} onChange={e => set('billing_cycle', e.target.value as BillingCycle)} style={inputStyle}>
                  {BILLING.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </Field>
            </div>

            {/* Renewal + Binding */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Nästa förnyelse">
                <input
                  type="date"
                  value={form.next_renewal}
                  onChange={e => set('next_renewal', e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="Bindningstid (månader)">
                <input
                  type="number" min="0"
                  value={form.binding_months}
                  onChange={e => set('binding_months', e.target.value)}
                  placeholder="Ingen"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Trial toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div
                onClick={() => set('is_trial', !form.is_trial)}
                style={{
                  width: '40px', height: '22px', borderRadius: '99px',
                  background: form.is_trial ? 'var(--brand)' : 'var(--border)',
                  position: 'relative', transition: 'background .15s', flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute', top: '3px',
                  left: form.is_trial ? '21px' : '3px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: '#fff', transition: 'left .15s',
                  boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)' }}>Provperiod / gratis tier</span>
            </label>

            {/* Notes */}
            <Field label="Anteckningar">
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder="Valfria noteringar om detta abonnemang…"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }}
              />
            </Field>

            {error && (
              <p style={{ fontSize: '13px', color: 'var(--danger)', fontWeight: 500, background: 'var(--danger-tint)', padding: '10px 14px', borderRadius: '8px' }}>
                {error}
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'flex-end', gap: '10px',
          flexShrink: 0,
        }}>
          <button onClick={onClose} disabled={isPending} style={{ ...ghostBtn }}>
            Avbryt
          </button>
          <button
            onClick={handleSubmit as React.MouseEventHandler}
            disabled={isPending}
            style={{
              padding: '10px 22px', borderRadius: '10px',
              background: 'var(--brand-deep)', color: '#fff',
              fontSize: '14px', fontWeight: 700,
              border: 'none', cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.7 : 1,
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'inherit',
            }}
          >
            {isPending && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
            {form.id ? 'Spara ändringar' : 'Lägg till'}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ── helpers ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-2)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '.04em' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px',
  borderRadius: '10px', border: '1.5px solid var(--border)',
  background: 'var(--bg)', color: 'var(--ink)',
  fontSize: '14px', fontFamily: 'inherit',
  outline: 'none', transition: 'border-color .12s',
}

const iconBtn: React.CSSProperties = {
  width: '34px', height: '34px', borderRadius: '8px',
  border: 'none', background: 'var(--bg)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
}

const ghostBtn: React.CSSProperties = {
  padding: '10px 18px', borderRadius: '10px',
  background: 'transparent', border: '1.5px solid var(--border)',
  color: 'var(--ink)', fontSize: '14px', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit',
}
