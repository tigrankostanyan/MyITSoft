import { memo } from "react";
import { Box, Check, CheckCircle2 } from "lucide-react";
import { useTranslations } from "~/store/ui-store";
import type { ServiceStep } from "./carouselData";

interface ServiceCardProps {
  step: ServiceStep;
  idx: number;
  active: boolean;
  isAdded: boolean;
  onJump: (idx: number) => void;
  onInspect: (productId: string) => void;
  onAdd: (productId: string) => void;
}

export const ServiceCard = memo(function ServiceCard({
  step,
  idx,
  active,
  isAdded,
  onJump,
  onInspect,
  onAdd,
}: ServiceCardProps) {
  const { t } = useTranslations();
  const Icon = step.icon;
  return (
    <div
      key={step.id}
      onClick={() => onJump(idx)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onJump(idx);
        }
      }}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
        active
          ? "border border-white/85 bg-white/[0.97] p-3 text-[#0f172a] shadow-[0_26px_64px_-14px_rgba(56,189,248,0.42)] sm:p-3.5 lg:p-3.5 xl:p-4"
          : "border border-white/10 bg-white/[0.045] px-3.5 py-2 text-white/75 hover:border-white/25 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 lg:px-3.5 lg:py-2 xl:px-4 xl:py-2.5"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
              active
                ? "bg-[#0f172a] text-sky-300 shadow-md"
                : "bg-white/10 text-white/70 group-hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <div
              className={`font-heading text-[14.5px] font-bold tracking-tight lg:text-[15px] xl:text-base ${
                active ? "text-[#0f172a]" : "text-white/85"
              }`}
            >
              {step.title}
            </div>
            {!active && (
              <div className="mt-0.5 font-mono-tech text-[10.5px] text-white/45">
                {step.highlights.join(" · ")}
              </div>
            )}
          </div>
        </div>

        <span
          className={`font-mono-tech text-xs font-bold ${
            active ? "text-sky-600" : "text-white/35"
          }`}
        >
          {step.index}
        </span>
      </div>

      <div
        className={`grid transition-all duration-500 ${
          active
            ? "mt-2 grid-rows-[1fr] opacity-100 xl:mt-2.5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-xs leading-snug text-slate-600 sm:text-[12.5px] xl:text-[13px] xl:leading-relaxed">
            {step.shortDesc}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {step.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold text-slate-700 xl:text-[10.5px]"
              >
                <Check className="h-3 w-3 text-sky-600" />
                {h}
              </span>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-slate-200/90 pt-2 xl:mt-3 xl:pt-2.5">
            <div className="min-w-0 flex-1 leading-snug">
              <span className="font-heading text-[11px] font-semibold text-[#0f172a] xl:text-xs">
                {step.price}
              </span>
              <span className="ml-1 font-mono-tech text-[10.5px] text-slate-500">
                · {step.timeline}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const el = document.getElementById("footer-audit");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0f172a] px-3.5 py-1.5 font-heading text-[10.5px] font-bold whitespace-nowrap text-white uppercase transition hover:bg-sky-600 cursor-pointer"
            >
              <span>{t.carousel.discussProject}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
