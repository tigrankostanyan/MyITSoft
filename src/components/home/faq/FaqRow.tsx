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
        className="flex w-full items-center justify-between gap-2.5 py-3.5 text-left transition-colors duration-200 min-[380px]:gap-4 min-[380px]:py-4 sm:gap-8 sm:py-7 lg:py-8 cursor-pointer"
      >
        <div className="flex min-w-0 items-center gap-3 min-[380px]:gap-4 sm:gap-8">
          <span
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-sm tabular-nums transition-all duration-300 min-[380px]:h-12 min-[380px]:w-12 min-[380px]:text-lg sm:h-[70px] sm:w-[70px] sm:text-2xl lg:text-[26px]"
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
            className={`font-heading text-[13.5px] font-bold leading-snug tracking-tight transition-colors duration-200 min-[380px]:text-[15px] sm:text-xl lg:text-[25px] xl:text-[27px] ${
              isOpen ? 'text-white' : 'text-white/92 group-hover:text-sky-200'
            }`}
          >
            {item.q}
          </h3>
        </div>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-all duration-300 min-[380px]:h-5 min-[380px]:w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${
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
          <p className="pb-4 pl-[52px] pr-2 text-xs leading-relaxed text-sky-100/80 min-[380px]:pl-[64px] min-[380px]:text-sm sm:pb-6 sm:pl-[102px] sm:pr-12 sm:text-base lg:text-[18px] lg:leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="ml-[40px] min-[380px]:ml-[48px] sm:ml-[70px]">
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
