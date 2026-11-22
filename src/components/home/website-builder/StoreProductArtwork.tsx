import { memo } from 'react'

export const HeroSmartWatchSvg = memo(function HeroSmartWatchSvg() {
  return (
    <svg viewBox="0 0 220 200" className="h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]" fill="none">
      <defs>
        <linearGradient id="mm-strap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b7fa8" />
          <stop offset="50%" stopColor="#465980" />
          <stop offset="100%" stopColor="#2e3b59" />
        </linearGradient>
        <linearGradient id="mm-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4cbb8" />
          <stop offset="50%" stopColor="#d1987e" />
          <stop offset="100%" stopColor="#a96d54" />
        </linearGradient>
        <linearGradient id="mm-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#162135" />
          <stop offset="100%" stopColor="#090e1a" />
        </linearGradient>
      </defs>

      <path
        d="M84 12 C90 4, 130 4, 136 12 L134 52 L86 52 Z"
        fill="url(#mm-strap)"
      />
      <path
        d="M86 148 L134 148 L136 188 C130 196, 90 196, 84 188 Z"
        fill="url(#mm-strap)"
      />
      <path d="M128 16 C168 30, 178 148, 128 184 L120 176 C158 146, 152 44, 122 24 Z" fill="#3a4c70" opacity="0.9" />

      <rect x="150" y="76" width="8" height="22" rx="3" fill="url(#mm-bezel)" />
      <rect x="64" y="46" width="90" height="108" rx="22" fill="url(#mm-bezel)" />
      <rect x="69" y="51" width="80" height="98" rx="18" fill="#0d1322" />
      <rect x="73" y="55" width="72" height="90" rx="15" fill="url(#mm-screen)" />

      <circle cx="88" cy="70" r="8" fill="#0d9488" opacity="0.3" />
      <circle cx="88" cy="70" r="6" stroke="#2dd4bf" strokeWidth="2.5" strokeDasharray="24 12" />
      <text x="103" y="68" fill="#94a3b8" fontSize="6" fontWeight="700" fontFamily="Inter, sans-serif">
        SAT 04/56
      </text>
      <text x="103" y="76" fill="#38bdf8" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">
        13.2K STEPS
      </text>

      <text x="109" y="102" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="JetBrains Mono, monospace">
        08:26
      </text>
      <text x="109" y="114" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        00 SEC
      </text>

      <rect x="82" y="124" width="24" height="12" rx="4" fill="#ef4444" opacity="0.22" />
      <text x="94" y="132.5" textAnchor="middle" fill="#f87171" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">
        96 BPM
      </text>
      <rect x="112" y="124" width="24" height="12" rx="4" fill="#38bdf8" opacity="0.22" />
      <text x="124" y="132.5" textAnchor="middle" fill="#7dd3fc" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">
        88%
      </text>

      <path d="M74 60 L118 55 L82 110 L73 96 Z" fill="#ffffff" opacity="0.09" />
    </svg>
  )
})

const PHONE_PALETTES = [
  { back: '#e2e8f0', cam: '#cbd5e1', scrA: '#6ee7b7', scrB: '#0284c7', label: '' },
  { back: '#5a3d31', cam: '#3f2a22', scrA: '#d946ef', scrB: '#1d4ed8', label: 'M13' },
  { back: '#2f5266', cam: '#1f3a4a', scrA: '#ef4444', scrB: '#06b6d4', label: 'M33' },
  { back: '#b8cae0', cam: '#94a3b8', scrA: '#f43f5e', scrB: '#2563eb', label: 'M53' },
  { back: '#23423b', cam: '#18302a', scrA: '#10b981', scrB: '#0f172a', label: '' },
  { back: '#312e81', cam: '#1e1b4b', scrA: '#38bdf8', scrB: '#6366f1', label: 'S24' },
] as const

export const SmartphoneProductSvg = memo(function SmartphoneProductSvg({
  variant,
}: {
  variant: 0 | 1 | 2 | 3 | 4 | 5
}) {
  const pal = PHONE_PALETTES[variant]
  const gradId = `phone-scr-${variant}`

  return (
    <svg viewBox="0 0 110 116" className="h-full w-full drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)]" fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pal.scrA} />
          <stop offset="100%" stopColor={pal.scrB} />
        </linearGradient>
      </defs>

      {variant !== 0 && (
        <g>
          <rect x="16" y="13" width="46" height="92" rx="7" fill={pal.back} stroke="#0f172a" strokeOpacity="0.15" />
          <rect x="21" y="18" width="16" height="24" rx="4" fill={pal.cam} />
          <circle cx="26" cy="24" r="2.6" fill="#0f172a" />
          <circle cx="26" cy="31" r="2.6" fill="#0f172a" />
          <circle cx="32" cy="27" r="2" fill="#94a3b8" />
        </g>
      )}

      <rect
        x={variant === 0 ? 30 : 44}
        y="10"
        width="48"
        height="96"
        rx="7"
        fill="#0f172a"
        stroke="#475569"
        strokeWidth="1.2"
      />
      <rect
        x={variant === 0 ? 32.5 : 46.5}
        y="13"
        width="43"
        height="90"
        rx="5"
        fill={`url(#${gradId})`}
      />
      <circle cx={variant === 0 ? 54 : 68} cy="17" r="1.6" fill="#090d16" />

      {pal.label && (
        <text
          x="68"
          y="64"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="16"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          opacity="0.94"
        >
          {pal.label}
        </text>
      )}
      {!pal.label && (
        <path
          d={`M${variant === 0 ? 35 : 49} 36 Q${variant === 0 ? 54 : 68} 20 ${variant === 0 ? 73 : 87} 52 L${variant === 0 ? 73 : 87} 98 L${variant === 0 ? 35 : 49} 98 Z`}
          fill="#ffffff"
          opacity="0.18"
        />
      )}

      <path
        d={`M${variant === 0 ? 33 : 47} 14 L${variant === 0 ? 60 : 74} 14 L${variant === 0 ? 40 : 54} 68 L${variant === 0 ? 33 : 47} 55 Z`}
        fill="#ffffff"
        opacity="0.16"
      />
    </svg>
  )
})
