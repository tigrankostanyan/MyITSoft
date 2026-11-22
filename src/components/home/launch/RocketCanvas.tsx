import { memo, useEffect, useRef } from 'react'
import { subscribeLayoutChange } from '~/lib/scroll-math'
import type { FlameParticle, SmokePuff, Spark, VfxAssets } from './rocketVfxTypes'
import { clamp01, lerp, smoothstep } from './rocketVfxMath'
import { loadVfxAssets } from './rocketVfxAssets'
import { spawnFlameJet, spawnGroundSmoke, spawnSparks } from './rocketVfxSpawn'
import { drawPhotographicFire, drawSmokeLayer } from './rocketVfxDraw'
import {
  drawFireBounce,
  drawFloorGlow,
  updateAndDrawSparks,
  updateFlames,
  updateSmokes,
} from './rocketVfxSim'

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

    loadVfxAssets()
      .then((loaded) => {
        if (!disposed) {
          assets = loaded
        }
      })
      .catch(() => {})

    const smokes: SmokePuff[] = []
    const flames: FlameParticle[] = []
    const sparks: Spark[] = []

    let width = 1
    let height = 1
    let dpr = 1
    let isVisible = true
    let rafId = 0
    let lastTime = performance.now()
    let smokeAccum = 0
    let flameAccum = 0
    let prevP = 0

    let restNozzleX = 0
    let restNozzleY = 0
    let rocketW = 300

    const measure = () => {
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
        rk.style.transform = 'none'
        const rkRect = rk.getBoundingClientRect()
        rk.style.transform = prevTransform
        restNozzleX = rkRect.left - rect.left + rkRect.width * 0.5
        restNozzleY = rkRect.top - rect.top + rkRect.height * 0.905
        rocketW = rkRect.width
      } else {
        restNozzleX = width * 0.72
        restNozzleY = height * 0.8
      }
    }

    measure()
    const delayedMeasureRaf = requestAnimationFrame(measure)
    const unsubLayout = subscribeLayoutChange(measure)

    const startLoop = () => {
      if (!disposed && isVisible && !rafId) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(loop)
      }
    }
    wakeVfxRef.current = startLoop

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true
        if (isVisible) {
          startLoop()
        }
      },
      { rootMargin: '160px' },
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

      const p = progressRef.current
      if (p < 0.04 || Math.abs(p - prevP) > 0.22) {
        if (smokes.length > 0 || flames.length > 0 || sparks.length > 0) {
          smokes.length = 0
          flames.length = 0
          sparks.length = 0
          backCtx.clearRect(0, 0, width, height)
          frontCtx.clearRect(0, 0, width, height)
        }
      }
      prevP = p

      const ignitionUp = smoothstep(0.08, 0.32, p)
      const exitFade = 1 - smoothstep(0.84, 0.99, p)
      const fireIntensity = ignitionUp * exitFade

      // Sleep the loop when rocket has not ignited and all particles have settled
      if (fireIntensity <= 0.001 && smokes.length === 0 && flames.length === 0 && sparks.length === 0) {
        backCtx.clearRect(0, 0, width, height)
        frontCtx.clearRect(0, 0, width, height)
        rafId = 0
        return
      }

      const smokePresence = Math.pow(fireIntensity, 0.72)

      const nozzleX = restNozzleX + rocketOffsetRef.current.x
      const nozzleY = restNozzleY + rocketOffsetRef.current.y

      const scale = Math.max(0.68, Math.min(1.25, rocketW / 290))
      const floorY = restNozzleY + 36 * scale

      const altitudePx = Math.max(0, restNozzleY - nozzleY)
      const altRef = Math.max(240, height * 0.72)
      const altNorm = clamp01(altitudePx / altRef)
      const dispersalMode = smoothstep(0.28, 0.78, altNorm)
      const highAltFade = 1 - smoothstep(0.22, 0.84, altNorm)
      const smokeAltFactor = lerp(0.035, 1.0, Math.pow(highAltFade, 1.6))

      const distToFloor = Math.max(44 * scale, floorY - nozzleY + 14 * scale)
      const freePlumeBaseLen = (230 + fireIntensity * 195) * scale
      const groundReach = 1 - smoothstep(0.68, 1.08, distToFloor / Math.max(1, freePlumeBaseLen))
      const groundImpact = fireIntensity * groundReach
      const activeFlameLen = Math.min(distToFloor, freePlumeBaseLen)

      const isMobileVfx = width < 768
      const leftFadeStart = width < 1024 ? -1000 : Math.max(width * 0.36, restNozzleX - 360 * scale)
      const leftFadeEnd = width < 1024 ? -1200 : Math.max(width * 0.22, restNozzleX - 520 * scale)

      backCtx.clearRect(0, 0, width, height)
      frontCtx.clearRect(0, 0, width, height)

      drawFloorGlow(backCtx, restNozzleX, floorY, scale, fireIntensity, groundImpact)

      if (fireIntensity > 0.03) {
        const smokeRate = (18 + fireIntensity * 38) * smokeAltFactor * (isMobileVfx ? 0.55 : 1)
        smokeAccum += dt * smokeRate
        while (smokeAccum >= 1) {
          if (!isMobileVfx || smokes.length < 48) {
            spawnGroundSmoke(
              smokes,
              restNozzleX,
              floorY,
              smokePresence,
              groundImpact,
              smokeAltFactor,
              scale,
              height,
            )
          }
          if (groundImpact > 0.08 && Math.random() < 0.34) {
            spawnSparks(sparks, restNozzleX, floorY, groundImpact, scale)
          }
          smokeAccum -= 1
        }

        if (nozzleY > -360) {
          flameAccum += dt * (42 + fireIntensity * 52)
          while (flameAccum >= 1) {
            if (!isMobileVfx || flames.length < 18) {
              spawnFlameJet(flames, nozzleX, nozzleY, fireIntensity, scale)
            }
            flameAccum -= 1
          }
        }
      }

      updateSmokes(smokes, dt, t, dispersalMode, floorY, scale)

      updateFlames(flames, dt, floorY, restNozzleX, scale)

      if (assets) {
        drawSmokeLayer(
          smokes,
          backCtx,
          assets,
          ['deep', 'back'],
          leftFadeStart,
          leftFadeEnd,
          restNozzleX,
          floorY,
          nozzleX,
          nozzleY,
          activeFlameLen,
          fireIntensity,
          groundImpact,
          scale,
          height,
        )

        if (nozzleY > -360) {
          drawPhotographicFire(
            flames,
            backCtx,
            assets,
            nozzleX,
            nozzleY,
            floorY,
            fireIntensity,
            groundReach,
            scale,
            t,
          )
        }

        drawSmokeLayer(
          smokes,
          frontCtx,
          assets,
          ['front'],
          leftFadeStart,
          leftFadeEnd,
          restNozzleX,
          floorY,
          nozzleX,
          nozzleY,
          activeFlameLen,
          fireIntensity,
          groundImpact,
          scale,
          height,
        )
      }

      if (groundImpact > 0.04) drawFireBounce(frontCtx, restNozzleX, floorY, scale, groundImpact)

      updateAndDrawSparks(frontCtx, sparks, dt)

      rafId = requestAnimationFrame(loop)
    }

    startLoop()

    return () => {
      disposed = true
      wakeVfxRef.current = null
      cancelAnimationFrame(delayedMeasureRaf)
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
