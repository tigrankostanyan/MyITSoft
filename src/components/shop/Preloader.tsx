import { useEffect, useRef } from 'react'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { clamp01, smootherstep, syncCachedScrollY } from '~/lib/scroll-math'

const BRAND_LETTERS = ['M', 'y', 'I', 'T', 'S', 'o', 'f', 't'] as const

export function Preloader() {
  const { t } = useTranslations()
  const preloaderSeen = useUIStore((s) => s.preloaderSeen)
  const setPreloaderOpen = useUIStore((s) => s.setPreloaderOpen)
  const dismissPreloader = useUIStore((s) => s.dismissPreloader)

  const shellRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const letterFillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const letterWrapRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barFillRef = useRef<HTMLDivElement>(null)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (preloaderSeen) {
      setPreloaderOpen(false)
      return
    }

    setPreloaderOpen(true)

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      dismissPreloader()
      return
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    syncCachedScrollY()

    // Strict scroll lock on html & body so page underneath cannot scroll until preloader finishes
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior
    const prevBodyOverscroll = document.body.style.overscrollBehavior
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overscrollBehavior = 'none'

    const keepAtTop = () => {
      if (!finishedRef.current && (window.scrollY !== 0 || document.documentElement.scrollTop !== 0)) {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        syncCachedScrollY()
      }
    }

    const blockScrollEvent = (e: Event) => {
      if (finishedRef.current) return
      e.preventDefault()
      e.stopPropagation()
    }

    const blockScrollKeys = (e: KeyboardEvent) => {
      if (finishedRef.current) return
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageDown' ||
        e.key === 'PageUp' ||
        e.key === ' ' ||
        e.key === 'Home' ||
        e.key === 'End'
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    let rafId = 0
    const startTime = performance.now()
    const totalDurationMs = 2100

    const applyFrame = (p: number) => {
      // Phase 1 (0.00 -> 0.18): Logo & subtitle reveal
      const logoP = smootherstep(0.0, 0.18, p)
      if (logoRef.current) {
        const ty = (1 - logoP) * 20
        const sc = 0.84 + logoP * 0.16
        logoRef.current.style.opacity = (0.18 + logoP * 0.82).toFixed(3)
        logoRef.current.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`
      }

      const subP = smootherstep(0.06, 0.24, p)
      if (subtitleRef.current) {
        const ty = (1 - subP) * 14
        subtitleRef.current.style.opacity = (0.15 + subP * 0.85).toFixed(3)
        subtitleRef.current.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`
      }

      // Phase 2 (0.04 -> 0.68): Each letter of "MyITSoft" writes in sequentially
      const letterSpan = 0.62 / BRAND_LETTERS.length
      for (let i = 0; i < BRAND_LETTERS.length; i++) {
        const start = 0.04 + i * letterSpan
        const end = start + letterSpan * 1.45
        const lp = smootherstep(start, end, p)

        const fillEl = letterFillRefs.current[i]
        if (fillEl) {
          fillEl.style.opacity = lp.toFixed(3)
        }

        const wrapEl = letterWrapRefs.current[i]
        if (wrapEl) {
          const ty = (1 - lp) * 16
          const sc = 0.94 + lp * 0.06
          wrapEl.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`
        }
      }

      // Accent progress bar fills smoothly (0 -> 0.70)
      const writeP = clamp01(p / 0.7)
      if (barFillRef.current) {
        barFillRef.current.style.transform = `scaleX(${writeP.toFixed(4)})`
      }

      // Phase 3 (0.70 -> 1.00): Entire preloader lifts up smoothly & fades to transparent
      const liftP = smootherstep(0.7, 1.0, p)
      const fadeP = smootherstep(0.68, 0.99, p)
      if (shellRef.current) {
        const yPct = -liftP * 100
        const alpha = 1 - fadeP
        shellRef.current.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0)`
        shellRef.current.style.opacity = alpha.toFixed(3)
      }
    }

    const tick = (now: number) => {
      const p = clamp01((now - startTime) / totalDurationMs)

      if (p >= 1 && !finishedRef.current) {
        finishedRef.current = true
        applyFrame(1)
        window.scrollTo(0, 0)
        syncCachedScrollY()
        rafId = 0
        dismissPreloader()
        return
      }

      applyFrame(p)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('touchmove', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('keydown', blockScrollKeys, { capture: true })
    window.addEventListener('scroll', keepAtTop, { passive: true })

    applyFrame(0)
    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll
      document.body.style.overscrollBehavior = prevBodyOverscroll
      window.removeEventListener('wheel', blockScrollEvent, { capture: true })
      window.removeEventListener('touchmove', blockScrollEvent, { capture: true })
      window.removeEventListener('keydown', blockScrollKeys, { capture: true })
      window.removeEventListener('scroll', keepAtTop)
    }
  }, [preloaderSeen, setPreloaderOpen, dismissPreloader])

  if (preloaderSeen) return null

  return (
    <div
      ref={shellRef}
      aria-label={t.preloader.ariaLabel}
      className="fixed inset-0 z-[100] flex flex-col justify-center overflow-hidden bg-[#050811] text-white select-none will-change-[transform,opacity]"
    >
      {/* Darker Moody Ambient Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 54% at 50% 48%, rgba(23, 56, 138, 0.28) 0%, rgba(11, 20, 44, 0.55) 48%, #04070f 100%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-[380px] w-[min(780px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.1) 0%, rgba(30, 71, 173, 0.12) 45%, transparent 75%)',
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

      {/* Center Stage: Logo + Scroll-Written Brand Wordmark */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        <div
          ref={logoRef}
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1630] p-2.5 shadow-[0_14px_40px_rgba(30,71,173,0.45)] ring-1 ring-white/15 will-change-transform min-[360px]:mb-5 min-[360px]:h-16 min-[360px]:w-16 min-[360px]:p-3 sm:mb-6 sm:h-20 sm:w-20"
        >
          <img
            src="/myitsoft-logo.png"
            alt="MyITSoft"
            className="h-full w-full object-contain"
          />
        </div>

        <div
          ref={subtitleRef}
          className="mb-3 font-mono-tech text-[9px] font-bold tracking-[0.14em] text-[#7dd3fc]/85 uppercase will-change-transform min-[360px]:text-[10px] min-[360px]:tracking-[0.18em] sm:mb-5 sm:text-xs sm:tracking-[0.2em]"
        >
          {t.preloader.subtitle}
        </div>

        {/* Letter-by-letter scroll-written MyITSoft */}
        <div
          className="font-display flex items-baseline justify-center text-[clamp(2.35rem,13.5vw,11.8rem)] leading-[0.95] tracking-[-0.025em]"
          aria-label="MyITSoft"
        >
          {BRAND_LETTERS.map((ch, idx) => (
            <span
              key={`${ch}-${idx}`}
              ref={(el) => {
                letterWrapRefs.current[idx] = el
              }}
              className="relative inline-block will-change-transform"
            >
              {/* Faint outline ghost before scrolling */}
              <span
                aria-hidden="true"
                className="block select-none"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(125, 211, 252, 0.16)',
                }}
              >
                {ch}
              </span>

              {/* Luminous filled letter revealed on scroll */}
              <span
                ref={(el) => {
                  letterFillRefs.current[idx] = el
                }}
                aria-hidden="true"
                className="mobile-drop-shadow-lite absolute inset-0 block select-none"
                style={{
                  background:
                    'linear-gradient(180deg, #ffffff 0%, #e0f2fe 56%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 26px rgba(0, 229, 255, 0.28))',
                  opacity: 0,
                }}
              >
                {ch}
              </span>
            </span>
          ))}
        </div>

        {/* Sleek Writing Progress Line */}
        <div className="mt-7 h-[2px] w-[min(280px,62%)] overflow-hidden rounded-full bg-white/10 sm:mt-9">
          <div
            ref={barFillRef}
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#1E47AD] via-[#38bdf8] to-[#00e5ff]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  )
}
