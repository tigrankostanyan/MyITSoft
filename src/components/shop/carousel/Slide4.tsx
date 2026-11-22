import { memo } from "react";
import { CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { useTranslations } from "~/store/ui-store";

export const Slide4 = memo(function Slide4() {
  const { t } = useTranslations();
  const s4 = t.carousel.slide4;
  return (
    <div
      className="flex origin-center scale-[0.55] items-center justify-center min-[380px]:scale-[0.64] sm:scale-[0.84] lg:scale-100"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="-mr-5 hidden w-[175px] rounded-2xl border border-white/85 bg-white/95 p-3.5 text-[#0f172a] shadow-[0_26px_60px_-12px_rgba(52,211,153,0.4)] backdrop-blur-2xl sm:block"
        style={{ transform: "translateZ(50px) translateY(26px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-[9px] font-bold text-emerald-600 uppercase">
            {s4.aiSales}
          </span>
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="mt-1.5 font-display text-2xl text-slate-900">+240%</div>
        <div className="text-[10px] text-slate-500">
          {s4.responseSpeed}
        </div>
        <div className="mt-2.5 rounded-full bg-sky-500 py-1.5 text-center font-heading text-[10px] font-bold text-white uppercase">
          {s4.activeBot}
        </div>
      </div>

      <div
        className="relative z-10 w-[235px] rounded-[38px] border-[5px] border-slate-800 bg-white p-3.5 text-[#0f172a] shadow-[0_38px_90px_-18px_rgba(0,0,0,0.75),0_0_0_1.5px_rgba(226,232,240,0.65)] sm:w-[255px]"
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="mx-auto mb-3 h-4 w-20 rounded-full bg-slate-950" />

        <div className="space-y-2.5">
          <div className="text-[11px] font-semibold text-slate-500">
            {s4.greeting}
          </div>

          <div className="rounded-2xl bg-sky-500/12 px-3 py-2 text-[11px] font-bold text-sky-700">
            {s4.userPrompt}
          </div>

          <div className="flex items-center gap-1.5 font-mono-tech text-[9px] text-emerald-600">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500" />
            <span>{s4.preparingOffer}</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5">
            <div className="text-[10px] font-bold text-slate-800">
              {s4.readyInDays}
            </div>
            <ul className="mt-1 space-y-1 text-[10px] text-slate-600">
              {s4.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center pt-1.5">
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-emerald-300 p-0.5 shadow-[0_0_26px_rgba(56,189,248,0.75)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white/85 backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-sky-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="-ml-5 hidden w-[175px] rounded-2xl border border-white/85 bg-white/95 p-3.5 text-[#0f172a] shadow-[0_26px_60px_-12px_rgba(56,189,248,0.45)] backdrop-blur-2xl sm:block"
        style={{ transform: "translateZ(50px) translateY(-16px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-[9px] font-bold text-sky-600 uppercase">
            {s4.newOrder}
          </span>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="mt-1.5 text-xs font-bold text-slate-900">
          {s4.registeredInCrm}
        </div>
        <div className="mt-1 text-[10px] text-slate-500">
          {s4.paidViaIdram}
        </div>
        <div className="mt-2.5 rounded-full bg-slate-900 py-1.5 text-center font-heading text-[10px] font-bold text-white uppercase">
          {s4.auto100}
        </div>
      </div>
    </div>
  );
});
