export type CategoryId = 'websites' | 'automation' | 'bots' | 'ecommerce' | 'cloud'
export type ModelKind =
  | 'stack'
  | 'hub'
  | 'laptop'
  | 'phone'
  | 'server'
  | 'crm'
  | 'bot'
  | 'gear'
export type Section = 'deal' | 'recommended' | 'suggested'

export interface Product {
  id: string
  name: string
  subtitle: string
  weight: string
  tag: string
  calories: string
  description: string
  ingredients: string[]
  categories: CategoryId[]
  price: number
  oldPrice?: number
  discount?: number
  rating: number
  reviews: number
  colors: string[]
  image: string
  fallback: [string, string]
  model: ModelKind
  sections: Section[]
}

export interface CartLine {
  productId: string
  variant: string
  qty: number
}
