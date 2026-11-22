export interface SmokePlatePair {
  cool: HTMLCanvasElement
  warm: HTMLCanvasElement
}

export interface VfxAssets {
  smokePlates: [SmokePlatePair, SmokePlatePair, SmokePlatePair]
  flameJet: HTMLCanvasElement
  groundSplash: HTMLCanvasElement
}

export interface SmokePuff {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  grow: number
  maxAlpha: number
  life: number
  maxLife: number
  rot: number
  vrot: number
  flipX: number
  plateIdx: 0 | 1 | 2
  layer: 'deep' | 'back' | 'front'
  buoyancy: number
  yAspect: number
  ceilingOffset: number
  vxDrag: number
  vyDrag: number
  swirlPhase: number
  swirlAmp: number
}

export interface FlameParticle {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  life: number
  maxLife: number
  rot: number
  flipX: number
  alpha: number
  splashed: boolean
}

export interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  hue: number
}
