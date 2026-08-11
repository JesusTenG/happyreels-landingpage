import type { MetadataRoute } from "next";

import { getAllClientStories } from "@/data/client-stories";
import { serviceKeys } from "@/data/service-content";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import {
  getClientProjectPathnames,
  getProjectsPath,
  getServicePathnames,
  getServicesPath,
} from "@/lib/route-config";
import { siteUrl } from "@/lib/seo";

type LocalizedPaths = Readonly<Record<Locale, string>>;

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

function localizedAlternates(
  pathnames: LocalizedPaths,
): NonNullable<MetadataRoute.Sitemap[number]["alternates"]> {
  return {
    languages: {
      de: absoluteUrl(pathnames.de),
      en: absoluteUrl(pathnames.en),
      "x-default": absoluteUrl(pathnames[defaultLocale]),
    },
  };
}

function matchingPathnames(pathname = ""): LocalizedPaths {
  return {
    de: pathname ? `/de${pathname}` : "/de",
    en: pathname ? `/en${pathname}` : "/en",
  };
}

function addLocalizedEntries(
  entries: MetadataRoute.Sitemap,
  pathnames: LocalizedPaths,
) {
  for (const locale of locales) {
    entries.push({
      url: absoluteUrl(pathnames[locale]),
      alternates: localizedAlternates(pathnames),
    });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  addLocalizedEntries(entries, matchingPathnames());
  addLocalizedEntries(
    entries,
    { de: getProjectsPath("de"), en: getProjectsPath("en") },
  );
  addLocalizedEntries(
    entries,
    { de: getServicesPath("de"), en: getServicesPath("en") },
  );

  for (const pathname of ["/about", "/impressum", "/datenschutz"] as const) {
    addLocalizedEntries(entries, matchingPathnames(pathname));
  }

  for (const story of getAllClientStories()) {
    addLocalizedEntries(entries, getClientProjectPathnames(story.slug));
  }

  for (const serviceKey of serviceKeys) {
    addLocalizedEntries(entries, getServicePathnames(serviceKey));
  }

  return entries;
}
