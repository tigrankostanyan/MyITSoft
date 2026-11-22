import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { MAPS_URL } from '~/components/contact/contactData'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from '~/data/content'
import { useTranslations } from '~/store/ui-store'
import { FooterBrandStrip } from './footer/FooterBrandStrip'
import { FooterMapCard } from './footer/FooterMapCard'

interface NewsletterFooterProps {
  onJumpTo?: (id: string) => void
}

const SERVICE_TARGETS = ['services', 'services', 'services', 'shop', 'services'] as const

export const NewsletterFooter = memo(function NewsletterFooter({
  onJumpTo,
}: NewsletterFooterProps) {
  const { t } = useTranslations()

  const navLinks = [
    { label: t.footer.navLinks.home, target: 'hero' },
    { label: t.footer.navLinks.solutions, target: 'shop' },
    { label: t.footer.navLinks.services, target: 'services' },
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
        <FooterBrandStrip
          ctaButtonLabel={t.footer.ctaButton}
          onScrollTop={() => handleNavClick('hero')}
        />

        <div className="grid grid-cols-1 gap-10 py-11 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase">
              {t.footer.navHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.target)}
                    className="text-sm text-white/75 transition hover:text-[#38bdf8] cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/75 transition hover:text-[#38bdf8]"
                >
                  {t.footer.navLinks.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase">
              {t.footer.servicesHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.serviceLinks.map((label, idx) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(SERVICE_TARGETS[idx] ?? 'services')}
                    className="text-left text-sm text-white/75 transition hover:text-[#38bdf8] cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase">
              {t.footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#38bdf8]" aria-hidden="true" />
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
                  <Mail className="h-4 w-4 shrink-0 text-[#00e5ff]" aria-hidden="true" />
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
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf8]" aria-hidden="true" />
                  <span className="leading-snug">{t.footer.address}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/60">
                <Clock className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span className="text-xs">{t.footer.workingHours}</span>
              </li>
            </ul>
          </div>

          <FooterMapCard
            mapTitle={t.footer.mapTitle}
            addressShort={t.footer.addressShort}
          />
        </div>

        <div className="flex flex-col items-center justify-center border-t border-white/10 pt-6">
          <div className="text-center text-xs text-white/60">
            Copyright 2020-2027{' '}
            <span className="font-medium text-white/85">&ldquo;MyITSoft&rdquo; Company</span> | All
            Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
})
export default NewsletterFooter
