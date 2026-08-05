import type { Locale } from "@/i18n/config";
import { getClientProjectPath } from "@/lib/route-config";

type LocalizedText = Readonly<Record<Locale, string>>;

type ReelVideoSource = Readonly<{
  id: string;
  posterSrc: string;
  previewSrc: string;
  lightboxSrc: string;
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  videoAriaLabel: LocalizedText;
  clientProjectSlug?: string;
}>;

export type ReelVideo = Readonly<{
  id: string;
  title: string;
  description: string;
  posterSrc: string;
  previewSrc: string;
  lightboxSrc: string;
  alt: string;
  videoAriaLabel: string;
  projectHref?: string;
  detailLabel?: string;
  caseSlug?: string;
}>;

const reelVideoSources: readonly ReelVideoSource[] = [
  {
    id: "prep-my-meal-ad",
    posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
    previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
    title: { de: "Prep My Meal Ad", en: "Prep My Meal Ad" },
    description: {
      de: "Commercial mit Prep My Meal und Leon Hägele.",
      en: "Commercial with Prep My Meal and Leon Hägele.",
    },
    alt: {
      de: "Posterbild aus dem Prep My Meal Commercial",
      en: "Poster frame from the Prep My Meal commercial",
    },
    videoAriaLabel: {
      de: "Prep My Meal Commercial abspielen",
      en: "Play the Prep My Meal commercial",
    },
    clientProjectSlug: "leon-haegele",
  },
  {
    id: "educational-reel",
    posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
    previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
    title: { de: "Educational Reel", en: "Educational Reel" },
    description: {
      de: "Shortform Edit mit Ramon Limacher.",
      en: "Shortform edit with Ramon Limacher.",
    },
    alt: {
      de: "Posterbild aus einem Educational Reel über Ernährung",
      en: "Poster frame from an educational nutrition reel",
    },
    videoAriaLabel: {
      de: "Educational Reel abspielen",
      en: "Play the educational reel",
    },
    clientProjectSlug: "ramon-limacher",
  },
  {
    id: "cinematic-gym-edit",
    posterSrc: "/assets/videos/posters/random/VERSION2-poster.webp",
    previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
    title: { de: "Cinematic Gym Edit", en: "Cinematic Gym Edit" },
    description: {
      de: "Creator Content mit Leon Hägele.",
      en: "Creator content with Leon Hägele.",
    },
    alt: {
      de: "Posterbild aus einem filmischen Gym Edit mit Leon Hägele",
      en: "Poster frame from a cinematic gym edit with Leon Hägele",
    },
    videoAriaLabel: {
      de: "Cinematic Gym Edit abspielen",
      en: "Play the cinematic gym edit",
    },
    clientProjectSlug: "leon-haegele",
  },
  {
    id: "kool-savas-ayo",
    posterSrc: "/assets/videos/posters/savas/AYO X KOOLSAVAS-poster.webp",
    previewSrc: "/assets/videos/preview/savas/AYO X KOOLSAVAS-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/savas/AYO X KOOLSAVAS-lightbox.mp4",
    title: { de: "Kool Savas × Ayo", en: "Kool Savas × Ayo" },
    description: {
      de: "Musik und Creator Reel.",
      en: "Music and creator reel.",
    },
    alt: {
      de: "Posterbild aus dem Reel mit Kool Savas und Ayo",
      en: "Poster frame from the Kool Savas and Ayo reel",
    },
    videoAriaLabel: {
      de: "Reel mit Kool Savas und Ayo abspielen",
      en: "Play the Kool Savas and Ayo reel",
    },
  },
  {
    id: "creator-reel-ayo",
    posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
    previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
    title: { de: "Creator Reel", en: "Creator Reel" },
    description: {
      de: "Dynamischer Edit für den Feed.",
      en: "Fast creator edit for the feed.",
    },
    alt: {
      de: "Posterbild aus einem dynamischen Creator Reel",
      en: "Poster frame from a fast creator reel",
    },
    videoAriaLabel: {
      de: "Creator Reel abspielen",
      en: "Play the creator reel",
    },
  },
  {
    id: "podcast-trailer",
    posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
    previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
    title: { de: "Podcast Trailer", en: "Podcast Trailer" },
    description: {
      de: "Gespräch verdichtet für Social Media.",
      en: "Conversation condensed for social media.",
    },
    alt: {
      de: "Posterbild aus einem Podcast Trailer",
      en: "Poster frame from a podcast trailer",
    },
    videoAriaLabel: {
      de: "Podcast Trailer abspielen",
      en: "Play the podcast trailer",
    },
    clientProjectSlug: "leon-haegele",
  },
  {
    id: "podcast-edit-10-05",
    posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
    previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
    title: { de: "Podcast Edit 10.05", en: "Podcast Edit 10.05" },
    description: { de: "Kurzformat aus der Podcast Produktion.", en: "Short edit from the podcast production." },
    alt: { de: "Posterbild aus dem Podcast Edit 10.05", en: "Poster frame from podcast edit 10.05" },
    videoAriaLabel: { de: "Podcast Edit 10.05 abspielen", en: "Play podcast edit 10.05" },
    clientProjectSlug: "leon-haegele",
  },
  {
    id: "podcast-short",
    posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
    previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
    title: { de: "Podcast Short", en: "Podcast Short" },
    description: { de: "Social Cut aus einer längeren Folge.", en: "Social cut from a longer episode." },
    alt: { de: "Posterbild aus einem Podcast Short", en: "Poster frame from a podcast short" },
    videoAriaLabel: { de: "Podcast Short abspielen", en: "Play the podcast short" },
    clientProjectSlug: "leon-haegele",
  },
  {
    id: "podcast-trailer-f15",
    posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
    previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
    lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
    title: { de: "Podcast Trailer F15", en: "Podcast Trailer F15" },
    description: { de: "Trailer für eine neue Podcast Folge.", en: "Trailer for a new podcast episode." },
    alt: { de: "Posterbild aus dem Podcast Trailer F15", en: "Poster frame from podcast trailer F15" },
    videoAriaLabel: { de: "Podcast Trailer F15 abspielen", en: "Play podcast trailer F15" },
    clientProjectSlug: "mario-scherthan",
  },
] as const;

export function getReelVideos(locale: Locale): ReelVideo[] {
  return reelVideoSources.map((video) => ({
    id: video.id,
    title: video.title[locale],
    description: video.description[locale],
    posterSrc: video.posterSrc,
    previewSrc: video.previewSrc,
    lightboxSrc: video.lightboxSrc,
    alt: video.alt[locale],
    videoAriaLabel: video.videoAriaLabel[locale],
    projectHref: video.clientProjectSlug
      ? getClientProjectPath(locale, video.clientProjectSlug)
      : undefined,
    detailLabel: video.clientProjectSlug
      ? locale === "de"
        ? "Projekt ansehen"
        : "View project"
      : undefined,
    caseSlug: video.id === "prep-my-meal-ad" ? "prep-my-meal-leon-haegele" : undefined,
  }));
}

export function getFeaturedReelVideos(locale: Locale): ReelVideo[] {
  return getReelVideos(locale).slice(0, 5);
}
