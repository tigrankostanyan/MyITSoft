import { clamp01, getStableViewportWidth, smoothstep } from '../scroll-math'

export interface CartGlowTargets {
  cartSpotlightRef: React.RefObject<HTMLDivElement | null>
  cartFloorGlowRef: React.RefObject<HTMLDivElement | null>
}

/** Applies the scroll-driven cart spotlight/floor-glow transforms and returns the 0..1 progress. */
export function applyCartGlowWrites(
  targets: CartGlowTargets,
  scroll: number,
  cartTop: number,
  cartRange: number,
): number {
  const cp = clamp01((scroll - cartTop) / cartRange)

  const isStacked = getStableViewportWidth() < 1024
  const rightX = isStacked ? 0 : 22
  const midX = isStacked ? 0 : -8
  const baseSpotY = isStacked ? 12 : 2
  let spotX = rightX
  let spotY = baseSpotY
  let spotScale = 1

  if (cp < 0.12) {
    spotX = rightX
    spotY = baseSpotY
  } else if (cp < 0.34) {
    const s = smoothstep(0.12, 0.34, cp)
    spotX = rightX + (midX - rightX) * s
    spotY = baseSpotY * (1 - s)
    spotScale = 1 + 0.1 * s
  } else if (cp < 0.56) {
    const s = smoothstep(0.34, 0.56, cp)
    spotX = midX * (1 - s)
    spotY = 2 * s
    spotScale = 1.1 + 0.25 * s
  } else {
    spotX = 0
    spotY = 2
    spotScale = 1.35
  }

  if (targets.cartSpotlightRef.current) {
    targets.cartSpotlightRef.current.style.transform = `translate3d(calc(-50% + ${spotX.toFixed(2)}vw), calc(-50% + ${spotY.toFixed(2)}vh), 0) scale(${spotScale.toFixed(3)})`
  }
  if (targets.cartFloorGlowRef.current) {
    targets.cartFloorGlowRef.current.style.transform = `translate3d(calc(-50% + ${spotX.toFixed(2)}vw), -50%, 0) scale(${spotScale.toFixed(3)})`
  }

  return cp
}
