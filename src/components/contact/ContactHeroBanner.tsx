import { memo } from 'react'

interface ContactHeroBannerProps {
  title: string
  subtitle: string
}

/** Royal hero banner with diagonal bottom cut into the dark page canvas. */
export const ContactHeroBanner = memo(function ContactHeroBanner({
  title,
  subtitle,
}: ContactHeroBannerProps) {
  return (
    <section className="bg-royal-hero relative overflow-hidden pt-32 pb-44 text-center sm:pt-36 sm:pb-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 78% at 50% 0%, rgba(56, 189, 248, 0.24) 0%, rgba(56, 189, 248, 0.1) 42%, rgba(56, 189, 248, 0.025) 70%, transparent 100%)',
        }}
      />

      <div className="site-container relative z-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#7dd3fc] uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff]" />
          <span>MYITSOFT · CONTACT</span>
        </div>
        <h1 className="font-display text-3xl tracking-tight text-white uppercase sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-sky-100/80 sm:text-base">
          {subtitle}
        </p>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-14 w-full sm:h-20"
      >
        <polygon points="0,90 1440,12 1440,90" fill="#0d1220" />
      </svg>
    </section>
  )
})
