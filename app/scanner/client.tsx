'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Mail, CheckCircle, XCircle, Loader2,
  AlertCircle, ArrowRight, Inbox,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { importDiscoveredSubscription, skipDiscoveredSubscription } from '@/lib/actions'
import { fmtKr } from '@/lib/data'

interface Connection { id: string; email: string; last_scanned_at: string | null }
interface Discovered {
  id: string; vendor: string | null; name: string
  cost_per_month: number | null; billing_cycle: string
  next_renewal: string | null; category: string
  source_email: string | null; source_sender: string | null
  confidence: number; status: string; raw_preview: string | null
}

interface Props {
  connections: Connection[]
  pending: Discovered[]
  imported: Discovered[]
}

const CAT_LABEL: Record<string, string> = {
  software: 'Mjukvara', telephony: 'Telefoni', insurance: 'Försäkring',
  marketing: 'Marknadsföring', other: 'Övrigt',
}
const CAT_COLOR: Record<string, string> = {
  software: 'var(--brand-deep)', telephony: 'var(--peach-deep)',
  insurance: 'var(--mint-text)', marketing: '#8B5000', other: 'var(--text-2)',
}
const CAT_BG: Record<string, string> = {
  software: 'var(--brand-tint)', telephony: 'var(--peach-tint)',
  insurance: 'var(--mint-tint)', marketing: '#FFF4E8', other: 'var(--border)',
}

