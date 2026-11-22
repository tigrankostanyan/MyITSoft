import { memo } from 'react'

interface BuildStageCaptionProps {
  stages: readonly string[]
  stageCaptionRef: React.RefObject<HTMLDivElement | null>
  stageStepRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
  stageDotRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

/** Floating process stage indicator pill beneath the 3D browser frame. */
export const BuildStageCaption = memo(function BuildStageCaption({
  stages,
  stageCaptionRef,
  stageStepRefs,
  stageDotRefs,
}: BuildStageCaptionProps) {
  return (
    <div
      ref={stageCaptionRef}
      className="pointer-events-none absolute right-0 -bottom-11 left-0 flex items-center justify-center md:-bottom-14"
    >
      <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-sky-300/25 bg-[#0a1022]/85 px-3 py-1.5 font-mono-tech text-[9px] tracking-[0.06em] uppercase shadow-[0_14px_34px_rgba(2,6,23,0.75)] backdrop-blur-md md:gap-4 md:px-6 md:py-2.5 md:text-[13px] md:tracking-[0.12em]">
        {stages.map((label, idx) => (
          <span
            key={idx}
            ref={(el) => {
              stageStepRefs.current[idx] = el
            }}
            className="inline-flex items-center gap-1 transition-all duration-300 md:gap-2"
          >
            <span
              ref={(el) => {
                stageDotRefs.current[idx] = el
              }}
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 md:h-2 md:w-2"
            />
            <span>{label}</span>
          </span>
        ))}
      </div>
    </div>
  )
})
