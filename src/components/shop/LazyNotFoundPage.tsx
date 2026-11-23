import { lazy, Suspense } from 'react'

const NotFoundPage = lazy(() => import('./NotFoundPage'))

/** Code-split 404 fallback so footer and map dependencies stay out of the main entry chunk. */
export function LazyNotFoundPage() {
  return (
    <Suspense fallback={null}>
      <NotFoundPage />
    </Suspense>
  )
}
