import Link from "next/link";
import type { MouseEventHandler } from "react";

import { otherLocale, type Locale } from "@/i18n/config";

import styles from "./LanguageToggle.module.css";

type Props = Readonly<{
  locale: Locale;
  href: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;

export function LanguageToggle({ locale, href, className, onClick }: Props) {
  const switchTo = otherLocale(locale);
  const ariaLabel =
    locale === "de"
      ? "Aktuelle Sprache Deutsch. Zur englischen Version wechseln"
      : "Current language English. Switch to the German version";

  return (
    <Link
      href={href}
      hrefLang={switchTo}
      className={[styles.toggle, className].filter(Boolean).join(" ")}
      data-locale={locale}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className={styles.thumb} aria-hidden="true" />
      <span className={styles.label} data-active={locale === "de" ? "true" : undefined} aria-hidden="true">
        DE
      </span>
      <span className={styles.label} data-active={locale === "en" ? "true" : undefined} aria-hidden="true">
        EN
      </span>
    </Link>
  );
}
