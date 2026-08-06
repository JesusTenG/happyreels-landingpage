import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { ConsentSettingsButton } from "@/components/layout/ConsentSettingsButton.client";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  WHATSAPP_DISPLAY_NUMBER,
  buildWhatsAppUrl,
} from "@/lib/site";
import { getProjectsPath } from "@/lib/route-config";

import styles from "./Footer.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;
  const whatsAppUrl = buildWhatsAppUrl();
  const aboutLabel = locale === "de" ? "Über uns" : "About";

  return (
    <footer className={styles.footer} data-navbar-theme="rose">
      <div className={`container-base ${styles.inner}`}>
        <div className={styles.top}>
          <Link href={home} className={styles.brand} aria-label={dict.nav.wordmark}>
            <BrandMark size="footer" reveal="viewport" interactive />
          </Link>
          <p>From footage to <em>feeling.</em></p>
        </div>

        <div className={styles.grid}>
          <nav aria-label={locale === "de" ? "Footer Navigation" : "Footer navigation"}>
            <Link href={getProjectsPath(locale)}>{dict.nav.links.work}</Link>
            <Link href={`${home}#services`}>{dict.nav.links.services}</Link>
            <Link href={`${home}/about`}>{aboutLabel}</Link>
            <Link href={`${home}#contact`}>{dict.nav.links.contact}</Link>
          </nav>

          <div className={styles.contactLinks}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram {INSTAGRAM_HANDLE}
            </a>
            {whatsAppUrl ? (
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp {WHATSAPP_DISPLAY_NUMBER}
              </a>
            ) : null}
          </div>

          <nav aria-label={locale === "de" ? "Rechtliches" : "Legal"}>
            <Link href={`/${locale}/impressum`}>{dict.footer.links.impressum}</Link>
            <Link href={`/${locale}/datenschutz`}>{dict.footer.links.datenschutz}</Link>
            <ConsentSettingsButton
              className={styles.consentSettings}
              label={dict.footer.links.consentSettings}
            />
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <p>
            Website by{" "}
            <a href="https://wyreweb.de" target="_blank" rel="noopener noreferrer">Wyre Web</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
