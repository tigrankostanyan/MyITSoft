import { memo } from 'react'
import { Code2, Cpu, ShieldCheck, Zap } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'

const FEATURE_META = [
  { icon: Code2, accent: 'text-[#38bdf8]', alignRight: false },
  { icon: Cpu, accent: 'text-[#00e5ff]', alignRight: true },
  { icon: ShieldCheck, accent: 'text-[#38bdf8]', alignRight: false },
  { icon: Zap, accent: 'text-[#00e5ff]', alignRight: true },
] as const

/** Second fold of the Hero track explaining MyITSoft's 4 engineering pillars. */
export const HeroWhySection = memo(function HeroWhySection() {
  const { t } = useTranslations()

  return (
    <section className="bg-site-ambient relative flex flex-col justify-between overflow-x-clip pt-12 pb-16 sm:py-20 md:min-h-screen lg:min-h-[135vh] lg:py-28">
      <div className="site-container flex flex-1 flex-col justify-center">
        <div className="pointer-events-none relative z-30 text-center">
          <h2 className="font-display text-[clamp(1.85rem,8vw,6.4rem)] leading-[0.96] text-white/95 uppercase">
            {t.hero.whyTitlePrefix}
            <br />
            <span className="normal-case text-[#38bdf8]">MyITSoft</span>
          </h2>
          <div className="font-mono-tech mt-2.5 text-[10px] font-bold tracking-[0.22em] text-[#38bdf8]/90 uppercase sm:mt-3 sm:text-xs">
            {t.hero.whySubtitle}
          </div>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">
            {t.hero.whyTagline}
          </p>
        </div>

        <div className="h-[220px] shrink-0 sm:h-[240px] md:hidden" aria-hidden="true" />

        <div className="relative z-30 mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:mt-24 lg:gap-x-[420px] lg:gap-y-16">
          {t.hero.features.map((item, idx) => {
            const meta = FEATURE_META[idx]
            const Icon = meta.icon
            return (
              <div
                key={item.code}
                className={`rounded-2xl border border-white/12 bg-[#0d1220]/80 p-4 backdrop-blur-md md:rounded-none md:border-0 md:border-t md:border-white/15 md:bg-transparent md:p-0 md:pt-5 md:backdrop-blur-none ${
                  meta.alignRight ? 'md:text-right' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 ${meta.accent} ${
                    meta.alignRight ? 'md:flex-row-reverse md:justify-start' : ''
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
                  <span className="font-mono-tech text-[10px] font-bold tracking-[0.14em] uppercase sm:text-xs">
                    {item.code}
                  </span>
                </div>
                <h3 className="font-display mt-2 text-base text-white uppercase sm:mt-3 sm:text-xl">
                  {item.title}
                </h3>
                <p
                  className={`mt-1.5 text-xs leading-relaxed text-white/65 sm:mt-2 sm:text-sm md:max-w-xs ${
                    meta.alignRight ? 'md:ml-auto' : ''
                  }`}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})
