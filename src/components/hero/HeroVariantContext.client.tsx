"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { HeroVariant } from "./Hero.types";

export type SiteColorMode = "light" | "dark";

type HeroVariantState = Readonly<{
  variant: HeroVariant;
  setVariant: (variant: HeroVariant) => void;
  colorMode: SiteColorMode;
  setColorMode: (mode: SiteColorMode) => void;
  textMarkersVisible: boolean;
  setTextMarkersVisible: (visible: boolean) => void;
}>;

const HeroVariantContext = createContext<HeroVariantState | null>(null);
const colorModeStorageKey = "happyreels-color-mode";
const colorSchemeQuery = "(prefers-color-scheme: dark)";

function isSiteColorMode(value: string | null): value is SiteColorMode {
  return value === "light" || value === "dark";
}

export function HeroVariantProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [variant, setVariant] = useState<HeroVariant>("current");
  const [colorMode, setColorModeState] = useState<SiteColorMode>("light");
  const [textMarkersVisible, setTextMarkersVisible] = useState(true);
  const hasManualColorMode = useRef(false);

  const applyColorMode = useCallback((mode: SiteColorMode) => {
    document.documentElement.dataset.siteColorMode = mode;
    document.documentElement.style.colorScheme = mode;
    setColorModeState(mode);
  }, []);

  const setColorMode = useCallback(
    (mode: SiteColorMode) => {
      hasManualColorMode.current = true;

      try {
        window.localStorage.setItem(colorModeStorageKey, mode);
      } catch {
        // The toggle still works when storage is unavailable or blocked.
      }

      applyColorMode(mode);
    },
    [applyColorMode],
  );

  useEffect(() => {
    const colorScheme = window.matchMedia(colorSchemeQuery);
    let storedMode: string | null = null;

    try {
      storedMode = window.localStorage.getItem(colorModeStorageKey);
    } catch {
      storedMode = null;
    }

    hasManualColorMode.current = isSiteColorMode(storedMode);

    const initialDocumentMode = document.documentElement.dataset.siteColorMode ?? null;
    const initialMode = isSiteColorMode(storedMode)
      ? storedMode
      : isSiteColorMode(initialDocumentMode)
        ? initialDocumentMode
        : colorScheme.matches
          ? "dark"
          : "light";

    const initialSyncFrame = window.requestAnimationFrame(() => applyColorMode(initialMode));

    const handleColorSchemeChange = (event: MediaQueryListEvent) => {
      if (hasManualColorMode.current) return;
      applyColorMode(event.matches ? "dark" : "light");
    };

    colorScheme.addEventListener("change", handleColorSchemeChange);
    return () => {
      window.cancelAnimationFrame(initialSyncFrame);
      colorScheme.removeEventListener("change", handleColorSchemeChange);
    };
  }, [applyColorMode]);

  const value = useMemo(
    () => ({
      variant,
      setVariant,
      colorMode,
      setColorMode,
      textMarkersVisible,
      setTextMarkersVisible,
    }),
    [colorMode, setColorMode, textMarkersVisible, variant],
  );

  return (
    <HeroVariantContext.Provider value={value}>
      <div
        className="site-variant-root"
        data-site-variant={variant}
        data-site-color-mode={colorMode}
        data-text-markers={textMarkersVisible ? "visible" : "hidden"}
        suppressHydrationWarning
      >
        {children}
      </div>
    </HeroVariantContext.Provider>
  );
}

export function useHeroVariant() {
  return useContext(HeroVariantContext);
}
