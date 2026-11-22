import { memo } from 'react'
import { Sparkles } from 'lucide-react'
import type { TeamMember } from './teamData'

interface TeamIntroStageProps {
  activeMember: TeamMember
  titleWrapRef: React.RefObject<HTMLDivElement | null>
  titleFillRef: React.RefObject<HTMLDivElement | null>
  titleOutlineRef: React.RefObject<HTMLDivElement | null>
  handsStageRef: React.RefObject<HTMLDivElement | null>
  handSparkRef: React.RefObject<HTMLDivElement | null>
  humanWrapRef: React.RefObject<HTMLDivElement | null>
  humanHandRef: React.RefObject<HTMLImageElement | null>
  robotWrapRef: React.RefObject<HTMLDivElement | null>
  robotHandRef: React.RefObject<HTMLImageElement | null>
  introSubtitleRef: React.RefObject<HTMLDivElement | null>
}

export const TeamIntroStage = memo(function TeamIntroStage({
  activeMember,
  titleWrapRef,
  titleFillRef,
  titleOutlineRef,
  handsStageRef,
  handSparkRef,
  humanWrapRef,
  humanHandRef,
  robotWrapRef,
  robotHandRef,
  introSubtitleRef,
}: TeamIntroStageProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ contain: 'layout paint' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080e1f] via-[#0b1328] to-[#060913]" />
        <div
          className="absolute top-[24%] left-1/2 h-[560px] w-[min(980px,100%)] -translate-x-1/2 rounded-full blur-[155px] transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse closest-side at center, ${activeMember.auraFrom}, ${activeMember.auraTo} 58%, transparent 100%)`,
          }}
        />
        <div
          className="absolute bottom-[-14%] left-1/2 h-[360px] w-[min(780px,100%)] -translate-x-1/2 rounded-full blur-[130px] transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse closest-side at center, ${activeMember.auraTo}, transparent 100%)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          {[360, 560, 780, 1020].map((size, i) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/[0.08]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: 1 - i * 0.16,
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={titleWrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[8] flex items-center justify-center px-4 text-center will-change-transform"
      >
        <div className="relative select-none">
          <div
            ref={titleFillRef}
            className="mobile-drop-shadow-lite font-display whitespace-nowrap text-[clamp(2rem,11.5vw,12.5rem)] leading-[0.9] tracking-[-0.03em] uppercase will-change-opacity"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #bae6fd 52%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 18px 48px rgba(56, 189, 248, 0.28))',
            }}
          >
            ՄԵՐ ԹԻՄԸ
          </div>
          <div
            ref={titleOutlineRef}
            className="mobile-drop-shadow-lite font-display absolute inset-0 whitespace-nowrap text-[clamp(2rem,11.5vw,12.5rem)] leading-[0.9] tracking-[-0.03em] uppercase will-change-opacity"
            style={{
              opacity: 0,
              color: 'transparent',
              WebkitTextStroke: '1.6px rgba(125, 211, 252, 0.42)',
              filter: 'drop-shadow(0 0 32px rgba(56, 189, 248, 0.22))',
            }}
          >
            ՄԵՐ ԹԻՄԸ
          </div>
        </div>
      </div>

      <div
        ref={handsStageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[14] overflow-hidden will-change-transform"
      >
        <div className="absolute top-[43%] left-1/2 h-0 w-0 sm:top-[42%]">
          <div
            ref={handSparkRef}
            className="absolute top-0 left-0 h-48 w-48 rounded-full blur-[34px] will-change-transform sm:h-64 sm:w-64"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.92) 0%, rgba(0, 229, 255, 0.72) 24%, rgba(56, 189, 248, 0.24) 56%, transparent 76%)',
            }}
          />

          <div
            ref={humanWrapRef}
            className="absolute top-0 right-[-2px] w-[72%] -translate-y-[47%]"
          >
            <img
              ref={humanHandRef}
              src="/images/human-fist.png"
              alt=""
              draggable={false}
              decoding="async"
              className="mobile-drop-shadow-lite block w-full object-contain brightness-[0.92] contrast-[1.06] drop-shadow-[0_28px_52px_rgba(0,0,0,0.85)] will-change-transform"
              style={{ transformOrigin: '98.5% 47%' }}
            />
          </div>

          <div
            ref={robotWrapRef}
            className="absolute top-0 left-[-2px] w-[72%] -translate-y-[41%]"
          >
            <img
              ref={robotHandRef}
              src="/images/robot-fist.png"
              alt=""
              draggable={false}
              decoding="async"
              className="mobile-drop-shadow-lite block w-full object-contain drop-shadow-[0_28px_52px_rgba(0,0,0,0.85)] will-change-transform"
              style={{ transformOrigin: '1.5% 41%' }}
            />
          </div>
        </div>
      </div>

      <div
        ref={introSubtitleRef}
        className="pointer-events-none absolute inset-x-0 bottom-[106px] z-[15] flex flex-col items-center px-4 text-center will-change-transform min-[576px]:bottom-10 sm:bottom-14 sm:px-6"
      >
        <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-sky-400/30 bg-[#0b1328]/75 px-3 py-1.5 font-mono-tech text-[8.5px] font-bold tracking-[0.12em] text-sky-300 uppercase backdrop-blur-md min-[380px]:text-[10px] sm:gap-2 sm:px-4 sm:text-[11px] sm:tracking-[0.18em]">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#00e5ff]" />
          <span className="truncate">ՄԱՐԴԿԱՅԻՆ ՄԻՏՔ + ԱՐՀԵՍՏԱԿԱՆ ԲԱՆԱԿԱՆՈՒԹՅՈՒՆ</span>
        </div>
        <p className="mt-2.5 max-w-md text-xs text-sky-100/65 sm:text-sm">
          Երբ մեր մասնագետների փորձը միանում է AI-ի ուժին՝ ստեղծվում են ապագայի թվային լուծումները։
        </p>
      </div>
    </>
  )
})
