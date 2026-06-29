'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Dog, Mail, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]         = useState('')
  const [sent, setSent]           = useState(false)
  const [error, setError]         = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setError('')

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) setError(error.message)
      else setSent(true)
    })
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#161228',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,114,255,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Logo size={32} variant="white" />
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: '20px',
          padding: '36px',
          backdropFilter: 'blur(16px)',
        }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(89,207,160,.15)', border: '1px solid rgba(89,207,160,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={28} color="#59CFA0" />
              </div>
              <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                Kolla mailen!
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>
                Vi skickade en inloggningslänk till <strong style={{ color: 'rgba(255,255,255,.8)' }}>{email}</strong>.
                Klicka på länken för att logga in.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '28px' }}>
                <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  Logga in på Vakt
                </h1>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.45)', lineHeight: 1.5 }}>
                  Vi skickar en magisk länk till din mail — inga lösenord.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: '8px' }}>
                    E-postadress
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} color="rgba(255,255,255,.3)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      type="email" value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="namn@foretag.se"
                      autoFocus
                      style={{
                        width: '100%', padding: '12px 14px 12px 40px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(255,255,255,.12)',
                        background: 'rgba(255,255,255,.06)',
                        color: '#fff', fontSize: '15px',
                        fontFamily: 'inherit', outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <p style={{ fontSize: '13px', color: '#FFCFC7', background: 'rgba(221,82,56,.15)', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit" disabled={isPending || !email}
                  style={{
                    width: '100%', padding: '13px',
                    borderRadius: '12px', border: 'none',
                    background: email ? 'var(--brand)' : 'rgba(255,255,255,.08)',
                    color: email ? '#fff' : 'rgba(255,255,255,.3)',
                    fontSize: '15px', fontWeight: 700,
                    cursor: email && !isPending ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all .15s',
                    boxShadow: email ? '0 0 24px rgba(108,114,255,.35)' : 'none',
                  }}
                >
                  {isPending ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Dog size={16} />}
                  {isPending ? 'Skickar…' : 'Skicka inloggningslänk'}
                </button>
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,.2)' }}>
          Inget konto? Registrering sker automatiskt.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
