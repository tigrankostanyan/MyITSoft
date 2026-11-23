import { HERO_FLOATING_LOGO_SPEEDS } from '~/components/home/HeroFloatingTechLogos'
import { smoothstep } from '../scroll-math'

export interface HeroScrollTargets {
  heroDarkenRef: React.RefObject<HTMLDivElement | null>
  heroContentRef: React.RefObject<HTMLDivElement | null>
  heroPosterRef: React.RefObject<HTMLDivElement | null>
  heroLogoRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

/** Writes the scroll-driven hero transforms (darken, content exit, poster rise, logo lift). */
export function applyHeroScrollWrites(targets: HeroScrollTargets, scroll: number, heroTop: number, vh: number) {
  const heroScroll = Math.max(0, scroll - heroTop)
  const darken = smoothstep(0, vh * 0.65, heroScroll) * 0.88
  if (targets.heroDarkenRef.current) {
    targets.heroDarkenRef.current.style.opacity = darken.toFixed(3)
  }

  const contentExit = smoothstep(vh * 0.04, vh * 0.45, heroScroll)
  if (targets.heroContentRef.current) {
    targets.heroContentRef.current.style.opacity = (1 - contentExit).toFixed(3)
    targets.heroContentRef.current.style.transform = `translate3d(0, ${(-contentExit * 36).toFixed(2)}px, 0)`
  }

  if (targets.heroPosterRef.current) {
    const posterRise = smoothstep(0, vh * 0.35, heroScroll)
    targets.heroPosterRef.current.style.transform = `translate3d(0, ${(-posterRise * 48).toFixed(2)}px, 0) scale(${(1 + posterRise * 0.06).toFixed(3)})`
  }

  const fade = 1 - smoothstep(vh * 0.06, vh * 0.48, heroScroll)
  const liftT = smoothstep(0, vh * 0.55, heroScroll)
  for (let i = 0; i < HERO_FLOATING_LOGO_SPEEDS.length; i++) {
    const el = targets.heroLogoRefs.current[i]
    if (!el) continue
    const speed = HERO_FLOATING_LOGO_SPEEDS[i]
    const liftY = -heroScroll * speed * 1.25
    const scale = 1 + liftT * 0.14
    el.style.transform = `translate3d(0, ${liftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
    el.style.opacity = fade.toFixed(3)
  }
}
