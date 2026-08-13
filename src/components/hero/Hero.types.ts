import type { Locale } from "@/i18n/config";

export const HERO_VARIANTS = [
  "current",
  "perspective",
] as const;

export type HeroVariant = (typeof HERO_VARIANTS)[number];

export const HERO_VARIANT_NUMBERS: Record<HeroVariant, string> = {
  current: "01",
  perspective: "02",
};

export type HeroVariantProps = Readonly<{
  locale: Locale;
  ctaLabel: string;
  projectsHref: string;
}>;
