import type { FlameParticle, SmokePuff, Spark } from './rocketVfxTypes'
import { lerp } from './rocketVfxMath'

export function spawnGroundSmoke(
  smokes: SmokePuff[],
  groundX: number,
  floorY: number,
  smokePresence: number,
  groundImpact: number,
  smokeAltFactor: number,
  scale: number,
  height: number,
) {
  if (smokes.length >= 110) return

  const roll = Math.random()
  const dir = Math.random() < 0.5 ? -1 : 1
  const sizeScale = lerp(0.58, 1.0, smokeAltFactor)
  const spawnAlphaScale = lerp(0.22, 1.0, Math.pow(smokeAltFactor, 0.75))
  const highAltMist = smokeAltFactor < 0.25

  if (roll < 0.18) {
    const layer: SmokePuff['layer'] = Math.random() < 0.5 ? 'deep' : 'back'
    const plateIdx: 0 | 1 | 2 = highAltMist
      ? 2
      : Math.random() < 0.55
        ? 2
        : Math.random() < 0.5
          ? 0
          : 1
    smokes.push({
      x: groundX + dir * (42 + Math.random() * 115) * scale,
      y: floorY - (4 + Math.random() * 24) * scale,
      vx: dir * (105 + Math.random() * 135) * (0.7 + smokePresence * 0.35) * scale,
      vy: -(68 + Math.random() * 68) * (0.7 + smokePresence * 0.32) * scale,
      size: (160 + Math.random() * 105) * scale * sizeScale,
      grow: (90 + Math.random() * 55) * scale * sizeScale,
      maxAlpha: (0.3 + Math.random() * 0.18) * smokePresence * spawnAlphaScale,
      life: 0,
      maxLife: 2.4 + Math.random() * 1.1,
      rot: (Math.random() - 0.5) * 0.38,
      vrot: dir * (0.06 + Math.random() * 0.1),
      flipX: dir,
      plateIdx,
      layer,
      buoyancy: (52 + Math.random() * 34) * scale,
      yAspect: 0.86 + Math.random() * 0.1,
      ceilingOffset: Math.min(370 * scale, height * 0.48),
      vxDrag: 0.45,
      vyDrag: 0.56,
      swirlPhase: Math.random() * Math.PI * 2,
      swirlAmp: (14 + Math.random() * 20) * scale,
    })
    return
  }

  if (roll < 0.48) {
    smokes.push({
      x: groundX + dir * (28 + Math.random() * 92) * scale,
      y: floorY + Math.random() * 18 * scale,
      vx: dir * (165 + Math.random() * 155) * (0.7 + smokePresence * 0.35) * scale,
      vy: -(42 + Math.random() * 48) * (0.65 + smokePresence * 0.35) * scale,
      size: (185 + Math.random() * 115) * scale * sizeScale,
      grow: (92 + Math.random() * 56) * scale * sizeScale,
      maxAlpha: (0.48 + Math.random() * 0.22) * smokePresence * spawnAlphaScale,
      life: 0,
      maxLife: 2.2 + Math.random() * 1.0,
      rot: (Math.random() - 0.5) * 0.4,
      vrot: dir * (0.08 + Math.random() * 0.12),
      flipX: dir,
      plateIdx: highAltMist ? 2 : Math.random() < 0.5 ? 1 : 0,
      layer: 'back',
      buoyancy: (44 + Math.random() * 28) * scale,
      yAspect: 0.82 + Math.random() * 0.1,
      ceilingOffset: Math.min(310 * scale, height * 0.4),
      vxDrag: 0.4,
      vyDrag: 0.54,
      swirlPhase: Math.random() * Math.PI * 2,
      swirlAmp: (12 + Math.random() * 16) * scale,
    })
    return
  }

  if (roll < 0.78) {
    const layer: SmokePuff['layer'] = Math.random() < 0.45 ? 'deep' : 'back'
    const plateIdx: 0 | 1 | 2 = highAltMist
      ? 2
      : layer === 'deep'
        ? Math.random() < 0.65
          ? 2
          : 1
        : Math.random() < 0.55
          ? 1
          : 0
    smokes.push({
      x: groundX + dir * (28 + Math.random() * 88) * scale,
      y: floorY + (4 + Math.random() * 20) * scale,
      vx: dir * (210 + Math.random() * 175) * (0.7 + smokePresence * 0.35) * scale,
      vy: -(16 + Math.random() * 26) * (0.65 + groundImpact * 0.35) * scale,
      size: (205 + Math.random() * 125) * scale * sizeScale,
      grow: (94 + Math.random() * 58) * scale * sizeScale,
      maxAlpha: (0.46 + Math.random() * 0.22) * smokePresence * spawnAlphaScale,
      life: 0,
      maxLife: 2.2 + Math.random() * 1.0,
      rot: (Math.random() - 0.5) * 0.4,
      vrot: dir * (0.08 + Math.random() * 0.12),
      flipX: dir,
      plateIdx,
      layer,
      buoyancy: (34 + Math.random() * 22) * scale,
      yAspect: 0.78 + Math.random() * 0.08,
      ceilingOffset: Math.min(250 * scale, height * 0.33),
      vxDrag: 0.38,
      vyDrag: 0.5,
      swirlPhase: Math.random() * Math.PI * 2,
      swirlAmp: (10 + Math.random() * 14) * scale,
    })
    return
  }

  smokes.push({
    x: groundX + (Math.random() - 0.5) * 96 * scale,
    y: floorY + (4 + Math.random() * 18) * scale,
    vx: dir * (140 + Math.random() * 150) * (0.7 + smokePresence * 0.35) * scale,
    vy: -(14 + Math.random() * 24) * (0.65 + groundImpact * 0.35) * scale,
    size: (145 + Math.random() * 95) * scale * sizeScale,
    grow: (72 + Math.random() * 46) * scale * sizeScale,
    maxAlpha: (0.52 + Math.random() * 0.2) * smokePresence * spawnAlphaScale,
    life: 0,
    maxLife: 1.7 + Math.random() * 0.85,
    rot: (Math.random() - 0.5) * 0.42,
    vrot: dir * (0.1 + Math.random() * 0.14),
    flipX: dir,
    plateIdx: highAltMist ? 2 : Math.random() < 0.5 ? 1 : 0,
    layer: 'front',
    buoyancy: (24 + Math.random() * 18) * scale,
    yAspect: 0.8 + Math.random() * 0.08,
    ceilingOffset: 155 * scale,
    vxDrag: 0.4,
    vyDrag: 0.52,
    swirlPhase: Math.random() * Math.PI * 2,
    swirlAmp: (8 + Math.random() * 12) * scale,
  })
}

