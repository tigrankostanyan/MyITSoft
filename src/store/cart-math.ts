export const PROMO_CODES: Record<string, number> = {
  MYIT10: 0.1,
  MYIT20: 0.2,
  SOFT10: 0.1,
  SOFT20: 0.2,
}
export const FREE_SHIPPING_MIN = 250000
export const FLAT_SHIPPING = 0

export interface Totals {
  subtotal: number
  discount: number
  shipping: number
  total: number
}

// Integer AMD math avoids float drift
export function computeTotals(lines: { price: number; qty: number }[], promoRate: number): Totals {
  const subtotal = lines.reduce((sum, l) => sum + Math.round(l.price) * l.qty, 0)
  const discount = Math.round(subtotal * promoRate)
  const afterDiscount = subtotal - discount
  const shipping = 0
  return {
    subtotal,
    discount,
    shipping,
    total: afterDiscount + shipping,
  }
}

export const formatPrice = (n: number) =>
  `${Math.round(n).toLocaleString('hy-AM')} ֏`
