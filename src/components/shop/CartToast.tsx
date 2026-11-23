import { Check, ShoppingBag, X } from 'lucide-react'
import { formatPrice } from '~/store/cart-math'
import { useUIStore } from '~/store/ui-store'

export function CartToastContainer() {
  const toasts = useUIStore((s) => s.toasts)
  const dismissToast = useUIStore((s) => s.dismissToast)
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Ծանուցումներ"
      className="pointer-events-none fixed right-3 bottom-24 left-3 z-[95] flex max-w-sm flex-col gap-2.5 min-[576px]:right-4 min-[576px]:bottom-4 min-[576px]:left-auto min-[576px]:w-[calc(100%-2rem)] sm:right-6 sm:bottom-6"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-enter pointer-events-auto relative overflow-hidden rounded-2xl border border-[#38bdf8]/40 bg-[#0a1020]/95 p-3.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#101c3a]">
              {toast.productImage ? (
                <img
                  src={toast.productImage}
                  alt={toast.productName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#38bdf8]">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                </div>
              )}
              <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0a1020] bg-emerald-500 text-white">
                <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-emerald-400">{toast.message}</p>
              <p className="mt-0.5 truncate font-heading text-sm font-bold text-white">
                {toast.productName}
              </p>
              {toast.price !== undefined && (
                <p className="font-mono-tech text-xs text-white/65">
                  {formatPrice(toast.price)}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  dismissToast(toast.id)
                  setCartOpen(true)
                }}
                className="rounded-xl bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white hover:text-[#070d1e] cursor-pointer"
              >
                Զամբյուղ
              </button>
              <button
                type="button"
                aria-label="Փակել ծանուցումը"
                onClick={() => dismissToast(toast.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="animate-toast-progress absolute right-0 bottom-0 left-0 h-[3px] origin-left bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#00e5ff]" />
        </div>
      ))}
    </div>
  )
}
export default CartToastContainer
