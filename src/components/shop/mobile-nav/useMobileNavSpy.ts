import { startTransition, useEffect, useRef, useState } from 'react'
import {
  getCachedScrollY,
  getStableViewportHeight,
  measureElementBounds,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import {
  ORB_SIZE,
  buildBarPath,
  buildTopStrokePath,
  computeNotchMetrics,
} from './notchGeometry'

export type BottomNavTab = 'home' | 'services' | 'contact'

interface UseMobileNavSpyArgs {
  isContactPage: boolean
  itemCount: number
  activeIndex: number
  navRef: React.RefObject<HTMLDivElement | null>
  fillPathRef: React.RefObject<SVGPathElement | null>
  clipPathRef: React.RefObject<SVGPathElement | null>
  strokePathRef: React.RefObject<SVGPathElement | null>
  orbRef: React.RefObject<HTMLDivElement | null>
  manualLockUntilRef: React.MutableRefObject<number>
  setSelectedTab: React.Dispatch<React.SetStateAction<BottomNavTab>>
}

const SPRING_STIFFNESS = 360
const SPRING_DAMPING = 30
const SPRING_MASS = 0.75

/** Manages zero-reflow section scroll-spy, resize width observation, and damped spring notch geometry. */
export function useMobileNavSpy({
  isContactPage,
  itemCount,
  activeIndex,
  navRef,
  fillPathRef,
  clipPathRef,
  strokePathRef,
  orbRef,
  manualLockUntilRef,
  setSelectedTab,
}: UseMobileNavSpyArgs) {
  const [barWidth, setBarWidth] = useState(300)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const springPosRef = useRef(activeIndex)
  const springVelRef = useRef(0)
  const targetIdxRef = useRef(activeIndex)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 575px)')
    const sync = () => setIsMobileViewport(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    setSelectedTab(isContactPage ? 'contact' : 'home')
  }, [isContactPage, setSelectedTab])

  useEffect(() => {
    if (isContactPage || !isMobileViewport) return

    let shopTop = Infinity
    let contactTop = Infinity
    let docHeight = 1
    let offsetsMeasured = false

    const measureOffsets = () => {
      offsetsMeasured = true
      const shopEl = document.getElementById('shop') ?? document.getElementById('services')
      const contactEl =
        document.getElementById('footer-audit') ?? document.querySelector('footer')

      shopTop = shopEl ? measureElementBounds(shopEl).top : Infinity
      contactTop = contactEl ? measureElementBounds(contactEl as HTMLElement).top : Infinity
      docHeight = document.documentElement.scrollHeight || 1
    }

    let spyRaf = 0
    const checkSections = () => {
      spyRaf = 0
      if (Date.now() < manualLockUntilRef.current) return
      if (!offsetsMeasured) measureOffsets()

      const scrollY = getCachedScrollY()
      const vh = getStableViewportHeight()
      const triggerY = scrollY + vh * 0.42

      if (triggerY >= contactTop || scrollY + vh >= docHeight - 100) {
        setSelectedTab((prev) => (prev === 'contact' ? prev : 'contact'))
        return
      }
      if (triggerY >= shopTop) {
        setSelectedTab((prev) => (prev === 'services' ? prev : 'services'))
        return
      }
      setSelectedTab((prev) => (prev === 'home' ? prev : 'home'))
    }

    const onScroll = () => {
      if (!spyRaf) {
        spyRaf = requestAnimationFrame(checkSections)
      }
    }

    if ((window.scrollY || 0) > 4) {
      checkSections()
    }

    const unsubLayout = subscribeLayoutChange(() => {
      if (offsetsMeasured) {
        measureOffsets()
        checkSections()
      }
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      unsubLayout()
      if (spyRaf) cancelAnimationFrame(spyRaf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isContactPage, isMobileViewport, manualLockUntilRef, setSelectedTab])

  useEffect(() => {
    const el = navRef.current
    if (!el || !isMobileViewport) return
    const applyWidth = (w: number) => {
      if (w > 0) {
        startTransition(() => setBarWidth((prev) => (prev === w ? prev : w)))
      }
    }
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width ?? el.clientWidth
        applyWidth(Math.round(w))
      })
      ro.observe(el)
      return () => ro.disconnect()
    }
    const update = () => applyWidth(el.clientWidth)
    const fallbackTimer = window.setTimeout(update, 180)
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.clearTimeout(fallbackTimer)
      window.removeEventListener('resize', update)
    }
  }, [navRef, isMobileViewport])

  useEffect(() => {
    if (!isMobileViewport) return
    targetIdxRef.current = activeIndex
    let rafId = 0
    let lastTime = performance.now()

    const applyGeometry = (idx: number) => {
      const { safeW, halfW, cx } = computeNotchMetrics(idx, barWidth, itemCount)
      const barPath = buildBarPath(safeW, cx, halfW)
      fillPathRef.current?.setAttribute('d', barPath)
      clipPathRef.current?.setAttribute('d', barPath)
      strokePathRef.current?.setAttribute('d', buildTopStrokePath(safeW, cx, halfW))
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${(cx - ORB_SIZE / 2).toFixed(2)}px, 0, 0)`
      }
    }

    const step = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now

      const target = targetIdxRef.current
      const disp = springPosRef.current - target
      const force = -SPRING_STIFFNESS * disp - SPRING_DAMPING * springVelRef.current
      springVelRef.current += (force / SPRING_MASS) * dt
      springPosRef.current += springVelRef.current * dt

      applyGeometry(springPosRef.current)

      if (Math.abs(springPosRef.current - target) < 0.0005 && Math.abs(springVelRef.current) < 0.0005) {
        springPosRef.current = target
        springVelRef.current = 0
        applyGeometry(target)
        rafId = 0
        return
      }
      rafId = requestAnimationFrame(step)
    }

    applyGeometry(springPosRef.current)
    if (Math.abs(springPosRef.current - activeIndex) >= 0.0005 || Math.abs(springVelRef.current) >= 0.0005) {
      rafId = requestAnimationFrame(step)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isMobileViewport, activeIndex, barWidth, itemCount, fillPathRef, clipPathRef, strokePathRef, orbRef])

  return barWidth
}
