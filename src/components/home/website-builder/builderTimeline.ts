import {
  clamp01,
  easeOutBack,
  easeOutCubic,
  intervalP,
  lerp,
  smoothstep01,
} from '~/lib/scroll-math'
import type { CursorAgent, CursorWaypoint } from './cursorAgentsData'
import { CURSOR_AGENTS } from './cursorAgentsData'

export {
  CURSOR_AGENTS,
  clamp01,
  easeOutBack,
  easeOutCubic,
  intervalP,
  lerp,
  smoothstep01,
  type CursorAgent,
  type CursorWaypoint,
}

export type TechBuilderId =
  | 'figma'
  | 'nextjs'
  | 'nodejs'
  | 'mysql'
  | 'ai'
  | 'security'

export interface TechBuilderMeta {
  id: TechBuilderId
  label: string
  color: string
  dropStart: number
  buildStart: number
  buildEnd: number
}

export const TECH_BUILDERS_META: readonly TechBuilderMeta[] = [
  { id: 'figma', label: 'Figma', color: '#a259ff', dropStart: 0.02, buildStart: 0.05, buildEnd: 0.24 },
  { id: 'nextjs', label: 'Next.js', color: '#38bdf8', dropStart: 0.14, buildStart: 0.22, buildEnd: 0.48 },
  { id: 'nodejs', label: 'Node.js', color: '#22c55e', dropStart: 0.26, buildStart: 0.34, buildEnd: 0.58 },
  { id: 'mysql', label: 'MySQL', color: '#f59e0b', dropStart: 0.4, buildStart: 0.48, buildEnd: 0.68 },
  { id: 'ai', label: 'AI', color: '#00e5ff', dropStart: 0.5, buildStart: 0.56, buildEnd: 0.74 },
  { id: 'security', label: 'Security', color: '#10b981', dropStart: 0.6, buildStart: 0.68, buildEnd: 0.82 },
] as const

export interface CursorPose {
  xPct: number
  yPct: number
  opacity: number
  scale: number
  clickRipple: number
}

export function sampleCursorPose(agent: CursorAgent, p: number, t: number): CursorPose {
  if (p < agent.enterP || p > agent.exitP + 0.08) {
    return { xPct: agent.exitPos[0], yPct: agent.exitPos[1], opacity: 0, scale: 0.8, clickRipple: 0 }
  }

  const pts = agent.waypoints
  let x = pts[0].x
  let y = pts[0].y
  let clickRipple = 0

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    if (p >= a.p && p <= b.p) {
      const u = smoothstep01(intervalP(p, a.p, b.p))
      x = lerp(a.x, b.x, u)
      y = lerp(a.y, b.y, u)
      if (b.click && u > 0.72) {
        clickRipple = Math.sin(((u - 0.72) / 0.28) * Math.PI)
      }
      break
    }
    if (p > b.p) {
      x = b.x
      y = b.y
    }
  }

  const enterFade = smoothstep01(intervalP(p, agent.enterP, agent.enterP + 0.04))
  let exitFade = 1
  if (p > agent.exitP) {
    const exU = smoothstep01(intervalP(p, agent.exitP, agent.exitP + 0.07))
    x = lerp(x, agent.exitPos[0], exU)
    y = lerp(y, agent.exitPos[1], exU)
    exitFade = 1 - exU
  }

  const driftX = Math.sin(t * 2.1 + agent.enterP * 30) * 0.45 * exitFade
  const driftY = Math.cos(t * 1.8 + agent.exitP * 20) * 0.45 * exitFade
  const pressScale = 1 - clickRipple * 0.14

  return {
    xPct: x + driftX,
    yPct: y + driftY,
    opacity: enterFade * exitFade,
    scale: lerp(0.7, 1, enterFade) * pressScale,
    clickRipple,
  }
}

export interface BrowserStageTransform {
  x: number
  y: number
  scale: number
  rotX: number
  rotY: number
  rotZ: number
  canvasGridOpacity: number
  haloOpacity: number
}

export function computeBrowserStageTransform(
  p: number,
  vw: number,
  vh: number,
  mx: number,
  my: number,
): BrowserStageTransform {
  const isMobilePortrait = vw < 768
  const isStacked = vw < 1024
  const padX = vw >= 1024 ? 40 : vw >= 640 ? 32 : vw >= 380 ? 16 : 12
  const containerWidth = Math.min(vw, 1600) - padX * 2

  const stageW = isMobilePortrait ? 420 : 1440
  const stageH = isMobilePortrait ? 578 : 710
  const availH = isMobilePortrait ? Math.max(360, vh - 172) : Math.max(320, vh - 96)

  const showcaseScale = isMobilePortrait
    ? containerWidth / stageW
    : Math.min(containerWidth / stageW, availH / stageH)
  const startScale = isMobilePortrait
    ? Math.min((containerWidth * 0.92) / stageW, (vh * 0.44) / stageH)
    : isStacked
      ? Math.min(containerWidth / stageW, (vh * 0.36) / stageH)
      : Math.min((vw * 0.44) / stageW, (vh * 0.56) / stageH)

  const startX = isStacked ? 0 : vw * 0.23
  const startY = isMobilePortrait ? vh * 0.24 : isStacked ? vh * 0.2 : 12
  const midX = isStacked ? 0 : -vw * 0.08
  const centerY = isMobilePortrait ? -17 : isStacked ? 10 : 16
  const effMx = isMobilePortrait ? 0 : mx
  const effMy = isMobilePortrait ? 0 : my

  let x = startX
  let y = startY
  let scale = startScale
  let rotY = isStacked ? -3 : -12
  let rotX = 4
  let rotZ = isStacked ? 0 : -0.6

  const t1 = isMobilePortrait ? 0.08 : 0.12
  const t2 = isMobilePortrait ? 0.24 : 0.34
  const t3 = isMobilePortrait ? 0.44 : 0.56

  if (p < t1) {
    x = startX + effMx * 6
    y = startY + effMy * 4
    rotY = (isStacked ? -3 : -12) + effMx * 2.5
    rotX = 4 - effMy * 1.5
  } else if (p < t2) {
    const u = smoothstep01(intervalP(p, t1, t2))
    x = lerp(startX, midX, u)
    y = lerp(startY, isMobilePortrait ? centerY : 0, u)
    scale = lerp(startScale, lerp(startScale, showcaseScale, 0.5), u)
    rotY = lerp(isStacked ? -3 : -12, isStacked ? 2 : 6, u)
    rotX = lerp(4, 2, u)
    rotZ = lerp(isStacked ? 0 : -0.6, 0.7, u)
  } else if (p < t3) {
    const u = smoothstep01(intervalP(p, t2, t3))
    x = lerp(midX, 0, u)
    y = lerp(isMobilePortrait ? centerY : 0, centerY, u)
    scale = lerp(lerp(startScale, showcaseScale, 0.5), showcaseScale, u)
    rotY = lerp(isStacked ? 2 : 6, 0, u)
    rotX = lerp(2, 0, u)
    rotZ = lerp(0.7, 0, u)
  } else {
    x = effMx * 10
    y = centerY + effMy * 6
    scale = showcaseScale
    rotY = effMx * 2.2
    rotX = -effMy * 1.4
    rotZ = 0
  }

  return {
    x,
    y,
    scale,
    rotX,
    rotY,
    rotZ,
    canvasGridOpacity: 1 - smoothstep01(intervalP(p, 0.8, 0.91)),
    haloOpacity: smoothstep01(intervalP(p, 0.42, 0.6)),
  }
}
