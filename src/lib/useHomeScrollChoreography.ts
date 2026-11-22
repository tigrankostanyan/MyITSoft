import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
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
      const heroScroll = Math.max(0, scroll - heroTop)
      const darken = smoothstep(0, vh * 0.65, heroScroll) * 0.88
      if (heroDarkenRef.current) {
        heroDarkenRef.current.style.opacity = darken.toFixed(3)
      }

      const contentExit = smoothstep(vh * 0.04, vh * 0.45, heroScroll)
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = (1 - contentExit).toFixed(3)
        heroContentRef.current.style.transform = `translate3d(0, ${(-contentExit * 36).toFixed(2)}px, 0)`
      }

      if (heroPosterRef.current) {
        const posterRise = smoothstep(0, vh * 0.35, heroScroll)
        heroPosterRef.current.style.transform = `translate3d(0, ${(-posterRise * 48).toFixed(2)}px, 0) scale(${(1 + posterRise * 0.06).toFixed(3)})`
      }

      const fade = 1 - smoothstep(vh * 0.06, vh * 0.48, heroScroll)
      const liftT = smoothstep(0, vh * 0.55, heroScroll)
      for (let i = 0; i < HERO_FLOATING_LOGO_SPEEDS.length; i++) {
        const el = heroLogoRefs.current[i]
        if (!el) continue
        const speed = HERO_FLOATING_LOGO_SPEEDS[i]
        const liftY = -heroScroll * speed * 1.25
        const scale = 1 + liftT * 0.14
        el.style.transform = `translate3d(0, ${liftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
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
