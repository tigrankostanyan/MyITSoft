import { memo } from "react";
import { ArrowRight, Database, Globe, Send, ShieldCheck } from "lucide-react";
import { useTranslations } from "~/store/ui-store";
import { StudioMonitorShell } from "./StudioMonitorShell";

const DEAL_BADGES = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-indigo-100 text-indigo-700",
] as const;

export const Slide1 = memo(function Slide1() {
  const { t } = useTranslations();
  const s1 = t.carousel.slide1;
  return (
    <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
      <StudioMonitorShell windowTitle="MYITSOFT CRM · LIVE AUTOMATION">
        <div className="flex h-full flex-col justify-between gap-1 sm:gap-2">
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {s1.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-200 bg-white px-1.5 py-1 shadow-xs sm:px-2.5 sm:py-1.5"
              >
                <div className="truncate font-mono-tech text-[5.5px] font-bold text-slate-400 min-[380px]:text-[6.5px] sm:text-[7px]">
                  {stat.label}
                </div>
                <div className="mt-0.5 flex items-baseline justify-between gap-1">
                  <span className="font-display text-[9.5px] whitespace-nowrap text-slate-900 min-[380px]:text-[11px] sm:text-sm">
                    {stat.val}
                  </span>
                  <span className="font-mono-tech text-[6px] font-bold whitespace-nowrap text-emerald-600 min-[380px]:text-[7px] sm:text-[8px]">
                    {stat.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-12 gap-1 sm:gap-2">
            <div className="col-span-8 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-1.5 shadow-xs sm:p-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5 sm:pb-1">
                <span className="truncate font-mono-tech text-[6.5px] font-bold text-slate-500 uppercase sm:text-[8px]">
                  {s1.recentDeals}
                </span>
                <span className="shrink-0 font-mono-tech text-[6.5px] font-bold text-indigo-600 sm:text-[8px]">
                  LIVE CRM
                </span>
              </div>
              <div className="mt-0.5 space-y-0.5 sm:mt-1 sm:space-y-1">
                {s1.deals.map((row, idx) => (
                  <div
                    key={row.client}
                    className="flex items-center justify-between gap-1 rounded-md bg-slate-50 px-1.5 py-0.5 text-[7.5px] min-[380px]:text-[8.5px] sm:px-2 sm:py-1 sm:text-[9px]"
                  >
                    <span className="truncate font-semibold text-slate-800">
                      {row.client}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-1 py-0.5 text-[6px] font-bold sm:px-1.5 sm:text-[7px] ${DEAL_BADGES[idx]}`}
                    >
                      {row.status}
                    </span>
                    <span className="shrink-0 font-mono-tech font-bold whitespace-nowrap text-slate-900">
                      {row.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-1.5 shadow-xs sm:p-2">
              <div className="truncate font-mono-tech text-[6px] font-bold text-slate-400 uppercase sm:text-[7px]">
                {s1.growth7d}
              </div>
              <div className="flex h-10 items-end justify-between gap-0.5 pt-1 min-[380px]:h-12 sm:h-16 sm:gap-1">
                {[38, 52, 46, 68, 62, 84, 96].map((h, bIdx) => (
                  <div
                    key={bIdx}
                    className="w-full rounded-t-sm bg-gradient-to-t from-indigo-600 to-sky-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-indigo-200/80 bg-indigo-50/70 px-1.5 py-1 sm:px-2.5 sm:py-1.5">
            {s1.pipeline.map(
              (stepName, sIdx) => (
                <div key={stepName} className="flex items-center gap-0.5 sm:gap-1">
                  <span className="rounded-md bg-white px-1 py-0.5 text-[6.5px] font-bold whitespace-nowrap text-indigo-950 shadow-xs min-[380px]:text-[7.5px] sm:px-2 sm:text-[9px]">
                    {stepName}
                  </span>
                  {sIdx < 3 && (
                    <ArrowRight className="h-2 w-2 shrink-0 text-indigo-400 sm:h-3 sm:w-3" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </StudioMonitorShell>

      <div
        className="absolute -top-2 -right-2 hidden w-[165px] rounded-[22px] border border-white/85 bg-white/95 p-3 text-[#0f172a] shadow-[0_28px_65px_-12px_rgba(99,102,241,0.45)] backdrop-blur-2xl sm:top-0 sm:-right-3 sm:block sm:w-[170px] sm:origin-top-right sm:scale-90 lg:-top-4 lg:-right-5 lg:w-[185px] lg:scale-100"
        style={{ transform: "translateZ(72px)" }}
      >
        <div className="mb-2 text-center font-mono-tech text-[9px] font-bold text-indigo-600 uppercase">
          LIVE SYNC API
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { name: s1.syncAccounting, color: "bg-amber-500", icon: Database },
            { name: "Idram / ArCa", color: "bg-sky-500", icon: ShieldCheck },
            { name: "Telegram CRM", color: "bg-cyan-500", icon: Send },
            { name: "Google Cloud", color: "bg-emerald-500", icon: Globe },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-2 py-1.5 shadow-xs"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-white ${item.color}`}
                >
                  <ItemIcon className="h-3 w-3" />
                </span>
                <span className="truncate text-[10px] font-bold text-slate-800">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
