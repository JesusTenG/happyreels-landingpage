import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { getReelVideosById } from "@/data/reel-videos";
import {
  getServiceContent,
  serviceKeys,
  type ServiceLandingContent,
} from "@/data/service-content";
import { getServiceSeoContent } from "@/data/service-seo-content";
import type { Locale } from "@/i18n/config";
import { stripTrailingHeadingPeriod } from "@/lib/heading-text";
import {
  getServicePath,
  getServicesPath,
  type ServiceKey,
} from "@/lib/route-config";

import styles from "./ServiceLandingPageV2.module.css";

type Props = Readonly<{
  locale: Locale;
  serviceKey: ServiceKey;
  content: ServiceLandingContent;
}>;

export function ServiceLandingPage({ locale, serviceKey, content }: Props) {
  const home = `/${locale}`;
  const serviceCollectionLabel = locale === "de" ? "Leistungen" : "Services";
  const serviceCollectionHref = getServicesPath(locale);
  const seoContent = getServiceSeoContent(serviceKey, locale);
  const proofVideos = getReelVideosById(locale, seoContent.proofVideoIds);
  const relatedServices = serviceKeys.filter((key) => key !== serviceKey);

  return (
    <main id="main-content" className={styles.main}>
      <section
        className={styles.hero}
        aria-labelledby="service-title"
        data-navbar-theme="brown"
        data-navbar-hero="collapsing"
      >
        <Reveal className={`container-base ${styles.heroInner}`}>
          <Link className={styles.backLink} href={serviceCollectionHref}>
            <span aria-hidden="true">←</span> {serviceCollectionLabel}
          </Link>
          <div className={styles.heroCopy}>
            <h1 id="service-title">{content.h1}</h1>
            <p className={styles.lead}>{content.lead}</p>
          </div>
        </Reveal>
      </section>

      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />

      <section className={styles.overview} data-navbar-theme="brown">
        <div className={`container-base ${styles.overviewGrid}`}>
          <Reveal>
            <h2>{content.overviewTitle}</h2>
            <p>{content.overviewBody}</p>
          </Reveal>
          <Reveal className={styles.approachCard} delay={120} direction="right">
            <h2>{content.approachTitle}</h2>
            <p>{content.approachBody}</p>
          </Reveal>
        </div>

        <div className={`container-base ${styles.listsGrid}`}>
          <Reveal className={styles.listCard}>
            <h2>{content.useCasesTitle}</h2>
            <ul>{content.useCases.map((item) => <li key={item}>{item}</li>)}</ul>
          </Reveal>
          <Reveal className={`${styles.listCard} ${styles.formatsCard}`} delay={100}>
            <h2>{content.formatsTitle}</h2>
            <ul>{content.formats.map((item) => <li key={item}>{item}</li>)}</ul>
          </Reveal>
        </div>

        <div className={`container-base ${styles.detailsBlock}`}>
          <Reveal className={styles.detailsHeader}>
            <h2>{seoContent.detailsTitle}</h2>
            <p>{seoContent.detailsIntro}</p>
          </Reveal>
          <div className={styles.detailsGrid}>
            {seoContent.details.map((detail, index) => (
              <Reveal key={detail.title} delay={80 + index * 70}>
                <article>
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-deep)" flip />

      <section className={styles.process} aria-labelledby="service-process-title" data-navbar-theme="rose">
        <div className={`container-base ${styles.processGrid}`}>
          <Reveal className={styles.processIntro}>
            <h2 id="service-process-title">{content.processTitle}</h2>
            <p>{content.processIntro}</p>
          </Reveal>
          <ol className={styles.steps}>
            {content.processSteps.map((step, index) => (
              <Reveal key={step.title} delay={90 + index * 70}>
                <li>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-deep)" to="var(--subpage-bg-base)" />

      <section className={styles.proof} aria-labelledby="service-proof-title" data-navbar-theme="brown">
        <div className="container-base">
          <Reveal className={styles.proofHeader}>
            <h2 id="service-proof-title">{seoContent.proofTitle}</h2>
            <p>{seoContent.proofIntro}</p>
          </Reveal>
          <WorkVideoGallery items={proofVideos} gridClassName={styles.proofGrid} />
          <Reveal className={styles.expertise}>
            <div>
              <h3>{stripTrailingHeadingPeriod(seoContent.expertiseTitle)}</h3>
              <p>{seoContent.expertiseBody}</p>
            </div>
            <Link href={`${home}/about`}>{seoContent.expertiseLinkLabel}<span aria-hidden="true"> ↗</span></Link>
          </Reveal>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-soft)" flip />

      <section className={styles.faq} aria-labelledby="service-faq-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.faqLayout}`}>
          <Reveal className={styles.faqHeader}>
            <h2 id="service-faq-title">{seoContent.faqTitle}</h2>
          </Reveal>
          <div className={styles.faqList}>
            {seoContent.faqs.map((item, index) => (
              <Reveal key={item.question} delay={60 + index * 45}>
                <details className={styles.faqItem}>
                  <summary>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-strong)" />

      <section className={styles.related} aria-labelledby="related-services-title" data-navbar-theme="brown">
        <div className="container-base">
          <Reveal><h2 id="related-services-title">{content.relatedTitle}</h2></Reveal>
          <div className={styles.relatedGrid}>
            {relatedServices.map((key, index) => {
              const related = getServiceContent(key, locale);
              return (
                <Reveal key={key} delay={80 + index * 70}>
                  <Link href={getServicePath(locale, key)}>
                    <span>{related.navTitle}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-strong)" to="var(--subpage-bg-cta)" flip />

      <section className={styles.cta} aria-labelledby="service-cta-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.ctaInner}`}>
          <div>
            <h2 id="service-cta-title">{content.ctaTitle}</h2>
            <p>{content.ctaBody}</p>
          </div>
          <div className={styles.ctaActions}>
            <HappyReelsButton href={`${home}#contact`} variant="on-yellow">{content.ctaLabel}</HappyReelsButton>
            <Link href={home}>{content.homeLabel}</Link>
          </div>
        </Reveal>
      </section>

      <SectionWave from="var(--subpage-bg-cta)" to="var(--subpage-bg-footer)" />
    </main>
  );
}
