import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react'
import { getCachedScrollY } from '~/lib/scroll-math'

const HeroScrollScene = lazy(() => import('~/components/three/HeroScrollScene'))

let hero3dPreloaded = false

function preloadHero3D() {
  if (hero3dPreloaded) return
  hero3dPreloaded = true
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'fetch'
    link.href = '/models/macbook.glb'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
  void import('~/components/three/HeroScrollScene')
}

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
  const [interactive, setInteractive] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [posterMounted, setPosterMounted] = useState(true)

  useEffect(() => {
    if (import.meta.env.DEV || getCachedScrollY() > 4) {
      preloadHero3D()
      setInteractive(true)
      return
    }

    let cancelled = false
    let startX: number | null = null
    let startY: number | null = null
    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'wheel',
      'touchstart',
      'keydown',
    ]

    const onScroll = () => {
      if (getCachedScrollY() > 4) activate()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (startX === null || startY === null) {
        startX = e.clientX
        startY = e.clientY
        return
      }
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) {
        activate()
      }
    }

    const cleanup = () => {
      for (const evt of events) {
        window.removeEventListener(evt, activate)
      }
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }

    function activate() {
      if (cancelled) return
      cancelled = true
      cleanup()
      preloadHero3D()
      setInteractive(true)
    }

    for (const evt of events) {
      window.addEventListener(evt, activate, { passive: true, once: true })
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return cleanup
  }, [])

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
      <div
        className={`h-full w-full transition-opacity duration-200 ease-out ${
          canvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {interactive && (
          <Suspense fallback={null}>
            <HeroScrollScene
              scrollProgressRef={scrollProgressRef}
              onReady={handleReady}
            />
          </Suspense>
        )}
      </div>
      {posterMounted && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out ${
            canvasReady ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            ref={posterWrapRef}
            className="relative aspect-[618/1373] w-[min(100cqw,calc(100cqh*618/1373))] will-change-[transform,opacity] md:aspect-[1400/900] md:w-[min(100cqw,calc(100cqh*1400/900))]"
          >
            <picture className="absolute top-[15.222%] left-[3.236%] block h-[22.942%] w-[84.142%] md:top-[23.241%] md:left-[40.893%] md:h-[64.815%] md:w-[57.917%]">
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-stage-mobile.webp"
                width={520}
                height={315}
              />
              <img
                src="/images/hero-stage-desktop.webp"
                srcSet="/images/hero-stage-desktop-480.webp 480w, /images/hero-stage-desktop-800.webp 800w, /images/hero-stage-desktop.webp 973w"
                sizes="min(57.9vw, 90.1vh)"
                alt=""
                width={973}
                height={700}
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
