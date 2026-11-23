import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
import { useUIStore } from '~/store/ui-store'
import { applyCartGlowWrites } from './home-scroll/cartGlowWrites'
import { applyHeroScrollWrites } from './home-scroll/heroScrollWrites'
import {
  clamp01,
  getCachedScrollY,
  getStableViewportHeight,
  measureElementBounds,
  subscribeLayoutChange,
  syncCachedScrollY,
} from './scroll-math'

interface ScrollChoreographyArgs {
  heroTrackRef: React.RefObject<HTMLDivElement | null>
  scrollProgressRef: React.MutableRefObject<number>
  heroLogoRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  heroDarkenRef: React.RefObject<HTMLDivElement | null>
  heroContentRef: React.RefObject<HTMLDivElement | null>
  heroPosterRef: React.RefObject<HTMLDivElement | null>
  cartTrackRef: React.RefObject<HTMLDivElement | null>
  cartProgressRef: React.MutableRefObject<number>
  cartSpotlightRef: React.RefObject<HTMLDivElement | null>
  cartFloorGlowRef: React.RefObject<HTMLDivElement | null>
  overlayOpen: boolean
}

export function useHomeScrollChoreography({
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
}: ScrollChoreographyArgs) {
  const lenisRef = useRef<Lenis | null>(null)
  const overlayOpenRef = useRef(overlayOpen)
  const wasPreloaderOpenRef = useRef(useUIStore.getState().preloaderOpen)
  overlayOpenRef.current = overlayOpen

  useEffect(() => {
    let disposed = false
    let lenis: Lenis | null = null
    let unsubLayout: (() => void) | null = null
    let writeRafId = 0
    let heroTop = 0
    let heroRange = 1
    let cartTop = 0
    let cartRange = 1
    let heroActive = true
    let cartActive = true

    const applyHeroLogos = (scroll: number, vh: number) => {
      applyHeroScrollWrites(
        { heroDarkenRef, heroContentRef, heroPosterRef, heroLogoRefs },
        scroll,
        heroTop,
        vh,
      )
    }

    const applyCartGlow = (scroll: number) => {
      cartProgressRef.current = applyCartGlowWrites(
        { cartSpotlightRef, cartFloorGlowRef },
        scroll,
        cartTop,
        cartRange,
      )
    }

    const updateCartAndHero = (scroll: number) => {
      const vh = getStableViewportHeight()
      const heroLimit = heroTop + heroRange + vh * 0.6
      if (scroll <= heroLimit) {
        heroActive = true
        scrollProgressRef.current = clamp01((scroll - heroTop) / heroRange)
        applyHeroLogos(scroll, vh)
      } else if (heroActive) {
        heroActive = false
        scrollProgressRef.current = 1
        applyHeroLogos(heroLimit, vh)
      }

      const cartMin = cartTop - vh
      const cartMax = cartTop + cartRange + vh
      if (scroll >= cartMin && scroll <= cartMax) {
        cartActive = true
        applyCartGlow(scroll)
      } else if (cartActive) {
        cartActive = false
        applyCartGlow(scroll < cartMin ? cartMin : cartMax)
      }
    }

    let tracksMeasured = false
    const measureTracks = () => {
      tracksMeasured = true
      const vh = getStableViewportHeight()
      if (heroTrackRef.current) {
        const hb = measureElementBounds(heroTrackRef.current)
        heroTop = hb.top
        heroRange = Math.max(1, hb.height - vh)
      }
      if (cartTrackRef.current) {
        const cb = measureElementBounds(cartTrackRef.current)
        cartTop = cb.top
        cartRange = Math.max(1, cb.height - vh)
      }
      heroActive = true
      cartActive = true
      syncCachedScrollY()
      if (!writeRafId) {
        writeRafId = requestAnimationFrame(() => {
          writeRafId = 0
          if (!disposed) {
            updateCartAndHero(getCachedScrollY())
          }
        })
      }
    }

    const ensureMeasured = () => {
      if (!tracksMeasured) measureTracks()
    }

    if ((window.scrollY || 0) > 4) {
      measureTracks()
    }

    unsubLayout = subscribeLayoutChange(() => {
      lenis?.resize()
      if (tracksMeasured || (window.scrollY || 0) > 4) {
        measureTracks()
      }
    })

    const onNativeScroll = () => {
      ensureMeasured()
      if (!lenis) {
        const y = getCachedScrollY()
        updateCartAndHero(y)
      }
    }
    window.addEventListener('scroll', onNativeScroll, { passive: true })

    let lenisLoading = false
    const initLenis = () => {
      if (disposed || lenis || lenisLoading) return
      lenisLoading = true
      import('lenis')
        .then(({ default: LenisCtor }) => {
          if (disposed) return
          lenis = new LenisCtor({
            autoRaf: true,
            lerp: 0.095,
            smoothWheel: true,
            wheelMultiplier: 0.95,
          })
          lenisRef.current = lenis

          if (overlayOpenRef.current) {
            lenis.stop()
          }

          measureTracks()
          lenis.on('scroll', ({ scroll }: { scroll: number }) => {
            syncCachedScrollY(scroll)
            updateCartAndHero(scroll)
          })
        })
        .catch(() => { })
    }

    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches
    const triggerEvents: (keyof WindowEventMap)[] = ['wheel', 'pointerdown', 'keydown']
    const cleanupLenisTriggers = () => {
      for (const evt of triggerEvents) {
        window.removeEventListener(evt, initLenis)
      }
    }
    if (isFinePointer) {
      if ((window.scrollY || 0) > 4) {
        initLenis()
      } else {
        for (const evt of triggerEvents) {
          window.addEventListener(evt, initLenis, { passive: true, once: true })
        }
      }
    }

    return () => {
      disposed = true
      if (writeRafId) cancelAnimationFrame(writeRafId)
      cleanupLenisTriggers()
      window.removeEventListener('scroll', onNativeScroll)
      unsubLayout?.()
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [
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
  ])

  useEffect(() => {
    const lenis = lenisRef.current
    const preloaderOpen = useUIStore.getState().preloaderOpen
    if (overlayOpen) {
      if (preloaderOpen) {
        wasPreloaderOpenRef.current = true
        if (getCachedScrollY() !== 0) window.scrollTo(0, 0)
        lenis?.scrollTo(0, { immediate: true, force: true })
        scrollProgressRef.current = 0
      }
      lenis?.stop()
    } else {
      if (wasPreloaderOpenRef.current) {
        wasPreloaderOpenRef.current = false
        if (getCachedScrollY() !== 0) window.scrollTo(0, 0)
        syncCachedScrollY(0)
        lenis?.scrollTo(0, { immediate: true, force: true })
      }
      lenis?.resize()
      lenis?.start()
    }
  }, [overlayOpen, scrollProgressRef])

  return lenisRef
}
