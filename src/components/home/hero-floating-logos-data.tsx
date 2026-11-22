export interface TechLogoItem {
  id: string
  label: string
  left: string
  top: string
  mobileLeft: string
  mobileTop: string
  size: string
  duration: string
  delay: string
  scrollSpeed: number
  tilt: string
  glowColor: string
  tileBg: string
  borderTint: string
  renderIcon: () => React.ReactNode
}

export const FLOATING_LOGOS: TechLogoItem[] = [
  {
    id: 'figma',
    label: 'Figma',
    left: '44%',
    top: '21.5%',
    mobileLeft: '10%',
    mobileTop: '14%',
    size: 'h-[36px] w-[36px] min-[380px]:h-[40px] min-[380px]:w-[40px] md:h-[68px] md:w-[68px] xl:h-[78px] xl:w-[78px]',
    duration: '6.4s',
    delay: '0s',
    scrollSpeed: 0.95,
    tilt: 'perspective(560px) rotateY(10deg) rotateX(6deg)',
    glowColor: 'rgba(162, 89, 255, 0.28)',
    tileBg: 'linear-gradient(145deg, rgba(28, 32, 52, 0.92) 0%, rgba(14, 17, 32, 0.96) 100%)',
    borderTint: 'rgba(255, 255, 255, 0.22)',
    renderIcon: () => (
      <svg viewBox="0 0 38 57" className="h-[58%] w-auto drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <path d="M9.5 0H19v19H9.5a9.5 9.5 0 0 1 0-19Z" fill="#F24E1E" />
        <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0Z" fill="#FF7262" />
        <path d="M9.5 19H19v19H9.5a9.5 9.5 0 0 1 0-19Z" fill="#A259FF" />
        <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
        <path d="M9.5 38H19v9.5a9.5 9.5 0 1 1-9.5-9.5Z" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    id: 'react',
    label: 'React',
    left: '58.5%',
    top: '12.5%',
    mobileLeft: '28%',
    mobileTop: '11.5%',
    size: 'h-[34px] w-[34px] min-[380px]:h-[38px] min-[380px]:w-[38px] md:h-[64px] md:w-[64px] xl:h-[74px] xl:w-[74px]',
    duration: '7.1s',
    delay: '-1.6s',
    scrollSpeed: 1.15,
    tilt: 'perspective(560px) rotateY(6deg) rotateX(8deg)',
    glowColor: 'rgba(97, 218, 251, 0.28)',
    tileBg: 'linear-gradient(145deg, rgba(18, 32, 52, 0.92) 0%, rgba(10, 17, 30, 0.96) 100%)',
    borderTint: 'rgba(97, 218, 251, 0.34)',
    renderIcon: () => (
      <svg viewBox="-11.5 -10.232 23 20.464" className="h-[64%] w-[64%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.05" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'illustrator',
    label: 'Adobe Illustrator',
    left: '73%',
    top: '13%',
    mobileLeft: '72%',
    mobileTop: '11.5%',
    size: 'h-[35px] w-[35px] min-[380px]:h-[39px] min-[380px]:w-[39px] md:h-[68px] md:w-[68px] xl:h-[78px] xl:w-[78px]',
    duration: '6.8s',
    delay: '-3.1s',
    scrollSpeed: 1.05,
    tilt: 'perspective(560px) rotateY(-8deg) rotateX(7deg)',
    glowColor: 'rgba(255, 154, 0, 0.36)',
    tileBg: 'linear-gradient(145deg, #3A0A00 0%, #240400 100%)',
    borderTint: 'rgba(255, 154, 0, 0.72)',
    renderIcon: () => (
      <svg viewBox="0 0 64 64" className="h-[78%] w-[78%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <text
          x="32"
          y="43.5"
          textAnchor="middle"
          fill="#FF9A00"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif"
          fontWeight="800"
          fontSize="34"
          letterSpacing="-1.2"
        >
          Ai
        </text>
      </svg>
    ),
  },
  {
    id: 'photoshop',
    label: 'Adobe Photoshop',
    left: '87.5%',
    top: '18.5%',
    mobileLeft: '90%',
    mobileTop: '14%',
    size: 'h-[36px] w-[36px] min-[380px]:h-[40px] min-[380px]:w-[40px] md:h-[68px] md:w-[68px] xl:h-[78px] xl:w-[78px]',
    duration: '7.5s',
    delay: '-0.9s',
    scrollSpeed: 1.2,
    tilt: 'perspective(560px) rotateY(-12deg) rotateX(6deg)',
    glowColor: 'rgba(49, 168, 255, 0.34)',
    tileBg: 'linear-gradient(145deg, #002340 0%, #001528 100%)',
    borderTint: 'rgba(49, 168, 255, 0.72)',
    renderIcon: () => (
      <svg viewBox="0 0 64 64" className="h-[78%] w-[78%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <text
          x="32"
          y="43.5"
          textAnchor="middle"
          fill="#31A8FF"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif"
          fontWeight="800"
          fontSize="34"
          letterSpacing="-1.4"
        >
          Ps
        </text>
      </svg>
    ),
  },
  {
    id: 'vscode',
    label: 'VS Code',
    left: '94.5%',
    top: '38%',
    mobileLeft: '92.5%',
    mobileTop: '26%',
    size: 'h-[35px] w-[35px] min-[380px]:h-[39px] min-[380px]:w-[39px] md:h-[66px] md:w-[66px] xl:h-[76px] xl:w-[76px]',
    duration: '6.2s',
    delay: '-2.4s',
    scrollSpeed: 1.25,
    tilt: 'perspective(560px) rotateY(-13deg) rotateX(2deg)',
    glowColor: 'rgba(0, 122, 204, 0.32)',
    tileBg: 'linear-gradient(145deg, rgba(16, 30, 56, 0.92) 0%, rgba(10, 17, 34, 0.96) 100%)',
    borderTint: 'rgba(36, 160, 237, 0.38)',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="h-[62%] w-[62%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <path
          d="M17.5 25.5 74 68.5V90c-.6 0-1.2-.2-1.7-.5L11.2 35.8a3 3 0 0 1 0-4.5l4.3-4.1a3 3 0 0 1 2-.7Z"
          fill="#0065A9"
        />
        <path
          d="M17.5 74.5 74 31.5V10c-.6 0-1.2.2-1.7.5L11.2 64.2a3 3 0 0 0 0 4.5l4.3 4.1a3 3 0 0 0 2 .7Z"
          fill="#007ACC"
        />
        <path
          d="M74 10c1.1 0 2.1.2 3 .7l11.2 5.4A4.5 4.5 0 0 1 90.8 20v60a4.5 4.5 0 0 1-2.6 4.1L77 89.3c-.9.5-1.9.7-3 .7V10Z"
          fill="#29B6F6"
        />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    left: '44.5%',
    top: '71%',
    mobileLeft: '8%',
    mobileTop: '26%',
    size: 'h-[35px] w-[35px] min-[380px]:h-[39px] min-[380px]:w-[39px] md:h-[66px] md:w-[66px] xl:h-[76px] xl:w-[76px]',
    duration: '7.3s',
    delay: '-4.2s',
    scrollSpeed: 1.45,
    tilt: 'perspective(560px) rotateY(11deg) rotateX(-5deg)',
    glowColor: 'rgba(95, 160, 78, 0.3)',
    tileBg: 'linear-gradient(145deg, rgba(18, 36, 26, 0.92) 0%, rgba(10, 20, 16, 0.96) 100%)',
    borderTint: 'rgba(131, 205, 41, 0.36)',
    renderIcon: () => (
      <svg viewBox="0 0 64 64" className="h-[68%] w-[68%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <defs>
          <linearGradient id="node-hex-grad" x1="12" y1="6" x2="52" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#83CD29" />
            <stop offset="52%" stopColor="#5FA04E" />
            <stop offset="100%" stopColor="#3C873A" />
          </linearGradient>
        </defs>
        <path
          d="M29.6 5.4a4.8 4.8 0 0 1 4.8 0l20.2 11.7a4.8 4.8 0 0 1 2.4 4.15v23.5a4.8 4.8 0 0 1-2.4 4.15L34.4 60.6a4.8 4.8 0 0 1-4.8 0L9.4 48.9A4.8 4.8 0 0 1 7 44.75v-23.5a4.8 4.8 0 0 1 2.4-4.15L29.6 5.4Z"
          fill="url(#node-hex-grad)"
        />
        <path
          d="M32 4.8c.8 0 1.6.2 2.4.6l20.2 11.7a4.8 4.8 0 0 1 2.4 4.15v23.5a4.8 4.8 0 0 1-2.4 4.15L34.4 60.6c-.8.4-1.6.6-2.4.6V4.8Z"
          fill="#000000"
          fillOpacity="0.14"
        />
        <text
          x="32"
          y="39.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif"
          fontWeight="800"
          fontSize="21"
          letterSpacing="-0.8"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    id: 'cpp',
    label: 'C++',
    left: '94%',
    top: '61%',
    mobileLeft: '89.5%',
    mobileTop: '37.5%',
    size: 'h-[35px] w-[35px] min-[380px]:h-[39px] min-[380px]:w-[39px] md:h-[68px] md:w-[68px] xl:h-[78px] xl:w-[78px]',
    duration: '6.6s',
    delay: '-2.1s',
    scrollSpeed: 1.5,
    tilt: 'perspective(560px) rotateY(-10deg) rotateX(-5deg)',
    glowColor: 'rgba(0, 89, 156, 0.34)',
    tileBg: 'linear-gradient(145deg, rgba(16, 30, 58, 0.94) 0%, rgba(9, 16, 34, 0.97) 100%)',
    borderTint: 'rgba(101, 154, 210, 0.42)',
    renderIcon: () => (
      <svg viewBox="0 0 64 64" className="h-[68%] w-[68%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <defs>
          <clipPath id="cpp-hex-clip">
            <path d="M29.6 5.4a4.8 4.8 0 0 1 4.8 0l20.2 11.7a4.8 4.8 0 0 1 2.4 4.15v23.5a4.8 4.8 0 0 1-2.4 4.15L34.4 60.6a4.8 4.8 0 0 1-4.8 0L9.4 48.9A4.8 4.8 0 0 1 7 44.75v-23.5a4.8 4.8 0 0 1 2.4-4.15L29.6 5.4Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#cpp-hex-clip)">
          <rect width="64" height="64" fill="#00599C" />
          <polygon points="4,49 4,15 32,0 60,15 32,32" fill="#659AD2" />
          <polygon points="32,32 60,15 60,49" fill="#004482" />
        </g>
        <path
          d="M42.8 25.8A12.5 12.5 0 1 0 42.8 38.2"
          stroke="#FFFFFF"
          strokeWidth="7.4"
          strokeLinecap="butt"
        />
        <path
          d="M43 29.1v5.8M40.1 32h5.8M50.2 29.1v5.8M47.3 32h5.8"
          stroke="#FFFFFF"
          strokeWidth="2.1"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    id: 'cloud',
    label: 'Cloud',
    left: '91%',
    top: '82%',
    mobileLeft: '11.5%',
    mobileTop: '37.5%',
    size: 'h-[34px] w-[34px] min-[380px]:h-[38px] min-[380px]:w-[38px] md:h-[64px] md:w-[64px] xl:h-[74px] xl:w-[74px]',
    duration: '7.8s',
    delay: '-3.7s',
    scrollSpeed: 1.6,
    tilt: 'perspective(560px) rotateY(-10deg) rotateX(-6deg)',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    tileBg: 'linear-gradient(145deg, rgba(16, 32, 60, 0.92) 0%, rgba(10, 18, 36, 0.96) 100%)',
    borderTint: 'rgba(96, 165, 250, 0.38)',
    renderIcon: () => (
      <svg viewBox="0 0 64 64" className="h-[66%] w-[66%] drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" fill="none">
        <defs>
          <linearGradient id="cloud-3d" x1="10" y1="16" x2="54" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93E5FF" />
            <stop offset="48%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <path
          d="M19.5 47h26.5a11 11 0 0 0 1.8-21.85A15 15 0 0 0 17.8 21.4 12.4 12.4 0 0 0 19.5 47Z"
          fill="url(#cloud-3d)"
        />
        <path
          d="M21.5 30.5a9.2 9.2 0 0 1 16-5.5"
          stroke="#E0F2FE"
          strokeOpacity="0.7"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]
