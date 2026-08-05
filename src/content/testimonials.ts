import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  locale: Locale;
  quote: string;
  shortQuote?: string;
  authorName: string;
  authorRole?: string;
  brandName?: string;
  avatarSrc?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  clientStorySlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "de-leon-haegele",
    locale: "de",
    quote:
      "Ich bin sehr froh, mittlerweile alle meine Video-Projekte gemeinsam mit Simon umzusetzen. Die Detailverliebtheit, Zuverlässigkeit und der Qualitätsanspruch übersteigen das, was ich aus meiner Zusammenarbeit mit anderen Freelancern gewohnt war. Ich würde zum aktuellen Stand mit niemand anderem meine Projekte umsetzen.",
    shortQuote:
      "Die Detailverliebtheit, Zuverlässigkeit und der Qualitätsanspruch übersteigen das, was ich von anderen Freelancern gewohnt war.",
    authorName: "Leon Hägele",
    authorRole: "Creator",
    brandName: "Enhanced Coach",
    instagramHandle: "@leon.haegele",
    instagramUrl: "https://www.instagram.com/leon.haegele/",
    avatarSrc: "/assets/clients/leon-haegele-hd.webp",
    clientStorySlug: "leon-haegele",
  },
  {
    id: "en-leon-haegele",
    locale: "en",
    quote:
      "I am glad to work on all my video projects with Simon now. The attention to detail, reliability and quality go beyond what I was used to with other freelancers. At this point, I would not execute my projects with anyone else.",
    shortQuote:
      "The attention to detail, reliability and quality go beyond what I was used to with other freelancers.",
    authorName: "Leon Hägele",
    authorRole: "Creator",
    brandName: "Enhanced Coach",
    instagramHandle: "@leon.haegele",
    instagramUrl: "https://www.instagram.com/leon.haegele/",
    avatarSrc: "/assets/clients/leon-haegele-hd.webp",
    clientStorySlug: "leon-haegele",
  },
];

export function getSectionTestimonials(locale: Locale): Testimonial[] {
  return testimonials.filter((item) => item.locale === locale);
}

export function getTestimonialForClientStory(
  slug: string,
  locale: Locale,
): Testimonial | undefined {
  return testimonials.find(
    (item) => item.locale === locale && item.clientStorySlug === slug,
  );
}
