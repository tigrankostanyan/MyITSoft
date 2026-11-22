import type { FlameParticle, SmokePuff, Spark } from './rocketVfxTypes'
import { lerp } from './rocketVfxMath'

export function drawFloorGlow(
  backCtx: CanvasRenderingContext2D,
  restNozzleX: number,
  floorY: number,
  scale: number,
  fireIntensity: number,
  groundImpact: number,
) {
  const glowRadiusX = 310 * scale
  const glowRadiusY = 82 * scale
  backCtx.save()
  backCtx.translate(restNozzleX, floorY + 8 * scale)
  backCtx.scale(1, glowRadiusY / glowRadiusX)
  const baseFloorGlow = backCtx.createRadialGradient(0, 0, 6, 0, 0, glowRadiusX)
  baseFloorGlow.addColorStop(
    0,
    `rgba(56, 189, 248, ${(0.16 * (1 - fireIntensity * 0.65)).toFixed(3)})`,
  )
  baseFloorGlow.addColorStop(
    0.48,
    `rgba(29, 78, 216, ${(0.08 * (1 - fireIntensity * 0.55)).toFixed(3)})`,
  )
  baseFloorGlow.addColorStop(1, 'rgba(6, 9, 19, 0)')
  backCtx.fillStyle = baseFloorGlow
  backCtx.beginPath()
  backCtx.arc(0, 0, glowRadiusX, 0, Math.PI * 2)
  backCtx.fill()
  backCtx.restore()

  if (groundImpact > 0.01) {
    const fireRadX = 360 * scale * (0.78 + fireIntensity * 0.28)
    const fireRadY = 104 * scale * (0.78 + fireIntensity * 0.28)
    backCtx.save()
    backCtx.translate(restNozzleX, floorY + 4 * scale)
    backCtx.scale(1, fireRadY / fireRadX)
    const fireFloor = backCtx.createRadialGradient(0, 0, 6, 0, 0, fireRadX)
    fireFloor.addColorStop(0, `rgba(255, 236, 192, ${(0.56 * groundImpact).toFixed(3)})`)
    fireFloor.addColorStop(0.32, `rgba(249, 130, 44, ${(0.3 * groundImpact).toFixed(3)})`)
    fireFloor.addColorStop(0.68, `rgba(217, 72, 15, ${(0.09 * groundImpact).toFixed(3)})`)
    fireFloor.addColorStop(1, 'rgba(217, 72, 15, 0)')
    backCtx.fillStyle = fireFloor
    backCtx.beginPath()
    backCtx.arc(0, 0, fireRadX, 0, Math.PI * 2)
    backCtx.fill()
    backCtx.restore()
  }
}

export function drawFireBounce(
  frontCtx: CanvasRenderingContext2D,
  restNozzleX: number,
  floorY: number,
  scale: number,
  groundImpact: number,
) {
  if (groundImpact > 0.04) {
    frontCtx.save()
    frontCtx.globalCompositeOperation = 'screen'
    const bounceR = (165 + groundImpact * 70) * scale
    const bounce = frontCtx.createRadialGradient(
      restNozzleX,
      floorY - 4 * scale,
      8,
      restNozzleX,
      floorY - 4 * scale,
      bounceR,
    )
    bounce.addColorStop(0, `rgba(255, 198, 110, ${(0.32 * groundImpact).toFixed(3)})`)
    bounce.addColorStop(0.46, `rgba(249, 115, 22, ${(0.13 * groundImpact).toFixed(3)})`)
    bounce.addColorStop(1, 'rgba(234, 88, 12, 0)')
    frontCtx.fillStyle = bounce
    frontCtx.beginPath()
    frontCtx.arc(restNozzleX, floorY - 4 * scale, bounceR, 0, Math.PI * 2)
    frontCtx.fill()
    frontCtx.restore()
  }
}

