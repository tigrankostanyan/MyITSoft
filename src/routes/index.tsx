import { useCallback, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useUIStore } from '~/store/ui-store'
import { useHomeScrollChoreography } from '~/lib/useHomeScrollChoreography'
import { Preloader } from '~/components/shop/Preloader'
import { Navbar } from '~/components/shop/Navbar'
import { FoodSelectionCarousel } from '~/components/shop/FoodSelectionCarousel'
import { Product3DModal } from '~/components/shop/Product3DModal'
import { CartDrawer } from '~/components/shop/CartDrawer'
import { HeroSection } from '~/components/home/HeroSection'
import { ServicesSection } from '~/components/home/ServicesSection'
import { CartJourneySection } from '~/components/home/CartJourneySection'
import { TeamSection } from '~/components/home/TeamSection'
import { FaqSection } from '~/components/home/FaqSection'
import { LaunchSequenceSection } from '~/components/home/LaunchSequenceSection'
import { NewsletterFooter } from '~/components/home/NewsletterFooter'

export const Route = createFileRoute('/')({ component: Home })

const ENABLE_TEAM_SECTION = false

function Home() {
  const heroTrackRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)
  const heroLogoRefs = useRef<(HTMLDivElement | null)[]>([])

  const cartTrackRef = useRef<HTMLDivElement>(null)
  const cartProgressRef = useRef(0)
  const cartSpotlightRef = useRef<HTMLDivElement>(null)
  const cartFloorGlowRef = useRef<HTMLDivElement>(null)

  const openInspector = useUIStore((s) => s.openInspector)
  const overlayOpen = useUIStore(
    (s) => s.cartOpen || s.inspectorId !== null || s.preloaderOpen,
  )

  const lenisRef = useHomeScrollChoreography({
    heroTrackRef,
    scrollProgressRef,
    heroLogoRefs,
    cartTrackRef,
    cartProgressRef,
    cartSpotlightRef,
    cartFloorGlowRef,
    overlayOpen,
  })

  const jumpTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.15 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [lenisRef],
  )

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070b16] text-white">
      <Preloader />
      <Navbar onJumpTo={jumpTo} />

      <HeroSection
        heroTrackRef={heroTrackRef}
        scrollProgressRef={scrollProgressRef}
        heroLogoRefs={heroLogoRefs}
        onJumpTo={jumpTo}
        onOpenInspector={openInspector}
      />

      <FoodSelectionCarousel />

      <ServicesSection onJumpTo={jumpTo} />

      <CartJourneySection
        cartTrackRef={cartTrackRef}
        cartProgressRef={cartProgressRef}
        cartSpotlightRef={cartSpotlightRef}
        cartFloorGlowRef={cartFloorGlowRef}
      />

      {ENABLE_TEAM_SECTION && <TeamSection />}
      <FaqSection />
      <LaunchSequenceSection />
      <NewsletterFooter onJumpTo={jumpTo} />

      <CartDrawer />
    </div>
  )
}
