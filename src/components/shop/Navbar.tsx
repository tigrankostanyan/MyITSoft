import { memo, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Phone, Check, Copy, Mail, ChevronDown, Globe } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '~/data/content'
import { LOCALE_LABELS, type Locale } from '~/i18n/translations'
import { getCachedScrollY, getStableViewportWidth } from '~/lib/scroll-math'
import { useCopyToClipboard } from '~/lib/useCopyToClipboard'
import { useTranslations } from '~/store/ui-store'
import { NavbarBrand } from './NavbarBrand'
import { MobileBottomNav } from './MobileBottomNav'

const LOCALES: Locale[] = ['hy', 'ru', 'en']

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
  const [langOpen, setLangOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const scrolledRef = useRef(false)
  const { copied, copy } = useCopyToClipboard()
  const { locale, setLocale, t } = useTranslations()
  const handleCopyPhone = () => copy(CONTACT_PHONE)

  useEffect(() => {
    if (!langOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [langOpen])

  useEffect(() => {
    const onScroll = () => {
      if (getStableViewportWidth() < 576) return
      const next = getCachedScrollY() > 36
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }
    onScroll()
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
                  aria-label={t.navbar.backToTopAria}
                  className="group flex items-center gap-2.5 rounded-full p-0 transition hover:bg-white/[0.06] min-[576px]:px-2 min-[576px]:py-1 sm:gap-3 cursor-pointer"
                >
                  <span className="sm:hidden">
                    <NavbarBrand compact />
                  </span>
                  <span className="hidden items-center gap-3 sm:flex">
                    <NavbarBrand />
                  </span>
                </button>
              ) : (
                <Link
                  to="/"
                  aria-label={t.navbar.homeAria}
                  className="group flex items-center gap-2.5 rounded-full p-0 transition hover:bg-white/[0.06] min-[576px]:px-2 min-[576px]:py-1 sm:gap-3"
                >
                  <span className="sm:hidden">
                    <NavbarBrand compact />
                  </span>
                  <span className="hidden items-center gap-3 sm:flex">
                    <NavbarBrand />
                  </span>
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
              {/* Compact Language Select Dropdown */}
              <div ref={langMenuRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label="Language"
                  onClick={() => setLangOpen((v) => !v)}
                  className="inline-flex h-8 items-center gap-1 rounded-xl border border-white/14 bg-white/[0.06] px-2.5 font-mono-tech text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md transition hover:border-[#38bdf8]/55 hover:bg-white/[0.12] min-[380px]:h-9 min-[380px]:gap-1.5 min-[380px]:px-3 min-[576px]:h-auto min-[576px]:rounded-full min-[576px]:px-3 min-[576px]:py-2 min-[576px]:text-[11px] cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" />
                  <span>{LOCALE_LABELS[locale]}</span>
                  <ChevronDown
                    className={`h-3 w-3 shrink-0 text-white/60 transition-transform duration-200 ${
                      langOpen ? 'rotate-180 text-[#00e5ff]' : ''
                    }`}
                  />
                </button>

                {langOpen && (
                  <div
                    role="listbox"
                    aria-label="Language"
                    className="absolute top-[calc(100%+6px)] right-0 z-50 min-w-[92px] overflow-hidden rounded-xl border border-sky-300/25 bg-[#091226]/95 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl"
                  >
                    {LOCALES.map((code) => {
                      const isActive = locale === code
                      return (
                        <button
                          key={code}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setLocale(code)
                            setLangOpen(false)
                          }}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 font-mono-tech text-[10.5px] font-bold tracking-wider uppercase transition cursor-pointer ${
                            isActive
                              ? 'bg-[#38bdf8]/20 text-[#00e5ff]'
                              : 'text-white/75 hover:bg-white/[0.07] hover:text-white'
                          }`}
                        >
                          <span>{LOCALE_LABELS[code]}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-white/15 min-[576px]:block" />

              <Link
                to="/contact"
                className="group hidden items-center gap-1.5 rounded-full border border-white/14 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white/90 transition-all duration-200 hover:border-[#38bdf8]/55 hover:bg-[#38bdf8]/15 hover:text-white min-[576px]:flex min-[576px]:px-3.5 min-[576px]:py-2 min-[576px]:text-xs"
              >
                <Mail className="h-3.5 w-3.5 text-[#38bdf8] transition-transform duration-200 group-hover:scale-110" />
                <span>{t.navbar.contact}</span>
              </Link>

              <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-white/15 min-[576px]:block" />

              {/* Mobile Call Action Button — exact 36px height aligned with left logo */}
              <a
                href={`tel:${CONTACT_PHONE}`}
                aria-label={`${t.navbar.callAriaPrefix} ${CONTACT_PHONE_DISPLAY}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-sky-300/25 bg-white/[0.08] px-2.5 text-[10.5px] font-bold tracking-wide text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:border-[#38bdf8]/60 hover:bg-[#38bdf8]/15 min-[380px]:h-9 min-[380px]:gap-2 min-[380px]:px-3.5 min-[380px]:text-[11px] min-[576px]:hidden"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#00e5ff]" />
                <span>{t.navbar.call}</span>
              </a>

              {/* Desktop Copy Phone Number Pill */}
              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label={copied ? t.navbar.phoneCopiedAria : t.navbar.copyPhoneAria}
                title={copied ? t.navbar.copiedBadge : `${t.navbar.copyTitlePrefix} ${CONTACT_PHONE_DISPLAY}`}
                className={`group relative hidden min-[576px]:flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  copied
                    ? 'border border-emerald-400/60 bg-emerald-500/25 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.4)]'
                    : 'border border-white/16 bg-white/10 text-white/95 hover:border-[#38bdf8]/60 hover:bg-white/16 hover:text-white hover:shadow-[0_4px_18px_rgba(56,189,248,0.28)]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400 animate-in zoom-in-75 duration-200" />
                    <span className="font-mono-tech text-[10px] font-bold text-emerald-300 min-[360px]:text-[11px]">
                      {t.navbar.copiedBadge}
                    </span>
                  </>
                ) : (
                  <>
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#00e5ff] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="font-mono-tech text-[10px] font-medium tracking-tight tabular-nums whitespace-nowrap min-[360px]:text-[11px] min-[360px]:tracking-wide min-[576px]:text-xs">
                      {CONTACT_PHONE_DISPLAY}
                    </span>
                    <Copy className="hidden h-3 w-3 text-white/45 transition-colors duration-200 group-hover:text-white min-[900px]:inline-block" />
                  </>
                )}
              </button>
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
