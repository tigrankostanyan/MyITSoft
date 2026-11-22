import {
  Bot,
  Globe,
  Palette,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface ServiceStep {
  id: string;
  productId: string;
  index: string;
  pillLabel: string;
  title: string;
  shortDesc: string;
  price: string;
  timeline: string;
  badge: string;
  accent: string;
  auraFrom: string;
  auraTo: string;
  icon: LucideIcon;
  highlights: string[];
}

export const SERVICE_STEPS: ServiceStep[] = [
  {
    id: "web-3d",
    productId: "interactive-3d-website",
    index: "01",
    pillLabel: "Թվային հարթակներ",
    title: "Թվային հարթակներ",
    shortDesc:
      "Վեբ հարթակներ, մոբայլ հավելվածներ և ինտերակտիվ 3D լուծումներ՝ նախագծված ձեր բիզնեսի նպատակների համար։",
    price: "Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։",
    timeline: "Անհատական լուծում",
    badge: "WEB · MOBILE · 3D / WEBGL",
    accent: "#38bdf8",
    auraFrom: "rgba(56, 189, 248, 0.28)",
    auraTo: "rgba(99, 102, 241, 0.18)",
    icon: Globe,
    highlights: ["Web", "Mobile", "3D / WebGL"],
  },
  {
    id: "crm-auto",
    productId: "crm-business-automation",
    index: "02",
    pillLabel: "Բիզնես ավտոմատացում",
    title: "Բիզնես ավտոմատացում",
    shortDesc:
      "CRM և ERP համակարգեր, որոնք մեկ միասնական միջավայրում կապում են վաճառքը, պահեստը և հաշվառումը։",
    price: "Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։",
    timeline: "Անհատական լուծում",
    badge: "CRM · ERP · API INTEGRATION",
    accent: "#38bdf8",
    auraFrom: "rgba(37, 99, 235, 0.28)",
    auraTo: "rgba(56, 189, 248, 0.18)",
    icon: Workflow,
    highlights: ["CRM", "ERP", "API Integration"],
  },
  {
    id: "ecommerce",
    productId: "ecommerce-pro-platform",
    index: "03",
    pillLabel: "Էլեկտրոնային առևտուր",
    title: "Էլեկտրոնային առևտուր",
    shortDesc:
      "Առցանց առևտրի հարթակներ՝ վճարային համակարգերի, պահեստի սինքրոնիզացիայի և 3D ապրանքների դիտման հնարավորությամբ։",
    price: "Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։",
    timeline: "Անհատական լուծում",
    badge: "IDRAM · TELCELL · ARCA",
    accent: "#22d3ee",
    auraFrom: "rgba(34, 211, 238, 0.28)",
    auraTo: "rgba(37, 99, 235, 0.24)",
    icon: ShoppingBag,
    highlights: [
      "Idram · Telcell · ArCa",
      "Պահեստի ավտոմատ հաշվառում",
      "Telegram ծանուցումներ",
    ],
  },
  {
    id: "ui-design",
    productId: "corporate-web-portal",
    index: "04",
    pillLabel: "Դիզայն և բրենդինգ",
    title: "Դիզայն և բրենդինգ",
    shortDesc:
      "Բրենդային ինքնություն և թվային ինտերֆեյսներ, որոնք համատեղում են էսթետիկան, հարմարավետությունն ու ֆունկցիոնալությունը։",
    price: "Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։",
    timeline: "Անհատական լուծում",
    badge: "UI/UX · BRAND IDENTITY",
    accent: "#60a5fa",
    auraFrom: "rgba(56, 189, 248, 0.26)",
    auraTo: "rgba(37, 99, 235, 0.2)",
    icon: Palette,
    highlights: ["UI/UX", "Brand Identity", "Design Systems"],
  },
  {
    id: "ai-bots",
    productId: "ai-sales-bot",
    index: "05",
    pillLabel: "AI և խելացի համակարգեր",
    title: "AI և խելացի համակարգեր",
    shortDesc:
      "AI օգնականներ, բոտեր և խելացի համակարգեր, որոնք ավտոմատացնում են կրկնվող գործողությունները և բարելավում հաճախորդների սպասարկումը։",
    price: "Ձևաչափը և ծավալը որոշվում են նախնական քննարկումից հետո։",
    timeline: "Անհատական լուծում",
    badge: "AI · CHATBOTS · AUTOMATION",
    accent: "#34d399",
    auraFrom: "rgba(52, 211, 153, 0.24)",
    auraTo: "rgba(56, 189, 248, 0.2)",
    icon: Bot,
    highlights: ["AI", "Chatbots", "Intelligent Automation"],
  },
];
