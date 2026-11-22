import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from '~/data/content'
import { useCopyToClipboard } from '~/lib/useCopyToClipboard'
import { useTranslations } from '~/store/ui-store'

interface NewsletterFooterProps {
  onJumpTo?: (id: string) => void
}

const SERVICE_TARGETS = ['services', 'services', 'services', 'shop', 'services'] as const

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Movses+Khorenatsi+15,+Yerevan,+Armenia'
const MAPS_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=44.5065%2C40.1722%2C44.5198%2C40.1792&layer=mapnik&marker=40.1757%2C44.5131'

export const NewsletterFooter = memo(function NewsletterFooter({
  onJumpTo,
}: NewsletterFooterProps) {
  const { copied, copy } = useCopyToClipboard()
  const { t } = useTranslations()

  const navLinks = [
    { label: t.footer.navLinks.home, target: 'hero' },
    { label: t.footer.navLinks.solutions, target: 'shop' },
    { label: t.footer.navLinks.services, target: 'services' },
    // { label: t.footer.navLinks.team, target: 'team' },
    { label: t.footer.navLinks.faq, target: 'faq' },
  ]

  const handleNavClick = (target: string) => {
    if (onJumpTo) {
      onJumpTo(target)
      return
    }
    const el = document.getElementById(target)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050812] pt-14 pb-28 min-[576px]:pb-10 sm:pt-16">
      {/* Ambient top edge & glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            'radial-gradient(ellipse 68% 85% at 50% 0%, rgba(29, 78, 216, 0.2) 0%, rgba(29, 78, 216, 0.08) 42%, rgba(29, 78, 216, 0.02) 70%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent"
      />

      <div className="site-container relative z-10">
        {/* Top Brand + Quick Action Strip */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0c1630] p-2 shadow-lg shadow-[#1e40af]/30 ring-1 ring-white/15 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="/myitsoft-logo.png"
                alt="MyITSoft"
                className="h-full w-full object-contain"
              />
            </button>
            <div>
              <div className="font-display text-xl tracking-tight text-white sm:text-2xl">
                My<span className="text-[#38bdf8]">IT</span>Soft
              </div>
              <div className="mt-0.5 font-mono-tech text-[10px] tracking-[0.2em] text-[#38bdf8]/75 uppercase">
                TECHNOLOGY · STRATEGY · INNOVATION
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => copy(CONTACT_PHONE)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-white/90 transition hover:border-[#38bdf8]/45 hover:bg-white/[0.08] cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span className="font-mono-tech tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-white/40" />
              )}
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-heading text-xs font-bold tracking-[0.06em] text-[#070b16] uppercase shadow-lg shadow-white/10 transition hover:bg-[#38bdf8] hover:text-[#070b16]"
            >
              <span>{t.footer.ctaButton}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Balanced 4-Column Main Grid */}
        <div className="grid grid-cols-1 gap-10 py-11 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
              {t.footer.navHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.target)}
                    className="text-sm text-white/70 transition hover:text-[#38bdf8] cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/70 transition hover:text-[#38bdf8]"
                >
                  {t.footer.navLinks.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
              {t.footer.servicesHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.serviceLinks.map((label, idx) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(SERVICE_TARGETS[idx] ?? 'services')}
                    className="text-left text-sm text-white/70 transition hover:text-[#38bdf8] cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
              {t.footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                  <span className="font-mono-tech text-[13px] tabular-nums">
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#00e5ff]" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 transition hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf8]" />
                  <span className="leading-snug">{t.footer.address}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/50">
                <Clock className="h-4 w-4 shrink-0 text-white/35" />
                <span className="text-xs">{t.footer.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Compact Sleek Map */}
          <div className="lg:col-span-4">
            <div className="group relative h-[196px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-xl shadow-black/40">
              <iframe
                title={t.footer.mapTitle}
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-180 contrast-95 opacity-80 transition duration-500 group-hover:opacity-95"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050812]/80 via-transparent to-transparent" />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 rounded-xl border border-white/12 bg-[#0a1020]/85 px-3 py-2 text-xs text-white/90 backdrop-blur-md transition hover:border-[#38bdf8]/50 hover:bg-[#0f172a]"
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                  <span className="truncate">{t.footer.addressShort}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center border-t border-white/10 pt-6">
          <div className="text-center text-xs text-white/45">
            <span className="font-medium text-white/80">MyITSoft Company</span> · {t.footer.copyrightSuffix}
          </div>
        </div>
      </div>
    </footer>
  )
})
