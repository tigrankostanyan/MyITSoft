/// <reference types="vite/client" />
import { lazy, Suspense, useEffect } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { LazyNotFoundPage } from '~/components/shop/LazyNotFoundPage'
import { useUIStore } from '~/store/ui-store'
import '~/styles.css'

const CartToastContainer = lazy(() => import('~/components/shop/CartToast'))

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400..900&family=JetBrains+Mono:wght@400..700&family=Space+Grotesk:wght@500..700&display=swap'

// Flips deferred font stylesheet from media="print" to "all" once fetched,
// so the font CSS never blocks first paint.
const FONT_SWAP_SCRIPT =
  "(function(){var l=document.querySelectorAll('link[data-font-swap]');for(var i=0;i<l.length;i++){(function(n){var f=function(){n.media='all'};if(n.sheet){f()}else{n.addEventListener('load',f)}})(l[i])}})()"

function CartToastPortal() {
  const hasToasts = useUIStore((s) => s.toasts.length > 0)
  if (!hasToasts) return null
  return (
    <Suspense fallback={null}>
      <CartToastContainer />
    </Suspense>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { title: 'MyITSoft — Web Platforms & Business Automation | Armenia' },
      {
        name: 'description',
        content:
          'MyITSoft — 3D interactive web platforms, CRM/ERP business automation, AI assistants, Telegram bots, and Cloud solutions in Armenia.',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/myitsoft-logo-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: GOOGLE_FONTS_URL,
        media: 'print',
        'data-font-swap': '',
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: LazyNotFoundPage,
})

function RootLayout() {
  useEffect(() => {
    useUIStore.getState().hydrateLocale()

    const fontLinks = document.querySelectorAll<HTMLLinkElement>('link[data-font-swap]')
    const cleanups: (() => void)[] = []
    for (const link of fontLinks) {
      if (link.sheet) {
        link.media = 'all'
      } else {
        const onLoad = () => {
          link.media = 'all'
        }
        link.addEventListener('load', onLoad, { once: true })
        cleanups.push(() => link.removeEventListener('load', onLoad))
      }
    }

    const resetHorizontal = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY)
        document.documentElement.scrollLeft = 0
        document.body.scrollLeft = 0
      }
    }
    window.addEventListener('resize', resetHorizontal, { passive: true })
    return () => {
      for (const off of cleanups) off()
      window.removeEventListener('resize', resetHorizontal)
    }
  }, [])

  return (
    <html lang="en" className="dark overflow-x-clip">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{ __html: FONT_SWAP_SCRIPT }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>
      </head>
      <body className="bg-[#0d1220] text-white antialiased selection:bg-[#2563eb] selection:text-white overflow-x-clip">
        <Outlet />
        <CartToastPortal />
        <Scripts />
      </body>
    </html>
  )
}
