import { memo, useEffect, useRef } from 'react'
import { TRANSLATIONS } from '~/i18n/translations'
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
import { LAUNCH_STEPS } from './launch/launchData'
import { LaunchStepsList } from './launch/LaunchStepsList'
import { ReadyToMoveCta } from './launch/ReadyToMoveCta'
import { RocketCanvas } from './launch/RocketCanvas'
import { RocketModel } from './launch/RocketModel'

const STEP_THRESHOLDS = [0.0, 0.16, 0.32] as const

export const LaunchSequenceSection = memo(function LaunchSequenceSection() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const rocketWrapRef = useRef<HTMLDivElement>(null)
  const underGlowRef = useRef<HTMLDivElement>(null)
  const windowGlowRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])
  const statusRef = useRef<HTMLSpanElement>(null)

  const progressRef = useRef(0)
  const rocketOffsetRef = useRef({ x: 0, y: 0 })
  const wakeVfxRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    let initialized = false
    let targetP = 0
    let smoothP = 0
    let lastStatusText = ''
    let prevFrameP = 0
    let inRange = false
    let bounds = measureElementBounds(runwayRef.current)

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
        const opacity = i === 0 ? 1 : 0.4 + active * 0.6
        if (row) {
          row.style.opacity = opacity.toFixed(3)
        }
        if (badge) {
          const scale = i === 0 ? 1 : 0.94 + active * 0.06
          badge.style.transform = `scale(${scale.toFixed(3)})`
        }
      }

      if (statusRef.current) {
        const nextText = TRANSLATIONS[useUIStore.getState().locale].launch.scrollHint
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
            wake()
          } else if (prevInRange && initialized) {
            if (rafId) {
              cancelAnimationFrame(rafId)
              rafId = 0
            }
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

    wake()
    window.addEventListener('scroll', wake, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      io?.disconnect()
      unsubLayout()
      window.removeEventListener('scroll', wake)
    }
  }, [])

  return (
    <section id="get-started" className="relative overflow-x-clip border-t border-white/10 bg-[#060913]">
      <div ref={runwayRef} className="relative h-[220vh] sm:h-[260vh] lg:h-[310vh]">
        <div
          className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-[#060913] pt-[74px] pb-[88px] min-[380px]:pt-[78px] min-[380px]:pb-[94px] min-[576px]:pt-20 min-[576px]:pb-6 lg:pb-0"
          style={{ contain: 'layout paint' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ contain: 'layout paint' }}
          >
            <div
              className="absolute -top-24 left-0 h-[420px] w-[min(620px,100%)] rounded-full blur-[150px]"
              style={{
                background:
                  'radial-gradient(ellipse closest-side at center, rgba(37, 99, 235, 0.18) 0%, rgba(0, 229, 255, 0.06) 52%, transparent 100%)',
              }}
            />
            <div
              className="absolute right-0 bottom-[4%] h-[460px] w-[min(620px,100%)] rounded-full blur-[140px]"
              style={{
                background:
                  'radial-gradient(ellipse closest-side at center, rgba(29, 78, 216, 0.22) 0%, rgba(56, 189, 248, 0.08) 54%, transparent 100%)',
              }}
            />
          </div>

          <RocketCanvas
            progressRef={progressRef}
            rocketWrapRef={rocketWrapRef}
            rocketOffsetRef={rocketOffsetRef}
            wakeVfxRef={wakeVfxRef}
          />

          <div className="site-container relative grid h-full grid-cols-1 content-center items-center gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-20 min-w-0 lg:col-span-5 xl:col-span-5">
              <LaunchStepsList
                stepRefs={stepRefs}
                badgeRefs={badgeRefs}
                statusRef={statusRef}
              />
            </div>

            <div className="relative flex h-[23vh] min-h-[135px] w-full items-center justify-center sm:h-[36vh] lg:col-span-7 lg:h-full xl:col-span-7">
              <div
                ref={rocketWrapRef}
                className="pointer-events-none relative z-10 mt-1 h-[135px] w-[70px] will-change-transform min-[380px]:h-[175px] min-[380px]:w-[92px] sm:h-[290px] sm:w-[152px] lg:mt-4 lg:h-[min(540px,72vh)] lg:w-auto lg:aspect-[292/560] xl:h-[min(600px,76vh)]"
              >
                <RocketModel
                  underGlowRef={underGlowRef}
                  windowGlowRef={windowGlowRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReadyToMoveCta />
    </section>
  )
})
