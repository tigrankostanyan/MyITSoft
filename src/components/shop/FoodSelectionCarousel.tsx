import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Box, CheckCircle2 } from 'lucide-react'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { useCartStore } from '~/store/cart-store'
import { SERVICE_STEPS } from './carousel/carouselData'
import { useCarouselScroll } from './carousel/useCarouselScroll'
import { HandsOverlay } from './carousel/HandsOverlay'
import { ServiceCard } from './carousel/ServiceCard'
import { SlideFrame } from './carousel/SlideFrame'
import { Slide0 } from './carousel/Slide0'
import { Slide1 } from './carousel/Slide1'
import { Slide2 } from './carousel/Slide2'
import { Slide3 } from './carousel/Slide3'
import { Slide4 } from './carousel/Slide4'

export const FoodSelectionCarousel = memo(function FoodSelectionCarousel() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stage3DRef = useRef<HTMLDivElement>(null)
  const handsOverlayRef = useRef<HTMLDivElement>(null)
  const humanHandRef = useRef<HTMLDivElement>(null)
  const robotHandRef = useRef<HTMLDivElement>(null)
  const sparkRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const stageWrapRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)
  const addedTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('resize', check)
      if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current)
    }
  }, [])

  const openInspector = useUIStore((s) => s.openInspector)
  const addToCart = useCartStore((s) => s.add)
  const { t } = useTranslations()

  useCarouselScroll(
    {
      runwayRef,
      stickyRef,
      handsOverlayRef,
      humanHandRef,
      robotHandRef,
      sparkRef,
      headlineRef,
      subtitleRef,
      stageWrapRef,
      slideRefs,
    },
    setActiveStepIdx,
  )

    const handleStageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return
    const el = stage3DRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    el.style.transform = `perspective(1500px) rotateY(${(nx * 5.5 - 2.5).toFixed(2)}deg) rotateX(${(-ny * 3.8 + 1.2).toFixed(2)}deg)`
  }, [])

  const handleStageMouseLeave = useCallback(() => {
    const el = stage3DRef.current
    if (!el) return
    el.style.transform = 'perspective(1500px) rotateY(-2.8deg) rotateX(1.2deg)'
  }, [])

  const jumpToStep = useCallback((stepIdx: number) => {
    const el = runwayRef.current
    if (!el) return
    const range = Math.max(1, el.offsetHeight - window.innerHeight)
    const isMobile = (window.innerWidth || 1024) < 1024
    const slideStart = isMobile ? 0 : 0.1
    const stepSpan = (1 - slideStart) / (SERVICE_STEPS.length - 1)
    const targetP = Math.min(0.99, slideStart + stepIdx * stepSpan)
    const targetTop = window.scrollY + el.getBoundingClientRect().top + targetP * range
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }, [])

  const handleAddToCart = useCallback(
    (productId: string) => {
      addToCart(productId)
      setAddedId(productId)
      if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current)
      addedTimerRef.current = window.setTimeout(() => {
        setAddedId((cur) => (cur === productId ? null : cur))
      }, 1500)
    },
    [addToCart],
  )

  const activeStep = SERVICE_STEPS[activeStepIdx]
  const activeStepText = t.carousel.steps[activeStepIdx] ?? activeStep
  const isMobileAdded = addedId === activeStep.productId

  const slideFrame = (idx: number, child: React.ReactNode) => (
    <SlideFrame idx={idx} slideRefs={slideRefs}>
      {child}
    </SlideFrame>
  )

  return (
    <section id="shop" className="relative overflow-x-clip bg-[#070b16]">
      <div ref={runwayRef} className="relative h-[260vh] sm:h-[300vh] lg:h-[380vh]">
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden pt-[68px] pb-[84px] min-[576px]:pt-[84px] min-[576px]:pb-4 lg:pt-[88px] lg:pb-4"
          style={{ contain: 'layout paint' }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ contain: 'layout paint' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[#081126] to-[#05070e]" />
            <div
              className="hidden lg:block absolute -top-32 left-1/2 h-[560px] w-[min(980px,100%)] -translate-x-1/2 rounded-full blur-[145px] transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse closest-side at center, ${activeStep.auraFrom}, ${activeStep.auraTo} 58%, transparent 100%)`,
              }}
            />
            <div
              className="hidden lg:block absolute left-1/2 -bottom-44 h-[420px] w-[min(760px,100%)] -translate-x-1/2 rounded-full blur-[135px] transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse closest-side at center, ${activeStep.auraTo}, transparent 100%)`,
              }}
            />
          </div>

          <div className="hidden lg:block">
            <HandsOverlay
              overlayRef={handsOverlayRef}
              sparkRef={sparkRef}
              humanRef={humanHandRef}
              robotRef={robotHandRef}
            />
          </div>

          <div className="site-container relative z-10 flex max-h-full flex-col justify-center">
            <div ref={headlineRef} className="relative z-20 mb-2 text-center will-change-transform sm:mb-3 lg:mb-3 xl:mb-4">
              <div className="mb-1 inline-flex items-center gap-2 font-mono-tech text-[9.5px] tracking-[0.16em] text-[#00e5ff] uppercase sm:mb-1.5 sm:text-xs sm:tracking-[0.18em]">
                <span>{t.carousel.eyebrow}</span>
              </div>
              <h2 className="mx-auto max-w-4xl font-display text-[clamp(1.05rem,min(2.6vw,3.4vh),2.15rem)] leading-[1.12] tracking-tight text-white uppercase drop-shadow-[0_12px_36px_rgba(56,189,248,0.2)]">
                {t.carousel.titlePrefix}{' '}
                <span className="bg-gradient-to-r from-sky-200 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
                  {t.carousel.titleHighlight}
                </span>
              </h2>

              <p
                ref={subtitleRef}
                className="mx-auto mt-1.5 max-w-[275px] px-2 text-[11px] leading-snug text-sky-100/80 will-change-transform min-[380px]:max-w-[310px] sm:mt-2 sm:max-w-xl sm:px-0 sm:text-sm sm:leading-relaxed lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-full lg:mt-2"
              >
                {t.carousel.subtitle}
              </p>
            </div>

            <div ref={stageWrapRef} className="will-change-transform">
              <div className="grid grid-cols-1 items-center gap-2 sm:gap-4 lg:grid-cols-12 lg:gap-7 xl:gap-10">
                <div className="order-2 lg:order-1 lg:col-span-5">
                  <div className="hidden lg:flex lg:flex-col lg:gap-2 xl:gap-2.5">
                    {SERVICE_STEPS.map((step, idx) => {
                      const tr = t.carousel.steps[idx]
                      const localizedStep = tr ? { ...step, ...tr } : step
                      return (
                        <ServiceCard
                          key={step.id}
                          step={localizedStep}
                          idx={idx}
                          active={idx === activeStepIdx}
                          isAdded={addedId === step.productId}
                          onJump={jumpToStep}
                          onInspect={openInspector}
                          onAdd={handleAddToCart}
                        />
                      )
                    })}
                  </div>

                  {/* Clean Minimal Mobile Solution Summary */}
                  <div className="mx-auto flex max-w-[360px] flex-col justify-between px-1 text-center lg:hidden">
                    <h3 className="font-heading text-[16px] leading-snug font-bold tracking-tight text-white min-[380px]:text-[18px]">
                      {activeStepText.title}
                    </h3>

                    <p className="mx-auto mt-1 line-clamp-2 max-w-[330px] text-[11.5px] leading-snug text-sky-100/72 min-[380px]:text-[12.5px]">
                      {activeStepText.shortDesc}
                    </p>

                    <div className="mx-auto mt-3 flex w-full max-w-[260px] justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('footer-audit')
                          el?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 font-heading text-[11px] font-bold whitespace-nowrap text-[#070d1e] uppercase shadow-[0_8px_24px_rgba(56,189,248,0.28)] transition hover:bg-[#38bdf8] cursor-pointer"
                      >
                        <span>{t.carousel.discussProject}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="order-1 relative flex h-[230px] items-center justify-center overflow-hidden py-1 min-[380px]:h-[275px] sm:h-[360px] md:h-[400px] lg:order-2 lg:col-span-7 lg:h-[min(460px,54vh)] lg:overflow-visible lg:py-0 xl:h-[min(520px,58vh)]"
                  onMouseMove={handleStageMouseMove}
                  onMouseLeave={handleStageMouseLeave}
                  style={{ perspective: '1600px' }}
                >
                  <div
                    ref={stage3DRef}
                    className="relative h-full w-full max-w-[295px] transition-transform duration-300 ease-out will-change-transform min-[380px]:max-w-[365px] sm:max-w-[460px] lg:max-w-[min(660px,76vh,100%)] xl:max-w-[min(740px,78vh,100%)]"
                    style={{
                      transform: 'perspective(1500px) rotateY(-2.8deg) rotateX(1.2deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {slideFrame(0, <Slide0 />)}
                    {slideFrame(1, <Slide1 />)}
                    {slideFrame(2, <Slide2 render3D={isDesktop && Math.abs(activeStepIdx - 2) <= 1} />)}
                    {slideFrame(3, <Slide3 render3D={isDesktop && Math.abs(activeStepIdx - 3) <= 1} />)}
                    {slideFrame(4, <Slide4 />)}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 hidden items-center justify-center lg:flex">
                <div className="flex items-center gap-2">
                  {SERVICE_STEPS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={s.title}
                      onClick={() => jumpToStep(idx)}
                      className="h-1.5 w-7 cursor-pointer overflow-hidden rounded-full bg-white/20"
                    >
                      <span
                        className="block h-full w-full origin-center rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor:
                            idx === activeStepIdx ? '#7dd3fc' : 'rgba(255,255,255,0.35)',
                          transform: idx === activeStepIdx ? 'scaleX(1)' : 'scaleX(0.32)',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
