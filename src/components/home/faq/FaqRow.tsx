import { memo } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from './faqData'

interface FaqRowProps {
  item: FaqItem
  idx: number
  isLast: boolean
  isOpen: boolean
  onToggle: (idx: number) => void
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  lineRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const FaqRow = memo(function FaqRow({
  item,
  idx,
  isLast,
  isOpen,
  onToggle,
  rowRefs,
  lineRefs,
}: FaqRowProps) {
  return (
    <div
      ref={(el) => {
        rowRefs.current[idx] = el
      }}
      className="group relative will-change-transform"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => onToggle(idx)}
        className="flex w-full items-center justify-between gap-2.5 py-3 text-left transition-colors duration-200 min-[380px]:gap-4 min-[380px]:py-3.5 sm:gap-6 sm:py-4 lg:gap-7 lg:py-4 xl:py-[18px] cursor-pointer"
      >
        <div className="flex min-w-0 items-center gap-3 min-[380px]:gap-4 sm:gap-6 lg:gap-7">
          <span
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-sm tabular-nums transition-all duration-300 min-[380px]:h-11 min-[380px]:w-11 min-[380px]:text-base sm:h-12 sm:w-12 sm:text-lg lg:h-[54px] lg:w-[54px] lg:text-xl xl:h-[58px] xl:w-[58px] xl:text-[22px]"
            style={{
              borderColor: isOpen ? item.accent : 'rgba(186, 230, 253, 0.3)',
              backgroundColor: isOpen ? 'rgba(15, 25, 52, 0.96)' : 'rgba(8, 13, 28, 0.94)',
              color: isOpen ? '#ffffff' : 'rgba(224, 242, 254, 0.92)',
              boxShadow: isOpen
                ? `0 0 28px ${item.accent}60, inset 0 0 14px ${item.accent}28`
                : '0 6px 18px rgba(0,0,0,0.4)',
            }}
          >
            {item.num}
          </span>

          <h3
            className={`font-heading text-[13.5px] font-bold leading-snug tracking-tight transition-colors duration-200 min-[380px]:text-[15px] sm:text-lg lg:text-[20px] xl:text-[22px] ${
              isOpen ? 'text-white' : 'text-white/92 group-hover:text-sky-200'
            }`}
          >
            {item.q}
          </h3>
        </div>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-all duration-300 min-[380px]:h-5 min-[380px]:w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${
            isOpen ? 'rotate-180 text-[#00e5ff]' : 'text-white/60 group-hover:text-white/95'
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-3.5 pl-[48px] pr-2 text-xs leading-relaxed text-sky-100/80 min-[380px]:pl-[60px] min-[380px]:text-sm sm:pb-5 sm:pl-[72px] sm:pr-10 sm:text-[15px] lg:pl-[82px] lg:text-[16px] lg:leading-relaxed xl:pl-[86px]">
            {item.a}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="ml-[36px] min-[380px]:ml-[44px] sm:ml-[48px] lg:ml-[54px] xl:ml-[58px]">
          <div
            ref={(el) => {
              lineRefs.current[idx] = el
            }}
            className="h-px w-full origin-left"
            style={{
              background: isOpen
                ? `linear-gradient(90deg, ${item.accent}95, rgba(56,189,248,0.24), transparent)`
                : 'linear-gradient(90deg, rgba(186,230,253,0.34), rgba(148,163,184,0.16), transparent)',
            }}
          />
        </div>
      )}
    </div>
  )
})
