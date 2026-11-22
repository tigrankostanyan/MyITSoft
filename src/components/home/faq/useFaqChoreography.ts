import { useEffect } from 'react'
import { TRANSLATIONS } from '~/i18n/translations'
import {
  clamp01,
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  smootherstep,
  smoothstep,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import { useUIStore } from '~/store/ui-store'
import { FAQS } from './faqData'

export interface FaqChoreographyRefs {
  runwayRef: React.RefObject<HTMLDivElement | null>
  ringsRef: React.RefObject<HTMLDivElement | null>
  orbRef: React.RefObject<HTMLDivElement | null>
  hookRef: React.RefObject<HTMLDivElement | null>
  searchWrapRef: React.RefObject<HTMLDivElement | null>
  searchOrbRef: React.RefObject<HTMLDivElement | null>
  searchTextRef: React.RefObject<HTMLSpanElement | null>
  cardStageRef: React.RefObject<HTMLDivElement | null>
  titleWrapRef: React.RefObject<HTMLDivElement | null>
  glassCardRef: React.RefObject<HTMLDivElement | null>
  spineRef: React.RefObject<HTMLDivElement | null>
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  lineRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  badgeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

const BADGE_CONFIGS = [
  { baseY: 20, speedY: -90, rotY: 28, rotZ: -12 },
  { baseY: 40, speedY: -115, rotY: -32, rotZ: 14 },
  { baseY: 50, speedY: -80, rotY: 24, rotZ: 10 },
  { baseY: 30, speedY: -105, rotY: -26, rotZ: -11 },
] as const

export function useFaqChoreography(refs: FaqChoreographyRefs) {
  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    let initialized = false
    let targetP = 0
    let smoothP = 0
    let lastTypedLen = -1
    let inRange = false
    let bounds = measureElementBounds(refs.runwayRef.current)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const applyChoreography = (p: number) => {
      const vw = getStableViewportWidth()
      const isMobile = vw < 1024

      if (refs.ringsRef.current) {
        const ringTiltX = 48 * (1 - smootherstep(0.0, 0.35, p)) - 10 * smootherstep(0.75, 1.0, p)
        const ringScale = 0.88 + smootherstep(0.0, 0.5, p) * 0.22 + smootherstep(0.75, 1.0, p) * 0.14
        const ringRotZ = p * 34
        refs.ringsRef.current.style.transform = `translate3d(-50%, -50%, 0) perspective(1200px) rotateX(${ringTiltX.toFixed(2)}deg) rotateZ(${ringRotZ.toFixed(2)}deg) scale(${ringScale.toFixed(3)})`
      }

      if (refs.orbRef.current) {
        const maxOrbX = Math.min(180, vw * 0.35)
        const orbX = Math.sin(p * Math.PI * 3.0) * maxOrbX
        const orbY = -36 + Math.cos(p * Math.PI * 2.2) * 85
        const orbOpacity = 0.16 + (1 - smoothstep(0.32, 0.5, p)) * 0.52
        refs.orbRef.current.style.transform = `translate3d(calc(-50% + ${orbX.toFixed(1)}px), calc(-50% + ${orbY.toFixed(1)}px), 0)`
        refs.orbRef.current.style.opacity = orbOpacity.toFixed(3)
      }

      if (refs.hookRef.current) {
        const hookIn = smootherstep(0.0, 0.05, p)
        const hookOut = smootherstep(0.11, 0.18, p)
        const opacity = (0.35 + hookIn * 0.65) * (1 - hookOut)
        const tz = -120 * (1 - hookIn) + hookOut * 320
        const scale = 0.88 + hookIn * 0.12 + hookOut * 0.42
        const rx = 14 * (1 - hookIn) - hookOut * 14
        refs.hookRef.current.style.opacity = opacity.toFixed(3)
        refs.hookRef.current.style.transform = `translate3d(0, ${(-hookOut * 36).toFixed(1)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        refs.hookRef.current.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
      }

      if (refs.searchWrapRef.current) {
        const sIn = smootherstep(0.14, 0.22, p)
        const sOut = smootherstep(0.32, 0.39, p)
        const opacity = sIn * (1 - sOut)
        const ty = 70 * (1 - sIn) - sOut * 110
        const tz = -210 * (1 - sIn) + sOut * 110
        const rx = 32 * (1 - sIn) - sOut * 22
        const scale = 0.74 + sIn * 0.26 + sOut * 0.16
        refs.searchWrapRef.current.style.opacity = opacity.toFixed(3)
        refs.searchWrapRef.current.style.transform = `translate3d(0, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        refs.searchWrapRef.current.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
      }

      if (refs.searchOrbRef.current) {
        const orbitP = clamp01((p - 0.14) / 0.24)
        const angle = orbitP * Math.PI * 2.2
        const maxSearchOrbX = Math.min(230, vw * 0.4)
        const ox = Math.cos(angle) * maxSearchOrbX
        const oy = Math.sin(angle) * 50
        refs.searchOrbRef.current.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 40px)`
      }

      if (refs.searchTextRef.current) {
        const typingText = TRANSLATIONS[useUIStore.getState().locale].faq.searchTyping
        const typeP = clamp01((p - 0.2) / 0.11)
        const chars = Math.round(typeP * typingText.length)
        if (chars !== lastTypedLen) {
          lastTypedLen = chars
          refs.searchTextRef.current.textContent = typingText.slice(0, chars)
        }
      }

      const stageIn = smootherstep(0.28, 0.38, p)

      if (refs.cardStageRef.current) {
        refs.cardStageRef.current.style.opacity = stageIn.toFixed(3)
        refs.cardStageRef.current.style.pointerEvents = stageIn > 0.45 ? 'auto' : 'none'
        refs.cardStageRef.current.style.visibility = stageIn < 0.01 ? 'hidden' : 'visible'
      }

      if (refs.titleWrapRef.current) {
        const titleDock = smootherstep(0.35, 0.5, p)
        const ty = (1 - titleDock) * (isMobile ? 56 : 90)
        const scale = (isMobile ? 1.12 : 1.24) - titleDock * (isMobile ? 0.12 : 0.24)
        refs.titleWrapRef.current.style.opacity = stageIn.toFixed(3)
        refs.titleWrapRef.current.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      }

      if (refs.glassCardRef.current) {
        const cardRise = smootherstep(0.38, 0.49, p)
        const ty = (isMobile ? 72 : 110) * (1 - cardRise)
        const tz = (isMobile ? -120 : -180) * (1 - cardRise)
        const rx = (isMobile ? 14 : 18) * (1 - cardRise)
        const scale = 0.9 + cardRise * 0.1
        refs.glassCardRef.current.style.opacity = cardRise.toFixed(3)
        refs.glassCardRef.current.style.transform = `translate3d(0, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(4)})`
      }

      if (refs.spineRef.current) {
        const spineP = smootherstep(0.45, 0.84, p)
        refs.spineRef.current.style.transform = `scaleY(${spineP.toFixed(4)})`
      }

      for (let i = 0; i < FAQS.length; i++) {
        const start = 0.44 + i * 0.078
        const end = start + 0.08
        const rowP = smootherstep(start, end, p)
        const lineP = smootherstep(start + 0.018, end + 0.032, p)

        const rowEl = refs.rowRefs.current[i]
        if (rowEl) {
          const ty = 26 * (1 - rowP)
          const tz = -70 * (1 - rowP)
          const rx = 14 * (1 - rowP)
          rowEl.style.opacity = rowP.toFixed(3)
          rowEl.style.transform = `translate3d(0, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg)`
          rowEl.style.pointerEvents = rowP > 0.4 ? 'auto' : 'none'
        }

        const lineEl = refs.lineRefs.current[i]
        if (lineEl) lineEl.style.transform = `scaleX(${lineP.toFixed(4)})`
      }

      for (let i = 0; i < BADGE_CONFIGS.length; i++) {
        const el = refs.badgeRefs.current[i]
        if (!el) continue
        const cfg = BADGE_CONFIGS[i]
        const bFade = smootherstep(0.18, 0.42, p)
        const ty = cfg.baseY + p * cfg.speedY
        const ry = cfg.rotY * (p - 0.5)
        const rz = cfg.rotZ * (p - 0.5)
        el.style.opacity = (0.14 + bFade * 0.62).toFixed(3)
        el.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 40px) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`
      }
    }

    if (prefersReducedMotion) {
      applyChoreography(1)
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

      if (!initialized) {
        smoothP = targetP
        initialized = true
      } else {
        const factor = 1 - Math.exp(-16.0 * dt)
        smoothP += (targetP - smoothP) * factor
      }

      applyChoreography(smoothP)

      if (inRange && Math.abs(targetP - smoothP) > 0.0003) {
        rafId = requestAnimationFrame(tick)
      } else {
        smoothP = targetP
        applyChoreography(smoothP)
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
            smoothP = clampedP
            targetP = clampedP
            applyChoreography(clampedP)
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
  }, [refs])
}
