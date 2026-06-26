'use client'

import { motion } from 'framer-motion'
import {
  Search, Bell, TrendingDown, Shield, CheckCircle,
  ArrowRight, Star, Dog, Zap, Lock,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,246,242,0.9)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo size={28} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#hur-det-funkar" style={navLinkStyle}>Hur det fungerar</a>
          <Link href="/dashboard" style={{
            padding: '8px 18px', borderRadius: 'var(--r)',
            background: 'var(--brand-deep)', color: '#fff',
            fontSize: '14px', fontWeight: 600,
            textDecoration: 'none',
          }}>
            Kom igång
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        maxWidth: '760px', margin: '0 auto',
        padding: '72px 24px 64px',
        textAlign: 'center',
      }}>
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--brand-tint)', color: 'var(--brand-deep)',
            borderRadius: '99px', padding: '5px 14px',
            fontSize: '12px', fontWeight: 700,
            letterSpacing: '.04em', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            <Dog size={13} strokeWidth={2.5} />
            Vakthunden passar på dina avtal
          </span>
        </motion.div>

        <motion.h1
          className="font-display"
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          style={{
            fontSize: 'clamp(38px, 8vw, 64px)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-2px', color: 'var(--ink)',
            marginBottom: '22px',
          }}
        >
          Koll på varje krona<br />
          <span style={{ color: 'var(--brand)' }}>ditt företag</span> betalar
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          style={{
            fontSize: '18px', color: 'var(--text-2)',
            lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 36px',
          }}
        >
          Vakt samlar alla dina abonnemang och avtal — och varnar när det är dags
          att agera. Inga överraskningsräkningar mer.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" custom={3} variants={fadeUp}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
        >
          <Link href="/dashboard" style={{
            padding: '14px 28px', borderRadius: 'var(--r-lg)',
            background: 'var(--brand-deep)', color: '#fff',
            fontSize: '16px', fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 20px rgba(82,88,232,.35)',
          }}>
            Se en demo <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
          <a href="#hur-det-funkar" style={{
            padding: '14px 28px', borderRadius: 'var(--r-lg)',
            background: 'var(--surface)', color: 'var(--ink)',
            fontSize: '16px', fontWeight: 600,
            textDecoration: 'none',
            border: '1.5px solid var(--border-card)',
            boxShadow: 'var(--shadow-xs)',
          }}>
            Hur fungerar det?
          </a>
        </motion.div>

        {/* Mini dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, #6C72FF 0%, #5258E8 100%)',
            borderRadius: 'var(--r-2xl)',
            padding: '24px',
            maxWidth: '400px', margin: '0 auto',
            boxShadow: '0 24px 60px rgba(82,88,232,.28), 0 8px 20px rgba(82,88,232,.18)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                BERGSTRÖM BYGG AB
              </p>
              <p className="font-display" style={{ fontSize: '30px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1 }}>
                48 200 kr
                <span style={{ fontSize: '14px', fontWeight: 500, marginLeft: '4px', color: 'rgba(255,255,255,.7)' }}>/mån</span>
              </p>
            </div>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Dog size={20} color="#fff" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {[
              { l: '27 abonnemang', c: 'rgba(255,255,255,.12)' },
              { l: '4 att åtgärda', c: 'rgba(221,82,56,.35)' },
              { l: 'Sparar 7 188 kr', c: 'rgba(89,207,160,.25)' },
            ].map(chip => (
              <span key={chip.l} style={{
                background: chip.c, borderRadius: '99px',
                padding: '4px 12px', fontSize: '11px',
                fontWeight: 600, color: '#fff',
                border: '1px solid rgba(255,255,255,.15)',
              }}>
                {chip.l}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', height: '6px', borderRadius: '99px', overflow: 'hidden' }}>
            {[38,22,18,14,8].map((w, i) => (
              <div key={i} style={{
                width: `${w}%`,
                background: ['#CDBFFF','#FF9E7A','#59CFA0','#FFD166','#F2A03C'][i],
              }} />
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial="hidden" animate="visible" custom={5} variants={fadeUp}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '16px', marginTop: '36px', flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#F2A03C" fill="#F2A03C" />)}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>200+ svenska SME</span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>12 mkr bevakade</span>
        </motion.div>
      </section>

      {/* ── Tre Pelare ── */}
      <section id="hur-det-funkar" style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="font-display" style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '12px' }}>
            Tre enkla steg
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-2)', maxWidth: '380px', margin: '0 auto' }}>
            Från kaos till kontroll på under en dag
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              custom={i}
              variants={fadeUp}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--r-xl)',
                padding: '24px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{
                width: '46px', height: '46px', borderRadius: 'var(--r)',
                background: p.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <p.icon size={22} color={p.color} strokeWidth={2} />
              </div>
              <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.3px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.55, marginBottom: '16px' }}>
                {p.desc}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {p.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '13px' }}>
                    <CheckCircle size={14} color="var(--mint-deep)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section style={{ padding: '24px 24px 64px', maxWidth: '560px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--r-2xl)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#F2A03C" fill="#F2A03C" />)}
          </div>
          <blockquote style={{
            fontSize: '17px', lineHeight: 1.6,
            fontWeight: 500, marginBottom: '20px', fontStyle: 'italic',
            color: 'var(--ink)',
          }}>
            "Vi hittade tre abonnemang vi inte visste om — 8 400 kr om året rakt
            ner i sjön. Vakt betalade sig på en timme."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: 'var(--brand-tint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 700, color: 'var(--brand)',
            }}>A</div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700 }}>Anna Bergström</p>
              <p style={{ fontSize: '12px', color: 'var(--text-2)' }}>VD, Bergström Bygg AB</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Trust strip ── */}
      <section style={{
        padding: '28px 24px',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255,255,255,.5)',
      }}>
        <div style={{
          maxWidth: '640px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '32px', flexWrap: 'wrap',
        }}>
          {[
            { icon: Shield,      label: 'GDPR-säkert' },
            { icon: Lock,        label: 'Banknivå-kryptering' },
            { icon: CheckCircle, label: 'Vi läser bara, ändrar inget' },
          ].map(t => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <t.icon size={17} color="var(--text-2)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section style={{
        background: 'linear-gradient(135deg, #6C72FF 0%, #5258E8 100%)',
        padding: '72px 24px',
        textAlign: 'center',
      }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'rgba(255,255,255,.15)',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Dog size={26} color="#fff" />
          </div>
          <h2 className="font-display" style={{
            fontSize: '36px', fontWeight: 700, color: '#fff',
            letterSpacing: '-1px', marginBottom: '12px',
          }}>
            Sätt Vakthunden på jobb
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.72)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            Kostnadsfritt de första 14 dagarna. Inget kreditkort krävs.
          </p>
          <Link href="/dashboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '15px 32px', borderRadius: 'var(--r-lg)',
            background: '#fff', color: 'var(--brand-deep)',
            fontSize: '16px', fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,.15)',
          }}>
            Testa gratis <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '28px 24px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '900px', margin: '0 auto', flexWrap: 'wrap', gap: '12px',
      }}>
        <Logo size={22} />
        <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
          © 2026 Vakt AB · Integritetspolicy · Villkor
        </p>
      </footer>
    </div>
  )
}

/* ──── data ──── */

const pillars = [
  {
    icon: Search, title: 'Discover',
    desc: 'Kartlägg alla kostnader automatiskt — även de du glömt bort.',
    bg: 'var(--brand-tint)', color: 'var(--brand)',
    bullets: ['Koppla bankkonto', 'AI identifierar abonnemang', 'Sätt pris och kategori'],
  },
  {
    icon: Bell, title: 'Monitor',
    desc: 'Vakthunden sover aldrig. Du får en notis innan du debiteras.',
    bg: 'var(--peach-tint)', color: 'var(--peach-deep)',
    bullets: ['Prisändringar', 'Provperioder som löper ut', 'Oanvända licenser'],
  },
  {
    icon: Zap, title: 'Act',
    desc: 'Agera direkt i appen. Säg upp, omförhandla eller arkivera.',
    bg: 'var(--mint-tint)', color: 'var(--mint-deep)',
    bullets: ['Säg upp med ett klick', 'Utkast till leverantör', 'Spårbar historik'],
  },
]

const navLinkStyle: React.CSSProperties = {
  fontSize: '14px', fontWeight: 500, color: 'var(--text-2)',
  textDecoration: 'none', padding: '6px 10px', borderRadius: 'var(--r-sm)',
}