export function updateAndDrawSparks(frontCtx: CanvasRenderingContext2D, sparks: Spark[], dt: number) {
  frontCtx.save()
  frontCtx.globalCompositeOperation = 'lighter'
  frontCtx.lineCap = 'round'
  for (let i = sparks.length - 1; i >= 0; i--) {
    const sp = sparks[i]
    sp.life += dt
    if (sp.life >= sp.maxLife) {
      sparks.splice(i, 1)
      continue
    }
    const u = sp.life / sp.maxLife
    sp.x += sp.vx * dt
    sp.y += sp.vy * dt
    sp.vx *= Math.pow(0.32, dt)
    sp.vy += 185 * dt

    const alpha = (1 - u) * 0.92
    const tailX = sp.x - sp.vx * 0.028
    const tailY = sp.y - sp.vy * 0.028

    frontCtx.strokeStyle = `hsla(${sp.hue}, 100%, 66%, ${(alpha * 0.72).toFixed(3)})`
    frontCtx.lineWidth = Math.max(0.8, sp.size * (1 - u * 0.4))
    frontCtx.beginPath()
    frontCtx.moveTo(tailX, tailY)
    frontCtx.lineTo(sp.x, sp.y)
    frontCtx.stroke()

    frontCtx.fillStyle = `hsla(${sp.hue + 14}, 100%, 86%, ${alpha.toFixed(3)})`
    frontCtx.beginPath()
    frontCtx.arc(sp.x, sp.y, sp.size * 0.65 * (1 - u * 0.4), 0, Math.PI * 2)
    frontCtx.fill()
  }
  frontCtx.restore()
}

export function updateSmokes(
  smokes: SmokePuff[],
  dt: number,
  t: number,
  dispersalMode: number,
  floorY: number,
  scale: number,
) {
  const lifeScale = lerp(1.0, 0.48, dispersalMode)
  const growScale = lerp(1.0, 0.74, dispersalMode)
  for (let i = smokes.length - 1; i >= 0; i--) {
    const s = smokes[i]
    s.life += dt * lifeScale
    if (s.life >= s.maxLife) {
      smokes.splice(i, 1)
      continue
    }

    const u = s.life / s.maxLife
    s.x += (s.vx + Math.sin(t * 2.1 + s.swirlPhase) * s.swirlAmp * u) * dt
    s.y += s.vy * dt

    s.vx *= Math.pow(s.vxDrag, dt)
    s.vy *= Math.pow(s.vyDrag, dt)

    if (u > 0.06) {
      s.vy -= s.buoyancy * dt * (1 - u * 0.35)
    }

    if (dispersalMode > 0.01) {
      s.vx += s.flipX * (22 + (s.layer === 'deep' ? 14 : 6)) * scale * dispersalMode * dt
      s.vy -= 10 * scale * dispersalMode * dt
    }

    const minCeilingY = floorY - s.ceilingOffset
    if (s.y < minCeilingY) {
      const overshoot = minCeilingY - s.y
      s.vy += overshoot * 6.5 * dt
      if (s.vy < 0) s.vy *= Math.pow(0.18, dt)
      s.vx += s.flipX * Math.min(90 * scale, overshoot * 1.4) * dt
    }
    if (s.y > floorY + 34 * scale) {
      s.y = floorY + 34 * scale
      s.vy = -Math.abs(s.vy) * 0.25
    }

    s.size += s.grow * growScale * (1 - u * 0.35) * dt
    s.rot += s.vrot * (1 - u * 0.45) * dt
  }
}

export function updateFlames(
  flames: FlameParticle[],
  dt: number,
  floorY: number,
  restNozzleX: number,
  scale: number,
) {
  for (let i = flames.length - 1; i >= 0; i--) {
    const f = flames[i]
    f.life += dt
    if (f.life >= f.maxLife) {
      flames.splice(i, 1)
      continue
    }

    f.x += f.vx * dt
    f.y += f.vy * dt

    if (!f.splashed && f.y >= floorY - 6 * scale) {
      f.splashed = true
      const side = f.x >= restNozzleX ? 1 : -1
      f.vx = side * (240 + Math.random() * 290) * scale
      f.vy = -(12 + Math.random() * 40) * scale
      f.rot = side * (Math.PI * 0.46 + (Math.random() - 0.5) * 0.2)
      f.w *= 1.08
      f.h *= 0.85
    } else if (f.splashed) {
      f.vx *= Math.pow(0.2, dt)
      f.vy *= Math.pow(0.25, dt)
    }
  }
}
