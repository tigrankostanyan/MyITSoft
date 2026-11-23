import { getStableViewportWidth, smoothstep, smootherstep } from '~/lib/scroll-math'

export interface CarouselDomRefs {
  handsOverlayRef: React.RefObject<HTMLDivElement | null>
  humanHandRef: React.RefObject<HTMLDivElement | null>
  robotHandRef: React.RefObject<HTMLDivElement | null>
  sparkRef: React.RefObject<HTMLDivElement | null>
  headlineRef: React.RefObject<HTMLDivElement | null>
  subtitleRef: React.RefObject<HTMLParagraphElement | null>
  stageWrapRef: React.RefObject<HTMLDivElement | null>
  slideRefs: React.RefObject<(HTMLDivElement | null)[]>
}

/** Writes all carousel scroll-driven styles (hands retract, headline morph, card stack) to DOM refs. */
export function applyCarouselDOM(
  refs: CarouselDomRefs,
  sp: number,
  hp: number,
  sf: number,
  exactHeadOffsetPx: number,
  maxIdx: number,
) {
  const isMobile = getStableViewportWidth() < 1024
  if (!isMobile) {
    const handsRetract = hp * 0.35 + smootherstep(0, 1, hp) * 0.65
    const handsOpacity = 1 - smoothstep(0.72, 1, hp)
    const sparkOpacity = 1 - smoothstep(0.02, 0.36, hp)

    if (refs.handsOverlayRef.current) {
      refs.handsOverlayRef.current.style.opacity = handsOpacity.toFixed(3)
      refs.handsOverlayRef.current.style.visibility =
        handsOpacity < 0.004 ? 'hidden' : 'visible'
    }
    if (refs.sparkRef.current) {
      refs.sparkRef.current.style.opacity = (sparkOpacity * 0.78).toFixed(3)
      refs.sparkRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.85 + sparkOpacity * 0.38).toFixed(3)})`
    }
    if (refs.humanHandRef.current) {
      refs.humanHandRef.current.style.transform = `translate3d(${(-handsRetract * 112).toFixed(2)}%, ${(handsRetract * 3.5).toFixed(2)}%, 0) scale(${(1.02 - handsRetract * 0.08).toFixed(3)}) rotate(${(-handsRetract * 3.2).toFixed(2)}deg)`
    }
    if (refs.robotHandRef.current) {
      refs.robotHandRef.current.style.transform = `translate3d(${(handsRetract * 112).toFixed(2)}%, ${(handsRetract * 3.5).toFixed(2)}%, 0) scale(${(1.02 - handsRetract * 0.08).toFixed(3)}) rotate(${(handsRetract * 3.2).toFixed(2)}deg)`
    }
  }

  if (isMobile) {
    if (refs.headlineRef.current) {
      refs.headlineRef.current.style.opacity = '1'
      refs.headlineRef.current.style.visibility = 'visible'
      refs.headlineRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
    if (refs.subtitleRef.current) {
      refs.subtitleRef.current.style.opacity = '1'
      refs.subtitleRef.current.style.visibility = 'visible'
      refs.subtitleRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
    if (refs.stageWrapRef.current) {
      refs.stageWrapRef.current.style.opacity = '1'
      refs.stageWrapRef.current.style.transform = 'translate3d(0, 0, 0)'
      refs.stageWrapRef.current.style.pointerEvents = 'auto'
    }
  } else {
    const textReveal = 0.75 + smootherstep(0.0, 0.4, hp) * 0.25
    const headlineMorph = Math.max(
      smootherstep(0.18, 0.82, hp),
      smootherstep(0.0, 0.1, sp),
    )
    const subtitleOpacity =
      textReveal * (1 - smoothstep(0.02, 0.08, sp))
    const stageIn = smootherstep(0.03, 0.12, sp)

    if (refs.headlineRef.current) {
      const revealScale = 1.08 - headlineMorph * 0.08
      const offsetPx = (1 - headlineMorph) * exactHeadOffsetPx
      refs.headlineRef.current.style.opacity = textReveal.toFixed(3)
      refs.headlineRef.current.style.visibility = 'visible'
      refs.headlineRef.current.style.transform = `translate3d(0, ${offsetPx.toFixed(2)}px, 0) scale(${revealScale.toFixed(4)})`
    }
    if (refs.subtitleRef.current) {
      refs.subtitleRef.current.style.opacity = subtitleOpacity.toFixed(3)
      refs.subtitleRef.current.style.transform = `translate3d(0, ${((1 - subtitleOpacity) * -10).toFixed(2)}px, 0)`
      refs.subtitleRef.current.style.visibility =
        subtitleOpacity < 0.01 ? 'hidden' : 'visible'
    }
    if (refs.stageWrapRef.current) {
      refs.stageWrapRef.current.style.opacity = stageIn.toFixed(3)
      refs.stageWrapRef.current.style.transform = `translate3d(0, ${((1 - stageIn) * 56).toFixed(2)}px, 0) scale(${(0.955 + stageIn * 0.045).toFixed(4)})`
      refs.stageWrapRef.current.style.pointerEvents =
        stageIn < 0.35 ? 'none' : 'auto'
    }
  }

  for (let idx = 0; idx <= maxIdx; idx++) {
    const node = refs.slideRefs.current[idx]
    if (!node) continue
    const offset = idx - sf
    const absOff = Math.abs(offset)
    const clamped = Math.min(1.22, absOff)
    const dir = offset >= 0 ? 1 : -1

    const translateY = dir * clamped * 96
    const translateZ = -clamped * 200
    const rotateX = -dir * clamped * 16
    const scale = 1 - clamped * 0.12
    const opacity =
      absOff >= 0.85 ? 0 : 1 - smootherstep(0.05, 0.72, absOff)

    node.style.transform = `translate3d(0, ${translateY.toFixed(2)}%, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`
    node.style.opacity = opacity.toFixed(3)
    node.style.pointerEvents = absOff < 0.35 ? 'auto' : 'none'
    node.style.visibility = absOff > 0.9 ? 'hidden' : 'visible'
  }
}
