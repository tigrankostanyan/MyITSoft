/// <reference types="vite/client" />
import { useEffect } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartToastContainer } from '~/components/shop/CartToast'
import appCss from '~/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
      },
      { title: 'MyITSoft — Վեբ Կայքեր և Բիզնեսի Ավտոմատացում | Հայաստան' },
      {
        name: 'description',
        content:
          'MyITSoft — 3D ինտերակտիվ վեբ կայքերի պատրաստում, CRM/ERP բիզնեսի ավտոմատացում, AI օգնականներ, Telegram բոտեր և Cloud լուծումներ Հայաստանում։',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/myitsoft-logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Armenian:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  useEffect(() => {
    const resetHorizontal = () => {
      if (window.scrollX !== 0) window.scrollTo(0, window.scrollY)
      document.documentElement.scrollLeft = 0
      document.body.scrollLeft = 0
    }
    resetHorizontal()
    window.addEventListener('resize', resetHorizontal, { passive: true })
    return () => window.removeEventListener('resize', resetHorizontal)
  }, [])

  return (
    <html lang="hy" className="dark overflow-x-clip">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#0d1220] text-white antialiased selection:bg-[#2563eb] selection:text-white overflow-x-clip">
        <Outlet />
        <CartToastContainer />
        <Scripts />
      </body>
    </html>
  )
}
