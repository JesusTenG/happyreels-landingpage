import type { Locale } from "@/i18n/config";

export const projectSegments: Record<Locale, string> = {
  de: "projekte",
  en: "projects",
};

export const serviceSegments: Record<Locale, string> = {
  de: "leistungen",
  en: "services",
};

export const serviceSlugs = {
  videoProduction: {
    de: "video-produktion",
    en: "video-production",
  },
  shortFormEditing: {
    de: "short-form-editing",
    en: "short-form-editing",
  },
  youtubeEditing: {
    de: "youtube-editing",
    en: "youtube-editing",
  },
  motionFinishing: {
    de: "motion-finishing",
    en: "motion-finishing",
  },
} as const;

export type ServiceKey = keyof typeof serviceSlugs;

export function getProjectsPath(locale: Locale): string {
  return `/${locale}/${projectSegments[locale]}`;
}

export function getClientProjectPath(locale: Locale, slug: string): string {
  return `${getProjectsPath(locale)}/${slug}`;
}

export function getClientProjectPathnames(slug: string): Record<Locale, string> {
  return {
    de: getClientProjectPath("de", slug),
    en: getClientProjectPath("en", slug),
  };
}

export function getServicePath(locale: Locale, key: ServiceKey): string {
  return `/${locale}/${serviceSegments[locale]}/${serviceSlugs[key][locale]}`;
}

export function getServicesPath(locale: Locale): string {
  return `/${locale}/${serviceSegments[locale]}`;
}

export function getServicesPathnames(): Record<Locale, string> {
  return {
    de: getServicesPath("de"),
    en: getServicesPath("en"),
  };
}

export function getServicePathnames(key: ServiceKey): Record<Locale, string> {
  return {
    de: getServicePath("de", key),
    en: getServicePath("en", key),
  };
}

export function findServiceKey(locale: Locale, slug: string): ServiceKey | undefined {
  return (Object.keys(serviceSlugs) as ServiceKey[]).find(
    (key) => serviceSlugs[key][locale] === slug,
  );
}
