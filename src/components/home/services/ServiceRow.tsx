import { memo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ServiceDiscipline } from './servicesData'

interface ServiceRowProps {
  service: ServiceDiscipline
  idx: number
  isActive: boolean
  isHovered: boolean
  onJumpTo: (id: string) => void
  onHoverChange: (idx: number | null) => void
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  titleMaskRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  capsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  arrowRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

export const ServiceRow = memo(function ServiceRow({
  service,
  idx,
  isActive,
  isHovered,
  onJumpTo,
  onHoverChange,
  onMouseMove,
  rowRefs,
  titleMaskRefs,
  capsRefs,
  arrowRefs,
}: ServiceRowProps) {
  return (
    <div
      ref={(el) => {
        rowRefs.current[idx] = el
      }}
      role="button"
      tabIndex={0}
      onClick={() => onJumpTo('get-started')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onJumpTo('get-started')
        }
      }}
      onMouseEnter={() => onHoverChange(idx)}
      onMouseLeave={() => onHoverChange(null)}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden py-2 transition-colors duration-300 min-[380px]:py-3 sm:py-3 md:py-3.5 lg:grid lg:grid-cols-12 lg:items-center lg:gap-4 lg:py-4 xl:py-6 2xl:py-7 cursor-pointer ${
        isActive ? 'bg-white/[0.032]' : 'hover:bg-white/[0.025]'
      }`}
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : isActive ? 'opacity-55' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(520px circle at var(--mx) var(--my), ${service.glow}, transparent 65%)`,
        }}
      />

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-2 bottom-2 left-0 w-[2px] rounded-full transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: service.accent,
          boxShadow: `0 0 12px ${service.accent}`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between gap-4 px-2 sm:px-3 lg:contents">
        <div className="hidden lg:col-span-1 lg:block lg:pl-3">
          <span
            className="font-mono-tech text-xs font-bold tracking-[0.14em] transition-colors duration-300"
            style={{ color: isActive ? service.accent : 'rgba(255,255,255,0.58)' }}
          >
            {service.index}
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden lg:col-span-4">
          <div
            ref={(el) => {
              titleMaskRefs.current[idx] = el
            }}
            className="relative flex items-center will-change-transform"
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 h-2 w-2 rounded-full transition-all duration-300 ${
                isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{
                backgroundColor: service.accent,
                boxShadow: `0 0 14px ${service.accent}`,
              }}
            />
            <div
              className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? 'translate-x-[18px]' : 'translate-x-0'
              }`}
            >
              <div className="flex items-center gap-2 lg:block">
                <span
                  className="font-mono-tech text-[10px] font-bold tracking-[0.12em] lg:hidden"
                  style={{ color: isActive ? service.accent : 'rgba(255,255,255,0.58)' }}
                >
                  {service.index}
                </span>
                <h3
                  className={`font-heading text-[15px] font-bold tracking-[-0.02em] transition-colors duration-300 min-[380px]:text-lg sm:text-2xl xl:text-[28px] 2xl:text-[31px] ${
                    isActive ? 'text-white' : 'text-white/85 group-hover:text-white'
                  }`}
                >
                  {service.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9 lg:hidden ${
            isActive
              ? 'border-transparent bg-white text-[#060913] shadow-[0_0_24px_rgba(255,255,255,0.28)]'
              : 'border-white/15 bg-white/[0.02] text-white/60'
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>

      <div
        ref={(el) => {
          capsRefs.current[idx] = el
        }}
        className="relative z-10 mt-1.5 px-2 min-[380px]:mt-2 sm:mt-2 sm:px-3 lg:col-span-6 lg:mt-0 lg:px-0 will-change-transform"
      >
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 sm:gap-x-3 sm:gap-y-1 xl:gap-x-3.5 xl:gap-y-1">
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              className={`text-[10px] font-medium leading-tight transition-colors duration-300 min-[380px]:text-[11px] sm:text-[12px] sm:leading-snug xl:text-[12.5px] ${
                isActive ? 'text-white/95' : 'text-white/60 group-hover:text-white/85'
              }`}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 hidden lg:col-span-1 lg:flex lg:justify-end lg:pr-2">
        <span
          ref={(el) => {
            arrowRefs.current[idx] = el
          }}
          aria-hidden="true"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 xl:h-11 xl:w-11 ${
            isActive
              ? 'border-transparent bg-white text-[#060913] shadow-[0_0_28px_rgba(255,255,255,0.28)]'
              : 'border-white/15 bg-white/[0.02] text-white/60 group-hover:border-white group-hover:bg-white group-hover:text-[#060913]'
          }`}
        >
          <ArrowUpRight
            className={`h-4 w-4 transition-transform duration-300 ${
              isActive
                ? 'translate-x-0.5 -translate-y-0.5'
                : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            }`}
          />
        </span>
      </div>
    </div>
  )
})
