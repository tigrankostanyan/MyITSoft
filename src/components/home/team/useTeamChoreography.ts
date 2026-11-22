import { useCallback, useEffect, useRef } from 'react'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  signedOffset,
  smootherstep,
  subscribeLayoutChange,
} from '~/lib/scroll-math'

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

const ENTER_PROFILES = [
  { delay: 0.04, drop: 0.92, driftX: -52, spin: -13, tiltX: -16 },
  { delay: 0.11, drop: 0.78, driftX: 46, spin: 11, tiltX: -12 },
  { delay: 0.0, drop: 1.05, driftX: -18, spin: 15, tiltX: -18 },
  { delay: 0.08, drop: 0.86, driftX: 60, spin: -14, tiltX: -14 },
  { delay: 0.02, drop: 0.98, driftX: -66, spin: 12, tiltX: -17 },
  { delay: 0.13, drop: 0.82, driftX: 38, spin: -10, tiltX: -13 },
] as const

const EXIT_PROFILES = [
  { lift: 0.72, driftX: -48, spin: -11, tiltX: 12 },
  { lift: 0.28, driftX: 44, spin: 9, tiltX: 8 },
  { lift: 0.92, driftX: -22, spin: 14, tiltX: 16 },
  { lift: 0.42, driftX: 56, spin: -12, tiltX: 10 },
  { lift: 0.82, driftX: -62, spin: 12, tiltX: 14 },
  { lift: 0.54, driftX: 34, spin: -9, tiltX: 11 },
] as const

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

    const applyFrame = (p: number, leaveP: number, slideVal: number) => {
      const vw = getStableViewportWidth()
      const vh = getStableViewportHeight()
      const isMobile = vw < 640
      const isTablet = vw >= 640 && vw < 1024
      const isCompact = vw < 1024

      if (isCompact) {
        if (refs.phoneStageRef.current) {
          refs.phoneStageRef.current.style.opacity = '1'
          refs.phoneStageRef.current.style.transform = 'translate3d(0, 0, 0)'
          refs.phoneStageRef.current.style.pointerEvents = 'auto'
          refs.phoneStageRef.current.style.visibility = 'visible'
        }
      } else {
        const handsSep = smootherstep(0.05, 0.36, p)
        const handsFade = 1 - smootherstep(0.24, 0.4, p)
        const handsTilt = smootherstep(0.04, 0.34, p)

        if (refs.introSubtitleRef.current) {
          const subFade = 1 - smootherstep(0.04, 0.2, p)
          const subTy = (1 - subFade) * 24
          refs.introSubtitleRef.current.style.opacity = subFade.toFixed(3)
          refs.introSubtitleRef.current.style.transform = `translate3d(0, ${subTy.toFixed(1)}px, 0)`
          refs.introSubtitleRef.current.style.visibility = subFade < 0.01 ? 'hidden' : 'visible'
        }

        if (refs.handsStageRef.current) {
          const rx = handsTilt * 34
          const ty = -handsTilt * 30
          refs.handsStageRef.current.style.transform = `perspective(1300px) translate3d(0, ${ty.toFixed(1)}px, 0) rotateX(${rx.toFixed(2)}deg)`
        }

        const armW = Math.round(Math.hypot(vw * 0.52, vh * 0.58) * 1.14)
        if (armW !== lastArmW) {
          lastArmW = armW
          const wPx = `${armW}px`
          if (refs.humanWrapRef.current) refs.humanWrapRef.current.style.width = wPx
          if (refs.robotWrapRef.current) refs.robotWrapRef.current.style.width = wPx
        }

        const diagDeg = Math.min(34, Math.max(18, (Math.atan2(vh * 0.46, vw * 0.5) * 180) / Math.PI))
        const pullDist = 66

        if (refs.humanHandRef.current) {
          const rot = -diagDeg - handsSep * 4
          const pull = -handsSep * pullDist
          refs.humanHandRef.current.style.opacity = handsFade.toFixed(3)
          refs.humanHandRef.current.style.transform = `rotate(${rot.toFixed(2)}deg) translate3d(${pull.toFixed(2)}vw, 0, 0)`
          refs.humanHandRef.current.style.visibility = handsFade < 0.01 ? 'hidden' : 'visible'
        }

        if (refs.robotHandRef.current) {
          const rot = -diagDeg - handsSep * 4
          const pull = handsSep * pullDist
          refs.robotHandRef.current.style.opacity = handsFade.toFixed(3)
          refs.robotHandRef.current.style.transform = `rotate(${rot.toFixed(2)}deg) translate3d(${pull.toFixed(2)}vw, 0, 0)`
          refs.robotHandRef.current.style.visibility = handsFade < 0.01 ? 'hidden' : 'visible'
        }

        if (refs.handSparkRef.current) {
          const sparkOut = smootherstep(0.02, 0.2, p)
          const sparkOp = 1 - sparkOut
          const sparkSc = 1 + sparkOut * 0.9
          refs.handSparkRef.current.style.opacity = sparkOp.toFixed(3)
          refs.handSparkRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${sparkSc.toFixed(3)})`
        }

        const textMorph = smootherstep(0.08, 0.38, p)
        if (refs.titleWrapRef.current) {
          const sc = 1 + textMorph * 0.48
          const ty = 28 - textMorph * 42
          const midTilt = Math.sin(textMorph * Math.PI) * 26
          refs.titleWrapRef.current.style.transform = `perspective(1200px) translate3d(0, ${ty.toFixed(1)}px, 0) rotateX(${midTilt.toFixed(2)}deg) scale(${sc.toFixed(3)})`
        }
        if (refs.titleFillRef.current) {
          const fillOp = 1 - smootherstep(0.1, 0.3, p)
          refs.titleFillRef.current.style.opacity = fillOp.toFixed(3)
        }
        if (refs.titleOutlineRef.current) {
          const outlineOp = smootherstep(0.14, 0.36, p)
          refs.titleOutlineRef.current.style.opacity = outlineOp.toFixed(3)
        }

        const stageVis = smootherstep(0.2, 0.3, p)
        const phoneReveal = smootherstep(0.31, 0.49, p)

        if (refs.phoneStageRef.current) {
          refs.phoneStageRef.current.style.opacity = stageVis.toFixed(3)
          refs.phoneStageRef.current.style.transform = 'translate3d(0, 0, 0)'
          refs.phoneStageRef.current.style.pointerEvents = p > 0.38 ? 'auto' : 'none'
          refs.phoneStageRef.current.style.visibility = stageVis < 0.01 ? 'hidden' : 'visible'
        }

        if (refs.phoneBezelRef.current) {
          const bezelTy = (1 - phoneReveal) * 40
          const bezelSc = 0.95 + phoneReveal * 0.05
          refs.phoneBezelRef.current.style.opacity = phoneReveal.toFixed(3)
          refs.phoneBezelRef.current.style.transform = `translate3d(-50%, calc(-50% + ${bezelTy.toFixed(1)}px), 0) scale(${bezelSc.toFixed(3)})`
        }
      }

      const radius = isMobile
        ? 480
        : isTablet
          ? 760
          : Math.max(960, vw * 0.74)
      const stepDeg = isMobile ? 30 : isTablet ? 25 : 22
      const dragPerCard = isMobile ? 220 : isTablet ? 280 : 340
      const dragFrac = refs.dragOffsetRef.current / dragPerCard

      for (let i = 0; i < total; i++) {
        const el = refs.cardSlotRefs.current[i]
        if (!el) continue

        const offset = signedOffset(i, slideVal - dragFrac, total)
        const absOff = Math.abs(offset)

        const angleDeg = offset * stepDeg
        const angleRad = (angleDeg * Math.PI) / 180

        const ep = ENTER_PROFILES[i % ENTER_PROFILES.length]
        const cardEnter = isCompact ? 1 : smootherstep(0.22 + ep.delay, 0.46 + ep.delay * 0.65, p)
        const unEntered = 1 - cardEnter
        const enterY = unEntered * vh * 0.88 * ep.drop
        const enterX = unEntered * ep.driftX
        const enterRot = unEntered * ep.spin
        const enterRx = unEntered * ep.tiltX
        const enterFade = isCompact ? 1 : smootherstep(0.0, 0.35, cardEnter)

        const prof = EXIT_PROFILES[i % EXIT_PROFILES.length]
        const cardExit = isCompact ? 0 : smootherstep(0, 1, leaveP)
        const exitY = -cardExit * vh * 0.65 * prof.lift
        const exitX = cardExit * prof.driftX
        const exitRot = cardExit * prof.spin
        const exitRx = cardExit * prof.tiltX

        const tx = Math.sin(angleRad) * radius + enterX + exitX
        const ty = (1 - Math.cos(angleRad)) * radius + enterY + exitY
        const focus = Math.max(0, 1 - absOff)
        const sc =
          Math.max(0.8, 0.94 + focus * 0.14 - Math.max(0, absOff - 1) * 0.06) *
          (0.88 + cardEnter * 0.12) *
          (1 - cardExit * 0.08)
        const rotY = -offset * 8
        const tz = focus * 65 - absOff * 18 - unEntered * 70 - cardExit * 45
        const z = Math.round(40 - absOff * 10)
        const baseFade =
          absOff <= 2.2
            ? 1 - Math.max(0, absOff - 1.1) * 0.22
            : clamp01(0.76 * (1 - (absOff - 2.2) / 0.85))
        const finalFade = baseFade * enterFade

        el.style.transform = `translate3d(calc(-50% + ${tx.toFixed(2)}px), calc(-50% + ${ty.toFixed(2)}px), ${tz.toFixed(2)}px) rotate(${(angleDeg + enterRot + exitRot).toFixed(2)}deg) rotateX(${(enterRx + exitRx).toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${sc.toFixed(4)})`
        el.style.opacity = finalFade.toFixed(3)
        el.style.zIndex = String(z)
        el.style.visibility = finalFade < 0.02 ? 'hidden' : 'visible'
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
