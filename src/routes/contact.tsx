import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Lenis from 'lenis'
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Navbar } from '~/components/shop/Navbar'
import { NewsletterFooter } from '~/components/home/NewsletterFooter'
import { useTranslations, useUIStore } from '~/store/ui-store'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from '~/data/content'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Կապ մեզ հետ — MyITSoft' },
      {
        name: 'description',
        content:
          'Կապվեք MyITSoft-ի հետ՝ վեբ կայքերի, մոբայլ հավելվածների, բիզնեսի ավտոմատացման և AI լուծումների համար։ Երևան, Մովսես Խորենացի փող. 15։',
      },
    ],
  }),
  component: ContactPage,
})

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Movses+Khorenatsi+15,+Yerevan,+Armenia'
const MAPS_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=44.5045%2C40.1715%2C44.5218%2C40.1800&layer=mapnik&marker=40.1757%2C44.5131'

const SOCIALS = [
  {
    name: 'Facebook',
    href: '#facebook',
    svg: (
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/myitsoft/',
    svg: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    ),
  },
  {
    name: 'LinkedIn',
    href: '#linkedin',
    svg: (
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/+37455333525',
    svg: (
      <path d="M20.665 3.717 2.935 10.554c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434Z" />
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@MyITSoft',
    svg: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    ),
  },
] as const

function ContactPage() {
  const { t } = useTranslations()
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    useUIStore.getState().dismissPreloader()
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchInertiaExponent: 1.7,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className="bg-site-ambient min-h-screen overflow-x-clip text-white">
      <Navbar activePage="shop" />

      {/* Top Royal Hero Banner with Diagonal Cut into Dark Site Background */}
      <section className="bg-royal-hero relative overflow-hidden pt-32 pb-44 text-center sm:pt-36 sm:pb-52">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[440px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 78% at 50% 0%, rgba(56, 189, 248, 0.24) 0%, rgba(56, 189, 248, 0.1) 42%, rgba(56, 189, 248, 0.025) 70%, transparent 100%)',
          }}
        />

        <div className="site-container relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#7dd3fc] uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff]" />
            <span>MYITSOFT · CONTACT</span>
          </div>
          <h1 className="font-display text-3xl tracking-tight text-white uppercase sm:text-5xl">
            {t.contactPage.title}
          </h1>
          <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-sky-100/80 sm:text-base">
            {t.contactPage.subtitle}
          </p>
        </div>

        {/* Diagonal dark cut matching the site ambient background */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-14 w-full sm:h-20"
        >
          <polygon points="0,90 1440,12 1440,90" fill="#0d1220" />
        </svg>
      </section>

      {/* Floating Dark Glass Split Contact Card */}
      <section className="relative z-20 -mt-32 pb-16 sm:-mt-36 sm:pb-24">
        <div className="site-container">
          <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/12 bg-[#0b1122]/90 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(56,189,248,0.08)] backdrop-blur-2xl md:grid-cols-12">
            {/* Left Panel: Contact Info */}
            <div className="flex flex-col justify-between border-b border-white/10 bg-[#080d1b]/90 p-5 min-[380px]:p-7 sm:p-9 md:col-span-5 md:border-r md:border-b-0 lg:p-11">
              <div>
                <div className="font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#38bdf8] uppercase">
                  {t.contactPage.infoEyebrow}
                </div>
                <h2 className="font-heading mt-2 text-2xl font-extrabold tracking-tight text-white">
                  {t.contactPage.infoTitle}
                </h2>
                <p className="mt-2.5 text-xs leading-relaxed text-white/60 sm:text-sm">
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

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="group flex items-start gap-4"
                  >
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

                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="group flex items-start gap-4"
                  >
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
                <div className="font-mono-tech text-[10px] font-bold tracking-[0.16em] text-white/50 uppercase">
                  {t.contactPage.followUs}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        social.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white/70 transition hover:-translate-y-0.5 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/15 hover:text-[#38bdf8]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        {social.svg}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Message Form */}
            <div className="bg-[#0d1426]/85 p-5 min-[380px]:p-7 sm:p-9 md:col-span-7 lg:p-11">
              <div className="font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#00e5ff] uppercase">
                {t.contactPage.formEyebrow}
              </div>
              <h2 className="font-heading mt-2 text-2xl font-extrabold tracking-tight text-white">
                {t.contactPage.formTitle}
              </h2>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                  <h3 className="font-heading mt-3 text-lg font-bold text-white">
                    {t.contactPage.sentTitle}
                  </h3>
                  <p className="mt-1.5 text-sm text-emerald-200/80">
                    {t.contactPage.sentDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#070b16] transition hover:bg-[#38bdf8] cursor-pointer"
                  >
                    {t.contactPage.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold text-white/75"
                      >
                        {t.contactPage.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t.contactPage.namePlaceholder}
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="mb-1.5 block text-xs font-semibold text-white/75"
                      >
                        {t.contactPage.companyLabel}
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={t.contactPage.companyPlaceholder}
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="mb-1.5 block text-xs font-semibold text-white/75"
                      >
                        {t.contactPage.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+374 XX XXX XXX"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold text-white/75"
                      >
                        {t.contactPage.emailFieldLabel}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@mail.ru"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-semibold text-white/75"
                    >
                      {t.contactPage.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={t.contactPage.subjectPlaceholder}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold text-white/75"
                    >
                      {t.contactPage.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t.contactPage.messagePlaceholder}
                      className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E47AD] to-[#2563eb] px-6 py-3.5 font-heading text-sm font-bold text-white shadow-lg shadow-[#2563eb]/35 transition hover:from-[#2563eb] hover:to-[#38bdf8] hover:text-[#070b16] cursor-pointer"
                  >
                    <span>{t.contactPage.submitButton}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Dark Map Section */}
      <section className="relative h-[380px] w-full border-t border-white/10 bg-[#070b16] sm:h-[440px]">
        <iframe
          title={t.footer.mapTitle}
          src={MAPS_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-180 contrast-95 opacity-85"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d1220]/50 via-transparent to-[#050812]/65" />

        <div className="absolute top-4 right-4 left-4 z-10 max-w-xs rounded-2xl border border-white/15 bg-[#0b1122]/90 p-4 shadow-2xl backdrop-blur-xl sm:top-6 sm:right-auto sm:left-6">
          <div className="flex items-center gap-2 font-heading text-sm font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
            <span>MyITSoft</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/65">
            {t.footer.address}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#38bdf8] transition hover:text-[#00e5ff]"
          >
            <span>{t.contactPage.openInMaps}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <NewsletterFooter />
    </div>
  )
}
