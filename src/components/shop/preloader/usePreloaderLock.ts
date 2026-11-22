import { startTransition, useEffect, useRef } from 'react'
import { getCachedScrollY, syncCachedScrollY } from '~/lib/scroll-math'

const SCROLL_LOCK_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  ' ',
  'Home',
  'End',
])

/** Locks document scroll while the CSS preloader plays and dismisses cleanly on finish. */
export function usePreloaderLock(
  shellRef: React.RefObject<HTMLDivElement | null>,
  preloaderSeen: boolean,
  setPreloaderOpen: (open: boolean) => void,
  dismissPreloader: () => void,
) {
  const finishedRef = useRef(false)

  useEffect(() => {
    if (preloaderSeen) {
      setPreloaderOpen(false)
      return
    }

    setPreloaderOpen(true)

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      dismissPreloader()
      return
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    syncCachedScrollY(0)

    const keepAtTop = () => {
      if (!finishedRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0)
        syncCachedScrollY(0)
      }
    }

    const blockScrollEvent = (e: Event) => {
      if (finishedRef.current) return
      e.preventDefault()
      e.stopPropagation()
    }

    const blockScrollKeys = (e: KeyboardEvent) => {
      if (finishedRef.current) return
      if (SCROLL_LOCK_KEYS.has(e.key)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const complete = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      if (getCachedScrollY() !== 0) {
        window.scrollTo(0, 0)
      }
      syncCachedScrollY(0)
      startTransition(() => dismissPreloader())
    }

    const shellEl = shellRef.current
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.target === shellEl) {
        complete()
      }
    }

    shellEl?.addEventListener('animationend', onAnimationEnd)
    const fallbackTimer = window.setTimeout(complete, 500)

    window.addEventListener('wheel', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('touchmove', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('keydown', blockScrollKeys, { capture: true })
    window.addEventListener('scroll', keepAtTop, { passive: true })

    return () => {
      window.clearTimeout(fallbackTimer)
      shellEl?.removeEventListener('animationend', onAnimationEnd)
      window.removeEventListener('wheel', blockScrollEvent, { capture: true })
      window.removeEventListener('touchmove', blockScrollEvent, { capture: true })
      window.removeEventListener('keydown', blockScrollKeys, { capture: true })
      window.removeEventListener('scroll', keepAtTop)
    }
  }, [shellRef, preloaderSeen, setPreloaderOpen, dismissPreloader])
}
