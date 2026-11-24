import { useEffect, useRef } from 'react'
import { syncCachedScrollY } from '~/lib/scroll-math'
import { useUIStore } from '~/store/ui-store'

const SCROLL_LOCK_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  ' ',
  'Home',
  'End',
])

const MIN_INTRO_MS = 3450
const MAX_WAIT_MS = 5600

/**
 * Locks scroll while the brand intro writes in AND the 3D Hero stage compiles & warms
 * behind the opaque curtain. Once both are ready, triggers the smooth upward rise +
 * gradual opacity fade and unlocks scroll immediately so first scroll is 100% lag-free.
 */
export function usePreloaderLock(
  shellRef: React.RefObject<HTMLDivElement | null>,
  preloaderSeen: boolean,
  setPreloaderOpen: (open: boolean) => void,
  dismissPreloader: () => void,
) {
  const unlockedRef = useRef(false)
  const exitingRef = useRef(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (preloaderSeen) {
      setPreloaderOpen(false)
      return
    }

    unlockedRef.current = false
    exitingRef.current = false
    finishedRef.current = false
    setPreloaderOpen(true)

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      unlockedRef.current = true
      exitingRef.current = true
      finishedRef.current = true
      dismissPreloader()
      return
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    syncCachedScrollY(0)

    const keepAtTop = () => {
      if (!unlockedRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0)
        syncCachedScrollY(0)
      }
    }

    const blockScrollEvent = (e: Event) => {
      if (unlockedRef.current) return
      e.preventDefault()
    }

    const blockScrollKeys = (e: KeyboardEvent) => {
      if (unlockedRef.current) return
      if (SCROLL_LOCK_KEYS.has(e.key)) {
        e.preventDefault()
      }
    }

    const removeLockListeners = () => {
      window.removeEventListener('wheel', blockScrollEvent, { capture: true })
      window.removeEventListener('touchmove', blockScrollEvent, { capture: true })
      window.removeEventListener('keydown', blockScrollKeys, { capture: true })
      window.removeEventListener('scroll', keepAtTop)
    }

    const unlockScroll = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true
      removeLockListeners()
      setPreloaderOpen(false)
    }

    const complete = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      unlockScroll()
      dismissPreloader()
    }

    const shellEl = shellRef.current
    let unlockAfterLiftTimer = 0
    let exitFallbackTimer = 0

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.target === shellEl && e.animationName === 'preloader-shell-exit') {
        complete()
      }
    }
    shellEl?.addEventListener('animationend', onAnimationEnd)

    let minIntroDone = false
    let sceneReady = useUIStore.getState().heroReady

    const startExitIfReady = (force = false) => {
      if (exitingRef.current || finishedRef.current) return
      if (!force && (!minIntroDone || !sceneReady)) return
      exitingRef.current = true
      shellEl?.classList.add('preloader-shell-exit-active')
      unlockAfterLiftTimer = window.setTimeout(unlockScroll, 80)
      exitFallbackTimer = window.setTimeout(complete, 1300)
    }

    const unsubStore = useUIStore.subscribe((state) => {
      if (state.heroReady && !sceneReady) {
        sceneReady = true
        startExitIfReady(false)
      }
    })

    // Sync minimum intro duration to the SSR CSS animation clock if already running
    const barEl = shellEl?.querySelector('.preloader-bar')
    const barAnim = barEl?.getAnimations?.()[0]
    const alreadyElapsedMs =
      typeof barAnim?.currentTime === 'number' ? Math.max(0, barAnim.currentTime + 200) : 0
    const remainingIntroMs = Math.max(0, Math.round(MIN_INTRO_MS - alreadyElapsedMs))
    const remainingMaxMs = Math.max(remainingIntroMs + 200, Math.round(MAX_WAIT_MS - alreadyElapsedMs))

    const introTimer = window.setTimeout(() => {
      minIntroDone = true
      startExitIfReady(false)
    }, remainingIntroMs)

    const maxWaitTimer = window.setTimeout(() => {
      startExitIfReady(true)
    }, remainingMaxMs)

    window.addEventListener('wheel', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('touchmove', blockScrollEvent, { passive: false, capture: true })
    window.addEventListener('keydown', blockScrollKeys, { capture: true })
    window.addEventListener('scroll', keepAtTop, { passive: true })

    return () => {
      unsubStore()
      window.clearTimeout(introTimer)
      window.clearTimeout(maxWaitTimer)
      if (unlockAfterLiftTimer) window.clearTimeout(unlockAfterLiftTimer)
      if (exitFallbackTimer) window.clearTimeout(exitFallbackTimer)
      shellEl?.removeEventListener('animationend', onAnimationEnd)
      removeLockListeners()
    }
  }, [shellRef, preloaderSeen, setPreloaderOpen, dismissPreloader])
}
