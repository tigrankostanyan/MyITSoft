import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'
import { FAQS } from './faq/faqData'
import { FaqAmbientBackdrop } from './faq/FaqAmbientBackdrop'
import { FaqRow } from './faq/FaqRow'
import { useFaqChoreography } from './faq/useFaqChoreography'

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
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleToggleFaq = useCallback((idx: number) => {
    setOpenFaq((cur) => (cur === idx ? null : idx))
  }, [])

  useEffect(() => {
    if (openFaq === null) return

    const ensureRowVisible = () => {
      const box = scrollBoxRef.current
      const row = rowRefs.current[openFaq]
      if (!box || !row) return

      const boxRect = box.getBoundingClientRect()
      const rowRect = row.getBoundingClientRect()
      if (rowRect.bottom > boxRect.bottom - 8) {
        box.scrollBy({ top: rowRect.bottom - boxRect.bottom + 16, behavior: 'smooth' })
      } else if (rowRect.top < boxRect.top) {
        box.scrollBy({ top: rowRect.top - boxRect.top - 8, behavior: 'smooth' })
      }
    }

    const t1 = window.setTimeout(ensureRowVisible, 160)
    const t2 = window.setTimeout(ensureRowVisible, 330)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [openFaq])

  const handleListWheel: React.WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    const el = e.currentTarget
    if (el.scrollHeight <= el.clientHeight + 2) return
    const scrollingDownWithRoom =
      e.deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1
    const scrollingUpWithRoom = e.deltaY < 0 && el.scrollTop > 1
    if (scrollingDownWithRoom || scrollingUpWithRoom) {
      e.stopPropagation()
    }
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
          className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden pt-[66px] pb-[84px] min-[576px]:pt-20 min-[576px]:pb-6 lg:pt-20 lg:pb-6"
          style={{ perspective: '1650px', contain: 'layout paint' }}
        >
          <FaqAmbientBackdrop
            ringsRef={ringsRef}
            orbRef={orbRef}
            badgeRefs={badgeRefs}
          />

          <div className="site-container relative z-10 flex min-h-0 flex-1 items-center justify-center">
            <div
              className="relative flex h-full min-h-0 w-full items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={hookRef}
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-3 text-center will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1 font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#00e5ff] uppercase backdrop-blur-md sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>MYITSOFT · FAQ</span>
                </span>
                <h2 className="font-display text-[clamp(1.5rem,6.4vw,5.6rem)] leading-[0.98] tracking-tight uppercase">
                  <span className="bg-gradient-to-b from-white via-sky-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_18px_48px_rgba(56,189,248,0.38)]">
                    {t.faq.hookTitle}
                  </span>
                </h2>
                <p className="mt-3 font-heading text-xs font-medium tracking-wide text-sky-100/80 sm:text-base">
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
                  <Search className="h-5 w-5 shrink-0 text-sky-200 sm:h-7 sm:w-7" aria-hidden="true" />
                </div>
              </div>

              <div
                ref={cardStageRef}
                className="relative z-20 flex h-full min-h-0 w-full flex-col items-center justify-center will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  opacity: 0,
                  visibility: 'hidden',
                }}
              >
                <div ref={titleWrapRef} className="mb-2.5 shrink-0 text-center will-change-transform sm:mb-4 lg:mb-5">
                  <h2 className="font-display text-[clamp(1.35rem,3.6vw,3.1rem)] leading-[1.02] tracking-tight text-white uppercase drop-shadow-[0_12px_36px_rgba(56,189,248,0.22)]">
                    {t.faq.titlePrefix}{' '}
                    <span className="bg-gradient-to-r from-sky-200 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
                      {t.faq.titleHighlight}
                    </span>
                  </h2>
                </div>

                <div
                  ref={glassCardRef}
                  className="relative flex min-h-0 w-full flex-1 flex-col will-change-transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    ref={scrollBoxRef}
                    onWheel={handleListWheel}
                    className="min-h-0 flex-1 overflow-y-auto py-1 pb-4 no-scrollbar sm:py-2 sm:pb-6"
                  >
                    <div className="relative">
                      <div
                        ref={spineRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-[30px] bottom-[30px] left-[17.5px] w-px origin-top bg-gradient-to-b from-sky-300/45 via-cyan-300/30 to-indigo-400/20 will-change-transform min-[380px]:top-9 min-[380px]:bottom-9 min-[380px]:left-[21.5px] sm:top-10 sm:bottom-10 sm:left-[23.5px] lg:top-[43px] lg:bottom-[43px] lg:left-[26.5px] xl:top-[47px] xl:bottom-[47px] xl:left-[28.5px]"
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
export default FaqSection
