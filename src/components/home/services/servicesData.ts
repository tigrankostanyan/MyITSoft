export interface ServiceDiscipline {
  id: string
  index: string
  title: string
  subtitle: string
  accent: string
  accentRgb: string
  glow: string
  capabilities: readonly string[]
}

export const SERVICES: readonly ServiceDiscipline[] = [
  {
    id: 'web-design-3d',
    index: '01',
    title: 'Դիզայն և թվային փորձ',
    subtitle: 'ԴԻԶԱՅՆ · UI/UX · 3D ՄԻՋԱՎԱՅՐԵՐ',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    glow: 'rgba(56, 189, 248, 0.22)',
    capabilities: [
      'Բիզնեսի վերլուծություն',
      'Օգտատիրոջ ճանապարհի նախագծում',
      'Անհատական դիզայն',
      '3D WebGL միջավայրեր',
      'Պրոտոտիպավորում',
      'Փորձարկում իրական սցենարներով',
      'Բրենդային ինքնության ամրապնդում',
    ],
  },
  {
    id: 'development',
    index: '02',
    title: 'Անհատական ծրագրային համակարգեր',
    subtitle: 'ՀԱՐԹԱԿՆԵՐ · ՀԱՎԵԼՎԱԾՆԵՐ · ԻՆՏԵԳՐԱՑԻԱ',
    accent: '#818cf8',
    accentRgb: '129, 140, 248',
    glow: 'rgba(129, 140, 248, 0.22)',
    capabilities: [
      'Պահանջների ուսումնասիրություն',
      'Ծրագրային ճարտարապետության նախագծում',
      'Վեբ և մոբայլ հավելվածներ',
      'SaaS հարթակներ',
      'Գործող համակարգերի ինտեգրում',
      'Որակի և անվտանգության ստուգում',
      'Տեխնիկական աջակցություն',
    ],
  },
  {
    id: 'business-automation',
    index: '03',
    title: 'Բիզնես գործընթացների ավտոմատացում',
    subtitle: 'ԳՈՐԾԸՆԹԱՑՆԵՐ · ՀԱՇՎԱՌՈՒՄ · ԱՆԱԼԻՏԻԿԱ',
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    glow: 'rgba(34, 211, 238, 0.22)',
    capabilities: [
      'Գործընթացների քարտեզագրում',
      'Խոչընդոտների վերհանում',
      'CRM / ERP համակարգեր',
      'Հաշվառման և վերահսկողության համակարգեր',
      'Տվյալների վերլուծություն',
      'Գործող գործիքների ինտեգրում',
    ],
  },
  {
    id: 'ai-integration',
    index: '04',
    title: 'AI և խելացի համակարգեր',
    subtitle: 'ԱՐՀԵՍՏԱԿԱՆ ԲԱՆԱԿԱՆՈՒԹՅՈՒՆ · ԽԵԼԱՑԻ ՀԱՄԱԿԱՐԳԵՐ',
    accent: '#00e5ff',
    accentRgb: '0, 229, 255',
    glow: 'rgba(0, 229, 255, 0.24)',
    capabilities: [
      'Հնարավորությունների գնահատում',
      'AI օգնականներ և բոտեր',
      'LLM ինտեգրացիաներ',
      'RAG համակարգեր',
      'Փորձարկում և համեմատում',
      'Ներդրում գործող գործընթացներում',
    ],
  },
] as const
