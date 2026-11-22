import { useRef } from 'react'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { usePreloaderLock } from './preloader/usePreloaderLock'

const BRAND_LETTERS = ['M', 'y', 'I', 'T', 'S', 'o', 'f', 't'] as const

/** GPU-composited pure CSS brand intro curtain that runs immediately on first paint. */
export function Preloader() {
  const { t } = useTranslations()
  const preloaderSeen = useUIStore((s) => s.preloaderSeen)
  const setPreloaderOpen = useUIStore((s) => s.setPreloaderOpen)
  const dismissPreloader = useUIStore((s) => s.dismissPreloader)
  const shellRef = useRef<HTMLDivElement>(null)

  usePreloaderLock(shellRef, preloaderSeen, setPreloaderOpen, dismissPreloader)

  if (preloaderSeen) return null

  return (
    <div
      ref={shellRef}
      role="status"
      aria-label={t.preloader.ariaLabel}
      className="preloader-shell fixed inset-0 z-[100] flex flex-col justify-center overflow-hidden touch-none overscroll-none bg-[#050811] text-white select-none will-change-[transform,opacity]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 54% at 50% 48%, rgba(23, 56, 138, 0.28) 0%, rgba(11, 20, 44, 0.55) 48%, #04070f 100%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-[380px] w-[min(780px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.11) 0%, rgba(30, 71, 173, 0.1) 42%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(rgba(125, 211, 252, 0.16) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="preloader-logo mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1630] p-2.5 shadow-[0_14px_40px_rgba(30,71,173,0.45)] ring-1 ring-white/15 min-[360px]:mb-5 min-[360px]:h-16 min-[360px]:w-16 min-[360px]:p-3 sm:mb-6 sm:h-20 sm:w-20">
          <img
            src="/myitsoft-logo.webp"
            alt="MyITSoft"
            width={96}
            height={78}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="preloader-sub mb-3 font-mono-tech text-[9px] font-bold tracking-[0.14em] text-[#7dd3fc]/85 uppercase min-[360px]:text-[10px] min-[360px]:tracking-[0.18em] sm:mb-5 sm:text-xs sm:tracking-[0.2em]">
          {t.preloader.subtitle}
        </div>

        <div className="font-display -my-[0.12em] flex items-baseline justify-center text-[clamp(2.35rem,13.5vw,11.8rem)] leading-[1.2] tracking-[-0.025em]">
          <span className="sr-only">MyITSoft</span>
          {BRAND_LETTERS.map((ch, idx) => {
            const delayMs = 10 + idx * 22
            return (
              <span
                key={`${ch}-${idx}`}
                aria-hidden="true"
                className="preloader-letter-wrap relative inline-block"
                style={{ animationDelay: `${delayMs}ms` }}
              >
                <span
                  className="block select-none"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(125, 211, 252, 0.16)',
                  }}
                >
                  {ch}
                </span>

                <span
                  className="preloader-letter-fill mobile-drop-shadow-lite absolute inset-0 block select-none"
                  style={{
                    animationDelay: `${delayMs}ms`,
                    background:
                      'linear-gradient(180deg, #ffffff 0%, #e0f2fe 56%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 26px rgba(0, 229, 255, 0.28))',
                  }}
                >
                  {ch}
                </span>
              </span>
            )
          })}
        </div>

        <div className="mt-7 h-[2px] w-[min(280px,62%)] overflow-hidden rounded-full bg-white/10 sm:mt-9">
          <div className="preloader-bar h-full w-full origin-left rounded-full bg-gradient-to-r from-[#1E47AD] via-[#38bdf8] to-[#00e5ff]" />
        </div>
      </div>
    </div>
  )
}
