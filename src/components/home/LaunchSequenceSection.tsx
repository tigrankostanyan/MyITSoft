import { memo, useRef } from 'react'
import { LaunchStepsList } from './launch/LaunchStepsList'
import { ReadyToMoveCta } from './launch/ReadyToMoveCta'
import { RocketCanvas } from './launch/RocketCanvas'
import { RocketModel } from './launch/RocketModel'
import { useLaunchChoreography } from './launch/useLaunchChoreography'

export const LaunchSequenceSection = memo(function LaunchSequenceSection() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const rocketWrapRef = useRef<HTMLDivElement>(null)
  const underGlowRef = useRef<HTMLDivElement>(null)
  const windowGlowRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])
  const statusRef = useRef<HTMLSpanElement>(null)

  const progressRef = useRef(0)
  const rocketOffsetRef = useRef({ x: 0, y: 0 })
  const wakeVfxRef = useRef<(() => void) | null>(null)

  useLaunchChoreography({
    runwayRef,
    rocketWrapRef,
    underGlowRef,
    windowGlowRef,
    stepRefs,
    badgeRefs,
    statusRef,
    progressRef,
    rocketOffsetRef,
    wakeVfxRef,
  })

  return (
    <section id="get-started" className="relative overflow-x-clip border-t border-white/10 bg-[#060913]">
      <div ref={runwayRef} className="relative h-[220vh] sm:h-[260vh] lg:h-[310vh]">
        <div
          className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-[#060913] pt-[74px] pb-[88px] min-[380px]:pt-[78px] min-[380px]:pb-[94px] min-[576px]:pt-20 min-[576px]:pb-6 lg:pb-0"
          style={{ contain: 'layout paint' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ contain: 'layout paint' }}
          >
            <div
              className="absolute -top-24 left-0 h-[420px] w-[min(620px,100%)] rounded-full blur-[150px]"
              style={{
                background:
                  'radial-gradient(ellipse closest-side at center, rgba(37, 99, 235, 0.18) 0%, rgba(0, 229, 255, 0.06) 52%, transparent 100%)',
              }}
            />
            <div
              className="absolute right-0 bottom-[4%] h-[460px] w-[min(620px,100%)] rounded-full blur-[140px]"
              style={{
                background:
                  'radial-gradient(ellipse closest-side at center, rgba(29, 78, 216, 0.22) 0%, rgba(56, 189, 248, 0.08) 54%, transparent 100%)',
              }}
            />
          </div>

          <RocketCanvas
            progressRef={progressRef}
            rocketWrapRef={rocketWrapRef}
            rocketOffsetRef={rocketOffsetRef}
            wakeVfxRef={wakeVfxRef}
          />

          <div className="site-container relative grid h-full grid-cols-1 content-center items-center gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-20 min-w-0 lg:col-span-5 xl:col-span-5">
              <LaunchStepsList
                stepRefs={stepRefs}
                badgeRefs={badgeRefs}
                statusRef={statusRef}
              />
            </div>

            <div className="relative flex h-[23vh] min-h-[135px] w-full items-center justify-center sm:h-[36vh] lg:col-span-7 lg:h-full xl:col-span-7">
              <div
                ref={rocketWrapRef}
                className="pointer-events-none relative z-10 mt-1 h-[135px] w-[70px] will-change-transform min-[380px]:h-[175px] min-[380px]:w-[92px] sm:h-[290px] sm:w-[152px] lg:mt-4 lg:h-[min(540px,72vh)] lg:w-auto lg:aspect-[292/560] xl:h-[min(600px,76vh)]"
              >
                <RocketModel
                  underGlowRef={underGlowRef}
                  windowGlowRef={windowGlowRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReadyToMoveCta />
    </section>
  )
})
export default LaunchSequenceSection
