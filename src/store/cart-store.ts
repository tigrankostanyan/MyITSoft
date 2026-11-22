import { create } from 'zustand'
import { defaultCart } from '~/data/content'
import { getProduct } from '~/data/products'
import type { CartLine } from '~/data/types'
import { PROMO_CODES } from './cart-math'
import { useUIStore } from './ui-store'

interface CartState {
  items: CartLine[]
  promoCode: string | null
  promoError: string | null
  add: (productId: string, variant?: string) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  remove: (productId: string) => void
  applyPromo: (code: string) => boolean
  clearPromo: () => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: defaultCart,
  promoCode: 'MYIT10',
  promoError: null,
  add: (productId, variant) => {
    const productInfo = getProduct(productId)
    set((s) => {
      const found = s.items.find((i) => i.productId === productId)
      if (found) return { items: s.items.map((i) => (i === found ? { ...i, qty: i.qty + 1 } : i)) }
      const fallbackVariant = variant ?? productInfo?.subtitle ?? ''
      return { items: [...s.items, { productId, variant: fallbackVariant, qty: 1 }] }
    })
    if (productInfo) {
      useUIStore.getState().pushToast({
        productName: productInfo.name,
        productImage: productInfo.image,
        price: productInfo.price,
        message: 'Ավելացվեց զամբյուղում',
      })
    }
  },
  increment: (id) =>
    set((s) => ({ items: s.items.map((i) => (i.productId === id ? { ...i, qty: Math.min(i.qty + 1, 99) } : i)) })),
  decrement: (id) =>
    set((s) => ({ items: s.items.map((i) => (i.productId === id ? { ...i, qty: Math.max(i.qty - 1, 1) } : i)) })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
  applyPromo: (raw) => {
    const code = raw.trim().toUpperCase()
    if (!PROMO_CODES[code]) {
      set({ promoError: 'Անվավեր պրոմո կոդ' })
      return false
    }
    set({ promoCode: code, promoError: null })
    return true
  },
  clearPromo: () => set({ promoCode: null, promoError: null }),
  clear: () => set({ items: [], promoCode: null, promoError: null }),
}))

export const selectCartCount = (s: CartState) => s.items.reduce((n, i) => n + i.qty, 0)
export const selectPromoRate = (s: CartState) => (s.promoCode ? PROMO_CODES[s.promoCode] ?? 0 : 0)
export const getCartSnapshot = () => useCartStore.getState()
