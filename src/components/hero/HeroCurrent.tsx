import { HeroShowcase } from "@/components/home/HeroShowcase";

import type { HeroVariantProps } from "./Hero.types";

export function HeroCurrent(props: HeroVariantProps) {
  return <HeroShowcase {...props} />;
}
