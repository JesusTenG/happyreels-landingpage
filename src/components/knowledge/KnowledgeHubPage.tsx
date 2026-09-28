import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { knowledgeHubCopy } from "@/data/knowledge-content";
import type { Locale } from "@/i18n/config";

import { KnowledgeCards } from "./KnowledgeCards";
import styles from "./KnowledgePages.module.css";

export function KnowledgeHubPage({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className="container-base">
          <h1 className={styles.title}>{knowledgeHubCopy[locale].title}</h1>
        </div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
      <section className={styles.guides} aria-label={locale === "de" ? "Ratgeber" : "Guides"} data-navbar-theme="brown">
        <div className="container-base"><KnowledgeCards locale={locale} /></div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
