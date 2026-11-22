import { useEffect, useState } from 'react'
import { CheckCircle2, ShieldCheck, Sparkles, Truck, X } from 'lucide-react'
import { useUIStore } from '~/store/ui-store'

function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  )
}

export function AuthModal() {
  const open = useUIStore((s) => s.authModalOpen)
  const setOpen = useUIStore((s) => s.setAuthModalOpen)
  const [googleClicked, setGoogleClicked] = useState(false)

  useEffect(() => {
    if (!open) {
      setGoogleClicked(false)
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      className="animate-modal-fade fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-pop relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/15 bg-[#191929]/95 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#5c4aff]/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <button
          type="button"
          aria-label="Փակել պատուհանը"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/75 transition hover:border-white/30 hover:bg-white/15 hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-white/95 p-2 shadow-xl shadow-[#2563eb]/45 ring-1 ring-white/35">
            <img
              src="/myitsoft-logo.webp"
              alt="MyITSoft"
              width={192}
              height={155}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/35 bg-[#2563eb]/20 px-3 py-1 font-mono-tech text-[10px] font-bold tracking-[0.16em] text-[#bae6fd]">
            <Sparkles className="h-3 w-3 text-[#00e5ff]" aria-hidden="true" />
            MyITSoft ՊՈՐՏԱԼ
          </span>

          <h2
            id="auth-modal-title"
            className="font-display mt-3.5 text-2xl tracking-tight text-white sm:text-[26px]"
          >
            Մուտք և Գրանցում
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
            Միացեք մեկ սեղմումով՝ ձեր նախագծերին, հաշիվներին և տեխնիկական աջակցությանը
            հետևելու համար։
          </p>

          <button
            type="button"
            onClick={() => setGoogleClicked(true)}
            className="group mt-7 flex h-13 w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-bold text-[#161622] shadow-[0_10px_28px_rgba(255,255,255,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f4f3ff] hover:shadow-[0_14px_34px_rgba(124,108,255,0.35)] active:translate-y-0 cursor-pointer"
          >
            <GoogleIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span>Շարունակել Google-ով</span>
          </button>

          {googleClicked && (
            <div className="mt-3.5 w-full overflow-hidden">
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/12 px-3.5 py-2.5 text-left text-xs text-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>
                  Google մուտքը պատրաստ է ինտեգրման․ բեքենդը միացնելուց հետո ավտորիզացիան
                  կաշխատի անմիջապես։
                </span>
              </div>
            </div>
          )}

          <div className="mt-6 grid w-full grid-cols-1 gap-2.5 min-[360px]:grid-cols-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4f3bff]/20 text-[#a99eff]">
                <Truck className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white">Արագ պատվեր</div>
                <div className="text-[11px] text-white/60">Պահված հասցեներ</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff]/15 text-[#00e5ff]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white">Ապահով մուտք</div>
                <div className="text-[11px] text-white/60">Google OAuth 2.0</div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-relaxed text-white/55">
            Շարունակելով՝ դուք համաձայնում եք «MyIT»-ի օգտագործման պայմաններին և
            գաղտնիության քաղաքականությանը։
          </p>
        </div>
      </div>
    </div>
  )
}
