'use client'

import { motion } from 'framer-motion'
import {
  Dog, ArrowRight, CheckCircle, AlertCircle,
  Sparkles, TrendingUp, Lock, Shield, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', overflowX: 'hidden' }}>

      {/* ─── Nav ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 48px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(22,18,40,0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
      }}>
        <Logo size={26} variant="white" />
        <div style={{ display: 'flex', gap: '2px' }}>
          {['Så funkar det', 'Priser', 'För byråer'].map(l => (
            <a key={l} href="#" style={{
              fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,.55)',
              textDecoration: 'none', padding: '6px 12px', borderRadius: '8px',
            }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', fontWeight: 500 }}>Logga in</a>
          <Link href="/dashboard" style={{
            padding: '8px 20px', borderRadius: '10px',
            background: '#fff', color: 'var(--ink)',
            fontSize: '14px', fontWeight: 700, textDecoration: 'none',
          }}>
            Testa gratis
          </Link>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section style={{
        minHeight: '100vh',
        background: '#161228',
        position: 'relative',
        display: 'flex', alignItems: 'center',
        padding: '80px 48px 60px',
        overflow: 'hidden',
      }}>
        {/* Grain texture overlay */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none' }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="overlay" in="SourceGraphic" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,114,255,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '15%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(89,207,160,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative' }}>

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginBottom: '32px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 0 8px rgba(89,207,160,.8)' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,.5)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                Vakttjänst för svenska SME
              </span>
            </motion.div>

            <motion.h1
              className="font-display"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                fontWeight: 700, lineHeight: 1.0,
                letterSpacing: '-3px', color: '#fff',
                marginBottom: '24px',
              }}
            >
              Någon måste<br />
              kolla räkningarna.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,.5)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '420px' }}
            >
              Vakt kopplar till din bokföring och mail — och hittar abonnemang,
              prisökningar och dubbletter du inte vet om.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}
            >
              <Link href="/dashboard" style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'var(--brand)', color: '#fff',
                fontSize: '16px', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 0 32px rgba(108,114,255,.4)',
              }}>
                Låt Vakthunden kolla <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
              <Link href="/dashboard" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 22px', borderRadius: '12px',
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.12)',
                color: 'rgba(255,255,255,.75)',
                fontSize: '16px', fontWeight: 500, textDecoration: 'none',
              }}>
                Se demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {[
                'Gratis de första 14 dagarna — ingen kortinfo',
                'Koppla banken med BankID på under 5 minuter',
                'Vaktar 400+ svenska företag just nu',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <CheckCircle size={14} color="var(--mint)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Card stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ position: 'relative', height: '420px', perspective: '1000px' }}
          >
            {/* Card 3 — back */}
            <div style={{
              position: 'absolute', top: '48px', left: '32px', right: '-16px',
              transform: 'rotate(-5deg)',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '20px', padding: '20px',
              backdropFilter: 'blur(4px)',
            }}>
              <div style={{ height: '12px', width: '120px', background: 'rgba(255,255,255,.08)', borderRadius: '99px', marginBottom: '10px' }} />
              <div style={{ height: '9px', width: '180px', background: 'rgba(255,255,255,.05)', borderRadius: '99px', marginBottom: '8px' }} />
              <div style={{ height: '9px', width: '140px', background: 'rgba(255,255,255,.05)', borderRadius: '99px' }} />
            </div>

            {/* Card 2 — middle */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute', top: '24px', left: '16px', right: '0',
                transform: 'rotate(3deg)',
                background: 'rgba(221,82,56,.12)',
                border: '1px solid rgba(221,82,56,.25)',
                borderRadius: '20px', padding: '22px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(221,82,56,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertCircle size={18} color="#FFCFC7" />
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#FFCFC7', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }}>Agera nu</p>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '6px' }}>Framer provperiod tar slut om 3 dagar</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>Annars dras 540 kr/mån automatiskt</p>
                </div>
              </div>
            </motion.div>

            {/* Card 1 — front (savings) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '100px', left: '0', right: '16px',
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.14)',
                borderRadius: '20px', padding: '24px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 24px 48px rgba(0,0,0,.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(89,207,160,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={19} color="#59CFA0" />
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#59CFA0', textTransform: 'uppercase', letterSpacing: '.06em' }}>Besparing hittad</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>7 188 kr/år</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.6)', lineHeight: 1.5, marginBottom: '16px' }}>
                Adobe Creative Cloud betalas på <strong style={{ color: '#fff' }}>två separata konton</strong> i er organisation.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  flex: 1, padding: '10px', borderRadius: '10px',
                  background: 'var(--mint)', border: 'none', color: '#fff',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Lös det nu
                </button>
                <button style={{
                  padding: '10px 14px', borderRadius: '10px',
                  background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)',
                  color: 'rgba(255,255,255,.6)', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Ignorera
                </button>
              </div>
            </motion.div>

            {/* Vakthunden badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', right: '0px', bottom: '24px',
                background: 'var(--brand)',
                borderRadius: '999px', padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(108,114,255,.5)',
              }}
            >
              <Dog size={16} color="#fff" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Vakthunden hittade 4 saker</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.25)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Rulla</span>
          <motion.div
            animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(255,255,255,.2), transparent)' }}
          />
        </div>
      </section>

      {/* ─── Logos ─── */}
      <section style={{ background: 'var(--surface)', padding: '32px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', flexShrink: 0 }}>Används av</span>
          {['Bergström Bygg', 'Motorsport i Växjö', 'Advokatbyrån Ek', 'Nordictech AB', 'Lindqvist & Co'].map(c => (
            <span key={c} className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '-0.3px' }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ─── Feature panels (alternating) ─── */}

      {/* Panel 1: Discover */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <FeatureLabel>Steg 1 — Discover</FeatureLabel>
          <h2 className="font-display" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '20px' }}>
            Allt på ett ställe<br />på fem minuter.
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '400px' }}>
            Koppla banken eller mailen med BankID. Vakt läser igenom och sätter
            namn, kategori och kostnad på varje löpande utgift — automatiskt.
          </p>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 700, color: 'var(--brand)', textDecoration: 'none' }}>
            Prova själv <ChevronRight size={16} />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
          <SubscriptionList />
        </motion.div>
      </section>

      {/* Panel 2: Monitor */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <AlertFeed />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <FeatureLabel>Steg 2 — Monitor</FeatureLabel>
            <h2 className="font-display" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '20px' }}>
              Vakthunden<br />sover aldrig.
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '400px' }}>
              Prisökningar, prövotider som löper ut, dubbletter — Vakt flaggar
              det direkt. Du slipper hålla koll manuellt.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Meddelande direkt i appen och via mail', 'Koppla Slack för realtidsnotiser', 'Prioriterat: akut, viktigt, kolla'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <CheckCircle size={15} color="var(--brand)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Big quote ─── */}
      <section style={{
        background: '#161228', position: 'relative', overflow: 'hidden',
        padding: '100px 48px',
      }}>
        <div style={{ position: 'absolute', top: '-100px', left: '20%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,114,255,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Dog size={28} color="var(--brand)" style={{ marginBottom: '28px', opacity: 0.7 }} />
            <blockquote className="font-display" style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700, color: '#fff', lineHeight: 1.2,
              letterSpacing: '-1px', marginBottom: '36px',
            }}>
              "Vi hittade tre abonnemang vi inte visste om. 8 400 kronor om året — rakt ned i sjön. Vakt betalade sig på en timme."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(108,114,255,.25)', border: '1px solid rgba(108,114,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--lilac)' }}>A</span>
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Anna Bergström</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)' }}>VD · Bergström Bygg AB · 23 anställda</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '32px' }}>
                {[
                  { n: '8 400 kr', l: 'sparat dag 1' },
                  { n: '27 st',    l: 'abonnemang hittade' },
                  { n: '< 5 min',  l: 'att komma igång' },
                ].map(s => (
                  <div key={s.n} style={{ textAlign: 'right' }}>
                    <p className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.n}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)', marginTop: '3px' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trust ─── */}
      <section style={{ background: 'var(--surface)', padding: '28px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: Shield, l: 'GDPR-certifierat' },
            { icon: Lock, l: 'Banknivå-kryptering (AES-256)' },
            { icon: CheckCircle, l: 'Vi läser bara — ändrar ingenting' },
            { icon: TrendingUp, l: 'Drifttid 99.9%' },
          ].map(t => (
            <div key={t.l} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <t.icon size={15} color="var(--mint-deep)" strokeWidth={2} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)' }}>{t.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '120px 48px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'var(--brand-tint)',
            margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Dog size={32} color="var(--brand)" />
          </div>
          <h2 className="font-display" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.05 }}>
            Redo att spara pengar?
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', marginBottom: '40px', lineHeight: 1.6 }}>
            Gratis i 14 dagar. BankID. Under 5 minuter.
          </p>
          <Link href="/dashboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '16px 36px', borderRadius: '14px',
            background: 'var(--brand-deep)', color: '#fff',
            fontSize: '17px', fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(82,88,232,.35)',
          }}>
            Sätt Vakthunden på jobb <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '28px 48px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <Logo size={20} />
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Integritetspolicy', 'Villkor', 'Säkerhet', 'Kontakt'].map(l => (
            <a key={l} href="#" style={{ fontSize: '13px', color: 'var(--text-3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>© 2026 Vakt AB</p>
      </footer>
    </div>
  )
}

