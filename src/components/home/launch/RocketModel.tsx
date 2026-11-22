import { memo } from 'react'

interface RocketModelProps {
  underGlowRef: React.RefObject<HTMLDivElement | null>
  windowGlowRef: React.RefObject<HTMLDivElement | null>
}

/** Rocket image with ref-driven porthole halo and ignition under-glow. */
export const RocketModel = memo(function RocketModel({
  underGlowRef,
  windowGlowRef,
}: RocketModelProps) {
  return (
    <div className="relative h-full w-full select-none">
      <div
        ref={windowGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-[26%] left-1/2 h-[34%] w-[64%] -translate-x-1/2 rounded-full blur-[28px] will-change-[opacity]"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 240, 138, 0.52) 0%, rgba(245, 158, 11, 0.24) 45%, transparent 74%)',
          opacity: 0.72,
        }}
      />

      <div
        ref={underGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2%] left-1/2 h-[38%] w-[120%] -translate-x-1/2 rounded-full blur-[34px] will-change-[opacity]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 65%, rgba(255, 247, 210, 0.85) 0%, rgba(251, 146, 60, 0.55) 38%, rgba(234, 88, 12, 0.16) 68%, transparent 82%)',
          opacity: 0.08,
        }}
      />

      <img
        src="/images/rocket-3d.webp"
        alt="MyITSoft 3D Rocket"
        width={400}
        height={768}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="mobile-drop-shadow-lite relative z-10 h-full w-full object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
      />
    </div>
  )
})
