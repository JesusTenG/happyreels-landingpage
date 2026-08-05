import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReelVideos } from "@/data/reel-videos";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getProjectsPath } from "@/lib/route-config";
import { buildProjectsJsonLd } from "@/lib/structured-data";

import { ProjectOverview } from "./ProjectOverview";

const META = {
  de: {
    title: "Projekte",
    description: "Ausgewählte Reels, Commercials und Podcast-Edits von HappyReels.",
  },
  en: {
    title: "Projects",
    description: "Selected reels, commercials and podcast edits by HappyReels.",
  },
} as const;

const localizedPathnames = {
  de: getProjectsPath("de"),
  en: getProjectsPath("en"),
};

export function buildProjectsRouteMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    title: META[locale].title,
    description: META[locale].description,
    localizedPathnames,
  });
}

export async function ProjectsRoute({ locale }: Readonly<{ locale: Locale }>) {
  const dict = await getDictionary(locale);
  const items = getReelVideos(locale);

  return (
    <>
      <JsonLd data={buildProjectsJsonLd(locale, items)} />
      <Navbar locale={locale} dict={dict} />
      <ProjectOverview locale={locale} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
