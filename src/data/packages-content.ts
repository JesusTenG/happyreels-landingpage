import type { Locale } from "@/i18n/config";

export const contentPackages = [
  {
    id: "production",
    name: "Production",
    monthlyPrice: 1500,
    startingAt: true,
    contentDays: 1,
    videos: "4–5",
  },
  {
    id: "content-system",
    name: "Content System",
    monthlyPrice: 3000,
    startingAt: false,
    contentDays: 1,
    videos: "8–10",
  },
  {
    id: "growth-system",
    name: "Growth System",
    monthlyPrice: 5000,
    startingAt: true,
    contentDays: 2,
    videos: "16–20",
  },
] as const;

type PackageId = (typeof contentPackages)[number]["id"];

type PackageCopy = Readonly<{
  description: string;
  features: readonly string[];
}>;

type PackagesContent = Readonly<{
  titleLead: string;
  titleAccent: string;
  ctaTitle: string;
  startingAt: string;
  perMonth: string;
  contentDay: string;
  contentDays: string;
  videos: string;
  cta: string;
  packages: Record<PackageId, PackageCopy>;
}>;

export const packagesContent: Record<Locale, PackagesContent> = {
  de: {
    titleLead: "Content-Pakete",
    titleAccent: "für deine Marke",
    ctaTitle: "Lass uns deinen Content planen",
    startingAt: "ab",
    perMonth: "/ Monat",
    contentDay: "Content Day",
    contentDays: "Content Days",
    videos: "Shortform Videos",
    cta: "Projekt anfragen",
    packages: {
      production: {
        description:
          "Für Unternehmen, die regelmäßig professionellen Shortform-Content produzieren möchten.",
        features: [
          "Content-Konzeption & Basis-Strategie",
          "Hook-Entwicklung",
          "Schnitt & Color Grading",
          "Captions & Sound Design",
        ],
      },
      "content-system": {
        description:
          "Für Unternehmen, die Content nicht nur produzieren, sondern systematisch aufbauen und weiterentwickeln wollen.",
        features: [
          "Content-Strategie",
          "Hook-Entwicklung",
          "Schnitt & Color Grading",
          "Captions & Sound Design",
          "Content Repurposing",
          "Monatliche Analyse",
          "Laufende Optimierung",
        ],
      },
      "growth-system": {
        description:
          "Für Unternehmen, die HappyReels als langfristigen Content-Partner einsetzen und ihre Produktion skalieren möchten.",
        features: [
          "Erweiterte Content-Strategie",
          "Hook-Entwicklung",
          "Schnitt & Color Grading",
          "Captions & Sound Design",
          "Content Repurposing",
          "Monatliche Performance-Analyse",
          "Laufende Optimierung",
          "Strategische Betreuung",
        ],
      },
    },
  },
  en: {
    titleLead: "Content packages",
    titleAccent: "for your brand",
    ctaTitle: "Plan your content with us",
    startingAt: "from",
    perMonth: "/ month",
    contentDay: "Content day",
    contentDays: "Content days",
    videos: "Short-form videos",
    cta: "Enquire about a project",
    packages: {
      production: {
        description:
          "For businesses looking to produce professional short-form content on a regular basis.",
        features: [
          "Content concepts & basic strategy",
          "Hook development",
          "Editing & color grading",
          "Captions & sound design",
        ],
      },
      "content-system": {
        description:
          "For businesses looking to go beyond production and systematically build and improve their content.",
        features: [
          "Content strategy",
          "Hook development",
          "Editing & color grading",
          "Captions & sound design",
          "Content repurposing",
          "Monthly analysis",
          "Ongoing optimization",
        ],
      },
      "growth-system": {
        description:
          "For businesses looking to work with HappyReels as a long-term content partner and scale their production.",
        features: [
          "Extended content strategy",
          "Hook development",
          "Editing & color grading",
          "Captions & sound design",
          "Content repurposing",
          "Monthly performance analysis",
          "Ongoing optimization",
          "Strategic support",
        ],
      },
    },
  },
};