export function spawnFlameJet(
  flames: FlameParticle[],
  nozzleX: number,
  nozzleY: number,
  intensity: number,
  scale: number,
) {
  if (flames.length >= 36) return
  const spreadX = (Math.random() - 0.5) * 10 * scale
  flames.push({
    x: nozzleX + spreadX,
    y: nozzleY + (2 + Math.random() * 6) * scale,
    vx: spreadX * 2.4 + (Math.random() - 0.5) * 32 * scale,
    vy: (650 + Math.random() * 400) * (0.8 + intensity * 0.28) * scale,
    w: (42 + Math.random() * 24) * (0.75 + intensity * 0.32) * scale,
    h: (74 + Math.random() * 46) * (0.75 + intensity * 0.32) * scale,
    life: 0,
    maxLife: 0.18 + Math.random() * 0.14,
    rot: (Math.random() - 0.5) * 0.1,
    flipX: Math.random() < 0.5 ? -1 : 1,
    alpha: (0.62 + Math.random() * 0.3) * intensity,
    splashed: false,
  })
}

export function spawnSparks(
  sparks: Spark[],
  groundX: number,
  floorY: number,
  intensity: number,
  scale: number,
) {
  if (sparks.length >= 68) return
  const count = Math.ceil(intensity * 2)
  for (let i = 0; i < count; i++) {
    const dir = Math.random() < 0.5 ? -1 : 1
    const speedX = (95 + Math.random() * 260) * scale * dir
    const speedY = -(65 + Math.random() * 195) * scale
    sparks.push({
      x: groundX + (Math.random() - 0.5) * 44 * scale,
      y: floorY - (2 + Math.random() * 14) * scale,
      vx: speedX,
      vy: speedY,
      size: (1.1 + Math.random() * 1.7) * scale,
      life: 0,
      maxLife: 0.4 + Math.random() * 0.55,
      hue: 22 + Math.random() * 22,
    })
  }
}
