import { getReelVideos, type ReelVideo } from "@/data/reel-videos";
import type { Locale } from "./config";

export type WorkVideoItem = ReelVideo;

type ContactFormCopy = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  errorSend: string;
  errors: {
    nameRequired: string;
    nameTooShort: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    messageTooShort: string;
  };
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    wordmark: string;
    links: {
      work: string;
      services: string;
      process: string;
      about: string;
      faq: string;
      contact: string;
    };
    cta: string;
  };
  work: {
    items: WorkVideoItem[];
    moreItems: WorkVideoItem[];
    viewMoreWork: string;
    showLessWork: string;
  };
  clientStoryDetail: {
    back: string;
    pageTitle: string;
    testimonialAriaLabel: string;
    publishedEditsHeading: string;
    ctaHeadline: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    form: ContactFormCopy;
  };
  caseDetail: {
    back: string;
    overviewTitle: string;
    scopeTitle: string;
    roleTitle: string;
    platformsTitle: string;
    formatsTitle: string;
    contentGridTitle: string;
    servicesLink: string;
    servicesHref: string;
    cta: string;
    ctaHref: string;
  };
  footer: {
    links: {
      impressum: string;
      datenschutz: string;
    };
  };
  legal: {
    impressum: { title: string; sections: Array<{ heading: string; body: string }> };
    datenschutz: { title: string; sections: Array<{ heading: string; body: string }> };
  };
};

const enReels = getReelVideos("en");
const deReels = getReelVideos("de");

const enWork: Dictionary["work"] = {
  viewMoreWork: "View more work",
  showLessWork: "Show less",
  items: enReels.slice(0, 3),
  moreItems: enReels.slice(3, 6),
};

