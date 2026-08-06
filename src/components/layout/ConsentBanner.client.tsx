"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { isLocale, type Locale } from "@/i18n/config";
import {
  CONSENT_SETTINGS_EVENT,
  CONSENT_STORAGE_KEY,
  LEGACY_CONSENT_STORAGE_KEY,
  type ConsentChoice,
} from "@/lib/consent";

import styles from "./ConsentBanner.module.css";

type Props = Readonly<{ locale: Locale }>;

const COPY = {
  de: {
    eyebrow: "Deine Privatsphäre",
    title: "Du entscheidest, was mitläuft.",
    body:
      "Wir verwenden notwendige Technologien für den sicheren Betrieb der Website. Mit deiner Zustimmung aktivieren wir zusätzlich Vercel Web Analytics für anonyme Nutzungsstatistiken. Vercel Analytics verwendet keine Cookies.",
    necessary: "Nur notwendige",
    accept: "Analytics erlauben",
    privacy: "Datenschutz ansehen",
  },
  en: {
    eyebrow: "Your privacy",
    title: "You decide what runs.",
    body:
      "We use necessary technologies to operate this website securely. With your consent, we also activate Vercel Web Analytics for anonymous usage statistics. Vercel Analytics does not use cookies.",
    necessary: "Necessary only",
    accept: "Allow analytics",
    privacy: "View privacy policy",
  },
} as const;

function hasAnalyticsConsent(): boolean {
  try {
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) === "analytics") return true;
  } catch {
    // The document state below is the fallback when storage is unavailable.
  }

  return document.documentElement.dataset.consent === "analytics";
}

function filterAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  return hasAnalyticsConsent() ? event : null;
}

export function ConsentBanner({ locale }: Props) {
  const pathname = usePathname();
  const pathLocale = pathname?.split("/").filter(Boolean)[0];
  const activeLocale = pathLocale && isLocale(pathLocale) ? pathLocale : locale;
  const copy = COPY[activeLocale];
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let storedChoice: string | null = null;

    try {
      storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
    } catch {
      storedChoice = null;
    }

    if (storedChoice === "necessary" || storedChoice === "analytics") {
      document.documentElement.dataset.consent = storedChoice;
      const restoreTimer = window.setTimeout(() => setChoice(storedChoice), 0);
      return () => window.clearTimeout(restoreTimer);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTimer = window.setTimeout(
      () => setVisible(true),
      reducedMotion ? 320 : 3150,
    );

    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      setClosing(false);
      setVisible(true);
    };

    window.addEventListener(CONSENT_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, openSettings);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    } catch {
      // The selection still applies for the current page if storage is unavailable.
    }

    document.documentElement.dataset.consent = nextChoice;
    setChoice(nextChoice);
    setClosing(true);
    window.setTimeout(() => setVisible(false), 320);
  };

  return (
    <>
      {choice === "analytics" ? (
        <Analytics beforeSend={filterAnalyticsEvent} />
      ) : null}

      {visible ? (
        <aside
          className={styles.banner}
          data-closing={closing || undefined}
          aria-labelledby="consent-title"
        >
          <div className={styles.copy}>
            <span className={styles.eyebrow}>{copy.eyebrow}</span>
            <h2 id="consent-title">{copy.title}</h2>
            <p>{copy.body}</p>
            <a href={`/${activeLocale}/datenschutz`}>{copy.privacy}</a>
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
              onClick={() => saveChoice("analytics")}
            >
              {copy.accept}
            </HappyReelsButton>
          </div>
        </aside>
      ) : null}
    </>
  );
}
