export const BAR_HEIGHT = 82
export const TOP_Y = 22
export const VALLEY_DEPTH = 50
export const ORB_SIZE = 46
export const CORNER_R = 14
export const SIDE_PAD = 12
export const EDGE_MIN = 6

function computeNotchGeometry(width: number, cx: number, halfW: number) {
  const safeW = Math.max(240, width)
  const span = Math.max(32, Math.min(halfW, cx - EDGE_MIN, safeW - cx - EDGE_MIN))
  const left = cx - span
  const right = cx + span
  const rL = Math.min(CORNER_R, left)
  const rR = Math.min(CORNER_R, safeW - right)
  const c1 = span * 0.34
  const c2 = span * 0.62
  return { safeW, left, right, rL, rR, c1, c2 }
}

/** SVG fill & clip path string for the notched bottom dock. */
export function buildBarPath(width: number, cx: number, halfW: number) {
  const { safeW, left, right, rL, rR, c1, c2 } = computeNotchGeometry(width, cx, halfW)

  return [
    `M 0 ${BAR_HEIGHT}`,
    `L 0 ${(TOP_Y + rL).toFixed(1)}`,
    `Q 0 ${TOP_Y} ${rL.toFixed(1)} ${TOP_Y}`,
    `L ${left.toFixed(1)} ${TOP_Y}`,
    `C ${(left + c1).toFixed(1)} ${TOP_Y}, ${(cx - c2).toFixed(1)} ${VALLEY_DEPTH}, ${cx.toFixed(1)} ${VALLEY_DEPTH}`,
    `C ${(cx + c2).toFixed(1)} ${VALLEY_DEPTH}, ${(right - c1).toFixed(1)} ${TOP_Y}, ${right.toFixed(1)} ${TOP_Y}`,
    `L ${(safeW - rR).toFixed(1)} ${TOP_Y}`,
    `Q ${safeW.toFixed(1)} ${TOP_Y} ${safeW.toFixed(1)} ${(TOP_Y + rR).toFixed(1)}`,
    `L ${safeW.toFixed(1)} ${BAR_HEIGHT}`,
    'Z',
  ].join(' ')
}

/** SVG top-edge glow stroke path string for the notched dock. */
export function buildTopStrokePath(width: number, cx: number, halfW: number) {
  const { safeW, left, right, rL, rR, c1, c2 } = computeNotchGeometry(width, cx, halfW)

  return [
    `M 0 ${(TOP_Y + rL).toFixed(1)}`,
    `Q 0 ${TOP_Y} ${rL.toFixed(1)} ${TOP_Y}`,
    `L ${left.toFixed(1)} ${TOP_Y}`,
    `C ${(left + c1).toFixed(1)} ${TOP_Y}, ${(cx - c2).toFixed(1)} ${VALLEY_DEPTH}, ${cx.toFixed(1)} ${VALLEY_DEPTH}`,
    `C ${(cx + c2).toFixed(1)} ${VALLEY_DEPTH}, ${(right - c1).toFixed(1)} ${TOP_Y}, ${right.toFixed(1)} ${TOP_Y}`,
    `L ${(safeW - rR).toFixed(1)} ${TOP_Y}`,
    `Q ${safeW.toFixed(1)} ${TOP_Y} ${safeW.toFixed(1)} ${(TOP_Y + rR).toFixed(1)}`,
  ].join(' ')
}

/** Computes horizontal notch center and symmetric half-width for a tab slot. */
export function computeNotchMetrics(idx: number, width: number, itemCount: number) {
  const safeW = Math.max(240, width)
  const innerW = Math.max(216, safeW - SIDE_PAD * 2)
  const slotW = innerW / itemCount
  const cx = SIDE_PAD + (idx + 0.5) * slotW
  const maxSymHalfW = Math.min(cx - EDGE_MIN, safeW - cx - EDGE_MIN)
  const halfW = Math.max(36, Math.min(44, maxSymHalfW))
  return { safeW, halfW, cx }
}
