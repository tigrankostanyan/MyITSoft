import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight IntersectionObserver hook used to pause off-screen WebGL canvases
 * so only the currently visible 3D stage consumes GPU frames.
 */
export function useInView(rootMargin = '200px', initialInView = false) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(initialInView)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setInView(entry.isIntersecting)
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
