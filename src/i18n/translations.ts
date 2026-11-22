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

export const TRANSLATIONS: Record<Locale, SiteTranslations> = {
  hy: {
    meta: {
      contactTitle: 'Կապ մեզ հետ — MyITSoft',
      contactDescription:
        'Կապվեք MyITSoft-ի հետ՝ վեբ կայքերի, մոբայլ հավելվածների, բիզնեսի ավտոմատացման և AI լուծումների համար։ Երևան, Մովսես Խորենացի փող. 15։',
    },
    preloader: {
      subtitle: '3D ՎԵԲ ԿԱՅՔԵՐ · CRM/ERP · AI ԲՈՏԵՐ · ԲԻԶՆԵՍԻ ԱՎՏՈՄԱՏԱՑՈՒՄ',
      ariaLabel: 'MyITSoft բացման էկրան',
    },
    navbar: {
      mainNavAria: 'Գլխավոր նավիգացիա',
      backToTopAria: 'Վերադառնալ վերև',
      homeAria: 'Գլխավոր էջ',
      contact: 'Կապ',
      call: 'Զանգել',
      callAriaPrefix: 'Զանգահարել՝',
      phoneCopiedAria: 'Հեռախոսահամարը պատճենված է',
      copyPhoneAria: 'Պատճենել հեռախոսահամարը',
      copiedBadge: 'Պատճենվեց!',
      copyTitlePrefix: 'Սեղմեք պատճենելու համար՝',
      mobileNavAria: 'Մոբայլ նավիգացիա',
      mobileTabs: {
        home: 'Գլխավոր',
        services: 'Լուծումներ',
        team: 'Թիմը',
        contact: 'Կապ',
      },
    },
    hero: {
      pill: 'MYITSOFT · ՎԵԲ ԿԱՅՔԵՐ ԵՎ ԲԻԶՆԵՍԻ ԱՎՏՈՄԱՏԱՑՈՒՄ',
      titleLine1: 'ՄՈՒՏՔ ԴԵՊԻ ԲԻԶՆԵՍԻ',
      titleLine2: 'ԹՎԱՅԻՆ ԱՊԱԳԱ',
      subtitle:
        'Այն, ինչ դեռ չկա, մենք կառուցում ենք։ Թվային համակարգեր, AI և ավտոմատացում՝ ձեր յուրաքանչյուր խնդրի համար։',
      ctaPrimary: 'ՍԿՍԵԼ ԶՐՈՒՅՑ',
      ctaSecondary: 'ԽՈՐՀՐԴԱՏՎՈՒԹՅՈՒՆ',
      bottomStrip: 'ՎԵԲ ԿԱՅՔԵՐ · CRM/ERP ԱՎՏՈՄԱՏԱՑՈՒՄ · AI ԲՈՏԵՐ',
      whyTitlePrefix: 'ԻՆՉՈՒ',
      whySubtitle: 'TECHNOLOGY · STRATEGY · INNOVATION',
      whyTagline: 'Տեխնոլոգիան միջոց է։ Մեր աշխատանքի հիմքը խնդրի խորը ըմբռնումն է։',
      features: [
        {
          code: '01 // ՄՈՏԵՑՈՒՄ',
          title: 'Ձեր խնդիրը դառնում է մեր խնդիրը',
          description:
            'Յուրաքանչյուր բիզնես յուրահատուկ է, ուստի պատրաստի լուծումներով չենք սահմանափակվում։ Վերլուծում ենք, նախագծում, թեստավորում և համեմատում շուկայի առաջավոր փորձի հետ՝ ամեն նախագծի հետ աշխատելով այնպես, ինչպես սեփականի։',
        },
        {
          code: '02 // ՏԵԽՆՈԼՈԳԻԱՆԵՐ',
          title: 'Լուծում՝ ըստ խնդրի',
          description:
            'Վեբ հարթակ, մոբայլ հավելված, ավտոմատացում, բոտ կամ AI համակարգ․ ձևաչափը որոշում է խնդիրը։ Ստեղծում ենք մասշտաբավորվող համակարգեր, որոնք ինտեգրվում են ձեր գործող գործընթացներին՝ CRM, ERP, հաշվապահական և բանկային լուծումներին։',
        },
        {
          code: '03 // ԱՆՎՏԱՆԳՈՒԹՅՈՒՆ',
          title: 'Անվտանգությունը՝ ճարտարապետության հիմքում',
          description:
            'Հուսալի համակարգեր՝ անվտանգ ճարտարապետությամբ, տվյալների պահուստավորմամբ և շարունակական տեխնիկական աջակցությամբ։',
        },
        {
          code: '04 // ԳՈՐԾԸՆԹԱՑ',
          title: 'Հստակ գործընթաց, թափանցիկ ընթացք',
          description:
            'Աշխատում ենք հստակ փուլերով, թափանցիկ հաղորդակցությամբ և վերահսկվող ժամկետներով։ Յուրաքանչյուր փուլում ապահովում ենք անմիջական կապ նախագծի մասնագետների հետ։',
        },
      ],
    },
    carousel: {
      eyebrow: 'ԺԱՄԱՆԱԿԱԿԻՑ ԼՈՒԾՈՒՄՆԵՐ',
      titlePrefix: 'Ի՞նչ ուղղություն եք ուզում թվայնացնել կամ',
      titleHighlight: 'ավտոմատացնել ձեր բիզնեսում։',
      subtitle: 'Ընտրեք ուղղությունը․ ձևաչափը և ծավալը կորոշվեն նախնական վերլուծությունից հետո։',
      view3D: '3D ԴԻՏԵԼ',
      discussProject: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
      added: 'Ավելացվեց',
      steps: [
        {
          pillLabel: 'Թվային հարթակներ',
          title: 'Թվային հարթակներ',
          shortDesc:
            'Վեբ հարթակներ, մոբայլ հավելվածներ և ինտերակտիվ 3D լուծումներ՝ նախագծված ձեր բիզնեսի նպատակների համար։',
          price: 'Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։',
          timeline: 'Անհատական լուծում',
          highlights: ['Web', 'Mobile', '3D / WebGL'],
        },
        {
          pillLabel: 'Բիզնես ավտոմատացում',
          title: 'Բիզնես ավտոմատացում',
          shortDesc:
            'CRM և ERP համակարգեր, որոնք մեկ միասնական միջավայրում կապում են վաճառքը, պահեստը և հաշվառումը։',
          price: 'Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։',
          timeline: 'Անհատական լուծում',
          highlights: ['CRM', 'ERP', 'API Integration'],
        },
        {
          pillLabel: 'Էլեկտրոնային առևտուր',
          title: 'Էլեկտրոնային առևտուր',
          shortDesc:
            'Առցանց առևտրի հարթակներ՝ վճարային համակարգերի, պահեստի սինքրոնիզացիայի և 3D ապրանքների դիտման հնարավորությամբ։',
          price: 'Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։',
          timeline: 'Անհատական լուծում',
          highlights: [
            'Idram · Telcell · ArCa',
            'Պահեստի ավտոմատ հաշվառում',
            'Telegram ծանուցումներ',
          ],
        },
        {
          pillLabel: 'Դիզայն և բրենդինգ',
          title: 'Դիզայն և բրենդինգ',
          shortDesc:
            'Բրենդային ինքնություն և թվային ինտերֆեյսներ, որոնք համատեղում են էսթետիկան, հարմարավետությունն ու ֆունկցիոնալությունը։',
          price: 'Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։',
          timeline: 'Անհատական լուծում',
          highlights: ['UI/UX', 'Brand Identity', 'Design Systems'],
        },
        {
          pillLabel: 'AI և խելացի համակարգեր',
          title: 'AI և խելացի համակարգեր',
          shortDesc:
            'AI օգնականներ, բոտեր և խելացի համակարգեր, որոնք ավտոմատացնում են կրկնվող գործողությունները և բարելավում հաճախորդների սպասարկումը։',
          price: 'Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։',
          timeline: 'Անհատական լուծում',
          highlights: ['AI', 'Chatbots', 'Intelligent Automation'],
        },
      ],
      slide0: {
        cardTitle: '3D ՊՐԵՄԻՈՒՄ ԿԱՅՔ',
        cardSubtitle: 'Իրական 3D մոդելներ · Սահուն սքրոլ · Ադապտիվ',
        floatingTitle: 'Ձեր բրենդի 3D ինտերֆեյսը',
        loadUnit: '0.6վ',
        loadLabel: 'Բեռնում',
        leadsLabel: 'Հայտեր',
      },
      slide1: {
        stats: [
          { label: 'ՇՐՋԱՆԱՌՈՒԹՅՈՒՆ', val: '18.4M ֏', delta: '+34%' },
          { label: 'ԱԿՏԻՎ ՀԱՅՏԵՐ', val: '1,482', delta: '+42%' },
          { label: 'ԱՎՏՈՄԱՏԱՑՎԱԾ', val: '94.6%', delta: '1C Sync' },
        ],
        recentDeals: 'ՎԵՐՋԻՆ ԳՈՐԾԱՐՔՆԵՐԸ',
        deals: [
          { client: 'Արմեն Գրիգորյան', status: 'Վճարված', amount: '420,000 ֏' },
          { client: 'Նարե Գրուպ ՍՊԸ', status: '1C Հաշիվ', amount: '680,000 ֏' },
          { client: 'Դավիթ Մկրտչյան', status: 'Առաքվում է', amount: '195,000 ֏' },
        ],
        growth7d: 'ԱՃԸ (7 ՕՐ)',
        pipeline: ['Կայքի Հայտ', 'CRM Բազա', '1C Հաշիվ', 'Telegram'],
        syncAccounting: '1C / Հաշվապահ.',
      },
      slide2: {
        cats: ['Աուդիո · 3D', 'Սմարթ ժամացույց', 'Աքսեսուարներ'],
        buy: 'Գնել',
        warehouseLive: '1C Պահեստ՝ Live Մնացորդ',
        deliveryCheckout: 'Առաքում · 1-Click Checkout',
        modules: ['3D Ապրանքներ', 'Idram / ArCa', 'Պահեստ 1C', 'Առաքման API'],
      },
      slide3: {
        customDesignSystem: 'Անհատական Դիզայն Համակարգ',
      },
      slide4: {
        aiSales: 'AI ՎԱՃԱՌՔ',
        responseSpeed: 'Արձագանք՝ 0.4 վայրկյանում · 24/7',
        activeBot: 'Ակտիվ Բոտ',
        greeting: 'Ինչո՞վ կարող եմ օգնել ձեր բիզնեսին այսօր։',
        userPrompt: 'Ուզում եմ ավտոմատացնել Instagram-ի և կայքի պատվերները',
        preparingOffer: 'AI Օգնականը պատրաստում է առաջարկը...',
        readyInDays: 'Պատրաստ է 5–8 օրում․',
        bullets: [
          '• Հայերեն 24/7 AI պատասխաններ',
          '• Ավտոմատ գրանցում CRM-ում',
          '• Idram վճարման հղում',
        ],
        newOrder: 'ՆՈՐ ՊԱՏՎԵՐ #482',
        registeredInCrm: 'CRM-ում գրանցված է',
        paidViaIdram: 'Վճարված է Idram-ով · Telegram ծանուցումը ուղարկված է',
        auto100: '100% Ավտոմատ',
      },
    },
    services: {
      title: 'Մեր ծառայությունները',
      tagline:
        'Վերլուծում, նախագծում և թեստավորում ենք յուրաքանչյուր լուծում՝ առաջնորդվելով ոլորտի լավագույն փորձով։',
      footerPrompt: 'ԸՆՏՐԵՔ ՈՒՂՂՈՒԹՅՈՒՆԸ՝ ՄԱՆՐԱՄԱՍՆԵՐԸ ՏԵՍՆԵԼՈՒ ՀԱՄԱՐ',
      ctaButton: 'ՔՆՆԱՐԿԵԼ ՁԵՐ ԽՆԴԻՐԸ',
      items: [
        {
          title: 'Դիզայն և թվային փորձ',
          subtitle: 'ԴԻԶԱՅՆ · UI/UX · 3D ՄԻՋԱՎԱՅՐԵՐ',
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
          title: 'Անհատական ծրագրային համակարգեր',
          subtitle: 'ՀԱՐԹԱԿՆԵՐ · ՀԱՎԵԼՎԱԾՆԵՐ · ԻՆՏԵԳՐԱՑԻԱ',
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
          title: 'Բիզնես գործընթացների ավտոմատացում',
          subtitle: 'ԳՈՐԾԸՆԹԱՑՆԵՐ · ՀԱՇՎԱՌՈՒՄ · ԱՆԱԼԻՏԻԿԱ',
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
          title: 'AI և խելացի համակարգեր',
          subtitle: 'ԱՐՀԵՍՏԱԿԱՆ ԲԱՆԱԿԱՆՈՒԹՅՈՒՆ · ԽԵԼԱՑԻ ՀԱՄԱԿԱՐԳԵՐ',
          capabilities: [
            'Հնարավորությունների գնահատում',
            'AI օգնականներ և բոտեր',
            'LLM ինտեգրացիաներ',
            'RAG համակարգեր',
            'Փորձարկում և համեմատում',
            'Ներդրում գործող գործընթացներում',
          ],
        },
      ],
    },
    cartJourney: {
      eyebrow: 'ՄԻԱՍՆԱԿԱՆ ԹՎԱՅԻՆ ԷԿՈՀԱՄԱԿԱՐԳ',
      titleLine1: 'ՁԵՐ ԲԻԶՆԵՍԸ՝',
      titleLine2: 'ՄԵԿ ԽԵԼԱՑԻ',
      titleLine3: 'ՀԱՄԱԿԱՐԳՈՒՄ',
      description:
        'Կայքը, CRM-ը, վճարային լուծումները, AI բոտերն ու անալիտիկան միավորում ենք մեկ ավտոմատացված համակարգում՝ նախագծված հենց ձեր բիզնեսի տրամաբանությամբ։ Ավելի քիչ ձեռքի աշխատանք, ավելի շատ վերահսկողություն։',
      badge1: 'ԱՆԽԱՓԱՆ ԱՇԽԱՏԱՆՔԻ ՀԱՄԱՐ ՆԱԽԱԳԾՎԱԾ ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ',
      badge2: '80+ ԻՐԱԿԱՆԱՑՎԱԾ ՆԱԽԱԳԻԾ',
      scrollPrompt: 'ԻՋԵՔ ՆԵՐՔԵՎ՝ ՏԵՍՆԵԼՈՒ, ԹԵ ԻՆՉՊԵՍ Է ԿԱՌՈՒՑՎՈՒՄ ՀԱՄԱԿԱՐԳԸ',
      processStages: ['Վերլուծություն', 'Նախագծում', 'Կառուցում', 'Թեստավորում', 'Ինտեգրում'],
    },
    faq: {
      hookTitle: 'ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐ',
      hookSubtitle: 'Կարևոր պատասխաններ՝ նախքան ձեր նախագծի մեկնարկը։',
      titlePrefix: 'ՀԱՃԱԽ ՏՐՎՈՂ',
      titleHighlight: 'ՀԱՐՑԵՐ',
      searchTyping: '5 հաճախ տրվող հարցեր',
      items: [
        {
          num: '01',
          q: 'Ես տեխնիկական մարդ չեմ և ճշգրիտ չգիտեմ, թե ինչ է ինձ պետք։ Կարո՞ղ ենք սկսել։',
          a: 'Այո, հենց այդպես են սկսվում շատ նախագծեր։ Ձեզանից անհրաժեշտ է միայն պատկերացնել, թե ինչ խնդիր եք ուզում լուծել կամ ինչ արդյունքի եք ձգտում։ Տեխնիկական մասը մերն է, և յուրաքանչյուր քայլ բացատրում ենք պարզ լեզվով։ Առանց ձեր համաձայնության ոչինչ չենք անում։',
        },
        {
          num: '02',
          q: 'Ինչպե՞ս կիմանամ, որ ինձ իսկապես այդ լուծումն է պետք, ոչ թե այն, ինչ ձեզ ձեռնտու է վաճառել։',
          a: 'Լուծումը չենք ընտրում նախապես։ Նախ վերլուծում ենք ձեր գործընթացները և համեմատում տարբերակները շուկայի փորձի հետ։ Երբեմն պարզվում է, որ ձեզ պետք է ավելի պարզ բան, քան պատկերացնում էիք, և այդ դեպքում դա էլ ենք ասում։ Ձեր ներդրումն ուղղվում է իրական խնդրի լուծմանը, ոչ թե ավելորդ տեխնոլոգիաների կամ գործառույթների։',
        },
        {
          num: '03',
          q: 'Ինչպե՞ս կիմանամ, թե որքան կարժենա և որքան ժամանակ կպահանջվի, նախքան որևէ բան սկսելը։',
          a: 'Նախնական վերլուծությունից և պահանջների հստակեցումից հետո ստանում եք գրավոր առաջարկ՝ աշխատանքների ծավալով, փուլերով, ժամկետներով և արժեքով։ Մինչև աշխատանքի մեկնարկը բոլոր հիմնական պայմանները համաձայնեցվում են ձեզ հետ։ Գինն ու ժամկետը նախապես «ընդհանուր» չենք ասում, քանի որ յուրաքանչյուր նախագիծ տարբեր է։',
        },
        {
          num: '04',
          q: 'Ի՞նչ է լինում, եթե ընթացքում ինչ-որ բան չհամապատասխանի իմ սպասելիքներին։',
          a: 'Աշխատում ենք փուլերով, և յուրաքանչյուր փուլի արդյունքը ներկայացնում ենք ձեզ՝ նախքան հաջորդին անցնելը։ Այդպես անհամապատասխանությունը նկատվում է վաղ, երբ այն ուղղելը հեշտ է, ոչ թե ավարտին։ Աշխատանքի հիմնական պայմաններն ու փոփոխությունները գրավոր համաձայնեցվում են։',
        },
        {
          num: '05',
          q: 'Համակարգը և տվյալները ո՞ւմն են լինելու, և ի՞նչ է լինում գործարկումից հետո։',
          a: 'Համակարգի և տվյալների օգտագործման, տնօրինման ու փոխանցման պայմանները հստակ սահմանվում են համաձայնագրով՝ նախքան աշխատանքը սկսելը։ Գործարկումից հետո մնում ենք կողքին՝ տեխնիկական սպասարկմամբ, թարմացումներով և հետագա զարգացմամբ, երբ ձեր բիզնեսն աճում է։ Լուծումները նախագծում ենք այնպես, որ նոր գործառույթներ ավելացնելու համար համակարգը զրոյից վերակառուցելու կարիք չլինի։',
        },
      ],
    },
    launch: {
      eyebrow: 'ՍԿՍԵՔ ՁԵՐ ՆԱԽԱԳԻԾԸ MYITSOFT-Ի ՀԵՏ',
      titlePrimary: 'Ինչպես',
      titleMuted: 'սկսել։',
      scrollHint: 'ԱՌԱՋԻՆ ՔԱՅԼԸ՝ ԶՐՈՒՅՑ ՁԵՐ ԽՆԴՐԻ ՄԱՍԻՆ',
      ctaButton: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
      steps: [
        {
          number: 1,
          title: 'Խորհրդատվություն և վերլուծություն',
          description:
            'Ծանոթանում ենք ձեր բիզնեսին, նպատակներին և գործող գործընթացներին։ Բացահայտում ենք հնարավորությունները և ներկայացնում առաջարկվող լուծումը՝ հստակ փուլերով, ժամկետներով և ծավալով։',
        },
        {
          number: 2,
          title: 'Նախագծում և փորձարկում',
          description:
            'Նախագծում ենք համակարգի ճարտարապետությունն ու ինտերֆեյսը։ Յուրաքանչյուր փուլի արդյունքը ներկայացնում ենք ձեզ, ստանում ենք ձեր հաստատումը և փորձարկում ենք լուծումը նախքան գործարկումը։',
        },
        {
          number: 3,
          title: 'Գործարկում և զարգացում',
          description:
            'Գործարկում ենք համակարգը և անհրաժեշտ ինտեգրացիաները։ Գործարկումից հետո ապահովում ենք տեխնիկական աջակցություն և հետագա զարգացում՝ ձեր բիզնեսի պահանջներին համապատասխան, համաձայնեցված պայմաններով։',
        },
      ],
      readyCta: {
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
      },
    },
    footer: {
      ctaButton: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
      navHeading: 'Նավիգացիա',
      servicesHeading: 'Ծառայություններ',
      contactHeading: 'Կապ և գրասենյակ',
      navLinks: {
        home: 'Գլխավոր',
        solutions: 'Լուծումներ',
        services: 'Ծառայություններ',
        team: 'Մեր թիմը',
        faq: 'ՀՏՀ',
        contact: 'Կապ մեզ հետ',
      },
      serviceLinks: [
        'Դիզայն և թվային փորձ',
        'Անհատական ծրագրային համակարգեր',
        'Բիզնես գործընթացների ավտոմատացում',
        'CRM / ERP Համակարգեր',
        'AI և խելացի համակարգեր',
      ],
      address: 'Հայաստան, Երևան, Մովսես Խորենացի փող. 15',
      addressShort: 'Մովսես Խորենացի փող. 15',
      workingHours: 'Երկ – Շաբ · 10:00 – 19:00',
      mapTitle: 'MyITSoft գրասենյակի քարտեզ',
      copyrightSuffix: '© 2026 · Բիզնեսի զարգացում և տեխնոլոգիական լուծումներ',
    },
    contactPage: {
      title: 'Կապ մեզ հետ',
      subtitle:
        'MyITSoft-ը պատրաստ է առաջարկել ձեր բիզնեսի խնդիրներին համապատասխան լավագույն թվային լուծումը։',
      infoEyebrow: 'ԿԱՊԻ ՏՎՅԱԼՆԵՐ',
      infoTitle: 'Կապվեք մեզ հետ',
      infoDesc:
        'Ունե՞ք գաղափար կամ նախագիծ։ Գրեք կամ զանգահարեք մեզ՝ սիրով կքննարկենք ձեր բիզնեսի թվային խնդիրները։',
      headOffice: 'Գլխավոր գրասենյակ',
      emailLabel: 'Էլ․ փոստ',
      callUs: 'Զանգահարեք մեզ',
      followUs: 'Հետևեք մեզ սոցցանցերում',
      formEyebrow: 'ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆ',
      formTitle: 'Ուղարկել հաղորդագրություն',
      sentTitle: 'Հաղորդագրությունն ուղարկված է',
      sentDesc: 'Շնորհակալություն դիմելու համար։ Մեր մասնագետը շուտով կապ կհաստատի ձեզ հետ։',
      sendAnother: 'Ուղարկել նոր հաղորդագրություն',
      nameLabel: 'Անուն *',
      namePlaceholder: 'Ձեր անունը',
      companyLabel: 'Ընկերություն',
      companyPlaceholder: 'Ընկերության անվանումը',
      phoneLabel: 'Հեռախոս *',
      emailFieldLabel: 'Էլ․ փոստ *',
      subjectLabel: 'Թեմա',
      subjectPlaceholder: 'Օր․՝ Վեբ կայք, CRM ավտոմատացում, AI բոտ',
      messageLabel: 'Հաղորդագրություն *',
      messagePlaceholder: 'Պատմեք ձեր նախագծի կամ խնդրի մասին...',
      submitButton: 'Ուղարկել',
      openInMaps: 'Բացել Google Maps-ում',
    },
    modal3D: {
      closeAria: 'Փակել պատուհանը',
      viewerTitle: '3D ՃԱՐՏԱՐԱՊԵՏՈՒԹՅԱՆ ԴԻՏԱՐԿԻՉ',
      rotateZoom: 'ՊՏՏԵԼ · ՄՈՏԵՑՆԵԼ',
      layers: 'ՇԵՐՏԵՐ',
      xray: 'ՌԵՆՏԳԵՆ',
      discountPrefix: 'ԶԵՂՉ',
      verifiedReviewsSuffix: 'ՀԱՍՏԱՏՎԱԾ ԿԱՐԾԻՔ',
      includedModules: 'ՆԵՐԱՌՎԱԾ ՄՈԴՈՒԼՆԵՐ ԵՎ ՏԵԽՆՈԼՈԳԻԱՆԵՐ',
      timelineLabel: 'ԺԱՄԿԵՏ',
      efficiencyLabel: 'ԱՐԴՅՈՒՆԱՎԵՏՈՒԹՅՈՒՆ',
      added: 'ԱՎԵԼԱՑՎԱԾ Է',
      addPrefix: 'ԱՎԵԼԱՑՆԵԼ',
      wishlistAria: 'Ավելացնել նախընտրածներում',
    },
    cartDrawer: {
      title: 'ՁԵՐ ԶԱՄԲՅՈՒՂԸ',
      closeAria: 'Փակել զամբյուղը',
      confirmedTitle: 'ՀԱՅՏԸ ՀԱՍՏԱՏՎԱԾ Է',
      confirmedDesc:
        'Շնորհակալություն «MyITSoft»-ին դիմելու համար։ Մեր ինժեներական թիմը կապ կհաստատի ձեզ հետ 15 րոպեի ընթացքում։',
      continueBrowsing: 'ՇԱՐՈՒՆԱԿԵԼ ԴԻՏԵԼ',
      emptyTitle: 'Ձեր փաթեթը դատարկ է',
      emptyDesc: 'Ընտրեք ձեր բիզնեսին անհրաժեշտ կայքը կամ ավտոմատացման լուծումը։',
      viewSolutions: 'ԴԻՏԵԼ ԼՈՒԾՈՒՄՆԵՐԸ',
      freeAuditActive: 'ԱՆՎՃԱՐ ԱՈՒԴԻՏ ԵՎ ՏԵՂԱԴՐՈՒՄՆ ԱԿՏԻՎ Է',
      addForFreeAuditPrefix: 'ԱՎԵԼԱՑՐԵՔ',
      addForFreeAuditSuffix: 'ԱՆՎՃԱՐ ԱՈՒԴԻՏԻ ՀԱՄԱՐ',
      promoPlaceholder: 'Պրոմո կոդ (MYIT10 / MYIT20)',
      applyButton: 'ԿԻՐԱՌԵԼ',
      appliedCodePrefix: 'ԿԻՐԱՌՎԱԾ ԿՈԴ՝',
      removeButton: 'ՀԵՌԱՑՆԵԼ',
      subtotal: 'Ենթագումար',
      discountPrefix: 'Զեղչ',
      deliveryYerevan: 'Առաքում (Երևան)',
      free: 'ԱՆՎՃԱՐ',
      total: 'Ընդամենը',
      confirmOrder: 'ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ',
      removeAria: 'Հեռացնել ապրանքը',
      decreaseAria: 'Նվազեցնել քանակը',
      increaseAria: 'Ավելացնել քանակը',
    },
    categoryLabels: {
      websites: 'Վեբ կայքեր',
      automation: 'Ավտոմատացում',
      bots: 'AI և Բոտեր',
      ecommerce: 'Օնլայն խանութներ',
      cloud: 'Cloud և API',
    },
    products: {
      'interactive-3d-website': {
        name: '3D Ինտերակտիվ Վեբ Կայք',
        subtitle: 'Next.js · Three.js · UI/UX',
        weight: '14–21 օր',
        tag: 'Թոփ Լուծում',
        calories: '99/100 Speed',
        description:
          'Պրեմիում 3D վեբ կայք՝ սահուն սքրոլ անիմացիաներով, ինտերակտիվ WebGL մոդելներով, բջջային ադապտացիայով և SEO օպտիմալացմամբ՝ ձեր բրենդը մրցակիցներից առանձնացնելու համար։',
        ingredients: ['Անհատական UI/UX դիզայն', '3D WebGL սցենարներ', 'Admin կառավարման վահանակ', 'SEO & 99+ արագություն'],
      },
      'crm-business-automation': {
        name: 'Բիզնեսի Ավտոմատացում և CRM',
        subtitle: 'Ավտոպիլոտ · ERP · Անալիտիկա',
        weight: '10–18 օր',
        tag: 'Ամենապահանջվածը',
        calories: '10x Արդյունավետ',
        description:
          'Բիզնես պրոցեսների ամբողջական ավտոմատացում՝ հաճախորդների բազա, ավտոմատ հաշիվ-ապրանքագրեր, պահեստի հաշվառում, աշխատակիցների KPI և իրական ժամանակի ֆինանսական վահանակ։',
        ingredients: ['Անհատական CRM / ERP', 'Ավտոմատ հաշվետվություններ', 'Իրական ժամանակի Dashboard', '1C / Բանկային API կապ'],
      },
      'ecommerce-pro-platform': {
        name: 'Օնլայն Խանութ (E-Commerce Pro)',
        subtitle: 'Idram · ArCa · Առաքման API',
        weight: '12–16 օր',
        tag: 'Պատրաստ Վաճառքի',
        calories: '24/7 Վաճառք',
        description:
          'Արագագործ օնլայն խանութ՝ խելացի ֆիլտրերով, զամբյուղով, Idram / Telcell / ArCa օնլայն վճարումներով, պահեստի ավտոմատ սինքրոնիզացիայով և Telegram ծանուցումներով։',
        ingredients: ['Օնլայն վճարումներ (Idram/ArCa)', 'Պահեստի ավտոմատ հաշվառում', 'Անձնական էջ և պրոմո կոդեր', 'Telegram պատվերների բոտ'],
      },
      'ai-sales-bot': {
        name: 'AI Օգնական և Telegram Բոտ',
        subtitle: 'GPT / Gemini · 24/7 Վաճառք',
        weight: '5–8 օր',
        tag: 'AI Powered',
        calories: '0.4վ Պատասխան',
        description:
          'Խելացի AI բոտ Instagram-ի, Telegram-ի և կայքի համար, որը 24/7 պատասխանում է հաճախորդներին հայերեն, ընդունում պատվերներ, գրանցում CRM-ում և փակում վաճառքներ։',
        ingredients: ['Հայերեն AI խորհրդատու', 'Telegram & Instagram ինտեգրացիա', 'Ավտոմատ գրանցում CRM-ում', 'Օնլայն վճարման հղումներ'],
      },
      'corporate-web-portal': {
        name: 'Կորպորատիվ Կայք և Պորտալ',
        subtitle: 'Բազմալեզու · CMS · Բարձր SEO',
        weight: '8–12 օր',
        tag: 'Բիզնես Ստանդարտ',
        calories: '99.9% Uptime',
        description:
          'Ժամանակակից կորպորատիվ կայք՝ հայերեն, ռուսերեն և անգլերեն տարբերակներով, հեշտ կառավարման վահանակով, հաճախորդների հայտերի համակարգով և բարձր անվտանգությամբ։',
        ingredients: ['3 լեզվի աջակցություն', 'Հեշտ CMS կառավարում', 'Հայտերի ավտոմատ ուղարկում', 'Google Analytics & SEO'],
      },
    },
  },

  ru: {
    meta: {
      contactTitle: 'Связаться с нами — MyITSoft',
      contactDescription:
        'Свяжитесь с MyITSoft для разработки веб-сайтов, мобильных приложений, автоматизации бизнеса и AI-решений. Ереван, ул. Мовсеса Хоренаци, 15.',
    },
    preloader: {
      subtitle: '3D ВЕБ-САЙТЫ · CRM/ERP · AI-БОТЫ · АВТОМАТИЗАЦИЯ БИЗНЕСА',
      ariaLabel: 'Загрузочный экран MyITSoft',
    },
    navbar: {
      mainNavAria: 'Главная навигация',
      backToTopAria: 'Вернуться наверх',
      homeAria: 'Главная страница',
      contact: 'Контакты',
      call: 'Позвонить',
      callAriaPrefix: 'Позвонить:',
      phoneCopiedAria: 'Номер телефона скопирован',
      copyPhoneAria: 'Скопировать номер телефона',
      copiedBadge: 'Скопировано!',
      copyTitlePrefix: 'Нажмите, чтобы скопировать:',
      mobileNavAria: 'Мобильная навигация',
      mobileTabs: {
        home: 'Главная',
        services: 'Решения',
        team: 'Команда',
        contact: 'Контакты',
      },
    },
    hero: {
      pill: 'MYITSOFT · ВЕБ-ПЛАТФОРМЫ И АВТОМАТИЗАЦИЯ БИЗНЕСА',
      titleLine1: 'ВХОД В ЦИФРОВОЕ',
      titleLine2: 'БУДУЩЕЕ БИЗНЕСА',
      subtitle:
        'То, чего ещё нет, мы создаём. Цифровые системы, AI и автоматизация под каждую задачу вашего бизнеса.',
      ctaPrimary: 'НАЧАТЬ ДИАЛОГ',
      ctaSecondary: 'КОНСУЛЬТАЦИЯ',
      bottomStrip: 'ВЕБ-САЙТЫ · CRM/ERP АВТОМАТИЗАЦИЯ · AI-БОТЫ',
      whyTitlePrefix: 'ПОЧЕМУ',
      whySubtitle: 'TECHNOLOGY · STRATEGY · INNOVATION',
      whyTagline: 'Технологии — это инструмент. Основа нашей работы — глубокое понимание задачи.',
      features: [
        {
          code: '01 // ПОДХОД',
          title: 'Ваша задача становится нашей задачей',
          description:
            'Каждый бизнес уникален, поэтому мы не ограничиваемся шаблонными решениями. Анализируем, проектируем, тестируем и сверяем с лучшими практиками рынка, относясь к каждому проекту как к собственному.',
        },
        {
          code: '02 // ТЕХНОЛОГИИ',
          title: 'Решение под конкретную задачу',
          description:
            'Веб-платформа, мобильное приложение, автоматизация, бот или AI-система — формат определяется задачей. Создаём масштабируемые системы с интеграцией в ваши текущие процессы: CRM, ERP, бухгалтерию и банковские сервисы.',
        },
        {
          code: '03 // БЕЗОПАСНОСТЬ',
          title: 'Безопасность в основе архитектуры',
          description:
            'Надёжные системы с защищённой архитектурой, резервным копированием данных и непрерывной технической поддержкой.',
        },
        {
          code: '04 // ПРОЦЕСС',
          title: 'Чёткий процесс, прозрачный ход работы',
          description:
            'Работаем по понятным этапам, с прозрачной коммуникацией и контролируемыми сроками. На каждом этапе обеспечиваем прямую связь со специалистами проекта.',
        },
      ],
    },
    carousel: {
      eyebrow: 'СОВРЕМЕННЫЕ РЕШЕНИЯ',
      titlePrefix: 'Какое направление вы хотите оцифровать или',
      titleHighlight: 'автоматизировать в вашем бизнесе?',
      subtitle: 'Выберите направление: формат и объём работ определятся после предварительного анализа.',
      view3D: '3D ОБЗОР',
      discussProject: 'ОБСУДИТЬ ПРОЕКТ',
      added: 'Добавлено',
      steps: [
        {
          pillLabel: 'Цифровые платформы',
          title: 'Цифровые платформы',
          shortDesc:
            'Веб-платформы, мобильные приложения и интерактивные 3D-решения, спроектированные под цели вашего бизнеса.',
          price: 'Формат и объём определяются после предварительного обсуждения.',
          timeline: 'Индивидуальное решение',
          highlights: ['Web', 'Mobile', '3D / WebGL'],
        },
        {
          pillLabel: 'Автоматизация бизнеса',
          title: 'Автоматизация бизнеса',
          shortDesc:
            'CRM и ERP-системы, объединяющие продажи, склад и учёт в единой рабочей среде.',
          price: 'Формат и объём определяются после предварительного обсуждения.',
          timeline: 'Индивидуальное решение',
          highlights: ['CRM', 'ERP', 'API Integration'],
        },
        {
          pillLabel: 'Электронная коммерция',
          title: 'Электронная коммерция',
          shortDesc:
            'Платформы онлайн-торговли с платёжными системами, синхронизацией склада и 3D-просмотром товаров.',
          price: 'Формат и объём определяются после предварительного обсуждения.',
          timeline: 'Индивидуальное решение',
          highlights: [
            'Idram · Telcell · ArCa',
            'Автоматический складской учёт',
            'Telegram-уведомления',
          ],
        },
        {
          pillLabel: 'Дизайн и брендинг',
          title: 'Дизайн и брендинг',
          shortDesc:
            'Фирменная айдентика и цифровые интерфейсы, сочетающие эстетику, удобство и функциональность.',
          price: 'Формат и объём определяются после предварительного обсуждения.',
          timeline: 'Индивидуальное решение',
          highlights: ['UI/UX', 'Brand Identity', 'Design Systems'],
        },
        {
          pillLabel: 'AI и умные системы',
          title: 'AI и умные системы',
          shortDesc:
            'AI-ассистенты, боты и интеллектуальные системы, автоматизирующие рутинные операции и улучшающие клиентский сервис.',
          price: 'Формат и объём определяются после предварительного обсуждения.',
          timeline: 'Индивидуальное решение',
          highlights: ['AI', 'Chatbots', 'Intelligent Automation'],
        },
      ],
      slide0: {
        cardTitle: '3D ПРЕМИУМ-САЙТ',
        cardSubtitle: 'Реальные 3D-модели · Плавный скролл · Адаптивность',
        floatingTitle: '3D-интерфейс вашего бренда',
        loadUnit: '0.6с',
        loadLabel: 'Загрузка',
        leadsLabel: 'Заявки',
      },
      slide1: {
        stats: [
          { label: 'ОБОРОТ', val: '18.4M ֏', delta: '+34%' },
          { label: 'АКТИВНЫЕ ЗАЯВКИ', val: '1,482', delta: '+42%' },
          { label: 'АВТОМАТИЗИРОВАНО', val: '94.6%', delta: '1C Sync' },
        ],
        recentDeals: 'ПОСЛЕДНИЕ СДЕЛКИ',
        deals: [
          { client: 'Армен Григорян', status: 'Оплачено', amount: '420,000 ֏' },
          { client: 'Нарэ Групп ООО', status: 'Счёт 1C', amount: '680,000 ֏' },
          { client: 'Давид Мкртчян', status: 'В доставке', amount: '195,000 ֏' },
        ],
        growth7d: 'РОСТ (7 ДНЕЙ)',
        pipeline: ['Заявка с сайта', 'База CRM', 'Счёт 1C', 'Telegram'],
        syncAccounting: '1C / Бухгалтерия',
      },
      slide2: {
        cats: ['Аудио · 3D', 'Смарт-часы', 'Аксессуары'],
        buy: 'Купить',
        warehouseLive: 'Склад 1C: Live-остаток',
        deliveryCheckout: 'Доставка · 1-Click Checkout',
        modules: ['3D-товары', 'Idram / ArCa', 'Склад 1C', 'API доставки'],
      },
      slide3: {
        customDesignSystem: 'Индивидуальная дизайн-система',
      },
      slide4: {
        aiSales: 'AI ПРОДАЖИ',
        responseSpeed: 'Ответ за 0.4 секунды · 24/7',
        activeBot: 'Активный бот',
        greeting: 'Чем я могу помочь вашему бизнесу сегодня?',
        userPrompt: 'Хочу автоматизировать заказы из Instagram и с сайта',
        preparingOffer: 'AI-ассистент формирует предложение...',
        readyInDays: 'Готово за 5–8 дней:',
        bullets: [
          '• 24/7 AI-ответы на 3 языках',
          '• Автоматическая запись в CRM',
          '• Платёжная ссылка Idram',
        ],
        newOrder: 'НОВЫЙ ЗАКАЗ #482',
        registeredInCrm: 'Зарегистрирован в CRM',
        paidViaIdram: 'Оплачено через Idram · Уведомление в Telegram отправлено',
        auto100: '100% Автомат',
      },
    },
    services: {
      title: 'Наши услуги',
      tagline:
        'Анализируем, проектируем и тестируем каждое решение, опираясь на передовой опыт и современные технологии.',
      footerPrompt: 'ВЫБЕРИТЕ НАПРАВЛЕНИЕ, ЧТОБЫ УВИДЕТЬ ПОДРОБНОСТИ',
      ctaButton: 'ОБСУДИТЬ ВАШУ ЗАДАЧУ',
      items: [
        {
          title: 'Дизайн и цифровой опыт',
          subtitle: 'ДИЗАЙН · UI/UX · 3D-СРЕДЫ',
          capabilities: [
            'Бизнес-анализ',
            'Проектирование пути пользователя',
            'Индивидуальный дизайн',
            '3D WebGL-среды',
            'Прототипирование',
            'Тестирование на реальных сценариях',
            'Укрепление фирменной идентичности',
          ],
        },
        {
          title: 'Индивидуальные программные системы',
          subtitle: 'ПЛАТФОРМЫ · ПРИЛОЖЕНИЯ · ИНТЕГРАЦИЯ',
          capabilities: [
            'Исследование требований',
            'Проектирование программной архитектуры',
            'Веб и мобильные приложения',
            'SaaS-платформы',
            'Интеграция действующих систем',
            'Проверка качества и безопасности',
            'Техническая поддержка',
          ],
        },
        {
          title: 'Автоматизация бизнес-процессов',
          subtitle: 'ПРОЦЕССЫ · УЧЁТ · АНАЛИТИКА',
          capabilities: [
            'Картирование процессов',
            'Выявление узких мест',
            'CRM / ERP-системы',
            'Системы учёта и контроля',
            'Аналитика данных',
            'Интеграция рабочих инструментов',
          ],
        },
        {
          title: 'AI и интеллектуальные системы',
          subtitle: 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ · УМНЫЕ СИСТЕМЫ',
          capabilities: [
            'Оценка возможностей',
            'AI-ассистенты и боты',
            'LLM-интеграции',
            'RAG-системы',
            'Тестирование и сравнение',
            'Внедрение в рабочие процессы',
          ],
        },
      ],
    },
    cartJourney: {
      eyebrow: 'ЕДИНАЯ ЦИФРОВАЯ ЭКОСИСТЕМА',
      titleLine1: 'ВАШ БИЗНЕС —',
      titleLine2: 'В ОДНОЙ УМНОЙ',
      titleLine3: 'СИСТЕМЕ',
      description:
        'Объединяем сайт, CRM, платёжные решения, AI-ботов и аналитику в единую автоматизированную систему, спроектированную по логике вашего бизнеса. Меньше ручной работы, больше контроля.',
      badge1: 'АРХИТЕКТУРА, СПРОЕКТИРОВАННАЯ ДЛЯ БЕСПЕРЕБОЙНОЙ РАБОТЫ',
      badge2: '80+ РЕАЛИЗОВАННЫХ ПРОЕКТОВ',
      scrollPrompt: 'ПРОКРУТИТЕ ВНИЗ, ЧТОБЫ УВИДЕТЬ, КАК СТРОИТСЯ СИСТЕМА',
      processStages: ['Анализ', 'Проектирование', 'Разработка', 'Тестирование', 'Интеграция'],
    },
    faq: {
      hookTitle: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
      hookSubtitle: 'Важные ответы перед стартом вашего проекта.',
      titlePrefix: 'ЧАСТО ЗАДАВАЕМЫЕ',
      titleHighlight: 'ВОПРОСЫ',
      searchTyping: '5 важных вопросов',
      items: [
        {
          num: '01',
          q: 'Я не технический специалист и точно не знаю, что именно мне нужно. Можем ли мы начать?',
          a: 'Да, именно так начинается большинство проектов. От вас требуется лишь понимание того, какую задачу вы хотите решить или к какому результату стремитесь. Техническую часть мы берём на себя и объясняем каждый шаг простым языком. Без вашего согласия мы ничего не делаем.',
        },
        {
          num: '02',
          q: 'Как я узнаю, что мне действительно нужно это решение, а не то, что вам выгодно продать?',
          a: 'Мы не выбираем решение заранее. Сначала анализируем ваши процессы и сравниваем варианты с практикой рынка. Иногда оказывается, что вам нужно более простое решение, чем вы предполагали, — и мы прямо об этом говорим. Ваши инвестиции направляются на решение реальной задачи, а не на лишние технологии или функции.',
        },
        {
          num: '03',
          q: 'Как я узнаю стоимость и сроки до того, как мы что-либо начнём?',
          a: 'После предварительного анализа и уточнения требований вы получаете письменное предложение с объёмом работ, этапами, сроками и стоимостью. До старта работ все ключевые условия согласовываются с вами. Мы не называем «общую» цену и сроки наугад, так как каждый проект индивидуален.',
        },
        {
          num: '04',
          q: 'Что будет, если в процессе работы что-то не совпадёт с моими ожиданиями?',
          a: 'Мы работаем поэтапно и презентуем результат каждого этапа перед переходом к следующему. Благодаря этому любые расхождения замечаются на ранней стадии, когда их легко скорректировать, а не в самом конце. Основные условия работы и изменения фиксируются письменно.',
        },
        {
          num: '05',
          q: 'Кому будут принадлежать система и данные, и что происходит после запуска?',
          a: 'Условия использования, владения и передачи системы и данных чётко фиксируются в договоре до начала работ. После запуска мы остаёмся рядом: обеспечиваем техническую поддержку, обновления и дальнейшее развитие по мере роста вашего бизнеса. Мы проектируем решения так, чтобы для добавления новых функций систему не приходилось перестраивать с нуля.',
        },
      ],
    },
    launch: {
      eyebrow: 'НАЧНИТЕ ВАШ ПРОЕКТ С MYITSOFT',
      titlePrimary: 'Как',
      titleMuted: 'начать.',
      scrollHint: 'ПЕРВЫЙ ШАГ — РАЗГОВОР О ВАШЕЙ ЗАДАЧЕ',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      steps: [
        {
          number: 1,
          title: 'Консультация и анализ',
          description:
            'Знакомимся с вашим бизнесом, целями и текущими процессами. Выявляем точки роста и представляем оптимальное решение с чёткими этапами, сроками и объёмом работ.',
        },
        {
          number: 2,
          title: 'Проектирование и тестирование',
          description:
            'Проектируем архитектуру системы и интерфейс. Показываем результат каждого этапа, получаем ваше подтверждение и тщательно тестируем решение перед запуском.',
        },
        {
          number: 3,
          title: 'Запуск и развитие',
          description:
            'Запускаем систему и необходимые интеграции. После запуска обеспечиваем техническую поддержку и дальнейшее развитие в соответствии с задачами вашего бизнеса на согласованных условиях.',
        },
      ],
      readyCta: {
        eyebrow: 'НАЧНЁМ РАЗГОВОР О ВАШЕЙ ЗАДАЧЕ',
        prefix: 'НАЧНЁМ',
        suffix: 'ДИАЛОГ',
        description:
          'Оставьте ваш email, и наша команда свяжется с вами. Изучим вашу задачу и предложим обоснованное решение с чёткими этапами и сроками.',
        placeholder: 'ВАШ EMAIL',
        submitLabel: 'ОБСУДИТЬ ПРОЕКТ',
        responseHint: 'Ответим в течение 1 рабочего дня.',
        successTitle: 'СПАСИБО · НАША КОМАНДА СВЯЖЕТСЯ С ВАМИ',
        viewPackage: 'СМОТРЕТЬ МОЙ ПАКЕТ',
        switchHint: 'Начать диалог',
      },
    },
    footer: {
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      navHeading: 'Навигация',
      servicesHeading: 'Услуги',
      contactHeading: 'Контакты и офис',
      navLinks: {
        home: 'Главная',
        solutions: 'Решения',
        services: 'Услуги',
        team: 'Команда',
        faq: 'FAQ',
        contact: 'Связаться с нами',
      },
      serviceLinks: [
        'Дизайн и цифровой опыт',
        'Индивидуальные программные системы',
        'Автоматизация бизнес-процессов',
        'CRM / ERP-системы',
        'AI и умные системы',
      ],
      address: 'Армения, Ереван, ул. Мовсеса Хоренаци, 15',
      addressShort: 'ул. Мовсеса Хоренаци, 15',
      workingHours: 'Пн – Сб · 10:00 – 19:00',
      mapTitle: 'Карта офиса MyITSoft',
      copyrightSuffix: '© 2026 · Развитие бизнеса и технологические решения',
    },
    contactPage: {
      title: 'Связаться с нами',
      subtitle:
        'MyITSoft готова предложить оптимальное цифровое решение, точно соответствующее задачам вашего бизнеса.',
      infoEyebrow: 'КОНТАКТНЫЕ ДАННЫЕ',
      infoTitle: 'Свяжитесь с нами',
      infoDesc:
        'Есть идея или проект? Напишите или позвоните нам — мы с удовольствием обсудим цифровые задачи вашего бизнеса.',
      headOffice: 'Головной офис',
      emailLabel: 'Эл. почта',
      callUs: 'Позвоните нам',
      followUs: 'Мы в социальных сетях',
      formEyebrow: 'СООБЩЕНИЕ',
      formTitle: 'Отправить сообщение',
      sentTitle: 'Сообщение отправлено',
      sentDesc: 'Спасибо за обращение. Наш специалист свяжется с вами в ближайшее время.',
      sendAnother: 'Отправить новое сообщение',
      nameLabel: 'Имя *',
      namePlaceholder: 'Ваше имя',
      companyLabel: 'Компания',
      companyPlaceholder: 'Название компании',
      phoneLabel: 'Телефон *',
      emailFieldLabel: 'Эл. почта *',
      subjectLabel: 'Тема',
      subjectPlaceholder: 'Напр.: Веб-сайт, CRM-автоматизация, AI-бот',
      messageLabel: 'Сообщение *',
      messagePlaceholder: 'Расскажите о вашем проекте или задаче...',
      submitButton: 'Отправить',
      openInMaps: 'Открыть в Google Maps',
    },
    modal3D: {
      closeAria: 'Закрыть окно',
      viewerTitle: '3D ИНСПЕКТОР АРХИТЕКТУРЫ',
      rotateZoom: 'ВРАЩЕНИЕ · МАСШТАБ',
      layers: 'СЛОИ',
      xray: 'РЕНТГЕН',
      discountPrefix: 'СКИДКА',
      verifiedReviewsSuffix: 'ПОДТВЕРЖДЁННЫХ ОТЗЫВОВ',
      includedModules: 'ВКЛЮЧЁННЫЕ МОДУЛИ И ТЕХНОЛОГИИ',
      timelineLabel: 'СРОКИ',
      efficiencyLabel: 'ЭФФЕКТИВНОСТЬ',
      added: 'ДОБАВЛЕНО',
      addPrefix: 'ДОБАВИТЬ',
      wishlistAria: 'Добавить в избранное',
    },
    cartDrawer: {
      title: 'ВАША КОРЗИНА',
      closeAria: 'Закрыть корзину',
      confirmedTitle: 'ЗАЯВКА ПОДТВЕРЖДЕНА',
      confirmedDesc:
        'Спасибо за обращение в «MyITSoft». Наша инженерная команда свяжется с вами в течение 15 минут.',
      continueBrowsing: 'ПРОДОЛЖИТЬ ПРОСМОТР',
      emptyTitle: 'Ваш пакет пуст',
      emptyDesc: 'Выберите необходимый вашему бизнесу сайт или решение для автоматизации.',
      viewSolutions: 'СМОТРЕТЬ РЕШЕНИЯ',
      freeAuditActive: 'БЕСПЛАТНЫЙ АУДИТ И ВНЕДРЕНИЕ АКТИВНЫ',
      addForFreeAuditPrefix: 'ДОБАВЬТЕ ЕЩЁ',
      addForFreeAuditSuffix: 'ДЛЯ БЕСПЛАТНОГО АУДИТА',
      promoPlaceholder: 'Промокод (MYIT10 / MYIT20)',
      applyButton: 'ПРИМЕНИТЬ',
      appliedCodePrefix: 'ПРИМЕНЁННЫЙ КОД:',
      removeButton: 'УДАЛИТЬ',
      subtotal: 'Подытог',
      discountPrefix: 'Скидка',
      deliveryYerevan: 'Внедрение (Ереван)',
      free: 'БЕСПЛАТНО',
      total: 'Итого',
      confirmOrder: 'ПОДТВЕРДИТЬ ЗАЯВКУ',
      removeAria: 'Удалить позицию',
      decreaseAria: 'Уменьшить количество',
      increaseAria: 'Увеличить количество',
    },
    categoryLabels: {
      websites: 'Веб-сайты',
      automation: 'Автоматизация',
      bots: 'AI и Боты',
      ecommerce: 'Интернет-магазины',
      cloud: 'Cloud и API',
    },
    products: {
      'interactive-3d-website': {
        name: '3D Интерактивный Веб-Сайт',
        subtitle: 'Next.js · Three.js · UI/UX',
        weight: '14–21 дней',
        tag: 'Топ-решение',
        calories: '99/100 Speed',
        description:
          'Премиальный 3D веб-сайт с плавными скролл-анимациями, интерактивными WebGL-моделями, мобильной адаптацией и SEO-оптимизацией, выделяющий ваш бренд среди конкурентов.',
        ingredients: ['Индивидуальный UI/UX дизайн', '3D WebGL-сцены', 'Панель управления (Admin)', 'SEO и скорость 99+'],
      },
      'crm-business-automation': {
        name: 'Автоматизация Бизнеса и CRM',
        subtitle: 'Автопилот · ERP · Аналитика',
        weight: '10–18 дней',
        tag: 'Самое востребованное',
        calories: '10x Эффективность',
        description:
          'Полная автоматизация бизнес-процессов: клиентская база, автоматические счета, складской учёт, KPI сотрудников и финансовая панель в реальном времени.',
        ingredients: ['Индивидуальная CRM / ERP', 'Автоматические отчёты', 'Live Dashboard в реальном времени', 'Интеграция с 1C и банковским API'],
      },
      'ecommerce-pro-platform': {
        name: 'Интернет-Магазин (E-Commerce Pro)',
        subtitle: 'Idram · ArCa · API Доставки',
        weight: '12–16 дней',
        tag: 'Готов к продажам',
        calories: '24/7 Продажи',
        description:
          'Быстрый интернет-магазин с умными фильтрами, корзиной, онлайн-оплатой Idram / Telcell / ArCa, автосинхронизацией склада и уведомлениями в Telegram.',
        ingredients: ['Онлайн-оплата (Idram/ArCa)', 'Автоматический учёт склада', 'Личный кабинет и промокоды', 'Telegram-бот для заказов'],
      },
      'ai-sales-bot': {
        name: 'AI-Ассистент и Telegram-Бот',
        subtitle: 'GPT / Gemini · Продажи 24/7',
        weight: '5–8 дней',
        tag: 'AI Powered',
        calories: 'Ответ за 0.4с',
        description:
          'Умный AI-бот для Instagram, Telegram и сайта, который 24/7 отвечает клиентам, принимает заказы, фиксирует сделки в CRM и автоматизирует продажи.',
        ingredients: ['Многоязычный AI-консультант', 'Интеграция с Telegram и Instagram', 'Автозапись лидов в CRM', 'Платёжные онлайн-ссылки'],
      },
      'corporate-web-portal': {
        name: 'Корпоративный Сайт и Портал',
        subtitle: 'Мультиязычность · CMS · Высокий SEO',
        weight: '8–12 дней',
        tag: 'Бизнес-стандарт',
        calories: '99.9% Uptime',
        description:
          'Современный корпоративный сайт на армянском, русском и английском языках с удобной панелью управления, системой приёма заявок и высокой безопасностью.',
        ingredients: ['Поддержка 3 языков', 'Удобное управление CMS', 'Автоматическая маршрутизация заявок', 'Google Analytics и SEO'],
      },
    },
  },

  en: {
    meta: {
      contactTitle: 'Contact Us — MyITSoft',
      contactDescription:
        'Get in touch with MyITSoft for custom web platforms, mobile applications, business automation, and AI solutions. 15 Movses Khorenatsi St, Yerevan.',
    },
    preloader: {
      subtitle: '3D WEB PLATFORMS · CRM/ERP · AI BOTS · BUSINESS AUTOMATION',
      ariaLabel: 'MyITSoft loading screen',
    },
    navbar: {
      mainNavAria: 'Main navigation',
      backToTopAria: 'Back to top',
      homeAria: 'Home page',
      contact: 'Contact',
      call: 'Call',
      callAriaPrefix: 'Call:',
      phoneCopiedAria: 'Phone number copied',
      copyPhoneAria: 'Copy phone number',
      copiedBadge: 'Copied!',
      copyTitlePrefix: 'Click to copy:',
      mobileNavAria: 'Mobile navigation',
      mobileTabs: {
        home: 'Home',
        services: 'Solutions',
        team: 'Team',
        contact: 'Contact',
      },
    },
    hero: {
      pill: 'MYITSOFT · WEB PLATFORMS & BUSINESS AUTOMATION',
      titleLine1: 'GATEWAY TO YOUR',
      titleLine2: 'DIGITAL FUTURE',
      subtitle:
        'What does not exist yet, we build. Custom digital systems, AI, and automation engineered for every challenge in your business.',
      ctaPrimary: 'START A CONVERSATION',
      ctaSecondary: 'CONSULTATION',
      bottomStrip: 'WEB PLATFORMS · CRM/ERP AUTOMATION · AI AGENTS',
      whyTitlePrefix: 'WHY',
      whySubtitle: 'TECHNOLOGY · STRATEGY · INNOVATION',
      whyTagline: 'Technology is a means. The foundation of our work is a deep understanding of your challenge.',
      features: [
        {
          code: '01 // APPROACH',
          title: 'Your challenge becomes our challenge',
          description:
            'Every business is unique, so we never settle for off-the-shelf templates. We analyze, architect, test, and benchmark against industry best practices—treating every project as our own.',
        },
        {
          code: '02 // TECHNOLOGY',
          title: 'Solutions shaped by the problem',
          description:
            'Web platform, mobile app, workflow automation, bot, or AI system—the problem defines the format. We build scalable systems that integrate seamlessly into your existing CRM, ERP, accounting, and banking tools.',
        },
        {
          code: '03 // SECURITY',
          title: 'Security built into the core architecture',
          description:
            'Resilient systems engineered with secure architecture, automated data backups, and continuous technical support.',
        },
        {
          code: '04 // PROCESS',
          title: 'Structured process, transparent delivery',
          description:
            'We work in well-defined milestones with transparent communication and predictable timelines—giving you direct access to the engineering team at every stage.',
        },
      ],
    },
    carousel: {
      eyebrow: 'MODERN SOLUTIONS',
      titlePrefix: 'Which area of your business do you want to digitize or',
      titleHighlight: 'automate?',
      subtitle: 'Choose a direction—the exact format and scope will be defined after an initial discovery analysis.',
      view3D: '3D INSPECT',
      discussProject: 'DISCUSS PROJECT',
      added: 'Added',
      steps: [
        {
          pillLabel: 'Digital Platforms',
          title: 'Digital Platforms',
          shortDesc:
            'Web platforms, mobile applications, and interactive 3D experiences tailored to your business goals.',
          price: 'Format and scope are defined after an initial consultation.',
          timeline: 'Tailored solution',
          highlights: ['Web', 'Mobile', '3D / WebGL'],
        },
        {
          pillLabel: 'Business Automation',
          title: 'Business Automation',
          shortDesc:
            'CRM and ERP systems that unify sales, inventory, and accounting in one connected environment.',
          price: 'Format and scope are defined after an initial consultation.',
          timeline: 'Tailored solution',
          highlights: ['CRM', 'ERP', 'API Integration'],
        },
        {
          pillLabel: 'E-Commerce',
          title: 'E-Commerce',
          shortDesc:
            'Online commerce platforms featuring payment gateways, real-time inventory sync, and 3D product inspection.',
          price: 'Format and scope are defined after an initial consultation.',
          timeline: 'Tailored solution',
          highlights: [
            'Idram · Telcell · ArCa',
            'Automated inventory tracking',
            'Telegram notifications',
          ],
        },
        {
          pillLabel: 'Design & Branding',
          title: 'Design & Branding',
          shortDesc:
            'Brand identity and digital interfaces that combine aesthetics, usability, and engineering precision.',
          price: 'Format and scope are defined after an initial consultation.',
          timeline: 'Tailored solution',
          highlights: ['UI/UX', 'Brand Identity', 'Design Systems'],
        },
        {
          pillLabel: 'AI & Smart Systems',
          title: 'AI & Smart Systems',
          shortDesc:
            'AI assistants, bots, and intelligent workflows that automate repetitive tasks and elevate customer support.',
          price: 'Format and scope are defined after an initial consultation.',
          timeline: 'Tailored solution',
          highlights: ['AI', 'Chatbots', 'Intelligent Automation'],
        },
      ],
      slide0: {
        cardTitle: '3D PREMIUM PLATFORM',
        cardSubtitle: 'Real-time 3D models · Smooth scroll · Responsive',
        floatingTitle: 'Your brand’s 3D interface',
        loadUnit: '0.6s',
        loadLabel: 'Load time',
        leadsLabel: 'Leads',
      },
      slide1: {
        stats: [
          { label: 'REVENUE', val: '18.4M ֏', delta: '+34%' },
          { label: 'ACTIVE LEADS', val: '1,482', delta: '+42%' },
          { label: 'AUTOMATED', val: '94.6%', delta: '1C Sync' },
        ],
        recentDeals: 'RECENT TRANSACTIONS',
        deals: [
          { client: 'Armen Grigoryan', status: 'Paid', amount: '420,000 ֏' },
          { client: 'Nare Group LLC', status: '1C Invoice', amount: '680,000 ֏' },
          { client: 'Davit Mkrtchyan', status: 'Shipping', amount: '195,000 ֏' },
        ],
        growth7d: 'GROWTH (7 DAYS)',
        pipeline: ['Web Lead', 'CRM Core', '1C Invoice', 'Telegram'],
        syncAccounting: '1C / Accounting',
      },
      slide2: {
        cats: ['Audio · 3D', 'Smart Watch', 'Accessories'],
        buy: 'Buy',
        warehouseLive: '1C Inventory: Live Stock',
        deliveryCheckout: 'Delivery · 1-Click Checkout',
        modules: ['3D Products', 'Idram / ArCa', '1C Inventory', 'Delivery API'],
      },
      slide3: {
        customDesignSystem: 'Custom Design System',
      },
      slide4: {
        aiSales: 'AI SALES',
        responseSpeed: '0.4s response time · 24/7',
        activeBot: 'Active Agent',
        greeting: 'How can I help your business today?',
        userPrompt: 'I want to automate orders from Instagram and our website',
        preparingOffer: 'AI Assistant is preparing your proposal...',
        readyInDays: 'Deployed in 5–8 days:',
        bullets: [
          '• 24/7 multilingual AI responses',
          '• Automated CRM lead capture',
          '• Instant Idram payment links',
        ],
        newOrder: 'NEW ORDER #482',
        registeredInCrm: 'Logged in CRM',
        paidViaIdram: 'Paid via Idram · Telegram alert dispatched',
        auto100: '100% Automated',
      },
    },
    services: {
      title: 'Our Services',
      tagline:
        'We analyze, architect, and test every solution—guided by industry best practices and modern technology.',
      footerPrompt: 'SELECT A DISCIPLINE TO EXPLORE DETAILS',
      ctaButton: 'DISCUSS YOUR CHALLENGE',
      items: [
        {
          title: 'Design & Digital Experience',
          subtitle: 'DESIGN · UI/UX · 3D ENVIRONMENTS',
          capabilities: [
            'Business analysis',
            'User journey architecture',
            'Bespoke UI/UX design',
            '3D WebGL environments',
            'Interactive prototyping',
            'Real-scenario usability testing',
            'Brand identity reinforcement',
          ],
        },
        {
          title: 'Custom Software Systems',
          subtitle: 'PLATFORMS · APPLICATIONS · INTEGRATION',
          capabilities: [
            'Requirements discovery',
            'Software architecture design',
            'Web & mobile applications',
            'SaaS platforms',
            'Legacy system integration',
            'Quality & security assurance',
            'Ongoing technical support',
          ],
        },
        {
          title: 'Business Process Automation',
          subtitle: 'WORKFLOWS · ACCOUNTING · ANALYTICS',
          capabilities: [
            'Process mapping',
            'Bottleneck identification',
            'CRM / ERP systems',
            'Accounting & control systems',
            'Data analytics & BI',
            'Integration with existing tools',
          ],
        },
        {
          title: 'AI & Intelligent Systems',
          subtitle: 'ARTIFICIAL INTELLIGENCE · SMART SYSTEMS',
          capabilities: [
            'Feasibility assessment',
            'AI assistants & chatbots',
            'LLM integrations',
            'RAG knowledge systems',
            'Testing & benchmarking',
            'Deployment into live workflows',
          ],
        },
      ],
    },
    cartJourney: {
      eyebrow: 'UNIFIED DIGITAL ECOSYSTEM',
      titleLine1: 'YOUR BUSINESS',
      titleLine2: 'IN ONE SMART',
      titleLine3: 'SYSTEM',
      description:
        'We unify your website, CRM, payment gateways, AI bots, and analytics into a single automated platform engineered around your business logic. Less manual work, greater control.',
      badge1: 'ARCHITECTURE ENGINEERED FOR RELIABLE OPERATION',
      badge2: '80+ DELIVERED PROJECTS',
      scrollPrompt: 'SCROLL DOWN TO SEE HOW THE SYSTEM IS BUILT',
      processStages: ['Analysis', 'Architecture', 'Engineering', 'Testing', 'Integration'],
    },
    faq: {
      hookTitle: 'FREQUENTLY ASKED QUESTIONS',
      hookSubtitle: 'Essential answers before launching your project.',
      titlePrefix: 'FREQUENTLY ASKED',
      titleHighlight: 'QUESTIONS',
      searchTyping: '5 essential questions',
      items: [
        {
          num: '01',
          q: 'I am not a technical person and I am not sure what I need. Can we still start?',
          a: 'Yes—that is how many successful projects begin. All we need from you is a clear idea of the problem you want to solve or the outcome you are aiming for. We handle the technical side and explain every step in plain language. Nothing moves forward without your approval.',
        },
        {
          num: '02',
          q: 'How do I know I am getting the solution I truly need, rather than what is most profitable for you to sell?',
          a: 'We never pre-package a solution before understanding your business. First, we analyze your workflows and compare options against proven market practices. Sometimes you need something simpler than you imagined—and when that is the case, we tell you directly. Your investment goes toward solving a real business problem, not unnecessary features.',
        },
        {
          num: '03',
          q: 'How will I know the cost and timeline before we begin?',
          a: 'After initial discovery and requirements definition, you receive a written proposal detailing the scope of work, milestones, timelines, and budget. Every key term is agreed upon before development starts. We do not give generic ballpark quotes upfront because every project is different.',
        },
        {
          num: '04',
          q: 'What happens if something during development does not match my expectations?',
          a: 'We work in structured milestones and review the output of each stage with you before moving to the next. That way, any misalignment is caught early when adjustments are easy—not at the end. Key project terms and scope changes are documented in writing.',
        },
        {
          num: '05',
          q: 'Who owns the system and data, and what happens after launch?',
          a: 'System ownership, data rights, and handover terms are clearly defined in our agreement before work begins. After launch, we stay by your side with technical support, updates, and continuous evolution as your business grows. We architect our systems so new capabilities can be added without rebuilding from scratch.',
        },
      ],
    },
    launch: {
      eyebrow: 'START YOUR PROJECT WITH MYITSOFT',
      titlePrimary: 'How to',
      titleMuted: 'begin.',
      scrollHint: 'THE FIRST STEP — A CONVERSATION ABOUT YOUR CHALLENGE',
      ctaButton: 'DISCUSS PROJECT',
      steps: [
        {
          number: 1,
          title: 'Consultation & Discovery',
          description:
            'We learn about your business, goals, and current workflows. We identify opportunities and present a clear proposal with defined milestones, timelines, and scope.',
        },
        {
          number: 2,
          title: 'Architecture & Testing',
          description:
            'We design the system architecture and interface. We present each milestone for your approval and rigorously test the solution prior to launch.',
        },
        {
          number: 3,
          title: 'Launch & Evolution',
          description:
            'We deploy the system and all required integrations. Post-launch, we provide ongoing technical support and scale the platform as your business grows.',
        },
      ],
      readyCta: {
        eyebrow: 'LET’S START A CONVERSATION ABOUT YOUR CHALLENGE',
        prefix: 'LET’S',
        suffix: 'TALK',
        description:
          'Leave your email address and our team will get in touch. We will review your challenge and propose a well-founded solution with clear milestones and timelines.',
        placeholder: 'YOUR EMAIL ADDRESS',
        submitLabel: 'DISCUSS PROJECT',
        responseHint: 'We will respond within 1 business day.',
        successTitle: 'THANK YOU · OUR TEAM WILL CONTACT YOU SHORTLY',
        viewPackage: 'VIEW MY PACKAGE',
        switchHint: 'Start conversation',
      },
    },
    footer: {
      ctaButton: 'DISCUSS PROJECT',
      navHeading: 'Navigation',
      servicesHeading: 'Services',
      contactHeading: 'Contact & Office',
      navLinks: {
        home: 'Home',
        solutions: 'Solutions',
        services: 'Services',
        team: 'Our Team',
        faq: 'FAQ',
        contact: 'Contact Us',
      },
      serviceLinks: [
        'Design & Digital Experience',
        'Custom Software Systems',
        'Business Process Automation',
        'CRM / ERP Systems',
        'AI & Intelligent Systems',
      ],
      address: '15 Movses Khorenatsi St, Yerevan, Armenia',
      addressShort: '15 Movses Khorenatsi St',
      workingHours: 'Mon – Sat · 10:00 – 19:00',
      mapTitle: 'MyITSoft office map',
      copyrightSuffix: '© 2026 · Business Growth & Technology Solutions',
    },
    contactPage: {
      title: 'Contact Us',
      subtitle:
        'MyITSoft is ready to architect the right digital solution tailored to your business challenges.',
      infoEyebrow: 'CONTACT DETAILS',
      infoTitle: 'Get in touch',
      infoDesc:
        'Have an idea or a project in mind? Write to us or give us a call—we would be glad to discuss your digital challenges.',
      headOffice: 'Head Office',
      emailLabel: 'Email',
      callUs: 'Call Us',
      followUs: 'Follow us on social media',
      formEyebrow: 'MESSAGE',
      formTitle: 'Send a Message',
      sentTitle: 'Message Sent',
      sentDesc: 'Thank you for reaching out. A member of our team will contact you shortly.',
      sendAnother: 'Send another message',
      nameLabel: 'Name *',
      namePlaceholder: 'Your name',
      companyLabel: 'Company',
      companyPlaceholder: 'Company name',
      phoneLabel: 'Phone *',
      emailFieldLabel: 'Email *',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., Web Platform, CRM Automation, AI Agent',
      messageLabel: 'Message *',
      messagePlaceholder: 'Tell us about your project or business challenge...',
      submitButton: 'Send Message',
      openInMaps: 'Open in Google Maps',
    },
    modal3D: {
      closeAria: 'Close modal',
      viewerTitle: '3D ARCHITECTURE INSPECTOR',
      rotateZoom: 'ROTATE · ZOOM',
      layers: 'LAYERS',
      xray: 'X-RAY',
      discountPrefix: 'SAVE',
      verifiedReviewsSuffix: 'VERIFIED REVIEWS',
      includedModules: 'INCLUDED MODULES & TECHNOLOGIES',
      timelineLabel: 'TIMELINE',
      efficiencyLabel: 'PERFORMANCE',
      added: 'ADDED',
      addPrefix: 'ADD TO PACKAGE',
      wishlistAria: 'Add to favorites',
    },
    cartDrawer: {
      title: 'YOUR PACKAGE',
      closeAria: 'Close drawer',
      confirmedTitle: 'REQUEST CONFIRMED',
      confirmedDesc:
        'Thank you for choosing MyITSoft. Our engineering team will reach out to you within 15 minutes.',
      continueBrowsing: 'CONTINUE BROWSING',
      emptyTitle: 'Your package is empty',
      emptyDesc: 'Select a web platform or automation module tailored to your business.',
      viewSolutions: 'EXPLORE SOLUTIONS',
      freeAuditActive: 'FREE TECHNICAL AUDIT & DEPLOYMENT UNLOCKED',
      addForFreeAuditPrefix: 'ADD',
      addForFreeAuditSuffix: 'FOR A FREE TECHNICAL AUDIT',
      promoPlaceholder: 'Promo code (MYIT10 / MYIT20)',
      applyButton: 'APPLY',
      appliedCodePrefix: 'APPLIED CODE:',
      removeButton: 'REMOVE',
      subtotal: 'Subtotal',
      discountPrefix: 'Discount',
      deliveryYerevan: 'Deployment (Yerevan)',
      free: 'FREE',
      total: 'Total',
      confirmOrder: 'CONFIRM REQUEST',
      removeAria: 'Remove item',
      decreaseAria: 'Decrease quantity',
      increaseAria: 'Increase quantity',
    },
    categoryLabels: {
      websites: 'Web Platforms',
      automation: 'Automation',
      bots: 'AI & Bots',
      ecommerce: 'E-Commerce',
      cloud: 'Cloud & API',
    },
    products: {
      'interactive-3d-website': {
        name: '3D Interactive Web Platform',
        subtitle: 'Next.js · Three.js · UI/UX',
        weight: '14–21 days',
        tag: 'Flagship Solution',
        calories: '99/100 Speed',
        description:
          'Premium 3D web platform with smooth scroll choreography, interactive WebGL models, mobile responsiveness, and technical SEO to set your brand apart.',
        ingredients: ['Custom UI/UX Design', '3D WebGL Scenes', 'Admin Management Console', 'SEO & 99+ PageSpeed'],
      },
      'crm-business-automation': {
        name: 'Business Automation & CRM',
        subtitle: 'Autopilot · ERP · Analytics',
        weight: '10–18 days',
        tag: 'Most Popular',
        calories: '10x Efficiency',
        description:
          'End-to-end business process automation: client database, automated invoicing, inventory control, team KPIs, and a real-time financial dashboard.',
        ingredients: ['Custom CRM / ERP', 'Automated Reporting', 'Real-Time KPI Dashboard', '1C & Banking API Sync'],
      },
      'ecommerce-pro-platform': {
        name: 'E-Commerce Pro Platform',
        subtitle: 'Idram · ArCa · Delivery API',
        weight: '12–16 days',
        tag: 'Commerce Ready',
        calories: '24/7 Sales',
        description:
          'High-speed online store featuring smart filtering, cart flow, Idram / Telcell / ArCa payments, automated warehouse sync, and instant Telegram order alerts.',
        ingredients: ['Online Payments (Idram/ArCa)', 'Automated Inventory Sync', 'Customer Portal & Promo Codes', 'Telegram Order Bot'],
      },
      'ai-sales-bot': {
        name: 'AI Assistant & Telegram Bot',
        subtitle: 'GPT / Gemini · 24/7 Sales',
        weight: '5–8 days',
        tag: 'AI Powered',
        calories: '0.4s Response',
        description:
          'Intelligent AI agent for Instagram, Telegram, and your website that answers customers 24/7, captures orders, logs leads in your CRM, and closes sales.',
        ingredients: ['Multilingual AI Advisor', 'Telegram & Instagram Integration', 'Automated CRM Lead Logging', 'Instant Online Payment Links'],
      },
      'corporate-web-portal': {
        name: 'Corporate Web Portal',
        subtitle: 'Multilingual · CMS · Technical SEO',
        weight: '8–12 days',
        tag: 'Enterprise Standard',
        calories: '99.9% Uptime',
        description:
          'Modern corporate web portal in Armenian, Russian, and English with an intuitive CMS, automated lead routing, and enterprise-grade security.',
        ingredients: ['3-Language Support (HY/RU/EN)', 'Intuitive CMS Console', 'Automated Lead Routing', 'Google Analytics & SEO'],
      },
    },
  },
}
