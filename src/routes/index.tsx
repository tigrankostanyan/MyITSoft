import { lazy, startTransition, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
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
        href: '/myitsoft-logo.webp',
        fetchPriority: 'high',
      },
      {
        rel: 'preload',
        as: 'fetch',
        href: '/models/macbook.glb',
        crossOrigin: 'anonymous',
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

  const cartTrackRef = useRef<HTMLDivElement>(null)
  const cartProgressRef = useRef(0)
  const cartSpotlightRef = useRef<HTMLDivElement>(null)
  const cartFloorGlowRef = useRef<HTMLDivElement>(null)

  const [belowFoldMounted, setBelowFoldMounted] = useState(false)

  const handleHeroReady = useCallback(() => {
    startTransition(() => setBelowFoldMounted(true))
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        useUIStore.getState().setHeroReady(true)
      })
    })
  }, [])

  useEffect(() => {
    if (belowFoldMounted) return
    const timer = window.setTimeout(() => {
      startTransition(() => setBelowFoldMounted(true))
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [belowFoldMounted])

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
          onJumpTo={jumpTo}
          onHeroReady={handleHeroReady}
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
