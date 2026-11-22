export interface NavCategoryItem {
  label: string
  active?: boolean
}

export const NAV_CATEGORIES: readonly NavCategoryItem[] = [
  { label: 'Groceries', active: true },
  { label: 'Premium Fruits' },
  { label: 'Home & Kitchen' },
  { label: 'Fashion' },
  { label: 'Electronics' },
  { label: 'Beauty' },
  { label: 'Home Improvement' },
  { label: 'Sports, Toys & Luggage' },
] as const

export interface SmartphoneProductSpec {
  id: string
  title: string
  price: string
  oldPrice: string
  saveText: string
  discount: string
  featured?: boolean
  variant: 0 | 1 | 2 | 3 | 4 | 5
}

export const SMARTPHONE_PRODUCTS: readonly SmartphoneProductSpec[] = [
  {
    id: 's22-mint',
    title: 'Galaxy S22 Ultra',
    price: '$329',
    oldPrice: '$749',
    saveText: 'Save - $420',
    discount: '56% OFF',
    variant: 0,
  },
  {
    id: 'm13-featured',
    title: 'Galaxy M13 (4GB | 64 GB)',
    price: '$149',
    oldPrice: '$249',
    saveText: 'Save - $100',
    discount: '56% OFF',
    featured: true,
    variant: 1,
  },
  {
    id: 'm33-teal',
    title: 'Galaxy M33 (4GB | 64 GB)',
    price: '$199',
    oldPrice: '$299',
    saveText: 'Save - $100',
    discount: '56% OFF',
    variant: 2,
  },
  {
    id: 'm53-slate',
    title: 'Galaxy M53 (4GB | 64 GB)',
    price: '$319',
    oldPrice: '$409',
    saveText: 'Save - $90',
    discount: '56% OFF',
    variant: 3,
  },
  {
    id: 's22-emerald',
    title: 'Galaxy S22 Ultra',
    price: '$679',
    oldPrice: '$859',
    saveText: 'Save - $180',
    discount: '56% OFF',
    variant: 4,
  },
  {
    id: 's24-titanium',
    title: 'Galaxy S24 Pro (8GB | 256 GB)',
    price: '$549',
    oldPrice: '$799',
    saveText: 'Save - $250',
    discount: '31% OFF',
    variant: 5,
  },
] as const

export type TopCategoryKind =
  | 'mobile'
  | 'cosmetics'
  | 'electronics'
  | 'furniture'
  | 'watches'
  | 'decor'
  | 'accessories'

export interface TopCategorySpec {
  kind: TopCategoryKind
  label: string
  featured?: boolean
}

export const TOP_CATEGORIES: readonly TopCategorySpec[] = [
  { kind: 'mobile', label: 'Mobile', featured: true },
  { kind: 'cosmetics', label: 'Cosmetics' },
  { kind: 'electronics', label: 'Electronics' },
  { kind: 'furniture', label: 'Furniture' },
  { kind: 'watches', label: 'Watches' },
  { kind: 'decor', label: 'Decor' },
  { kind: 'accessories', label: 'Accessories' },
] as const
