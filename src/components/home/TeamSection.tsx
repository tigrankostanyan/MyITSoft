import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { signedOffset } from '~/lib/scroll-math'
import { TEAM_MEMBERS } from './team/teamData'
import { TeamIntroStage } from './team/TeamIntroStage'
import { TeamMemberCard } from './team/TeamMemberCard'
import { useTeamChoreography } from './team/useTeamChoreography'

export const TeamSection = memo(function TeamSection() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const introSubtitleRef = useRef<HTMLDivElement>(null)
  const handsStageRef = useRef<HTMLDivElement>(null)
  const humanWrapRef = useRef<HTMLDivElement>(null)
  const robotWrapRef = useRef<HTMLDivElement>(null)
  const humanHandRef = useRef<HTMLImageElement>(null)
  const robotHandRef = useRef<HTMLImageElement>(null)
  const handSparkRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const titleFillRef = useRef<HTMLDivElement>(null)
  const titleOutlineRef = useRef<HTMLDivElement>(null)
  const phoneStageRef = useRef<HTMLDivElement>(null)
  const phoneBezelRef = useRef<HTMLDivElement>(null)
  const cardSlotRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeIdx, setActiveIdx] = useState(0)
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [viewportWidth, setViewportWidth] = useState(1440)

  const targetSlideRef = useRef(0)
  const smoothSlideRef = useRef(0)
  const lastScrollStepRef = useRef(0)
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragOffsetRef = useRef(0)
  const didDragRef = useRef(false)
  const pausedRef = useRef(false)

  const total = TEAM_MEMBERS.length
  const activeMember = TEAM_MEMBERS[activeIdx]

  const handleActiveSlideChange = useCallback((normalized: number) => {
    setActiveIdx(normalized)
    setFlippedId(null)
  }, [])

  const choreographyRefs = useMemo(
    () => ({
      runwayRef,
      introSubtitleRef,
      handsStageRef,
      humanWrapRef,
      robotWrapRef,
      humanHandRef,
      robotHandRef,
      handSparkRef,
      titleWrapRef,
      titleFillRef,
      titleOutlineRef,
      phoneStageRef,
      phoneBezelRef,
      cardSlotRefs,
      targetSlideRef,
      smoothSlideRef,
      lastScrollStepRef,
      draggingRef,
      dragOffsetRef,
      pausedRef,
    }),
    [],
  )

  const wakeChoreography = useTeamChoreography(choreographyRefs, total, handleActiveSlideChange)

  const stepSlide = useCallback(
    (delta: number) => {
      targetSlideRef.current += delta
      const normalized = (((Math.round(targetSlideRef.current) % total) + total) % total)
      handleActiveSlideChange(normalized)
      wakeChoreography()
    },
    [total, handleActiveSlideChange, wakeChoreography],
  )

  const goPrev = useCallback(() => stepSlide(-1), [stepSlide])
  const goNext = useCallback(() => stepSlide(1), [stepSlide])

  const selectByCardIndex = useCallback(
    (cardIndex: number) => {
      if (didDragRef.current) return
      const current = Math.round(targetSlideRef.current)
      const diff = Math.round(signedOffset(cardIndex, current, total))
      if (diff !== 0) stepSlide(diff)
    },
    [stepSlide, total],
  )

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth || 1440)
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    },
    [goPrev, goNext],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('button')) return
      draggingRef.current = true
      didDragRef.current = false
      dragStartXRef.current = e.clientX
      dragOffsetRef.current = 0
      e.currentTarget.setPointerCapture(e.pointerId)
      wakeChoreography()
    },
    [wakeChoreography],
  )

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const dx = e.clientX - dragStartXRef.current
    if (Math.abs(dx) > 8) didDragRef.current = true
    dragOffsetRef.current = Math.max(-240, Math.min(240, dx))
  }, [])

  const finishDrag = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    const dx = dragOffsetRef.current
    dragOffsetRef.current = 0
    if (dx < -48) goNext()
    else if (dx > 48) goPrev()
    else wakeChoreography()
  }, [goNext, goPrev, wakeChoreography])

  const cardSizeClass =
    viewportWidth < 380
      ? 'h-[285px] w-[212px]'
      : viewportWidth < 640
        ? 'h-[315px] w-[248px]'
        : viewportWidth < 1024
          ? 'h-[365px] w-[300px]'
          : 'h-[405px] w-[335px] xl:h-[440px] xl:w-[365px]'

  const handleFlip = useCallback(
    (id: string | null) => {
      setFlippedId(id)
      pausedRef.current = id !== null
      if (id === null) wakeChoreography()
    },
    [wakeChoreography],
  )

  return (
    <section
      id="team"
      ref={runwayRef}
      className="relative h-[580px] overflow-x-clip border-t border-white/10 bg-[#070b16] sm:h-[650px] lg:h-[280vh]"
    >
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden lg:sticky lg:top-0 lg:h-screen"
        style={{ contain: 'layout paint' }}
      >
        <div className="hidden lg:contents">
          <TeamIntroStage
            activeMember={activeMember}
            titleWrapRef={titleWrapRef}
            titleFillRef={titleFillRef}
            titleOutlineRef={titleOutlineRef}
            handsStageRef={handsStageRef}
            handSparkRef={handSparkRef}
            humanWrapRef={humanWrapRef}
            humanHandRef={humanHandRef}
            robotWrapRef={robotWrapRef}
            robotHandRef={robotHandRef}
            introSubtitleRef={introSubtitleRef}
          />
        </div>

        {/* Clean Mobile Section Header */}
        <div className="relative z-30 pt-6 text-center lg:hidden">
          <div className="font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#38bdf8] uppercase">
            ՄԱՐԴԿԱՅԻՆ ՄԻՏՔ + AI
          </div>
          <h2 className="font-display mt-1 text-2xl tracking-tight text-white uppercase sm:text-3xl">
            ՄԵՐ ԹԻՄԸ
          </h2>
        </div>

        <div
          ref={phoneStageRef}
          role="region"
          aria-label="Մեր թիմի մասնագետների սլայդեր"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          className="relative z-20 flex h-full w-full items-center justify-center overflow-hidden outline-none select-none touch-pan-y cursor-grab active:cursor-grabbing will-change-transform"
        >
          {/* Violet-blue orbital glow behind the sweeping arc */}
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute top-[46%] left-1/2 h-[500px] w-[min(1380px,100%)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[125px] transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse closest-side at center, rgba(37,99,235,0.38) 0%, ${activeMember.auraFrom} 48%, transparent 100%)`,
            }}
          />

          {/* Subtle Left / Right Edge Arrows */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Նախորդ մասնագետը"
            className="absolute top-1/2 left-2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1328]/85 text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-sky-300/60 hover:bg-sky-400 hover:text-[#070b16] sm:left-6 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Հաջորդ մասնագետը"
            className="absolute top-1/2 right-2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1328]/85 text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-sky-300/60 hover:bg-sky-400 hover:text-[#070b16] sm:right-6 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* 100% Full-Width Curved Arc Carousel Stage */}
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ perspective: '1600px' }}
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                idx={idx}
                total={total}
                isActive={idx === activeIdx}
                isFlipped={flippedId === member.id && idx === activeIdx}
                cardSizeClass={cardSizeClass}
                slotRefs={cardSlotRefs}
                onSelectCard={selectByCardIndex}
                onFlip={handleFlip}
              />
            ))}
          </div>

          {/* Minimal Bottom Dots */}
          <div className="pointer-events-auto absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-[#0b1122]/75 px-3.5 py-2 backdrop-blur-md">
            {TEAM_MEMBERS.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => selectByCardIndex(i)}
                aria-label={m.name}
                className="h-2 w-6 cursor-pointer overflow-hidden rounded-full bg-white/15"
              >
                <span
                  className="block h-full w-full origin-center rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor:
                      i === activeIdx ? activeMember.accent : 'rgba(255,255,255,0.35)',
                    transform: i === activeIdx ? 'scaleX(1)' : 'scaleX(0.33)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
