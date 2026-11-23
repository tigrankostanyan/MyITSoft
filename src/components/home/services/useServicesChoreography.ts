import { useCallback, useEffect } from 'react'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  measureElementBounds,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import { SERVICES } from './servicesData'
import {
  applyServicesChoreography,
  type ServicesChoreographyTargets,
} from './servicesChoreographyWrites'

export interface ServicesChoreographyRefs {
  runwayRef: React.RefObject<HTMLElement | null>
  pageFrameRef: React.RefObject<HTMLDivElement | null>
  frameBorderRef: React.RefObject<HTMLDivElement | null>
  headerWrapRef: React.RefObject<HTMLDivElement | null>
  taglineRef: React.RefObject<HTMLDivElement | null>
  bottomDividerRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  progressBarRef: React.RefObject<HTMLDivElement | null>
  dividerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  titleMaskRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  capsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  arrowRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

export function useServicesChoreography(
  isDesktop: boolean,
  refs: ServicesChoreographyRefs,
  onSpotChange: (spotIdx: number | null) => void,
) {
  const resetInlineChoreography = useCallback(() => {
    if (refs.pageFrameRef.current) {
      refs.pageFrameRef.current.style.transform = ''
      refs.pageFrameRef.current.style.borderRadius = ''
    }
    if (refs.frameBorderRef.current) {
      refs.frameBorderRef.current.style.opacity = ''
      refs.frameBorderRef.current.style.visibility = ''
    }
    if (refs.headerWrapRef.current) {
      refs.headerWrapRef.current.style.opacity = ''
      refs.headerWrapRef.current.style.transform = ''
    }
    if (refs.taglineRef.current) {
      refs.taglineRef.current.style.opacity = ''
      refs.taglineRef.current.style.transform = ''
    }
    if (refs.bottomDividerRef.current) refs.bottomDividerRef.current.style.transform = ''
    if (refs.footerRef.current) {
      refs.footerRef.current.style.opacity = ''
      refs.footerRef.current.style.transform = ''
      refs.footerRef.current.style.pointerEvents = ''
    }

    for (let i = 0; i < SERVICES.length; i++) {
      const div = refs.dividerRefs.current[i]
      if (div) div.style.transform = ''
      const row = refs.rowRefs.current[i]
      if (row) {
        row.style.opacity = ''
        row.style.transform = ''
        row.style.pointerEvents = ''
      }
      const mask = refs.titleMaskRefs.current[i]
      if (mask) mask.style.transform = ''
      const caps = refs.capsRefs.current[i]
      if (caps) {
        caps.style.opacity = ''
        caps.style.transform = ''
      }
      const arrow = refs.arrowRefs.current[i]
      if (arrow) {
        arrow.style.opacity = ''
        arrow.style.transform = ''
      }
    }
  }, [refs])

  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    let initialized = false
    let targetP = 0
    let smoothP = 0
    let targetEntryP = 0
    let smoothEntryP = 0
    let lastSpotIdx: number | null = null
    let inRange = false
    let bounds = { top: 0, height: 1 }

    const getEntryProgress = (scrollY: number, vh: number): number => {
      const rectTop = bounds.top - scrollY
      if (rectTop <= 0) return 1
      const startTop = vh * 0.92
      if (rectTop >= startTop) return 0
      return clamp01((startTop - rectTop) / startTop)
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const applyChoreography = (p: number, entryP: number) => {
      if (refs.pageFrameRef.current) {
        refs.pageFrameRef.current.style.transform = ''
        refs.pageFrameRef.current.style.borderRadius = ''
      }

      const nextSpot = applyServicesChoreography(
        refs as unknown as ServicesChoreographyTargets,
        p,
        entryP,
      )

      if (nextSpot !== lastSpotIdx) {
        lastSpotIdx = nextSpot
        onSpotChange(nextSpot)
      }
    }

    if (prefersReducedMotion) {
      applyChoreography(1, 1)
      return
    }

    const tick = (now: number) => {
      if (initialized && !inRange) {
        rafId = 0
        return
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now
      const scrollY = getCachedScrollY()
      const vh = getStableViewportHeight()

      targetP = computeRunwayProgress(bounds, scrollY, vh)
      targetEntryP = getEntryProgress(scrollY, vh)

      if (!initialized) {
        bounds = measureElementBounds(refs.runwayRef.current)
        targetP = computeRunwayProgress(bounds, scrollY, vh)
        targetEntryP = getEntryProgress(scrollY, vh)
        smoothP = targetP
        smoothEntryP = targetEntryP
        initialized = true
      } else {
        const factor = 1 - Math.exp(-16.0 * dt)
        smoothP += (targetP - smoothP) * factor

        const entryFactor = 1 - Math.exp(-16.0 * dt)
        smoothEntryP += (targetEntryP - smoothEntryP) * entryFactor
      }

      applyChoreography(smoothP, smoothEntryP)

      if (
        inRange &&
        (Math.abs(targetP - smoothP) > 0.00025 ||
          Math.abs(targetEntryP - smoothEntryP) > 0.00025)
      ) {
        rafId = requestAnimationFrame(tick)
      } else {
        smoothP = targetP
        smoothEntryP = targetEntryP
        applyChoreography(smoothP, smoothEntryP)
        rafId = 0
      }
    }

    const wake = () => {
      if (initialized && !inRange) return
      if (!rafId) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined' && refs.runwayRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          const nextInRange = entries[0]?.isIntersecting ?? true
          const prevInRange = inRange
          inRange = nextInRange
          if (inRange) {
            bounds = measureElementBounds(refs.runwayRef.current)
            wake()
          } else if (prevInRange && initialized) {
            if (rafId) {
              cancelAnimationFrame(rafId)
              rafId = 0
            }
            bounds = measureElementBounds(refs.runwayRef.current)
            const clampedP = getCachedScrollY() < bounds.top ? 0 : 1
            const clampedEntry = clampedP === 0 ? 0 : 1
            smoothP = clampedP
            targetP = clampedP
            smoothEntryP = clampedEntry
            targetEntryP = clampedEntry
            applyChoreography(clampedP, clampedEntry)
          }
        },
        { rootMargin: '420px 0px' },
      )
      io.observe(refs.runwayRef.current)
    } else {
      inRange = true
    }

    const unsubLayout = subscribeLayoutChange(() => {
      bounds = measureElementBounds(refs.runwayRef.current)
      if (!initialized || inRange) wake()
    })

    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      io?.disconnect()
      unsubLayout()
      window.removeEventListener('scroll', wake)
    }
  }, [isDesktop, refs, resetInlineChoreography, onSpotChange])
}
