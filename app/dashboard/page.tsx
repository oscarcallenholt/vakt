'use client'

import { motion } from 'framer-motion'
import {
  Dog, Bell, Settings, ChevronRight,
  TrendingDown, Calendar, Layers, Plus,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { CountUp } from '@/components/CountUp'
import { CategoryBar } from '@/components/CategoryBar'
import { InsightCard } from '@/components/InsightCard'
import { MascotBubble } from '@/components/MascotBubble'
import { summary, fynd, fornyelser, fmtKr, company } from '@/lib/data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Topbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,246,242,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo size={26} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={iconBtnStyle} title="Notifieringar">
            <Bell size={18} color="var(--text-2)" />
            <span style={{
              position: 'absolute', top: '6px', right: '6px',
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--danger)',
              border: '1.5px solid var(--bg)',
            }} />
          </button>
          <button style={iconBtnStyle} title="Inställningar">
            <Settings size={18} color="var(--text-2)" />
          </button>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--brand-tint)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-deep)' }}>
              B
            </span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 20px 80px' }}>

        {/* Hero panel */}
        <motion.div
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          style={{
            borderRadius: 'var(--r-2xl)',
            background: 'linear-gradient(135deg, #6C72FF 0%, #5258E8 60%, #3E44D6 100%)',
            padding: '28px 24px 24px',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(255,255,255,.06)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-20px',
            width: '160px', height: '160px', borderRadius: '50%',
            background: 'rgba(255,255,255,.04)', pointerEvents: 'none',
          }} />

          {/* Company + mascot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '2px' }}>
                Ditt företag
              </p>
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{company}</p>
            </div>
            <MascotBubble message="4 saker att kolla på 👋" size="sm" />
          </div>

          {/* Big number */}
          <div style={{ marginBottom: '6px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.65)', fontWeight: 500, marginBottom: '4px' }}>
              Löpande kostnader / mån
            </p>
            <div className="font-display" style={{
              fontSize: '48px', fontWeight: 700, color: '#fff',
              lineHeight: 1.1, letterSpacing: '-2px',
              display: 'flex', alignItems: 'baseline', gap: '8px',
            }}>
              <CountUp to={summary.perManad} duration={1.4} />
              <span style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.5px' }}>kr</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', marginTop: '2px' }}>
              = {fmtKr(summary.perAr)} per år
            </p>
          </div>

          {/* Mini stats chips */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            {[
              { label: 'Abonnemang', val: summary.lopande, unit: 'st' },
              { label: 'Att åtgärda', val: summary.attAtgarda, unit: 'st', highlight: true },
              { label: 'Nästa förnyelse', val: summary.nastaFornyelse, unit: '', isStr: true },
            ].map(chip => (
              <div key={chip.label} style={{
                background: chip.highlight ? 'rgba(221,82,56,.3)' : 'rgba(255,255,255,.12)',
                border: chip.highlight ? '1px solid rgba(221,82,56,.5)' : '1px solid rgba(255,255,255,.18)',
                borderRadius: 'var(--r)',
                padding: '8px 14px',
                display: 'flex', flexDirection: 'column', gap: '1px',
              }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>
                  {chip.label}
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {chip.isStr ? chip.val : <CountUp to={chip.val as number} duration={1.2} />}
                  {chip.unit && <span style={{ fontSize: '13px', marginLeft: '2px' }}>{chip.unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Savings strip */}
        <motion.div
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          style={{
            background: 'var(--mint-tint)',
            border: '1px solid rgba(46,155,114,.15)',
            borderRadius: 'var(--r-lg)',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '16px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--r-sm)',
            background: 'var(--mint)', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingDown size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--mint-text)' }}>
              Du har sparat {fmtKr(summary.sparatIAr)} i år
            </p>
            <p style={{ fontSize: '12px', color: 'var(--mint-deep)', fontWeight: 500 }}>
              Vakt hittade 2 besparingar hittills
            </p>
          </div>
          <ChevronRight size={18} color="var(--mint-deep)" />
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          style={cardStyle}
        >
          <SectionHeader icon={<Layers size={15} />} title="Kostnadskategorier" />
          <CategoryBar />
        </motion.div>

        {/* Vakthundens fynd */}
        <motion.div
          initial="hidden" animate="visible" custom={3} variants={fadeUp}
          style={{ ...cardStyle, marginBottom: '16px' }}
        >
          <SectionHeader
            icon={<Dog size={15} />}
            title="Vakthundens fynd"
            badge={`${fynd.length} nya`}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {fynd.map((f) => (
              <InsightCard key={f.id} typ={f.typ} titel={f.titel} detalj={f.detalj} action={f.action} />
            ))}
          </div>
        </motion.div>

        {/* Upcoming renewals */}
        <motion.div
          initial="hidden" animate="visible" custom={4} variants={fadeUp}
          style={cardStyle}
        >
          <SectionHeader icon={<Calendar size={15} />} title="Kommande förnyelser" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {fornyelser.map((f, i) => (
              <div key={f.namn} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 0',
                borderBottom: i < fornyelser.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  textAlign: 'center', minWidth: '44px', flexShrink: 0,
                  background: f.bradskande ? 'var(--danger-tint)' : 'var(--brand-tint)',
                  borderRadius: 'var(--r-sm)',
                  padding: '4px 6px',
                }}>
                  <span style={{
                    fontSize: '12px', fontWeight: 700, display: 'block',
                    color: f.bradskande ? 'var(--danger)' : 'var(--brand-deep)',
                    lineHeight: 1.2,
                  }}>
                    {f.datum}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                    {f.namn}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>
                    {f.not}
                  </div>
                </div>
                <div style={{
                  fontSize: '15px', fontWeight: 700,
                  color: f.bradskande ? 'var(--danger)' : 'var(--ink)',
                  flexShrink: 0,
                }}>
                  {fmtKr(f.kr)}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-3)' }}>/mån</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>

      {/* FAB */}
      <button
        title="Lägg till abonnemang"
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'var(--brand-deep)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(82,88,232,.4)',
          zIndex: 40,
          transition: 'transform .12s, box-shadow .12s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(82,88,232,.5)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(82,88,232,.4)'
        }}
      >
        <Plus size={22} color="#fff" strokeWidth={2.5} />
      </button>
    </div>
  )
}

/* ──── helpers ──── */

const iconBtnStyle: React.CSSProperties = {
  position: 'relative',
  width: '36px', height: '36px', borderRadius: 'var(--r-sm)',
  border: 'none', background: 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}

const cardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border-card)',
  borderRadius: 'var(--r-xl)',
  padding: '20px',
  marginBottom: '16px',
  boxShadow: 'var(--shadow-xs)',
}

function SectionHeader({
  icon, title, badge,
}: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      marginBottom: '16px',
    }}>
      <span style={{
        width: '26px', height: '26px', borderRadius: '6px',
        background: 'var(--brand-tint)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--brand)',
      }}>
        {icon}
      </span>
      <span className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
        {title}
      </span>
      {badge && (
        <span style={{
          marginLeft: 'auto',
          fontSize: '11px', fontWeight: 700,
          background: 'var(--peach-tint)', color: 'var(--peach-deep)',
          borderRadius: '99px', padding: '2px 9px',
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}
