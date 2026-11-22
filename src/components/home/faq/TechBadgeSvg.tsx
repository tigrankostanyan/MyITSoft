import { memo } from 'react'

export const TechBadgeSvg = memo(function TechBadgeSvg({
  kind,
}: {
  kind: 'react' | 'ts' | 'node' | 'next'
}) {
  if (kind === 'react') {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-sky-300/20 bg-[#0d1730]/70 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl">
        <svg viewBox="0 0 64 64" className="h-full w-full text-[#38bdf8]">
          <circle cx="32" cy="32" r="5" fill="currentColor" />
          <ellipse cx="32" cy="32" rx="24" ry="9.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <ellipse
            cx="32"
            cy="32"
            rx="24"
            ry="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            transform="rotate(60 32 32)"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="24"
            ry="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            transform="rotate(120 32 32)"
          />
        </svg>
      </div>
    )
  }

  if (kind === 'ts') {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-indigo-300/20 bg-[#0d1730]/70 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl">
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect
            x="6"
            y="6"
            width="52"
            height="52"
            rx="10"
            fill="rgba(59, 130, 246, 0.16)"
            stroke="#60a5fa"
            strokeWidth="2.4"
          />
          <text
            x="32"
            y="43"
            textAnchor="middle"
            fill="#93c5fd"
            fontSize="26"
            fontWeight="800"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            TS
          </text>
        </svg>
      </div>
    )
  }

  if (kind === 'node') {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-emerald-300/20 bg-[#0d1730]/70 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl">
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <polygon
            points="32,6 55,19 55,45 32,58 9,45 9,19"
            fill="rgba(52, 211, 153, 0.12)"
            stroke="#34d399"
            strokeWidth="2.4"
          />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#6ee7b7"
            fontSize="16"
            fontWeight="800"
            fontFamily="ui-monospace, monospace"
          >
            JS
          </text>
        </svg>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#0d1730]/70 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl">
      <svg viewBox="0 0 64 64" className="h-full w-full text-sky-200">
        <circle cx="32" cy="32" r="24" fill="rgba(56, 189, 248, 0.1)" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M22 42V22l22 25M42 22v14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
})
