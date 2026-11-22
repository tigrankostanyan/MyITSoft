import { memo } from 'react'

interface NavbarBrandProps {
  compact?: boolean
}

export const NavbarBrand = memo(function NavbarBrand({ compact = false }: NavbarBrandProps) {
  return (
    <>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#0c1630] p-1.5 shadow-lg shadow-[#1e40af]/35 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
        <img
          src="/myitsoft-logo.png"
          alt="MyITSoft"
          className="h-full w-full object-contain"
        />
      </div>
      {!compact && (
        <div className="text-left leading-none">
          <div className="font-display text-xs tracking-tight text-white sm:text-sm">
            MyITSoft
          </div>
          <div className="mt-1 flex items-center gap-1.5 font-mono-tech text-[9px] tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            <span>MyITSoft Company</span>
          </div>
        </div>
      )}
    </>
  )
})
