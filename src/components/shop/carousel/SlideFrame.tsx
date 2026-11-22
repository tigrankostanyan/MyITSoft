import type { ReactNode, RefObject } from 'react'

export function SlideFrame({
  idx,
  slideRefs,
  children,
}: {
  idx: number
  slideRefs: RefObject<(HTMLDivElement | null)[]>
  children: ReactNode
}) {
  return (
    <div
      ref={(el) => {
        slideRefs.current[idx] = el
      }}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
