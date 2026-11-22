import { memo } from 'react'
import { Lock, RotateCw, ShieldCheck } from 'lucide-react'

interface BrowserToolbarProps {
  isMobile: boolean
  sslBadgeRef: React.RefObject<HTMLSpanElement | null>
  progressBarRef: React.RefObject<HTMLDivElement | null>
}

/** Browser window chrome toolbar with SSL indicator and build progress bar. */
export const BrowserToolbar = memo(function BrowserToolbar({
  isMobile,
  sslBadgeRef,
  progressBarRef,
}: BrowserToolbarProps) {
  return (
    <div className="relative z-30 flex h-[38px] items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-3.5 md:h-[44px] md:px-4">
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] md:h-3 md:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] md:h-3 md:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] md:h-3 md:w-3" />
        {!isMobile && (
          <span className="ml-3 rounded-t-lg border border-b-0 border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold text-[#1e293b]">
            MegaMart — Online Store
          </span>
        )}
      </div>

      <div
        className={`flex h-[28px] items-center justify-between rounded-full border border-[#e2e8f0] bg-white px-2.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] ${
          isMobile ? 'w-[235px]' : 'w-[420px] px-3'
        }`}
      >
        <span
          ref={sslBadgeRef}
          className="inline-flex items-center gap-1 rounded-full border px-1.5 py-[1px] text-[9.5px] font-bold transition-colors duration-300 md:px-2 md:text-[10px]"
        >
          <Lock className="h-2.5 w-2.5" aria-hidden="true" />
          <span>SSL</span>
        </span>
        <span className="truncate font-mono text-[11px] font-medium text-[#334155] md:text-[11.5px]">
          https://megamart.am
        </span>
        <RotateCw className="h-3 w-3 shrink-0 text-[#94a3b8]" aria-hidden="true" />
      </div>

      {!isMobile ? (
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#64748b]">
          <ShieldCheck className="h-4 w-4 text-[#008ecc]" aria-hidden="true" />
          <span>MyITSoft Studio</span>
        </div>
      ) : (
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#008ecc]" aria-hidden="true" />
      )}

      <div
        ref={progressBarRef}
        className="absolute right-0 bottom-0 left-0 h-[2.5px] origin-left bg-gradient-to-r from-[#a259ff] via-[#008ecc] to-[#10b981]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
})
