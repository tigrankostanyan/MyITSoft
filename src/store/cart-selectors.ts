import { useMemo } from 'react'
import { getProduct } from '~/data/products'
import type { CartLine } from '~/data/types'
import { computeTotals } from './cart-math'
import { selectPromoRate, useCartStore } from './cart-store'

export interface CartProductSummary {
  id: string
  name: string
  subtitle: string
  price: number
  image: string
}

export interface ResolvedLine extends CartLine {
  product: CartProductSummary
}

function resolveCartProduct(id: string): CartProductSummary | undefined {
  return getProduct(id)
}

export function useCartLines(): ResolvedLine[] {
  const items = useCartStore((s) => s.items)
  return useMemo(
    () =>
      items.flatMap((i) => {
        const product = resolveCartProduct(i.productId)
        return product ? [{ ...i, product }] : []
      }),
    [items],
  )
}

export function useCartTotals() {
  const lines = useCartLines()
  const rate = useCartStore(selectPromoRate)
  return useMemo(() => computeTotals(lines.map((l) => ({ price: l.product.price, qty: l.qty })), rate), [lines, rate])
}
