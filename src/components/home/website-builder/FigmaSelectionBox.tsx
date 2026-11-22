import { memo } from 'react'

interface FigmaSelectionBoxProps {
  boxRef: (el: HTMLDivElement | null) => void
  label: string
  insetClassName?: string
  accent?: string
}

export const FigmaSelectionBox = memo(function FigmaSelectionBox({
  boxRef,
  label,
  insetClassName = 'inset-0',
  accent = '#0d99ff',
}: FigmaSelectionBoxProps) {
  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`pointer-events-none absolute z-30 ${insetClassName}`}
      style={{
        opacity: 0,
        border: `1.5px solid ${accent}`,
        boxShadow: `0 0 0 1px rgba(13, 153, 255, 0.14)`,
      }}
    >
      <span
        className="absolute -top-[4px] -left-[4px] h-[7px] w-[7px] bg-white"
        style={{ border: `1.5px solid ${accent}` }}
      />
      <span
        className="absolute -top-[4px] -right-[4px] h-[7px] w-[7px] bg-white"
        style={{ border: `1.5px solid ${accent}` }}
      />
      <span
        className="absolute -bottom-[4px] -left-[4px] h-[7px] w-[7px] bg-white"
        style={{ border: `1.5px solid ${accent}` }}
      />
      <span
        className="absolute -right-[4px] -bottom-[4px] h-[7px] w-[7px] bg-white"
        style={{ border: `1.5px solid ${accent}` }}
      />
      <span
        className="absolute -bottom-[19px] left-1/2 -translate-x-1/2 rounded-[4px] px-1.5 py-[1px] font-mono text-[9px] font-bold tracking-tight whitespace-nowrap text-white shadow-sm"
        style={{ backgroundColor: accent }}
      >
        {label}
      </span>
    </div>
  )
})
