/// <reference types="vite/client" />
import { useEffect } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartToastContainer } from '~/components/shop/CartToast'
import { useUIStore } from '~/store/ui-store'
import ssrInlineCss from 'virtual:ssr-inline-css'

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&family=Space+Grotesk:wght@500..700&display=swap'

const resolvedCss =
  typeof document !== 'undefined'
    ? (document.getElementById('app-css')?.textContent ?? ssrInlineCss)
    : ssrInlineCss

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
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import('~/styles.css')
    }

    useUIStore.getState().hydrateLocale()

    const fontRaf = requestAnimationFrame(() => {
      if (!document.querySelector('link[data-myitsoft-fonts="1"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = GOOGLE_FONTS_URL
        link.dataset.myitsoftFonts = '1'
        document.head.appendChild(link)
      }
    })

    const resetHorizontal = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY)
        document.documentElement.scrollLeft = 0
        document.body.scrollLeft = 0
      }
    }
    window.addEventListener('resize', resetHorizontal, { passive: true })
    return () => {
      cancelAnimationFrame(fontRaf)
      window.removeEventListener('resize', resetHorizontal)
    }
  }, [])

  return (
    <html lang="en" className="dark overflow-x-clip">
      <head>
        <HeadContent />
        <style id="app-css" dangerouslySetInnerHTML={{ __html: resolvedCss }} />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>
      </head>
      <body className="bg-[#0d1220] text-white antialiased selection:bg-[#2563eb] selection:text-white overflow-x-clip">
        <Outlet />
        <CartToastContainer />
        <Scripts />
      </body>
    </html>
  )
}