const deWork: Dictionary["work"] = {
  viewMoreWork: "Mehr Projekte ansehen",
  showLessWork: "Weniger anzeigen",
  items: deReels.slice(0, 3),
  moreItems: deReels.slice(3, 6),
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Social-first video production for creators and brands",
      description:
        "HappyReels creates reels, YouTube videos, commercials and brand films with cinematic craft and platform-native pacing.",
    },
    nav: {
      wordmark: "happyreels home",
      links: {
        work: "Work",
        services: "Services",
        process: "Process",
        about: "About",
        faq: "FAQ",
        contact: "Contact",
      },
      cta: "Start a project",
    },
    work: enWork,
    clientStoryDetail: {
      back: "Back to projects",
      pageTitle: "Work with {name}",
      testimonialAriaLabel: "Client feedback",
      publishedEditsHeading: "Edits that bring the collaboration to life.",
      ctaHeadline: "Ready to make your next release matter?",
      ctaBody: "Tell us what you are making and where the content needs to live.",
      ctaPrimary: "Start a project",
      ctaSecondary: "View all work",
    },
    contact: {
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Project",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@example.com",
        messagePlaceholder: "What are you planning? Which formats and platforms matter?",
        submit: "Send project request",
        sending: "Sending",
        success: "Thank you. Your request has been sent.",
        errorSend: "The request could not be sent. Please try again or use a direct contact link.",
        errors: {
          nameRequired: "Please enter your name.",
          nameTooShort: "Please enter at least two characters.",
          emailRequired: "Please enter your email address.",
          emailInvalid: "Please enter a valid email address.",
          messageRequired: "Please tell us a little about the project.",
          messageTooShort: "Please add a little more detail.",
        },
      },
    },
    caseDetail: {
      back: "Back to work",
      overviewTitle: "The project",
      scopeTitle: "Scope",
      roleTitle: "Role",
      platformsTitle: "Platforms",
      formatsTitle: "Formats",
      contentGridTitle: "The film",
      servicesLink: "Explore services",
      servicesHref: "#services",
      cta: "Start a project",
      ctaHref: "#contact",
    },
    footer: { links: { impressum: "Imprint", datenschutz: "Privacy" } },
    legal: {
      impressum: {
        title: "Imprint",
        sections: [
          {
            heading: "Service provider",
            body: "Simon Saad, trading as HappyReels\nGermany\n\nContact: Instagram @simon__saad or WhatsApp +49 1575 7826315\n\nResponsible for content: Simon Saad",
          },
        ],
      },
      datenschutz: {
        title: "Privacy Policy",
        sections: [
          {
            heading: "Overview",
            body: "HappyReels processes personal data only where it is needed to operate this website and answer project requests.",
          },
          {
            heading: "Contact form",
            body: "When you send a project request, the information you provide is used to answer your inquiry. The form includes technical spam protection and sends the message through the configured mail service.",
          },
          {
            heading: "Hosting and server logs",
            body: "The hosting provider may process technical access data such as IP address, timestamp and requested URL to operate and secure the website.",
          },
          {
            heading: "External links",
            body: "Links to Instagram and WhatsApp lead to third-party services. Their privacy terms apply after you follow a link.",
          },
          {
            heading: "Your rights",
            body: "Applicable data protection law may give you rights of access, correction, erasure, restriction and objection. Contact Simon Saad for requests related to this website.",
          },
        ],
      },
    },
  },
  de: {
    meta: {
      title: "Social-first Videoproduktion für Creator und Marken",
      description:
        "HappyReels produziert Reels, YouTube Videos, Commercials und Brand Films mit filmischem Handwerk und plattformgerechtem Pacing.",
    },
    nav: {
      wordmark: "happyreels Startseite",
      links: {
        work: "Projekte",
        services: "Leistungen",
        process: "Ablauf",
        about: "Über uns",
        faq: "FAQ",
        contact: "Kontakt",
      },
      cta: "Projekt starten",
    },
    work: deWork,
    clientStoryDetail: {
      back: "Zurück zu den Projekten",
      pageTitle: "Arbeiten mit {name}",
      testimonialAriaLabel: "Kundenstimme",
      publishedEditsHeading: "Edits, die die Zusammenarbeit sichtbar machen.",
      ctaHeadline: "Bereit für einen Release, der nachwirkt?",
      ctaBody: "Erzähl uns, was du produzierst und wo der Content erscheinen soll.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Alle Projekte ansehen",
    },
    contact: {
      form: {
        nameLabel: "Name",
        emailLabel: "E-Mail",
        messageLabel: "Projekt",
        namePlaceholder: "Dein Name",
        emailPlaceholder: "du@beispiel.de",
        messagePlaceholder: "Was planst du? Welche Formate und Plattformen sind wichtig?",
        submit: "Projektanfrage senden",
        sending: "Wird gesendet",
        success: "Danke. Deine Anfrage wurde gesendet.",
        errorSend: "Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut oder nutze einen direkten Kontaktlink.",
        errors: {
          nameRequired: "Bitte gib deinen Namen ein.",
          nameTooShort: "Bitte gib mindestens zwei Zeichen ein.",
          emailRequired: "Bitte gib deine E-Mail-Adresse ein.",
          emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
          messageRequired: "Bitte erzähl uns kurz etwas über das Projekt.",
          messageTooShort: "Bitte ergänze noch ein paar Details.",
        },
      },
    },
    caseDetail: {
      back: "Zurück zu den Projekten",
      overviewTitle: "Das Projekt",
      scopeTitle: "Umfang",
      roleTitle: "Rolle",
      platformsTitle: "Plattformen",
      formatsTitle: "Formate",
      contentGridTitle: "Der Film",
      servicesLink: "Leistungen ansehen",
      servicesHref: "#services",
      cta: "Projekt starten",
      ctaHref: "#contact",
    },
    footer: { links: { impressum: "Impressum", datenschutz: "Datenschutz" } },
    legal: {
      impressum: {
        title: "Impressum",
        sections: [
          {
            heading: "Diensteanbieter",
            body: "Simon Saad, handelnd unter HappyReels\nDeutschland\n\nKontakt: Instagram @simon__saad oder WhatsApp +49 1575 7826315\n\nVerantwortlich für den Inhalt: Simon Saad",
          },
        ],
      },
      datenschutz: {
        title: "Datenschutz",
        sections: [
          {
            heading: "Überblick",
            body: "HappyReels verarbeitet personenbezogene Daten nur, soweit sie für den Betrieb dieser Website und die Bearbeitung von Projektanfragen erforderlich sind.",
          },
          {
            heading: "Kontaktformular",
            body: "Wenn du eine Projektanfrage sendest, werden deine Angaben zur Bearbeitung der Anfrage verwendet. Das Formular nutzt technische Spam-Schutzmaßnahmen und versendet die Nachricht über den konfigurierten Maildienst.",
          },
          {
            heading: "Hosting und Server Logs",
            body: "Der Hosting-Anbieter kann technische Zugriffsdaten wie IP-Adresse, Zeitstempel und aufgerufene URL verarbeiten, um die Website zu betreiben und abzusichern.",
          },
          {
            heading: "Externe Links",
            body: "Links zu Instagram und WhatsApp führen zu Diensten Dritter. Nach dem Aufruf gelten deren Datenschutzbestimmungen.",
          },
          {
            heading: "Deine Rechte",
            body: "Das geltende Datenschutzrecht kann dir Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch geben. Anfragen zu dieser Website kannst du an Simon Saad richten.",
          },
        ],
      },
    },
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