export function ScannerClient({ connections, pending, imported }: Props) {
  const router = useRouter()
  const [scanning, setScanning]     = useState(false)
  const [scanResult, setScanResult] = useState<{ scanned: number; found: number } | null>(null)
  const [scanError, setScanError]   = useState('')
  const [isPending, startTrans]     = useTransition()

  async function runScan(connectionId: string) {
    setScanning(true)
    setScanError('')
    setScanResult(null)
    try {
      const res = await fetch('/api/scan-inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Fel vid scanning')
      setScanResult(data)
      router.refresh()
    } catch (err: unknown) {
      setScanError(err instanceof Error ? err.message : 'Något gick fel')
    } finally {
      setScanning(false)
    }
  }

  function handleImport(id: string) {
    startTrans(async () => {
      await importDiscoveredSubscription(id)
      router.refresh()
    })
  }

  function handleSkip(id: string) {
    startTrans(async () => {
      await skipDiscoveredSubscription(id)
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
              { href: '/dashboard',     label: 'Översikt'   },
              { href: '/abonnemang',    label: 'Abonnemang' },
              { href: '/scanner',       label: 'AI-scanner', active: true },
              { href: '/installningar', label: 'Inställningar' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                padding: '6px 14px', borderRadius: 'var(--r-sm)',
                textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                background: (item as any).active ? 'var(--brand-tint)' : 'transparent',
                color: (item as any).active ? 'var(--brand-deep)' : 'var(--text-2)',
              }}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 32px 80px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            AI-scanner
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>
            Claude AI går igenom din inkorg och hittar abonnemang automatiskt.
          </p>
        </div>

        {/* No connections state */}
        {connections.length === 0 && (
          <div style={{
            background: 'var(--surface)', border: '1.5px dashed var(--border)',
            borderRadius: 'var(--r-xl)', padding: '60px', textAlign: 'center',
          }}>
            <Mail size={36} color="var(--border)" style={{ marginBottom: '14px' }} />
            <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Ingen inkorg kopplad</p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px' }}>
              Gå till Inställningar och koppla din e-post för att starta AI-scannern.
            </p>
            <Link href="/installningar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px',
              background: 'var(--brand-deep)', color: '#fff',
              fontSize: '14px', fontWeight: 700, textDecoration: 'none',
            }}>
              Koppla e-post <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Scan controls */}
        {connections.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #161228 0%, #1e1542 100%)',
            borderRadius: 'var(--r-xl)', padding: '28px',
            marginBottom: '24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(108,114,255,.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(108,114,255,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={20} color="#a5aaff" />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Skanna inkorgen</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)' }}>
                  AI:n läser dina senaste 80 mail och hittar abonnemang
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {connections.map(c => (
                <div key={c.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,.07)', borderRadius: '10px', padding: '10px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="rgba(255,255,255,.5)" />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>{c.email}</span>
                    {c.last_scanned_at && (
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)' }}>
                        · skannad {new Date(c.last_scanned_at).toLocaleDateString('sv-SE')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => runScan(c.id)}
                    disabled={scanning}
                    style={{
                      padding: '7px 16px', borderRadius: '8px',
                      background: scanning ? 'rgba(255,255,255,.1)' : 'var(--brand)',
                      color: '#fff', fontSize: '12px', fontWeight: 700,
                      border: 'none', cursor: scanning ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    {scanning
                      ? <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> Skannar…</>
                      : <><Sparkles size={12} /> Skanna</>
                    }
                  </button>
                </div>
              ))}
            </div>

            {scanResult && (
              <div style={{
                background: 'rgba(89,207,160,.15)', border: '1px solid rgba(89,207,160,.3)',
                borderRadius: '10px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <CheckCircle size={16} color="#59CFA0" />
                <span style={{ fontSize: '13px', color: '#A8F0D5', fontWeight: 600 }}>
                  Klart! Läste {scanResult.scanned} mail och hittade {scanResult.found} potentiella abonnemang.
                </span>
              </div>
            )}
            {scanError && (
              <div style={{
                background: 'rgba(221,82,56,.15)', border: '1px solid rgba(221,82,56,.3)',
                borderRadius: '10px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <AlertCircle size={16} color="#DD5238" />
                <span style={{ fontSize: '13px', color: '#FFCFC7', fontWeight: 500 }}>{scanError}</span>
              </div>
            )}
          </div>
        )}

        {/* Pending results */}
        {pending.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>
              Hittade abonnemang <span style={{
                background: 'var(--brand-tint)', color: 'var(--brand-deep)',
                fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px',
                marginLeft: '6px',
              }}>{pending.length}</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '14px' }}>
              Granska och importera de abonnemang AI:n hittade i din inkorg.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pending.map(d => (
                <DiscoveredCard key={d.id} d={d} onImport={handleImport} onSkip={handleSkip} isPending={isPending} />
              ))}
            </div>
          </div>
        )}

        {/* Empty pending */}
        {connections.length > 0 && pending.length === 0 && !scanning && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border-card)',
            borderRadius: 'var(--r-xl)', padding: '48px', textAlign: 'center',
            marginBottom: '28px', boxShadow: 'var(--shadow-xs)',
          }}>
            <Inbox size={32} color="var(--border)" style={{ marginBottom: '12px' }} />
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '6px' }}>
              Inga resultat att granska
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
              Tryck på Skanna-knappen ovan för att starta AI-analysen
            </p>
          </div>
        )}

        {/* Imported history */}
        {imported.length > 0 && (
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '10px' }}>
              Nyligen importerade
            </h2>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)',
            }}>
              {imported.map((d, i) => (
                <div key={d.id} style={{
                  padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px',
                  borderBottom: i < imported.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <CheckCircle size={16} color="var(--mint-text)" />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600 }}>{d.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>{d.vendor} · {d.source_sender}</p>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>
                    {d.cost_per_month ? fmtKr(d.cost_per_month) : '—'}/mån
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function DiscoveredCard({ d, onImport, onSkip, isPending }: {
  d: Discovered
  onImport: (id: string) => void
  onSkip: (id: string) => void
  isPending: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const cat = d.category ?? 'other'

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-card)',
      borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)',
    }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Category chip */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: CAT_BG[cat], flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: CAT_COLOR[cat] }}>
            {(d.vendor ?? d.name)[0].toUpperCase()}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '14px', fontWeight: 700 }}>{d.name}</p>
            {d.vendor && d.vendor !== d.name && (
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>{d.vendor}</p>
            )}
            <span style={{
              fontSize: '11px', fontWeight: 600,
              color: CAT_COLOR[cat], background: CAT_BG[cat],
              padding: '2px 8px', borderRadius: '99px',
            }}>{CAT_LABEL[cat]}</span>
            {/* Confidence */}
            <span style={{
              fontSize: '11px', fontWeight: 600,
              color: d.confidence >= 75 ? 'var(--mint-text)' : 'var(--peach-deep)',
              background: d.confidence >= 75 ? 'var(--mint-tint)' : 'var(--peach-tint)',
              padding: '2px 8px', borderRadius: '99px',
            }}>
              {d.confidence}% säkerhet
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
            {d.source_sender && (
              <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>
                <Mail size={10} style={{ marginRight: '3px', verticalAlign: 'middle' }} />
                {d.source_sender.length > 40 ? d.source_sender.slice(0, 40) + '…' : d.source_sender}
              </p>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            {d.cost_per_month ? fmtKr(Math.round(d.cost_per_month)) : '?'}
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>
            {d.billing_cycle === 'monthly' ? '/mån' : d.billing_cycle === 'yearly' ? '/år' : '/kvartal'}
          </p>
        </div>
      </div>

      {/* Preview toggle */}
      {d.source_email && (
        <div style={{ paddingLeft: '78px', paddingRight: '20px', paddingBottom: '4px' }}>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-3)', fontFamily: 'inherit', padding: '0 0 8px' }}
          >
            {expanded ? '▲ Dölj mail' : `▼ ${d.source_email.length > 60 ? d.source_email.slice(0, 60) + '…' : d.source_email}`}
          </button>
          {expanded && d.raw_preview && (
            <div style={{
              fontSize: '11px', color: 'var(--text-3)', lineHeight: 1.6,
              background: 'var(--bg)', borderRadius: '8px', padding: '10px 12px',
              marginBottom: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {d.raw_preview}
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div style={{
        padding: '12px 20px', borderTop: '1px solid var(--border)',
        display: 'flex', gap: '8px', background: 'var(--bg)',
      }}>
        <button
          onClick={() => onImport(d.id)}
          disabled={isPending}
          style={{
            flex: 1, padding: '9px', borderRadius: '10px',
            background: 'var(--brand-deep)', color: '#fff',
            fontSize: '13px', fontWeight: 700, border: 'none',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          <CheckCircle size={14} /> Importera till Vakt
        </button>
        <button
          onClick={() => onSkip(d.id)}
          disabled={isPending}
          style={{
            padding: '9px 16px', borderRadius: '10px',
            border: '1.5px solid var(--border)', background: 'transparent',
            color: 'var(--text-2)', fontSize: '13px', fontWeight: 600,
            cursor: isPending ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <XCircle size={14} /> Hoppa över
        </button>
      </div>
    </div>
  )
}
