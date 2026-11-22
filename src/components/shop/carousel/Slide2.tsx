import { lazy, memo, Suspense } from "react";
import {
  Headphones,
  Keyboard,
  LayoutGrid,
  ShoppingCart,
  Star,
  Watch,
} from "lucide-react";
import { useTranslations } from "~/store/ui-store";
import { StudioMonitorShell } from "./StudioMonitorShell";

const ShowcaseMini3D = lazy(() => import("~/components/three/ShowcaseMini3D"));

const DEMO_PRODUCTS = [
  {
    name: 'Studio Pro ANC',
    price: '149,000 ֏',
    rating: '4.9',
    icon: Headphones,
    bg: 'from-slate-900 via-slate-800 to-sky-950',
  },
  {
    name: 'Titanium Watch',
    price: '185,000 ֏',
    rating: '4.8',
    icon: Watch,
    bg: 'from-zinc-900 via-slate-800 to-indigo-950',
  },
  {
    name: 'KeyPro 75 Alu',
    price: '74,000 ֏',
    rating: '5.0',
    icon: Keyboard,
    bg: 'from-slate-900 via-slate-800 to-cyan-950',
  },
] as const

export const Slide2 = memo(function Slide2({
  render3D,
}: {
  render3D: boolean
}) {
  const { t } = useTranslations();
  const s2 = t.carousel.slide2;
  return (
    <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
      <StudioMonitorShell windowTitle="E-COMMERCE PRO · IDRAM · ARCA">
        <div className="flex h-full flex-col justify-between gap-2">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-900 text-[9px] font-black text-sky-400">
                N
              </span>
              <span className="font-heading text-[11px] font-extrabold tracking-tight text-slate-900">
                NOVASTORE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono-tech text-[8px] font-bold text-emerald-700">
                IDRAM · ARCA
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[8px] font-bold text-white">
                <ShoppingCart className="h-2.5 w-2.5 text-sky-300" />3
              </span>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-2">
            {DEMO_PRODUCTS.map((prod, idx) => {
              const ProdIcon = prod.icon;
              return (
                <div
                  key={prod.name}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-2 shadow-xs"
                >
                  <div
                    className={`relative flex h-16 items-center justify-center rounded-lg bg-gradient-to-br ${prod.bg}`}
                  >
                    <ProdIcon className="h-7 w-7 text-slate-200 drop-shadow-[0_4px_10px_rgba(56,189,248,0.45)]" />
                    <span className="absolute top-1 right-1 inline-flex items-center gap-0.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[7px] font-bold text-amber-300">
                      <Star className="h-2 w-2 fill-amber-300" />
                      {prod.rating}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <div className="truncate text-[10px] font-bold text-slate-900">
                      {prod.name}
                    </div>
                    <div className="truncate text-[8px] text-slate-400">
                      {s2.cats[idx]}
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono-tech text-[9px] font-extrabold text-slate-900">
                      {prod.price}
                    </span>
                    <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[7px] font-bold text-white">
                      {s2.buy}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-1.5 text-[8px] text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {s2.warehouseLive}
            </span>
            <span className="font-mono-tech text-sky-300">
              {s2.deliveryCheckout}
            </span>
          </div>
        </div>
      </StudioMonitorShell>

      <div
        className="absolute bottom-2 -left-2 hidden w-[165px] rounded-2xl border border-white/85 bg-white/95 p-2.5 text-[#0f172a] shadow-[0_22px_50px_-12px_rgba(14,165,233,0.4)] backdrop-blur-2xl sm:block sm:origin-bottom-left sm:scale-90 lg:scale-100"
        style={{ transform: "translateZ(58px)" }}
      >
        {s2.modules.map(
          (mod, mIdx) => (
            <div
              key={mod}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-bold ${
                mIdx === 0 ? "bg-sky-100 text-sky-800" : "text-slate-600"
              }`}
            >
              <LayoutGrid className="h-3 w-3 shrink-0 text-sky-500" />
              <span>{mod}</span>
            </div>
          ),
        )}
      </div>

      <div
        className="absolute -top-3 -right-3 hidden w-[195px] overflow-hidden rounded-2xl border border-white/85 bg-white/95 p-2 shadow-[0_28px_70px_-14px_rgba(56,189,248,0.5)] sm:block sm:origin-top-right sm:scale-90 lg:-top-6 lg:-right-6 lg:w-[220px] lg:scale-100"
        style={{ transform: "translateZ(82px)" }}
      >
        <div className="flex items-center justify-between px-1 pb-1 sm:px-1.5">
          <span className="truncate font-mono-tech text-[7.5px] font-bold text-slate-700 sm:text-[9px]">
            3D · 360°
          </span>
          <span className="rounded-full bg-slate-900 px-1.5 py-0.5 font-mono-tech text-[7px] font-bold text-sky-300 sm:text-[8px]">
            LIVE
          </span>
        </div>
        <div className="h-[88px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0f172a] via-[#172036] to-[#0b1020] min-[420px]:h-[110px] sm:h-[142px]">
          {render3D && (
            <Suspense fallback={null}>
              <ShowcaseMini3D variant="ecommerce" />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
});
