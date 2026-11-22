import { memo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MAPS_EMBED_URL, MAPS_URL } from '~/components/contact/contactData'
import { useInView } from '~/lib/useInView'

interface FooterMapCardProps {
  mapTitle: string
  addressShort: string
}

/** Compact dark-filtered OpenStreetMap card for the footer grid. */
export const FooterMapCard = memo(function FooterMapCard({
  mapTitle,
  addressShort,
}: FooterMapCardProps) {
  const { ref, inView } = useInView('300px', false)

  return (
    <div className="lg:col-span-4">
      <div
        ref={ref}
        className="group relative h-[196px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-xl shadow-black/40"
      >
        {inView && (
          <iframe
            title={mapTitle}
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-180 contrast-95 opacity-80 transition duration-500 group-hover:opacity-95"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050812]/80 via-transparent to-transparent" />
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 rounded-xl border border-white/12 bg-[#0a1020]/85 px-3 py-2 text-xs text-white/90 backdrop-blur-md transition hover:border-[#38bdf8]/50 hover:bg-[#0f172a]"
        >
          <span className="flex items-center gap-2 truncate">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            <span className="truncate">{addressShort}</span>
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
})
