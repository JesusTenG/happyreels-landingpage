import type { Locale } from "@/i18n/config";
import type { Dictionary, WorkVideoItem } from "@/i18n/dictionaries";

export type ClientStorySocialPlatform = "instagram";

export type ClientStorySocialLink = {
  platform: ClientStorySocialPlatform;
  handle: string;
  url: string;
};

export type ClientStoryLocaleContent = {
  pageTitle: string;
  cardLabel: string;
  intro: string;
  collaborationText: string;
  formats: string[];
  directionTitle: string;
  directionText: string;
  imageAlt: string;
  metaDescription: string;
};

export type ClientStoryBentoRole = "stack" | "feature";

export type ClientStory = {
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  handle: string;
  /** Homepage bento: stack = left column, feature = tall right card */
  bentoRole: ClientStoryBentoRole;
  /** Card image on homepage — poster or portrait */
  cardImageSrc?: string;
  /** Hero portrait on detail page */
  heroImageSrc?: string;
  socialLinks: ClientStorySocialLink[];
  /** Stable keys: work item previewSrc paths */
  workReelPreviewSrcs: string[];
  localized: Record<Locale, ClientStoryLocaleContent>;
};

/** Creator photos: public/assets/videos/collaboration/ */
const collaborationPhoto = (filename: string) =>
  `/assets/videos/collaboration/${filename}` as const;

export function isResolvableSocialUrl(url: string): boolean {
  return url.startsWith("http") && !url.includes("TODO");
}

export function isResolvableImageSrc(src: string | undefined): src is string {
  return !!src && src.startsWith("/") && !src.includes("TODO");
}