/* ─── Subscription List visual ─── */
function SubscriptionList() {
  const items = [
    { name: 'Fortnox',     cat: 'Bokföring',      kr: '459',   logo: 'F', color: '#E8F5FF', tc: '#1A6FA8', status: 'ok' },
    { name: 'Adobe CC',    cat: 'Mjukvara',        kr: '599',   logo: 'Ai', color: '#FFF0E8', tc: '#B34A00', status: 'warn' },
    { name: 'Adobe CC ²',  cat: 'Dubblett!',       kr: '599',   logo: 'Ai', color: '#FCE5DF', tc: '#DD5238', status: 'danger' },
    { name: 'Telia',       cat: 'Telefoni',        kr: '1 445', logo: 'T',  color: '#F0F4FF', tc: '#3B4ED8', status: 'ok' },
    { name: 'Framer',      cat: 'Provperiod',      kr: '540',   logo: 'Fr', color: '#FCE5DF', tc: '#DD5238', status: 'danger' },
    { name: 'Slack',       cat: 'Kommunikation',   kr: '420',   logo: 'S',  color: '#FFF4E8', tc: '#8B5000', status: 'ok' },
  ]

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-card)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="font-display" style={{ fontSize: '14px', fontWeight: 700 }}>Abonnemang hittade</span>
        <span style={{ fontSize: '12px', fontWeight: 700, background: 'var(--brand-tint)', color: 'var(--brand)', borderRadius: '99px', padding: '3px 10px' }}>13 st</span>
      </div>
      {/* List */}
      {items.map((item, i) => (
        <motion.div
          key={item.name + i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 20px',
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            background: item.status === 'danger' ? 'rgba(221,82,56,.03)' : 'transparent',
          }}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '9px',
            background: item.color, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: item.tc }}>{item.logo}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{item.name}</p>
            <p style={{ fontSize: '11px', color: item.status === 'danger' ? 'var(--danger)' : 'var(--text-3)', fontWeight: item.status === 'danger' ? 700 : 400 }}>{item.cat}</p>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: item.status === 'danger' ? 'var(--danger)' : 'var(--ink)', flexShrink: 0 }}>{item.kr} kr</span>
          {item.status === 'danger' && <AlertCircle size={14} color="var(--danger)" />}
          {item.status === 'ok' && <CheckCircle size={14} color="var(--mint-deep)" />}
        </motion.div>
      ))}
      {/* Footer */}
      <div style={{ padding: '14px 20px', background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>Totalt per månad</span>
        <span className="font-display" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>48 200 kr</span>
      </div>
    </div>
  )
}

