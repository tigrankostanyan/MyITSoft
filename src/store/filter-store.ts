import { useMemo } from 'react'
import { create } from 'zustand'
import { products } from '~/data/products'
import type { CategoryId, Product, Section } from '~/data/types'

export type CategoryFilter = CategoryId | 'all'

interface FilterState {
  query: string
  category: CategoryFilter
  setQuery: (q: string) => void
  // clicking the active category again clears the filter
  toggleCategory: (c: CategoryFilter) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  query: '',
  category: 'all',
  setQuery: (query) => set({ query }),
  toggleCategory: (c) => set((s) => ({ category: s.category === c ? 'all' : c })),
  reset: () => set({ query: '', category: 'all' }),
}))

export function matchesFilters(p: Product, query: string, category: CategoryFilter) {
  const q = query.trim().toLowerCase()
  const textOk = !q || `${p.name} ${p.subtitle}`.toLowerCase().includes(q)
  return textOk && (category === 'all' || p.categories.includes(category))
}

// Live-filtered products for one grid section
export function useFilteredProducts(section: Section): Product[] {
  const query = useFilterStore((s) => s.query)
  const category = useFilterStore((s) => s.category)
  return useMemo(
    () => products.filter((p) => p.sections.includes(section) && matchesFilters(p, query, category)),
    [section, query, category],
  )
}
