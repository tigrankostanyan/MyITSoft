import { memo, useRef } from 'react'
import { useTranslations, useUIStore } from '~/store/ui-store'
import { useInView } from '~/lib/useInView'
import { MegaMartStoreCanvas, type StoreCanvasRefs } from './MegaMartStoreCanvas'
import { MultiplayerCursorsLayer } from './MultiplayerCursorsLayer'
import { BrowserToolbar } from './BrowserToolbar'
import { BuildStageCaption } from './BuildStageCaption'
import { useBuilderChoreography } from './useBuilderChoreography'

interface WebsiteBuilderStageProps {
  scrollProgressRef: React.MutableRefObject<number>
}

export const WebsiteBuilderStage = memo(function WebsiteBuilderStage({
  scrollProgressRef,
}: WebsiteBuilderStageProps) {
  const { t } = useTranslations()
  const { ref: inViewRef, inView } = useInView('220px', false)
  const modalOpen = useUIStore((s) => s.inspectorId !== null)

  const windowRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const sslBadgeRef = useRef<HTMLSpanElement>(null)
  const stageCaptionRef = useRef<HTMLDivElement>(null)
  const stageStepRefs = useRef<(HTMLSpanElement | null)[]>([])
  const stageDotRefs = useRef<(HTMLSpanElement | null)[]>([])

  const cursorRefs = useRef<(HTMLDivElement | null)[]>([])
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([])

  const storeRefs: StoreCanvasRefs = {
    gridRef: useRef<HTMLDivElement>(null),
    headerRef: useRef<HTMLDivElement>(null),
    headerBoxRef: useRef<HTMLDivElement>(null),
    pillsRef: useRef<HTMLDivElement>(null),
    pillsBoxRef: useRef<HTMLDivElement>(null),
    heroRef: useRef<HTMLDivElement>(null),
    heroBoxRef: useRef<HTMLDivElement>(null),
    heroTitleClipRef: useRef<HTMLDivElement>(null),
    heroTitleBoxRef: useRef<HTMLDivElement>(null),
    heroWatchRef: useRef<HTMLDivElement>(null),
    dealsHeaderRef: useRef<HTMLDivElement>(null),
    cardRefs: useRef<(HTMLDivElement | null)[]>([]),
    cardBoxRefs: useRef<(HTMLDivElement | null)[]>([]),
    catHeaderRef: useRef<HTMLDivElement>(null),
    catBoxRef: useRef<HTMLDivElement>(null),
    catRefs: useRef<(HTMLDivElement | null)[]>([]),
  }

  const isMobile = useBuilderChoreography({
    inView,
    modalOpen,
    scrollProgressRef,
    windowRef,
    haloRef,
    progressBarRef,
    sslBadgeRef,
    stageStepRefs,
    stageDotRefs,
    cursorRefs,
    ringRefs,
    storeRefs,
  })

  return (
    <div
      ref={inViewRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-[74vh] w-[78%] max-w-[1150px] rounded-full blur-[90px] will-change-transform"
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.24) 0%, rgba(37, 99, 235, 0.14) 48%, transparent 78%)',
        }}
      />

      <div
        ref={windowRef}
        className={`relative shrink-0 overflow-visible will-change-transform ${
          isMobile ? 'h-[578px] w-[420px]' : 'h-[710px] w-[1440px]'
        }`}
        style={{ transformOrigin: 'center center' }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/60 bg-white shadow-[0_38px_90px_-18px_rgba(2,6,23,0.85),0_0_0_1px_rgba(148,163,184,0.28)]">
          <BrowserToolbar
            isMobile={isMobile}
            sslBadgeRef={sslBadgeRef}
            progressBarRef={progressBarRef}
          />
          <MegaMartStoreCanvas refs={storeRefs} isMobile={isMobile} />
        </div>

        <MultiplayerCursorsLayer cursorRefs={cursorRefs} ringRefs={ringRefs} />

        <BuildStageCaption
          stages={t.cartJourney.processStages}
          stageCaptionRef={stageCaptionRef}
          stageStepRefs={stageStepRefs}
          stageDotRefs={stageDotRefs}
        />
      </div>
    </div>
  )
})
