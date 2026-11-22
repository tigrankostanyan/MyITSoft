import { memo } from 'react'
import { useTranslations } from '~/store/ui-store'
import { LAUNCH_STEPS } from './launchData'

interface LaunchStepsListProps {
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  badgeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  statusRef: React.RefObject<HTMLSpanElement | null>
}

export const LaunchStepsList = memo(function LaunchStepsList({
  stepRefs,
  badgeRefs,
  statusRef,
}: LaunchStepsListProps) {
  const { t } = useTranslations()
  return (
    <div className="relative z-20 flex flex-col justify-center">
      <div className="mb-1.5 inline-flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.16em] text-sky-300/75 uppercase min-[380px]:mb-2.5 sm:mb-4 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
        <span>{t.launch.eyebrow}</span>
      </div>

      <h2 className="font-display text-[clamp(1.45rem,5.2vw,4.35rem)] leading-[1.02] tracking-tight">
        <span className="text-white">{t.launch.titlePrimary} </span>
        <span className="text-[#7c89a6]">{t.launch.titleMuted}</span>
      </h2>

      <div className="mt-2.5 flex flex-col gap-2 min-[380px]:mt-3.5 min-[380px]:gap-2.5 sm:mt-7 sm:gap-5 lg:mt-11 lg:gap-8">
        {LAUNCH_STEPS.map((step, idx) => {
          const tr = t.launch.steps[idx]
          return (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[idx] = el
              }}
              className="group flex items-start gap-3 transition-opacity duration-300 sm:gap-4 lg:gap-5"
              style={{ opacity: idx === 0 ? 1 : 0.72 }}
            >
              <div
                ref={(el) => {
                  badgeRefs.current[idx] = el
                }}
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border font-display text-sm text-white transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-[13px] sm:text-lg lg:h-12 lg:w-12 lg:text-xl"
                style={{
                  background: step.badgeGradient,
                  borderColor: step.badgeBorder,
                  boxShadow: step.badgeGlow,
                }}
              >
                <span className="relative z-10">{step.number}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1.5 top-1 h-1/3 rounded-full bg-white/25 blur-[2px]"
                />
              </div>

              <div className="min-w-0 pt-0.5">
                <h3 className="font-heading text-sm font-bold leading-snug tracking-tight text-white sm:text-base lg:text-[19px]">
                  {tr?.title ?? step.title}
                </h3>
                <p className="mt-0.5 max-w-md text-[11px] leading-snug text-slate-300/70 sm:mt-1.5 sm:text-xs sm:leading-relaxed lg:text-sm">
                  {tr?.description ?? step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-3 min-[380px]:mt-3.5 sm:mt-7 lg:mt-10">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-[#38bdf8] to-transparent" />
          <span
            ref={statusRef}
            className="font-mono-tech text-[10px] tracking-[0.16em] text-sky-300/70 uppercase sm:text-[11px]"
          >
            {t.launch.scrollHint}
          </span>
        </div>
        <a
          href="#footer-audit"
          className="inline-flex items-center rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-4 py-1.5 font-heading text-[11px] font-bold tracking-[0.06em] text-white uppercase transition hover:border-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#070b16] sm:text-xs"
        >
          {t.launch.ctaButton}
        </a>
      </div>
    </div>
  )
})
