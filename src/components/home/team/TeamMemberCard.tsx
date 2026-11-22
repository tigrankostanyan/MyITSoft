import { memo } from 'react'
import { RotateCw, ShieldCheck } from 'lucide-react'
import type { TeamMember } from './teamData'

interface TeamMemberCardProps {
  member: TeamMember
  idx: number
  total: number
  isActive: boolean
  isFlipped: boolean
  cardSizeClass: string
  slotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onSelectCard: (idx: number) => void
  onFlip: (id: string | null) => void
}

export const TeamMemberCard = memo(function TeamMemberCard({
  member,
  idx,
  isActive,
  isFlipped,
  cardSizeClass,
  slotRefs,
  onSelectCard,
  onFlip,
}: TeamMemberCardProps) {
  return (
    <div
      ref={(el) => {
        slotRefs.current[idx] = el
      }}
      onClick={() => onSelectCard(idx)}
      className={`group absolute top-[44%] left-1/2 min-[576px]:top-[48%] sm:top-[47%] ${cardSizeClass} will-change-transform`}
      style={{
        transformStyle: 'preserve-3d',
        cursor: isActive ? 'default' : 'pointer',
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Front Face: Large Portrait Card */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border bg-[#0d1222] p-4 transition-all duration-500 sm:rounded-[34px] sm:p-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderColor: isActive ? `${member.accent}95` : 'rgba(255,255,255,0.18)',
            boxShadow: isActive
              ? `0 32px 84px -12px rgba(0,0,0,0.92), 0 0 60px -10px ${member.accent}70, inset 0 1px 0 rgba(255,255,255,0.3)`
              : '0 12px 28px -10px rgba(0,0,0,0.75)',
          }}
        >
          <img
            src={member.photo}
            alt={member.name}
            draggable={false}
            loading={idx <= 1 ? 'eager' : 'lazy'}
            decoding="async"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
              isActive ? 'scale-[1.04]' : 'scale-100 group-hover:scale-[1.03]'
            }`}
            style={{ objectPosition: member.photoPosition }}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-[#050814] transition-opacity duration-500 ${
              isActive ? 'opacity-0' : 'opacity-25'
            }`}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060913]/65 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#050814]/95 via-[#070b1a]/70 to-transparent"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border bg-[#060a16]/85 px-3 py-1 font-mono-tech text-[10px] font-bold md:bg-[#060a16]/65 md:backdrop-blur-md"
              style={{
                borderColor: isActive ? `${member.accent}70` : 'rgba(255,255,255,0.2)',
                color: isActive ? member.accent : 'rgba(255,255,255,0.8)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: member.accent }}
              />
              {member.index} · {member.experience}
            </span>

            {isActive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onFlip(member.id)
                }}
                aria-label="3D Շրջել քարտը"
                className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-[#060a16]/85 px-3 py-1 font-mono-tech text-[10px] font-bold tracking-wider text-white uppercase transition hover:border-[#38bdf8] hover:bg-white hover:text-[#070b16] md:bg-[#060a16]/75 md:backdrop-blur-md cursor-pointer"
              >
                <RotateCw className="h-3 w-3" />
                <span>3D</span>
              </button>
            )}
          </div>

          {/* Bottom Name, Role & Bio */}
          <div className="relative z-10 mt-auto text-left">
            <h3 className="font-display text-lg leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-2xl">
              {member.name}
            </h3>
            <p
              className="mt-1 font-heading text-xs font-semibold tracking-wide transition-colors duration-700 sm:text-[13px]"
              style={{ color: isActive ? member.accent : 'rgba(226,232,240,0.8)' }}
            >
              {member.role}
            </p>
            <p
              className={`mt-2 line-clamp-2 text-[11px] leading-relaxed transition-opacity duration-700 sm:text-xs ${
                isActive ? 'text-slate-100/90 opacity-100' : 'text-slate-200/70 opacity-60'
              }`}
            >
              {member.bio}
            </p>
          </div>
        </div>

        {/* Back Face: 3D Detailed Profile */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border p-5 sm:rounded-[34px] sm:p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: `${member.accent}85`,
            background: 'linear-gradient(155deg, #121b38 0%, #070b18 100%)',
            boxShadow: `0 32px 80px -14px rgba(0,0,0,0.92), 0 0 54px -12px ${member.accent}60`,
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="min-w-0">
              <div className="font-mono-tech text-[9px] font-bold tracking-[0.14em] text-white/50 uppercase">
                ՊՐՈՖԻԼ
              </div>
              <div className="font-display mt-0.5 truncate text-base text-white sm:text-lg">
                {member.name}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onFlip(null)
              }}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-heading text-[10px] font-bold text-white uppercase transition hover:bg-white hover:text-[#080d1a] cursor-pointer"
            >
              <RotateCw className="h-3 w-3" />
              <span>Հետ</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="font-mono-tech text-[8.5px] text-white/50 uppercase">ՓՈՐՁ</div>
              <div className="font-display mt-0.5 text-base" style={{ color: member.accent }}>
                {member.experience}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="font-mono-tech text-[8.5px] text-white/50 uppercase">ՆԱԽԱԳԾԵՐ</div>
              <div className="font-display mt-0.5 text-base text-white">{member.projects}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold text-white"
                style={{
                  borderColor: `${member.accent}45`,
                  backgroundColor: `${member.accent}18`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <blockquote
            className="line-clamp-3 rounded-2xl border-l-2 bg-white/[0.04] px-3 py-2.5 text-[11px] leading-relaxed text-sky-100/85 italic sm:text-xs"
            style={{ borderColor: member.accent }}
          >
            {member.quote}
          </blockquote>

          <div className="flex items-center justify-between border-t border-white/10 pt-2.5 font-mono-tech text-[9px] text-emerald-300">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>MyITSoft Core</span>
            </span>
            <span className="truncate pl-2 text-white/55">{member.specialty}</span>
          </div>
        </div>
      </div>
    </div>
  )
})
