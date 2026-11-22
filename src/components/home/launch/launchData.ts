export interface LaunchStep {
  number: number
  title: string
  description: string
  badgeGradient: string
  badgeBorder: string
  badgeGlow: string
}

export const LAUNCH_COPY = {
  eyebrow: 'ՍԿՍԵՔ ՁԵՐ ՆԱԽԱԳԻԾԸ MYITSOFT-Ի ՀԵՏ',
  titlePrimary: 'Ինչպես',
  titleMuted: 'սկսել։',
  scrollHint: 'ԱՌԱՋԻՆ ՔԱՅԼԸ՝ ԶՐՈՒՅՑ ՁԵՐ ԽՆԴՐԻ ՄԱՍԻՆ',
  liftoffLabel: 'ԱՌԱՋԻՆ ՔԱՅԼԸ՝ ԶՐՈՒՅՑ ՁԵՐ ԽՆԴՐԻ ՄԱՍԻՆ',
  ctaButton: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
} as const

export const LAUNCH_STEPS: LaunchStep[] = [
  {
    number: 1,
    title: 'Խորհրդատվություն և վերլուծություն',
    description:
      'Ծանոթանում ենք ձեր բիզնեսին, նպատակներին և գործող գործընթացներին։ Բացահայտում ենք հնարավորությունները և ներկայացնում առաջարկվող լուծումը՝ հստակ փուլերով, ժամկետներով և ծավալով։',
    badgeGradient: 'linear-gradient(145deg, #38bdf8 0%, #2563eb 55%, #1d4ed8 100%)',
    badgeBorder: 'rgba(125, 211, 252, 0.55)',
    badgeGlow: '0 8px 26px rgba(37, 99, 235, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
  },
  {
    number: 2,
    title: 'Նախագծում և փորձարկում',
    description:
      'Նախագծում ենք համակարգի ճարտարապետությունն ու ինտերֆեյսը։ Յուրաքանչյուր փուլի արդյունքը ներկայացնում ենք ձեզ, ստանում ենք ձեր հաստատումը և փորձարկում ենք լուծումը նախքան գործարկումը։',
    badgeGradient: 'linear-gradient(145deg, #38bdf8 0%, #2563eb 55%, #1e40af 100%)',
    badgeBorder: 'rgba(125, 211, 252, 0.5)',
    badgeGlow: '0 8px 26px rgba(37, 99, 235, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
  },
  {
    number: 3,
    title: 'Գործարկում և զարգացում',
    description:
      'Գործարկում ենք համակարգը և անհրաժեշտ ինտեգրացիաները։ Գործարկումից հետո ապահովում ենք տեխնիկական աջակցություն և հետագա զարգացում՝ ձեր բիզնեսի պահանջներին համապատասխան, համաձայնեցված պայմաններով։',
    badgeGradient: 'linear-gradient(145deg, #22d3ee 0%, #0284c7 55%, #1e40af 100%)',
    badgeBorder: 'rgba(103, 232, 249, 0.55)',
    badgeGlow: '0 8px 26px rgba(0, 229, 255, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
  },
]

export const READY_CTA_COPY = {
  eyebrow: 'ՍԿՍԵՆՔ ԶՐՈՒՅՑԸ ՁԵՐ ԽՆԴՐԻ ՄԱՍԻՆ',
  prefix: 'ՍԿՍԵՆՔ',
  suffix: 'ԶՐՈՒՅՑԸ',
  description:
    'Թողեք ձեր էլ. հասցեն, և մեր թիմը կկապվի ձեզ հետ։ Կուսումնասիրենք ձեր խնդիրը և կառաջարկենք հիմնավորված լուծում՝ հստակ փուլերով և ժամկետներով։',
  placeholder: 'ՁԵՐ ԷԼ. ՀԱՍՑԵՆ',
  submitLabel: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
  responseHint: 'Կպատասխանենք 1 աշխատանքային օրվա ընթացքում։',
  successTitle: 'ՇՆՈՐՀԱԿԱԼՈՒԹՅՈՒՆ · ՄԵՐ ԹԻՄԸ ԿԿԱՊՎԻ ՁԵԶ ՀԵՏ',
  viewPackage: 'ԴԻՏԵԼ ԻՄ ՓԱԹԵԹԸ',
  switchHint: 'Սկսել զրույցը',
} as const
