import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
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
  cartTrackRef,
  cartProgressRef,
  cartSpotlightRef,
  cartFloorGlowRef,
  overlayOpen,
}: ScrollChoreographyArgs) {
  const lenisRef = useRef<Lenis | null>(null)
  const overlayOpenRef = useRef(overlayOpen)
  overlayOpenRef.current = overlayOpen

  useEffect(() => {
    let disposed = false
    let heroTop = 0
    let heroRange = 1
    let cartTop = 0
    let cartRange = 1
    let heroActive = true
    let cartActive = true

    const applyHeroLogos = (scroll: number, vh: number) => {
      applyHeroScrollWrites(
        { heroDarkenRef, heroContentRef, heroLogoRefs },
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
        const p = clamp01((scroll - heroTop) / heroRange)
        scrollProgressRef.current = p
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

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })
    lenisRef.current = lenis

    if (overlayOpenRef.current) {
      lenis.stop()
    }

    const measureTracks = () => {
      if (disposed) return
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
      updateCartAndHero(getCachedScrollY())
    }

    measureTracks()

    let trackResizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      trackResizeObserver = new ResizeObserver(() => {
        if (disposed) return
        lenis.resize()
        measureTracks()
      })
      if (heroTrackRef.current) trackResizeObserver.observe(heroTrackRef.current)
      if (cartTrackRef.current) trackResizeObserver.observe(cartTrackRef.current)
    }

    const unsubLayout = subscribeLayoutChange(() => {
      lenis.resize()
      measureTracks()
      if (cartTrackRef.current && trackResizeObserver) {
        trackResizeObserver.observe(cartTrackRef.current)
      }
    })

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      syncCachedScrollY(scroll)
      updateCartAndHero(scroll)
    })

    const onNativeScroll = () => {
      if (lenis.isStopped) return
      const y = window.scrollY || 0
      if (Math.abs(y - getCachedScrollY()) > 0.5) {
        syncCachedScrollY(y)
        updateCartAndHero(y)
      }
    }
    window.addEventListener('scroll', onNativeScroll, { passive: true })

    return () => {
      disposed = true
      window.removeEventListener('scroll', onNativeScroll)
      trackResizeObserver?.disconnect()
      unsubLayout()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [
    heroTrackRef,
    scrollProgressRef,
    heroLogoRefs,
    heroDarkenRef,
    heroContentRef,
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
        if (window.scrollY !== 0) window.scrollTo(0, 0)
        syncCachedScrollY(0)
        lenis?.scrollTo(0, { immediate: true, force: true })
        scrollProgressRef.current = 0
      }
      lenis?.stop()
    } else {
      lenis?.resize()
      lenis?.start()
    }
  }, [overlayOpen, scrollProgressRef])

  return lenisRef
}
