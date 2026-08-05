import { Reveal } from "@/components/animation/Reveal";
import {
  ScrollMotionGroup,
  ScrollMotionItem,
} from "@/components/animation/ScrollMotionGroup.client";
import { SectionWave } from "@/components/layout/SectionWave";
import { ClientCollaborationsSection } from "@/components/projects/ClientCollaborationsSection";
import { ContactForm } from "@/components/sections/ContactForm.client";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { getSectionTestimonials } from "@/content/testimonials";
import { homeContent } from "@/data/home-content";
import { getFeaturedReelVideos } from "@/data/reel-videos";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getProjectsPath } from "@/lib/route-config";

import { DirectMessageCard } from "./DirectMessageCard";
import { FAQSection } from "./FAQSection.client";
import { HeroShowcase } from "./HeroShowcase.client";
import { HomeTestimonials } from "./HomeTestimonials";
import { ReelMarquee } from "./ReelMarquee.client";
import { ResultsSection } from "./ResultsSection";
import { ServicesSection } from "./ServicesSection";
import { WaveCtaSection } from "./WaveCtaSection.client";
import styles from "./HappyReelsHome.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

const OUTCOME_MOTION = [
  { yFrom: 24, yTo: -14, scaleFrom: 0.95, scaleTo: 1.015, start: 0.02, end: 0.88 },
  { yFrom: -18, yTo: 14, scaleFrom: 0.965, scaleTo: 1.02, start: 0.08, end: 0.96 },
  { yFrom: 30, yTo: -8, scaleFrom: 0.945, scaleTo: 1.015, start: 0.04, end: 0.9 },
  { yFrom: -12, yTo: 20, scaleFrom: 0.96, scaleTo: 1.02, start: 0.1, end: 0.98 },
] as const;

