import type { Locale } from "@/i18n/config";

const messages = {
  de: {
    success: "Deine Nachricht wurde erfolgreich gesendet.",
    validation: "Bitte prüfe deine Eingaben.",
    sendError:
      "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
  },
  en: {
    success: "Your message was sent successfully.",
    validation: "Please check your entries.",
    sendError:
      "Your message could not be sent right now. Please try again later or contact us directly by email.",
  },
} as const;

export function contactApiMessage(
  locale: Locale,
  key: keyof (typeof messages)["de"],
): string {
  return messages[locale][key];
}
