import { memo } from 'react'
import { MegaMartDesktopCanvas } from './MegaMartDesktopCanvas'
import { MegaMartMobileCanvas } from './MegaMartMobileCanvas'

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
  return isMobile ? (
    <MegaMartMobileCanvas refs={refs} />
  ) : (
    <MegaMartDesktopCanvas refs={refs} />
  )
})
