import { en } from './locales/en'
import { LOCALE_LABELS, type Locale, type ProductTranslation, type SiteTranslations } from './types'

export { LOCALE_LABELS, type Locale, type ProductTranslation, type SiteTranslations }

export const DEFAULT_TRANSLATIONS: SiteTranslations = en

const loadedLocales: Partial<Record<Locale, SiteTranslations>> = {
  en,
}

const pendingLoads: Partial<Record<Locale, Promise<SiteTranslations>>> = {}

/** Returns cached translations if already loaded, falling back to the default locale. */
export function getCachedTranslations(locale: Locale): SiteTranslations {
  return loadedLocales[locale] ?? DEFAULT_TRANSLATIONS
}

/** Lazy-loads a locale bundle on demand and caches it for synchronous reuse. */
export async function loadLocaleTranslations(locale: Locale): Promise<SiteTranslations> {
  const cached = loadedLocales[locale]
  if (cached) return cached

  const pending = pendingLoads[locale]
  if (pending) return pending

  const loader: Promise<SiteTranslations> =
    locale === 'ru'
      ? import('./locales/ru').then((m) => m.ru)
      : import('./locales/hy').then((m) => m.hy)

  const promise = loader.then((data) => {
    loadedLocales[locale] = data
    delete pendingLoads[locale]
    return data
  })

  pendingLoads[locale] = promise
  return promise
}
