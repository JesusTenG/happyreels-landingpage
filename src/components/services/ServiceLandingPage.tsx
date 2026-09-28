import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { KnowledgeCards } from "@/components/knowledge/KnowledgeCards";
import { SectionWave } from "@/components/layout/SectionWave";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { SubpageFaq } from "@/components/subpages/SubpageFaq";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { getReelVideosById } from "@/data/reel-videos";
import type { ServiceLandingContent } from "@/data/service-content";
import { getServiceSeoContent } from "@/data/service-seo-content";
import type { Locale } from "@/i18n/config";
import { getProjectsPath, getServicesPath, type KnowledgeKey, type ServiceKey } from "@/lib/route-config";

import styles from "./ServiceLandingPageV2.module.css";

type Props = Readonly<{ locale: Locale; serviceKey: ServiceKey; content: ServiceLandingContent }>;

const SERVICE_GUIDES: Record<ServiceKey, readonly KnowledgeKey[]> = {
  videoProduction: ["videoProductionCosts", "videoEditingWorkflow"],
  shortFormEditing: ["videoEditingWorkflow", "colorGrading"],
  youtubeEditing: ["videoEditingWorkflow", "videoProductionCosts"],
  motionFinishing: ["colorGrading", "videoEditingWorkflow"],
};

export function ServiceLandingPage({ locale, serviceKey, content }: Props) {
  const seo = getServiceSeoContent(serviceKey, locale);
  const proofVideos = getReelVideosById(locale, seo.proofVideoIds);
  const de = locale === "de";

  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className={`container-base ${styles.heroInner}`}>
          <Link className={styles.backLink} href={getServicesPath(locale)}><ArrowLeft size={16} aria-hidden="true" />{de ? "Alle Leistungen" : "All services"}</Link>
          <h1 className={styles.title}>{content.h1}</h1>
          <p className={styles.lead}>{content.lead}</p>
          <div><HappyReelsButton href={`/${locale}#contact`} variant="on-rose">{de ? "Kontakt aufnehmen" : "Get in touch"}</HappyReelsButton></div>
        </div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
      <section className={styles.proof} aria-labelledby="service-proof-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.proofLayout}`}>
          <div className={styles.proofHeader}>
            <h2 id="service-proof-title">{seo.proofTitle}</h2>
            {serviceKey === "youtubeEditing" ? <p>{seo.proofIntro}</p> : null}
            <Link href={getProjectsPath(locale)}>{de ? "Alle Projekte" : "All projects"}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <WorkVideoGallery items={proofVideos} gridClassName={styles.proofGrid} />
        </div>
      </section>
      <section className={styles.overview} aria-labelledby="service-scope-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="service-scope-title" className={styles.heading}>{seo.detailsTitle}</h2>
          <div className={styles.detailsGrid}>
            {seo.details.map((detail, index) => (
              <article key={detail.title} className={styles.detailCard} data-card={index + 1}>
                <h3>{detail.title}</h3><p>{detail.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.listsGrid}>
            <div className={styles.list}>
              <h3>{de ? "Passt zu" : "A fit for"}</h3>
              <ul>{content.useCases.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <div className={styles.list}>
              <h3>{content.formatsTitle}</h3>
              <ul>{content.formats.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-soft)" flip />
      <section className={styles.process} aria-labelledby="service-process-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="service-process-title" className={styles.heading}>{de ? "So arbeiten wir zusammen" : "How we work together"}</h2>
          <ol className={styles.steps}>
            {content.processSteps.map((step, index) => (
              <li key={step.title} className={styles.step} data-card={index + 1}>
                <div className={styles.stepHeader}><h3>{step.title}</h3><span className={styles.number} aria-hidden="true">0{index + 1}</span></div>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SubpageFaq title={seo.faqTitle} items={seo.faqs} />
      <section className={styles.knowledge} aria-labelledby="service-guides-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="service-guides-title" className={styles.heading}>{de ? "Weitere Fragen?" : "More questions?"}</h2>
          <KnowledgeCards locale={locale} keys={SERVICE_GUIDES[serviceKey]} />
        </div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
