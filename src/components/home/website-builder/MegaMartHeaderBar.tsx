import { memo } from 'react'
import { ChevronDown, MapPin, Menu, Search, ShoppingCart, Tag, Truck, User } from 'lucide-react'
import { NAV_CATEGORIES } from './storeMockData'
import { FigmaSelectionBox } from './FigmaSelectionBox'
import type { StoreCanvasRefs } from './MegaMartStoreCanvas'

export const MegaMartHeaderBar = memo(function MegaMartHeaderBar({
  refs,
  isMobile = false,
}: {
  refs: StoreCanvasRefs
  isMobile?: boolean
}) {
  if (isMobile) {
    return (
      <>
        <div ref={refs.headerRef} className="relative z-20" style={{ opacity: 0 }}>
          <FigmaSelectionBox boxRef={(el) => { refs.headerBoxRef.current = el }} label="Mobile Header · 420 × 78" />
          <div className="flex h-[38px] items-center justify-between border-b border-[#ededed] bg-white px-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#f3f9fb] text-[#008ecc]">
                <Menu className="h-3.5 w-3.5" />
              </div>
              <span className="text-[16px] font-extrabold tracking-tight text-[#008ecc]">MegaMart</span>
            </div>

            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#333333]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f9fb] text-[#008ecc]">
                <User className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#008ecc] px-2.5 py-0.5 text-[10.5px] font-bold text-white">
                <ShoppingCart className="h-3 w-3" />
                <span>3</span>
              </span>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5">
            <div className="flex h-[28px] w-full items-center justify-between rounded-lg bg-[#f3f9fb] px-3 text-[11px] text-[#666666]">
              <span className="inline-flex items-center gap-2 truncate">
                <Search className="h-3.5 w-3.5 shrink-0 text-[#008ecc]" />
                <span className="truncate">Search smartphones, watches...</span>
              </span>
            </div>
          </div>
        </div>

        <div
          ref={refs.pillsRef}
          className="relative z-20 flex items-center gap-1.5 overflow-hidden border-b border-[#ededed] bg-white px-3 pb-1.5"
          style={{ opacity: 0 }}
        >
          <FigmaSelectionBox boxRef={(el) => { refs.pillsBoxRef.current = el }} label="Categories · Mobile" />
          {NAV_CATEGORIES.slice(0, 4).map((cat) => (
            <span
              key={cat.label}
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                cat.active ? 'bg-[#008ecc] text-white' : 'bg-[#f3f9fb] text-[#222222]'
              }`}
            >
              <span>{cat.label}</span>
            </span>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div ref={refs.headerRef} className="relative z-20" style={{ opacity: 0 }}>
        <FigmaSelectionBox boxRef={(el) => { refs.headerBoxRef.current = el }} label="Header · 1120 × 82" />
        <div className="flex h-[28px] items-center justify-between bg-[#f5f5f5] px-10 text-[10.5px] font-medium text-[#666666]">
          <span>Welcome to worldwide Megamart!</span>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#008ecc]" /> Deliver to <strong className="text-[#222222]">423651</strong>
            </span>
            <span className="h-3 w-px bg-[#d9d9d9]" />
            <span className="inline-flex items-center gap-1">
              <Truck className="h-3 w-3 text-[#008ecc]" /> Track your order
            </span>
            <span className="h-3 w-px bg-[#d9d9d9]" />
            <span className="inline-flex items-center gap-1">
              <Tag className="h-3 w-3 text-[#008ecc]" /> All Offers
            </span>
          </div>
        </div>

        <div className="flex h-[54px] items-center justify-between border-b border-[#ededed] bg-white px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f9fb] text-[#008ecc]">
              <Menu className="h-4 w-4" />
            </div>
            <span className="text-[20px] font-extrabold tracking-tight text-[#008ecc]">MegaMart</span>
          </div>

          <div className="flex h-[34px] w-[420px] items-center justify-between rounded-lg bg-[#f3f9fb] px-3.5 text-[11px] text-[#666666]">
            <span className="inline-flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[#008ecc]" />
              <span>Search essentials, groceries and more...</span>
            </span>
            <div className="flex flex-col gap-[2px]">
              <span className="h-[1.5px] w-3.5 bg-[#008ecc]" />
              <span className="h-[1.5px] w-2.5 bg-[#008ecc]" />
              <span className="h-[1.5px] w-3.5 bg-[#008ecc]" />
            </div>
          </div>

          <div className="flex items-center gap-5 text-[11.5px] font-semibold text-[#333333]">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-[#008ecc]" />
              <span>Sign Up/Sign In</span>
            </span>
            <span className="h-4 w-px bg-[#e2e8f0]" />
            <span className="inline-flex items-center gap-1.5">
              <ShoppingCart className="h-4 w-4 text-[#008ecc]" />
              <span>Cart</span>
            </span>
          </div>
        </div>
      </div>

      <div
        ref={refs.pillsRef}
        className="relative z-20 flex items-center justify-between border-b border-[#ededed] bg-white px-10 py-2.5"
        style={{ opacity: 0 }}
      >
        <FigmaSelectionBox boxRef={(el) => { refs.pillsBoxRef.current = el }} label="Category Pills · Auto Layout" />
        {NAV_CATEGORIES.map((cat) => (
          <span
            key={cat.label}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10.5px] font-semibold ${
              cat.active ? 'bg-[#008ecc] text-white' : 'bg-[#f3f9fb] text-[#222222]'
            }`}
          >
            <span>{cat.label}</span>
            <ChevronDown className={`h-3 w-3 ${cat.active ? 'text-white' : 'text-[#008ecc]'}`} />
          </span>
        ))}
      </div>
    </>
  )
})
