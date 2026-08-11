"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { HeroVariant } from "./Hero.types";

type HeroVariantState = Readonly<{
  variant: HeroVariant;
  setVariant: (variant: HeroVariant) => void;
}>;

const HeroVariantContext = createContext<HeroVariantState | null>(null);

export function HeroVariantProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [variant, setVariant] = useState<HeroVariant>("current");
  const value = useMemo(() => ({ variant, setVariant }), [variant]);

  return <HeroVariantContext.Provider value={value}>{children}</HeroVariantContext.Provider>;
}

export function useHeroVariant() {
  return useContext(HeroVariantContext);
}
