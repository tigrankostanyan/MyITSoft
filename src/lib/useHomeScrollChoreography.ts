import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useUIStore } from '~/store/ui-store'
import { HERO_FLOATING_LOGO_SPEEDS } from '~/components/home/HeroFloatingTechLogos'
import {
  clamp01,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  smoothstep,
  subscribeLayoutChange,
  syncCachedScrollY,
} from './scroll-math'

interface ScrollChoreographyArgs {
  heroTrackRef: React.RefObject<HTMLDivElement | null>
  scrollProgressRef: React.MutableRefObject<number>
  heroLogoRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
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
  cartTrackRef,
  cartProgressRef,
  cartSpotlightRef,
  cartFloorGlowRef,
  overlayOpen,
}: ScrollChoreographyArgs) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchInertiaExponent: 1.7,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
    })
    lenisRef.current = lenis

    let heroTop = 0
    let heroRange = 1
    let cartTop = 0
    let cartRange = 1
    let heroActive = true
    let cartActive = true

    const applyHeroLogos = (scroll: number, vh: number) => {
      const heroScroll = Math.max(0, scroll - heroTop)
      const fade = 1 - smoothstep(vh * 0.04, vh * 0.4, heroScroll)
      for (let i = 0; i < HERO_FLOATING_LOGO_SPEEDS.length; i++) {
        const el = heroLogoRefs.current[i]
        if (!el) continue
        const liftY = -heroScroll * HERO_FLOATING_LOGO_SPEEDS[i]
        el.style.transform = `translate3d(0, ${liftY.toFixed(2)}px, 0)`
        el.style.opacity = fade.toFixed(3)
      }
    }

    const applyCartGlow = (scroll: number) => {
      const cp = clamp01((scroll - cartTop) / cartRange)
      cartProgressRef.current = cp

      const isStacked = getStableViewportWidth() < 1024
      const rightX = isStacked ? 0 : 22
      const midX = isStacked ? 0 : -8
      const baseSpotY = isStacked ? 12 : 2
      let spotX = rightX
      let spotY = baseSpotY
      let spotScale = 1

      if (cp < 0.12) {
        spotX = rightX
        spotY = baseSpotY
      } else if (cp < 0.34) {
        const s = smoothstep(0.12, 0.34, cp)
        spotX = rightX + (midX - rightX) * s
        spotY = baseSpotY * (1 - s)
        spotScale = 1 + 0.1 * s
      } else if (cp < 0.56) {
        const s = smoothstep(0.34, 0.56, cp)
        spotX = midX * (1 - s)
        spotY = 2 * s
        spotScale = 1.1 + 0.25 * s
      } else {
        spotX = 0
        spotY = 2
        spotScale = 1.35
      }

      if (cartSpotlightRef.current) {
        cartSpotlightRef.current.style.transform = `translate3d(calc(-50% + ${spotX.toFixed(2)}vw), calc(-50% + ${spotY.toFixed(2)}vh), 0) scale(${spotScale.toFixed(3)})`
      }
      if (cartFloorGlowRef.current) {
        cartFloorGlowRef.current.style.transform = `translate3d(calc(-50% + ${spotX.toFixed(2)}vw), -50%, 0) scale(${spotScale.toFixed(3)})`
      }
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

    const measureTracks = () => {
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
    const unsubLayout = subscribeLayoutChange(() => {
      lenis.resize()
      measureTracks()
    })

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      syncCachedScrollY(scroll)
      updateCartAndHero(scroll)
    })

    return () => {
      unsubLayout()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [
    heroTrackRef,
    scrollProgressRef,
    heroLogoRefs,
    cartTrackRef,
    cartProgressRef,
    cartSpotlightRef,
    cartFloorGlowRef,
  ])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (overlayOpen) {
      if (useUIStore.getState().preloaderOpen) {
        window.scrollTo(0, 0)
        lenis.scrollTo(0, { immediate: true, force: true })
        scrollProgressRef.current = 0
      }
      lenis.stop()
    } else {
      window.scrollTo(0, 0)
      syncCachedScrollY()
      lenis.scrollTo(0, { immediate: true, force: true })
      lenis.resize()
      lenis.start()
    }
  }, [overlayOpen, scrollProgressRef])

  return lenisRef
}
