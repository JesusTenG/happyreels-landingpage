import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getServicesPathnames } from "@/lib/route-config";
import { buildPageMetadata } from "@/lib/seo";
import { buildServicesOverviewJsonLd } from "@/lib/structured-data";

import { ServiceOverview } from "./ServiceOverview";

const META = {
  de: {
    title: "Videoproduktion & Video Editing | Leistungen",
    description:
      "Videoproduktion und Video Editing von HappyReels: Social Media Produktion, Reels, YouTube Editing, Motion Design, Color Grading und Finishing.",
  },
  en: {
    title: "Video production & video editing services",
    description:
      "Video production and editing by HappyReels: social media production, Reels, YouTube editing, motion design, color grading and finishing.",
  },
} as const;

export function buildServiceOverviewMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    title: META[locale].title,
    description: META[locale].description,
    localizedPathnames: getServicesPathnames(),
  });
}

export async function ServiceOverviewRoute({ locale }: Readonly<{ locale: Locale }>) {
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={buildServicesOverviewJsonLd(locale, META[locale])} />
      <Navbar locale={locale} dict={dict} />
      <ServiceOverview locale={locale} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
