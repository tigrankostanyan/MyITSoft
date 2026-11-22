import { useCallback, useState } from 'react'
import { ArrowRight, CheckCircle2, ShoppingBag, Sparkles, X } from 'lucide-react'
import { selectCartCount, useCartStore } from '~/store/cart-store'
import { useCartLines, useCartTotals } from '~/store/cart-selectors'
import { formatPrice, FREE_SHIPPING_MIN } from '~/store/cart-math'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { CartItemRow } from './CartItemRow'
import { CartPromoForm } from './CartPromoForm'

export function CartDrawer() {
  const { t } = useTranslations()
  const cartOpen = useUIStore((s) => s.cartOpen)
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  const lines = useCartLines()
  const totals = useCartTotals()
  const totalCount = useCartStore(selectCartCount)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const remove = useCartStore((s) => s.remove)
  const promoCode = useCartStore((s) => s.promoCode)
  const clear = useCartStore((s) => s.clear)

  const [checkedOut, setCheckedOut] = useState(false)

  const netSubtotal = totals.subtotal - totals.discount
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_MIN - netSubtotal)
  const progressPct = Math.min(100, (netSubtotal / FREE_SHIPPING_MIN) * 100)

  const handleClose = useCallback(() => {
    setCartOpen(false)
    setCheckedOut(false)
  }, [setCartOpen])

  const handleCheckout = useCallback(() => {
    setCheckedOut(true)
    window.setTimeout(() => {
      clear()
    }, 400)
  }, [clear])

  if (!cartOpen) return null

  return (
    <>
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="animate-modal-fade fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.cartDrawer.title}
        className="animate-drawer-in fixed top-0 right-0 bottom-0 z-[75] flex w-full max-w-md flex-col border-l border-white/15 bg-[#0a1020] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <ShoppingBag className="h-5 w-5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
            <h2 className="font-display truncate text-base tracking-tight text-white uppercase sm:text-lg">
              {t.cartDrawer.title}
            </h2>
            <span className="shrink-0 rounded-full bg-[#2563eb]/25 px-2 py-0.5 font-mono-tech text-xs font-bold text-[#7dd3fc] sm:px-2.5">
              {totalCount}
            </span>
          </div>
          <button
            type="button"
            aria-label={t.cartDrawer.closeAria}
            onClick={handleClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/75 transition hover:bg-white hover:text-black cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {checkedOut ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </div>
            <h3 className="font-display mt-5 text-2xl text-white uppercase">
              {t.cartDrawer.confirmedTitle}
            </h3>
            <p className="mt-2 text-sm text-white/70">{t.cartDrawer.confirmedDesc}</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-full bg-white px-7 py-3 font-heading text-xs font-bold tracking-wider text-[#0f172a] uppercase transition hover:bg-[#2563eb] hover:text-white cursor-pointer"
            >
              {t.cartDrawer.continueBrowsing}
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Sparkles className="h-10 w-10 text-white/30" aria-hidden="true" />
            <p className="font-heading mt-4 text-base font-bold text-white">{t.cartDrawer.emptyTitle}</p>
            <p className="mt-1 text-xs text-white/60">{t.cartDrawer.emptyDesc}</p>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-6 rounded-full bg-[#2563eb] px-6 py-2.5 font-heading text-xs font-bold tracking-wider text-white uppercase hover:bg-white hover:text-black cursor-pointer"
            >
              {t.cartDrawer.viewSolutions}
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 bg-white/[0.02] px-6 py-3.5">
              <div className="flex items-center justify-between font-mono-tech text-[11px]">
                <span className="text-white/75">
                  {remainingForFreeShip === 0
                    ? t.cartDrawer.freeAuditActive
                    : `${t.cartDrawer.addForFreeAuditPrefix} ${formatPrice(remainingForFreeShip)} ${t.cartDrawer.addForFreeAuditSuffix}`}
                </span>
                <span className="font-bold text-[#00e5ff]">{Math.round(progressPct)}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#00e5ff] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {lines.map((line) => (
                <CartItemRow
                  key={line.productId}
                  line={line}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={remove}
                />
              ))}
            </div>

            <div className="border-t border-white/10 bg-[#070d1e] px-6 py-5">
              <CartPromoForm />

              <dl className="space-y-1.5 text-xs">
                <div className="flex justify-between text-white/70">
                  <dt>{t.cartDrawer.subtotal}</dt>
                  <dd className="font-mono-tech">{formatPrice(totals.subtotal)}</dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <dt>
                      {t.cartDrawer.discountPrefix} ({promoCode})
                    </dt>
                    <dd className="font-mono-tech">-{formatPrice(totals.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <dt>{t.cartDrawer.deliveryYerevan}</dt>
                  <dd className="font-mono-tech">
                    {totals.shipping === 0 ? t.cartDrawer.free : formatPrice(totals.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2.5 text-base font-bold text-white">
                  <dt>{t.cartDrawer.total}</dt>
                  <dd className="font-display">{formatPrice(totals.total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-4 font-heading text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#2563eb]/40 transition hover:bg-white hover:text-[#070d1e] cursor-pointer"
              >
                <span>{t.cartDrawer.confirmOrder}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
export default CartDrawer
