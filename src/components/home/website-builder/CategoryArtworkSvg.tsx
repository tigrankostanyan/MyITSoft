import { memo } from 'react'
import type { TopCategoryKind } from './storeMockData'
import { SmartphoneProductSvg } from './StoreProductArtwork'

export const CategoryArtworkSvg = memo(function CategoryArtworkSvg({
  kind,
}: {
  kind: TopCategoryKind
}) {
  if (kind === 'mobile') {
    return <SmartphoneProductSvg variant={0} />
  }

  if (kind === 'cosmetics') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <rect x="30" y="14" width="20" height="10" rx="3" fill="#e2e8f0" />
        <rect x="25" y="24" width="30" height="44" rx="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="29" y="34" width="22" height="20" rx="3" fill="#e0f2fe" />
        <rect x="34" y="40" width="12" height="3" rx="1.5" fill="#008ecc" />
        <rect x="36" y="46" width="8" height="2" rx="1" fill="#64748b" />
      </svg>
    )
  }

  if (kind === 'electronics') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <rect x="19" y="14" width="42" height="52" rx="5" fill="#64748b" />
        <rect x="22" y="17" width="36" height="9" rx="2" fill="#1e293b" />
        <circle cx="51" cy="21.5" r="2.2" fill="#38bdf8" />
        <circle cx="40" cy="45" r="14" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" />
        <circle cx="40" cy="45" r="9.5" fill="#1e3a8a" opacity="0.85" />
        <path d="M34 40 L42 38 L37 49 Z" fill="#ffffff" opacity="0.25" />
      </svg>
    )
  }

  if (kind === 'furniture') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <rect x="22" y="22" width="36" height="24" rx="8" fill="#d6cbbd" />
        <rect x="16" y="34" width="48" height="18" rx="6" fill="#e7dfd5" stroke="#cbbba8" strokeWidth="1.2" />
        <rect x="22" y="52" width="5" height="12" rx="2" fill="#926c4b" />
        <rect x="53" y="52" width="5" height="12" rx="2" fill="#926c4b" />
      </svg>
    )
  }

  if (kind === 'watches') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <rect x="33" y="10" width="14" height="60" rx="5" fill="#334155" />
        <rect x="26" y="22" width="28" height="36" rx="8" fill="#d1987e" />
        <rect x="29" y="25" width="22" height="30" rx="6" fill="#0f172a" />
        <text x="40" y="42" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="800" fontFamily="JetBrains Mono, monospace">
          09:41
        </text>
      </svg>
    )
  }

  if (kind === 'decor') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <path d="M36 42 C24 28, 18 18, 28 14 C35 18, 38 30, 40 42 Z" fill="#4d7c0f" />
        <path d="M40 42 C42 26, 46 14, 56 16 C58 26, 50 36, 42 42 Z" fill="#65a30d" />
        <path d="M38 42 C34 24, 38 12, 43 12 C46 20, 44 32, 40 42 Z" fill="#84cc16" />
        <path d="M27 42 L53 42 L49 66 L31 66 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
      <circle cx="40" cy="35" r="18" stroke="#d97706" strokeWidth="3" strokeDasharray="3 2" />
      <circle cx="40" cy="54" r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
      <circle cx="40" cy="54" r="2.2" fill="#0284c7" />
    </svg>
  )
})
