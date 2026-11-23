import { lazy, startTransition, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getCachedScrollY } from '~/lib/scroll-math'
import { useUIStore } from '~/store/ui-store'
import { useHomeScrollChoreography } from '~/lib/useHomeScrollChoreography'
import { Preloader } from '~/components/shop/Preloader'
import { Navbar } from '~/components/shop/Navbar'
import { HeroSection } from '~/components/home/HeroSection'
import {
  BelowFoldFooter,
  BelowFoldMainSections,
} from '~/components/home/BelowFoldSections'

const CartDrawer = lazy(() => import('~/components/shop/CartDrawer'))

export const Route = createFileRoute('/')({
  head: () => ({
    links: [
      {
        rel: 'preload',
        as: 'image',
        href: '/images/hero-stage-mobile.webp',
        media: '(max-width: 767px)',
        fetchPriority: 'high',
      },
      {
        rel: 'preload',
        as: 'image',
        imageSrcSet:
          '/images/hero-stage-desktop-480.webp 480w, /images/hero-stage-desktop-800.webp 800w, /images/hero-stage-desktop.webp 973w',
        imageSizes: 'min(57.9vw, 90.1vh)',
        media: '(min-width: 768px)',
        fetchPriority: 'high',
      },
    ],
  }),
  component: Home,
})

function Home() {
  const heroTrackRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)
  const heroLogoRefs = useRef<(HTMLDivElement | null)[]>([])
  const heroDarkenRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroPosterRef = useRef<HTMLDivElement>(null)

  const cartTrackRef = useRef<HTMLDivElement>(null)
  const cartProgressRef = useRef(0)
  const cartSpotlightRef = useRef<HTMLDivElement>(null)
  const cartFloorGlowRef = useRef<HTMLDivElement>(null)

  const [belowFoldMounted, setBelowFoldMounted] = useState(false)

  useEffect(() => {
    if (getCachedScrollY() > 4 || Boolean(window.location.hash)) {
      startTransition(() => setBelowFoldMounted(true))
      return
    }

    let triggered = false
    const mountBelowFold = () => {
      if (triggered) return
      triggered = true
      cleanup()
      startTransition(() => setBelowFoldMounted(true))
    }

    const onScroll = () => {
      if (getCachedScrollY() > 4) mountBelowFold()
    }

    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'wheel',
      'touchstart',
      'keydown',
    ]

    const cleanup = () => {
      for (const evt of events) {
        window.removeEventListener(evt, mountBelowFold)
      }
      window.removeEventListener('scroll', onScroll)
    }

    for (const evt of events) {
      window.addEventListener(evt, mountBelowFold, { passive: true, once: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return cleanup
  }, [])

  const cartOpen = useUIStore((s) => s.cartOpen)
  const overlayOpen = useUIStore(
    (s) => s.cartOpen || s.inspectorId !== null || s.preloaderOpen,
  )

  const lenisRef = useHomeScrollChoreography({
    heroTrackRef,
    scrollProgressRef,
    heroLogoRefs,
    heroDarkenRef,
    heroContentRef,
    heroPosterRef,
    cartTrackRef,
    cartProgressRef,
    cartSpotlightRef,
    cartFloorGlowRef,
    overlayOpen,
  })

  const jumpTo = useCallback(
    (id: string) => {
      const scrollToTarget = (el: HTMLElement) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { duration: 1.15 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }

      const existing = document.getElementById(id)
      if (existing) {
        scrollToTarget(existing)
        return
      }

      if (id !== 'hero') {
        setBelowFoldMounted(true)
        let frames = 0
        const waitForTarget = () => {
          const el = document.getElementById(id)
          if (el) {
            scrollToTarget(el)
            return
          }
          frames += 1
          if (frames < 120) {
            requestAnimationFrame(waitForTarget)
          }
        }
        requestAnimationFrame(waitForTarget)
      }
    },
    [lenisRef],
  )

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070b16] text-white">
      <Preloader />
      <Navbar onJumpTo={jumpTo} />

      <main>
        <HeroSection
          heroTrackRef={heroTrackRef}
          scrollProgressRef={scrollProgressRef}
          heroLogoRefs={heroLogoRefs}
          heroDarkenRef={heroDarkenRef}
          heroContentRef={heroContentRef}
          heroPosterRef={heroPosterRef}
          onJumpTo={jumpTo}
        />

        {belowFoldMounted ? (
          <BelowFoldMainSections
            onJumpTo={jumpTo}
            cartTrackRef={cartTrackRef}
            cartProgressRef={cartProgressRef}
            cartSpotlightRef={cartSpotlightRef}
            cartFloorGlowRef={cartFloorGlowRef}
          />
        ) : (
          <div
            className="min-h-[150vh]"
            aria-hidden="true"
            style={{ contain: 'layout paint style' }}
          />
        )}
      </main>

      {belowFoldMounted && <BelowFoldFooter onJumpTo={jumpTo} />}

      {cartOpen && (
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      )}
    </div>
  )
}
