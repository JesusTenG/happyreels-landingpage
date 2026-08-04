"use client";

import { useLayoutEffect, useState } from "react";

import type { Locale } from "@/i18n/config";

import styles from "./PaletteToggle.module.css";

const BROWN_TONES = [
  "burgundy",
  "cocoa",
  "rosewood",
  "plum",
] as const;
type BrownToneId = (typeof BROWN_TONES)[number];

const STORAGE_KEY = "happyreels-brown-tone-v7";

const LABELS: Record<Locale, Record<BrownToneId, string>> = {
  de: {
    burgundy: "Burgunderbraun",
    cocoa: "Kakaobraun",
    rosewood: "Rosenholz",
    plum: "Pflaumenbraun",
  },
  en: {
    burgundy: "Burgundy Brown",
    cocoa: "Cocoa Brown",
    rosewood: "Rosewood",
    plum: "Plum Brown",
  },
};

function isBrownToneId(value: string | null | undefined): value is BrownToneId {
  return BROWN_TONES.some((tone) => tone === value);
}

function applyBrownTone(tone: BrownToneId) {
  if (tone === "burgundy") {
    delete document.documentElement.dataset.brownTone;
  } else {
    document.documentElement.dataset.brownTone = tone;
  }
}

type Props = Readonly<{ locale: Locale }>;

export function PaletteToggle({ locale }: Props) {
  const [brownTone, setBrownTone] = useState<BrownToneId>("burgundy");

  useLayoutEffect(() => {
    let storedBrownTone: string | null = null;

    try {
      storedBrownTone = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      storedBrownTone = null;
    }

    delete document.documentElement.dataset.palette;
    const toneFromPage = document.documentElement.dataset.brownTone;
    const initialBrownTone = isBrownToneId(storedBrownTone)
      ? storedBrownTone
      : isBrownToneId(toneFromPage)
        ? toneFromPage
        : "burgundy";

    applyBrownTone(initialBrownTone);
    setBrownTone(initialBrownTone);
  }, []);

  const currentIndex = BROWN_TONES.indexOf(brownTone);
  const nextBrownTone = BROWN_TONES[(currentIndex + 1) % BROWN_TONES.length];
  const currentLabel = LABELS[locale][brownTone];
  const nextLabel = LABELS[locale][nextBrownTone];
  const label = locale === "de"
    ? `Braunton ${currentLabel}. Zu ${nextLabel} wechseln`
    : `${currentLabel} brown tone. Switch to ${nextLabel}`;

  const cycleBrownTone = () => {
    applyBrownTone(nextBrownTone);
    setBrownTone(nextBrownTone);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextBrownTone);
    } catch {
      // The brown tone still works for the current page when storage is unavailable.
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      data-brown-tone={brownTone}
      aria-label={label}
      title={label}
      onClick={cycleBrownTone}
    >
      <span className={styles.swatch} aria-hidden="true" />
      <span className="sr-only">{currentLabel}</span>
    </button>
  );
}
