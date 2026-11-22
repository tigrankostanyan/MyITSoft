import { memo } from 'react'
import { CURSOR_AGENTS } from './builderTimeline'

interface MultiplayerCursorsLayerProps {
  cursorRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  ringRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

export const MultiplayerCursorsLayer = memo(function MultiplayerCursorsLayer({
  cursorRefs,
  ringRefs,
}: MultiplayerCursorsLayerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 overflow-visible"
    >
      {CURSOR_AGENTS.map((agent, idx) => (
        <div
          key={agent.id}
          ref={(el) => {
            cursorRefs.current[idx] = el
          }}
          className="absolute top-0 left-0 will-change-transform"
          style={{ opacity: 0 }}
        >
          <span
            ref={(el) => {
              ringRefs.current[idx] = el
            }}
            className="absolute -top-2.5 -left-2.5 h-6 w-6 rounded-full"
            style={{
              border: `2px solid ${agent.color}`,
              opacity: 0,
              transform: 'scale(0.5)',
            }}
          />

          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            className="mobile-drop-shadow-lite drop-shadow-[0_3px_6px_rgba(15,23,42,0.38)]"
          >
            <path
              d="M2.2 1.8L17.4 9.5L10.3 11.7L7.6 18.8L2.2 1.8Z"
              fill={agent.color}
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          <div
            className="mt-0.5 ml-3.5 inline-flex items-center gap-1 rounded-full px-2.5 py-[2px] text-[10.5px] font-bold tracking-tight whitespace-nowrap shadow-[0_4px_12px_rgba(15,23,42,0.28)]"
            style={{
              backgroundColor: agent.color,
              color: agent.textColor ?? '#ffffff',
              border: '1px solid rgba(255,255,255,0.45)',
            }}
          >
            <span>{agent.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
})
