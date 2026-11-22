import { memo } from 'react'
import { ShieldCheck, Zap } from 'lucide-react'
import { ShoppingCartJourneyScene } from '~/components/three/ShoppingCartJourneyScene'
import { useTranslations } from '~/store/ui-store'

interface CartJourneySectionProps {
  cartTrackRef: React.RefObject<HTMLDivElement | null>
  cartProgressRef: React.MutableRefObject<number>
  cartSpotlightRef: React.RefObject<HTMLDivElement | null>
  cartFloorGlowRef: React.RefObject<HTMLDivElement | null>
}

export const CartJourneySection = memo(function CartJourneySection({
  cartTrackRef,
  cartProgressRef,
  cartSpotlightRef,
  cartFloorGlowRef,
}: CartJourneySectionProps) {
  const { t } = useTranslations()
  return (
    <div ref={cartTrackRef} className="relative overflow-x-clip border-t border-white/10 bg-[#0a0e19]">
      <div
        className="bg-cart-stage pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden"
        style={{ contain: 'layout paint' }}
      >
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span className="font-display text-stroke-subtle text-[clamp(2.8rem,12vw,11rem)] leading-none tracking-tight whitespace-nowrap opacity-15">
            MyITSoft
          </span>
        </div>

        <div
          ref={cartSpotlightRef}
          className="hidden lg:block absolute top-1/2 left-1/2 h-[62vh] w-[68%] max-w-[820px] rounded-full opacity-85 blur-[84px] will-change-transform"
          style={{
            transform: 'translate3d(-50%, calc(-50% + 2vh), 0)',
            background:
              'radial-gradient(ellipse at center, rgba(29, 78, 216, 0.85) 0%, rgba(23, 37, 84, 0.55) 42%, rgba(15, 23, 42, 0.2) 72%, transparent 100%)',
          }}
        />

        <div
          ref={cartFloorGlowRef}
          className="hidden lg:block absolute top-[74%] left-1/2 h-[14vh] w-[46%] max-w-[520px] rounded-full opacity-65 blur-[42px] will-change-transform"
          style={{
            transform: 'translate3d(-50%, -50%, 0)',
            background:
              'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.55) 0%, rgba(0, 229, 255, 0.22) 50%, transparent 80%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 76% 72% at 50% 50%, transparent 36%, rgba(15, 23, 42, 0.45) 70%, rgba(10, 14, 25, 0.88) 100%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none sticky top-0 z-20 -mt-[100vh] h-screen w-full overflow-hidden"
        style={{ contain: 'layout paint' }}
      >
        <ShoppingCartJourneyScene scrollProgressRef={cartProgressRef} />
      </div>

      <section className="relative z-30 -mt-[100vh] flex min-h-screen items-start pt-18 pb-12 sm:pt-24 lg:items-center lg:py-24">
        <div className="site-container grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="relative z-30 min-w-0 rounded-2xl bg-[#0a0e19]/60 p-3 backdrop-blur-sm min-[420px]:bg-transparent min-[420px]:p-0 min-[420px]:backdrop-blur-none lg:col-span-6">
            <div className="font-mono-tech text-[9.5px] tracking-[0.12em] text-[#00e5ff] uppercase min-[360px]:text-[10px] sm:text-xs sm:tracking-[0.16em]">
              {t.cartJourney.eyebrow}
            </div>
            <h2 className="font-display mt-2 text-[clamp(1.45rem,7.2vw,4.4rem)] leading-[0.98] text-white uppercase sm:mt-3">
              {t.cartJourney.titleLine1}
              <br />
              {t.cartJourney.titleLine2}
              <br />
              {t.cartJourney.titleLine3}
            </h2>
            <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-white/70 min-[360px]:text-[13px] sm:mt-6 sm:text-sm">
              {t.cartJourney.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono-tech text-[10px] text-white/80 min-[360px]:text-[11px] sm:mt-8 sm:gap-6 sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#38bdf8] sm:h-5 sm:w-5" />
                <span>{t.cartJourney.badge1}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Zap className="h-4 w-4 shrink-0 text-[#00e5ff] sm:h-5 sm:w-5" />
                <span>{t.cartJourney.badge2}</span>
              </div>
            </div>
            <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono-tech text-[8.5px] tracking-wider text-white/75 uppercase min-[360px]:px-3.5 min-[360px]:py-2 min-[360px]:text-[9px] sm:mt-8 sm:gap-2.5 sm:px-4 sm:text-[11px]">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#38bdf8]" />
              <span className="truncate">{t.cartJourney.scrollPrompt}</span>
            </div>
          </div>

          <div className="h-[14vh] min-h-[100px] lg:col-span-6 lg:h-[420px]" aria-hidden="true" />
        </div>
      </section>

      <div className="pointer-events-none h-[8vh] sm:h-[16vh] lg:h-[32vh]" aria-hidden="true" />

      <section
        id="explode-lab"
        className="pointer-events-none relative z-30 min-h-[145vh] sm:min-h-[165vh] lg:min-h-[180vh]"
        aria-hidden="true"
      />
    </div>
  )
})
