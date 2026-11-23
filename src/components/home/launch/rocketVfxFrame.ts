import type { FlameParticle, SmokePuff, Spark, VfxAssets } from './rocketVfxTypes'
import { clamp01, lerp, smoothstep } from './rocketVfxMath'
import { spawnFlameJet, spawnGroundSmoke, spawnSparks } from './rocketVfxSpawn'
import { drawPhotographicFire, drawSmokeLayer } from './rocketVfxDraw'
import {
  drawFireBounce,
  drawFloorGlow,
  updateAndDrawSparks,
  updateFlames,
  updateSmokes,
} from './rocketVfxSim'

export interface RocketVfxFrameState {
  smokes: SmokePuff[]
  flames: FlameParticle[]
  sparks: Spark[]
  smokeAccum: number
  flameAccum: number
  prevP: number
}

export interface RocketVfxFrameTargets {
  backCtx: CanvasRenderingContext2D
  frontCtx: CanvasRenderingContext2D
  width: number
  height: number
  restNozzleX: number
  restNozzleY: number
  rocketW: number
  progress: number
  offsetX: number
  offsetY: number
  assets: VfxAssets | null
  dt: number
  t: number
}

/**
 * Advances one animation frame of rocket VFX. Returns false when the rocket has
 * not ignited and every particle is settled (the caller should then sleep the loop).
 */
export function runRocketVfxFrame(
  state: RocketVfxFrameState,
  targets: RocketVfxFrameTargets,
): boolean {
  const { smokes, flames, sparks } = state
  const {
    backCtx,
    frontCtx,
    width,
    height,
    restNozzleX,
    restNozzleY,
    rocketW,
    assets,
    dt,
    t,
  } = targets
  const p = targets.progress

  if (p < 0.04 || Math.abs(p - state.prevP) > 0.22) {
    if (smokes.length > 0 || flames.length > 0 || sparks.length > 0) {
      smokes.length = 0
      flames.length = 0
      sparks.length = 0
      backCtx.clearRect(0, 0, width, height)
      frontCtx.clearRect(0, 0, width, height)
    }
  }
  state.prevP = p

  const ignitionUp = smoothstep(0.08, 0.32, p)
  const exitFade = 1 - smoothstep(0.84, 0.99, p)
  const fireIntensity = ignitionUp * exitFade

  // Sleep the loop when rocket has not ignited and all particles have settled
  if (fireIntensity <= 0.001 && smokes.length === 0 && flames.length === 0 && sparks.length === 0) {
    backCtx.clearRect(0, 0, width, height)
    frontCtx.clearRect(0, 0, width, height)
    return false
  }

  const smokePresence = Math.pow(fireIntensity, 0.72)

  const nozzleX = restNozzleX + targets.offsetX
  const nozzleY = restNozzleY + targets.offsetY

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
    state.smokeAccum += dt * smokeRate
    while (state.smokeAccum >= 1) {
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
      state.smokeAccum -= 1
    }

    if (nozzleY > -360) {
      state.flameAccum += dt * (42 + fireIntensity * 52)
      while (state.flameAccum >= 1) {
        if (!isMobileVfx || flames.length < 18) {
          spawnFlameJet(flames, nozzleX, nozzleY, fireIntensity, scale)
        }
        state.flameAccum -= 1
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

  return true
}
