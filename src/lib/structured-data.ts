import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WorkVideoItem } from "@/i18n/dictionaries";
import type { ReelVideo } from "@/data/reel-videos";
import type { WorkCaseLocaleContent } from "@/data/work-cases";
import type { FaqItem } from "@/data/faq-content";
import type {
  ClientStory,
  ClientStoryLocaleContent,
} from "@/data/client-stories";
import {
  getServiceContent,
  serviceKeys,
  type ServiceLandingContent,
} from "@/data/service-content";
import type { ServiceSeoContent } from "@/data/service-seo-content";
import { homeContent } from "@/data/home-content";
import { buildCanonical, siteUrl } from "@/lib/seo";
import { INSTAGRAM_URL, SITE_NAME } from "@/lib/site";
import {
  getClientProjectPath,
  getProjectsPath,
  getServicePath,
  getServicesPath,
  type ServiceKey,
} from "@/lib/route-config";

export function buildHomeJsonLd(locale: Locale, dict: Dictionary) {
  const url = buildCanonical(locale);
  const rootUrl = buildCanonical(locale);
  const organizationId = `${rootUrl}#organization`;
  const websiteId = `${rootUrl}#website`;
  const personId = `${rootUrl}#simon-saad`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
      publisher: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: dict.meta.title,
      description: dict.meta.description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url,
      founder: { "@id": personId },
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: "Simon Saad",
      url,
      jobTitle: locale === "de" ? "Gründer und Videoproduzent" : "Founder and video producer",
      sameAs: [INSTAGRAM_URL],
      worksFor: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${rootUrl}#video-production-studio`,
      name: SITE_NAME,
      url,
      areaServed: {
        "@type": "Country",
        name: "Germany",
      },
      serviceType: homeContent[locale].services.items.map((item) => item.title),
      description: dict.meta.description,
      founder: { "@id": personId },
      sameAs: [INSTAGRAM_URL],
    },
  ];
}

export function buildFaqPageJsonLd(locale: Locale, items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${buildCanonical(locale)}#faq`,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCaseJsonLd(
  locale: Locale,
  slug: string,
  content: WorkCaseLocaleContent,
) {
  const url = buildCanonical(locale, `/work/${slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.title,
      description: content.description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: buildCanonical(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Work" : "Work",
          item: buildCanonical(locale, "/projekte"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: content.title,
          item: url,
        },
      ],
    },
  ];
}

export function buildCaseVideoJsonLd(
  locale: Locale,
  slug: string,
  content: WorkCaseLocaleContent,
) {
  const pageUrl = buildCanonical(locale, `/work/${slug}`);

  return content.contentDrops
    .filter((drop) => drop.lightboxSrc)
    .map((drop) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: drop.title,
      description: drop.description ?? content.description,
      thumbnailUrl: new URL(drop.posterSrc, buildCanonical(locale)).toString(),
      contentUrl: new URL(drop.lightboxSrc!, buildCanonical(locale)).toString(),
      embedUrl: pageUrl,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    }));
}

export function buildClientStoryJsonLd(
  locale: Locale,
  slug: string,
  title: string,
  description: string,
) {
  const url = buildCanonical(locale, `/client-stories/${slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: buildCanonical(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Projekte" : "Work",
          item: buildCanonical(locale, "/projekte"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: buildCanonical(locale),
      areaServed: { "@type": "Country", name: "Germany" },
      description,
    },
  ];
}

export function buildClientStoryVideoJsonLd(
  locale: Locale,
  slug: string,
  items: WorkVideoItem[],
  fallbackDescription: string,
) {
  const pageUrl = buildCanonical(locale, `/client-stories/${slug}`);
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return items
    .filter((item) => Boolean(item.lightboxSrc && item.posterSrc))
    .map((item) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description: item.description || fallbackDescription,
      thumbnailUrl: new URL(item.posterSrc, buildCanonical(locale)).toString(),
      contentUrl: new URL(item.lightboxSrc, buildCanonical(locale)).toString(),
      embedUrl: pageUrl,
      inLanguage,
    }));
}

