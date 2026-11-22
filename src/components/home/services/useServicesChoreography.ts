import { useCallback, useEffect } from 'react'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  smootherstep,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import { SERVICES } from './servicesData'

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
    let bounds = measureElementBounds(refs.runwayRef.current)

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
      const isDesktopView = getStableViewportWidth() >= 1024
      if (refs.pageFrameRef.current) {
        refs.pageFrameRef.current.style.transform = ''
        refs.pageFrameRef.current.style.borderRadius = ''
      }

      const titleDock = Math.max(
        smootherstep(0.2, 0.95, entryP) * 0.65,
        smootherstep(0.0, 0.14, p),
      )

      if (refs.headerWrapRef.current) {
        const headerOp = Math.max(
          smootherstep(0.06, 0.55, entryP),
          smootherstep(0.0, 0.08, p),
        )
        const ty = (1 - titleDock) * (isDesktopView ? 16 : 3)
        const sc = (isDesktopView ? 1.12 : 1.04) - titleDock * (isDesktopView ? 0.12 : 0.04)
        refs.headerWrapRef.current.style.opacity = headerOp.toFixed(3)
        refs.headerWrapRef.current.style.transform = `translate3d(0, ${ty.toFixed(2)}vh, 0) scale(${sc.toFixed(3)})`
      }

      if (refs.taglineRef.current) {
        const tagP = Math.max(
          smootherstep(0.28, 0.85, entryP) * 0.85,
          smootherstep(0.0, 0.12, p),
        )
        refs.taglineRef.current.style.opacity = tagP.toFixed(3)
        if (!isDesktopView) {
          const dockTy = (1 - titleDock) * 3
          refs.taglineRef.current.style.transform = `translate3d(0, calc(${dockTy.toFixed(2)}vh + ${((1 - tagP) * 12).toFixed(1)}px), 0)`
        } else {
          refs.taglineRef.current.style.transform = `translate3d(0, ${((1 - tagP) * 20).toFixed(1)}px, 0)`
        }
      }

      for (let i = 0; i < SERVICES.length; i++) {
        const rowStart = 0.04 + i * 0.085
        const lineP = smootherstep(rowStart - 0.025, rowStart + 0.09, p)
        const rowP =
          i === 0
            ? Math.max(smootherstep(0.42, 0.96, entryP) * 0.9, smootherstep(0.0, 0.1, p))
            : smootherstep(rowStart, rowStart + 0.11, p)

        const div = refs.dividerRefs.current[i]
        if (div) {
          const divScale = i === 0 ? Math.max(smootherstep(0.36, 0.92, entryP), lineP) : lineP
          div.style.transform = `scaleX(${divScale.toFixed(3)})`
        }

        const row = refs.rowRefs.current[i]
        if (row) {
          const ty = (1 - rowP) * (isDesktopView ? 40 : 24)
          const tz = -(1 - rowP) * (isDesktopView ? 65 : 40)
          const rx = (1 - rowP) * (isDesktopView ? 14 : 10)
          row.style.opacity = rowP.toFixed(3)
          row.style.transform = `translate3d(0, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg)`
          row.style.pointerEvents = rowP > 0.45 ? 'auto' : 'none'
        }

        const mask = refs.titleMaskRefs.current[i]
        if (mask) {
          mask.style.transform = isDesktopView
            ? `translate3d(0, ${((1 - rowP) * 105).toFixed(2)}%, 0)`
            : ''
        }

        const caps = refs.capsRefs.current[i]
        if (caps) {
          caps.style.opacity = rowP.toFixed(3)
          caps.style.transform = `translate3d(${((1 - rowP) * (isDesktopView ? 24 : 14)).toFixed(2)}px, 0, 0)`
        }

        const arrow = refs.arrowRefs.current[i]
        if (arrow) {
          const aScale = 0.55 + rowP * 0.45
          const aRot = -(1 - rowP) * 45
          arrow.style.opacity = rowP.toFixed(3)
          arrow.style.transform = `scale(${aScale.toFixed(4)}) rotate(${aRot.toFixed(2)}deg)`
        }
      }

      if (refs.bottomDividerRef.current) {
        const bLineP = smootherstep(0.36, 0.46, p)
        refs.bottomDividerRef.current.style.transform = `scaleX(${bLineP.toFixed(4)})`
      }

      if (refs.footerRef.current) {
        const fP = smootherstep(0.39, 0.5, p)
        refs.footerRef.current.style.opacity = fP.toFixed(3)
        refs.footerRef.current.style.transform = `translate3d(0, ${((1 - fP) * (isDesktopView ? 24 : 16)).toFixed(2)}px, 0)`
        refs.footerRef.current.style.pointerEvents = fP > 0.45 ? 'auto' : 'none'
      }

      const nextSpot =
        p >= 0.48
          ? Math.min(SERVICES.length - 1, Math.floor(clamp01((p - 0.48) / 0.46) * SERVICES.length))
          : 0

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

    wake()
    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      io?.disconnect()
      unsubLayout()
      window.removeEventListener('scroll', wake)
    }
  }, [isDesktop, refs, resetInlineChoreography, onSpotChange])
}
