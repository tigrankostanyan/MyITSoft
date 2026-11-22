import { memo, useCallback, useRef, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Home, Layers, Mail } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'
import { MobileDockSvg } from './mobile-nav/MobileDockSvg'
import {
  SIDE_PAD,
  buildBarPath,
  buildTopStrokePath,
  computeNotchMetrics,
} from './mobile-nav/notchGeometry'
import { type BottomNavTab, useMobileNavSpy } from './mobile-nav/useMobileNavSpy'

interface MobileBottomNavProps {
  activePage?: 'home' | 'shop'
  onJumpTo?: (id: string) => void
  onSearchClick?: () => void
  onWishlistClick?: () => void
}

const NAV_ITEMS: {
  id: BottomNavTab
  icon: typeof Home
}[] = [
  { id: 'home', icon: Home },
  { id: 'services', icon: Layers },
  { id: 'contact', icon: Mail },
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
  const navRef = useRef<HTMLDivElement>(null)
  const fillPathRef = useRef<SVGPathElement>(null)
  const clipPathRef = useRef<SVGPathElement>(null)
  const strokePathRef = useRef<SVGPathElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const manualLockUntilRef = useRef(0)

  const activeTab: BottomNavTab = isContactPage ? 'contact' : selectedTab
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeTab),
  )

  const barWidth = useMobileNavSpy({
    isContactPage,
    itemCount: NAV_ITEMS.length,
    activeIndex,
    navRef,
    fillPathRef,
    clipPathRef,
    strokePathRef,
    orbRef,
    manualLockUntilRef,
    setSelectedTab,
  })

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
      orbTransform: `translate3d(${(cx - 23).toFixed(2)}px, 0, 0)`,
    }
  }

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
            document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' })
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
      <div ref={navRef} className="relative h-[82px] w-full bg-transparent">
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

        <MobileDockSvg
          barWidth={barWidth}
          initialFill={initialMetrics.current.fill}
          initialStroke={initialMetrics.current.stroke}
          fillPathRef={fillPathRef}
          clipPathRef={clipPathRef}
          strokePathRef={strokePathRef}
        />

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
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleSelect(item.id)}
                className="relative flex flex-col items-center justify-end pb-2.5 focus:outline-none cursor-pointer"
              >
                <span
                  className={`mb-1 flex h-8 w-8 items-center justify-center transition-[transform,color] duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] ${
                    isActive
                      ? '-translate-y-[19px] scale-[1.08] text-[#1d4ed8]'
                      : 'translate-y-0 scale-100 text-sky-100/70'
                  }`}
                >
                  <Icon
                    className="h-[20px] w-[20px]"
                    strokeWidth={isActive ? 2.25 : 1.75}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={`text-[10.5px] leading-[14px] tracking-tight whitespace-nowrap transition-opacity duration-200 ${
                    isActive
                      ? 'font-bold text-white opacity-100'
                      : 'font-medium text-sky-100/75 opacity-80'
                  }`}
                >
                  {itemLabel}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
})
