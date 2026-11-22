import { memo } from 'react'
import { Layers, RotateCw, ScanLine } from 'lucide-react'
import type { ModelKind } from '~/data/types'
import { ProductInspectorCanvas } from '~/components/three/ProductInspectorCanvas'
import { useTranslations } from '~/store/ui-store'

interface Product3DViewerPaneProps {
  model: ModelKind
  selectedColor: string
  exploded: number
  hologram: boolean
  onExplodedChange: (v: number) => void
  onToggleHologram: () => void
}

export const Product3DViewerPane = memo(function Product3DViewerPane({
  model,
  selectedColor,
  exploded,
  hologram,
  onExplodedChange,
  onToggleHologram,
}: Product3DViewerPaneProps) {
  const { t } = useTranslations()
  return (
    <div className="relative flex min-h-[260px] flex-col justify-between bg-[radial-gradient(ellipse_at_center,#1d4ed8_0%,#070d1e_72%)] min-[380px]:min-h-[300px] lg:col-span-7 lg:min-h-[340px]">
      <div className="pointer-events-none relative z-10 flex items-center justify-between p-3.5 sm:p-5">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 backdrop-blur-md sm:px-3 sm:py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00e5ff]" />
          <span className="font-mono-tech text-[10px] font-bold tracking-wider text-white uppercase sm:text-[11px]">
            {t.modal3D.viewerTitle}
          </span>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono-tech text-[11px] text-white/70 sm:flex">
          <RotateCw className="h-3 w-3" />
          <span>{t.modal3D.rotateZoom}</span>
        </div>
      </div>

      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <ProductInspectorCanvas
          kind={model}
          color={selectedColor}
          exploded={exploded}
          hologram={hologram}
        />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 sm:gap-3 sm:p-5">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md sm:gap-3 sm:px-4 sm:py-2.5">
          <Layers className="h-4 w-4 shrink-0 text-[#38bdf8]" />
          <span className="hidden font-mono-tech text-[11px] font-bold tracking-wider text-white/80 uppercase min-[360px]:inline">
            {t.modal3D.layers}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={exploded}
            onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
            className="nova-range min-w-0 w-full"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #38bdf8 ${exploded * 100}%, rgba(255,255,255,0.16) ${exploded * 100}%, rgba(255,255,255,0.16) 100%)`,
            }}
          />
          <span className="w-8 shrink-0 text-right font-mono-tech text-[10px] text-[#00e5ff] sm:w-9 sm:text-[11px]">
            {Math.round(exploded * 100)}%
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleHologram}
          className={`flex items-center gap-1.5 rounded-2xl border px-3 py-2 font-mono-tech text-[10px] font-bold tracking-wider uppercase backdrop-blur-md transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[11px] cursor-pointer ${
            hologram
              ? 'border-[#00e5ff] bg-[#00e5ff]/20 text-[#00e5ff] shadow-lg shadow-[#00e5ff]/20'
              : 'border-white/15 bg-black/55 text-white/80 hover:border-white/40 hover:text-white'
          }`}
        >
          <ScanLine className="h-4 w-4" />
          <span>{t.modal3D.xray}</span>
        </button>
      </div>
    </div>
  )
})
