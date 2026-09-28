import type { Locale } from "@/i18n/config";

export const projectSegments: Record<Locale, string> = {
  de: "projekte",
  en: "projects",
};

export const serviceSegments: Record<Locale, string> = {
  de: "leistungen",
  en: "services",
};

export const knowledgeSegments: Record<Locale, string> = {
  de: "ratgeber",
  en: "guides",
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

export const knowledgeSlugs = {
  colorGrading: {
    de: "was-ist-color-grading",
    en: "what-is-color-grading",
  },
  videoProductionCosts: {
    de: "videoproduktion-kosten",
    en: "video-production-costs",
  },
  videoEditingWorkflow: {
    de: "professioneller-videoschnitt-ablauf",
    en: "professional-video-editing-workflow",
  },
} as const;

export type KnowledgeKey = keyof typeof knowledgeSlugs;

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

export function getKnowledgeHubPath(locale: Locale): string {
  return `/${locale}/${knowledgeSegments[locale]}`;
}

export function getKnowledgeHubPathnames(): Record<Locale, string> {
  return {
    de: getKnowledgeHubPath("de"),
    en: getKnowledgeHubPath("en"),
  };
}

export function getKnowledgePath(locale: Locale, key: KnowledgeKey): string {
  return `${getKnowledgeHubPath(locale)}/${knowledgeSlugs[key][locale]}`;
}

export function getKnowledgePathnames(key: KnowledgeKey): Record<Locale, string> {
  return {
    de: getKnowledgePath("de", key),
    en: getKnowledgePath("en", key),
  };
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

export function findKnowledgeKey(
  locale: Locale,
  slug: string,
): KnowledgeKey | undefined {
  return (Object.keys(knowledgeSlugs) as KnowledgeKey[]).find(
    (key) => knowledgeSlugs[key][locale] === slug,
  );
}
