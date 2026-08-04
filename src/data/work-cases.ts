import type { Locale } from "@/i18n/config";

export type WorkCaseContentDrop = {
  title: string;
  type: string;
  posterSrc: string;
  previewSrc?: string;
  lightboxSrc?: string;
  alt: string;
  description?: string;
};

export type WorkCaseLocaleContent = {
  title: string;
  label: string;
  description: string;
  overview: string;
  alt: string;
  role: string[];
  platforms: string[];
  formats: string[];
  scope: string[];
  contentDrops: WorkCaseContentDrop[];
};

export type WorkCase = {
  slug: string;
  posterSrc: string;
  localized: Record<Locale, WorkCaseLocaleContent>;
};

export const workCases: WorkCase[] = [
  {
    slug: "prep-my-meal-leon-haegele",
    posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
    localized: {
      en: {
        title: "Prep My Meal × Leon Hägele",
        label: "Commercial Social Ad",
        description:
          "Commercial edit and production for Prep My Meal with creator Leon Hägele, shaped as a focused social ad for the feed.",
        overview:
          "Simon produced and edited the video used as a paid social ad for Prep My Meal. The collaboration with Leon Hägele focused on a clean food aesthetic and a direct opening for social delivery.",
        alt: "Poster for the Prep My Meal collaboration with Leon Hägele",
        role: ["Video editing", "Production"],
        platforms: ["Instagram", "Paid social"],
        formats: ["Social ad", "Short-form commercial"],
        scope: [
          "Commercial cut for paid social",
          "Visual pacing for the feed",
          "Brand-led food imagery",
        ],
        contentDrops: [
          {
            title: "Prep My Meal Ad",
            type: "Social Ad",
            posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
            previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
            lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
            alt: "Poster frame for the Prep My Meal commercial by HappyReels",
            description:
              "Main ad cut for @prepmymeal with @leon.haegele, prepared for social feeds and paid delivery.",
          },
        ],
      },
      de: {
        title: "Prep My Meal × Leon Hägele",
        label: "Werbevideo Social Ad",
        description:
          "Werbevideo-Produktion und Schnitt für Prep My Meal mit Creator Leon Hägele, umgesetzt als fokussierte Social Ad für den Feed.",
        overview:
          "Simon hat das Video produziert und geschnitten, das als bezahlte Social Ad für Prep My Meal eingesetzt wurde. Die Zusammenarbeit mit Leon Hägele zielte auf eine cleane Food Ästhetik und einen direkten Einstieg für Social.",
        alt: "Posterbild der Prep My Meal Kooperation mit Leon Hägele",
        role: ["Videoschnitt", "Produktion"],
        platforms: ["Instagram", "Paid Social"],
        formats: ["Werbevideo", "Short-form Commercial"],
        scope: [
          "Commercial Schnitt für Paid Social",
          "Visuelles Pacing für den Feed",
          "Markengeführte Food Bildsprache",
        ],
        contentDrops: [
          {
            title: "Prep My Meal Werbespot",
            type: "Social Ad",
            posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
            previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
            lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
            alt: "Posterbild für den Prep My Meal Werbespot von HappyReels",
            description:
              "Haupt-Ad für @prepmymeal mit @leon.haegele, vorbereitet für Feed und Paid Social.",
          },
        ],
      },
    },
  },
];

export function getWorkCaseBySlug(slug: string): WorkCase | undefined {
  return workCases.find((workCase) => workCase.slug === slug);
}

export function getWorkCaseContent(
  workCase: WorkCase,
  locale: Locale,
): WorkCaseLocaleContent {
  return workCase.localized[locale];
}

export function isPlaceholderWorkCase(_workCase?: WorkCase): boolean {
  void _workCase;
  return false;
}

export function getIndexableWorkCases(): WorkCase[] {
  return workCases;
}
