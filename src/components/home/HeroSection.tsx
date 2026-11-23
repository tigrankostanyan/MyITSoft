import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Cpu } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'
import { HeroFloatingTechLogos } from './HeroFloatingTechLogos'
import { Hero3DStage } from './hero/Hero3DStage'
import { HeroWhySection } from './hero/HeroWhySection'

interface HeroSectionProps {
  heroTrackRef: React.RefObject<HTMLDivElement | null>
  scrollProgressRef: React.MutableRefObject<number>
  heroLogoRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  heroDarkenRef: React.RefObject<HTMLDivElement | null>
  heroContentRef: React.RefObject<HTMLDivElement | null>
  heroPosterRef: React.RefObject<HTMLDivElement | null>
  onJumpTo: (id: string) => void
  onOpenInspector?: (id: string) => void
}

export const HeroSection = memo(function HeroSection({
  heroTrackRef,
  scrollProgressRef,
  heroLogoRefs,
  heroDarkenRef,
  heroContentRef,
  heroPosterRef,
  onJumpTo,
}: HeroSectionProps) {
  const { t } = useTranslations()

  return (
    <div ref={heroTrackRef} id="hero" className="relative overflow-x-clip">
      <div
        className="pointer-events-none sticky top-0 z-20 h-screen w-full overflow-hidden"
        style={{ contain: 'layout paint' }}
      >
        <div
          ref={heroDarkenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[#050812] opacity-0 will-change-[opacity]"
        />
        <Hero3DStage
          scrollProgressRef={scrollProgressRef}
          posterWrapRef={heroPosterRef}
        />
      </div>

      <section className="bg-royal-hero relative -mt-[100vh] flex min-h-screen flex-col justify-between overflow-x-clip pt-20 pb-28 min-[576px]:pt-24 min-[576px]:pb-10 md:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0d1220]"
        />
        <HeroFloatingTechLogos logoScrollRefs={heroLogoRefs} />
        <div className="site-container flex flex-1 flex-col justify-end md:justify-center">
          <div className="h-[30vh] min-h-[175px] max-h-[245px] shrink-0 md:hidden" aria-hidden="true" />

          <div
            ref={heroContentRef}
            className="relative z-30 max-w-5xl will-change-[transform,opacity]"
          >
            <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur-md sm:mb-5 sm:px-3.5 sm:py-1.5">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#00e5ff] sm:h-2 sm:w-2" />
              <span className="truncate font-mono-tech text-[8.5px] font-bold tracking-[0.1em] text-white uppercase min-[360px]:text-[10px] sm:text-[11px] sm:tracking-[0.14em]">
                {t.hero.pill}
              </span>
            </div>

            <h1 className="font-display text-[clamp(1.65rem,4.6vw,4.35rem)] leading-[1.03] tracking-[-0.02em] text-white drop-shadow-[0_8px_32px_rgba(2,6,23,0.45)]">
              <span className="block sm:whitespace-nowrap">{t.hero.titleLine1}</span>
              <span className="block bg-gradient-to-r from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] bg-clip-text pb-[0.06em] text-transparent sm:whitespace-nowrap">
                {t.hero.titleLine2}
              </span>
            </h1>

            <p className="mt-3.5 max-w-md text-[12.5px] leading-relaxed text-white/80 min-[360px]:text-[13px] sm:mt-6 sm:text-base">
              {t.hero.subtitle}
            </p>

            <div className="relative z-30 mt-4 flex flex-wrap items-center gap-2 min-[360px]:gap-2.5 sm:mt-8 sm:gap-3.5">
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-heading text-[10.5px] font-bold tracking-[0.06em] text-[#0f172a] uppercase shadow-xl shadow-black/30 transition hover:bg-[#2563eb] hover:text-white min-[360px]:gap-2.5 min-[360px]:px-5 min-[360px]:py-3 min-[360px]:text-[11px] sm:gap-3 sm:px-7 sm:py-4 sm:text-xs sm:tracking-[0.1em] cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-white transition group-hover:bg-white group-hover:text-[#0f172a] sm:h-6 sm:w-6">
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                </span>
              </Link>

              <button
                type="button"
                onClick={() => onJumpTo('get-started')}
                className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3.5 py-2.5 font-heading text-[10.5px] font-bold tracking-[0.05em] text-white uppercase backdrop-blur-md transition hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:py-3 min-[360px]:text-[11px] sm:px-6 sm:py-4 sm:text-xs sm:tracking-[0.08em] cursor-pointer"
              >
                <Cpu className="h-3.5 w-3.5 shrink-0 text-[#00e5ff] sm:h-4 sm:w-4" aria-hidden="true" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="site-container relative z-30 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 sm:pt-5">
          <div className="font-mono-tech text-[9px] tracking-[0.1em] text-white/65 uppercase min-[380px]:text-[10px] sm:text-[11px] sm:tracking-[0.12em]">
            {t.hero.bottomStrip}
          </div>
        </div>
      </section>

      <div
        className="pointer-events-none relative h-[52vh] bg-gradient-to-b from-[#0d1220] via-[#0c1428] to-[#0d1220] sm:h-[60vh] md:h-[68vh]"
        aria-hidden="true"
      />

      <HeroWhySection />
    </div>
  )
})
