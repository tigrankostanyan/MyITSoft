import type { CartLine, CategoryId } from './types'

export const CONTACT_PHONE = '+37455333525'
export const CONTACT_PHONE_DISPLAY = '+374 (55) 333-525'
export const CONTACT_EMAIL = 'MyITSoft@mail.ru'
export const CONTACT_ADDRESS = 'Հայաստան, Երևան, Մովսես Խորենացի փող. 15'

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  websites: 'Վեբ կայքեր',
  automation: 'Ավտոմատացում',
  bots: 'AI և Բոտեր',
  ecommerce: 'Օնլայն խանութներ',
  cloud: 'Cloud և API',
}

export const navItems = [
  { label: 'Գլխավոր', icon: 'Home' },
  { label: 'Լուծումներ', icon: 'LayoutGrid' },
  { label: 'Հատուկ առաջարկ', icon: 'Tag', badge: 'Թոփ' },
  { label: 'Ավտոմատացում', icon: 'Sparkles' },
  { label: 'Ամենապահանջվածը', icon: 'ThumbsUp' },
  { label: 'Enterprise', icon: 'Gem' },
] as const

export const accountNav = [
  { label: 'Իմ նախագծերը', icon: 'ClipboardList' },
  { label: 'Նախընտրածներ', icon: 'Heart' },
  { label: 'Պրոմո կոդեր', icon: 'Ticket' },
  { label: 'Հաշիվներ', icon: 'MapPin' },
  { label: 'Կարգավորումներ', icon: 'Settings' },
] as const

export const categories: { id: CategoryId | 'more'; label: string; icon: string }[] = [
  { id: 'websites', label: 'Վեբ կայքեր և 3D', icon: 'Globe' },
  { id: 'automation', label: 'Բիզնեսի ավտոմատացում', icon: 'Workflow' },
  { id: 'bots', label: 'AI և Telegram բոտեր', icon: 'Bot' },
  { id: 'ecommerce', label: 'Օնլայն խանութներ', icon: 'ShoppingCart' },
  { id: 'cloud', label: 'Cloud և API', icon: 'Server' },
  { id: 'more', label: 'Ավելին', icon: 'LayoutGrid' },
]

export const heroSlides = [
  {
    pill: 'MyITSoft · Հայաստան',
    title: 'Ստեղծում ենք ապագայի կայքեր',
    subtitle: 'Ժամանակակից վեբ կայքեր, 3D ինտերֆեյսներ և բիզնեսի լիարժեք ավտոմատացում։',
    cta: 'Դիտել լուծումները',
  },
  {
    pill: 'Ավտոմատացում 24/7',
    title: 'Բիզնեսը՝ ավտոպիլոտի վրա',
    subtitle: 'CRM, ERP, AI օգնականներ և Telegram բոտեր՝ զրո ձեռքի աշխատանքով։',
    cta: 'Դիտել լուծումները',
  },
]

export const promoCards = [
  { id: 'flash', title: 'Հատուկ փաթեթներ', text: 'Կայք + CRM ավտոմատացում', highlight: 'Մինչև 20% զեղչ', tone: '#e0f2fe' },
  { id: 'shipping', title: 'Անվճար աուդիտ', text: 'Ձեր բիզնեսի ամբողջական վերլուծություն', cta: 'Պատվիրել', tone: '#dbeafe' },
  { id: 'arrivals', title: 'AI Ինտեգրացիա', text: 'Ավտոմատացրեք վաճառքները', cta: 'Դիտել', tone: '#e0e7ff' },
]

export const FLASH_SALE_START_SECONDS = 2 * 3600 + 45 * 60 + 18

export const trustBadges = [
  { icon: 'ShieldCheck', title: 'Պայմանագիր և Երաշխիք', text: '12 ամիս տեխնիկական աջակցություն' },
  { icon: 'RotateCcw', title: 'Արագ մեկնարկ', text: 'MVP տարբերակը՝ 7–14 օրում' },
  { icon: 'Headset', title: '24/7 Աջակցություն', text: 'Անձնական IT թիմ՝ միշտ կապի մեջ' },
  { icon: 'Star', title: '4.9★ Վստահություն', text: '80+ հաջողված նախագիծ' },
]

export const paymentMethods = ['Բանկային փոխանցում', 'Idram', 'ArCa', 'Visa', 'Mastercard', 'Պայմանագրով']

export const defaultCart: CartLine[] = [
  { productId: 'interactive-3d-website', variant: 'Next.js · 3D WebGL · SEO', qty: 1 },
  { productId: 'crm-business-automation', variant: 'CRM · ERP · Ավտոմատացում', qty: 1 },
]

export const defaultRecentlyViewed = ['ai-sales-bot', 'ecommerce-pro-platform', 'cloud-api-hub', 'corporate-web-portal']
export const defaultUser = { name: 'Արամ Պետրոսյան', notifications: 2 }
