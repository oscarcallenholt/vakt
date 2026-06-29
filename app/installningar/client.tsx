'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Trash2, Plus, Eye, EyeOff, Info, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { saveEmailConnection, deleteEmailConnection } from '@/lib/actions'
import { imapHostForEmail } from '@/lib/email-presets'

interface Connection {
  id: string
  email: string
  imap_host: string
  imap_port: number
  last_scanned_at: string | null
  created_at: string
}

interface Props { connections: Connection[] }

export function InstallningarClient({ connections }: Props) {
  const router = useRouter()
  const [showForm, setShowForm]   = useState(connections.length === 0)
  const [showPass, setShowPass]   = useState(false)
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [host, setHost]           = useState('')
  const [port, setPort]           = useState('993')
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')
  const [isPending, startTrans]   = useTransition()

  function onEmailChange(v: string) {
    setEmail(v)
    const preset = imapHostForEmail(v)
    setHost(preset.host)
    setPort(String(preset.port))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !host) { setError('Fyll i alla fält.'); return }
    setError('')
    const fd = new FormData()
    fd.set('email', email)
    fd.set('password', password)
    fd.set('imap_host', host)
    fd.set('imap_port', port)
    startTrans(async () => {
      try {
        await saveEmailConnection(fd)
        setSuccess('E-postkonto sparat!')
        setShowForm(false)
        setEmail(''); setPassword('')
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Något gick fel.')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Ta bort denna e-postanslutning?')) return
    startTrans(async () => {
      await deleteEmailConnection(id)
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
              { href: '/scanner',       label: 'AI-scanner' },
              { href: '/installningar', label: 'Inställningar', active: true },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                padding: '6px 14px', borderRadius: 'var(--r-sm)',
                textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                background: item.active ? 'var(--brand-tint)' : 'transparent',
                color: item.active ? 'var(--brand-deep)' : 'var(--text-2)',
              }}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 32px 80px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            Inställningar
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>
            Koppla din inkorg så kan AI:n automatiskt hitta abonnemang.
          </p>
        </div>

        {/* E-postkonton */}
        <section style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>Kopplade e-postkonton</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px', borderRadius: '10px',
                  background: 'var(--brand-deep)', color: '#fff',
                  fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <Plus size={14} /> Lägg till konto
              </button>
            )}
          </div>

          {/* Existing connections */}
          {connections.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: 'var(--r-xl)', overflow: 'hidden', marginBottom: '12px', boxShadow: 'var(--shadow-xs)' }}>
              {connections.map((c, i) => (
                <div key={c.id} style={{
                  padding: '14px 20px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  borderBottom: i < connections.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--brand-tint)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Mail size={16} color="var(--brand-deep)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{c.email}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>
                      {c.imap_host}:{c.imap_port}
                      {c.last_scanned_at && ` · Senast skannad ${new Date(c.last_scanned_at).toLocaleDateString('sv-SE')}`}
                    </p>
                  </div>
                  <Link href="/scanner" style={{
                    padding: '6px 12px', borderRadius: '8px',
                    background: 'var(--mint-tint)', color: 'var(--mint-text)',
                    fontSize: '12px', fontWeight: 700, textDecoration: 'none',
                  }}>
                    Skanna →
                  </Link>
                  <button onClick={() => handleDelete(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <Trash2 size={15} color="var(--danger)" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add form */}
          {showForm && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: 'var(--r-xl)', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Nytt e-postkonto</h3>

              {/* Gmail tip */}
              <div style={{
                background: 'var(--brand-tint)', border: '1px solid rgba(108,114,255,.2)',
                borderRadius: '10px', padding: '12px 14px', marginBottom: '18px',
                display: 'flex', gap: '10px',
              }}>
                <Info size={15} color="var(--brand-deep)" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div style={{ fontSize: '12px', color: 'var(--brand-deep)', lineHeight: 1.5 }}>
                  <strong>Gmail-användare:</strong> Aktivera IMAP under Inställningar → Vidarebefordran och POP/IMAP.
                  Använd ett <strong>applösenord</strong> (Googles säkerhetsinställningar → Applösenord) istället för ditt vanliga lösenord.
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>E-postadress</label>
                  <input
                    type="email" value={email} onChange={e => onEmailChange(e.target.value)}
                    placeholder="namn@gmail.com"
                    style={inputStyle} autoFocus
                  />
                </div>
                <div>
                  <label style={labelStyle}>Lösenord / Applösenord</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{ ...inputStyle, paddingRight: '40px' }}
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} style={{
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                    }}>
                      {showPass ? <EyeOff size={15} color="var(--text-3)" /> : <Eye size={15} color="var(--text-3)" />}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>IMAP-server (fylls i automatiskt)</label>
                    <input value={host} onChange={e => setHost(e.target.value)} placeholder="imap.gmail.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Port</label>
                    <input value={port} onChange={e => setPort(e.target.value)} placeholder="993" style={inputStyle} />
                  </div>
                </div>

                {error && <p style={{ fontSize: '13px', color: 'var(--danger)', background: 'rgba(221,82,56,.08)', padding: '10px 14px', borderRadius: '8px' }}>{error}</p>}
                {success && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--mint-text)', fontSize: '13px', fontWeight: 600 }}>
                    <CheckCircle size={15} /> {success}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                  <button type="submit" disabled={isPending} style={{
                    flex: 1, padding: '11px', borderRadius: '10px',
                    background: 'var(--brand-deep)', color: '#fff',
                    fontSize: '14px', fontWeight: 700, border: 'none',
                    cursor: isPending ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    opacity: isPending ? 0.7 : 1,
                  }}>
                    {isPending && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                    Spara och koppla
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} style={{
                    padding: '11px 20px', borderRadius: '10px',
                    border: '1.5px solid var(--border)', background: 'transparent',
                    color: 'var(--text-2)', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    Avbryt
                  </button>
                </div>
              </form>
            </div>
          )}

          {connections.length === 0 && !showForm && (
            <div style={{
              background: 'var(--surface)', border: '1.5px dashed var(--border)',
              borderRadius: 'var(--r-xl)', padding: '40px', textAlign: 'center',
            }}>
              <Mail size={28} color="var(--border)" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '4px' }}>Ingen inkorg kopplad</p>
              <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>Lägg till ett e-postkonto för att aktivera AI-scannern</p>
            </div>
          )}
        </section>

        {/* Anthropic API nyckel info */}
        <section>
          <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>AI-nyckel</h2>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: 'var(--r-xl)', padding: '20px', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: process.env.NEXT_PUBLIC_HAS_AI ? 'var(--mint-tint)' : 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {process.env.NEXT_PUBLIC_HAS_AI
                  ? <CheckCircle size={16} color="var(--mint-text)" />
                  : <span style={{ fontSize: '16px' }}>🤖</span>
                }
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700 }}>Anthropic Claude</p>
                <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>
                  {process.env.NEXT_PUBLIC_HAS_AI ? 'Aktiv' : 'Lägg till ANTHROPIC_API_KEY i .env.local'}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.6 }}>
              AI-scannern använder Claude för att analysera dina mail. Hämta din API-nyckel på{' '}
              <span style={{ color: 'var(--brand-deep)', fontWeight: 600 }}>console.anthropic.com</span>{' '}
              och lägg till <code style={{ background: 'var(--bg)', padding: '1px 6px', borderRadius: '4px', fontSize: '11px' }}>ANTHROPIC_API_KEY=sk-ant-...</code> i .env.local.
            </p>
          </div>
        </section>
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px', fontWeight: 700, color: 'var(--text-2)',
  textTransform: 'uppercase', letterSpacing: '.05em',
  display: 'block', marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px',
  borderRadius: '10px', border: '1.5px solid var(--border)',
  background: 'var(--bg)', color: 'var(--ink)',
  fontSize: '14px', fontFamily: 'inherit', outline: 'none',
}
