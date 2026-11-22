import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'
import { FAQS, FLOATING_TECH_BADGES } from './faq/faqData'
import { FaqRow } from './faq/FaqRow'
import { TechBadgeSvg } from './faq/TechBadgeSvg'
import { useFaqChoreography } from './faq/useFaqChoreography'

const RADAR_RING_SIZES = [220, 360, 510, 670, 840, 1020, 1210] as const

export const FaqSection = memo(function FaqSection() {
  const { t } = useTranslations()
  const runwayRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const searchOrbRef = useRef<HTMLDivElement>(null)
  const searchTextRef = useRef<HTMLSpanElement>(null)
  const cardStageRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const glassCardRef = useRef<HTMLDivElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleToggleFaq = useCallback((idx: number) => {
    setOpenFaq((cur) => (cur === idx ? null : idx))
  }, [])

  const choreographyRefs = useMemo(
    () => ({
      runwayRef,
      ringsRef,
      orbRef,
      hookRef,
      searchWrapRef,
      searchOrbRef,
      searchTextRef,
      cardStageRef,
      titleWrapRef,
      glassCardRef,
      spineRef,
      rowRefs,
      lineRefs,
      badgeRefs,
    }),
    [],
  )

  useFaqChoreography(choreographyRefs)

  return (
    <section id="faq" className="relative overflow-x-clip border-t border-white/10 bg-[#070b16]">
      <div ref={runwayRef} className="relative h-[340vh] sm:h-[380vh] lg:h-[420vh]">
        <div
          className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden pt-[66px] pb-[88px] min-[576px]:pt-20 min-[576px]:pb-6 lg:pt-22 lg:pb-0"
          style={{ perspective: '1650px', contain: 'layout paint' }}
        >
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

          <div className="site-container relative z-10 flex flex-1 items-center justify-center">
            <div
              className="relative flex h-full w-full items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={hookRef}
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-3 text-center will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1 font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#00e5ff] uppercase backdrop-blur-md sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>MYITSOFT · FAQ</span>
                </span>
                <h2 className="font-display text-[clamp(1.5rem,6.4vw,5.6rem)] leading-[0.98] tracking-tight uppercase">
                  <span className="bg-gradient-to-b from-white via-sky-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_18px_48px_rgba(56,189,248,0.38)]">
                    {t.faq.hookTitle}
                  </span>
                </h2>
                <p className="mt-3 font-heading text-xs font-medium tracking-wide text-sky-100/75 sm:text-base">
                  {t.faq.hookSubtitle}
                </p>
              </div>

              <div
                ref={searchWrapRef}
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-2 will-change-transform"
                style={{ transformStyle: 'preserve-3d', opacity: 0, visibility: 'hidden' }}
              >
                <div
                  ref={searchOrbRef}
                  className="pointer-events-none absolute h-12 w-12 rounded-full blur-[6px] will-change-transform"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(0,229,255,0.65) 45%, transparent 75%)',
                  }}
                />

                <div className="relative flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-sky-200/35 bg-gradient-to-r from-[#162850]/75 via-[#101d3b]/80 to-[#162850]/75 px-4 py-3.5 shadow-[0_24px_65px_-12px_rgba(0,0,0,0.8),0_0_45px_rgba(56,189,248,0.26),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl sm:gap-4 sm:px-8 sm:py-5">
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff]" />
                    <span
                      ref={searchTextRef}
                      className="truncate font-heading text-sm font-bold tracking-wide text-white min-[380px]:text-base sm:text-2xl"
                    />
                    <span className="h-5 w-0.5 animate-pulse bg-[#00e5ff] sm:h-6" />
                  </div>
                  <Search className="h-5 w-5 shrink-0 text-sky-200 sm:h-7 sm:w-7" />
                </div>
              </div>

              <div
                ref={cardStageRef}
                className="relative z-20 flex w-full flex-col items-center justify-center will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div ref={titleWrapRef} className="mb-3 text-center will-change-transform sm:mb-9">
                  <h2 className="font-display text-[clamp(1.45rem,5.2vw,3.9rem)] leading-[1.02] tracking-tight text-white uppercase drop-shadow-[0_12px_36px_rgba(56,189,248,0.22)]">
                    {t.faq.titlePrefix}{' '}
                    <span className="bg-gradient-to-r from-sky-200 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
                      {t.faq.titleHighlight}
                    </span>
                  </h2>
                </div>

                <div
                  ref={glassCardRef}
                  className="relative w-full will-change-transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="max-h-[64svh] overflow-x-hidden overflow-y-auto py-2 no-scrollbar min-[576px]:max-h-[70vh] sm:py-5 lg:max-h-[76vh]">
                    <div className="relative">
                      <div
                        ref={spineRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-11 bottom-11 left-[19.5px] w-px origin-top bg-gradient-to-b from-sky-300/45 via-cyan-300/30 to-indigo-400/20 will-change-transform min-[380px]:top-12 min-[380px]:bottom-12 min-[380px]:left-[23.5px] sm:top-14 sm:bottom-14 sm:left-[34.5px]"
                      />

                      {FAQS.map((item, idx) => {
                        const tr = t.faq.items[idx]
                        const localizedItem = tr ? { ...item, ...tr } : item
                        return (
                          <FaqRow
                            key={item.num}
                            item={localizedItem}
                            idx={idx}
                            isLast={idx === FAQS.length - 1}
                            isOpen={openFaq === idx}
                            onToggle={handleToggleFaq}
                            rowRefs={rowRefs}
                            lineRefs={lineRefs}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