export function HappyReelsHome({ locale, dict }: Props) {
  const copy = homeContent[locale];
  const testimonials = getSectionTestimonials(locale);
  const projectsHref = getProjectsPath(locale);

  return (
    <main id="main-content" className={styles.main}>
      <HeroShowcase
        locale={locale}
        ctaLabel={copy.hero.primaryCta}
        projectsHref={projectsHref}
      />

      <section id="work" className={styles.work} aria-labelledby="work-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.workHeading}`}>
          <h2 id="work-title">
            <span>{copy.work.title}</span>{" "}
            <em>{copy.work.titleAccent}</em>
          </h2>
        </Reveal>
        <div className={styles.marqueeReveal}>
          <ReelMarquee items={getFeaturedReelVideos(locale)} />
        </div>
        <Reveal className={`container-base ${styles.workAction}`} delay={180}>
          <HappyReelsButton href={projectsHref} variant="on-yellow" enableMovingBorder={false}>
            {copy.work.cta}
          </HappyReelsButton>
        </Reveal>
      </section>

      <SectionWave from="var(--color-dusty-blush)" to="var(--color-dusty-blush)" flip />

      <section className={styles.outcomes} aria-labelledby="outcomes-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.outcomesInner}`}>
          <Reveal className={styles.outcomesHeader}>
            <h2
              id="outcomes-title"
              aria-label={`${copy.outcomes.title} ${copy.outcomes.titleAccent}`}
            >
              <span>{copy.outcomes.title}</span>
              <em>{copy.outcomes.titleAccent}</em>
            </h2>
            <p>{copy.outcomes.intro}</p>
          </Reveal>

          <ScrollMotionGroup className={styles.outcomesGrid}>
            {copy.outcomes.items.map((outcome, index) => {
              const motion = OUTCOME_MOTION[index];

              return (
                <ScrollMotionItem
                  key={outcome.title}
                  className={styles.outcomeMotion}
                  yFrom={motion.yFrom}
                  yTo={motion.yTo}
                  scaleFrom={motion.scaleFrom}
                  scaleTo={motion.scaleTo}
                  start={motion.start}
                  end={motion.end}
                >
                  <Reveal className={styles.outcomeReveal} delay={90 + index * 80}>
                    <article className={styles.outcomeCard} data-outcome-card={index + 1}>
                      <h3>{outcome.title}</h3>
                      <p>{outcome.description}</p>
                    </article>
                  </Reveal>
                </ScrollMotionItem>
              );
            })}
          </ScrollMotionGroup>
        </div>
      </section>

      <WaveCtaSection locale={locale} />

      <ServicesSection locale={locale} />

      <SectionWave from="var(--color-soft-clay)" to="var(--color-soft-clay)" flip />

      <ResultsSection locale={locale} />

      <SectionWave from="var(--color-soft-clay)" to="var(--color-cocoa-ink)" />

      <section className={styles.audiences} aria-labelledby="audiences-title" data-navbar-theme="rose">
        <h2 id="audiences-title" className="sr-only">
          {locale === "de" ? "Für Creator und Marken" : "For creators and brands"}
        </h2>
        <ScrollMotionGroup className={`container-base ${styles.audienceGrid}`}>
          {copy.audiences.map((audience, index) => (
            <ScrollMotionItem
              key={audience.title}
              className={styles.audienceMotion}
              yFrom={index === 0 ? 70 : -55}
              yTo={index === 0 ? -60 : 75}
              start={index === 0 ? 0.05 : 0.12}
              end={index === 0 ? 0.92 : 1}
            >
              <Reveal delay={index * 110} direction={index === 0 ? "left" : "right"}>
                <article className={styles.audienceCard} data-tone={index + 1}>
                  <h3>{audience.title}</h3>
                  <p>{audience.statement}</p>
                  <HappyReelsButton
                    href="#contact"
                    variant={index === 0 ? "primary" : "on-yellow"}
                    enableMovingBorder={false}
                    className={styles.audienceCta}
                  >
                    {audience.linkLabel}
                  </HappyReelsButton>
                </article>
              </Reveal>
            </ScrollMotionItem>
          ))}
        </ScrollMotionGroup>
      </section>

      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-cocoa-ink)" />

      <ClientCollaborationsSection locale={locale} />

      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-soft-clay)" />

      <section id="process" className={styles.process} aria-labelledby="process-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.processInner}`}>
          <div className={styles.processHeader}>
            <Reveal><h2 id="process-title"><MixedHeadline text={copy.process.title} /></h2></Reveal>
            <Reveal delay={100}><p>{copy.process.intro}</p></Reveal>
          </div>
          <div className={styles.processCards} role="list">
            {copy.process.steps.map((step, index) => (
              <Reveal key={step.title} delay={120 + index * 90}>
                <article className={styles.processCard} data-process-card={index + 1} role="listitem">
                  <span className={styles.processNumber} aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="var(--color-soft-clay)" to="var(--color-soft-clay)" flip />
      <section className={styles.proof} aria-labelledby="proof-title" data-navbar-theme="brown">
        <div className="container-base">
          <Reveal className={styles.proofHeading}>
            <h2 id="proof-title"><MixedHeadline text={copy.proof.title} /></h2>
          </Reveal>
          <HomeTestimonials locale={locale} testimonials={testimonials} />
        </div>
      </section>
      <SectionWave from="var(--color-soft-clay)" to="var(--color-dusty-blush)" />

      <FAQSection locale={locale} />

      <SectionWave from="var(--color-dusty-blush)" to="var(--color-happy-gold)" />

      <section id="contact" className={styles.contact} aria-labelledby="contact-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.contactGrid}`}>
          <div className={styles.contactCopy}>
            <Reveal><h2 id="contact-title"><MixedHeadline text={copy.contact.title} /></h2></Reveal>
            <Reveal className={styles.directMessageReveal} delay={100}>
              <DirectMessageCard locale={locale} />
            </Reveal>
          </div>
          <div className={styles.contactForm}>
            <Reveal delay={190}><ContactForm form={dict.contact.form} locale={locale} /></Reveal>
          </div>
        </div>
      </section>

      <SectionWave from="var(--color-happy-gold)" to="var(--color-cocoa-ink)" flip />
    </main>
  );
}
