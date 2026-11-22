export interface CursorWaypoint {
  p: number
  x: number
  y: number
  click?: boolean
}

export interface CursorAgent {
  id: string
  label: string
  color: string
  textColor?: string
  enterP: number
  exitP: number
  exitPos: [number, number]
  waypoints: readonly CursorWaypoint[]
}

export const CURSOR_AGENTS: readonly CursorAgent[] = [
  {
    id: 'figma',
    label: 'Figma',
    color: '#a259ff',
    enterP: 0.02,
    exitP: 0.81,
    exitPos: [-8, -16],
    waypoints: [
      { p: 0.02, x: 10, y: 12 },
      { p: 0.11, x: 24, y: 15, click: true },
      { p: 0.24, x: 48, y: 26, click: true },
      { p: 0.44, x: 16, y: 38 },
      { p: 0.68, x: 22, y: 28 },
      { p: 0.81, x: 14, y: 18 },
    ],
  },
  {
    id: 'uiux',
    label: 'UI / UX',
    color: '#f24e1e',
    enterP: 0.04,
    exitP: 0.82,
    exitPos: [96, -15],
    waypoints: [
      { p: 0.04, x: 88, y: 16 },
      { p: 0.15, x: 64, y: 17, click: true },
      { p: 0.3, x: 34, y: 18 },
      { p: 0.52, x: 56, y: 44, click: true },
      { p: 0.72, x: 78, y: 34 },
      { p: 0.82, x: 92, y: 14 },
    ],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    color: '#0284c7',
    enterP: 0.12,
    exitP: 0.84,
    exitPos: [-10, 110],
    waypoints: [
      { p: 0.12, x: 14, y: 55 },
      { p: 0.26, x: 12, y: 64, click: true },
      { p: 0.4, x: 30, y: 66, click: true },
      { p: 0.56, x: 49, y: 65, click: true },
      { p: 0.74, x: 28, y: 58 },
      { p: 0.84, x: 10, y: 88 },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    color: '#06b6d4',
    enterP: 0.08,
    exitP: 0.85,
    exitPos: [112, 32],
    waypoints: [
      { p: 0.08, x: 52, y: 11 },
      { p: 0.2, x: 38, y: 32, click: true },
      { p: 0.36, x: 74, y: 29, click: true },
      { p: 0.58, x: 54, y: 11, click: true },
      { p: 0.76, x: 76, y: 28 },
      { p: 0.85, x: 96, y: 26 },
    ],
  },
  {
    id: 'react',
    label: 'React',
    color: '#0ea5e9',
    enterP: 0.16,
    exitP: 0.83,
    exitPos: [-14, 48],
    waypoints: [
      { p: 0.16, x: 5, y: 31 },
      { p: 0.28, x: 94, y: 31, click: true },
      { p: 0.46, x: 31, y: 69, click: true },
      { p: 0.64, x: 67, y: 63 },
      { p: 0.77, x: 32, y: 66 },
      { p: 0.83, x: 6, y: 52 },
    ],
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    color: '#14b8a6',
    enterP: 0.18,
    exitP: 0.82,
    exitPos: [114, 65],
    waypoints: [
      { p: 0.18, x: 84, y: 17 },
      { p: 0.32, x: 18, y: 56, click: true },
      { p: 0.48, x: 56, y: 57, click: true },
      { p: 0.66, x: 88, y: 62 },
      { p: 0.82, x: 96, y: 62 },
    ],
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    color: '#16a34a',
    enterP: 0.22,
    exitP: 0.86,
    exitPos: [86, -17],
    waypoints: [
      { p: 0.22, x: 82, y: 10 },
      { p: 0.38, x: 91, y: 11, click: true },
      { p: 0.54, x: 69, y: 74, click: true },
      { p: 0.7, x: 87, y: 74, click: true },
      { p: 0.86, x: 95, y: 10 },
    ],
  },
  {
    id: 'mysql',
    label: 'MySQL',
    color: '#d97706',
    enterP: 0.3,
    exitP: 0.87,
    exitPos: [50, 114],
    waypoints: [
      { p: 0.3, x: 68, y: 54 },
      { p: 0.48, x: 85, y: 60, click: true },
      { p: 0.62, x: 22, y: 90, click: true },
      { p: 0.74, x: 62, y: 90, click: true },
      { p: 0.87, x: 52, y: 98 },
    ],
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    color: '#2563eb',
    enterP: 0.34,
    exitP: 0.84,
    exitPos: [114, 98],
    waypoints: [
      { p: 0.34, x: 48, y: 56 },
      { p: 0.5, x: 67, y: 68, click: true },
      { p: 0.66, x: 87, y: 67, click: true },
      { p: 0.78, x: 76, y: 90 },
      { p: 0.84, x: 96, y: 92 },
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    color: '#ec4899',
    enterP: 0.25,
    exitP: 0.83,
    exitPos: [110, 18],
    waypoints: [
      { p: 0.25, x: 76, y: 31 },
      { p: 0.42, x: 74, y: 33, click: true },
      { p: 0.6, x: 35, y: 91, click: true },
      { p: 0.75, x: 79, y: 32 },
      { p: 0.83, x: 95, y: 22 },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    color: '#10b981',
    enterP: 0.52,
    exitP: 0.88,
    exitPos: [22, -18],
    waypoints: [
      { p: 0.52, x: 28, y: 5 },
      { p: 0.68, x: 21, y: 3, click: true },
      { p: 0.76, x: 84, y: 11, click: true },
      { p: 0.82, x: 22, y: 3, click: true },
      { p: 0.88, x: 22, y: -4 },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    color: '#eab308',
    textColor: '#0f172a',
    enterP: 0.46,
    exitP: 0.86,
    exitPos: [-12, 92],
    waypoints: [
      { p: 0.46, x: 18, y: 49 },
      { p: 0.64, x: 16, y: 81, click: true },
      { p: 0.76, x: 91, y: 81, click: true },
      { p: 0.86, x: 6, y: 88 },
    ],
  },
] as const
