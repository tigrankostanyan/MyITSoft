import { clamp01, getStableViewportWidth, smootherstep } from '~/lib/scroll-math'
import { SERVICES } from './servicesData'

export interface ServicesChoreographyTargets {
  headerWrapRef: React.RefObject<HTMLDivElement | null>
  taglineRef: React.RefObject<HTMLDivElement | null>
  bottomDividerRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  dividerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  titleMaskRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  capsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  arrowRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

/** Writes the services section scroll transforms and returns the active spotlight index. */
export function applyServicesChoreography(
  targets: ServicesChoreographyTargets,
  p: number,
  entryP: number,
): number {
  const isDesktopView = getStableViewportWidth() >= 1024

  const titleDock = Math.max(
    smootherstep(0.2, 0.95, entryP) * 0.65,
    smootherstep(0.0, 0.14, p),
  )

  if (targets.headerWrapRef.current) {
    const headerOp = Math.max(
      smootherstep(0.06, 0.55, entryP),
      smootherstep(0.0, 0.08, p),
    )
    const ty = (1 - titleDock) * (isDesktopView ? 16 : 3)
    const sc = (isDesktopView ? 1.12 : 1.04) - titleDock * (isDesktopView ? 0.12 : 0.04)
    targets.headerWrapRef.current.style.opacity = headerOp.toFixed(3)
    targets.headerWrapRef.current.style.transform = `translate3d(0, ${ty.toFixed(2)}vh, 0) scale(${sc.toFixed(3)})`
  }

  if (targets.taglineRef.current) {
    const tagP = Math.max(
      smootherstep(0.28, 0.85, entryP) * 0.85,
      smootherstep(0.0, 0.12, p),
    )
    targets.taglineRef.current.style.opacity = tagP.toFixed(3)
    if (!isDesktopView) {
      const dockTy = (1 - titleDock) * 3
      targets.taglineRef.current.style.transform = `translate3d(0, calc(${dockTy.toFixed(2)}vh + ${((1 - tagP) * 12).toFixed(1)}px), 0)`
    } else {
      targets.taglineRef.current.style.transform = `translate3d(0, ${((1 - tagP) * 20).toFixed(1)}px, 0)`
    }
  }

  for (let i = 0; i < SERVICES.length; i++) {
    const rowStart = 0.04 + i * 0.085
    const lineP = smootherstep(rowStart - 0.025, rowStart + 0.09, p)
    const rowP =
      i === 0
        ? Math.max(smootherstep(0.42, 0.96, entryP) * 0.9, smootherstep(0.0, 0.1, p))
        : smootherstep(rowStart, rowStart + 0.11, p)

    const div = targets.dividerRefs.current[i]
    if (div) {
      const divScale = i === 0 ? Math.max(smootherstep(0.36, 0.92, entryP), lineP) : lineP
      div.style.transform = `scaleX(${divScale.toFixed(3)})`
    }

    const row = targets.rowRefs.current[i]
    if (row) {
      const ty = (1 - rowP) * (isDesktopView ? 40 : 24)
      const tz = -(1 - rowP) * (isDesktopView ? 65 : 40)
      const rx = (1 - rowP) * (isDesktopView ? 14 : 10)
      row.style.opacity = rowP.toFixed(3)
      row.style.transform = `translate3d(0, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg)`
      row.style.pointerEvents = rowP > 0.45 ? 'auto' : 'none'
    }

    const mask = targets.titleMaskRefs.current[i]
    if (mask) {
      mask.style.transform = isDesktopView
        ? `translate3d(0, ${((1 - rowP) * 105).toFixed(2)}%, 0)`
        : ''
    }

    const caps = targets.capsRefs.current[i]
    if (caps) {
      caps.style.opacity = rowP.toFixed(3)
      caps.style.transform = `translate3d(${((1 - rowP) * (isDesktopView ? 24 : 14)).toFixed(2)}px, 0, 0)`
    }

    const arrow = targets.arrowRefs.current[i]
    if (arrow) {
      const aScale = 0.55 + rowP * 0.45
      const aRot = -(1 - rowP) * 45
      arrow.style.opacity = rowP.toFixed(3)
      arrow.style.transform = `scale(${aScale.toFixed(4)}) rotate(${aRot.toFixed(2)}deg)`
    }
  }

  if (targets.bottomDividerRef.current) {
    const bLineP = smootherstep(0.36, 0.46, p)
    targets.bottomDividerRef.current.style.transform = `scaleX(${bLineP.toFixed(4)})`
  }

  if (targets.footerRef.current) {
    const fP = smootherstep(0.39, 0.5, p)
    targets.footerRef.current.style.opacity = fP.toFixed(3)
    targets.footerRef.current.style.transform = `translate3d(0, ${((1 - fP) * (isDesktopView ? 24 : 16)).toFixed(2)}px, 0)`
    targets.footerRef.current.style.pointerEvents = fP > 0.45 ? 'auto' : 'none'
  }

  return p >= 0.48
    ? Math.min(SERVICES.length - 1, Math.floor(clamp01((p - 0.48) / 0.46) * SERVICES.length))
    : 0
}
