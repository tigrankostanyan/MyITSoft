import { memo } from 'react'
import { FLOATING_TECH_BADGES } from './faqData'
import { TechBadgeSvg } from './TechBadgeSvg'

const RADAR_RING_SIZES = [220, 360, 510, 670, 840, 1020, 1210] as const

interface FaqAmbientBackdropProps {
  ringsRef: React.RefObject<HTMLDivElement | null>
  orbRef: React.RefObject<HTMLDivElement | null>
  badgeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

/** Atmospheric radar rings, glowing energy orb, and floating tech badges behind FAQ. */
export const FaqAmbientBackdrop = memo(function FaqAmbientBackdrop({
  ringsRef,
  orbRef,
  badgeRefs,
}: FaqAmbientBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      <div
        className="absolute -top-28 left-1/2 h-[540px] w-[min(1120px,100%)] -translate-x-1/2 rounded-full blur-[145px]"
        style={{
          background:
            'radial-gradient(ellipse closest-side at center, rgba(37, 99, 235, 0.36) 0%, rgba(0, 229, 255, 0.14) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute -bottom-36 left-1/2 h-[420px] w-[min(880px,100%)] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(ellipse closest-side at center, rgba(37, 99, 235, 0.26) 0%, rgba(56, 189, 248, 0.1) 56%, transparent 100%)',
        }}
      />

      <div
        ref={ringsRef}
        className="absolute top-1/2 left-1/2 will-change-transform"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        {RADAR_RING_SIZES.map((size, i) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/[0.09]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.max(0.15, 0.85 - i * 0.1),
            }}
          />
        ))}
      </div>

      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 h-28 w-28 rounded-full blur-[20px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(224,242,254,0.9) 0%, rgba(56,189,248,0.55) 42%, transparent 72%)',
        }}
      />

      {FLOATING_TECH_BADGES.map((badge, idx) => (
        <div
          key={badge.kind}
          ref={(el) => {
            badgeRefs.current[idx] = el
          }}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 will-change-transform ${badge.posClass}`}
        >
          <TechBadgeSvg kind={badge.kind} />
        </div>
      ))}
    </div>
  )
})
