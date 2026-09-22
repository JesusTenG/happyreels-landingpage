import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionWave } from "@/components/layout/SectionWave";

import styles from "./LegalPageViewV2.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  page: "impressum" | "datenschutz";
}>;

export function LegalPageView({ locale, dict, page }: Props) {
  const content = dict.legal[page];
  const home = `/${locale}`;
  const backLabel = locale === "de" ? "Zur Startseite" : "Back to home";

  return (
    <main id="main-content" className={styles.legal}>
      <section
        className={styles.hero}
        aria-labelledby="legal-title"
        data-navbar-theme="brown"
        data-navbar-hero="collapsing"
      >
        <div className={`container-base ${styles.heroInner}`}>
          <Link className={styles.back} href={home}>← {backLabel}</Link>
          <h1 id="legal-title">{content.title}</h1>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />

      <article className={styles.content} data-navbar-theme="brown">
        <div className={`container-base ${styles.contentInner}`}>
          {content.sections.map((section) => (
            <section key={section.heading} className={styles.block}>
              <h2 className={styles.heading}>{section.heading}</h2>
              <p className={styles.body}>{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-footer)" />
    </main>
  );
}
