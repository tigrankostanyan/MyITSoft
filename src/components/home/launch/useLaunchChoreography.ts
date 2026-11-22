import { useEffect } from 'react'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  smoothstep,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import { useUIStore } from '~/store/ui-store'
import { LAUNCH_STEPS } from './launchData'

const STEP_THRESHOLDS = [0.0, 0.16, 0.32] as const

interface LaunchChoreographyRefs {
  runwayRef: React.RefObject<HTMLDivElement | null>
  rocketWrapRef: React.RefObject<HTMLDivElement | null>
  underGlowRef: React.RefObject<HTMLDivElement | null>
  windowGlowRef: React.RefObject<HTMLDivElement | null>
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  badgeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  statusRef: React.RefObject<HTMLSpanElement | null>
  progressRef: React.MutableRefObject<number>
  rocketOffsetRef: React.MutableRefObject<{ x: number; y: number }>
  wakeVfxRef: React.MutableRefObject<(() => void) | null>
}

/** Drives scroll-synchronized rocket ignition, liftoff, rumble, and step highlights. */
export function useLaunchChoreography({
  runwayRef,
  rocketWrapRef,
  underGlowRef,
  windowGlowRef,
  stepRefs,
  badgeRefs,
  statusRef,
  progressRef,
  rocketOffsetRef,
  wakeVfxRef,
}: LaunchChoreographyRefs) {
  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    let initialized = false
    let targetP = 0
    let smoothP = 0
    let lastStatusText = ''
    let prevFrameP = 0
    let inRange = false
    let bounds = { top: 0, height: 1 }

    const applyFrame = (p: number, nowSec: number) => {
      progressRef.current = p

      const ignition = smoothstep(0.1, 0.36, p)
      const liftU = clamp01((p - 0.36) / 0.52)
      const liftEase = Math.pow(liftU, 2.55)
      const vh = getStableViewportHeight()
      const liftPx = -liftEase * (vh * 1.25)

      const isMobile = getStableViewportWidth() < 1024
      const shakeAmp = isMobile ? 0 : ignition * (1 - smoothstep(0.55, 0.82, p)) * 3.2
      const shakeX = isMobile
        ? 0
        : Math.sin(nowSec * 64) * shakeAmp + Math.cos(nowSec * 97) * shakeAmp * 0.45
      const shakeY = isMobile ? 0 : Math.cos(nowSec * 78) * shakeAmp * 0.6
      const tiltDeg = isMobile ? 0 : Math.sin(nowSec * 38) * shakeAmp * 0.28

      rocketOffsetRef.current.x = shakeX
      rocketOffsetRef.current.y = liftPx + shakeY
      if (p > 0.04 || (prevFrameP >= 0.04 && p <= 0.04)) {
        wakeVfxRef.current?.()
      }
      prevFrameP = p

      if (rocketWrapRef.current) {
        rocketWrapRef.current.style.transform = `translate3d(${shakeX.toFixed(2)}px, ${(liftPx + shakeY).toFixed(2)}px, 0) rotate(${tiltDeg.toFixed(2)}deg)`
      }

      if (underGlowRef.current) {
        const glowOp = 0.08 + ignition * 0.88
        underGlowRef.current.style.opacity = glowOp.toFixed(3)
      }

      if (windowGlowRef.current) {
        const pulse = 0.78 + Math.sin(nowSec * 3.2) * 0.14 + ignition * 0.22
        windowGlowRef.current.style.opacity = clamp01(pulse).toFixed(3)
      }

      for (let i = 0; i < LAUNCH_STEPS.length; i++) {
        const row = stepRefs.current[i]
        const badge = badgeRefs.current[i]
        const active = smoothstep(STEP_THRESHOLDS[i], STEP_THRESHOLDS[i] + 0.12, p)
        const opacity = i === 0 ? 1 : 0.72 + active * 0.28
        if (row) {
          row.style.opacity = opacity.toFixed(3)
        }
        if (badge) {
          const scale = i === 0 ? 1 : 0.94 + active * 0.06
          badge.style.transform = `scale(${scale.toFixed(3)})`
        }
      }

      if (statusRef.current) {
        const nextText = useUIStore.getState().translations.launch.scrollHint
        if (nextText !== lastStatusText) {
          lastStatusText = nextText
          statusRef.current.textContent = nextText
        }
      }
    }

    const tick = (now: number) => {
      if (initialized && !inRange) {
        rafId = 0
        return
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now
      targetP = computeRunwayProgress(bounds, getCachedScrollY(), getStableViewportHeight())
      const isMobile = getStableViewportWidth() < 1024

      if (!initialized) {
        bounds = measureElementBounds(runwayRef.current)
        targetP = computeRunwayProgress(bounds, getCachedScrollY(), getStableViewportHeight())
        smoothP = targetP
        initialized = true
      } else {
        const factor = 1 - Math.exp(-16.0 * dt)
        smoothP += (targetP - smoothP) * factor
      }

      applyFrame(smoothP, now * 0.001)

      const needsRumble = !isMobile && smoothP > 0.1 && smoothP < 0.85
      if (inRange && (Math.abs(targetP - smoothP) > 0.00025 || needsRumble)) {
        rafId = requestAnimationFrame(tick)
      } else {
        smoothP = targetP
        applyFrame(smoothP, now * 0.001)
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
    if (typeof IntersectionObserver !== 'undefined' && runwayRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          const nextInRange = entries[0]?.isIntersecting ?? true
          const prevInRange = inRange
          inRange = nextInRange
          if (inRange) {
            bounds = measureElementBounds(runwayRef.current)
            wake()
          } else if (prevInRange && initialized) {
            if (rafId) {
              cancelAnimationFrame(rafId)
              rafId = 0
            }
            bounds = measureElementBounds(runwayRef.current)
            const clampedP = getCachedScrollY() < bounds.top ? 0 : 1
            smoothP = clampedP
            targetP = clampedP
            applyFrame(clampedP, performance.now() * 0.001)
          }
        },
        { rootMargin: '420px 0px' },
      )
      io.observe(runwayRef.current)
    } else {
      inRange = true
    }

    const unsubLayout = subscribeLayoutChange(() => {
      bounds = measureElementBounds(runwayRef.current)
      if (!initialized || inRange) wake()
    })

    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      io?.disconnect()
      unsubLayout()
      window.removeEventListener('scroll', wake)
    }
  }, [
    runwayRef,
    rocketWrapRef,
    underGlowRef,
    windowGlowRef,
    stepRefs,
    badgeRefs,
    statusRef,
    progressRef,
    rocketOffsetRef,
    wakeVfxRef,
  ])
}