export const clientStories: ClientStory[] = [
  {
    slug: "leon-haegele",
    name: "Leon Hägele",
    firstName: "Leon",
    lastName: "Hägele",
    bentoRole: "feature",
    handle: "leon.haegele",
    cardImageSrc: collaborationPhoto("leon1.png"),
    heroImageSrc: collaborationPhoto("leon1.png"),
    socialLinks: [
      {
        platform: "instagram",
        handle: "@leon.haegele",
        url: "https://www.instagram.com/leon.haegele/",
      },
    ],
    workReelPreviewSrcs: [
      "/assets/videos/preview/random/PIZZZZZA-web.mp4",
      "/assets/videos/preview/random/VERSION2-web.mp4",
      "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
      "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
      "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
    ],
    localized: {
      en: {
        pageTitle: "Leon Hägele: social ads & reels",
        cardLabel: "Social ads, cinematic edits & podcast content",
        intro:
          "Social ads, creator reels and podcast trailers.",
        collaborationText:
          "The collaboration with Leon Hägele includes social ads, creator reels and podcast trailers. The portfolio features the Prep My Meal ad alongside fitness and podcast edits.",
        formats: ["Social ads", "Cinematic edits", "Short-form content", "Podcast trailers"],
        directionTitle: "One visual language. Many formats.",
        directionText:
          "The collaboration combines social-first pacing with cinematic imagery, considered sound and a consistent editing language. Each video is shaped for its platform while remaining recognisably part of the same body of work.",
        imageAlt: "Leon Hägele holding a camera during a fitness production",
        metaDescription:
          "Social ads, creator reels and podcast trailers for Leon Hägele. Selected videos and insights into the collaboration with HappyReels.",
      },
      de: {
        pageTitle: "Leon Hägele: Social Ads & Reels",
        cardLabel: "Social Ads, Cinematic Edits & Podcast Content",
        intro:
          "Social Ads, Creator-Reels und Podcast-Trailer.",
        collaborationText:
          "Die Zusammenarbeit mit Leon Hägele umfasst Social Ads, Creator-Reels und Podcast-Trailer. Zu den gezeigten Arbeiten gehören der Prep-My-Meal-Werbespot sowie Fitness- und Podcast-Edits.",
        formats: ["Social Ads", "Cinematic Edits", "Short-Form Content", "Podcast-Trailer"],
        directionTitle: "Eine Bildsprache. Viele Formate.",
        directionText:
          "Die Zusammenarbeit verbindet Social-First-Pacing mit filmischen Bildern, bewusstem Sound und einer konsistenten Editing-Sprache. Jedes Video wird für seine Plattform entwickelt und bleibt zugleich klar als Teil derselben visuellen Welt erkennbar.",
        imageAlt: "Leon Hägele mit Kamera bei einer Fitness-Produktion",
        metaDescription:
          "Social Ads, Creator-Reels und Podcast-Trailer für Leon Hägele. Ausgewählte Videos und Einblicke in die Zusammenarbeit mit HappyReels.",
      },
    },
  },
  {
    slug: "ramon-limacher",
    name: "Ramon Limacher",
    firstName: "Ramon",
    lastName: "Limacher",
    bentoRole: "stack",
    handle: "ramon_limacher",
    cardImageSrc: collaborationPhoto("ramon1.png"),
    heroImageSrc: collaborationPhoto("ramon1.png"),
    socialLinks: [],
    workReelPreviewSrcs: ["/assets/videos/preview/random/mealplans leiser-web.mp4"],
    localized: {
      en: {
        pageTitle: "Ramon Limacher: educational & lifestyle reels",
        cardLabel: "Educational & lifestyle reels",
        intro:
          "Educational and lifestyle content in short video form.",
        collaborationText:
          "The work for Ramon Limacher focuses on educational and lifestyle reels. Clear statements and an edit that gives the explanation room are central to the approach.",
        formats: ["Educational reels", "Lifestyle reels", "Short-form editing"],
        directionTitle: "Calm pacing. Unmistakable rhythm.",
        directionText:
          "The edits give educational ideas enough space while keeping every sequence concise and native to short-form platforms. A restrained visual treatment connects the recurring releases.",
        imageAlt: "Ramon Limacher speaking to camera",
        metaDescription:
          "Educational and lifestyle reels for Ramon Limacher. A video example from the collaboration and an overview of the formats edited by HappyReels.",
      },
      de: {
        pageTitle: "Ramon Limacher: Educational & Lifestyle Reels",
        cardLabel: "Educational & Lifestyle Reels",
        intro:
          "Educational- und Lifestyle-Content im Kurzformat.",
        collaborationText:
          "Für Ramon Limacher bearbeiten wir Educational- und Lifestyle-Reels. Im Mittelpunkt stehen verständliche Aussagen und ein Schnitt, der der Erklärung Raum lässt.",
        formats: ["Educational Reels", "Lifestyle Reels", "Short-Form Editing"],
        directionTitle: "Ruhiges Pacing. Klarer Rhythmus.",
        directionText:
          "Die Edits geben lehrreichen Inhalten den nötigen Raum und bleiben zugleich kompakt und plattformgerecht. Eine zurückhaltende visuelle Bearbeitung verbindet die wiederkehrenden Veröffentlichungen.",
        imageAlt: "Ramon Limacher spricht direkt in die Kamera",
        metaDescription:
          "Educational- und Lifestyle-Reels für Ramon Limacher. Ein Videobeispiel aus der Zusammenarbeit und die Formate im Überblick bei HappyReels.",
      },
    },
  },
  {
    slug: "mario-scherthan",
    name: "Mario Scherthan",
    firstName: "Mario",
    lastName: "Scherthan",
    bentoRole: "stack",
    handle: "marioscherthan",
    cardImageSrc: collaborationPhoto("mario1.png"),
    heroImageSrc: collaborationPhoto("mario1.png"),
    socialLinks: [],
    workReelPreviewSrcs: [
      "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
      "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
      "/assets/videos/preview/diamten/bracen-web.mp4",
      "/assets/videos/preview/diamten/diamanten_2-web.mp4",
      "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
      "/assets/videos/preview/diamten/mario festhalten neu-web.mp4",
      "/assets/videos/preview/diamten/negative final-web.mp4",
    ],
    localized: {
      en: {
        pageTitle: "Mario Scherthan: podcast & social edits",
        cardLabel: "Premium podcast & social edits",
        intro:
          "Podcast trailers and short-form social edits.",
        collaborationText:
          "The work for Mario Scherthan includes podcast trailers and short social edits. The selection shows different excerpts from the collaboration, with a focus on statements, pacing and captions.",
        formats: ["Podcast edits", "Social edits", "Premium short-form editing"],
        directionTitle: "A finish that connects every release.",
        directionText:
          "Podcast moments and social-first ideas are translated into concise edits with a shared visual language. Typography, pacing, sound and finishing remain aligned across the continuing release schedule.",
        imageAlt: "Mario Scherthan during a gym production",
        metaDescription:
          "Podcast trailers and social edits for Mario Scherthan. Selected video examples from the collaboration with HappyReels.",
      },
      de: {
        pageTitle: "Mario Scherthan: Podcast- & Social-Edits",
        cardLabel: "Premium Podcast & Social Edits",
        intro:
          "Podcast-Trailer und kurze Social-Edits.",
        collaborationText:
          "Die Arbeiten für Mario Scherthan umfassen Podcast-Trailer und kurze Social-Edits. Die Auswahl zeigt verschiedene Ausschnitte der Zusammenarbeit mit Fokus auf Aussage, Schnitt und Untertitel.",
        formats: ["Podcast-Edits", "Social-Edits", "Premium Short-Form Editing"],
        directionTitle: "Ein Finish, das jede Veröffentlichung verbindet.",
        directionText:
          "Podcast-Momente und Social-First-Ideen werden in kompakte Edits mit gemeinsamer visueller Sprache übersetzt. Typografie, Pacing, Sound und Finishing bleiben über die laufenden Veröffentlichungen hinweg aufeinander abgestimmt.",
        imageAlt: "Mario Scherthan bei einer Produktion im Gym",
        metaDescription:
          "Podcast-Trailer und Social-Edits für Mario Scherthan. Ausgewählte Videobeispiele aus der Zusammenarbeit mit HappyReels.",
      },
    },
  },
];

