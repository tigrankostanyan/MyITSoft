import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Check, Copy, Phone } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '~/data/content'
import { useCopyToClipboard } from '~/lib/useCopyToClipboard'

interface FooterBrandStripProps {
  ctaButtonLabel: string
  onScrollTop: () => void
}

/** Top brand identity and quick phone/CTA strip inside the footer. */
export const FooterBrandStrip = memo(function FooterBrandStrip({
  ctaButtonLabel,
  onScrollTop,
}: FooterBrandStripProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onScrollTop}
          aria-label="MyITSoft"
          className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0c1630] p-2 shadow-lg shadow-[#1e40af]/30 ring-1 ring-white/15 transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <img
            src="/myitsoft-logo.webp"
            alt="MyITSoft"
            width={96}
            height={78}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </button>
        <div>
          <div className="font-display text-xl tracking-tight text-white sm:text-2xl">
            My<span className="text-[#38bdf8]">IT</span>Soft
          </div>
          <div className="mt-0.5 font-mono-tech text-[10px] tracking-[0.2em] text-[#38bdf8]/80 uppercase">
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
          <Phone className="h-3.5 w-3.5 text-[#38bdf8]" aria-hidden="true" />
          <span className="font-mono-tech tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-white/50" aria-hidden="true" />
          )}
        </button>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-heading text-xs font-bold tracking-[0.06em] text-[#070b16] uppercase shadow-lg shadow-white/10 transition hover:bg-[#38bdf8] hover:text-[#070b16]"
        >
          <span>{ctaButtonLabel}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
})
