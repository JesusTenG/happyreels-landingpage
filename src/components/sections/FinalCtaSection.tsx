import { Instagram } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  buildWhatsAppUrl,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY_NUMBER,
} from "@/lib/site";

import { ContactForm } from "./ContactForm.client";
import editorialLayout from "./editorialLayout.module.css";
import shellStyles from "./SectionShell.module.css";
import styles from "./FinalCtaSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
  locale: Locale;
}>;

function WhatsAppIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FinalCtaSection({ dict, locale }: Props) {
  const { contact } = dict;
  const { info } = contact;
  const whatsAppUrl = buildWhatsAppUrl();

  return (
    <section
      id="contact"
      className={`${shellStyles.shell} section-flow section-flow--crescendo`}
      aria-labelledby="contact-section-title"
    >
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}>
        <div className={styles["contact-section__panel"]}>
          <div className={styles["contact-section__panel-body"]}>
            <div className={styles["contact-section__left"]}>
              <div className={styles["contact-section__copy"]}>
                <h2 id="contact-section-title" className={styles["contact-section__title"]}>
                  {contact.title}
                </h2>
                <p>{info.body}</p>
              </div>

              <div className={styles["contact-section__channels"]}>
                <p className={styles["contact-section__channels-intro"]}>{info.channelsIntro}</p>
                <div className={styles["contact-section__channels-row"]}>
                  {whatsAppUrl ? (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles["contact-section__channel"]} ${styles["contact-section__channel--whatsapp"]}`}
                      aria-label={`${info.whatsAppLabel}: ${WHATSAPP_DISPLAY_NUMBER}`}
                    >
                      <WhatsAppIcon className={styles["contact-section__channel-icon"]} />
                      <span className={styles["contact-section__channel-label"]}>
                        {info.whatsAppLabel}
                      </span>
                      <span className={styles["contact-section__channel-number"]}>
                        {WHATSAPP_DISPLAY_NUMBER}
                      </span>
                    </a>
                  ) : null}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles["contact-section__channel"]} ${styles["contact-section__channel--instagram"]}`}
                    aria-label={`${info.instagramLabel}: ${INSTAGRAM_HANDLE}`}
                  >
                    <Instagram
                      className={styles["contact-section__channel-icon"]}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className={styles["contact-section__channel-label"]}>
                      {info.instagramLabel}
                    </span>
                    <span className={styles["contact-section__channel-number"]}>
                      {INSTAGRAM_HANDLE}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles["contact-section__form-col"]}>
              <ContactForm form={contact.form} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
