"use client";

import { useEffect, useState } from "react";

import HappyReelsButton from "@/components/ui/HappyReelsButton";
import type { Locale } from "@/i18n/config";

import styles from "./ConsentBanner.module.css";

type Props = Readonly<{ locale: Locale }>;
type ConsentChoice = "necessary" | "all";

const CONSENT_KEY = "happyreels-consent";

const COPY = {
  de: {
    eyebrow: "Deine Privatsphäre",
    title: "Dein Besuch. Deine Entscheidung.",
    body:
      "Wir verwenden notwendige Technologien für den sicheren Betrieb der Website. Optionale Technologien werden nur mit deiner Zustimmung aktiviert.",
    necessary: "Nur notwendige",
    accept: "Alle akzeptieren",
    privacy: "Datenschutz ansehen",
  },
  en: {
    eyebrow: "Your privacy",
    title: "Your visit. Your choice.",
    body:
      "We use necessary technologies to operate this website securely. Optional technologies are activated only with your consent.",
    necessary: "Necessary only",
    accept: "Accept all",
    privacy: "View privacy policy",
  },
} as const;

export function ConsentBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const copy = COPY[locale];

  useEffect(() => {
    let storedChoice: string | null = null;

    try {
      storedChoice = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      storedChoice = null;
    }

    if (storedChoice === "necessary" || storedChoice === "all") {
      document.documentElement.dataset.consent = storedChoice;
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTimer = window.setTimeout(
      () => setVisible(true),
      reducedMotion ? 320 : 3150,
    );

    return () => window.clearTimeout(revealTimer);
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // The selection still applies for the current page if storage is unavailable.
    }

    document.documentElement.dataset.consent = choice;
    setClosing(true);
    window.setTimeout(() => setVisible(false), 320);
  };

  if (!visible) return null;

  return (
    <aside
      className={styles.banner}
      data-closing={closing || undefined}
      aria-labelledby="consent-title"
    >
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 id="consent-title">{copy.title}</h2>
        <p>{copy.body}</p>
        <a href={`/${locale}/datenschutz`}>{copy.privacy}</a>
      </div>
      <div className={styles.actions}>
        <HappyReelsButton
          variant="secondary"
          showIcon={false}
          className={styles.button}
          onClick={() => saveChoice("necessary")}
        >
          {copy.necessary}
        </HappyReelsButton>
        <HappyReelsButton
          variant="accent"
          showIcon={false}
          className={styles.button}
          onClick={() => saveChoice("all")}
        >
          {copy.accept}
        </HappyReelsButton>
      </div>
    </aside>
  );
}
