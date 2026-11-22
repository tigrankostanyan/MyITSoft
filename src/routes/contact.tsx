import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/shop/Navbar'
import { NewsletterFooter } from '~/components/home/NewsletterFooter'
import { ContactFormPanel } from '~/components/contact/ContactFormPanel'
import { ContactHeroBanner } from '~/components/contact/ContactHeroBanner'
import { ContactInfoPanel } from '~/components/contact/ContactInfoPanel'
import { ContactMapSection } from '~/components/contact/ContactMapSection'
import { useTranslations, useUIStore } from '~/store/ui-store'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us — MyITSoft' },
      {
        name: 'description',
        content:
          'Get in touch with MyITSoft for custom web platforms, mobile applications, business automation, and AI solutions. 15 Movses Khorenatsi St, Yerevan.',
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const { t } = useTranslations()

  useEffect(() => {
    useUIStore.getState().dismissPreloader()
    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches
    if (!isFinePointer) return

    let destroyed = false
    let loading = false
    let lenisInstance: import('lenis').default | null = null

    const initLenis = () => {
      if (destroyed || loading || lenisInstance) return
      loading = true
      cleanup()
      import('lenis')
        .then(({ default: Lenis }) => {
          if (destroyed) return
          lenisInstance = new Lenis({
            autoRaf: true,
            lerp: 0.095,
            smoothWheel: true,
            wheelMultiplier: 0.95,
          })
        })
        .catch(() => {})
    }

    const triggers: (keyof WindowEventMap)[] = ['wheel', 'pointerdown', 'keydown']
    const cleanup = () => {
      for (const evt of triggers) {
        window.removeEventListener(evt, initLenis)
      }
    }
    for (const evt of triggers) {
      window.addEventListener(evt, initLenis, { passive: true, once: true })
    }

    return () => {
      destroyed = true
      cleanup()
      lenisInstance?.destroy()
    }
  }, [])

  return (
    <div className="bg-site-ambient min-h-screen overflow-x-clip text-white">
      <Navbar activePage="shop" />

      <main>
        <ContactHeroBanner
          title={t.contactPage.title}
          subtitle={t.contactPage.subtitle}
        />

        <section className="relative z-20 -mt-32 pb-16 sm:-mt-36 sm:pb-24">
          <div className="site-container">
            <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/12 bg-[#0b1122]/90 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(56,189,248,0.08)] md:backdrop-blur-md md:grid-cols-12">
              <ContactInfoPanel />
              <ContactFormPanel />
            </div>
          </div>
        </section>

        <ContactMapSection
          mapTitle={t.footer.mapTitle}
          address={t.footer.address}
          openInMapsLabel={t.contactPage.openInMaps}
        />
      </main>

      <NewsletterFooter />
    </div>
  )
}
