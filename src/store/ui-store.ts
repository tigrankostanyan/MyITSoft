import { create } from 'zustand'
import { defaultRecentlyViewed } from '~/data/content'
import {
  DEFAULT_TRANSLATIONS,
  getCachedTranslations,
  loadLocaleTranslations,
  type Locale,
  type SiteTranslations,
} from '~/i18n/translations'

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
  translations: SiteTranslations
  preloaderOpen: boolean
  preloaderSeen: boolean
  heroReady: boolean
  leftDrawerOpen: boolean
  cartOpen: boolean
  authModalOpen: boolean
  inspectorId: string | null
  wishlist: string[]
  recentlyViewed: string[]
  toasts: CartToastItem[]
  toggleTheme: () => void
  setLocale: (locale: Locale) => Promise<void>
  hydrateLocale: () => void
  setPreloaderOpen: (open: boolean) => void
  dismissPreloader: () => void
  setHeroReady: (ready: boolean) => void
  setLeftDrawer: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setAuthModalOpen: (open: boolean) => void
  toggleWishlist: (id: string) => void
  openInspector: (id: string | null) => void
  pushToast: (toast: Omit<CartToastItem, 'id'>) => void
  dismissToast: (id: string) => void
}

let toastSeq = 0

function ensureArmenianFont() {
  if (typeof document === 'undefined') return
  if (document.querySelector('link[data-myitsoft-hy-font="1"]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400..900&display=swap'
  link.dataset.myitsoftHyFont = '1'
  document.head.appendChild(link)
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'light',
  locale: 'en',
  translations: DEFAULT_TRANSLATIONS,
  preloaderOpen: true,
  preloaderSeen: false,
  heroReady: false,
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
  setLocale: async (locale) => {
    if (locale === 'hy') {
      ensureArmenianFont()
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('myitsoft_locale', locale)
      document.documentElement.lang = locale
    }
    const immediate = getCachedTranslations(locale)
    set({ locale, translations: immediate })
    const loaded = await loadLocaleTranslations(locale)
    if (get().locale === locale) {
      set({ translations: loaded })
    }
  },
  hydrateLocale: () => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('myitsoft_locale')
    if (saved === 'hy' || saved === 'ru') {
      void get().setLocale(saved)
    }
  },
  setPreloaderOpen: (preloaderOpen) => set({ preloaderOpen }),
  dismissPreloader: () => set({ preloaderSeen: true, preloaderOpen: false }),
  setHeroReady: (heroReady) => set({ heroReady }),
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

export function useTranslations(): { locale: Locale; setLocale: (l: Locale) => Promise<void>; t: SiteTranslations } {
  const locale = useUIStore((s) => s.locale)
  const setLocale = useUIStore((s) => s.setLocale)
  const t = useUIStore((s) => s.translations)
  return { locale, setLocale, t }
}
