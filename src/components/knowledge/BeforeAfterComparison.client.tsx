"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import type { Locale } from "@/i18n/config";

import styles from "./BeforeAfterComparison.module.css";

type ComparisonStyle = CSSProperties & { "--comparison-position": string };

export function BeforeAfterComparison({ locale }: Readonly<{ locale: Locale }>) {
  const [position, setPosition] = useState(52);
  const copy = locale === "de"
    ? {
        title: "Ein Bild. Zwei Looks.",
        intro: "Zurückhaltende Farben links, ein warmer, kontrastreicher Look rechts.",
        before: "Neutral",
        after: "Graded",
        label: "Vorher-Nachher-Vergleich",
        note: "Illustrative Vorschau mit demselben Ausgangsbild – kein Vergleich von originalem Kamera-Log-Material.",
      }
    : {
        title: "One frame. Two looks.",
        intro: "Restrained color on the left, a warm, high-contrast look on the right.",
        before: "Neutral",
        after: "Graded",
        label: "Before-and-after comparison",
        note: "Illustrative preview using the same source image, not a comparison with original camera log footage.",
      };

  return (
    <section className={styles.section} aria-labelledby="grading-comparison-title">
      <div className={styles.header}>
        <h2 id="grading-comparison-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <div
        className={styles.comparison}
        style={{ "--comparison-position": `${position}%` } as ComparisonStyle}
      >
        <div className={`${styles.imageLayer} ${styles.neutral}`}>
          <Image
            src="/assets/hero/hero-frame-04-city-shot.webp"
            alt={locale === "de" ? "Stadtszene zum Vergleich zweier Farbstimmungen" : "City scene comparing two color treatments"}
            fill
            sizes="(max-width: 760px) 94vw, 80vw"
          />
        </div>
        <div className={`${styles.imageLayer} ${styles.graded}`} aria-hidden="true">
          <Image
            src="/assets/hero/hero-frame-04-city-shot.webp"
            alt=""
            fill
            sizes="(max-width: 760px) 94vw, 80vw"
          />
        </div>
        <span className={`${styles.badge} ${styles.beforeBadge}`}>{copy.before}</span>
        <span className={`${styles.badge} ${styles.afterBadge}`}>{copy.after}</span>
        <span className={styles.divider} aria-hidden="true" />
        <input
          className={styles.range}
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label={copy.label}
          aria-valuetext={locale === "de" ? `${position} Prozent neutrale Ansicht` : `${position} percent neutral view`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
      <p className={styles.note}>{copy.note}</p>
    </section>
  );
}
