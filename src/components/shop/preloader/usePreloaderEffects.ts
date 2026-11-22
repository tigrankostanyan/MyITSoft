import { useEffect } from 'react'

/** Handles reduced-motion skip and keyboard shortcuts that dismiss the preloader. */
export function useRevealKeys(
  done: boolean,
  setDone: (v: boolean) => void,
  setPreloaderOpen: (v: boolean) => void,
  triggerReveal: () => void,
) {
  useEffect(() => {
    if (done) {
      setPreloaderOpen(false)
      return
    }

    setPreloaderOpen(true)

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setPreloaderOpen(false)
      setDone(true)
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        triggerReveal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [done, setDone, setPreloaderOpen, triggerReveal])
}

/** Locks page scroll (wheel/touch) while `locked` is true. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [locked])
}

export const GRID_COLS = 32
export const GRID_ROWS = 20
export const REVEAL_THRESHOLD = 0.26

export function erasePointsOnGrid(
  ctx: CanvasRenderingContext2D,
  stampBrush: HTMLCanvasElement,
  points: Array<{ x: number; y: number }>,
  w: number,
  h: number,
  brushR: number,
  grid: Uint8Array,
  clearedCellsRef: React.MutableRefObject<number>,
): number {
  const brushDiameter = stampBrush.width
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'

  const cellW = w / GRID_COLS
  const cellH = h / GRID_ROWS
  const totalCells = GRID_COLS * GRID_ROWS
  const rSq = brushR * brushR

  for (const pt of points) {
    ctx.drawImage(stampBrush, pt.x - brushDiameter / 2, pt.y - brushDiameter / 2)

    const minCol = Math.max(0, Math.floor((pt.x - brushR) / cellW))
    const maxCol = Math.min(GRID_COLS - 1, Math.floor((pt.x + brushR) / cellW))
    const minRow = Math.max(0, Math.floor((pt.y - brushR) / cellH))
    const maxRow = Math.min(GRID_ROWS - 1, Math.floor((pt.y + brushR) / cellH))

    for (let r = minRow; r <= maxRow; r++) {
      const cy = (r + 0.5) * cellH
      const dy = cy - pt.y
      for (let c = minCol; c <= maxCol; c++) {
        const idx = r * GRID_COLS + c
        if (grid[idx] === 1) continue
        const cx = (c + 0.5) * cellW
        const dx = cx - pt.x
        if (dx * dx + dy * dy <= rSq) {
          grid[idx] = 1
          clearedCellsRef.current += 1
        }
      }
    }
  }

  ctx.restore()
  return clearedCellsRef.current / totalCells
}
