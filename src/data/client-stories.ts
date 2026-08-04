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
        pageTitle: "Content for Leon Hägele, shaped for every feed.",
        cardLabel: "Social ads, cinematic edits & podcast content",
        intro:
          "Recurring social ads and performance edits with a consistent premium look across the feed.",
        collaborationText:
          "For Leon Hägele, recurring reels, social ads, cinematic edits, educational short-form content and podcast trailers are produced, cut and edited for Instagram and other digital touchpoints — with a consistently premium look, clear pacing and flexible adaptation across different formats.",
        formats: ["Social ads", "Cinematic edits", "Short-form content", "Podcast trailers"],
        directionTitle: "One visual language. Many formats.",
        directionText:
          "The collaboration combines social-first pacing with cinematic imagery, considered sound and a consistent editing language. Each video is shaped for its platform while remaining recognisably part of the same body of work.",
        imageAlt: "Leon Hägele holding a camera during a fitness production",
        metaDescription:
          "Inside the collaboration with Leon Hägele — recurring Instagram reels, social ads, cinematic edits, educational content and podcast trailers by HappyReels.",
      },
      de: {
        pageTitle: "Content für Leon Hägele, geschärft für jeden Feed.",
        cardLabel: "Social Ads, Cinematic Edits & Podcast Content",
        intro:
          "Wiederkehrende Social Ads und Performance-Edits mit konsistentem Premium-Look im Feed.",
        collaborationText:
          "Für Leon Hägele entstehen regelmäßig Reels, Social Ads, Cinematic Edits, lehrreiche Kurzformate und Podcast-Trailer. Die Zusammenarbeit umfasst die Produktion, den Schnitt und die Bearbeitung von Content für Instagram und weitere digitale Touchpoints — mit einem konsistent hochwertigen Look, klarer Dramaturgie und flexibler Anpassung an unterschiedliche Formate.",
        formats: ["Social Ads", "Cinematic Edits", "Short-Form Content", "Podcast-Trailer"],
        directionTitle: "Eine Bildsprache. Viele Formate.",
        directionText:
          "Die Zusammenarbeit verbindet Social-First-Pacing mit filmischen Bildern, bewusstem Sound und einer konsistenten Editing-Sprache. Jedes Video wird für seine Plattform entwickelt und bleibt zugleich klar als Teil derselben visuellen Welt erkennbar.",
        imageAlt: "Leon Hägele mit Kamera bei einer Fitness-Produktion",
        metaDescription:
          "Einblick in die Kooperation mit Leon Hägele — wiederkehrende Instagram-Reels, Social Ads, Cinematic Edits, lehrreiche Inhalte und Podcast-Trailer von HappyReels.",
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
        pageTitle: "Calm edits for Ramon Limacher. Clearly recognisable.",
        cardLabel: "Educational & lifestyle reels",
        intro:
          "Recurring social edits shaped for recognition, calm pacing and platform-native rhythm.",
        collaborationText:
          "For Ramon Limacher, recurring social content is produced and edited — educational and lifestyle reels with calm pacing and a recognisable rhythm for Instagram and short-form platforms.",
        formats: ["Educational reels", "Lifestyle reels", "Short-form editing"],
        directionTitle: "Calm pacing. Unmistakable rhythm.",
        directionText:
          "The edits give educational ideas enough space while keeping every sequence concise and native to short-form platforms. A restrained visual treatment connects the recurring releases.",
        imageAlt: "Ramon Limacher speaking to camera",
        metaDescription:
          "Ongoing social video editing for creator Ramon Limacher — recurring visuals and platform-native edits by HappyReels.",
      },
      de: {
        pageTitle: "Ruhige Edits für Ramon Limacher. Klar wiedererkennbar.",
        cardLabel: "Educational & Lifestyle Reels",
        intro:
          "Regelmäßige Social Edits mit Fokus auf Wiedererkennung, ruhigem Pacing und kanalgerechtem Rhythmus.",
        collaborationText:
          "Für Ramon Limacher entsteht fortlaufend Social Content — Educational- und Lifestyle-Reels mit ruhigem Pacing und wiedererkennbarem Rhythmus für Instagram und Short-Form.",
        formats: ["Educational Reels", "Lifestyle Reels", "Short-Form Editing"],
        directionTitle: "Ruhiges Pacing. Klarer Rhythmus.",
        directionText:
          "Die Edits geben lehrreichen Inhalten den nötigen Raum und bleiben zugleich kompakt und plattformgerecht. Eine zurückhaltende visuelle Bearbeitung verbindet die wiederkehrenden Veröffentlichungen.",
        imageAlt: "Ramon Limacher spricht direkt in die Kamera",
        metaDescription:
          "Fortlaufender Social-Video-Schnitt für Creator Ramon Limacher — wiederkehrende Visuals und plattformgerechte Edits von HappyReels.",
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
        pageTitle: "Podcast moments for Mario Scherthan with a premium finish.",
        cardLabel: "Premium podcast & social edits",
        intro:
          "Ongoing social content with clear visual direction and a consistent editing style.",
        collaborationText:
          "For Mario Scherthan, recurring social edits are produced along a defined visual direction — social-first pacing, brand-aware rhythm and a cohesive premium look across ongoing Instagram content.",
        formats: ["Podcast edits", "Social edits", "Premium short-form editing"],
        directionTitle: "A finish that connects every release.",
        directionText:
          "Podcast moments and social-first ideas are translated into concise edits with a shared visual language. Typography, pacing, sound and finishing remain aligned across the continuing release schedule.",
        imageAlt: "Mario Scherthan during a gym production",
        metaDescription:
          "Long-term social content editing for Mario Scherthan — consistent visual direction and premium short-form edits by HappyReels.",
      },
      de: {
        pageTitle: "Podcast-Momente für Mario Scherthan mit Premium-Finish.",
        cardLabel: "Premium Podcast & Social Edits",
        intro:
          "Fortlaufender Social Content mit klarer visueller Richtung und konsistentem Schnittstil.",
        collaborationText:
          "Für Mario Scherthan entstehen wiederkehrende Social Edits entlang einer definierten Bildsprache — social-first Pacing, markenbewusster Rhythmus und ein stimmiger Premium-Look über laufende Instagram-Inhalte.",
        formats: ["Podcast-Edits", "Social-Edits", "Premium Short-Form Editing"],
        directionTitle: "Ein Finish, das jede Veröffentlichung verbindet.",
        directionText:
          "Podcast-Momente und Social-First-Ideen werden in kompakte Edits mit gemeinsamer visueller Sprache übersetzt. Typografie, Pacing, Sound und Finishing bleiben über die laufenden Veröffentlichungen hinweg aufeinander abgestimmt.",
        imageAlt: "Mario Scherthan bei einer Produktion im Gym",
        metaDescription:
          "Langfristiger Social-Content-Schnitt für Mario Scherthan — konsistente visuelle Richtung und Premium-Short-Form-Edits von HappyReels.",
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
