import { lazy, Suspense } from 'react'

const FoodSelectionCarousel = lazy(() => import('~/components/shop/FoodSelectionCarousel'))
const ServicesSection = lazy(() => import('~/components/home/ServicesSection'))
const CartJourneySection = lazy(() => import('~/components/home/CartJourneySection'))
const FaqSection = lazy(() => import('~/components/home/FaqSection'))
const LaunchSequenceSection = lazy(() => import('~/components/home/LaunchSequenceSection'))
const NewsletterFooter = lazy(() => import('~/components/home/NewsletterFooter'))

interface BelowFoldMainSectionsProps {
  onJumpTo: (id: string) => void
  cartTrackRef: React.RefObject<HTMLDivElement | null>
  cartProgressRef: React.MutableRefObject<number>
  cartSpotlightRef: React.RefObject<HTMLDivElement | null>
  cartFloorGlowRef: React.RefObject<HTMLDivElement | null>
}

/** Lazy-loaded below-fold sections rendered inside <main> after user interaction or scroll. */
export function BelowFoldMainSections({
  onJumpTo,
  cartTrackRef,
  cartProgressRef,
  cartSpotlightRef,
  cartFloorGlowRef,
}: BelowFoldMainSectionsProps) {
  return (
    <>
      <Suspense fallback={null}>
        <FoodSelectionCarousel />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesSection onJumpTo={onJumpTo} />
      </Suspense>

      <Suspense fallback={null}>
        <CartJourneySection
          cartTrackRef={cartTrackRef}
          cartProgressRef={cartProgressRef}
          cartSpotlightRef={cartSpotlightRef}
          cartFloorGlowRef={cartFloorGlowRef}
        />
      </Suspense>

      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>

      <Suspense fallback={null}>
        <LaunchSequenceSection />
      </Suspense>
    </>
  )
}

/** Lazy-loaded site footer rendered directly after </main>. */
export function BelowFoldFooter({ onJumpTo }: { onJumpTo: (id: string) => void }) {
  return (
    <Suspense fallback={null}>
      <NewsletterFooter onJumpTo={onJumpTo} />
    </Suspense>
  )
}
