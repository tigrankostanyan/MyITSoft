import { memo } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from '~/data/content'
import { useTranslations } from '~/store/ui-store'
import { MAPS_URL, SOCIALS } from './contactData'

/** Left column of the split contact card showing company details and socials. */
export const ContactInfoPanel = memo(function ContactInfoPanel() {
  const { t } = useTranslations()

  return (
    <div className="flex flex-col justify-between border-b border-white/10 bg-[#080d1b]/90 p-5 min-[380px]:p-7 sm:p-9 md:col-span-5 md:border-r md:border-b-0 lg:p-11">
      <div>
        <div className="font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#38bdf8] uppercase">
          {t.contactPage.infoEyebrow}
        </div>
        <h2 className="font-heading mt-2 text-2xl font-extrabold tracking-tight text-white">
          {t.contactPage.infoTitle}
        </h2>
        <p className="mt-2.5 text-xs leading-relaxed text-white/65 sm:text-sm">
          {t.contactPage.infoDesc}
        </p>

        <div className="mt-7 space-y-5">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1E47AD]/25 text-[#38bdf8] ring-1 ring-[#38bdf8]/30 shadow-lg shadow-[#1e40af]/20 transition group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <div className="font-heading text-sm font-bold text-white">
                {t.contactPage.headOffice}
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-white/65 transition group-hover:text-white sm:text-[13px]">
                {t.footer.address}
              </div>
            </div>
          </a>

          <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00e5ff]/15 text-[#00e5ff] ring-1 ring-[#00e5ff]/30 shadow-lg shadow-[#00e5ff]/10 transition group-hover:scale-105 group-hover:bg-[#00e5ff] group-hover:text-[#070b16]">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <div className="font-heading text-sm font-bold text-white">
                {t.contactPage.emailLabel}
              </div>
              <div className="mt-0.5 text-xs text-white/65 transition group-hover:text-[#38bdf8] sm:text-[13px]">
                {CONTACT_EMAIL}
              </div>
            </div>
          </a>

          <a href={`tel:${CONTACT_PHONE}`} className="group flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1E47AD]/25 text-[#38bdf8] ring-1 ring-[#38bdf8]/30 shadow-lg shadow-[#1e40af]/20 transition group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <div className="font-heading text-sm font-bold text-white">
                {t.contactPage.callUs}
              </div>
              <div className="mt-0.5 font-mono-tech text-xs font-medium text-white/80 transition group-hover:text-[#38bdf8] sm:text-[13px]">
                {CONTACT_PHONE_DISPLAY}
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="font-mono-tech text-[10px] font-bold tracking-[0.16em] text-white/60 uppercase">
          {t.contactPage.followUs}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={social.name}
              title={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white/70 transition hover:-translate-y-0.5 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/15 hover:text-[#38bdf8]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d={social.pathD} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})
