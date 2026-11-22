import { memo } from "react";
import { Palette } from "lucide-react";
import { useTranslations } from "~/store/ui-store";
import { StudioMonitorShell } from "./StudioMonitorShell";
import { ShowcaseMini3D } from "~/components/three/ShowcaseMini3D";

const DESIGN_TOKENS = ['#0f172a', '#38bdf8', '#818cf8', '#c084fc'] as const
const DESIGN_LAYERS = ['Hero Glass Frame', 'Navigation Bar', 'Pricing Grid'] as const

export const Slide3 = memo(function Slide3({
  render3D,
}: {
  render3D: boolean
}) {
  const { t } = useTranslations();
  return (
    <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
      <StudioMonitorShell windowTitle="UI/UX STUDIO · DESIGN SYSTEM" darkChrome>
        <div className="grid h-full grid-cols-12 gap-2">
          <div className="col-span-4 flex flex-col justify-between rounded-lg border border-white/10 bg-[#0e1526] p-2.5">
            <div>
              <div className="font-mono-tech text-[8px] font-bold text-purple-300 uppercase">
                DESIGN TOKENS
              </div>
              <div className="mt-2 flex gap-1.5">
                {DESIGN_TOKENS.map((hex) => (
                  <span
                    key={hex}
                    className="h-5 w-5 rounded-full border border-white/25 shadow-sm"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {DESIGN_LAYERS.map(
                (layer, lIdx) => (
                  <div
                    key={layer}
                    className={`rounded px-1.5 py-1 text-[8px] font-semibold ${
                      lIdx === 0
                        ? "bg-purple-500/20 text-purple-200"
                        : "text-slate-400"
                    }`}
                  >
                    {layer}
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-white/10 pt-1.5">
              <div className="font-display text-xs text-white">Aa Bb Գգ</div>
              <div className="text-[8px] text-slate-400">
                Display · Sans · Mono
              </div>
            </div>
          </div>

          <div className="col-span-8 flex flex-col justify-between rounded-lg border border-white/10 bg-gradient-to-br from-[#121a30] via-[#0c1324] to-[#1a1333] p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[8px] font-bold text-slate-400">
                DESKTOP 1440PX · 12 COL
              </span>
              <span className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono-tech text-[7px] font-bold text-purple-200">
                AUTO LAYOUT
              </span>
            </div>

            <div className="my-1.5 flex flex-1 flex-col justify-between rounded-lg border border-white/15 bg-[#070b14]/90 p-2.5">
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-10 rounded-full bg-white/80" />
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-5 rounded-full bg-white/25" />
                  <span className="h-1.5 w-5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-8 rounded-full bg-sky-400" />
                </div>
              </div>

              <div className="my-auto py-1">
                <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-white via-sky-200 to-purple-300" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/30" />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-md border border-sky-400/30 bg-gradient-to-br from-sky-500/25 to-indigo-600/25 p-2">
                  <div className="text-[8px] font-bold text-white">
                    Glass Hero
                  </div>
                  <div className="text-[7px] text-sky-200/75">Blur 24px</div>
                </div>
                <div className="rounded-md border border-white/15 bg-white/[0.05] p-2">
                  <div className="text-[8px] font-bold text-white">
                    Micro Motion
                  </div>
                  <div className="text-[7px] text-slate-400">Spring 60fps</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono-tech text-[7px] text-slate-400">
              <span>RADIUS: 16PX</span>
              <span>GRID: 8PX</span>
              <span className="text-emerald-400">READY FOR DEV</span>
            </div>
          </div>
        </div>
      </StudioMonitorShell>

      <div
        className="absolute -top-3 -right-3 hidden w-[190px] overflow-hidden rounded-2xl border border-white/85 bg-white/95 p-2 shadow-[0_28px_70px_-14px_rgba(56,189,248,0.45)] sm:block sm:origin-top-right sm:scale-90 lg:-top-6 lg:-right-6 lg:w-[215px] lg:scale-100"
        style={{ transform: "translateZ(78px)" }}
      >
        <div className="flex items-center justify-between px-1.5 pb-1">
          <span className="truncate font-mono-tech text-[9px] font-bold text-slate-800">
            3D SPATIAL UI
          </span>
          <span className="rounded-full bg-[#1d4ed8] px-1.5 py-0.5 font-mono-tech text-[7px] font-bold text-white">
            PBR
          </span>
        </div>
        <div className="h-[138px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0b1020] via-[#131a30] to-[#080c18]">
          {render3D && <ShowcaseMini3D variant="design" />}
        </div>
      </div>

      <div
        className="absolute -bottom-3 -left-2 hidden w-[195px] rounded-2xl border border-white/85 bg-white/95 p-3 text-[#0f172a] shadow-[0_24px_55px_-12px_rgba(56,189,248,0.42)] sm:-left-3 sm:block sm:w-[205px] sm:origin-bottom-left sm:scale-90 lg:-bottom-4 lg:-left-5 lg:w-[220px] lg:scale-100"
        style={{ transform: "translateZ(62px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-[9px] font-bold text-[#1d4ed8] uppercase">
            UI/UX PROTOTYPE
          </span>
          <Palette className="h-3.5 w-3.5 text-[#38bdf8]" />
        </div>
        <div className="mt-1.5 text-xs font-bold text-slate-900">
          {t.carousel.slide3.customDesignSystem}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb]" />
        </div>
      </div>
    </div>
  );
});
