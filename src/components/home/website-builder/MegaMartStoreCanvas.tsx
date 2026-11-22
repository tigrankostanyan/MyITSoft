import { memo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SMARTPHONE_PRODUCTS, TOP_CATEGORIES } from './storeMockData'
import { HeroSmartWatchSvg, SmartphoneProductSvg } from './StoreProductArtwork'
import { CategoryArtworkSvg } from './CategoryArtworkSvg'
import { FigmaSelectionBox } from './FigmaSelectionBox'
import { MegaMartHeaderBar } from './MegaMartHeaderBar'

export interface StoreCanvasRefs {
  gridRef: React.RefObject<HTMLDivElement | null>
  headerRef: React.RefObject<HTMLDivElement | null>
  headerBoxRef: React.RefObject<HTMLDivElement | null>
  pillsRef: React.RefObject<HTMLDivElement | null>
  pillsBoxRef: React.RefObject<HTMLDivElement | null>
  heroRef: React.RefObject<HTMLDivElement | null>
  heroBoxRef: React.RefObject<HTMLDivElement | null>
  heroTitleClipRef: React.RefObject<HTMLDivElement | null>
  heroTitleBoxRef: React.RefObject<HTMLDivElement | null>
  heroWatchRef: React.RefObject<HTMLDivElement | null>
  dealsHeaderRef: React.RefObject<HTMLDivElement | null>
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  cardBoxRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  catHeaderRef: React.RefObject<HTMLDivElement | null>
  catBoxRef: React.RefObject<HTMLDivElement | null>
  catRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const MegaMartStoreCanvas = memo(function MegaMartStoreCanvas({
  refs,
  isMobile = false,
}: {
  refs: StoreCanvasRefs
  isMobile?: boolean
}) {
  if (isMobile) {
    return (
      <div className="relative h-[540px] w-[420px] overflow-hidden bg-white text-[#222222] select-none">
        <div
          ref={refs.gridRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(13, 153, 255, 0.16) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <MegaMartHeaderBar refs={refs} isMobile />

        <div className="relative z-20 px-3 pt-2">
          <div
            ref={refs.heroRef}
            className="relative flex h-[104px] items-center justify-between overflow-visible rounded-2xl bg-[#212844] px-3.5 text-white shadow-[0_10px_22px_rgba(33,40,68,0.18)]"
            style={{ opacity: 0 }}
          >
            <FigmaSelectionBox boxRef={(el) => { refs.heroBoxRef.current = el }} label="Mobile Hero · 396 × 104" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -top-12 -right-8 h-[160px] w-[160px] rounded-full bg-[#2c3556]" />
            </div>

            <div className="relative z-20 max-w-[235px]">
              <div className="text-[10px] font-medium text-white/85">Best Deal Online on smart watches</div>
              <div className="relative mt-0.5 inline-block px-0.5 py-0.5">
                <FigmaSelectionBox
                  boxRef={(el) => { refs.heroTitleBoxRef.current = el }}
                  label="Title · 19px"
                  insetClassName="-inset-1"
                />
                <div
                  ref={refs.heroTitleClipRef}
                  className="text-[19px] leading-[1.06] font-extrabold tracking-tight whitespace-nowrap text-white uppercase"
                >
                  SMART WEARABLE.
                </div>
              </div>
              <div className="mt-0.5 text-[11.5px] font-semibold tracking-wide text-[#7dd3fc]">UP to 80% OFF</div>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="h-1.5 w-4 rounded-full bg-white" />
                {[0, 1, 2, 3].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/40" />
                ))}
              </div>
            </div>

            <div ref={refs.heroWatchRef} className="relative z-20 h-[82px] w-[88px] shrink-0">
              <HeroSmartWatchSvg />
            </div>
          </div>
        </div>

        <div className="relative z-20 px-3 pt-1.5">
          <div
            ref={refs.dealsHeaderRef}
            className="flex items-center justify-between border-b border-[#ededed] pb-1"
            style={{ opacity: 0 }}
          >
            <div className="relative text-[11.5px] leading-tight font-bold text-[#666666]">
              Best deals on <span className="text-[#008ecc]">Smartphones</span>
              <span className="absolute -bottom-[5px] left-0 h-[2px] w-full rounded-full bg-[#008ecc]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[10px] leading-tight font-semibold text-[#222222]">
              View All <ChevronRight className="h-3 w-3 text-[#008ecc]" />
            </span>
          </div>

          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {SMARTPHONE_PRODUCTS.slice(0, 4).map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => { refs.cardRefs.current[idx] = el }}
                className={`relative overflow-visible rounded-xl bg-white transition-shadow ${
                  item.featured
                    ? 'border border-[#008ecc] shadow-[0_8px_18px_rgba(0,142,204,0.16)]'
                    : 'border border-[#ededed]'
                }`}
                style={{ opacity: 0 }}
              >
                <FigmaSelectionBox
                  boxRef={(el) => { refs.cardBoxRefs.current[idx] = el }}
                  label={`Card ${idx + 1}`}
                />
                <div className="relative flex h-[46px] items-center justify-center overflow-hidden rounded-t-xl bg-[#f5f5f5] p-1">
                  <span className="absolute top-0 right-0 rounded-bl-lg bg-[#008ecc] px-1.5 py-0.5 text-[8px] leading-none font-bold text-white">
                    56% OFF
                  </span>
                  <div className="h-[40px] w-[40px]">
                    <SmartphoneProductSvg variant={item.variant} />
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="truncate text-[10px] leading-tight font-semibold text-[#222222]">{item.title}</div>
                  <div className="mt-0.5 flex items-baseline gap-1.5 text-[10.5px] leading-tight">
                    <span className="font-bold text-[#222222]">{item.price}</span>
                    <span className="text-[9px] text-[#777777] line-through">{item.oldPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 px-3 pt-1.5">
          <div
            ref={refs.catHeaderRef}
            className="flex items-center justify-between border-b border-[#ededed] pb-1"
            style={{ opacity: 0 }}
          >
            <div className="relative text-[11.5px] leading-tight font-bold text-[#666666]">
              Top <span className="text-[#008ecc]">Categories</span>
              <span className="absolute -bottom-[5px] left-0 h-[2px] w-full rounded-full bg-[#008ecc]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[10px] leading-tight font-semibold text-[#222222]">
              View All <ChevronRight className="h-3 w-3 text-[#008ecc]" />
            </span>
          </div>

          <div className="relative mt-1.5 grid grid-cols-4 gap-2">
            <FigmaSelectionBox boxRef={(el) => { refs.catBoxRef.current = el }} label="Grid 4" />
            {TOP_CATEGORIES.slice(0, 4).map((cat, idx) => (
              <div
                key={cat.kind}
                ref={(el) => { refs.catRefs.current[idx] = el }}
                className="flex flex-col items-center gap-1"
                style={{ opacity: 0 }}
              >
                <div
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#f5f5f5] p-1.5 ${
                    cat.featured ? 'border-[1.5px] border-[#008ecc] shadow-[0_6px_14px_rgba(0,142,204,0.14)]' : ''
                  }`}
                >
                  <CategoryArtworkSvg kind={cat.kind} />
                </div>
                <span className="truncate text-[9.5px] leading-tight font-semibold text-[#222222]">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[666px] w-[1440px] overflow-hidden bg-white text-[#222222] select-none">
      <div
        ref={refs.gridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(13, 153, 255, 0.16) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <MegaMartHeaderBar refs={refs} />

      <div className="relative z-20 px-10 pt-3">
        <div
          ref={refs.heroRef}
          className="relative flex h-[158px] items-center justify-between overflow-visible rounded-2xl bg-[#212844] px-14 text-white shadow-[0_12px_28px_rgba(33,40,68,0.16)]"
          style={{ opacity: 0 }}
        >
          <FigmaSelectionBox boxRef={(el) => { refs.heroBoxRef.current = el }} label="Hero Banner · 1040 × 158" />

          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-20 right-16 h-[290px] w-[290px] rounded-full bg-[#2c3556]" />
            <div className="absolute -top-12 right-24 h-[230px] w-[230px] rounded-full border border-white/10" />
          </div>

          <span className="absolute top-1/2 -left-4 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#f3f9fb] text-[#008ecc] shadow">
            <ChevronLeft className="h-4 w-4" />
          </span>
          <span className="absolute top-1/2 -right-4 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#f3f9fb] text-[#008ecc] shadow">
            <ChevronRight className="h-4 w-4" />
          </span>

          <div className="relative z-20 max-w-[490px]">
            <div className="text-[14px] font-medium text-white/90">Best Deal Online on smart watches</div>
            <div className="relative mt-1 inline-block px-1 py-0.5">
              <FigmaSelectionBox
                boxRef={(el) => { refs.heroTitleBoxRef.current = el }}
                label="Headline · Bold 34px"
                insetClassName="-inset-1"
              />
              <div
                ref={refs.heroTitleClipRef}
                className="text-[34px] leading-[1.08] font-extrabold tracking-tight whitespace-nowrap text-white uppercase"
              >
                SMART WEARABLE.
              </div>
            </div>
            <div className="mt-1 text-[15px] font-semibold tracking-wide text-white/95">UP to 80% OFF</div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-1.5 w-5 rounded-full bg-white" />
              {[0, 1, 2, 3, 4, 5].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/40" />
              ))}
            </div>
          </div>

          <div ref={refs.heroWatchRef} className="relative z-20 mr-6 h-[144px] w-[158px] shrink-0">
            <HeroSmartWatchSvg />
          </div>
        </div>
      </div>

      <div className="relative z-20 px-10 pt-2.5">
        <div
          ref={refs.dealsHeaderRef}
          className="flex items-center justify-between border-b border-[#ededed] pb-1.5"
          style={{ opacity: 0 }}
        >
          <div className="relative text-[14px] font-bold text-[#666666]">
            Grab the best deal on <span className="text-[#008ecc]">Smartphones</span>
            <span className="absolute -bottom-[7px] left-0 h-[2.5px] w-full rounded-full bg-[#008ecc]" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#222222]">
            View All <ChevronRight className="h-3.5 w-3.5 text-[#008ecc]" />
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-6 gap-3.5">
          {SMARTPHONE_PRODUCTS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { refs.cardRefs.current[idx] = el }}
              className={`relative overflow-visible rounded-xl bg-white transition-shadow ${
                item.featured
                  ? 'border border-[#008ecc] shadow-[0_10px_22px_rgba(0,142,204,0.16)]'
                  : 'border border-[#ededed]'
              }`}
              style={{ opacity: 0 }}
            >
              <FigmaSelectionBox
                boxRef={(el) => { refs.cardBoxRefs.current[idx] = el }}
                label={`Card ${idx + 1} · 196×174`}
              />
              <div className="relative flex h-[96px] items-center justify-center overflow-hidden rounded-t-xl bg-[#f5f5f5] p-1.5">
                <span className="absolute top-0 right-0 rounded-bl-xl bg-[#008ecc] px-2 py-1 text-center text-[8.5px] leading-[1.05] font-bold text-white">
                  56%
                  <br />
                  OFF
                </span>
                <div className="h-[82px] w-[80px]">
                  <SmartphoneProductSvg variant={item.variant} />
                </div>
              </div>
              <div className="px-2.5 py-2">
                <div className="truncate text-[10.5px] font-semibold text-[#222222]">{item.title}</div>
                <div className="mt-0.5 flex items-baseline gap-1.5 text-[11px]">
                  <span className="font-bold text-[#222222]">{item.price}</span>
                  <span className="text-[10px] text-[#777777] line-through">{item.oldPrice}</span>
                </div>
                <div className="mt-1 border-t border-[#ededed] pt-1 text-[10px] font-semibold text-[#249b3e]">
                  {item.saveText}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 px-10 pt-2.5">
        <div
          ref={refs.catHeaderRef}
          className="flex items-center justify-between border-b border-[#ededed] pb-1.5"
          style={{ opacity: 0 }}
        >
          <div className="relative text-[14px] font-bold text-[#666666]">
            Shop From <span className="text-[#008ecc]">Top Categories</span>
            <span className="absolute -bottom-[7px] left-0 h-[2.5px] w-full rounded-full bg-[#008ecc]" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#222222]">
            View All <ChevronRight className="h-3.5 w-3.5 text-[#008ecc]" />
          </span>
        </div>

        <div className="relative mt-2.5 grid grid-cols-7 gap-3">
          <FigmaSelectionBox boxRef={(el) => { refs.catBoxRef.current = el }} label="Categories · Grid 7" />
          {TOP_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.kind}
              ref={(el) => { refs.catRefs.current[idx] = el }}
              className="flex flex-col items-center gap-1.5"
              style={{ opacity: 0 }}
            >
              <div
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f5f5f5] p-2.5 ${
                  cat.featured ? 'border-[1.5px] border-[#008ecc] shadow-[0_6px_16px_rgba(0,142,204,0.14)]' : ''
                }`}
              >
                <CategoryArtworkSvg kind={cat.kind} />
              </div>
              <span className="text-[10.5px] font-semibold text-[#222222]">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
