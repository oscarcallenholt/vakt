'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Dog, Bell, Settings, TrendingDown, Calendar,
  Layers, Plus, ArrowRight, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { CountUp } from '@/components/CountUp'
import { InsightCard } from '@/components/InsightCard'
import { SubscriptionModal } from '@/components/SubscriptionModal'
import { fmtKr } from '@/lib/data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: 'easeOut' },
  }),
}

interface Kategori { namn: string; farg: string; andel: number }
interface Fynd     { id: string; typ: 'besparing' | 'bradskande' | 'uppmarksamhet'; titel: string; detalj: string; action: string }
interface Fornyelse { datum: string; namn: string; kr: number; not: string; bradskande: boolean }

interface Props {
  company: string
  perManad: number
  perAr: number
  lopande: number
  attAtgarda: number
  sparatIAr: number
  nastaFornyelse: string
  kategorier: Kategori[]
  fynd: Fynd[]
  fornyelser: Fornyelse[]
}

export function DashboardClient({
  company, perManad, perAr, lopande, attAtgarda,
  sparatIAr, nastaFornyelse, kategorier, fynd, fornyelser,
}: Props) {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Topbar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,246,242,0.9)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px',
        height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo size={26} />
          <nav style={{ display: 'flex', gap: '4px' }}>
            {[
              { href: '/dashboard',     label: 'Översikt',      active: true  },
              { href: '/abonnemang',    label: 'Abonnemang',    active: false },
              { href: '/scanner',       label: 'AI-scanner',    active: false },
              { href: '/installningar', label: 'Inställningar', active: false },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                padding: '6px 14px', borderRadius: 'var(--r-sm)',
                textDecoration: 'none',
                background: item.active ? 'var(--brand-tint)' : 'transparent',
                color: item.active ? 'var(--brand-deep)' : 'var(--text-2)',
                fontSize: '14px', fontWeight: item.active ? 600 : 500,
              }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={iconBtnStyle} title="Notifieringar">
            <Bell size={18} color="var(--text-2)" />
            {attAtgarda > 0 && (
              <span style={{
                position: 'absolute', top: '7px', right: '7px',
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--danger)', border: '1.5px solid var(--bg)',
              }} />
            )}
          </button>
          <button style={iconBtnStyle} title="Inställningar">
            <Settings size={18} color="var(--text-2)" />
          </button>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '5px 12px 5px 6px',
            borderRadius: '99px',
            border: '1.5px solid var(--border-card)',
            background: 'var(--surface)',
            cursor: 'pointer',
          }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'var(--brand-tint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-deep)' }}>{company[0]}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {company}
            </span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 32px 80px' }}>

        {/* ── Hero panel ── */}
        <motion.div
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          style={{
            borderRadius: 'var(--r-2xl)',
            background: 'linear-gradient(135deg, #6C72FF 0%, #5258E8 55%, #3E44D6 100%)',
            padding: '32px',
            marginBottom: '20px',
            position: 'relative', overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Deco circles */}
          <div style={{ position: 'absolute', top: '-60px', right: '200px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />

          {/* Left: big metric */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.55)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
              {company} · Löpande kostnader
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
              <div className="font-display" style={{ fontSize: '58px', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-2.5px' }}>
                <CountUp to={perManad} duration={1.4} />
              </div>
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'rgba(255,255,255,.75)', letterSpacing: '-0.5px' }}>kr/mån</span>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.5)', marginBottom: '24px' }}>
              = {fmtKr(perAr)} per år
            </p>

            {/* Stat chips */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Chip label="Abonnemang" value={`${lopande} st`} />
              <Chip
                label="Att åtgärda"
                value={`${attAtgarda} st`}
                urgent={attAtgarda > 0}
              />
              <Chip label="Nästa förnyelse" value={nastaFornyelse} />
              {sparatIAr > 0 && (
                <Chip label="Sparat i år" value={fmtKr(sparatIAr)} positive />
              )}
            </div>
          </div>

          {/* Right: mascot */}
          <div style={{
            background: 'rgba(255,255,255,.12)',
            borderRadius: 'var(--r-xl)',
            padding: '20px 24px',
            border: '1px solid rgba(255,255,255,.18)',
            maxWidth: '260px',
            backdropFilter: 'blur(6px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(255,255,255,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 0 4px rgba(255,255,255,.1)',
              }}>
                <Dog size={20} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Vakthunden</p>
                <p style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>På vakt 24/7</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.85)', lineHeight: 1.5, marginBottom: '16px' }}>
              Jag vaktar {lopande} kostnader åt er — och hittade {attAtgarda} saker den här veckan.
            </p>
            <button style={{
              width: '100%', padding: '9px', borderRadius: 'var(--r)',
              background: 'rgba(255,255,255,.15)',
              border: '1px solid rgba(255,255,255,.25)',
              color: '#fff', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}>
              Se alla fynd <ArrowRight size={13} />
            </button>
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '16px',
          alignItems: 'start',
        }}>

          {/* ── LEFT column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Findings */}
            {fynd.length > 0 && (
              <motion.div
                initial="hidden" animate="visible" custom={1} variants={fadeUp}
                style={cardStyle}
              >
                <SectionHeader icon={<Dog size={15} />} title="Vakthundens fynd" badge={`${fynd.length} nya`} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {fynd.map(f => (
                    <InsightCard key={f.id} typ={f.typ} titel={f.titel} detalj={f.detalj} action={f.action} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Renewals */}
            {fornyelser.length > 0 && (
              <motion.div
                initial="hidden" animate="visible" custom={2} variants={fadeUp}
                style={cardStyle}
              >
                <SectionHeader icon={<Calendar size={15} />} title="Kommande förnyelser" />
                <div>
                  {fornyelser.map((f, i) => (
                    <div key={f.namn + f.datum} style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr auto',
                      alignItems: 'center', gap: '14px',
                      padding: '13px 0',
                      borderBottom: i < fornyelser.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <div style={{
                        textAlign: 'center',
                        background: f.bradskande ? 'var(--danger-tint)' : 'var(--brand-tint)',
                        borderRadius: 'var(--r-sm)', padding: '5px 4px',
                      }}>
                        <span style={{
                          fontSize: '12px', fontWeight: 700, display: 'block',
                          color: f.bradskande ? 'var(--danger)' : 'var(--brand-deep)',
                          lineHeight: 1.2,
                        }}>
                          {f.datum}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{f.namn}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>{f.not}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: f.bradskande ? 'var(--danger)' : 'var(--ink)' }}>
                          {fmtKr(f.kr)}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>/mån</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Savings */}
            {sparatIAr > 0 && (
              <motion.div
                initial="hidden" animate="visible" custom={1} variants={fadeUp}
                style={{
                  background: 'var(--mint-tint)',
                  border: '1px solid rgba(46,155,114,.15)',
                  borderRadius: 'var(--r-xl)',
                  padding: '18px 20px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--r)',
                    background: 'var(--mint)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TrendingDown size={20} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--mint-text)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '2px' }}>Sparat i år</p>
                    <p className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--mint-text)', letterSpacing: '-0.5px' }}>
                      {fmtKr(sparatIAr)}
                    </p>
                  </div>
                  <ChevronRight size={18} color="var(--mint-deep)" />
                </div>
              </motion.div>
            )}

            {/* Category breakdown */}
            {kategorier.length > 0 && (
              <motion.div
                initial="hidden" animate="visible" custom={2} variants={fadeUp}
                style={cardStyle}
              >
                <SectionHeader icon={<Layers size={15} />} title="Kostnadskategorier" />

                {/* Segmented bar */}
                <div style={{
                  display: 'flex', height: '8px', borderRadius: '99px',
                  overflow: 'hidden', marginBottom: '20px',
                }}>
                  {kategorier.map(k => (
                    <div
                      key={k.namn}
                      style={{ width: `${k.andel}%`, background: k.farg, minWidth: 0 }}
                      title={`${k.namn}: ${k.andel}%`}
                    />
                  ))}
                </div>

                {/* Per-category bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {kategorier.map(k => (
                    <div key={k.namn}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: k.farg, display: 'inline-block', flexShrink: 0 }} />
                          {k.namn}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>{k.andel}%</span>
                      </div>
                      <div style={{ height: '5px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${k.andel}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          style={{ height: '100%', background: k.farg, borderRadius: '99px' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick add */}
            <motion.div
              initial="hidden" animate="visible" custom={3} variants={fadeUp}
              onClick={() => setAddOpen(true)}
              style={{
                background: 'var(--surface)',
                border: '1.5px dashed var(--border)',
                borderRadius: 'var(--r-xl)',
                padding: '20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '10px', cursor: 'pointer', textAlign: 'center',
              }}
              whileHover={{ borderColor: 'var(--brand)', background: 'var(--brand-tint)' }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'var(--brand-tint)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Plus size={18} color="var(--brand)" />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>Lägg till abonnemang</p>
                <p style={{ fontSize: '12px', color: 'var(--text-2)' }}>Manuellt eller kopplat till banken</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <SubscriptionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        initial={null}
      />
    </div>
  )
}

/* ──── helpers ──── */

function Chip({ label, value, urgent, positive }: { label: string; value: string; urgent?: boolean; positive?: boolean }) {
  const bg  = urgent ? 'rgba(221,82,56,.25)'   : positive ? 'rgba(89,207,160,.2)' : 'rgba(255,255,255,.13)'
  const bd  = urgent ? 'rgba(221,82,56,.45)'   : positive ? 'rgba(46,155,114,.3)' : 'rgba(255,255,255,.2)'
  const clr = urgent ? '#FFCFC7'               : positive ? '#A8F0D5'             : '#fff'
  return (
    <div style={{ background: bg, border: `1px solid ${bd}`, borderRadius: 'var(--r)', padding: '8px 14px' }}>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</p>
      <p style={{ fontSize: '15px', fontWeight: 700, color: clr, lineHeight: 1 }}>{value}</p>
    </div>
  )
}

const iconBtnStyle: React.CSSProperties = {
  position: 'relative', width: '36px', height: '36px',
  borderRadius: 'var(--r-sm)', border: 'none', background: 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
}

const cardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border-card)',
  borderRadius: 'var(--r-xl)',
  padding: '22px',
  boxShadow: 'var(--shadow-xs)',
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
      <span style={{
        width: '28px', height: '28px', borderRadius: '7px',
        background: 'var(--brand-tint)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)',
      }}>
        {icon}
      </span>
      <span className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>{title}</span>
      {badge && (
        <span style={{
          marginLeft: 'auto', fontSize: '11px', fontWeight: 700,
          background: 'var(--peach-tint)', color: 'var(--peach-deep)',
          borderRadius: '99px', padding: '3px 10px',
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}
