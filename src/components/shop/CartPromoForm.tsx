import { memo, useState } from 'react'
import { Tag } from 'lucide-react'
import { useCartStore } from '~/store/cart-store'
import { useTranslations } from '~/store/ui-store'

export const CartPromoForm = memo(function CartPromoForm() {
  const { t } = useTranslations()
  const promoCode = useCartStore((s) => s.promoCode)
  const promoError = useCartStore((s) => s.promoError)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const clearPromo = useCartStore((s) => s.clearPromo)
  const [promoInput, setPromoInput] = useState('')

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    if (applyPromo(promoInput)) {
      setPromoInput('')
    }
  }

  return (
    <>
      <form onSubmit={handlePromoSubmit} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            aria-label={t.cartDrawer.promoPlaceholder}
            placeholder={t.cartDrawer.promoPlaceholder}
            className="w-full rounded-full border border-white/15 bg-white/5 py-2 pr-3 pl-9 font-mono-tech text-xs text-white placeholder:text-white/45 focus:border-[#38bdf8] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-full border border-white/20 px-4 font-heading text-[11px] font-bold text-white uppercase transition hover:bg-white hover:text-black cursor-pointer"
        >
          {t.cartDrawer.applyButton}
        </button>
      </form>
      {promoError && (
        <p className="mb-3 font-mono-tech text-[11px] text-rose-400">{promoError}</p>
      )}
      {promoCode && (
        <div className="mb-3 flex items-center justify-between rounded-lg bg-[#2563eb]/20 px-3 py-1.5 font-mono-tech text-[11px] text-[#7dd3fc]">
          <span>{t.cartDrawer.appliedCodePrefix} {promoCode}</span>
          <button
            type="button"
            onClick={clearPromo}
            className="text-white/60 hover:text-white cursor-pointer"
          >
            {t.cartDrawer.removeButton}
          </button>
        </div>
      )}
    </>
  )
})
