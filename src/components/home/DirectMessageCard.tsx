import { Instagram, MessageCircle } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
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

  return (
    <aside className={styles.card} aria-labelledby="direct-message-title">
      <h3 id="direct-message-title">
        <MixedHeadline
          text={locale === "de" ? "Lieber direkt schreiben?" : "Prefer a direct message?"}
          tone="gold"
        />
      </h3>
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
