'use client'

import { Dog } from 'lucide-react'

interface Props {
  message: string
  size?: 'sm' | 'md' | 'lg'
}

export function MascotBubble({ message, size = 'md' }: Props) {
  const avatarSize = size === 'sm' ? 32 : size === 'lg' ? 52 : 40
  const iconSize   = size === 'sm' ? 16 : size === 'lg' ? 26 : 20
  const fontSize   = size === 'sm' ? '12px' : size === 'lg' ? '15px' : '13px'

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
      {/* Avatar */}
      <div style={{
        width: avatarSize, height: avatarSize, borderRadius: '50%',
        background: 'var(--brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 0 0 3px rgba(108,114,255,.2)',
      }}>
        <Dog size={iconSize} color="#fff" strokeWidth={2} />
      </div>

      {/* Bubble */}
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '16px 16px 16px 4px',
        padding: size === 'sm' ? '8px 12px' : '10px 16px',
        maxWidth: '280px',
      }}>
        <p style={{
          fontSize, color: '#fff',
          fontWeight: 500, lineHeight: 1.4,
          margin: 0,
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}
