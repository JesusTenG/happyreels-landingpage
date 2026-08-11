"use client";

import { HeroCurrent } from "./HeroCurrent";
import { HeroLeonardo } from "./HeroLeonardo";
import { useHeroVariant } from "./HeroVariantContext.client";
import type { HeroVariantProps } from "./Hero.types";

export function Hero(props: HeroVariantProps) {
  const heroVariant = useHeroVariant();
  const variant = heroVariant?.variant ?? "current";

  return variant === "current" ? <HeroCurrent {...props} /> : <HeroLeonardo {...props} />;
}
