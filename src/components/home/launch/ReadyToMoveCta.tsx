import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useCartStore } from '~/store/cart-store'
import { useTranslations, useUIStore } from '~/store/ui-store'

const AuditSubscribeForm = memo(function AuditSubscribeForm({
  onSubscribed,
}: {
  onSubscribed: () => void
}) {
  const { t } = useTranslations()
  const [email, setEmail] = useState('')
  const applyPromo = useCartStore((s) => s.applyPromo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setEmail('')
    applyPromo('MYIT20')
    onSubscribed()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-7 flex w-full max-w-lg items-center gap-1.5 rounded-full border border-white/20 bg-[#0b1224]/75 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_30px_rgba(37,99,235,0.2)] backdrop-blur-xl transition-colors focus-within:border-sky-300/60 sm:mt-9 sm:gap-2 sm:p-2"
    >
      <input
        id="audit-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.launch.readyCta.placeholder}
        className="min-w-0 flex-1 bg-transparent px-3.5 py-2 font-mono-tech text-[11px] text-white placeholder:text-white/50 focus:outline-none sm:px-4 sm:text-xs"
      />
      <button
        type="submit"
        aria-label={t.launch.readyCta.submitLabel}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#0f172a] shadow-[0_0_20px_rgba(255,255,255,0.35)] transition hover:scale-105 hover:bg-[#00e5ff] sm:h-11 sm:w-11"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </form>
  )
})

/** Promo CTA with an interactive pill toggle and isolated email audit form. */
export const ReadyToMoveCta = memo(function ReadyToMoveCta() {
  const { t } = useTranslations()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [boosted, setBoosted] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const hasAutoEngaged = useRef(false)

  const setCartOpen = useUIStore((s) => s.setCartOpen)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let timerId: number | null = null
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAutoEngaged.current) {
          hasAutoEngaged.current = true
          timerId = window.setTimeout(() => setBoosted(true), 260)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timerId !== null) window.clearTimeout(timerId)
    }
  }, [])

  const handleSubscribed = useCallback(() => {
    setSubscribed(true)
    setBoosted(true)
  }, [])

  return (
    <div
      id="footer-audit"
      ref={sectionRef}
      className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden bg-[#060913] px-4 py-14 text-center sm:min-h-[76vh] sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-18%] mx-auto h-[540px] w-[min(1120px,100%)] rounded-full blur-[125px] transition-all duration-700"
        style={{
          opacity: boosted ? 0.95 : 0.48,
          transform: boosted ? 'scale(1.06)' : 'scale(0.92)',
          background:
            'radial-gradient(ellipse closest-side at 50% 55%, rgba(56, 189, 248, 0.42) 0%, rgba(37, 99, 235, 0.28) 38%, rgba(29, 78, 216, 0.12) 68%, transparent 100%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060913] to-transparent"
      />

      <div className="site-container relative z-10 flex flex-col items-center">
        <div className="mb-4 font-mono-tech text-[10px] tracking-[0.14em] text-[#00e5ff] uppercase sm:mb-5 sm:text-xs sm:tracking-[0.18em]">
          {t.launch.readyCta.eyebrow}
        </div>

        <h2 className="font-display flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2.5 text-[clamp(1.45rem,6.2vw,5.4rem)] leading-[1.06] tracking-tight text-white uppercase sm:gap-x-5 sm:gap-y-3">
          <span>{t.launch.readyCta.prefix}</span>

          <button
            type="button"
            role="switch"
            aria-checked={boosted}
            aria-label={t.launch.readyCta.switchHint}
            onClick={() => setBoosted((v) => !v)}
            className="group relative inline-flex h-[0.76em] w-[1.68em] shrink-0 cursor-pointer items-center rounded-full border p-[0.08em] align-middle transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
            style={{
              background: boosted
                ? 'linear-gradient(135deg, #00e5ff 0%, #2563eb 52%, #1d4ed8 100%)'
                : 'rgba(15, 23, 42, 0.92)',
              borderColor: boosted ? 'rgba(125, 211, 252, 0.85)' : 'rgba(148, 163, 184, 0.38)',
              boxShadow: boosted
                ? '0 0 38px rgba(56, 189, 248, 0.58), inset 0 2px 6px rgba(255, 255, 255, 0.45)'
                : 'inset 0 2px 10px rgba(0, 0, 0, 0.75)',
            }}
          >
            <motion.span
              layout
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 22,
                mass: 0.9,
              }}
              className="block h-[0.58em] w-[0.58em] rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
              style={{
                marginLeft: boosted ? 'auto' : '0',
                marginRight: boosted ? '0' : 'auto',
              }}
            />
          </button>

          <span className="bg-gradient-to-b from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            {t.launch.readyCta.suffix}
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-xs leading-relaxed text-white/75 sm:mt-6 sm:text-sm sm:leading-relaxed">
          {t.launch.readyCta.description}
        </p>

        {subscribed ? (
          <div className="mx-auto mt-7 flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-emerald-400/40 bg-black/50 p-4 backdrop-blur-xl sm:mt-9 sm:p-5">
            <div className="flex items-center gap-2 font-heading text-xs font-bold text-emerald-300 uppercase sm:text-sm">
              <Check className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span>{t.launch.readyCta.successTitle}</span>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="cursor-pointer rounded-full bg-white px-5 py-2 font-heading text-xs font-bold text-[#0f172a] uppercase transition hover:bg-[#00e5ff]"
            >
              {t.launch.readyCta.viewPackage}
            </button>
          </div>
        ) : (
          <>
            <AuditSubscribeForm onSubscribed={handleSubscribed} />
            <p className="mt-3 text-[11px] text-white/45 sm:text-xs">
              {t.launch.readyCta.responseHint}
            </p>
          </>
        )}
      </div>
    </div>
  )
})
