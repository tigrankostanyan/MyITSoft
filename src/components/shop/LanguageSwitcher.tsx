import { memo, useEffect, useRef, useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { LOCALE_LABELS, type Locale } from '~/i18n/types'
import { useTranslations } from '~/store/ui-store'

const LOCALES: Locale[] = ['en', 'hy', 'ru']

/** Compact header dropdown for switching between HY / RU / EN locales. */
export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { locale, setLocale } = useTranslations()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 items-center gap-1 rounded-xl border border-white/14 bg-white/[0.06] px-2.5 font-mono-tech text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md transition hover:border-[#38bdf8]/55 hover:bg-white/[0.12] min-[380px]:h-9 min-[380px]:gap-1.5 min-[380px]:px-3 min-[576px]:h-auto min-[576px]:rounded-full min-[576px]:px-3 min-[576px]:py-2 min-[576px]:text-[11px] cursor-pointer"
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
        <span className="sr-only">Language: </span>
        <span>{LOCALE_LABELS[locale]}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 text-white/60 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#00e5ff]' : ''
          }`}
        />
      </button>

      {open && (
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
                  void setLocale(code)
                  setOpen(false)
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
  )
})
