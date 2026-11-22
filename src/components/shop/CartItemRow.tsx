import { memo } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { ResolvedLine } from '~/store/cart-selectors'
import { formatPrice } from '~/store/cart-math'
import { useTranslations } from '~/store/ui-store'

interface CartItemRowProps {
  line: ResolvedLine
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
}

export const CartItemRow = memo(function CartItemRow({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const { t } = useTranslations()
  const tr = t.products[line.product.id]
  const displayName = tr?.name ?? line.product.name
  return (
    <div className="flex gap-3.5 rounded-2xl border border-white/10 bg-[#1a1a23] p-3">
      <img
        src={line.product.image}
        alt={displayName}
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate font-heading text-sm font-bold text-white">
              {displayName}
            </h4>
            <p className="truncate text-[11px] text-white/50">{line.variant}</p>
          </div>
          <button
            type="button"
            aria-label={t.cartDrawer.removeAria}
            onClick={() => onRemove(line.productId)}
            className="text-white/40 transition hover:text-rose-400 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-2 py-0.5">
            <button
              type="button"
              aria-label={t.cartDrawer.decreaseAria}
              onClick={() => onDecrement(line.productId)}
              className="p-1 text-white/70 hover:text-white cursor-pointer"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-5 text-center font-mono-tech text-xs font-bold text-white">
              {line.qty}
            </span>
            <button
              type="button"
              aria-label={t.cartDrawer.increaseAria}
              onClick={() => onIncrement(line.productId)}
              className="p-1 text-white/70 hover:text-white cursor-pointer"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="font-mono-tech text-sm font-bold text-white">
            {formatPrice(line.product.price * line.qty)}
          </span>
        </div>
      </div>
    </div>
  )
})
