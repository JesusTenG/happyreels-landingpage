import { HeroCurrent } from "./HeroCurrent";
import type { HeroVariantProps } from "./Hero.types";

export function Hero(props: HeroVariantProps) {
  return <HeroCurrent {...props} />;
}
