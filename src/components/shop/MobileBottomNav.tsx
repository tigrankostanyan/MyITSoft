import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useMotionValue, useSpring, motion } from 'framer-motion'
import { Home, Layers, Mail, Users } from 'lucide-react'
import {
  getCachedScrollY,
  getStableViewportHeight,
  measureElementBounds,
  subscribeLayoutChange,
} from '~/lib/scroll-math'
import { useTranslations } from '~/store/ui-store'

type BottomNavTab = 'home' | 'services' | 'team' | 'contact'

interface MobileBottomNavProps {
  activePage?: 'home' | 'shop'
  onJumpTo?: (id: string) => void
  onSearchClick?: () => void
  onWishlistClick?: () => void
}

const BAR_HEIGHT = 82
const TOP_Y = 22
const VALLEY_DEPTH = 50
const ORB_SIZE = 46
const CORNER_R = 14
const SIDE_PAD = 12
const EDGE_MIN = 6

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

function buildBarPath(width: number, cx: number, halfW: number) {
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

function buildTopStrokePath(width: number, cx: number, halfW: number) {
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

function computeNotchMetrics(idx: number, width: number, itemCount: number) {
  const safeW = Math.max(240, width)
  const innerW = Math.max(216, safeW - SIDE_PAD * 2)
  const slotW = innerW / itemCount
  const cx = SIDE_PAD + (idx + 0.5) * slotW
  const maxSymHalfW = Math.min(cx - EDGE_MIN, safeW - cx - EDGE_MIN)
  const halfW = Math.max(36, Math.min(44, maxSymHalfW))
  return { safeW, halfW, cx }
}

const NAV_ITEMS: {
  id: BottomNavTab
  label: string
  icon: typeof Home
}[] = [
  { id: 'home', label: 'Գլխավոր', icon: Home },
  { id: 'services', label: 'Լուծումներ', icon: Layers },
  // { id: 'team', label: 'Թիմը', icon: Users },
  { id: 'contact', label: 'Կապ', icon: Mail },
]

export const MobileBottomNav = memo(function MobileBottomNav({
  onJumpTo,
}: MobileBottomNavProps) {
  const { t } = useTranslations()
  const location = useLocation()
  const navigate = useNavigate()
  const isContactPage = location.pathname.startsWith('/contact')

  const [selectedTab, setSelectedTab] = useState<BottomNavTab>(
    isContactPage ? 'contact' : 'home',
  )
  const [barWidth, setBarWidth] = useState(300)
  const navRef = useRef<HTMLDivElement>(null)
  const fillPathRef = useRef<SVGPathElement>(null)
  const clipPathRef = useRef<SVGPathElement>(null)
  const strokePathRef = useRef<SVGPathElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const manualLockUntilRef = useRef(0)

  // Keep active tab synced with route changes only
  useEffect(() => {
    setSelectedTab(isContactPage ? 'contact' : 'home')
  }, [isContactPage])

  // Zero-reflow cached scroll-spy on the home page
  useEffect(() => {
    if (isContactPage) return

    let shopTop = Infinity
    let teamTop = Infinity
    let contactTop = Infinity
    let docHeight = 1

    const measureOffsets = () => {
      const shopEl = document.getElementById('shop') ?? document.getElementById('services')
      const teamEl = document.getElementById('team')
      const contactEl =
        document.getElementById('footer-audit') ?? document.querySelector('footer')

      shopTop = shopEl ? measureElementBounds(shopEl).top : Infinity
      teamTop = teamEl ? measureElementBounds(teamEl).top : Infinity
      contactTop = contactEl ? measureElementBounds(contactEl as HTMLElement).top : Infinity
      docHeight = document.documentElement.scrollHeight || 1
    }

    let spyRaf = 0
    const checkSections = () => {
      spyRaf = 0
      if (Date.now() < manualLockUntilRef.current) return

      const scrollY = getCachedScrollY()
      const vh = getStableViewportHeight()
      const triggerY = scrollY + vh * 0.42

      if (triggerY >= contactTop || scrollY + vh >= docHeight - 100) {
        setSelectedTab((prev) => (prev === 'contact' ? prev : 'contact'))
        return
      }
      if (triggerY >= teamTop) {
        setSelectedTab((prev) => (prev === 'team' ? prev : 'team'))
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

    measureOffsets()
    checkSections()
    const settleTimer = window.setTimeout(() => {
      measureOffsets()
      checkSections()
    }, 300)
    const unsubLayout = subscribeLayoutChange(() => {
      measureOffsets()
      checkSections()
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(settleTimer)
      unsubLayout()
      if (spyRaf) cancelAnimationFrame(spyRaf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isContactPage])

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const update = () => {
      const next = el.getBoundingClientRect().width || el.clientWidth
      if (next > 0) setBarWidth(next)
    }
    update()
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const activeTab: BottomNavTab = isContactPage ? 'contact' : selectedTab
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeTab),
  )

  const indexMotion = useMotionValue(activeIndex)
  const smoothIndex = useSpring(indexMotion, {
    stiffness: 360,
    damping: 30,
    mass: 0.75,
  })

  useEffect(() => {
    indexMotion.set(activeIndex)
  }, [activeIndex, indexMotion])

  const initialMetrics = useRef<{
    fill: string
    stroke: string
    orbTransform: string
  } | null>(null)
  if (initialMetrics.current === null) {
    const { safeW, halfW, cx } = computeNotchMetrics(
      activeIndex,
      barWidth,
      NAV_ITEMS.length,
    )
    initialMetrics.current = {
      fill: buildBarPath(safeW, cx, halfW),
      stroke: buildTopStrokePath(safeW, cx, halfW),
      orbTransform: `translate3d(${(cx - ORB_SIZE / 2).toFixed(2)}px, 0, 0)`,
    }
  }

  useEffect(() => {
    const applyGeometry = (idx: number, width: number) => {
      const { safeW, halfW, cx } = computeNotchMetrics(
        idx,
        width,
        NAV_ITEMS.length,
      )
      const barPath = buildBarPath(safeW, cx, halfW)
      fillPathRef.current?.setAttribute('d', barPath)
      clipPathRef.current?.setAttribute('d', barPath)
      strokePathRef.current?.setAttribute(
        'd',
        buildTopStrokePath(safeW, cx, halfW),
      )
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${(cx - ORB_SIZE / 2).toFixed(2)}px, 0, 0)`
      }
    }

    applyGeometry(smoothIndex.get(), barWidth)
    return smoothIndex.on('change', (idx) => applyGeometry(idx, barWidth))
  }, [barWidth, smoothIndex])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (onJumpTo) {
        onJumpTo(sectionId)
        return
      }
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [onJumpTo],
  )

  const handleSelect = (id: BottomNavTab) => {
    manualLockUntilRef.current = Date.now() + 1200
    setSelectedTab(id)

    if (id === 'contact') {
      if (isContactPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        void navigate({ to: '/contact' })
      }
      return
    }

    const targetSection = id === 'home' ? 'hero' : id

    if (isContactPage) {
      void navigate({ to: '/' }).then(() => {
        if (targetSection !== 'hero') {
          window.setTimeout(() => {
            document
              .getElementById(targetSection)
              ?.scrollIntoView({ behavior: 'smooth' })
          }, 260)
        }
      })
      return
    }

    scrollToSection(targetSection)
  }

  return (
    <nav
      aria-label={t.navbar.mobileNavAria}
      className="fixed right-0 bottom-0 left-0 z-50 w-full max-w-full overflow-x-clip pt-3 min-[576px]:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background:
          'linear-gradient(to top, rgba(7, 13, 30, 0.68) env(safe-area-inset-bottom, 0px), transparent env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        ref={navRef}
        className="relative h-[82px] w-full bg-transparent"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 backdrop-blur-sm"
          style={{
            clipPath: 'url(#mobileDockClip)',
            WebkitClipPath: 'url(#mobileDockClip)',
            background:
              'linear-gradient(180deg, rgba(9, 17, 38, 0.86) 0%, rgba(6, 11, 26, 0.94) 100%)',
          }}
        />

        <svg
          height={BAR_HEIGHT}
          viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <clipPath id="mobileDockClip" clipPathUnits="userSpaceOnUse">
              <path ref={clipPathRef} d={initialMetrics.current.fill} />
            </clipPath>
            <linearGradient id="mobileDockFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f44" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#070d1e" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="mobileDockStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(56,189,248,0.22)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.8)" />
              <stop offset="100%" stopColor="rgba(0,229,255,0.48)" />
            </linearGradient>
          </defs>
          <path
            ref={fillPathRef}
            d={initialMetrics.current.fill}
            fill="url(#mobileDockFill)"
          />
          <path
            ref={strokePathRef}
            d={initialMetrics.current.stroke}
            fill="none"
            stroke="url(#mobileDockStroke)"
            strokeWidth="1.35"
          />
        </svg>

        {/* Floating circular active medallion */}
        <div
          ref={orbRef}
          aria-hidden="true"
          style={{ transform: initialMetrics.current.orbTransform }}
          className="pointer-events-none absolute -top-[4px] left-0 z-10 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(37,99,235,0.52),0_0_14px_rgba(56,189,248,0.34)] ring-[2px] ring-[#38bdf8]/45 will-change-transform"
        >
          <span className="pointer-events-none absolute inset-[2.5px] rounded-full bg-gradient-to-b from-white via-[#f5faff] to-[#e0f2fe]" />
        </div>

        <div
          className="relative z-20 grid h-full grid-cols-3"
          style={{ paddingInline: `${SIDE_PAD}px` }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeTab
            const itemLabel = t.navbar.mobileTabs[item.id]

            return (
              <button
                key={item.id}
                type="button"
                aria-label={itemLabel}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleSelect(item.id)}
                className="relative flex flex-col items-center justify-end pb-2.5 focus:outline-none cursor-pointer"
              >
                <motion.span
                  animate={{
                    y: isActive ? -19 : 0,
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  className={`mb-1 flex h-8 w-8 items-center justify-center transition-colors duration-200 ${
                    isActive ? 'text-[#1d4ed8]' : 'text-sky-100/55'
                  }`}
                >
                  <Icon
                    className="h-[20px] w-[20px]"
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />
                </motion.span>
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.62,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`text-[10.5px] leading-[14px] tracking-tight whitespace-nowrap ${
                    isActive
                      ? 'font-bold text-white'
                      : 'font-medium text-sky-100/55'
                  }`}
                >
                  {itemLabel}
                </motion.span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
})
