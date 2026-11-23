import { useCallback, useEffect, useRef } from 'react'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import {
  resolveTeamStageProfile,
  writeTeamCard,
  type TeamCardStageProfile,
} from './teamCardWrites'
import {
  writeTeamIntroStage,
  writeTeamMobileStage,
  type TeamIntroStageTargets,
} from './teamIntroStageWrites'

export interface TeamChoreographyRefs {
  runwayRef: React.RefObject<HTMLDivElement | null>
  introSubtitleRef: React.RefObject<HTMLDivElement | null>
  handsStageRef: React.RefObject<HTMLDivElement | null>
  humanWrapRef: React.RefObject<HTMLDivElement | null>
  robotWrapRef: React.RefObject<HTMLDivElement | null>
  humanHandRef: React.RefObject<HTMLImageElement | null>
  robotHandRef: React.RefObject<HTMLImageElement | null>
  handSparkRef: React.RefObject<HTMLDivElement | null>
  titleWrapRef: React.RefObject<HTMLDivElement | null>
  titleFillRef: React.RefObject<HTMLDivElement | null>
  titleOutlineRef: React.RefObject<HTMLDivElement | null>
  phoneStageRef: React.RefObject<HTMLDivElement | null>
  phoneBezelRef: React.RefObject<HTMLDivElement | null>
  cardSlotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  targetSlideRef: React.MutableRefObject<number>
  smoothSlideRef: React.MutableRefObject<number>
  lastScrollStepRef: React.MutableRefObject<number>
  draggingRef: React.MutableRefObject<boolean>
  dragOffsetRef: React.MutableRefObject<number>
  pausedRef: React.MutableRefObject<boolean>
}

export function useTeamChoreography(
  refs: TeamChoreographyRefs,
  total: number,
  onActiveSlideChange: (normalizedIdx: number) => void,
) {
  const wakeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    let initialized = false
    let targetP = 0
    let smoothP = 0
    let targetLeaveP = 0
    let smoothLeaveP = 0
    let lastArmW = 0
    let inRange = false
    let bounds = { top: 0, height: 1 }

    const getLeaveProgress = (scrollY: number, vh: number): number => {
      const rectBottom = bounds.top + bounds.height - scrollY
      if (rectBottom >= vh) return 0
      return clamp01((vh - rectBottom) / vh)
    }

    const armCache = { lastArmW }
    let stageProfile: TeamCardStageProfile = resolveTeamStageProfile()

    const applyFrame = (p: number, leaveP: number, slideVal: number) => {
      const vw = getStableViewportWidth()
      const vh = getStableViewportHeight()
      const isCompact = vw < 1024

      if (isCompact) {
        writeTeamMobileStage(refs.phoneStageRef)
      } else {
        writeTeamIntroStage(refs as unknown as TeamIntroStageTargets, p, armCache)
      }
      lastArmW = armCache.lastArmW

      stageProfile = resolveTeamStageProfile()

      for (let i = 0; i < total; i++) {
        const el = refs.cardSlotRefs.current[i]
        if (!el) continue
        writeTeamCard(el, i, {
          profile: stageProfile,
          p,
          leaveP,
          slideVal,
          dragOffset: refs.dragOffsetRef.current,
          total,
          isCompact,
          vh,
        })
      }
    }

    let lastEmittedActive = 0

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
      targetLeaveP = getLeaveProgress(scrollY, vh)
      const isMobileViewport = getStableViewportWidth() < 1024

      if (!initialized) {
        bounds = measureElementBounds(refs.runwayRef.current)
        targetP = computeRunwayProgress(bounds, scrollY, vh)
        targetLeaveP = getLeaveProgress(scrollY, vh)
        smoothP = targetP
        smoothLeaveP = targetLeaveP
        refs.smoothSlideRef.current = refs.targetSlideRef.current
        initialized = true
      } else {
        if (isMobileViewport) {
          smoothP = targetP
          smoothLeaveP = targetLeaveP
        } else {
          const alphaP = 1 - Math.exp(-dt * 6.8)
          smoothP += (targetP - smoothP) * alphaP
          smoothLeaveP += (targetLeaveP - smoothLeaveP) * (1 - Math.exp(-dt * 9))
        }

        const autoGlideActive =
          inRange &&
          (isMobileViewport || (smoothP >= 0.42 && smoothLeaveP < 0.95)) &&
          !refs.draggingRef.current &&
          !refs.pausedRef.current
        if (autoGlideActive) {
          refs.targetSlideRef.current += dt * 0.16
        }

        const alphaSlide = 1 - Math.exp(-dt * 7.5)
        refs.smoothSlideRef.current +=
          (refs.targetSlideRef.current - refs.smoothSlideRef.current) * alphaSlide

        const normalized =
          (((Math.round(refs.smoothSlideRef.current) % total) + total) % total)
        if (normalized !== lastEmittedActive) {
          lastEmittedActive = normalized
          onActiveSlideChange(normalized)
        }
      }

      applyFrame(smoothP, smoothLeaveP, refs.smoothSlideRef.current)

      const autoGlideActive =
        inRange &&
        (isMobileViewport || (smoothP >= 0.42 && smoothLeaveP < 0.95)) &&
        !refs.draggingRef.current &&
        !refs.pausedRef.current
      const settled =
        !autoGlideActive &&
        !refs.draggingRef.current &&
        Math.abs(targetP - smoothP) < 0.00025 &&
        Math.abs(targetLeaveP - smoothLeaveP) < 0.00025 &&
        Math.abs(refs.targetSlideRef.current - refs.smoothSlideRef.current) < 0.0005

      if (!settled && inRange) {
        rafId = requestAnimationFrame(tick)
      } else {
        smoothP = targetP
        smoothLeaveP = targetLeaveP
        refs.smoothSlideRef.current = refs.targetSlideRef.current
        applyFrame(smoothP, smoothLeaveP, refs.smoothSlideRef.current)
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
            wake()
          } else if (prevInRange && initialized) {
            if (rafId) {
              cancelAnimationFrame(rafId)
              rafId = 0
            }
            const clampedP = getCachedScrollY() < bounds.top ? 0 : 1
            const clampedLeave = clampedP === 0 ? 0 : 1
            smoothP = clampedP
            targetP = clampedP
            smoothLeaveP = clampedLeave
            targetLeaveP = clampedLeave
            applyFrame(clampedP, clampedLeave, refs.smoothSlideRef.current)
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

    wakeRef.current = wake
    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      wakeRef.current = null
      if (rafId) cancelAnimationFrame(rafId)
      io?.disconnect()
      unsubLayout()
      window.removeEventListener('scroll', wake)
    }
  }, [refs, total, onActiveSlideChange])

  return useCallback(() => {
    wakeRef.current?.()
  }, [])
}
