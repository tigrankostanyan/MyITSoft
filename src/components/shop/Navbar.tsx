import { memo, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { getCachedScrollY, getStableViewportWidth } from '~/lib/scroll-math'
import { useTranslations } from '~/store/ui-store'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NavbarBrand } from './NavbarBrand'
import { MobileBottomNav } from './MobileBottomNav'

interface NavbarProps {
  onJumpTo?: (id: string) => void
  activePage?: 'home' | 'shop'
  onSearchClick?: () => void
  onWishlistClick?: () => void
}

export const Navbar = memo(function Navbar({
  onJumpTo,
  activePage = 'home',
  onSearchClick,
  onWishlistClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)
  const { t } = useTranslations()

  useEffect(() => {
    const onScroll = () => {
      if (getStableViewportWidth() < 576) return
      const next = getCachedScrollY() > 36
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showGlassBar = activePage !== 'home' || scrolled

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 w-full max-w-full py-0 min-[576px]:py-3.5 sm:py-4">
        <div className="w-full min-[576px]:mx-auto min-[576px]:max-w-[1600px] min-[576px]:px-4 sm:px-8 lg:px-10">
          <nav
            aria-label={t.navbar.mainNavAria}
            className="relative flex min-h-[60px] items-center justify-between gap-2 px-3.5 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 min-[576px]:min-h-0 min-[576px]:gap-3 min-[576px]:rounded-full min-[576px]:px-2.5 min-[576px]:py-2 sm:px-3.5"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 border-b border-sky-400/20 bg-[#081024]/78 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[576px]:rounded-full min-[576px]:border min-[576px]:bg-[#081024]/52 min-[576px]:backdrop-blur-xl min-[576px]:backdrop-saturate-150 ${
                showGlassBar
                  ? 'min-[576px]:scale-100 min-[576px]:opacity-100 min-[576px]:border-sky-300/20 min-[576px]:bg-[#0a1329]/58 min-[576px]:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.16)]'
                  : 'min-[576px]:scale-[0.985] min-[576px]:opacity-0 min-[576px]:border-transparent min-[576px]:bg-transparent min-[576px]:shadow-none'
              }`}
            >
              <div className="absolute inset-x-10 top-0 hidden h-px bg-gradient-to-r from-transparent via-white/40 to-transparent min-[576px]:block" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/55 to-transparent min-[576px]:inset-x-16" />
            </div>

            <div className="relative z-10 flex items-center">
              {activePage === 'home' && onJumpTo ? (
                <button
                  type="button"
                  onClick={() => onJumpTo('hero')}
                  className="group flex items-center gap-2.5 rounded-full p-0 transition hover:bg-white/[0.06] min-[576px]:px-2 min-[576px]:py-1 sm:gap-3 cursor-pointer"
                >
                  <span className="sm:hidden">
                    <NavbarBrand compact />
                  </span>
                  <span className="hidden items-center gap-3 sm:flex">
                    <NavbarBrand />
                  </span>
                  <span className="sr-only"> — {t.navbar.backToTopAria}</span>
                </button>
              ) : (
                <Link
                  to="/"
                  className="group flex items-center gap-2.5 rounded-full p-0 transition hover:bg-white/[0.06] min-[576px]:px-2 min-[576px]:py-1 sm:gap-3"
                >
                  <span className="sm:hidden">
                    <NavbarBrand compact />
                  </span>
                  <span className="hidden items-center gap-3 sm:flex">
                    <NavbarBrand />
                  </span>
                  <span className="sr-only"> — {t.navbar.homeAria}</span>
                </Link>
              )}
            </div>

            <div
              className={`relative z-10 flex items-center gap-1.5 rounded-full p-0 transition-all duration-500 min-[576px]:p-1 sm:gap-1.5 ${
                showGlassBar
                  ? 'border border-transparent bg-transparent shadow-none'
                  : 'border border-transparent bg-transparent shadow-none min-[576px]:border-sky-300/15 min-[576px]:bg-[#0a1329]/55 min-[576px]:shadow-lg min-[576px]:shadow-black/25 min-[576px]:backdrop-blur-xl'
              }`}
            >
              <LanguageSwitcher />

              <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-white/15 min-[576px]:block" />

              <Link
                to="/contact"
                className="group hidden items-center gap-1.5 rounded-full border border-white/14 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white/90 transition-all duration-200 hover:border-[#38bdf8]/55 hover:bg-[#38bdf8]/15 hover:text-white min-[576px]:flex min-[576px]:px-3.5 min-[576px]:py-2 min-[576px]:text-xs"
              >
                <Mail className="h-3.5 w-3.5 text-[#38bdf8] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <span>{t.navbar.contact}</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <MobileBottomNav
        activePage={activePage}
        onJumpTo={onJumpTo}
        onSearchClick={onSearchClick}
        onWishlistClick={onWishlistClick}
      />
    </>
  )
})
