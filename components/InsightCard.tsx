'use client'

import { Sparkles, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react'
import type { FyndTyp } from '@/lib/data'

const config = {
  besparing: {
    icon: Sparkles,
    iconColor: 'var(--mint-text)',
    iconBg:    'var(--mint-tint)',
    label:     'Besparing hittad',
    labelColor:'var(--mint-text)',
    btnStyle:  'ghost' as const,
  },
  bradskande: {
    icon: AlertCircle,
    iconColor: 'var(--danger)',
    iconBg:    'var(--danger-tint)',
    label:     'Agera snart',
    labelColor:'var(--danger)',
    btnStyle:  'primary' as const,
  },
  uppmarksamhet: {
    icon: TrendingUp,
    iconColor: 'var(--peach-deep)',
    iconBg:    'var(--peach-tint)',
    label:     'Kolla detta',
    labelColor:'var(--peach-deep)',
    btnStyle:  'ghost' as const,
  },
}

interface Props {
  typ: FyndTyp
  titel: string
  detalj: string
  action: string
}

export function InsightCard({ typ, titel, detalj, action }: Props) {
  const c = config[typ]
  const Icon = c.icon
  const isPrimary = c.btnStyle === 'primary'

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid var(--border-card)`,
      borderRadius: 'var(--r-lg)',
      padding: '16px 18px',
      display: 'flex', alignItems: 'flex-start', gap: '14px',
      boxShadow: 'var(--shadow-xs)',
      transition: 'box-shadow .15s, transform .12s',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)'
      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-xs)'
      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
    }}
    >
      {/* Icon chip */}
      <div style={{
        width: '38px', height: '38px', borderRadius: 'var(--r-sm)',
        background: c.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={18} color={c.iconColor} strokeWidth={2} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '.06em', color: c.labelColor, marginBottom: '4px',
        }}>
          {c.label}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '4px' }}>
          {titel}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-2)' }}>{detalj}</div>
      </div>

      {/* Action */}
      <button style={{
        flexShrink: 0,
        padding: '7px 14px',
        borderRadius: 'var(--r-sm)',
        fontSize: '13px', fontWeight: 600,
        cursor: 'pointer',
        border: isPrimary ? 'none' : '1.5px solid var(--border)',
        background: isPrimary ? 'var(--brand-deep)' : 'transparent',
        color: isPrimary ? '#fff' : 'var(--ink)',
        display: 'flex', alignItems: 'center', gap: '4px',
        transition: 'all .12s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => {
        const btn = e.currentTarget as HTMLButtonElement
        if (isPrimary) btn.style.background = '#4249d4'
        else btn.style.background = 'var(--bg)'
      }}
      onMouseLeave={e => {
        const btn = e.currentTarget as HTMLButtonElement
        btn.style.background = isPrimary ? 'var(--brand-deep)' : 'transparent'
      }}
      >
        {action}
        {isPrimary && <ArrowRight size={13} />}
      </button>
    </div>
  )
}
