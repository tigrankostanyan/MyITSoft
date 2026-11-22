import { memo } from "react";
import { Layers, TrendingUp, Zap } from "lucide-react";
import { useTranslations } from "~/store/ui-store";
import { StudioMonitorShell } from "./StudioMonitorShell";

export const Slide0 = memo(function Slide0() {
  const { t } = useTranslations();
  return (
    <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
      <StudioMonitorShell
        windowTitle="MYITSOFT 3D ENGINE · WEBGL 2.0"
        darkChrome
      >
        <div className="grid h-full grid-cols-12 gap-2.5">
          <div className="col-span-4 flex flex-col justify-between rounded-lg border border-white/10 bg-[#0e1629] p-2.5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono-tech text-[8px] font-bold text-sky-400 uppercase">
                  SCENE GRAPH
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "Hero 3D Mesh", active: true },
                  { name: "PBR Studio Rig", active: false },
                  { name: "Scroll Camera", active: false },
                  { name: "SEO & Core Web", active: false },
                ].map((node) => (
                  <div
                    key={node.name}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-semibold ${
                      node.active
                        ? "border border-sky-400/40 bg-sky-500/15 text-sky-200"
                        : "bg-white/[0.04] text-slate-400"
                    }`}
                  >
                    <Layers className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{node.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-white/[0.04] px-2 py-1.5 font-mono-tech text-[8px] text-slate-400">
              <div className="flex justify-between">
                <span>FPS</span>
                <span className="text-emerald-400">60.0</span>
              </div>
              <div className="mt-0.5 flex justify-between">
                <span>DRAW CALLS</span>
                <span className="text-sky-300">14</span>
              </div>
            </div>
          </div>

          <div className="relative col-span-8 flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#0c1833] via-[#091224] to-[#050914] p-3">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(56,189,248,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.22) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full border border-sky-400/30 bg-sky-500/15 px-2 py-0.5 font-mono-tech text-[8px] font-bold text-sky-300">
                HDRI STUDIO · 4K
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono-tech text-[8px] font-bold text-emerald-300">
                99/100 SPEED
              </span>
            </div>

            <div className="relative z-10 my-auto rounded-xl border border-white/15 bg-white/[0.05] p-3 backdrop-blur-md">
              <div className="font-mono-tech text-[8px] tracking-widest text-sky-300 uppercase">
                INTERACTIVE WEBGL EXPERIENCE
              </div>
              <div className="mt-1 font-display text-sm leading-tight text-white uppercase sm:text-base">
                {t.carousel.slide0.cardTitle}
              </div>
              <div className="mt-1 text-[9px] text-slate-300">
                {t.carousel.slide0.cardSubtitle}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-1.5">
              {["<0.7s Load", "SEO Ready", "Admin CMS"].map((m) => (
                <div
                  key={m}
                  className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-center font-mono-tech text-[8px] font-semibold text-sky-100"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </StudioMonitorShell>

      <div
        className="absolute -right-2 -bottom-4 hidden w-[180px] rounded-[22px] border border-white/85 bg-white/95 p-3.5 text-[#0f172a] shadow-[0_28px_65px_-12px_rgba(14,165,233,0.45)] backdrop-blur-2xl sm:-right-3 sm:block sm:w-[190px] sm:origin-bottom-right sm:scale-90 lg:-right-6 lg:w-[210px] lg:scale-100"
        style={{ transform: "translateZ(68px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-[9px] font-bold text-sky-600 uppercase">
            MOBILE 3D READY
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div className="mt-1.5 font-heading text-xs font-bold leading-snug text-slate-900">
          {t.carousel.slide0.floatingTitle}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 p-2 text-white">
            <Zap className="h-3.5 w-3.5 text-sky-200" />
            <div className="mt-1 font-display text-xs">{t.carousel.slide0.loadUnit}</div>
            <div className="text-[8px] text-sky-100">{t.carousel.slide0.loadLabel}</div>
          </div>
          <div className="rounded-xl bg-slate-100 p-2 text-slate-800">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <div className="mt-1 font-display text-xs">+3.2x</div>
            <div className="text-[8px] text-slate-500">{t.carousel.slide0.leadsLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
});
