import { memo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '~/lib/useInView'
import { MAPS_EMBED_URL, MAPS_URL } from './contactData'

interface ContactMapSectionProps {
  mapTitle: string
  address: string
  openInMapsLabel: string
}

/** Full-width dark-styled OpenStreetMap section with office pin card. */
export const ContactMapSection = memo(function ContactMapSection({
  mapTitle,
  address,
  openInMapsLabel,
}: ContactMapSectionProps) {
  const { ref, inView } = useInView('300px', false)

  return (
    <section className="relative h-[380px] w-full border-t border-white/10 bg-[#070b16] sm:h-[440px]">
      <div ref={ref} className="h-full w-full">
        {inView && (
          <iframe
            title={mapTitle}
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-180 contrast-95 opacity-85"
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d1220]/50 via-transparent to-[#050812]/65" />

      <div className="absolute top-4 right-4 left-4 z-10 max-w-xs rounded-2xl border border-white/15 bg-[#0b1122]/90 p-4 shadow-2xl backdrop-blur-xl sm:top-6 sm:right-auto sm:left-6">
        <div className="flex items-center gap-2 font-heading text-sm font-bold text-white">
          <span className="h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
          <span>MyITSoft</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-white/70">{address}</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#38bdf8] transition hover:text-[#00e5ff]"
        >
          <span>{openInMapsLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  )
})
