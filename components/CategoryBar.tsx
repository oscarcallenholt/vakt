'use client'

import { motion } from 'framer-motion'
import { kategorier } from '@/lib/data'

export function CategoryBar() {
  return (
    <div>
      {/* Segmented bar */}
      <div style={{
        display: 'flex', height: '10px', borderRadius: '99px',
        overflow: 'hidden', gap: '2px',
        background: 'var(--border)',
      }}>
        {kategorier.map((k, i) => (
          <motion.div
            key={k.namn}
            initial={{ width: 0 }}
            animate={{ width: `${k.andel}%` }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
            style={{ background: k.farg, minWidth: 0 }}
            title={`${k.namn}: ${k.andel}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px 16px', marginTop: '14px',
      }}>
        {kategorier.map(k => (
          <div key={k.namn} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: k.farg, flexShrink: 0,
            }} />
            <span style={{ fontSize: '12px', color: 'var(--text-2)', fontWeight: 500 }}>
              {k.namn}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>
              {k.andel}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
