import type { ReactNode } from "react";

/** Brushed-aluminum studio display shell. */
export function StudioMonitorShell({
  windowTitle,
  darkChrome = false,
  children,
}: {
  windowTitle: string;
  darkChrome?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative rounded-[16px] border-[2px] border-slate-300/55 bg-gradient-to-b from-slate-800 via-[#0d1220] to-[#070a14] p-1.5 shadow-[0_42px_95px_-20px_rgba(0,0,0,0.82),0_0_55px_-16px_rgba(56,189,248,0.25)] sm:rounded-[22px] sm:p-2.5">
        <div className="mx-auto mb-1 flex items-center justify-center sm:mb-1.5">
          <span className="h-1 w-1 rounded-full bg-slate-600 ring-1 ring-slate-500/40 sm:h-1.5 sm:w-1.5" />
        </div>

        <div
          className={`relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border sm:rounded-[12px] ${
            darkChrome
              ? "border-white/10 bg-[#080d1a] text-white"
              : "border-slate-200/40 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-[#0f172a]"
          }`}
        >
          <div
            className={`flex h-5 items-center justify-between border-b px-2 sm:h-7 sm:px-3 ${
              darkChrome
                ? "border-white/10 bg-[#0d1426]/95"
                : "border-slate-200/90 bg-white/90"
            }`}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-amber-400 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
            </div>
            <span
              className={`truncate font-mono-tech text-[7.5px] font-bold tracking-wider uppercase sm:text-[9px] ${
                darkChrome ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {windowTitle}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] sm:h-2 sm:w-2" />
          </div>

          <div className="relative h-[calc(100%-20px)] w-full p-1.5 sm:h-[calc(100%-28px)] sm:p-3">
            {children}
          </div>
        </div>
      </div>

      <div className="mx-auto h-4 w-14 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 shadow-inner sm:h-9 sm:w-24" />
      <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-[0_12px_28px_rgba(0,0,0,0.55)] sm:h-2 sm:w-40" />
    </div>
  );
}
