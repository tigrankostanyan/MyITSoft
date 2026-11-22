import type { MutableRefObject } from 'react'

export interface ModelProps {
  color?: string
  exploded?: number
  hologram?: boolean
  isMobile?: boolean
  explodeRef?: MutableRefObject<number>
}
