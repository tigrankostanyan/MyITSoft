import { clamp01, getStableViewportHeight, getStableViewportWidth, signedOffset, smootherstep } from '~/lib/scroll-math'

export interface TeamCardProfile {
  delay: number
  drop: number
  driftX: number
  spin: number
  tiltX: number
}

export interface TeamCardEnterProfile extends TeamCardProfile {}

export interface TeamCardExitProfile {
  lift: number
  driftX: number
  spin: number
  tiltX: number
}

export interface TeamCardStageProfile {
  radius: number
  stepDeg: number
  dragPerCard: number
}

const ENTER_PROFILES: readonly TeamCardProfile[] = [
  { delay: 0.04, drop: 0.92, driftX: -52, spin: -13, tiltX: -16 },
  { delay: 0.11, drop: 0.78, driftX: 46, spin: 11, tiltX: -12 },
  { delay: 0.0, drop: 1.05, driftX: -18, spin: 15, tiltX: -18 },
  { delay: 0.08, drop: 0.86, driftX: 60, spin: -14, tiltX: -14 },
  { delay: 0.02, drop: 0.98, driftX: -66, spin: 12, tiltX: -17 },
  { delay: 0.13, drop: 0.82, driftX: 38, spin: -10, tiltX: -13 },
] as const

const EXIT_PROFILES: readonly TeamCardExitProfile[] = [
  { lift: 0.72, driftX: -48, spin: -11, tiltX: 12 },
  { lift: 0.28, driftX: 44, spin: 9, tiltX: 8 },
  { lift: 0.92, driftX: -22, spin: 14, tiltX: 16 },
  { lift: 0.42, driftX: 56, spin: -12, tiltX: 10 },
  { lift: 0.82, driftX: -62, spin: 12, tiltX: 14 },
  { lift: 0.54, driftX: 34, spin: -9, tiltX: 11 },
] as const

/** Resolves the carousel radius/step/drag geometry for the current viewport. */
export function resolveTeamStageProfile(): TeamCardStageProfile {
  const vw = getStableViewportWidth()
  const isMobile = vw < 640
  const isTablet = vw >= 640 && vw < 1024
  return {
    radius: isMobile ? 480 : isTablet ? 760 : Math.max(960, vw * 0.74),
    stepDeg: isMobile ? 30 : isTablet ? 25 : 22,
    dragPerCard: isMobile ? 220 : isTablet ? 280 : 340,
  }
}

export interface TeamCardWriteArgs {
  profile: TeamCardStageProfile
  p: number
  leaveP: number
  slideVal: number
  dragOffset: number
  total: number
  isCompact: boolean
  vh: number
}

/** Writes the shared transform/opacity/z-index for one tilted carousel card. */
export function writeTeamCard(el: HTMLDivElement, index: number, args: TeamCardWriteArgs) {
  const { profile, p, leaveP, slideVal, dragOffset, total, isCompact, vh } = args
  const dragFrac = dragOffset / profile.dragPerCard
  const offset = signedOffset(index, slideVal - dragFrac, total)
  const absOff = Math.abs(offset)

  const angleDeg = offset * profile.stepDeg
  const angleRad = (angleDeg * Math.PI) / 180

  const ep = ENTER_PROFILES[index % ENTER_PROFILES.length]
  const cardEnter = isCompact ? 1 : smootherstep(0.22 + ep.delay, 0.46 + ep.delay * 0.65, p)
  const unEntered = 1 - cardEnter
  const enterY = unEntered * vh * 0.88 * ep.drop
  const enterX = unEntered * ep.driftX
  const enterRot = unEntered * ep.spin
  const enterRx = unEntered * ep.tiltX
  const enterFade = isCompact ? 1 : smootherstep(0.0, 0.35, cardEnter)

  const prof = EXIT_PROFILES[index % EXIT_PROFILES.length]
  const cardExit = isCompact ? 0 : smootherstep(0, 1, leaveP)
  const exitY = -cardExit * vh * 0.65 * prof.lift
  const exitX = cardExit * prof.driftX
  const exitRot = cardExit * prof.spin
  const exitRx = cardExit * prof.tiltX

  const tx = Math.sin(angleRad) * profile.radius + enterX + exitX
  const ty = (1 - Math.cos(angleRad)) * profile.radius + enterY + exitY
  const focus = Math.max(0, 1 - absOff)
  const sc =
    Math.max(0.8, 0.94 + focus * 0.14 - Math.max(0, absOff - 1) * 0.06) *
    (0.88 + cardEnter * 0.12) *
    (1 - cardExit * 0.08)
  const rotY = -offset * 8
  const tz = focus * 65 - absOff * 18 - unEntered * 70 - cardExit * 45
  const z = Math.round(40 - absOff * 10)
  const baseFade =
    absOff <= 2.2
      ? 1 - Math.max(0, absOff - 1.1) * 0.22
      : clamp01(0.76 * (1 - (absOff - 2.2) / 0.85))
  const finalFade = baseFade * enterFade

  el.style.transform = `translate3d(calc(-50% + ${tx.toFixed(2)}px), calc(-50% + ${ty.toFixed(2)}px), ${tz.toFixed(2)}px) rotate(${(angleDeg + enterRot + exitRot).toFixed(2)}deg) rotateX(${(enterRx + exitRx).toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${sc.toFixed(4)})`
  el.style.opacity = finalFade.toFixed(3)
  el.style.zIndex = String(z)
  el.style.visibility = finalFade < 0.02 ? 'hidden' : 'visible'
}
