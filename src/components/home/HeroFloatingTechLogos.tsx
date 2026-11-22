import { memo } from 'react'
import { FLOATING_LOGOS } from './hero-floating-logos-data'

export const HERO_FLOATING_LOGO_SPEEDS = FLOATING_LOGOS.map((item) => item.scrollSpeed)

interface HeroFloatingTechLogosProps {
  logoScrollRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const HeroFloatingTechLogos = memo(function HeroFloatingTechLogos({
  logoScrollRefs,
}: HeroFloatingTechLogosProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {FLOATING_LOGOS.map((item, idx) => (
        <div
          key={item.id}
          className="hero-logo-pos absolute -translate-x-1/2 -translate-y-1/2"
          style={
            {
              '--m-left': item.mobileLeft,
              '--m-top': item.mobileTop,
              '--d-left': item.left,
              '--d-top': item.top,
            } as React.CSSProperties
          }
        >
          <div
            ref={(el) => {
              logoScrollRefs.current[idx] = el
            }}
            className="will-change-transform"
          >
            <div
              className="hero-logo-float"
              style={{
                animationDuration: item.duration,
                animationDelay: item.delay,
              }}
            >
              <div
                className={`hero-logo-tile relative flex items-center justify-center rounded-[12px] min-[380px]:rounded-[14px] md:rounded-[20px] xl:rounded-[22px] backdrop-blur-xl ${item.size}`}
                style={{
                  background: item.tileBg,
                  transform: item.tilt,
                  border: `1px solid ${item.borderTint}`,
                  boxShadow: `0 16px 32px -10px rgba(2, 6, 23, 0.58), 0 0 22px -8px ${item.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.28), inset 0 -2px 5px rgba(0, 0, 0, 0.42)`,
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/3 rounded-t-[8px] md:inset-x-2 md:top-1 md:rounded-t-[12px]"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
                {item.renderIcon()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})
