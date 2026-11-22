import type { FlameParticle, SmokePuff, VfxAssets } from './rocketVfxTypes'
import { clamp01, lerp, smoothstep } from './rocketVfxMath'

export function drawSmokeLayer(
  smokes: readonly SmokePuff[],
  targetCtx: CanvasRenderingContext2D,
  vfx: VfxAssets,
  layers: readonly SmokePuff['layer'][],
  leftFadeStart: number,
  leftFadeEnd: number,
  groundX: number,
  floorY: number,
  nozzleX: number,
  nozzleY: number,
  activeFlameLen: number,
  fireIntensity: number,
  groundImpact: number,
  scale: number,
  height: number,
) {
  const heatRadius = 295 * scale
  for (let i = 0; i < smokes.length; i++) {
    const s = smokes[i]
    if (!layers.includes(s.layer)) continue

    const u = s.life / s.maxLife
    const fadeIn = smoothstep(0, 0.16, u)
    const fadeOut = Math.pow(1 - smoothstep(0.32, 1, u), 1.55)
    const leftMask = smoothstep(leftFadeEnd, leftFadeStart, s.x)
    const topMask = smoothstep(height * 0.12, height * 0.28, s.y)
    const alpha = clamp01(s.maxAlpha * fadeIn * fadeOut * leftMask * topMask)
    if (alpha <= 0.005) continue

    const pair = vfx.smokePlates[s.plateIdx]
    const distToPad = Math.hypot(s.x - groundX, (s.y - floorY) * 1.45)
    const padHeat = Math.pow(clamp01(1 - distToPad / heatRadius), 1.35) * groundImpact

    const flameTopY = nozzleY
    const flameBotY = Math.min(floorY, nozzleY + activeFlameLen)
    let flameHeat = 0
    if (fireIntensity > 0.01 && flameBotY > flameTopY) {
      const segT = clamp01((s.y - flameTopY) / Math.max(1, flameBotY - flameTopY))
      const segX = lerp(nozzleX, groundX, segT)
      const clampedY = Math.max(flameTopY, Math.min(flameBotY, s.y))
      const distToFlame = Math.hypot(s.x - segX, (s.y - clampedY) * 1.15)
      flameHeat = Math.pow(clamp01(1 - distToFlame / (220 * scale)), 1.45) * fireIntensity * 0.72
    }
    const fireHeat = Math.min(1, Math.max(padHeat, flameHeat))

    const half = s.size * 0.5
    targetCtx.save()
    targetCtx.translate(s.x, s.y)
    targetCtx.rotate(s.rot)
    targetCtx.scale(s.flipX, s.yAspect)

    targetCtx.globalAlpha = clamp01(alpha * (1 - fireHeat * 0.38))
    targetCtx.drawImage(pair.cool, -half, -half, s.size, s.size)

    if (fireHeat > 0.03) {
      targetCtx.globalAlpha = clamp01(alpha * fireHeat * 0.96)
      targetCtx.drawImage(pair.warm, -half, -half, s.size, s.size)
    }

    targetCtx.restore()
  }
}

export function drawPhotographicFire(
  flames: readonly FlameParticle[],
  targetCtx: CanvasRenderingContext2D,
  vfx: VfxAssets,
  x: number,
  nozzleY: number,
  floorY: number,
  intensity: number,
  groundReach: number,
  scale: number,
  time: number,
) {
  if (intensity <= 0.01) return

  const flickerA = 0.93 + Math.sin(time * 58) * 0.045 + Math.cos(time * 93) * 0.025
  const flickerB = 0.93 + Math.cos(time * 67) * 0.045 + Math.sin(time * 109) * 0.025
  const distToFloor = Math.max(44 * scale, floorY - nozzleY + 14 * scale)
  const freePlumeLen = (230 + intensity * 195) * scale * flickerA
  const colLen = Math.min(distToFloor, freePlumeLen)

  targetCtx.save()
  targetCtx.globalCompositeOperation = 'lighter'

  const throatR = (26 + intensity * 16) * scale * flickerA
  const throatGlow = targetCtx.createRadialGradient(
    x,
    nozzleY + 4 * scale,
    2,
    x,
    nozzleY + 4 * scale,
    throatR,
  )
  throatGlow.addColorStop(0, `rgba(255, 255, 248, ${(0.95 * intensity).toFixed(3)})`)
  throatGlow.addColorStop(0.42, `rgba(255, 212, 118, ${(0.55 * intensity).toFixed(3)})`)
  throatGlow.addColorStop(0.78, `rgba(249, 115, 22, ${(0.18 * intensity).toFixed(3)})`)
  throatGlow.addColorStop(1, 'rgba(234, 88, 12, 0)')
  targetCtx.fillStyle = throatGlow
  targetCtx.beginPath()
  targetCtx.arc(x, nozzleY + 4 * scale, throatR, 0, Math.PI * 2)
  targetCtx.fill()

  const colW1 = (78 + intensity * 42) * scale * flickerA
  const colW2 = (62 + intensity * 32) * scale * flickerB
  const jitterX1 = Math.sin(time * 74) * 1.8 * scale
  const jitterX2 = Math.cos(time * 89) * 1.8 * scale

  targetCtx.globalAlpha = clamp01(0.95 * intensity)
  targetCtx.drawImage(
    vfx.flameJet,
    x - colW1 * 0.5 + jitterX1,
    nozzleY - 4 * scale,
    colW1,
    colLen * 1.06,
  )

  targetCtx.save()
  targetCtx.translate(x + jitterX2, nozzleY - 2 * scale)
  targetCtx.scale(-1, 1)
  targetCtx.globalAlpha = clamp01(0.78 * intensity)
  targetCtx.drawImage(vfx.flameJet, -colW2 * 0.5, 0, colW2, colLen * 0.98)
  targetCtx.restore()

  for (let i = 0; i < flames.length; i++) {
    const f = flames[i]
    const u = f.life / f.maxLife
    const fade = smoothstep(0, 0.14, u) * (1 - smoothstep(0.45, 1, u))
    const a = clamp01(f.alpha * fade)
    if (a <= 0.01) continue

    targetCtx.save()
    targetCtx.globalAlpha = a
    targetCtx.translate(f.x, f.y)
    targetCtx.rotate(f.rot)
    targetCtx.scale(f.flipX, 1)
    targetCtx.drawImage(vfx.flameJet, -f.w * 0.5, -f.h * 0.5, f.w, f.h)
    targetCtx.restore()
  }

  if (groundReach > 0.03) {
    const splashOp = clamp01(intensity * groundReach)
    const sw1 = (245 + intensity * 160) * scale * flickerA
    const sh1 = (88 + intensity * 46) * scale * flickerB

    targetCtx.globalAlpha = splashOp * 0.92
    targetCtx.drawImage(
      vfx.groundSplash,
      x - sw1 * 0.5 + jitterX1,
      floorY - sh1 * 0.54,
      sw1,
      sh1,
    )

    targetCtx.save()
    targetCtx.translate(x - jitterX2, floorY - 2 * scale)
    targetCtx.scale(-1, 1)
    targetCtx.globalAlpha = splashOp * 0.68
    targetCtx.drawImage(vfx.groundSplash, -sw1 * 0.42, -sh1 * 0.46, sw1 * 0.84, sh1 * 0.86)
    targetCtx.restore()
  }

  targetCtx.restore()
}
