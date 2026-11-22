import { memo, useRef, useState } from 'react'
import { ArrowRight, Check, Cpu, ShoppingCart } from 'lucide-react'
import type { Product } from '~/data/types'
import { formatPrice } from '~/store/cart-math'
import { useCartStore } from '~/store/cart-store'
import { useUIStore } from '~/store/ui-store'

interface ProductCardProps {
  product: Product
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const add = useCartStore((s) => s.add)
  const openInspector = useUIStore((s) => s.openInspector)

  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const [justAdded, setJustAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    add(product.id, `${product.weight} · ${product.subtitle}`)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  const handleSeeDetail = (e: React.MouseEvent) => {
    e.stopPropagation()
    openInspector(product.id)
  }

  // Zero-rerender 3D magnetic tilt + specular glare following mouse cursor (desktop only)
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    setIsHovered(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width // 0..1
    const ny = (e.clientY - rect.top) / rect.height // 0..1
    const rotY = (nx - 0.5) * 14
    const rotX = (0.5 - ny) * 12

    el.style.setProperty('--hover-rx', `${rotX.toFixed(2)}deg`)
    el.style.setProperty('--hover-ry', `${rotY.toFixed(2)}deg`)

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle 220px at ${(nx * 100).toFixed(1)}% ${(ny * 100).toFixed(1)}%, rgba(124, 108, 255, 0.24), rgba(0, 229, 255, 0.08) 45%, transparent 75%)`
    }
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    const el = cardRef.current
    if (el) {
      el.style.setProperty('--hover-rx', '0deg')
      el.style.setProperty('--hover-ry', '0deg')
    }
  }

  const marqueeLabel = `${product.name.toUpperCase()} \u00A0·\u00A0 `

  return (
    <div
      ref={cardRef}
      onClick={() => openInspector(product.id)}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          'perspective(1100px) rotateY(calc(var(--scroll-tilt, 0deg) + var(--hover-ry, 0deg))) rotateX(var(--hover-rx, 0deg))',
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex h-[380px] w-full flex-col items-center justify-between overflow-hidden rounded-[16px] border border-white/[0.1] bg-[#1e1d30]/95 px-3.5 pt-5 pb-4 transition-[border-color,background-color,box-shadow] duration-300 select-none cursor-pointer hover:border-white/90 hover:bg-[#25243d] hover:shadow-[0_18px_48px_rgba(79,59,255,0.28)] min-[360px]:h-[415px] min-[360px]:px-4 sm:h-[455px] sm:px-5 sm:pt-7 sm:pb-6"
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className="relative z-20 flex w-full flex-col items-center text-center"
        style={{ transform: 'translateZ(18px)' }}
      >
        <h3 className="font-heading line-clamp-1 max-w-full text-[11px] font-semibold tracking-[0.06em] text-white/95 uppercase min-[360px]:text-[12px] sm:text-[13px]">
          {product.name}
        </h3>

        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.08] px-2.5 py-0.5 sm:mt-2.5 sm:px-3">
          <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-white/90">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="font-mono-tech text-[10px] text-white/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>

      <div
        className="relative my-1.5 flex w-full flex-1 items-center justify-center sm:my-2"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-20px] top-1/2 z-10 -translate-y-1/2 overflow-hidden"
          >
            <div className="animate-card-marquee">
              <span className="font-display pr-6 text-[48px] leading-none tracking-tight text-white/28 uppercase sm:text-[62px]">
                {marqueeLabel}
                {marqueeLabel}
              </span>
              <span className="font-display pr-6 text-[48px] leading-none tracking-tight text-white/28 uppercase sm:text-[62px]">
                {marqueeLabel}
                {marqueeLabel}
              </span>
            </div>
          </div>
        )}

        <div
          className="relative z-20 flex flex-col items-center justify-center will-change-transform"
          style={{
            transform:
              'translate3d(var(--food-lag, 0px), var(--food-lift, 0px), 38px) rotateZ(var(--food-spin, 0deg))',
          }}
        >
          <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/20 bg-[#151421] shadow-[0_24px_42px_rgba(0,0,0,0.72)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110 min-[360px]:h-42 min-[360px]:w-42 sm:h-48 sm:w-48">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${product.fallback[0]}, ${product.fallback[1]})`,
                }}
              >
                <Cpu className="h-10 w-10 text-white/40 sm:h-12 sm:w-12" />
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
          </div>

          <div
            className="mt-2.5 h-3 w-28 rounded-full bg-black/60 blur-sm transition-transform duration-500 group-hover:scale-x-85 sm:mt-3 sm:w-32"
            style={{
              transform: 'translate3d(calc(var(--food-lag, 0px) * -0.45), 0px, -20px)',
            }}
          />
        </div>
      </div>

      <div
        className="relative z-20 flex h-10 w-full items-center justify-center sm:h-11"
        style={{ transform: 'translateZ(22px)' }}
      >
        <div className="hidden md:flex absolute inset-0 items-center justify-center transition-all duration-300 group-hover:pointer-events-none group-hover:translate-y-2 group-hover:opacity-0">
          <span className="truncate font-sans text-[11px] tracking-wide text-white/45">
            {product.weight} &nbsp;·&nbsp; {product.tag}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 md:pointer-events-none md:absolute md:inset-0 md:translate-y-2 md:gap-2.5 md:opacity-0 md:transition-all md:duration-300 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Ավելացնել ${product.name} զամբյուղ`}
            onClick={handleAdd}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition sm:h-10 sm:w-10 cursor-pointer ${
              justAdded
                ? 'border-emerald-400 bg-emerald-500 text-black'
                : 'border-white/25 bg-white/10 text-white hover:border-white hover:bg-white/20'
            }`}
          >
            {justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={handleSeeDetail}
            className="flex h-9 items-center gap-2 rounded-lg bg-white px-3.5 font-heading text-[10px] font-bold tracking-[0.06em] text-[#14141d] uppercase shadow-lg transition hover:bg-white/90 sm:h-10 sm:gap-2.5 sm:px-4 sm:text-[11px] cursor-pointer"
          >
            <span>ՄԱՆՐԱՄԱՍՆ</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#14141d]/30">
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
})
