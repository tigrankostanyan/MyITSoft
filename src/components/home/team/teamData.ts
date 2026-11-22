import { Code2, Cpu, Layers, Palette, Sparkles, Workflow } from 'lucide-react'

export interface TeamMember {
  id: string
  index: string
  name: string
  role: string
  badge: string
  photo: string
  photoPosition: string
  accent: string
  auraFrom: string
  auraTo: string
  experience: string
  projects: string
  specialty: string
  bio: string
  quote: string
  skills: string[]
  icon: typeof Cpu
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tigran',
    index: '01',
    name: 'Տիգրան Հակոբյան',
    role: 'Հիմնադիր և Գլխավոր Ճարտարապետ',
    badge: 'FOUNDER · ARCHITECT',
    photo: '/images/team/member-1.jpg',
    photoPosition: 'center 20%',
    accent: '#38bdf8',
    auraFrom: 'rgba(56, 189, 248, 0.32)',
    auraTo: 'rgba(37, 99, 235, 0.2)',
    experience: '9+ տարի',
    projects: '85+ նախագիծ',
    specialty: 'Enterprise Web & Cloud',
    bio: 'Նախագծում է բարձր բեռնվածությամբ վեբ հարթակներ, բիզնեսի թվային ճարտարապետություն և ավտոմատացված էկոհամակարգեր։',
    quote: '«Լավ կոդը չի երևում, բայց ամեն վայրկյան աշխատում է ձեր բիզնեսի աճի համար։»',
    skills: ['TypeScript', 'Next.js / React', 'Cloud Architecture', 'High-Load API'],
    icon: Cpu,
  },
  {
    id: 'aram',
    index: '02',
    name: 'Արամ Սարգսյան',
    role: '3D WebGL և Creative Developer',
    badge: '3D ENGINE · THREE.JS',
    photo: '/images/team/member-2.jpg',
    photoPosition: 'center 18%',
    accent: '#38bdf8',
    auraFrom: 'rgba(56, 189, 248, 0.32)',
    auraTo: 'rgba(37, 99, 235, 0.22)',
    experience: '6+ տարի',
    projects: '48+ 3D սցենա',
    specialty: 'WebGL · Shaders · 120FPS',
    bio: 'Ստեղծում է կինեմատոգրաֆիկ 3D ինտերֆեյսներ, ինտերակտիվ մոդելներ և սահուն սքրոլ-անիմացիաներ՝ 99/100 արագությամբ։',
    quote: '«Կայքը պետք է առաջին 3 վայրկյանում առաջացնի "վա՜ու" էֆեկտ և մնա հիշողության մեջ։»',
    skills: ['Three.js / R3F', 'GLSL Shaders', 'GSAP Motion', 'WebGL Optimization'],
    icon: Layers,
  },
  {
    id: 'ani',
    index: '03',
    name: 'Անի Մարտիրոսյան',
    role: 'Ավագ UI/UX և Motion Դիզայներ',
    badge: 'UI/UX · DESIGN SYSTEMS',
    photo: '/images/team/member-3.jpg',
    photoPosition: 'center 12%',
    accent: '#60a5fa',
    auraFrom: 'rgba(96, 165, 250, 0.3)',
    auraTo: 'rgba(56, 189, 248, 0.18)',
    experience: '7+ տարի',
    projects: '70+ բրենդ',
    specialty: 'Product Design & Motion',
    bio: 'Ձևավորում է վաճառող ինտերֆեյսներ, միկրո-անիմացիաներ և պրեմիում դիզայն-համակարգեր՝ բարձր կոնվերսիայի համար։',
    quote: '«Պարզությունն ու էսթետիկան միասին են դարձնում բարդ տեխնոլոգիան հասկանալի։»',
    skills: ['Figma Systems', 'Interactive Prototyping', 'Brand Identity', 'UX Psychology'],
    icon: Palette,
  },
  {
    id: 'davit',
    index: '04',
    name: 'Դավիթ Գրիգորյան',
    role: 'CRM / ERP Ավտոմատացման Ինժեներ',
    badge: 'AUTOMATION · 1C & API',
    photo: '/images/team/member-4.jpg',
    photoPosition: 'center 18%',
    accent: '#22d3ee',
    auraFrom: 'rgba(34, 211, 238, 0.3)',
    auraTo: 'rgba(37, 99, 235, 0.2)',
    experience: '8+ տարի',
    projects: '60+ համակարգ',
    specialty: 'CRM · ERP · Banking API',
    bio: 'Միավորում է կայքերը, 1C հաշվառումը, Idram/ArCa վճարումները և պահեստը մեկ անխափան ավտոպիլոտ համակարգում։',
    quote: '«Եթե գործողությունը կրկնվում է երկու անգամ, ուրեմն այն պետք է ավտոմատացնել։»',
    skills: ['CRM / ERP Pipelines', '1C & Bank APIs', 'PostgreSQL', 'Node.js Microservices'],
    icon: Workflow,
  },
  {
    id: 'narek',
    index: '05',
    name: 'Նարեկ Պետրոսյան',
    role: 'AI Համակարգերի և Բոտերի Ճարտարապետ',
    badge: 'AI AGENTS · 24/7 BOTS',
    photo: '/images/team/member-5.jpg',
    photoPosition: 'center 15%',
    accent: '#34d399',
    auraFrom: 'rgba(52, 211, 153, 0.28)',
    auraTo: 'rgba(56, 189, 248, 0.18)',
    experience: '5+ տարի',
    projects: '42+ AI բոտ',
    specialty: 'LLM Agents · Telegram · IG',
    bio: 'Կառուցում է հայերեն խոսող AI վաճառքի օգնականներ Instagram-ի, Telegram-ի և կայքերի համար՝ 0.4վ արձագանքով։',
    quote: '«Խելացի AI օգնականը վաճառում է նաև այն ժամանակ, երբ ձեր թիմը հանգստանում է։»',
    skills: ['LLM Agents', 'Telegram & IG API', 'RAG Pipelines', 'Voice & Chat AI'],
    icon: Code2,
  },
  {
    id: 'hovhannisyan',
    index: '06',
    name: 'Է․ Հովհաննիսյան',
    role: 'Նախագծերի Ղեկավար և Բիզնեսի Զարգացում',
    badge: 'PRODUCT · GROWTH',
    photo: '/images/team/member-6.jpg',
    photoPosition: 'center 18%',
    accent: '#fbbf24',
    auraFrom: 'rgba(251, 191, 36, 0.28)',
    auraTo: 'rgba(37, 99, 235, 0.2)',
    experience: '6+ տարի',
    projects: '55+ նախագիծ',
    specialty: 'Product Strategy · Sales & Delivery',
    bio: 'Կազմակերպում է բարդ IT նախագծերի իրականացումը՝ գաղափարից մինչև գործարկում և բիզնեսի չափելի արդյունք։',
    quote: '«Յուրաքանչյուր թվային լուծում պետք է բերի իրական աճ և արագ վերադարձ։»',
    skills: ['Product Strategy', 'Project Delivery', 'Client Success', 'Business Growth'],
    icon: Sparkles,
  },
]
