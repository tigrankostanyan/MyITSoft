import { memo, useEffect, useRef } from 'react'
import { subscribeLayoutChange } from '~/lib/scroll-math'
import type { FlameParticle, SmokePuff, Spark, VfxAssets } from './rocketVfxTypes'
import { loadVfxAssets } from './rocketVfxAssets'
import { runRocketVfxFrame } from './rocketVfxFrame'

interface RocketCanvasProps {
  progressRef: React.MutableRefObject<number>
  rocketWrapRef: React.RefObject<HTMLDivElement | null>
  rocketOffsetRef: React.MutableRefObject<{ x: number; y: number }>
  wakeVfxRef: React.MutableRefObject<(() => void) | null>
}

/** Dual-canvas rocket launch VFX: back canvas (behind rocket) and front canvas (over fin tips). */
export const RocketCanvas = memo(function RocketCanvas({
  progressRef,
  rocketWrapRef,
  rocketOffsetRef,
  wakeVfxRef,
}: RocketCanvasProps) {
  const backCanvasRef = useRef<HTMLCanvasElement>(null)
  const frontCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const backCanvas = backCanvasRef.current
    const frontCanvas = frontCanvasRef.current
    if (!backCanvas || !frontCanvas) return

    const backCtx = backCanvas.getContext('2d', { alpha: true })
    const frontCtx = frontCanvas.getContext('2d', { alpha: true })
    if (!backCtx || !frontCtx) return

    let disposed = false
    let assets: VfxAssets | null = null
    let assetsRequested = false

    const ensureVfxAssets = () => {
      if (assetsRequested || disposed) return
      assetsRequested = true
      loadVfxAssets()
        .then((loaded) => {
          if (!disposed) {
            assets = loaded
          }
        })
        .catch(() => {
          assetsRequested = false
        })
    }

    const smokes: SmokePuff[] = []
    const flames: FlameParticle[] = []
    const sparks: Spark[] = []
    const frameState = { smokes, flames, sparks, smokeAccum: 0, flameAccum: 0, prevP: 0 }

    let width = 1
    let height = 1
    let dpr = 1
    let measuredOnce = false
    let isVisible = false
    let rafId = 0
    let lastTime = performance.now()

    let restNozzleX = 0
    let restNozzleY = 0
    let rocketW = 300

    const measure = () => {
      measuredOnce = true
      const rect = frontCanvas.getBoundingClientRect()
      const isMobileCanvas = (window.innerWidth || 1024) < 768
      dpr = Math.min(window.devicePixelRatio || 1, isMobileCanvas ? 1.25 : 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)

      const cw = Math.round(width * dpr)
      const ch = Math.round(height * dpr)

      backCanvas.width = cw
      backCanvas.height = ch
      backCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      frontCanvas.width = cw
      frontCanvas.height = ch
      frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const rk = rocketWrapRef.current
      if (rk) {
        const prevTransform = rk.style.transform
        const hadTransform = Boolean(prevTransform && prevTransform !== 'none')
        if (hadTransform) rk.style.transform = 'none'
        const rkRect = rk.getBoundingClientRect()
        if (hadTransform) rk.style.transform = prevTransform
        restNozzleX = rkRect.left - rect.left + rkRect.width * 0.5
        restNozzleY = rkRect.top - rect.top + rkRect.height * 0.905
        rocketW = rkRect.width
      } else {
        restNozzleX = width * 0.72
        restNozzleY = height * 0.8
      }
    }

    const unsubLayout = subscribeLayoutChange(() => {
      if (isVisible || measuredOnce) measure()
    })

    const startLoop = () => {
      if (!disposed && isVisible && !rafId) {
        if (!measuredOnce) measure()
        ensureVfxAssets()
        lastTime = performance.now()
        rafId = requestAnimationFrame(loop)
      }
    }
    wakeVfxRef.current = startLoop

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false
        if (isVisible) {
          startLoop()
        }
      },
      { rootMargin: '500px' },
    )
    io.observe(frontCanvas)

    const loop = (now: number) => {
      if (!isVisible) {
        rafId = 0
        return
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now
      const t = now * 0.001

      const keepAlive = runRocketVfxFrame(frameState, {
        backCtx,
        frontCtx,
        width,
        height,
        restNozzleX,
        restNozzleY,
        rocketW,
        progress: progressRef.current,
        offsetX: rocketOffsetRef.current.x,
        offsetY: rocketOffsetRef.current.y,
        assets,
        dt,
        t,
      })

      if (!keepAlive) {
        rafId = 0
        return
      }

      rafId = requestAnimationFrame(loop)
    }

    return () => {
      disposed = true
      wakeVfxRef.current = null
      if (rafId) cancelAnimationFrame(rafId)
      unsubLayout()
      io.disconnect()
    }
  }, [progressRef, rocketWrapRef, rocketOffsetRef, wakeVfxRef])

  return (
    <>
      <canvas
        ref={backCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      />
      <canvas
        ref={frontCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
      />
    </>
  )
})
