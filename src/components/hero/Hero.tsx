"use client";

import { HeroCurrent } from "./HeroCurrent";
import { HeroLeonardo } from "./HeroLeonardo";
import { useHeroVariant } from "./HeroVariantContext.client";
import type { HeroVariantProps } from "./Hero.types";

export function Hero(props: HeroVariantProps) {
  const heroVariant = useHeroVariant();
  const variant = heroVariant?.variant ?? "current";

  if (variant === "current") return <HeroCurrent {...props} />;
  return <HeroLeonardo {...props} />;
}
