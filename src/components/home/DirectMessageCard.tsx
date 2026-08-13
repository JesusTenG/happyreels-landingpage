import { Instagram, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY_NUMBER,
  buildWhatsAppUrl,
} from "@/lib/site";

import styles from "./DirectMessageCard.module.css";

type Props = Readonly<{ locale: Locale }>;

export function DirectMessageCard({ locale }: Props) {
  const whatsAppUrl = buildWhatsAppUrl();
  const copy = locale === "de"
    ? {
        titleLineOne: "Lieber direkt",
        titleLineTwo: "mit uns sprechen?",
        body: "Schreib uns einfach auf WhatsApp oder Instagram.",
      }
    : {
        titleLineOne: "Prefer to speak",
        titleLineTwo: "with us directly?",
        body: "Just message us on WhatsApp or Instagram.",
      };

  return (
    <aside
      className={styles.card}
      aria-labelledby="direct-message-title"
      data-direct-message-card
    >
      <h3 id="direct-message-title">
        <span>{copy.titleLineOne}</span>
        <span>{copy.titleLineTwo}</span>
      </h3>
      <p className={styles.body}>{copy.body}</p>
      <div className={styles.links}>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-channel="instagram"
          aria-label={`${locale === "de" ? "Instagram öffnen" : "Open Instagram"}: ${INSTAGRAM_HANDLE}`}
        >
          <span className={styles.icon}><Instagram aria-hidden="true" /></span>
          <span className={styles.channelCopy}>
            <strong>Instagram</strong>
            <small>{INSTAGRAM_HANDLE}</small>
          </span>
        </a>
        {whatsAppUrl ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-channel="whatsapp"
            aria-label={`${locale === "de" ? "WhatsApp-Chat öffnen" : "Open WhatsApp chat"}: ${WHATSAPP_DISPLAY_NUMBER}`}
          >
            <span className={styles.icon}><MessageCircle aria-hidden="true" /></span>
            <span className={styles.channelCopy}>
              <strong>WhatsApp</strong>
              <small>{WHATSAPP_DISPLAY_NUMBER}</small>
            </span>
          </a>
        ) : null}
      </div>
    </aside>
  );
}
