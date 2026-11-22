import { memo } from 'react'
import type { ServiceStep } from './carouselData'

interface CarouselStepDotsProps {
  steps: readonly ServiceStep[]
  activeStepIdx: number
  onJump: (idx: number) => void
}

/** Desktop progress indicator pills below the 3D showcase carousel. */
export const CarouselStepDots = memo(function CarouselStepDots({
  steps,
  activeStepIdx,
  onJump,
}: CarouselStepDotsProps) {
  return (
    <div className="mt-3.5 hidden items-center justify-center lg:flex">
      <div className="flex items-center gap-2">
        {steps.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.title}
            onClick={() => onJump(idx)}
            className="h-1.5 w-7 cursor-pointer overflow-hidden rounded-full bg-white/20"
          >
            <span
              className="block h-full w-full origin-center rounded-full transition-transform duration-300"
              style={{
                backgroundColor:
                  idx === activeStepIdx ? '#7dd3fc' : 'rgba(255,255,255,0.35)',
                transform: idx === activeStepIdx ? 'scaleX(1)' : 'scaleX(0.32)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
})
