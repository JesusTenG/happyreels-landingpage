import type { MetadataRoute } from "next";

import { getAllClientStories } from "@/data/client-stories";
import { serviceKeys } from "@/data/service-content";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import {
  getClientProjectPathnames,
  getProjectsPath,
  getServicePathnames,
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
  lastModified: Date,
  priority: number,
) {
  for (const locale of locales) {
    entries.push({
      url: absoluteUrl(pathnames[locale]),
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: localizedAlternates(pathnames),
    });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  addLocalizedEntries(entries, matchingPathnames(), lastModified, 1);
  addLocalizedEntries(
    entries,
    { de: getProjectsPath("de"), en: getProjectsPath("en") },
    lastModified,
    0.9,
  );

  for (const pathname of ["/about", "/impressum", "/datenschutz"] as const) {
    addLocalizedEntries(entries, matchingPathnames(pathname), lastModified, 0.6);
  }

  for (const story of getAllClientStories()) {
    addLocalizedEntries(entries, getClientProjectPathnames(story.slug), lastModified, 0.8);
  }

  for (const serviceKey of serviceKeys) {
    addLocalizedEntries(entries, getServicePathnames(serviceKey), lastModified, 0.75);
  }

  return entries;
}
