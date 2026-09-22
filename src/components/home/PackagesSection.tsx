import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { contentPackages, packagesContent } from "@/data/packages-content";
import type { Locale } from "@/i18n/config";

import styles from "./PackagesSection.module.css";

type Props = Readonly<{ locale: Locale }>;

export function PackagesSection({ locale }: Props) {
  const copy = packagesContent[locale];
  const formatPrice = new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <div className={styles.frame}>
      <SectionWave from="var(--packages-previous-background)" to="var(--packages-background)" />
      <section
        id="packages"
        className={styles.section}
        aria-labelledby="packages-title"
        data-navbar-theme="brown"
        data-home-section="packages"
      >
        <div className="container-base">
          <Reveal className={styles.heading}>
            <h2 id="packages-title">
              <span className={styles.titleLead}>{copy.titleLead}</span>{" "}
              <em className={`${styles.titleAccent} hr-italic-marker`}>{copy.titleAccent}</em>
            </h2>
          </Reveal>

          <div className={styles.grid}>
            {contentPackages.map((contentPackage, index) => {
              const details = copy.packages[contentPackage.id];
              const titleId = `package-${contentPackage.id}-title`;

              return (
                <Reveal key={contentPackage.id} className={styles.cardReveal} delay={index * 100}>
                  <article
                    className={styles.card}
                    aria-labelledby={titleId}
                    data-package={contentPackage.id}
                  >
                    <header className={styles.cardHeader}>
                      <h3 id={titleId} className={styles.name}>{contentPackage.name}</h3>
                      <p className={styles.description}>{details.description}</p>
                    </header>

                    <p className={styles.price}>
                      <span className={styles.priceAmount}>
                        {contentPackage.startingAt ? (
                          <span className={styles.startingAt}>{copy.startingAt} </span>
                        ) : null}
                        <strong>{formatPrice.format(contentPackage.monthlyPrice)}</strong>
                      </span>
                      <span className={styles.period}>{copy.perMonth}</span>
                    </p>

                    <ul className={styles.deliverables} role="list">
                      <li>
                        <strong>{contentPackage.contentDays}</strong>{" "}
                        {contentPackage.contentDays === 1 ? copy.contentDay : copy.contentDays}
                      </li>
                      <li>
                        <strong>{contentPackage.videos}</strong>{" "}{copy.videos}
                      </li>
                    </ul>

                    <ul className={styles.features} role="list">
                      {details.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className={styles.closing}>
            <h3>{copy.ctaTitle}</h3>
            <HappyReelsButton href="#contact" variant="primary" className={styles.cta}>
              {copy.cta}
            </HappyReelsButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
