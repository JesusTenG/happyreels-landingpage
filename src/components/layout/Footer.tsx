import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { ConsentSettingsButton } from "@/components/layout/ConsentSettingsButton.client";
import { getAllClientStories } from "@/data/client-stories";
import { getServiceContent, serviceKeys } from "@/data/service-content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  getClientProjectPath,
  getProjectsPath,
  getServicePath,
  getServicesPath,
} from "@/lib/route-config";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  WHATSAPP_DISPLAY_NUMBER,
  buildWhatsAppUrl,
} from "@/lib/site";

import styles from "./Footer.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

const FOOTER_COPY = {
  de: {
    navigation: "Navigation",
    services: "Leistungen",
    allServices: "Alle Leistungen",
    projects: "Projekte",
    contactAndLegal: "Kontakt & Rechtliches",
    home: "Startseite",
    allProjects: "Alle Projekte",
    about: "Über uns",
    contact: "Kontakt",
  },
  en: {
    navigation: "Navigation",
    services: "Services",
    allServices: "All services",
    projects: "Projects",
    contactAndLegal: "Contact & legal",
    home: "Home",
    allProjects: "All projects",
    about: "About",
    contact: "Contact",
  },
} as const;

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;
  const whatsAppUrl = buildWhatsAppUrl();
  const copy = FOOTER_COPY[locale];
  const serviceLinks = serviceKeys.map((key) => ({
    href: getServicePath(locale, key),
    label: getServiceContent(key, locale).navTitle,
  }));
  const projectLinks = getAllClientStories().map((project) => ({
    href: getClientProjectPath(locale, project.slug),
    label: project.name,
  }));

  return (
    <footer className={styles.footer} data-navbar-theme="rose">
      <div className={`container-base ${styles.inner}`}>
        <div className={styles.top}>
          <Link href={home} className={styles.brand} aria-label={dict.nav.wordmark}>
            <BrandMark size="footer" reveal="viewport" interactive />
          </Link>
          <p>
            From footage to <em>feeling.</em>
          </p>
        </div>

        <div className={styles.grid}>
          <section className={styles.linkCard} aria-labelledby="footer-navigation">
            <h2 id="footer-navigation">{copy.navigation}</h2>
            <nav className={styles.linkList} aria-label={copy.navigation}>
              <Link href={home}>{copy.home}</Link>
              <Link href={getProjectsPath(locale)}>{copy.allProjects}</Link>
              <Link href={`${home}/about`}>{copy.about}</Link>
              <Link href={`${home}#contact`}>{copy.contact}</Link>
            </nav>
          </section>

          <section className={styles.linkCard} aria-labelledby="footer-services">
            <h2 id="footer-services">{copy.services}</h2>
            <nav className={styles.linkList} aria-label={copy.services}>
              <Link href={getServicesPath(locale)}>{copy.allServices}</Link>
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className={styles.linkCard} aria-labelledby="footer-projects">
            <h2 id="footer-projects">{copy.projects}</h2>
            <nav className={styles.linkList} aria-label={copy.projects}>
              {projectLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className={styles.linkCard} aria-labelledby="footer-contact-legal">
            <h2 id="footer-contact-legal">{copy.contactAndLegal}</h2>
            <div className={styles.linkList}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram {INSTAGRAM_HANDLE}
              </a>
              {whatsAppUrl ? (
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp {WHATSAPP_DISPLAY_NUMBER}
                </a>
              ) : null}
              <Link href={`/${locale}/impressum`}>{dict.footer.links.impressum}</Link>
              <Link href={`/${locale}/datenschutz`}>{dict.footer.links.datenschutz}</Link>
              <ConsentSettingsButton
                className={styles.consentSettings}
                label={dict.footer.links.consentSettings}
              />
            </div>
          </section>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <a
            className={styles.wyreCredit}
            href="https://wyreweb.de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website by Wyre Web"
          >
            <Image
              className={styles.wyreLogo}
              src="/assets/logo/logo5.png"
              alt=""
              width={54}
              height={53}
            />
            <span>
              Website by <strong>Wyre Web</strong>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
