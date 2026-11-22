import { memo, useEffect, useRef, useState } from 'react'
import { Lock, RotateCw, ShieldCheck } from 'lucide-react'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { getStableViewportHeight, getStableViewportWidth } from '~/lib/scroll-math'
import { useInView } from '~/lib/useInView'
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
import { MegaMartStoreCanvas, type StoreCanvasRefs } from './MegaMartStoreCanvas'
import { MultiplayerCursorsLayer } from './MultiplayerCursorsLayer'

const BUILD_PROCESS_STAGES = [
  'Վերլուծություն',
  'Նախագծում',
  'Կառուցում',
  'Թեստավորում',
  'Ինտեգրում',
] as const

interface WebsiteBuilderStageProps {
  scrollProgressRef: React.MutableRefObject<number>
}

export const WebsiteBuilderStage = memo(function WebsiteBuilderStage({
  scrollProgressRef,
}: WebsiteBuilderStageProps) {
  const { t } = useTranslations()
  const { ref: inViewRef, inView } = useInView('220px', false)
  const modalOpen = useUIStore((s) => s.inspectorId !== null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(check)
      ro.observe(document.documentElement)
    }
    return () => {
      window.removeEventListener('resize', check)
      ro?.disconnect()
    }
  }, [])

  const windowRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const sslBadgeRef = useRef<HTMLSpanElement>(null)
  const stageCaptionRef = useRef<HTMLDivElement>(null)
  const stageStepRefs = useRef<(HTMLSpanElement | null)[]>([])
  const stageDotRefs = useRef<(HTMLSpanElement | null)[]>([])

  const cursorRefs = useRef<(HTMLDivElement | null)[]>([])
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([])

  const storeRefs: StoreCanvasRefs = {
    gridRef: useRef<HTMLDivElement>(null),
    headerRef: useRef<HTMLDivElement>(null),
    headerBoxRef: useRef<HTMLDivElement>(null),
    pillsRef: useRef<HTMLDivElement>(null),
    pillsBoxRef: useRef<HTMLDivElement>(null),
    heroRef: useRef<HTMLDivElement>(null),
    heroBoxRef: useRef<HTMLDivElement>(null),
    heroTitleClipRef: useRef<HTMLDivElement>(null),
    heroTitleBoxRef: useRef<HTMLDivElement>(null),
    heroWatchRef: useRef<HTMLDivElement>(null),
    dealsHeaderRef: useRef<HTMLDivElement>(null),
    cardRefs: useRef<(HTMLDivElement | null)[]>([]),
    cardBoxRefs: useRef<(HTMLDivElement | null)[]>([]),
    catHeaderRef: useRef<HTMLDivElement>(null),
    catBoxRef: useRef<HTMLDivElement>(null),
    catRefs: useRef<(HTMLDivElement | null)[]>([]),
  }

  const pointerRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 })
  const smoothPRef = useRef(0)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const w = window.innerWidth || 1280
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
          sslBadgeRef.current.style.backgroundColor = secDone ? 'rgba(16, 185, 129, 0.14)' : 'rgba(100, 116, 139, 0.1)'
          sslBadgeRef.current.style.color = secDone ? '#059669' : '#64748b'
          sslBadgeRef.current.style.borderColor = secDone ? 'rgba(16, 185, 129, 0.35)' : 'rgba(148, 163, 184, 0.25)'
        }
      }

      const activeStageIdx =
        p < 0.16 ? 0 : p < 0.32 ? 1 : p < 0.56 ? 2 : p < 0.74 ? 3 : 4
      for (let i = 0; i < BUILD_PROCESS_STAGES.length; i++) {
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
  }, [inView, modalOpen, scrollProgressRef, isMobile])

  return (
    <div
      ref={inViewRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      {/* Soft radial ambient stage glow beneath centered browser */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-[74vh] w-[78%] max-w-[1150px] rounded-full blur-[90px] will-change-transform"
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.24) 0%, rgba(37, 99, 235, 0.14) 48%, transparent 78%)',
        }}
      />

      {/* Crisp 3D-Perspective Browser Shell (Portrait Mobile on <768px, macOS Desktop on >=768px) */}
      <div
        ref={windowRef}
        className={`relative shrink-0 overflow-visible will-change-transform ${
          isMobile ? 'h-[578px] w-[420px]' : 'h-[710px] w-[1440px]'
        }`}
        style={{ transformOrigin: 'center center' }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/60 bg-white shadow-[0_38px_90px_-18px_rgba(2,6,23,0.85),0_0_0_1px_rgba(148,163,184,0.28)]">
          {/* Top Browser Chrome Toolbar */}
          <div className="relative z-30 flex h-[38px] items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-3.5 md:h-[44px] md:px-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] md:h-3 md:w-3" />
              {!isMobile && (
                <span className="ml-3 rounded-t-lg border border-b-0 border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold text-[#1e293b]">
                  MegaMart — Online Store
                </span>
              )}
            </div>

            <div
              className={`flex h-[28px] items-center justify-between rounded-full border border-[#e2e8f0] bg-white px-2.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] ${
                isMobile ? 'w-[235px]' : 'w-[420px] px-3'
              }`}
            >
              <span
                ref={sslBadgeRef}
                className="inline-flex items-center gap-1 rounded-full border px-1.5 py-[1px] text-[9.5px] font-bold transition-colors duration-300 md:px-2 md:text-[10px]"
              >
                <Lock className="h-2.5 w-2.5" />
                <span>SSL</span>
              </span>
              <span className="truncate font-mono text-[11px] font-medium text-[#334155] md:text-[11.5px]">
                https://megamart.am
              </span>
              <RotateCw className="h-3 w-3 shrink-0 text-[#94a3b8]" />
            </div>

            {!isMobile ? (
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#64748b]">
                <ShieldCheck className="h-4 w-4 text-[#008ecc]" />
                <span>MyITSoft Studio</span>
              </div>
            ) : (
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#008ecc]" />
            )}

            <div
              ref={progressBarRef}
              className="absolute right-0 bottom-0 left-0 h-[2.5px] origin-left bg-gradient-to-r from-[#a259ff] via-[#008ecc] to-[#10b981]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <MegaMartStoreCanvas refs={storeRefs} isMobile={isMobile} />
        </div>

        <MultiplayerCursorsLayer cursorRefs={cursorRefs} ringRefs={ringRefs} />

        {/* Process stage caption bar beneath the browser window */}
        <div
          ref={stageCaptionRef}
          className="pointer-events-none absolute right-0 -bottom-11 left-0 flex items-center justify-center md:-bottom-14"
        >
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-sky-300/25 bg-[#0a1022]/85 px-3 py-1.5 font-mono-tech text-[9px] tracking-[0.06em] uppercase shadow-[0_14px_34px_rgba(2,6,23,0.75)] backdrop-blur-md md:gap-4 md:px-6 md:py-2.5 md:text-[13px] md:tracking-[0.12em]">
            {t.cartJourney.processStages.map((label, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  stageStepRefs.current[idx] = el
                }}
                className="inline-flex items-center gap-1 transition-all duration-300 md:gap-2"
              >
                <span
                  ref={(el) => {
                    stageDotRefs.current[idx] = el
                  }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 md:h-2 md:w-2"
                />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})
