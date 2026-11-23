import { getStableViewportHeight, getStableViewportWidth, smootherstep } from '~/lib/scroll-math'

export interface TeamIntroStageTargets {
  introSubtitleRef: React.RefObject<HTMLDivElement | null>
  handsStageRef: React.RefObject<HTMLDivElement | null>
  humanWrapRef: React.RefObject<HTMLDivElement | null>
  robotWrapRef: React.RefObject<HTMLDivElement | null>
  humanHandRef: React.RefObject<HTMLImageElement | null>
  robotHandRef: React.RefObject<HTMLImageElement | null>
  handSparkRef: React.RefObject<HTMLDivElement | null>
  titleWrapRef: React.RefObject<HTMLDivElement | null>
  titleFillRef: React.RefObject<HTMLDivElement | null>
  titleOutlineRef: React.RefObject<HTMLDivElement | null>
  phoneStageRef: React.RefObject<HTMLDivElement | null>
  phoneBezelRef: React.RefObject<HTMLDivElement | null>
}

interface ArmWriteCache {
  lastArmW: number
}

/**
 * Writes the desktop intro-stage (hands, title morph, phone bezel) transforms for progress `p`.
 * Mutates `cache.lastArmW` to skip redundant arm-width writes.
 */
export function writeTeamIntroStage(targets: TeamIntroStageTargets, p: number, cache: ArmWriteCache) {
  const vw = getStableViewportWidth()
  const vh = getStableViewportHeight()

  const handsSep = smootherstep(0.05, 0.36, p)
  const handsFade = 1 - smootherstep(0.24, 0.4, p)
  const handsTilt = smootherstep(0.04, 0.34, p)

  if (targets.introSubtitleRef.current) {
    const subFade = 1 - smootherstep(0.04, 0.2, p)
    const subTy = (1 - subFade) * 24
    targets.introSubtitleRef.current.style.opacity = subFade.toFixed(3)
    targets.introSubtitleRef.current.style.transform = `translate3d(0, ${subTy.toFixed(1)}px, 0)`
    targets.introSubtitleRef.current.style.visibility = subFade < 0.01 ? 'hidden' : 'visible'
  }

  if (targets.handsStageRef.current) {
    const rx = handsTilt * 34
    const ty = -handsTilt * 30
    targets.handsStageRef.current.style.transform = `perspective(1300px) translate3d(0, ${ty.toFixed(1)}px, 0) rotateX(${rx.toFixed(2)}deg)`
  }

  const armW = Math.round(Math.hypot(vw * 0.52, vh * 0.58) * 1.14)
  if (armW !== cache.lastArmW) {
    cache.lastArmW = armW
    const wPx = `${armW}px`
    if (targets.humanWrapRef.current) targets.humanWrapRef.current.style.width = wPx
    if (targets.robotWrapRef.current) targets.robotWrapRef.current.style.width = wPx
  }

  const diagDeg = Math.min(34, Math.max(18, (Math.atan2(vh * 0.46, vw * 0.5) * 180) / Math.PI))
  const pullDist = 66

  if (targets.humanHandRef.current) {
    const rot = -diagDeg - handsSep * 4
    const pull = -handsSep * pullDist
    targets.humanHandRef.current.style.opacity = handsFade.toFixed(3)
    targets.humanHandRef.current.style.transform = `rotate(${rot.toFixed(2)}deg) translate3d(${pull.toFixed(2)}vw, 0, 0)`
    targets.humanHandRef.current.style.visibility = handsFade < 0.01 ? 'hidden' : 'visible'
  }

  if (targets.robotHandRef.current) {
    const rot = -diagDeg - handsSep * 4
    const pull = handsSep * pullDist
    targets.robotHandRef.current.style.opacity = handsFade.toFixed(3)
    targets.robotHandRef.current.style.transform = `rotate(${rot.toFixed(2)}deg) translate3d(${pull.toFixed(2)}vw, 0, 0)`
    targets.robotHandRef.current.style.visibility = handsFade < 0.01 ? 'hidden' : 'visible'
  }

  if (targets.handSparkRef.current) {
    const sparkOut = smootherstep(0.02, 0.2, p)
    const sparkOp = 1 - sparkOut
    const sparkSc = 1 + sparkOut * 0.9
    targets.handSparkRef.current.style.opacity = sparkOp.toFixed(3)
    targets.handSparkRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${sparkSc.toFixed(3)})`
  }

  const textMorph = smootherstep(0.08, 0.38, p)
  if (targets.titleWrapRef.current) {
    const sc = 1 + textMorph * 0.48
    const ty = 28 - textMorph * 42
    const midTilt = Math.sin(textMorph * Math.PI) * 26
    targets.titleWrapRef.current.style.transform = `perspective(1200px) translate3d(0, ${ty.toFixed(1)}px, 0) rotateX(${midTilt.toFixed(2)}deg) scale(${sc.toFixed(3)})`
  }
  if (targets.titleFillRef.current) {
    const fillOp = 1 - smootherstep(0.1, 0.3, p)
    targets.titleFillRef.current.style.opacity = fillOp.toFixed(3)
  }
  if (targets.titleOutlineRef.current) {
    const outlineOp = smootherstep(0.14, 0.36, p)
    targets.titleOutlineRef.current.style.opacity = outlineOp.toFixed(3)
  }

  const stageVis = smootherstep(0.2, 0.3, p)
  const phoneReveal = smootherstep(0.31, 0.49, p)

  if (targets.phoneStageRef.current) {
    targets.phoneStageRef.current.style.opacity = stageVis.toFixed(3)
    targets.phoneStageRef.current.style.transform = 'translate3d(0, 0, 0)'
    targets.phoneStageRef.current.style.pointerEvents = p > 0.38 ? 'auto' : 'none'
    targets.phoneStageRef.current.style.visibility = stageVis < 0.01 ? 'hidden' : 'visible'
  }

  if (targets.phoneBezelRef.current) {
    const bezelTy = (1 - phoneReveal) * 40
    const bezelSc = 0.95 + phoneReveal * 0.05
    targets.phoneBezelRef.current.style.opacity = phoneReveal.toFixed(3)
    targets.phoneBezelRef.current.style.transform = `translate3d(-50%, calc(-50% + ${bezelTy.toFixed(1)}px), 0) scale(${bezelSc.toFixed(3)})`
  }
}

/** Writes the mobile phone-stage visibility (always fully visible, non-transformed). */
export function writeTeamMobileStage(phoneStageRef: React.RefObject<HTMLDivElement | null>) {
  if (phoneStageRef.current) {
    phoneStageRef.current.style.opacity = '1'
    phoneStageRef.current.style.transform = 'translate3d(0, 0, 0)'
    phoneStageRef.current.style.pointerEvents = 'auto'
    phoneStageRef.current.style.visibility = 'visible'
  }
}
