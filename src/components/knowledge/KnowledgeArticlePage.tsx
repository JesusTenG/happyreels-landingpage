import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { SubpageFaq } from "@/components/subpages/SubpageFaq";
import type { KnowledgePageContent } from "@/data/knowledge-content";
import type { Locale } from "@/i18n/config";
import { getKnowledgeHubPath, type KnowledgeKey } from "@/lib/route-config";

import { BeforeAfterComparison } from "./BeforeAfterComparison.client";
import { KnowledgeCards } from "./KnowledgeCards";
import styles from "./KnowledgePages.module.css";

type Props = Readonly<{
  locale: Locale;
  knowledgeKey: KnowledgeKey;
  content: KnowledgePageContent;
}>;

export function KnowledgeArticlePage({ locale, knowledgeKey, content }: Props) {
  return (
    <main id="main-content" className={styles.main}>
      <article>
        <header className={styles.hero} data-navbar-theme="brown">
          <Reveal className={`container-base ${styles.heroInner}`}>
            <Link className={styles.backLink} href={getKnowledgeHubPath(locale)}><ArrowLeft size={16} aria-hidden="true" />{locale === "de" ? "Alle Ratgeber" : "All guides"}</Link>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.lead}>{content.intro}</p>
          </Reveal>
        </header>
        <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
        <div className={styles.articleBody} data-navbar-theme="brown">
          <div className="container-base">
            {content.hasComparison ? <BeforeAfterComparison locale={locale} /> : null}
            <div className={styles.sections}>
              {content.sections.map((section, index) => (
                <section key={section.title} className={styles.contentSection} data-card={index + 1} aria-labelledby={`thema-${index + 1}`}>
                  <h2 id={`thema-${index + 1}`}>{section.title}</h2>
                  {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
            </div>
            {content.sources ? (
              <aside className={styles.sources} aria-label={locale === "de" ? "Quellen" : "Sources"}>
                {content.sources.map(source => <a key={source.href} href={source.href}>{source.label}</a>)}
              </aside>
            ) : null}
          </div>
        </div>
        <SubpageFaq title={content.faqTitle} items={content.faqs} />
        <section className={styles.relatedGuides} aria-labelledby="related-guides-title" data-navbar-theme="brown">
          <div className="container-base">
            <h2 id="related-guides-title">{locale === "de" ? "Weitere Fragen?" : "More questions?"}</h2>
            <KnowledgeCards locale={locale} exclude={knowledgeKey} />
          </div>
        </section>
        <SubpageCta locale={locale} />
      </article>
    </main>
  );
}
