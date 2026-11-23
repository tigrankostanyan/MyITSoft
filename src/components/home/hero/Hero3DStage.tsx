import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react'
import { useUIStore } from '~/store/ui-store'

const HeroScrollScene = lazy(() => import('~/components/three/HeroScrollScene'))

interface Hero3DStageProps {
  scrollProgressRef: React.MutableRefObject<number>
  posterWrapRef?: React.RefObject<HTMLDivElement | null>
}

/**
 * Displays a transparent WebP render of the resting 3D MacBook+Hub scene at idle,
 * then mounts and crossfades the interactive WebGL scene on first user input or scroll.
 */
export const Hero3DStage = memo(function Hero3DStage({
  scrollProgressRef,
  posterWrapRef,
}: Hero3DStageProps) {
  const preloaderOpen = useUIStore((s) => s.preloaderOpen)
  const [interactive, setInteractive] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [posterMounted, setPosterMounted] = useState(true)

  useEffect(() => {
    if (window.scrollY > 4) {
      setInteractive(true)
      return
    }

    let cancelled = false
    const activate = () => {
      if (cancelled) return
      cancelled = true
      cleanup()
      setInteractive(true)
    }

    const onScroll = () => {
      if (window.scrollY > 4) activate()
    }

    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'wheel',
      'touchstart',
      'keydown',
    ]

    const cleanup = () => {
      for (const evt of events) {
        window.removeEventListener(evt, activate)
      }
      window.removeEventListener('scroll', onScroll)
    }

    for (const evt of events) {
      window.addEventListener(evt, activate, { passive: true, once: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return cleanup
  }, [])

  useEffect(() => {
    if (interactive || preloaderOpen) return

    let startX: number | null = null
    let startY: number | null = null

    const onPointerMove = (e: PointerEvent) => {
      if (startX === null || startY === null) {
        startX = e.clientX
        startY = e.clientY
        return
      }
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 24) {
        window.removeEventListener('pointermove', onPointerMove)
        setInteractive(true)
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [interactive, preloaderOpen])

  // Warm the WebGL scene chunk during idle time so the first scroll/input does
  // not pay the parse + init cost on the main thread (avoids a visible stall).
  useEffect(() => {
    if (interactive || preloaderOpen) return
    let idleId: number | undefined
    const ric = window.requestIdleCallback
    const warm = () => {
      void import('~/components/three/HeroScrollScene')
    }
    if (typeof ric === 'function') {
      idleId = ric(warm, { timeout: 3000 })
    } else {
      idleId = window.setTimeout(warm, 2500)
    }
    return () => {
      if (idleId === undefined) return
      if (typeof ric === 'function') {
        window.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
    }
  }, [interactive, preloaderOpen])

  useEffect(() => {
    if (!canvasReady) return
    const timer = window.setTimeout(() => setPosterMounted(false), 250)
    return () => window.clearTimeout(timer)
  }, [canvasReady])

  const handleReady = useCallback(() => {
    setCanvasReady(true)
  }, [])

  return (
    <div className="relative h-full w-full [container-type:size]">
      {interactive && (
        <Suspense fallback={null}>
          <HeroScrollScene
            scrollProgressRef={scrollProgressRef}
            onReady={handleReady}
          />
        </Suspense>
      )}
      {posterMounted && (
        <div
          ref={posterWrapRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out will-change-transform ${
            canvasReady ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative aspect-[618/1373] w-[min(100cqw,calc(100cqh*618/1373))] md:aspect-[1440/900] md:w-[min(100cqw,calc(100cqh*1440/900))]">
            <picture className="absolute top-[15.222%] left-[3.236%] block h-[22.942%] w-[84.142%] md:top-[23.333%] md:left-[45.625%] md:h-[64.333%] md:w-[53.958%]">
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-stage-mobile.webp"
                width={520}
                height={315}
              />
              <img
                src="/images/hero-stage-desktop.webp"
                srcSet="/images/hero-stage-desktop-480.webp 480w, /images/hero-stage-desktop.webp 777w"
                sizes="min(54vw, 86.3vh)"
                alt=""
                width={777}
                height={579}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </picture>
          </div>
        </div>
      )}
    </div>
  )
})
