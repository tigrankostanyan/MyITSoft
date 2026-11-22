import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from '~/store/ui-store'
import { ServiceRow } from './services/ServiceRow'
import { SERVICES, type ServiceDiscipline } from './services/servicesData'
import { useServicesChoreography } from './services/useServicesChoreography'

interface ServicesSectionProps {
  onJumpTo: (id: string) => void
}

export const ServicesSection = memo(function ServicesSection({
  onJumpTo,
}: ServicesSectionProps) {
  const { t } = useTranslations()
  const runwayRef = useRef<HTMLElement>(null)
  const pageFrameRef = useRef<HTMLDivElement>(null)
  const frameBorderRef = useRef<HTMLDivElement>(null)
  const headerWrapRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const bottomDividerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const dividerRefs = useRef<(HTMLDivElement | null)[]>([])
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleMaskRefs = useRef<(HTMLDivElement | null)[]>([])
  const capsRefs = useRef<(HTMLDivElement | null)[]>([])
  const arrowRefs = useRef<(HTMLSpanElement | null)[]>([])

  const [isDesktop, setIsDesktop] = useState(true)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [scrollActiveIdx, setScrollActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const choreographyRefs = useMemo(
    () => ({
      runwayRef,
      pageFrameRef,
      frameBorderRef,
      headerWrapRef,
      taglineRef,
      bottomDividerRef,
      footerRef,
      progressBarRef,
      dividerRefs,
      rowRefs,
      titleMaskRefs,
      capsRefs,
      arrowRefs,
    }),
    [],
  )

  useServicesChoreography(isDesktop, choreographyRefs, setScrollActiveIdx)

  const handleRowMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - rect.left).toFixed(1)}px`)
    e.currentTarget.style.setProperty('--my', `${(e.clientY - rect.top).toFixed(1)}px`)
  }, [])

  const activeIdx = hoveredIdx !== null ? hoveredIdx : scrollActiveIdx
  const activeService = activeIdx !== null ? SERVICES[activeIdx] : SERVICES[0]

  const renderRow = (service: ServiceDiscipline, idx: number) => (
    <ServiceRow
      service={service}
      idx={idx}
      isActive={activeIdx === idx}
      isHovered={hoveredIdx === idx}
      onJumpTo={onJumpTo}
      onHoverChange={setHoveredIdx}
      onMouseMove={handleRowMouseMove}
      rowRefs={rowRefs}
      titleMaskRefs={titleMaskRefs}
      capsRefs={capsRefs}
      arrowRefs={arrowRefs}
    />
  )

  return (
    <section
      id="services"
      ref={runwayRef}
      className="relative overflow-x-clip border-t border-white/10 bg-[#05070e] h-[250vh] sm:h-[280vh] lg:h-[360vh]"
    >
      <div
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
        style={{ perspective: '1650px', contain: 'layout paint' }}
      >
        <div
          ref={pageFrameRef}
          className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#05070e] pt-[66px] pb-[88px] min-[576px]:pt-20 min-[576px]:pb-6 lg:py-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            style={{ contain: 'layout paint' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 85% 58% at 88% 24%, rgba(${activeService.accentRgb}, 0.13) 0%, rgba(${activeService.accentRgb}, 0.055) 38%, rgba(${activeService.accentRgb}, 0.015) 66%, transparent 100%), radial-gradient(ellipse 80% 54% at 12% 88%, rgba(${activeService.accentRgb}, 0.09) 0%, rgba(${activeService.accentRgb}, 0.035) 40%, transparent 100%)`,
              }}
            />
          </div>

          <div
            ref={frameBorderRef}
            aria-hidden="true"
            className="pointer-events-none hidden"
          />

          <div className="site-container relative z-20 flex h-full flex-col justify-between gap-2 sm:gap-4 lg:gap-0 lg:pt-[88px] lg:pb-5 xl:pt-[96px] xl:pb-6">
            <div className="flex flex-col gap-1 sm:gap-2.5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div
                ref={headerWrapRef}
                className="will-change-transform"
                style={{ transformOrigin: 'left center' }}
              >
                <h2 className="font-heading text-[clamp(1.25rem,min(4.2vw,5vh),3.85rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-white">
                  {t.services.title}
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-block h-2 w-2 align-baseline bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.85)] sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5"
                  />
                </h2>
              </div>

              <div ref={taglineRef} className="max-w-lg lg:text-right will-change-transform">
                <p className="text-[10.5px] leading-snug text-white/55 min-[380px]:text-[11px] sm:text-xs md:text-sm sm:leading-relaxed">
                  {t.services.tagline}
                </p>
              </div>
            </div>

            <div className="my-1.5 flex flex-1 flex-col justify-center sm:my-2.5 lg:my-0">
              {SERVICES.map((service, idx) => {
                const tr = t.services.items[idx]
                const localizedService = tr ? { ...service, ...tr } : service
                return (
                  <div key={service.id}>
                    <div
                      ref={(el) => {
                        dividerRefs.current[idx] = el
                      }}
                      aria-hidden="true"
                      className="h-px w-full origin-left bg-white/[0.09] will-change-transform"
                    />
                    {renderRow(localizedService, idx)}
                  </div>
                )
              })}
              <div
                ref={bottomDividerRef}
                aria-hidden="true"
                className="h-px w-full origin-left bg-white/[0.09] will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
