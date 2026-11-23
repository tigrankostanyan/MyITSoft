import { memo, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Compass, Layers, Mail, MessageCircleQuestion, Sparkles } from 'lucide-react'
import { NewsletterFooter } from '~/components/home/NewsletterFooter'
import { Navbar } from '~/components/shop/Navbar'
import { useTranslations, useUIStore } from '~/store/ui-store'

export const NotFoundPage = memo(function NotFoundPage() {
  const { t } = useTranslations()
  const navigate = useNavigate()

  useEffect(() => {
    useUIStore.getState().dismissPreloader()
  }, [])

  const handleJumpToHomeSection = (sectionId: string) => {
    void navigate({ to: '/' }).then(() => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 280)
    })
  }

  const quickLinks = [
    {
      id: 'shop',
      label: t.footer.navLinks.solutions,
      icon: Sparkles,
    },
    {
      id: 'services',
      label: t.footer.navLinks.services,
      icon: Layers,
    },
    {
      id: 'faq',
      label: t.footer.navLinks.faq,
      icon: MessageCircleQuestion,
    },
  ] as const

  return (
    <div className="bg-site-ambient relative flex min-h-screen flex-col overflow-x-clip text-white">
      <Navbar activePage="shop" onJumpTo={handleJumpToHomeSection} />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-28">
        {/* Top royal radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              'radial-gradient(ellipse 72% 75% at 50% 0%, rgba(37, 99, 235, 0.32) 0%, rgba(56, 189, 248, 0.14) 42%, rgba(15, 23, 42, 0) 78%)',
          }}
        />

        {/* Ambient concentric rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[340px] w-[340px] rounded-full border border-sky-300/[0.08] sm:h-[520px] sm:w-[520px]" />
          <div className="absolute inset-10 rounded-full border border-cyan-300/[0.07] sm:inset-16" />
          <div className="absolute inset-20 rounded-full border border-indigo-300/[0.06] sm:inset-32" />
        </div>

        {/* Center cyan orb blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-96 sm:w-96"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 229, 255, 0.18) 0%, rgba(37, 99, 235, 0.12) 48%, transparent 75%)',
          }}
        />

        <div className="site-container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1.5 font-mono-tech text-[10px] font-bold tracking-[0.2em] text-[#00e5ff] uppercase backdrop-blur-md sm:text-xs">
              <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '14s' }} aria-hidden="true" />
              <span>{t.notFound.badge}</span>
            </div>

            {/* Giant glowing 404 */}
            <div className="relative select-none">
              <div
                aria-hidden="true"
                className="font-display pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(5.5rem,20vw,12.5rem)] leading-none tracking-tight text-sky-400/20 blur-2xl"
              >
                {t.notFound.codeLabel}
              </div>
              <p className="font-display relative bg-gradient-to-b from-white via-sky-200 to-[#38bdf8] bg-clip-text text-[clamp(5.5rem,20vw,12.5rem)] leading-[0.92] tracking-tight text-transparent drop-shadow-[0_20px_50px_rgba(56,189,248,0.35)]">
                {t.notFound.codeLabel}
              </p>
            </div>

            {/* Title */}
            <h1 className="font-display mt-3 text-2xl tracking-tight text-white uppercase sm:mt-4 sm:text-4xl lg:text-5xl">
              {t.notFound.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-sky-200 via-[#00e5ff] to-indigo-200 bg-clip-text text-transparent">
                {t.notFound.titleHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sky-100/75 sm:text-base">
              {t.notFound.description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 min-[420px]:flex-row sm:mt-10 sm:gap-4">
              <Link
                to="/"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-heading text-xs font-extrabold tracking-[0.08em] text-[#0a1329] uppercase shadow-[0_14px_38px_-6px_rgba(56,189,248,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00e5ff] hover:text-[#041022] min-[420px]:w-auto sm:px-8 sm:py-4 sm:text-[13px]"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span>{t.notFound.backHome}</span>
              </Link>

              <Link
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-300/30 bg-[#0d1834]/80 px-7 py-3.5 font-heading text-xs font-bold tracking-[0.08em] text-white uppercase backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00e5ff]/60 hover:bg-[#132347] min-[420px]:w-auto sm:px-8 sm:py-4 sm:text-[13px]"
              >
                <Mail className="h-4 w-4 text-[#00e5ff]" aria-hidden="true" />
                <span>{t.notFound.contactUs}</span>
              </Link>
            </div>

            {/* Quick section pills */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b1328]/75 p-4 backdrop-blur-xl sm:mt-12 sm:p-5">
              <p className="font-mono-tech text-[10px] font-bold tracking-[0.2em] text-sky-200/60 uppercase">
                {t.notFound.quickLinksTitle}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {quickLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleJumpToHomeSection(item.id)}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-sky-100/85 transition-all duration-200 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/15 hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#38bdf8]" aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewsletterFooter onJumpTo={handleJumpToHomeSection} />
    </div>
  )
})
export default NotFoundPage
