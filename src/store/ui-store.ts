import { create } from 'zustand'
import { defaultRecentlyViewed } from '~/data/content'
import { TRANSLATIONS, type Locale, type SiteTranslations } from '~/i18n/translations'

type Theme = 'light' | 'dark'

export interface CartToastItem {
  id: string
  productName: string
  productImage?: string
  price?: number
  message: string
}

interface UIState {
  theme: Theme
  locale: Locale
  preloaderOpen: boolean
  preloaderSeen: boolean
  leftDrawerOpen: boolean
  cartOpen: boolean
  authModalOpen: boolean
  inspectorId: string | null // product shown in the inline 3D stage
  wishlist: string[]
  recentlyViewed: string[]
  toasts: CartToastItem[]
  toggleTheme: () => void
  setLocale: (locale: Locale) => void
  setPreloaderOpen: (open: boolean) => void
  dismissPreloader: () => void
  setLeftDrawer: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setAuthModalOpen: (open: boolean) => void
  toggleWishlist: (id: string) => void
  openInspector: (id: string | null) => void
  pushToast: (toast: Omit<CartToastItem, 'id'>) => void
  dismissToast: (id: string) => void
}

let toastSeq = 0

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('myitsoft_locale')
    if (saved === 'hy' || saved === 'ru' || saved === 'en') return saved
  }
  return 'hy'
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  locale: getInitialLocale(),
  preloaderOpen: true,
  preloaderSeen: false,
  leftDrawerOpen: false,
  cartOpen: false,
  authModalOpen: false,
  inspectorId: null,
  wishlist: [],
  recentlyViewed: defaultRecentlyViewed,
  toasts: [],
  toggleTheme: () =>
    set((s) => {
      const theme: Theme = s.theme === 'light' ? 'dark' : 'light'
      if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', theme === 'dark')
      return { theme }
    }),
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('myitsoft_locale', locale)
      document.documentElement.lang = locale
    }
    set({ locale })
  },
  setPreloaderOpen: (preloaderOpen) => set({ preloaderOpen }),
  dismissPreloader: () => set({ preloaderSeen: true, preloaderOpen: false }),
  setLeftDrawer: (leftDrawerOpen) => set({ leftDrawerOpen }),
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  toggleWishlist: (id) =>
    set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
  openInspector: (id) =>
    set((s) => ({
      inspectorId: id,
      recentlyViewed: id ? [id, ...s.recentlyViewed.filter((r) => r !== id)].slice(0, 4) : s.recentlyViewed,
    })),
  pushToast: (toast) => {
    const id = `toast-${++toastSeq}-${Date.now()}`
    set((s) => ({ toasts: [...s.toasts.slice(-2), { ...toast, id }] }))
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
      }, 3400)
    }
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export function useTranslations(): { locale: Locale; setLocale: (l: Locale) => void; t: SiteTranslations } {
  const locale = useUIStore((s) => s.locale)
  const setLocale = useUIStore((s) => s.setLocale)
  return { locale, setLocale, t: TRANSLATIONS[locale] }
}
