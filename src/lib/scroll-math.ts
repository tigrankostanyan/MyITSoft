export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep01(v: number): number {
  const t = clamp01(v)
  return t * t * (3 - 2 * t)
}

export function smoothstep(e0: number, e1: number, x: number): number {
  return smoothstep01((x - e0) / (e1 - e0))
}

export function smootherstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0))
  return t * t * t * (t * (t * 6 - 15) + 10)
}

export function easeOutCubic(v: number): number {
  const t = clamp01(v)
  return 1 - Math.pow(1 - t, 3)
}

export function easeOutBack(v: number): number {
  const t = clamp01(v)
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export function intervalP(p: number, start: number, end: number): number {
  if (end <= start) return p >= end ? 1 : 0
  return clamp01((p - start) / (end - start))
}

/** Shortest signed modular distance in [-total/2, total/2) */
export function signedOffset(index: number, current: number, total: number): number {
  let diff = (((index - current) % total) + total) % total
  if (diff >= total / 2) diff -= total
  return diff
}

let stableVh = 0
let stableVw = 0
let viewportListenerAttached = false

function ensureViewportListener() {
  if (viewportListenerAttached || typeof window === 'undefined') return
  viewportListenerAttached = true
  stableVw = window.innerWidth || 390
  stableVh = window.innerHeight || 900
  window.addEventListener(
    'resize',
    () => {
      const vw = window.innerWidth || 390
      const vh = window.innerHeight || 900
      if (Math.abs(vw - stableVw) > 20 || Math.abs(vh - stableVh) > 160) {
        stableVh = vh
      }
      stableVw = vw
    },
    { passive: true },
  )
}

/** Returns a cached viewport height (updated only on resize) that ignores mobile URL-bar jitter and avoids forced reflows. */
export function getStableViewportHeight(): number {
  if (typeof window === 'undefined') return 900
  ensureViewportListener()
  return stableVh
}

/** Returns a cached viewport width (updated only on resize) to avoid reading window.innerWidth during scroll/rAF. */
export function getStableViewportWidth(): number {
  if (typeof window === 'undefined') return 390
  ensureViewportListener()
  return stableVw
}

let cachedScrollY = 0
let scrollListenerAttached = false

function ensureScrollListener() {
  if (scrollListenerAttached || typeof window === 'undefined') return
  scrollListenerAttached = true
  cachedScrollY = window.scrollY || 0
  window.addEventListener(
    'scroll',
    () => {
      cachedScrollY = window.scrollY || 0
    },
    { passive: true },
  )
}

/** Returns the latest cached scrollY without forcing layout or synchronous DOM reads inside rAF loops. */
export function getCachedScrollY(): number {
  if (typeof window === 'undefined') return 0
  ensureScrollListener()
  return cachedScrollY
}

/** Synchronizes cachedScrollY immediately after programmatic scroll changes or from Lenis. */
export function syncCachedScrollY(explicitScrollY?: number): void {
  if (typeof window === 'undefined') return
  cachedScrollY =
    typeof explicitScrollY === 'number' && !Number.isNaN(explicitScrollY)
      ? explicitScrollY
      : window.scrollY || 0
}

export interface ElementBounds {
  top: number
  height: number
}

/** Measures an element's document-relative top and height once for zero-reflow scroll tracking. */
export function measureElementBounds(el: HTMLElement | null): ElementBounds {
  if (!el || typeof window === 'undefined') return { top: 0, height: 1 }
  return {
    top: el.getBoundingClientRect().top + (window.scrollY || 0),
    height: el.offsetHeight || 1,
  }
}

/** Computes normalized 0..1 scroll progress from cached bounds without calling getBoundingClientRect(). */
export function computeRunwayProgress(
  bounds: ElementBounds,
  scrollY: number,
  vh: number,
): number {
  const range = Math.max(1, bounds.height - vh)
  return clamp01((scrollY - bounds.top) / range)
}

/** Subscribes to meaningful layout changes (width resizes or document height shifts), ignoring mobile URL-bar jitter. */
export function subscribeLayoutChange(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  let prevVw = window.innerWidth || 0
  let prevBodyH = document.body?.scrollHeight || 0
  let timerId = 0

  const onResize = () => {
    const vw = window.innerWidth || 0
    if (Math.abs(vw - prevVw) > 15) {
      prevVw = vw
      prevBodyH = document.body?.scrollHeight || 0
      cb()
    }
  }

  window.addEventListener('resize', onResize, { passive: true })

  let ro: ResizeObserver | null = null
  if (typeof ResizeObserver !== 'undefined' && document.body) {
    ro = new ResizeObserver(() => {
      if (timerId) window.clearTimeout(timerId)
      timerId = window.setTimeout(() => {
        timerId = 0
        const nextVw = window.innerWidth || 0
        const nextBodyH = document.body?.scrollHeight || 0
        const isMobile = nextVw < 1024
        const hThreshold = isMobile ? 220 : 8
        if (Math.abs(nextBodyH - prevBodyH) > hThreshold || Math.abs(nextVw - prevVw) > 15) {
          prevVw = nextVw
          prevBodyH = nextBodyH
          cb()
        }
      }, 150)
    })
    ro.observe(document.body)
  }

  return () => {
    window.removeEventListener('resize', onResize)
    ro?.disconnect()
    if (timerId) window.clearTimeout(timerId)
  }
}

/** Compute normalized 0..1 scroll progress inside a tall sticky runway container */
export function getRunwayScrollProgress(el: HTMLElement | null): number {
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  const vh = getStableViewportHeight()
  const range = Math.max(1, el.offsetHeight - vh)
  return clamp01(-rect.top / range)
}
