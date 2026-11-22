import { useEffect, useRef, useState } from 'react'
import { getStableViewportHeight, getStableViewportWidth } from '~/lib/scroll-math'
import {
  CURSOR_AGENTS,
  computeBrowserStageTransform,
  easeOutBack,
  easeOutCubic,
  intervalP,
  lerp,
  sampleCursorPose,
  smoothstep01,
} from './builderTimeline'
import type { StoreCanvasRefs } from './MegaMartStoreCanvas'

export const BUILD_STAGE_COUNT = 5

interface UseBuilderChoreographyArgs {
  inView: boolean
  modalOpen: boolean
  scrollProgressRef: React.MutableRefObject<number>
  windowRef: React.RefObject<HTMLDivElement | null>
  haloRef: React.RefObject<HTMLDivElement | null>
  progressBarRef: React.RefObject<HTMLDivElement | null>
  sslBadgeRef: React.RefObject<HTMLSpanElement | null>
  stageStepRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
  stageDotRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
  cursorRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  ringRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
  storeRefs: StoreCanvasRefs
}

/** Coordinates 3D browser staging, MegaMart element reveals, and multiplayer cursors. */
export function useBuilderChoreography({
  inView,
  modalOpen,
  scrollProgressRef,
  windowRef,
  haloRef,
  progressBarRef,
  sslBadgeRef,
  stageStepRefs,
  stageDotRefs,
  cursorRefs,
  ringRefs,
  storeRefs,
}: UseBuilderChoreographyArgs) {
  const [isMobile, setIsMobile] = useState(false)
  const pointerRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 })
  const smoothPRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const w = getStableViewportWidth() || 1280
      const h = getStableViewportHeight()
      pointerRef.current.tx = (e.clientX / w - 0.5) * 2
      pointerRef.current.ty = (e.clientY / h - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    if (!inView || modalOpen) return

    let rafId = 0
    let lastTime = performance.now()
    let lastSecDone: boolean | null = null

    const applyReveal = (el: HTMLDivElement | null, u: number, dy = 14, minScale = 0.96) => {
      if (!el) return
      const s = lerp(minScale, 1, u)
      const ty = lerp(dy, 0, easeOutCubic(u))
      el.style.opacity = Math.min(1, u * 1.4).toFixed(3)
      el.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`
    }

    const applySelectionFlash = (el: HTMLDivElement | null, p: number, start: number, end: number) => {
      if (!el) return
      const inU = smoothstep01(intervalP(p, start, start + 0.04))
      const outU = smoothstep01(intervalP(p, end - 0.05, end))
      el.style.opacity = (inU * (1 - outU)).toFixed(3)
    }

    const tick = (now: number) => {
      const vw = getStableViewportWidth()
      const vh = getStableViewportHeight()
      const isMobileStage = vw < 768
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now
      const damp = 1 - Math.exp(-14 * dt)
      const t = now * 0.001

      smoothPRef.current = lerp(smoothPRef.current, scrollProgressRef.current, damp)
      const p = smoothPRef.current

      const ptr = pointerRef.current
      if (!isMobileStage) {
        ptr.x = lerp(ptr.x, ptr.tx, damp)
        ptr.y = lerp(ptr.y, ptr.ty, damp)
      }

      const stage = computeBrowserStageTransform(p, vw, vh, ptr.x, ptr.y)

      if (windowRef.current) {
        windowRef.current.style.transform = `perspective(1700px) translate3d(${stage.x.toFixed(2)}px, ${stage.y.toFixed(2)}px, 0px) rotateY(${stage.rotY.toFixed(2)}deg) rotateX(${stage.rotX.toFixed(2)}deg) rotateZ(${stage.rotZ.toFixed(2)}deg) scale(${stage.scale.toFixed(4)})`
      }
      if (haloRef.current) {
        haloRef.current.style.opacity = stage.haloOpacity.toFixed(3)
        haloRef.current.style.transform = `translate3d(0, 0, 0) scale(${(0.85 + stage.haloOpacity * 0.15).toFixed(3)})`
      }
      if (storeRefs.gridRef.current) {
        storeRefs.gridRef.current.style.opacity = stage.canvasGridOpacity.toFixed(3)
      }

      applyReveal(storeRefs.headerRef.current, easeOutCubic(intervalP(p, 0.03, 0.15)), -12, 0.98)
      applySelectionFlash(storeRefs.headerBoxRef.current, p, 0.04, 0.22)

      applyReveal(storeRefs.pillsRef.current, easeOutCubic(intervalP(p, 0.11, 0.23)), 10, 0.98)
      applySelectionFlash(storeRefs.pillsBoxRef.current, p, 0.12, 0.28)

      applyReveal(storeRefs.heroRef.current, easeOutBack(intervalP(p, 0.17, 0.3)), 16, 0.95)
      applySelectionFlash(storeRefs.heroBoxRef.current, p, 0.18, 0.36)

      const titleU = smoothstep01(intervalP(p, 0.23, 0.36))
      if (storeRefs.heroTitleClipRef.current) {
        storeRefs.heroTitleClipRef.current.style.clipPath = `inset(0 ${((1 - titleU) * 100).toFixed(1)}% 0 0)`
      }
      applySelectionFlash(storeRefs.heroTitleBoxRef.current, p, 0.22, 0.42)

      if (storeRefs.heroWatchRef.current) {
        const wu = easeOutBack(intervalP(p, 0.25, 0.38))
        const floatY = !isMobileStage && wu > 0.95 ? Math.sin(t * 2.2) * 2.5 : 0
        storeRefs.heroWatchRef.current.style.opacity = Math.min(1, wu * 1.3).toFixed(3)
        storeRefs.heroWatchRef.current.style.transform = `translate3d(0, ${(lerp(20, 0, wu) + floatY).toFixed(1)}px, 0) scale(${lerp(0.75, 1, wu).toFixed(4)})`
      }

      applyReveal(storeRefs.dealsHeaderRef.current, easeOutCubic(intervalP(p, 0.29, 0.39)), 10, 0.98)
      for (let i = 0; i < 6; i++) {
        const start = 0.33 + i * 0.038
        applyReveal(storeRefs.cardRefs.current[i], easeOutBack(intervalP(p, start, start + 0.12)), 18, 0.9)
        applySelectionFlash(storeRefs.cardBoxRefs.current[i], p, start - 0.02, start + 0.16)
      }

      applyReveal(storeRefs.catHeaderRef.current, easeOutCubic(intervalP(p, 0.54, 0.62)), 10, 0.98)
      applySelectionFlash(storeRefs.catBoxRef.current, p, 0.55, 0.78)
      for (let i = 0; i < 7; i++) {
        const start = 0.57 + i * 0.025
        applyReveal(storeRefs.catRefs.current[i], easeOutBack(intervalP(p, start, start + 0.11)), 16, 0.85)
      }

      const stageW = isMobileStage ? 420 : 1440
      const stageH = isMobileStage ? 578 : 710
      for (let i = 0; i < CURSOR_AGENTS.length; i++) {
        const pose = sampleCursorPose(CURSOR_AGENTS[i], p, t)
        const cEl = cursorRefs.current[i]
        if (cEl) {
          const px = isMobileStage
            ? lerp(10, stageW - 84, pose.xPct / 100)
            : (pose.xPct / 100) * stageW
          const py = (pose.yPct / 100) * stageH
          cEl.style.opacity = pose.opacity.toFixed(3)
          cEl.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${pose.scale.toFixed(3)})`
        }
        const rEl = ringRefs.current[i]
        if (rEl) {
          rEl.style.opacity = (pose.clickRipple * 0.75).toFixed(3)
          rEl.style.transform = `scale(${(0.5 + pose.clickRipple * 1.1).toFixed(3)})`
        }
      }

      if (progressBarRef.current) {
        const barU = smoothstep01(intervalP(p, 0.03, 0.82))
        const barFade = 1 - smoothstep01(intervalP(p, 0.84, 0.91))
        progressBarRef.current.style.transform = `scaleX(${barU.toFixed(3)})`
        progressBarRef.current.style.opacity = barFade.toFixed(3)
      }

      if (sslBadgeRef.current) {
        const secDone = p >= 0.76
        if (secDone !== lastSecDone) {
          lastSecDone = secDone
          sslBadgeRef.current.style.backgroundColor = secDone
            ? 'rgba(16, 185, 129, 0.14)'
            : 'rgba(100, 116, 139, 0.1)'
          sslBadgeRef.current.style.color = secDone ? '#059669' : '#64748b'
          sslBadgeRef.current.style.borderColor = secDone
            ? 'rgba(16, 185, 129, 0.35)'
            : 'rgba(148, 163, 184, 0.25)'
        }
      }

      const activeStageIdx =
        p < 0.16 ? 0 : p < 0.32 ? 1 : p < 0.56 ? 2 : p < 0.74 ? 3 : 4
      for (let i = 0; i < BUILD_STAGE_COUNT; i++) {
        const stepEl = stageStepRefs.current[i]
        const dotEl = stageDotRefs.current[i]
        const isCurrent = i === activeStageIdx
        const isDone = i < activeStageIdx
        if (stepEl) {
          stepEl.style.opacity = isCurrent ? '1' : isDone ? '0.62' : '0.32'
          stepEl.style.color = isCurrent ? '#ffffff' : isDone ? '#bae6fd' : '#94a3b8'
          stepEl.style.transform = isCurrent ? 'scale(1.04)' : 'scale(1)'
        }
        if (dotEl) {
          dotEl.style.backgroundColor = isCurrent
            ? '#00e5ff'
            : isDone
              ? '#38bdf8'
              : 'rgba(148, 163, 184, 0.35)'
          dotEl.style.boxShadow = isCurrent ? '0 0 10px #00e5ff' : 'none'
        }
      }

      if (Math.abs(scrollProgressRef.current - smoothPRef.current) < 0.0003 && isMobileStage) {
        smoothPRef.current = scrollProgressRef.current
        rafId = 0
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!rafId) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    wake()
    if (isMobile) {
      window.addEventListener('scroll', wake, { passive: true })
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (isMobile) {
        window.removeEventListener('scroll', wake)
      }
    }
  }, [
    inView,
    modalOpen,
    scrollProgressRef,
    isMobile,
    windowRef,
    haloRef,
    progressBarRef,
    sslBadgeRef,
    stageStepRefs,
    stageDotRefs,
    cursorRefs,
    ringRefs,
    storeRefs,
  ])

  return isMobile
}
