interface LogoProps {
  size?: number
  variant?: 'default' | 'white'
  showName?: boolean
}

export function Logo({ size = 28, variant = 'default', showName = true }: LogoProps) {
  const shieldFill = variant === 'white' ? '#FFFFFF' : '#6C72FF'
  const checkColor = variant === 'white' ? '#6C72FF' : '#FFFFFF'
  const textColor  = variant === 'white' ? '#FFFFFF' : '#211B2A'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vakt"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M32 7 C27 9 20 11 15 12 C12.5 12.5 11 14 11 17 L11 33 C11 45 20 53 32 58 C44 53 53 45 53 33 L53 17 C53 14 51.5 12.5 49 12 C44 11 37 9 32 7 Z"
          fill={shieldFill}
        />
        <path
          d="M23 33 L29.5 40 L42 25"
          fill="none"
          stroke={checkColor}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showName && (
        <span
          className="font-display"
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: textColor,
            lineHeight: 1,
          }}
        >
          Vakt
        </span>
      )}
    </div>
  )
}
