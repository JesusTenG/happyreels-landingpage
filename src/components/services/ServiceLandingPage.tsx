import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import {
  getServiceContent,
  serviceKeys,
  type ServiceLandingContent,
} from "@/data/service-content";
import type { Locale } from "@/i18n/config";
import {
  getServicePath,
  type ServiceKey,
} from "@/lib/route-config";

import styles from "./ServiceLandingPage.module.css";

type Props = Readonly<{
  locale: Locale;
  serviceKey: ServiceKey;
  content: ServiceLandingContent;
}>;

export function ServiceLandingPage({ locale, serviceKey, content }: Props) {
  const home = `/${locale}`;
  const serviceCollectionLabel = locale === "de" ? "Leistungen" : "Services";
  const relatedServices = serviceKeys.filter((key) => key !== serviceKey);

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} aria-labelledby="service-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.heroInner}`}>
          <nav className={styles.breadcrumbs} aria-label={locale === "de" ? "Brotkrümelnavigation" : "Breadcrumb"}>
            <ol>
              <li><Link href={home}>{locale === "de" ? "Start" : "Home"}</Link></li>
              <li><Link href={`${home}#services`}>{serviceCollectionLabel}</Link></li>
              <li aria-current="page">{content.navTitle}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 id="service-title"><MixedHeadline text={content.h1} /></h1>
          <p className={styles.lead}>{content.lead}</p>
        </Reveal>
      </section>

      <SectionWave from="var(--color-dusty-blush)" to="var(--color-petal-white)" />

      <section className={styles.overview} data-navbar-theme="brown">
        <div className={`container-base ${styles.overviewGrid}`}>
          <Reveal>
            <p className={styles.sectionNumber} aria-hidden="true">01</p>
            <h2><MixedHeadline text={content.overviewTitle} /></h2>
            <p>{content.overviewBody}</p>
          </Reveal>
          <Reveal className={styles.approachCard} delay={120} direction="right">
            <p className={styles.sectionNumber} aria-hidden="true">02</p>
            <h2><MixedHeadline text={content.approachTitle} /></h2>
            <p>{content.approachBody}</p>
          </Reveal>
        </div>

        <div className={`container-base ${styles.listsGrid}`}>
          <Reveal className={styles.listCard}>
            <h2><MixedHeadline text={content.useCasesTitle} /></h2>
            <ul>{content.useCases.map((item) => <li key={item}>{item}</li>)}</ul>
          </Reveal>
          <Reveal className={`${styles.listCard} ${styles.formatsCard}`} delay={100}>
            <h2><MixedHeadline text={content.formatsTitle} tone="gold" /></h2>
            <ul>{content.formats.map((item) => <li key={item}>{item}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <SectionWave from="var(--color-petal-white)" to="var(--color-cocoa-ink)" flip />

      <section className={styles.process} aria-labelledby="service-process-title" data-navbar-theme="rose">
        <div className={`container-base ${styles.processGrid}`}>
          <Reveal className={styles.processIntro}>
            <p className={styles.processEyebrow}>{locale === "de" ? "Ablauf" : "Process"}</p>
            <h2 id="service-process-title"><MixedHeadline text={content.processTitle} tone="gold" /></h2>
            <p>{content.processIntro}</p>
          </Reveal>
          <ol className={styles.steps}>
            {content.processSteps.map((step, index) => (
              <Reveal key={step.title} delay={90 + index * 70}>
                <li>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div><h3><MixedHeadline text={step.title} tone="gold" /></h3><p>{step.text}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-soft-clay)" />

      <section className={styles.related} aria-labelledby="related-services-title" data-navbar-theme="brown">
        <div className="container-base">
          <Reveal><h2 id="related-services-title"><MixedHeadline text={content.relatedTitle} /></h2></Reveal>
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

      <SectionWave from="var(--color-soft-clay)" to="var(--color-happy-gold)" flip />

      <section className={styles.cta} aria-labelledby="service-cta-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.ctaInner}`}>
          <div>
            <h2 id="service-cta-title"><MixedHeadline text={content.ctaTitle} /></h2>
            <p>{content.ctaBody}</p>
          </div>
          <div className={styles.ctaActions}>
            <HappyReelsButton href={`${home}#contact`} variant="on-yellow">{content.ctaLabel}</HappyReelsButton>
            <Link href={home}>{content.homeLabel}</Link>
          </div>
        </Reveal>
      </section>

      <SectionWave from="var(--color-happy-gold)" to="var(--color-cocoa-ink)" />
    </main>
  );
}
