import type { Locale } from "@/i18n/config";

export type HeroVariantProps = Readonly<{
  locale: Locale;
  ctaLabel: string;
  projectsHref: string;
}>;