/* ─── Alert Feed visual ─── */
function AlertFeed() {
  const alerts = [
    {
      icon: AlertCircle, color: 'var(--danger)', bg: 'var(--danger-tint)',
      label: 'Akut', title: 'Framers provperiod tar slut om 3 dagar',
      sub: 'Annars dras 540 kr/mån automatiskt', time: 'Just nu',
      action: 'Säg upp',
    },
    {
      icon: TrendingUp, color: 'var(--peach-deep)', bg: 'var(--peach-tint)',
      label: 'Kolla detta', title: 'Telia höjde priset 12% utan avisering',
      sub: '1 290 kr/mån → 1 445 kr/mån', time: '2 dagar sedan',
      action: 'Utkast',
    },
    {
      icon: Sparkles, color: 'var(--mint-text)', bg: 'var(--mint-tint)',
      label: 'Besparing', title: 'Adobe Creative Cloud betalas dubbelt',
      sub: '7 188 kr/år att spara direkt', time: '5 dagar sedan',
      action: 'Lös det',
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {alerts.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-card)',
            borderRadius: '16px', padding: '16px 18px',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex', gap: '12px',
          }}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <a.icon size={18} color={a.color} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: a.color }}>{a.label}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-3)', flexShrink: 0 }}>{a.time}</span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '3px' }}>{a.title}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-2)' }}>{a.sub}</p>
          </div>
          <button style={{
            flexShrink: 0, alignSelf: 'flex-start',
            padding: '6px 13px', borderRadius: '8px',
            background: a.bg, border: 'none',
            color: a.color, fontSize: '12px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>{a.action}</button>
        </motion.div>
      ))}
    </div>
  )
}

function FeatureLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '12px', fontWeight: 700, color: 'var(--brand)',
      letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '16px',
    }}>{children}</p>
  )
}
