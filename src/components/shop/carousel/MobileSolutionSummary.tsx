import { memo } from 'react'

interface MobileSolutionSummaryProps {
  title: string
  shortDesc: string
  ctaLabel: string
}

/** Compact active-slide summary card rendered below the stage on mobile/tablet. */
export const MobileSolutionSummary = memo(function MobileSolutionSummary({
  title,
  shortDesc,
  ctaLabel,
}: MobileSolutionSummaryProps) {
  return (
    <div className="mx-auto flex max-w-[360px] flex-col justify-between px-1 text-center lg:hidden">
      <h3 className="font-heading text-[16px] leading-snug font-bold tracking-tight text-white min-[380px]:text-[18px]">
        {title}
      </h3>

      <p className="mx-auto mt-1 line-clamp-2 max-w-[330px] text-[11.5px] leading-snug text-sky-100/72 min-[380px]:text-[12.5px]">
        {shortDesc}
      </p>

      <div className="mx-auto mt-3 flex w-full max-w-[260px] justify-center">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('footer-audit')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 font-heading text-[11px] font-bold whitespace-nowrap text-[#070d1e] uppercase shadow-[0_8px_24px_rgba(56,189,248,0.28)] transition hover:bg-[#38bdf8] cursor-pointer"
        >
          <span>{ctaLabel}</span>
        </button>
      </div>
    </div>
  )
})