export function buildClientProjectJsonLd(
  locale: Locale,
  story: ClientStory,
  content: ClientStoryLocaleContent,
) {
  const url = new URL(getClientProjectPath(locale, story.slug), siteUrl).toString();
  const projectsUrl = new URL(getProjectsPath(locale), siteUrl).toString();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.pageTitle,
      description: content.metaDescription,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
      primaryImageOfPage: story.heroImageSrc
        ? new URL(story.heroImageSrc, siteUrl).toString()
        : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: buildCanonical(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Projekte" : "Projects",
          item: projectsUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: story.name,
          item: url,
        },
      ],
    },
  ];
}

export function buildClientProjectVideoJsonLd(
  locale: Locale,
  story: ClientStory,
  items: WorkVideoItem[],
  fallbackDescription: string,
) {
  const pageUrl = new URL(getClientProjectPath(locale, story.slug), siteUrl).toString();
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return items
    .filter((item) => Boolean(item.lightboxSrc && item.posterSrc))
    .map((item) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description: item.description || fallbackDescription,
      thumbnailUrl: new URL(item.posterSrc, siteUrl).toString(),
      contentUrl: new URL(item.lightboxSrc, siteUrl).toString(),
      embedUrl: pageUrl,
      inLanguage,
    }));
}

export function buildProjectsJsonLd(locale: Locale, items: ReelVideo[]) {
  const url = new URL(getProjectsPath(locale), siteUrl).toString();
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: locale === "de" ? "Projekte von HappyReels" : "Projects by HappyReels",
      description:
        locale === "de"
          ? "Ausgewählte Reels, Commercials und Podcast Edits von HappyReels."
          : "Selected reels, commercials and podcast edits by HappyReels.",
      url,
      inLanguage,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: item.projectHref ? new URL(item.projectHref, url).toString() : url,
        })),
      },
    },
    ...items.map((item) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description: item.description,
      thumbnailUrl: new URL(item.posterSrc, url).toString(),
      contentUrl: new URL(item.lightboxSrc, url).toString(),
      embedUrl: url,
      inLanguage,
    })),
  ];
}

export function buildServiceJsonLd(
  locale: Locale,
  serviceKey: ServiceKey,
  content: ServiceLandingContent,
  seoContent: ServiceSeoContent,
) {
  const url = new URL(getServicePath(locale, serviceKey), siteUrl).toString();
  const servicesUrl = new URL(getServicesPath(locale), siteUrl).toString();
  const homeUrl = buildCanonical(locale);
  const serviceId = `${url}#service`;
  const webpageId = `${url}#webpage`;
  const organizationId = `${homeUrl}#organization`;
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webpageId,
      name: content.seoTitle,
      headline: content.h1,
      description: content.metaDescription,
      url,
      inLanguage,
      isPartOf: { "@id": `${homeUrl}#website` },
      mainEntity: { "@id": serviceId },
      about: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name: content.navTitle,
      serviceType: content.navTitle,
      description: content.metaDescription,
      url,
      inLanguage,
      areaServed: {
        "@type": "Country",
        name: "Germany",
      },
      provider: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Leistungen" : "Services",
          item: servicesUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: content.navTitle,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url: `${url}#faq`,
      inLanguage,
      mainEntity: seoContent.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function buildServicesOverviewJsonLd(
  locale: Locale,
  meta: Readonly<{ title: string; description: string }>,
) {
  const url = new URL(getServicesPath(locale), siteUrl).toString();
  const homeUrl = buildCanonical(locale);
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      name: meta.title,
      description: meta.description,
      url,
      inLanguage,
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": `${homeUrl}#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: serviceKeys.map((key, index) => {
          const service = getServiceContent(key, locale);
          return {
            "@type": "ListItem",
            position: index + 1,
            name: service.navTitle,
            description: service.metaDescription,
            url: new URL(getServicePath(locale, key), siteUrl).toString(),
          };
        }),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Leistungen" : "Services",
          item: url,
        },
      ],
    },
  ];
}

export function buildAboutJsonLd(
  locale: Locale,
  title: string,
  description: string,
) {
  const url = buildCanonical(locale, "/about");
  const organizationId = `${buildCanonical(locale)}#organization`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: title,
      description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
      about: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Simon Saad",
      jobTitle: locale === "de" ? "Gründer und Videoproduzent" : "Founder and video producer",
      worksFor: { "@id": organizationId },
      sameAs: [INSTAGRAM_URL],
    },
  ];
}
