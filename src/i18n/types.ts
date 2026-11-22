export type Locale = 'hy' | 'ru' | 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  hy: 'ՀԱՅ',
  ru: 'РУС',
  en: 'ENG',
}

export interface ProductTranslation {
  name: string
  subtitle: string
  weight: string
  tag: string
  calories: string
  description: string
  ingredients: string[]
}

export interface SiteTranslations {
  meta: {
    contactTitle: string
    contactDescription: string
  }
  preloader: {
    subtitle: string
    ariaLabel: string
  }
  navbar: {
    mainNavAria: string
    backToTopAria: string
    homeAria: string
    contact: string
    call: string
    callAriaPrefix: string
    phoneCopiedAria: string
    copyPhoneAria: string
    copiedBadge: string
    copyTitlePrefix: string
    mobileNavAria: string
    mobileTabs: {
      home: string
      services: string
      team: string
      contact: string
    }
  }
  hero: {
    pill: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    bottomStrip: string
    whyTitlePrefix: string
    whySubtitle: string
    whyTagline: string
    features: {
      code: string
      title: string
      description: string
    }[]
  }
  carousel: {
    eyebrow: string
    titlePrefix: string
    titleHighlight: string
    subtitle: string
    view3D: string
    discussProject: string
    added: string
    steps: {
      pillLabel: string
      title: string
      shortDesc: string
      price: string
      timeline: string
      highlights: string[]
    }[]
    slide0: {
      cardTitle: string
      cardSubtitle: string
      floatingTitle: string
      loadUnit: string
      loadLabel: string
      leadsLabel: string
    }
    slide1: {
      stats: { label: string; val: string; delta: string }[]
      recentDeals: string
      deals: { client: string; status: string; amount: string }[]
      growth7d: string
      pipeline: string[]
      syncAccounting: string
    }
    slide2: {
      cats: [string, string, string]
      buy: string
      warehouseLive: string
      deliveryCheckout: string
      modules: [string, string, string, string]
    }
    slide3: {
      customDesignSystem: string
    }
    slide4: {
      aiSales: string
      responseSpeed: string
      activeBot: string
      greeting: string
      userPrompt: string
      preparingOffer: string
      readyInDays: string
      bullets: [string, string, string]
      newOrder: string
      registeredInCrm: string
      paidViaIdram: string
      auto100: string
    }
  }
  services: {
    title: string
    tagline: string
    footerPrompt: string
    ctaButton: string
    items: {
      title: string
      subtitle: string
      capabilities: string[]
    }[]
  }
  cartJourney: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleLine3: string
    description: string
    badge1: string
    badge2: string
    scrollPrompt: string
    processStages: [string, string, string, string, string]
  }
  faq: {
    hookTitle: string
    hookSubtitle: string
    titlePrefix: string
    titleHighlight: string
    searchTyping: string
    items: {
      num: string
      q: string
      a: string
    }[]
  }
  launch: {
    eyebrow: string
    titlePrimary: string
    titleMuted: string
    scrollHint: string
    ctaButton: string
    steps: {
      number: number
      title: string
      description: string
    }[]
    readyCta: {
      eyebrow: string
      prefix: string
      suffix: string
      description: string
      placeholder: string
      submitLabel: string
      responseHint: string
      successTitle: string
      viewPackage: string
      switchHint: string
    }
  }
  footer: {
    ctaButton: string
    navHeading: string
    servicesHeading: string
    contactHeading: string
    navLinks: {
      home: string
      solutions: string
      services: string
      team: string
      faq: string
      contact: string
    }
    serviceLinks: [string, string, string, string, string]
    address: string
    addressShort: string
    workingHours: string
    mapTitle: string
    copyrightSuffix: string
  }
  contactPage: {
    title: string
    subtitle: string
    infoEyebrow: string
    infoTitle: string
    infoDesc: string
    headOffice: string
    emailLabel: string
    callUs: string
    followUs: string
    formEyebrow: string
    formTitle: string
    sentTitle: string
    sentDesc: string
    sendAnother: string
    nameLabel: string
    namePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    phoneLabel: string
    emailFieldLabel: string
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitButton: string
    openInMaps: string
  }
  modal3D: {
    closeAria: string
    viewerTitle: string
    rotateZoom: string
    layers: string
    xray: string
    discountPrefix: string
    verifiedReviewsSuffix: string
    includedModules: string
    timelineLabel: string
    efficiencyLabel: string
    added: string
    addPrefix: string
    wishlistAria: string
  }
  cartDrawer: {
    title: string
    closeAria: string
    confirmedTitle: string
    confirmedDesc: string
    continueBrowsing: string
    emptyTitle: string
    emptyDesc: string
    viewSolutions: string
    freeAuditActive: string
    addForFreeAuditPrefix: string
    addForFreeAuditSuffix: string
    promoPlaceholder: string
    applyButton: string
    appliedCodePrefix: string
    removeButton: string
    subtotal: string
    discountPrefix: string
    deliveryYerevan: string
    free: string
    total: string
    confirmOrder: string
    removeAria: string
    decreaseAria: string
    increaseAria: string
  }
  categoryLabels: Record<'websites' | 'automation' | 'bots' | 'ecommerce' | 'cloud', string>
  products: Record<string, ProductTranslation>
}

