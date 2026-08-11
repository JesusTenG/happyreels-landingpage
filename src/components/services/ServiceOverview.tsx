import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { getServiceContent, serviceKeys } from "@/data/service-content";
import { getServiceSeoContent } from "@/data/service-seo-content";
import type { Locale } from "@/i18n/config";
import { getServicePath } from "@/lib/route-config";

import styles from "./ServiceOverview.module.css";

const COPY = {
  de: {
    eyebrow: "Leistungen von HappyReels",
    title: "Videoproduktion und Video Editing für Social Media und YouTube.",
    titleHighlight: "Video Editing",
    intro:
      "Von Konzept und Dreh über Reels, Long-Form Editing und Motion Design bis zum finalen Master: Wähle den Einstieg, der zu deinem Material und Ziel passt.",
    cardLink: "Leistung im Detail",
    chooserTitle: "Welche Leistung passt zu deinem Projekt?",
    chooserHighlight: "zu deinem Projekt",
    chooserIntro:
      "Nicht jedes Projekt beginnt an derselben Stelle. Diese vier Situationen führen direkt zur passenden Leistung.",
    choices: [
      "Du brauchst Konzept, Planung und einen professionellen Videodreh.",
      "Du hast Rohmaterial und möchtest Reels oder Shorts schneiden lassen.",
      "Du planst ein längeres YouTube-Video, einen Podcast oder Educational Content.",
      "Der Edit steht und braucht Motion Design, Farbe, Sound oder ein finales Finish.",
    ],
    ctaTitle: "Noch nicht sicher, welcher Umfang sinnvoll ist?",
    ctaBody:
      "Beschreibe kurz Ziel, Material und Plattform. Wir ordnen gemeinsam ein, welche Leistung und welche Deliverables wirklich gebraucht werden.",
    ctaLabel: "Projekt einordnen",
  },
  en: {
    eyebrow: "HappyReels services",
    title: "Video production and video editing for social media and YouTube.",
    titleHighlight: "video editing",
    intro:
      "From concept and filming to reels, long-form editing, motion design and final mastering: choose the starting point that matches your footage and goal.",
    cardLink: "Explore the service",
    chooserTitle: "Which service fits your project?",
    chooserHighlight: "fits your project",
    chooserIntro:
      "Not every project begins at the same stage. These four situations lead directly to the appropriate service.",
    choices: [
      "You need a concept, production planning and a professional video shoot.",
      "You have raw footage and need Reels or Shorts edited.",
      "You are planning a longer YouTube video, podcast or educational format.",
      "The edit is in place and needs motion design, color, sound or final finishing.",
    ],
    ctaTitle: "Not sure which scope makes sense yet?",
    ctaBody:
      "Briefly describe the goal, footage and platform. We can identify which service and deliverables are actually required.",
    ctaLabel: "Discuss the project",
  },
} as const;

export function ServiceOverview({ locale }: Readonly<{ locale: Locale }>) {
  const copy = COPY[locale];
  const home = `/${locale}`;

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} aria-labelledby="services-overview-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.heroInner}`}>
          <nav className={styles.breadcrumbs} aria-label={locale === "de" ? "Brotkrümelnavigation" : "Breadcrumb"}>
            <ol>
              <li><Link href={home}>{locale === "de" ? "Start" : "Home"}</Link></li>
              <li aria-current="page">{locale === "de" ? "Leistungen" : "Services"}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="services-overview-title">
            <MixedHeadline text={copy.title} highlight={copy.titleHighlight} />
          </h1>
          <p className={styles.lead}>{copy.intro}</p>
        </Reveal>
      </section>

      <SectionWave from="var(--color-dusty-blush)" to="var(--color-petal-white)" />

      <section className={styles.services} aria-label={locale === "de" ? "Alle Leistungen" : "All services"} data-navbar-theme="brown">
        <div className={`container-base ${styles.serviceGrid}`}>
          {serviceKeys.map((key, index) => {
            const service = getServiceContent(key, locale);
            const seo = getServiceSeoContent(key, locale);
            return (
              <Reveal key={key} delay={70 + index * 65}>
                <Link className={styles.serviceCard} href={getServicePath(locale, key)} data-card={index + 1}>
                  <span className={styles.cardNumber} aria-hidden="true">0{index + 1}</span>
                  <div>
                    <p>{seo.searchLabel}</p>
                    <h2>{service.navTitle}</h2>
                    <span>{service.lead}</span>
                  </div>
                  <strong>{copy.cardLink}<span aria-hidden="true"> ↗</span></strong>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionWave from="var(--color-petal-white)" to="var(--color-cocoa-ink)" flip />

      <section className={styles.chooser} aria-labelledby="service-chooser-title" data-navbar-theme="rose">
        <div className={`container-base ${styles.chooserLayout}`}>
          <Reveal className={styles.chooserHeader}>
            <h2 id="service-chooser-title"><MixedHeadline text={copy.chooserTitle} highlight={copy.chooserHighlight} tone="gold" /></h2>
            <p>{copy.chooserIntro}</p>
          </Reveal>
          <div className={styles.choiceList}>
            {serviceKeys.map((key, index) => (
              <Reveal key={key} delay={70 + index * 55}>
                <Link href={getServicePath(locale, key)}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <p>{copy.choices[index]}</p>
                  <strong>{getServiceContent(key, locale).navTitle}<span aria-hidden="true"> ↗</span></strong>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-happy-gold)" />

      <section className={styles.cta} aria-labelledby="services-cta-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.ctaInner}`}>
          <div>
            <h2 id="services-cta-title"><MixedHeadline text={copy.ctaTitle} /></h2>
            <p>{copy.ctaBody}</p>
          </div>
          <HappyReelsButton href={`${home}#contact`} variant="on-yellow">{copy.ctaLabel}</HappyReelsButton>
        </Reveal>
      </section>

      <SectionWave from="var(--color-happy-gold)" to="var(--color-cocoa-ink)" />
    </main>
  );
}