export function getClientStoryBySlug(slug: string): ClientStory | undefined {
  return clientStories.find((story) => story.slug === slug);
}

export function getClientStoryContent(
  story: ClientStory,
  locale: Locale,
): ClientStoryLocaleContent {
  return story.localized[locale];
}

export function getClientStoryPageTitle(story: ClientStory, dict: Dictionary): string {
  return dict.clientStoryDetail.pageTitle.replace("{name}", story.name);
}

export function getAllClientStories(): ClientStory[] {
  return clientStories;
}

/** Bento section order: left stack (Leon, Mario), then featured (Ramon). */
export function getClientStoriesForHomeSection(): ClientStory[] {
  const order = ["leon-haegele", "mario-scherthan", "ramon-limacher"] as const;
  return order
    .map((slug) => clientStories.find((story) => story.slug === slug))
    .filter((story): story is ClientStory => story !== undefined);
}

function humanizePreviewFilename(previewSrc: string): string {
  const fileName = previewSrc.split("/").pop() ?? "Video";
  return fileName
    .replace(/-web\.mp4$/i, "")
    .replace(/\.mp4$/i, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function buildWorkVideoItemFromPreviewSrc(
  previewSrc: string,
  locale: Locale,
): WorkVideoItem {
  const match = previewSrc.match(
    /^\/assets\/videos\/preview\/(.+)\/(.+)-web\.mp4$/i,
  );
  const folder = match?.[1] ?? "random";
  const baseName = match?.[2] ?? humanizePreviewFilename(previewSrc);
  const label = humanizePreviewFilename(previewSrc);

  const posterSrc = `/assets/videos/posters/${folder}/${baseName}-poster.webp`;
  const lightboxSrc = `/assets/videos/lightbox/${folder}/${baseName}-lightbox.mp4`;

  if (locale === "de") {
    return {
      id: previewSrc,
      title: label,
      description: "Edit aus dieser Kooperation.",
      posterSrc,
      previewSrc,
      lightboxSrc,
      alt: `Vorschaubild für ${label}`,
      videoAriaLabel: `${label} öffnen`,
    };
  }

  return {
    id: previewSrc,
    title: label,
    description: "Edit from this collaboration.",
    posterSrc,
    previewSrc,
    lightboxSrc,
    alt: `Poster frame for ${label}`,
    videoAriaLabel: `Open ${label}`,
  };
}

export function getWorkItemsForClientStory(
  story: ClientStory,
  dict: Dictionary,
  locale: Locale,
): WorkVideoItem[] {
  if (story.workReelPreviewSrcs.length === 0) return [];

  const allItems = [...dict.work.items, ...dict.work.moreItems];

  return story.workReelPreviewSrcs.map((previewSrc) => {
    const existing = allItems.find((item) => item.previewSrc === previewSrc);
    return existing ?? buildWorkVideoItemFromPreviewSrc(previewSrc, locale);
  });
}
