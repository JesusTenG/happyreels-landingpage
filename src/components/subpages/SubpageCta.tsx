import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import type { Locale } from "@/i18n/config";

import styles from "./Subpage.module.css";

export function SubpageCta({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <>
      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-cta)" flip />
      <section className={styles.cta} aria-labelledby="subpage-cta-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.ctaInner}`}>
          <h2 id="subpage-cta-title">{locale === "de" ? "Lass uns sprechen." : "Let's talk."}</h2>
          <HappyReelsButton href={`/${locale}#contact`} variant="on-yellow">
            {locale === "de" ? "Kontakt aufnehmen" : "Get in touch"}
          </HappyReelsButton>
        </div>
      </section>
      <SectionWave from="var(--subpage-bg-cta)" to="var(--subpage-bg-footer)" />
    </>
  );
}
