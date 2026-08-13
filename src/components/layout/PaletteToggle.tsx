"use client";

import { Moon, Sun } from "lucide-react";

import { useHeroVariant } from "@/components/hero/HeroVariantContext.client";
import type { Locale } from "@/i18n/config";

import styles from "./PaletteToggle.module.css";

type Props = Readonly<{ locale: Locale }>;

export function PaletteToggle({ locale }: Props) {
  const heroVariant = useHeroVariant();

  if (!heroVariant) return null;

  const isDark = heroVariant.colorMode === "dark";
  const themeLabel = locale === "de"
    ? isDark
      ? "Light Mode aktivieren"
      : "Dark Mode aktivieren"
    : isDark
      ? "Enable light mode"
      : "Enable dark mode";

  return (
    <button
      type="button"
      className={styles.toggle}
      data-color-mode={heroVariant.colorMode}
      aria-label={themeLabel}
      title={themeLabel}
      aria-pressed={isDark}
      onClick={() => heroVariant.setColorMode(isDark ? "light" : "dark")}
    >
      <span className={styles.themeIcon} aria-hidden="true">
        {isDark ? <Sun /> : <Moon />}
      </span>
      <span className="sr-only">{themeLabel}</span>
    </button>
  );
}
