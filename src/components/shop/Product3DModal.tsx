import { useCallback, useEffect, useState } from 'react'
import { Check, Flame, Heart, Scale, ShoppingBag, Star, X } from 'lucide-react'
import { getProduct } from '~/data/products'
import { formatPrice } from '~/store/cart-math'
import { useCartStore } from '~/store/cart-store'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { Product3DViewerPane } from './Product3DViewerPane'

export function Product3DModal() {
  const { t } = useTranslations()
  const inspectorId = useUIStore((s) => s.inspectorId)
  const openInspector = useUIStore((s) => s.openInspector)
  const wishlist = useUIStore((s) => s.wishlist)
  const toggleWishlist = useUIStore((s) => s.toggleWishlist)
  const add = useCartStore((s) => s.add)
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  const baseProduct = inspectorId ? getProduct(inspectorId) : null
  const productTr = baseProduct ? t.products[baseProduct.id] : undefined
  const product = baseProduct && productTr ? { ...baseProduct, ...productTr } : baseProduct

  const [selectedColor, setSelectedColor] = useState('#d97706')
  const [exploded, setExploded] = useState(0)
  const [hologram, setHologram] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] ?? '#d97706')
      setExploded(0)
      setHologram(false)
      setAdded(false)
    }
  }, [product?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openInspector(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openInspector])

  const isWished = product ? wishlist.includes(product.id) : false
  const handleToggleHologram = useCallback(() => setHologram((h) => !h), [])

  const handleAddToCart = () => {
    if (!product) return
    add(product.id, `${product.weight} · ${product.subtitle}`)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openInspector(null)
      setCartOpen(true)
    }, 650)
  }

  if (!product) return null

  return (
    <div
      onClick={() => openInspector(null)}
      className="animate-modal-fade fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 backdrop-blur-xl sm:p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-pop relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-3xl border border-white/15 bg-[#0a1020] shadow-2xl shadow-[#1d4ed8]/30 lg:h-[90vh] lg:max-h-[780px] lg:grid-cols-12 lg:overflow-hidden"
      >
        <button
          type="button"
          aria-label={t.modal3D.closeAria}
          onClick={() => openInspector(null)}
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-white hover:text-black sm:top-4 sm:right-4 sm:h-10 sm:w-10 cursor-pointer"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </button>

        <Product3DViewerPane
          model={product.model}
          selectedColor={selectedColor}
          exploded={exploded}
          hologram={hologram}
          onExplodedChange={setExploded}
          onToggleHologram={handleToggleHologram}
        />

        <div className="flex flex-col justify-between p-4 sm:p-8 lg:col-span-5 lg:overflow-y-auto">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono-tech text-[10px] tracking-wider text-white/75 uppercase"
                >
                  {t.categoryLabels[cat]}
                </span>
              ))}
              {product.discount && (
                <span className="rounded-full bg-[#2563eb] px-2.5 py-0.5 font-mono-tech text-[10px] font-bold text-white">
                  {t.modal3D.discountPrefix} {product.discount}%
                </span>
              )}
            </div>

            <h2 className="font-display mt-4 text-2xl leading-tight text-white uppercase sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-1.5 text-sm text-white/65">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span>{product.rating}</span>
              </div>
              <span className="font-mono-tech text-xs text-white/60">
                {product.reviews} {t.modal3D.verifiedReviewsSuffix}
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="font-mono-tech text-base text-white/50 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/70">{product.description}</p>

            <div className="mt-5">
              <div className="font-mono-tech text-[10px] tracking-widest text-white/60 uppercase">
                {t.modal3D.includedModules}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/85"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-white/60 uppercase">
                  <Scale className="h-3 w-3 text-[#38bdf8]" aria-hidden="true" />
                  <span>{t.modal3D.timelineLabel}</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-white">
                  {product.weight} · {product.tag}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-white/60 uppercase">
                  <Flame className="h-3 w-3 text-[#00e5ff]" aria-hidden="true" />
                  <span>{t.modal3D.efficiencyLabel}</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-white">{product.calories}</div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-full py-4 font-heading text-xs font-bold tracking-wider uppercase transition cursor-pointer sm:text-sm ${
                added
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/40 hover:bg-white hover:text-[#070d1e]'
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>{t.modal3D.added}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {t.modal3D.addPrefix} · {formatPrice(product.price)}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              aria-label={t.modal3D.wishlistAria}
              onClick={() => toggleWishlist(product.id)}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-pink-400 hover:text-pink-400 cursor-pointer"
            >
              <Heart className={`h-5 w-5 ${isWished ? 'fill-pink-500 text-pink-500' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
