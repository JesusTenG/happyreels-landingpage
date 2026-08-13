"use client";

import { Highlighter } from "lucide-react";

import { useHeroVariant } from "@/components/hero/HeroVariantContext.client";
import type { Locale } from "@/i18n/config";

import styles from "./TextMarkerToggle.module.css";

type Props = Readonly<{ locale: Locale }>;

export function TextMarkerToggle({ locale }: Props) {
  const heroVariant = useHeroVariant();

  if (!heroVariant) return null;

  const isVisible = heroVariant.textMarkersVisible;
  const label = locale === "de"
    ? isVisible
      ? "Textmarker ausblenden"
      : "Textmarker einblenden"
    : isVisible
      ? "Hide text markers"
      : "Show text markers";

  return (
    <button
      type="button"
      className={styles.toggle}
      data-marker-state={isVisible ? "visible" : "hidden"}
      aria-label={label}
      title={label}
      aria-pressed={isVisible}
      onClick={() => heroVariant.setTextMarkersVisible(!isVisible)}
    >
      <span className={styles.icon} aria-hidden="true">
        <Highlighter />
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
