import type { RefObject } from 'react'

interface HandsOverlayProps {
  overlayRef: RefObject<HTMLDivElement | null>
  sparkRef: RefObject<HTMLDivElement | null>
  humanRef: RefObject<HTMLDivElement | null>
  robotRef: RefObject<HTMLDivElement | null>
}

export function HandsOverlay({
  overlayRef,
  sparkRef,
  humanRef,
  robotRef,
}: HandsOverlayProps) {
  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-between overflow-hidden will-change-transform"
    >
      <div
        ref={sparkRef}
        className="absolute top-[33%] left-1/2 h-44 w-44 rounded-full blur-[34px] will-change-transform sm:top-[35%] sm:h-48 sm:w-48 lg:top-[50%]"
        style={{
          transform: 'translate3d(-50%, -50%, 0)',
          background:
            'radial-gradient(circle, rgba(125,211,252,0.85) 0%, rgba(56,189,248,0.35) 38%, transparent 72%)',
        }}
      />

      <div className="absolute top-[33%] right-[50.4%] w-[98%] -translate-y-1/2 sm:top-[35%] sm:w-[74%] lg:top-1/2 lg:right-[50.6%] lg:w-[49.4%]">
        <div
          ref={humanRef}
          className="w-full will-change-transform"
          style={{ transformOrigin: 'left center' }}
        >
          <img
            src="/images/human-hand.webp"
            alt=""
            width={664}
            height={179}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="mobile-drop-shadow-lite block w-full select-none object-contain drop-shadow-[0_28px_46px_rgba(0,0,0,0.78)]"
          />
        </div>
      </div>

      <div className="absolute top-[33%] left-[50.4%] w-[96%] -translate-y-1/2 sm:top-[35%] sm:w-[74%] lg:top-1/2 lg:left-[50.6%] lg:w-[49.4%]">
        <div
          ref={robotRef}
          className="w-full will-change-transform"
          style={{ transformOrigin: 'right center' }}
        >
          <img
            src="/images/robot-hand.webp"
            alt=""
            width={664}
            height={232}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="mobile-drop-shadow-lite block w-full select-none object-contain drop-shadow-[0_28px_46px_rgba(0,0,0,0.78)]"
          />
        </div>
      </div>
    </div>
  )
}
