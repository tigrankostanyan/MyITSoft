import { memo } from 'react'
import { BAR_HEIGHT } from './notchGeometry'

interface MobileDockSvgProps {
  barWidth: number
  initialFill: string
  initialStroke: string
  fillPathRef: React.RefObject<SVGPathElement | null>
  clipPathRef: React.RefObject<SVGPathElement | null>
  strokePathRef: React.RefObject<SVGPathElement | null>
}

/** Vector backdrop, clipPath, and glowing notch border for MobileBottomNav. */
export const MobileDockSvg = memo(function MobileDockSvg({
  barWidth,
  initialFill,
  initialStroke,
  fillPathRef,
  clipPathRef,
  strokePathRef,
}: MobileDockSvgProps) {
  return (
    <svg
      height={BAR_HEIGHT}
      viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <clipPath id="mobileDockClip" clipPathUnits="userSpaceOnUse">
          <path ref={clipPathRef} d={initialFill} />
        </clipPath>
        <linearGradient id="mobileDockFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1f44" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#070d1e" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="mobileDockStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(56,189,248,0.22)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.8)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0.48)" />
        </linearGradient>
      </defs>
      <path ref={fillPathRef} d={initialFill} fill="url(#mobileDockFill)" />
      <path
        ref={strokePathRef}
        d={initialStroke}
        fill="none"
        stroke="url(#mobileDockStroke)"
        strokeWidth="1.35"
      />
    </svg>
  )
})
