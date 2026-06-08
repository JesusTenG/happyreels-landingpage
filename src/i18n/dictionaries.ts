import type { Locale } from "./config";

export type WorkVideoItem = {
  title: string;
  description: string;
  posterSrc: string;
  previewSrc: string;
  lightboxSrc: string;
  alt: string;
  videoAriaLabel: string;
  /** Links this portfolio clip to a collaboration case page. */
  caseSlug?: string;
};

export type ImpactSnapshotCardIcon = "eye" | "heart" | "message" | "share2";

export type ImpactSnapshotCardDict = {
  label: string;
  targetValue: number;
  decimals: number;
  suffix: string;
  icon: ImpactSnapshotCardIcon;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    wordmark: string;
    logoTop: string;
    logoBottom: string;
    links: {
      work: string;
      services: string;
      process: string;
      contact: string;
    };
    cta: string;
    langSwitchLabel: string;
    heroVideoPreviewToggle: string;
    heroImageToggle: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
    seoH1: string;
    services: string[];
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    scrollLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
      icon: "smartphone" | "monitor-play" | "megaphone" | "camera";
    }>;
  };
  approach: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    principles: Array<{
      title: string;
      description: string;
      icon: "timer" | "palette" | "list-checks";
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{
      title: string;
      description: string;
      icon: "send" | "scissors" | "message-circle" | "package-check";
    }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string }>;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    items: WorkVideoItem[];
    moreItems: WorkVideoItem[];
    viewMoreWork: string;
    showLessWork: string;
    collaborationsCtaLabel: string;
    collaborationsCtaHref: string;
  };
  impactSnapshot: {
    ariaLabel: string;
    statementLines: readonly [string, string, string];
    ctaLabel: string;
    ctaHref: string;
    cards: ImpactSnapshotCardDict[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  clientStories: {
    eyebrow: string;
    title: string;
    intro: string;
    learnMore: string;
  };
  clientStoryDetail: {
    back: string;
    pageTitle: string;
    testimonialAriaLabel: string;
    publishedEditsHeading: string;
    publishedEditsIntro: string;
    ctaHeadline: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    title: string;
    info: {
      body: string;
      channelsIntro: string;
      whatsAppLabel: string;
      instagramLabel: string;
    };
    form: {
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
    tagline: string;
    copyright: string;
    instagramLabel: string;
    columns: {
      navigation: string;
      contact: string;
      legal: string;
    };
    links: {
      services: string;
      work: string;
      process: string;
      approach: string;
      testimonials: string;
      collaborations: string;
      impact: string;
      faq: string;
      contact: string;
      impressum: string;
      datenschutz: string;
    };
  };
  legal: {
    impressum: { title: string; sections: Array<{ heading: string; body: string }> };
    datenschutz: { title: string; sections: Array<{ heading: string; body: string }> };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Simon Saad Visuals — High Impact Video Editing for Brands & Creators",
      description:
        "Premium video editing and production for brands and creators in Germany — reels, YouTube, ads and filming. Remote collaborations nationwide.",
    },
    nav: {
      wordmark: "Simon Saad Visuals",
      logoTop: "SIMON SAAD",
      logoBottom: "VISUALS",
      links: {
        work: "WORK",
        services: "SERVICES",
        process: "PROCESS",
        contact: "CONTACT",
      },
      cta: "SEND INQUIRY",
      langSwitchLabel: "DE",
      heroVideoPreviewToggle: "Video Preview",
      heroImageToggle: "Image Hero",
    },
    hero: {
      eyebrow: "SIMON SAAD",
      headline: "VISUALS",
      subline: "FOR BRANDS & CREATORS",
      seoH1:
        "High Impact Video Editing for Brands and Creators — Simon Saad Visuals",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "REQUEST PROJECT",
      primaryCtaHref: "#contact",
      secondaryCta: "VIEW WORK",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      eyebrow: "SERVICES",
      title: "Turning raw footage\ninto clear content",
      intro:
        "Reels, TikToks, YouTube videos, ads and filming. Precisely edited, clearly structured and produced with a high-end finish.",
      items: [
        {
          title: "Shortform Editing",
          description:
            "Reels, TikToks and YouTube Shorts with a strong hook, fast pacing and a look that sticks in the feed.",
          icon: "smartphone",
        },
        {
          title: "YouTube & Longform",
          description:
            "Longer videos, interviews, episodes, trailers and podcast formats with clear structure, clean flow and precise viewer guidance.",
          icon: "monitor-play",
        },
        {
          title: "Ad Videos",
          description:
            "Ads and product videos with a strong opening, clear message and editing that turns attention into action.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "Filming for brands and creators with planned shots, clean footage and a look that can be shaped into strong final content.",
          icon: "camera",
        },
      ],
    },
    approach: {
      eyebrow: "Approach",
      title: "For content that feels like a brand.",
      subtitle:
        "Not every clip needs more effects. Often it needs better timing, stronger structure and an editor who understands where the brand is heading.",
      body: "Simon Saad Visuals creates social content that is not just cut fast, but built with intent: a clear hook, sharp pacing, a cohesive look and a strong sense for the brand behind the video. The goal is not loud editing for the sake of it, but content that feels premium and works on the right platforms.",
      principles: [
        {
          title: "Timing over guesswork",
          description:
            "Cuts, rhythm and hooks are shaped to make content land quickly while still feeling premium.",
          icon: "timer",
        },
        {
          title: "A look with direction",
          description:
            "Color, music, typography and editing style are aligned with the brand, audience and platform.",
          icon: "palette",
        },
        {
          title: "A clear process",
          description:
            "Structured communication, clean handoffs and reliable execution instead of chaotic freelancer roulette.",
          icon: "list-checks",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "How it works",
      intro:
        "A clear path from your first message to the finished export, structured for premium collaborations with creators and brands.",
      steps: [
        {
          title: "Project inquiry",
          description:
            "You share your goal, formats, references and timeline. We align on scope and direction before editing begins.",
          icon: "send",
        },
        {
          title: "Edit & direction",
          description:
            "Simon shapes pacing, structure and visual direction with a story-first, platform-aware edit aligned to your brand.",
          icon: "scissors",
        },
        {
          title: "Feedback rounds",
          description:
            "Focused revision loops with clear notes. Fewer rounds, stronger results, no chaotic back-and-forth.",
          icon: "message-circle",
        },
        {
          title: "Delivery",
          description:
            "Final exports optimized for your platforms, ready to publish, post or run as ads.",
          icon: "package-check",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions.",
      intro:
        "Short answers about process, footage, pricing and long-term collaborations.",
      items: [
        {
          question: "What type of videos does Simon Saad Visuals edit?",
          answer:
            "Simon Saad Visuals edits social ads, reels, shorts, TikToks, YouTube content and campaign visuals for creators, brands and agencies. The focus is on premium social content with a clear hook, sharp pacing and an on-brand look.",
        },
        {
          question: "Who is the collaboration for?",
          answer:
            "The collaboration is built for creators, personal brands, companies and agencies that want to publish high-quality social content regularly. It is especially useful when raw footage needs to become a clear, professional and recognizable visual presence.",
        },
        {
          question: "How does a project work?",
          answer:
            "Every project starts with the goal, platform, visual direction and available footage. After that, a first edit is created around timing, story, hook and look. Feedback is handled in a structured way until the clip is ready to publish.",
        },
        {
          question: "What do I need to provide for the edit?",
          answer:
            "Raw footage, desired format, platform, video goal and, if available, references, brand assets, music directions or existing captions are needed. The clearer the direction, the more efficient the edit becomes.",
        },
        {
          question: "How long does a video edit take?",
          answer:
            "It depends on the scope. A single social edit can often be delivered much faster than a larger campaign package or a YouTube video. After reviewing the footage, the timeline can be estimated realistically.",
        },
        {
          question: "Are long-term collaborations possible?",
          answer:
            "Yes. In addition to single projects, recurring collaborations are possible for creators, brands or agencies with regular content needs. This creates a consistent look, faster workflows and a better understanding of the brand and audience.",
        },
        {
          question: "How much does a video editing project cost?",
          answer:
            "Single reels start at €80 per reel. The final price depends on scope, raw footage, length, editing depth, platform and deadline. Social ads, YouTube videos, campaign packages and long-term collaborations are priced individually.",
        },
      ],
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "What Great Editing\nMakes Visible",
      intro:
        "A first look at pacing, rhythm and visual direction across social edits, brand content and creator videos.",
      collaborationsCtaLabel: "View deeper collaborations",
      collaborationsCtaHref: "#collaborations",
      viewMoreWork: "View more",
      showLessWork: "Show less",
      items: [
        {
          title: "Prep My Meal Ad",
          description:
            "Commercial edit for @prepmymeal with @leon.haegele, shaped as a clean social ad for the feed.",
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Poster frame for Prep My Meal commercial edit by Simon Saad Visuals",
          videoAriaLabel: "Open Prep My Meal commercial edit",
        },
        {
          title: "Educational Reel",
          description:
            "Meal plan content with @ramonlimacher, edited into a clear and calm educational reel.",
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Poster frame for educational meal plan reel",
          videoAriaLabel: "Open educational meal plan reel",
        },
        {
          title: "Cinematic Gym Edit",
          description:
            "Cinematic edit with @leon.haegele, focused on gym atmosphere, movement and a premium look.",
          posterSrc: "/assets/clients/leon-haegele-hd.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Poster frame for cinematic gym edit with Leon Hägele",
          videoAriaLabel: "Open cinematic gym edit",
        },
      ],
      moreItems: [
        {
          title: "Kool Savas × Ayo Reel",
          description:
            "Social ad for Kool Savas and Ayo with a fast hook, clear visual rhythm and brand-ready pacing for the feed.",
          posterSrc: "/assets/videos/posters/savas/AYO X KOOLSAVAS-poster.webp",
          previewSrc: "/assets/videos/preview/savas/AYO X KOOLSAVAS-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/savas/AYO X KOOLSAVAS-lightbox.mp4",
          alt: "Poster frame for Kool Savas and Ayo social ad edit by Simon Saad Visuals",
          videoAriaLabel: "Open Kool Savas and Ayo social ad edit",
        },
        {
          title: "Energy Reel",
          description: "High-energy social reel with punchy rhythm and a bold visual attitude.",
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Poster frame for energy reel edit",
          videoAriaLabel: "Open energy reel edit",
        },
        {
          title: "Podcast Trailer",
          description: "Podcast trailer with moody visuals and clean atmospheric cuts.",
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Poster frame for podcast trailer edit",
          videoAriaLabel: "Open podcast trailer edit",
        },
        {
          title: "Diamond Campaign",
          description: "Premium campaign cut built around layered reveals and controlled tension.",
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Poster frame for diamond campaign edit",
          videoAriaLabel: "Open diamond campaign edit",
        },
        {
          title: "Training Reel",
          description: "Training reel with sharp transitions and a strong gym atmosphere.",
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Poster frame for training reel edit",
          videoAriaLabel: "Open training reel edit",
        },
        {
          title: "Andreas Ad Edit",
          description:
            "Vertical social ad with a fast opening, clear visual flow and brand-ready pacing for short-form delivery.",
          posterSrc: "/assets/videos/posters/random/adres_edit-poster.webp",
          previewSrc: "/assets/videos/preview/random/adres_edit-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/adres_edit-lightbox.mp4",
          alt: "Poster frame for Andreas social ad edit by Simon Saad Visuals",
          videoAriaLabel: "Open Andreas social ad edit",
        },
        {
          title: "Creator Reel",
          description: "Creator reel with retention-focused pacing and a strong hook for social.",
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Poster frame for creator reel edit",
          videoAriaLabel: "Open creator reel edit",
        },
        {
          title: "Series Trailer",
          description: "Series trailer shaped around hooks, clarity and retention.",
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Poster frame for series trailer edit",
          videoAriaLabel: "Open series trailer edit",
        },
        {
          title: "Weekly Drop",
          description: "Weekly drop with tight turnaround and a consistent visual language.",
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Poster frame for weekly drop edit",
          videoAriaLabel: "Open weekly drop edit",
        },
        {
          title: "Episode Teaser",
          description: "Episode teaser tuned for micro-tension, rhythm and a fast hook.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Poster frame for episode teaser edit",
          videoAriaLabel: "Open episode teaser edit",
        },
        {
          title: "Episode Trailer",
          description: "Episode trailer with macro pacing for longer-form storytelling.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Poster frame for episode trailer edit",
          videoAriaLabel: "Open episode trailer edit",
        },
        {
          title: "Explain Edit",
          description: "Explain-style edit built for clarity on information-heavy visuals.",
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Poster frame for explain edit",
          videoAriaLabel: "Open explain edit video",
        },
      ],
    },
    impactSnapshot: {
      ariaLabel: "Engagement metrics — likes, views, comments and shares",
      statementLines: ["More likes.", "More views.", "More attention."] as const,
      ctaLabel: "Start your next edit",
      ctaHref: "#contact",
      cards: [
        {
          label: "Likes",
          targetValue: 892,
          decimals: 0,
          suffix: "K",
          icon: "heart",
        },
        {
          label: "Views",
          targetValue: 1.24,
          decimals: 2,
          suffix: "M",
          icon: "eye",
        },
        {
          label: "Comments",
          targetValue: 24.5,
          decimals: 1,
          suffix: "K",
          icon: "message",
        },
        {
          label: "Shares",
          targetValue: 9.4,
          decimals: 1,
          suffix: "K",
          icon: "share2",
        },
      ],
    },
    testimonials: {
      eyebrow: "TRUST",
      title: "When the edit convinces",
      intro:
        "Real feedback from creator and brand projects where rhythm, finish and reliable collaboration made the difference.",
    },
    clientStories: {
      eyebrow: "Collaborations",
      title: "Built over time.",
      intro:
        "A closer look at recurring projects, creator partnerships and published social edits.",
      learnMore: "Learn more",
    },
    clientStoryDetail: {
      back: "Back",
      pageTitle: "Inside the collaboration with {name}",
      testimonialAriaLabel: "Client testimonial",
      publishedEditsHeading: "Content created in this collaboration",
      publishedEditsIntro:
        "A selection of produced, cut and edited content from this collaboration.",
      ctaHeadline: "Want content with the same premium feel?",
      ctaBody: "Let’s talk about your next format.",
      ctaPrimary: "Send inquiry",
      ctaSecondary: "View more projects",
    },
    contact: {
      title: "Ready to collaborate?",
      info: {
        body:
          "A short message is enough: format, intended use and available footage can be included. Further details are clarified in conversation.",
        channelsIntro: "Inquiries are also welcome directly via WhatsApp or Instagram.",
        whatsAppLabel: "WhatsApp",
        instagramLabel: "Instagram",
      },
      form: {
        nameLabel: "Name",
        emailLabel: "Email address",
        messageLabel: "Message",
        namePlaceholder: "Name",
        emailPlaceholder: "email@example.com",
        messagePlaceholder:
          "Brief description: format, goal, footage and timing.",
        submit: "Send request",
        sending: "Sending…",
        success: "Your message was sent successfully.",
        errorSend:
          "Your message could not be sent right now. Please try again later or contact us directly by email.",
        errors: {
          nameRequired: "Please enter your name.",
          nameTooShort: "Please enter at least 2 characters.",
          emailRequired: "Please enter your email address.",
          emailInvalid: "Please enter a valid email address.",
          messageRequired: "Please enter a short message.",
          messageTooShort: "Please write at least 10 characters.",
        },
      },
    },
    caseDetail: {
      back: "Back to selected work",
      overviewTitle: "Project overview",
      scopeTitle: "Scope",
      roleTitle: "Role",
      platformsTitle: "Platforms",
      formatsTitle: "Formats",
      contentGridTitle: "Content from this collaboration",
      servicesLink: "View services",
      servicesHref: "#services",
      cta: "Start a project",
      ctaHref: "#contact",
    },
    footer: {
      tagline: "Premium video editing and production for brands and creators.",
      copyright: "© Simon Saad Visuals",
      instagramLabel: "@simon__saad",
      columns: {
        navigation: "Navigation",
        contact: "Contact",
        legal: "Legal",
      },
      links: {
        services: "Services",
        work: "Work",
        process: "Process",
        approach: "Approach",
        testimonials: "Testimonials",
        collaborations: "Client stories",
        impact: "Impact",
        faq: "FAQ",
        contact: "Get in touch",
        impressum: "Imprint",
        datenschutz: "Privacy",
      },
    },
    legal: {
      impressum: {
        title: "Imprint",
        sections: [
          {
            heading: "Information pursuant to § 5 TMG",
            body: "Simon Saad Visuals\n[Street and house number]\n[Postal code] [City]\nGermany\n\nContact: via Instagram @simon__saad or project inquiry on this website.\n\nResponsible for content: Simon Saad",
          },
          {
            heading: "Note",
            body: "Please replace the placeholder address with your legally required business details before publication.",
          },
        ],
      },
      datenschutz: {
        title: "Privacy Policy",
        sections: [
          {
            heading: "Overview",
            body: "This website is operated by Simon Saad Visuals. Personal data is processed only to the extent necessary to operate the site and handle project inquiries.",
          },
          {
            heading: "Hosting & server logs",
            body: "When you visit this website, the hosting provider may process technical access data (e.g. IP address, timestamp, requested URL) in server logs for security and operation.",
          },
          {
            heading: "External links",
            body: "Links to Instagram and other third-party services are subject to the privacy policies of those providers. When you follow an external link, their terms apply.",
          },
          {
            heading: "Your rights",
            body: "You may have rights of access, rectification, erasure, restriction and objection under applicable data protection law. Contact Simon Saad for requests related to this website.",
          },
          {
            heading: "Note",
            body: "This is a baseline privacy text. Please review and complete it with your hosting provider details and legal counsel before publication.",
          },
        ],
      },
    },
  },
  de: {
    meta: {
      title: "Simon Saad Visuals — Premium Video Editing für Creator & Brands",
      description:
        "Video Editing & Video Produktion in Deutschland: Reels, TikToks, YouTube, Werbevideos & Dreharbeiten für Creator, Influencer und Marken. Jetzt Projekt anfragen.",
    },
    nav: {
      wordmark: "Simon Saad Visuals",
      logoTop: "SIMON SAAD",
      logoBottom: "VISUALS",
      links: {
        work: "PROJEKTE",
        services: "LEISTUNGEN",
        process: "ABLAUF",
        contact: "KONTAKT",
      },
      cta: "ANFRAGE SENDEN",
      langSwitchLabel: "EN",
      heroVideoPreviewToggle: "Video Preview",
      heroImageToggle: "Bild-Hero",
    },
    hero: {
      eyebrow: "SIMON SAAD",
      headline: "VISUALS",
      subline: "FÜR BRANDS & CREATORS",
      seoH1:
        "Premium Video Editing für Creator und Brands — Simon Saad Visuals",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "PROJEKT ANFRAGEN",
      primaryCtaHref: "#contact",
      secondaryCta: "WORK ANSEHEN",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      eyebrow: "LEISTUNGEN",
      title: "Aus Content wird \nmessbare Wirkung",
      intro:
        "Reels, TikToks, YouTube-Videos, Werbevideos und Dreharbeiten. Präzise geschnitten, klar geführt und hochwertig umgesetzt.",
      items: [
        {
          title: "Shortform-Schnitt",
          description:
            "Reels, TikToks und YouTube Shorts mit starkem Hook, schnellem Pacing und einem Look, der im Feed hängen bleibt.",
          icon: "smartphone",
        },
        {
          title: "YouTube & Longform",
          description:
            "Längere Videos, Interviews, Episoden, Trailer und Podcast-Formate mit klarer Struktur, sauberem Flow und präziser Zuschauerführung.",
          icon: "monitor-play",
        },
        {
          title: "Werbevideos",
          description:
            "Ads und Produktvideos mit starkem Einstieg, klarer Botschaft und einem Schnitt, der Aufmerksamkeit in Handlung verwandelt.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "Dreharbeiten für Brands und Creator mit geplanten Shots, sauberem Material und einem Look, der sich stark weiterverarbeiten lässt.",
          icon: "camera",
        },
      ],
    },
    approach: {
      eyebrow: "Arbeitsweise",
      title: "Für Content, der nach Marke aussieht.",
      subtitle:
        "Nicht jeder Clip braucht mehr Effekte. Oft braucht er besseres Timing, stärkere Struktur und einen Editor, der versteht, worauf die Marke hinauswill.",
      body: "Simon Saad Visuals steht für Social-Content, der nicht nur schnell geschnitten ist, sondern bewusst aufgebaut wird: mit klarer Hook, sauberem Rhythmus, stimmigem Look und einem Gefühl für die Marke hinter dem Video. Ziel ist kein lauter Effekt-Schnitt, sondern Content, der hochwertig wirkt und auf den richtigen Plattformen funktioniert.",
      principles: [
        {
          title: "Timing statt Zufall",
          description:
            "Schnitte, Rhythmus und Hook werden so gesetzt, dass Inhalte schnell greifen und trotzdem hochwertig bleiben.",
          icon: "timer",
        },
        {
          title: "Look mit Richtung",
          description:
            "Farben, Musik, Typografie und Editing-Stil werden auf Marke, Zielgruppe und Plattform abgestimmt.",
          icon: "palette",
        },
        {
          title: "Klarer Prozess",
          description:
            "Strukturierte Kommunikation, saubere Übergaben und verlässliche Umsetzung statt chaotischer Freelancer-Lotterie.",
          icon: "list-checks",
        },
      ],
    },
    process: {
      eyebrow: "Prozess",
      title: "So läuft's ab",
      intro:
        "Ein klarer Ablauf von der ersten Nachricht bis zum finalen Export, strukturiert für Premium-Projekte mit Creators und Marken.",
      steps: [
        {
          title: "Projektanfrage",
          description:
            "Du teilst Ziel, Formate, Referenzen und Timeline. Scope und Richtung werden abgestimmt, bevor der Schnitt startet.",
          icon: "send",
        },
        {
          title: "Schnitt & Richtung",
          description:
            "Simon formt Pacing, Struktur und visuelle Richtung mit story-firstem, plattformgerechtem Schnitt und klarem Markenbezug.",
          icon: "scissors",
        },
        {
          title: "Feedback",
          description:
            "Klare Revisionsschleifen mit fokussiertem Feedback. Weniger Runden, stärkere Ergebnisse, kein endloses Hin und Her.",
          icon: "message-circle",
        },
        {
          title: "Auslieferung",
          description:
            "Finale Exporte für deine Plattformen, bereit zum Veröffentlichen, Posten oder als Ads.",
          icon: "package-check",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Häufige Fragen",
      intro:
        "Kurze Antworten zu Ablauf, Material, Kosten und langfristiger Zusammenarbeit.",
      items: [
        {
          question: "Welche Art von Videos schneidet Simon Saad Visuals?",
          answer:
            "Simon Saad Visuals schneidet Social Ads, Reels, Shorts, TikToks, YouTube-Content und Kampagnen-Visuals für Creator, Marken und Agenturen. Der Fokus liegt auf hochwertigem Social Content mit klarer Hook, sauberem Rhythmus und markentauglichem Look.",
        },
        {
          question: "Für wen ist die Zusammenarbeit geeignet?",
          answer:
            "Die Zusammenarbeit eignet sich für Creator, Personal Brands, Unternehmen und Agenturen, die regelmäßig hochwertigen Social Content veröffentlichen möchten. Besonders sinnvoll ist sie, wenn aus Rohmaterial ein klarer, professioneller und wiedererkennbarer Auftritt entstehen soll.",
        },
        {
          question: "Wie läuft ein Projekt ab?",
          answer:
            "Am Anfang stehen Ziel, Plattform, Stilrichtung und vorhandenes Material. Danach entsteht ein erster Edit, der auf Timing, Story, Hook und Look abgestimmt wird. Feedback wird strukturiert eingearbeitet, bis der Clip veröffentlichungsbereit ist.",
        },
        {
          question: "Was muss ich für den Schnitt bereitstellen?",
          answer:
            "Benötigt werden Rohmaterial, gewünschtes Format, Plattform, Ziel des Videos und wenn vorhanden Referenzen, Brand Assets, Musikvorgaben oder bestehende Captions. Je klarer die Richtung, desto effizienter wird der Schnitt.",
        },
        {
          question: "Wie lange dauert ein Video-Edit?",
          answer:
            "Das hängt vom Umfang ab. Ein einzelner Social Edit kann oft deutlich schneller umgesetzt werden als ein größeres Kampagnenpaket oder ein YouTube-Video. Nach Sichtung des Materials lässt sich der Zeitrahmen realistisch einschätzen.",
        },
        {
          question: "Sind langfristige Kooperationen möglich?",
          answer:
            "Ja. Neben einzelnen Projekten sind auch wiederkehrende Zusammenarbeiten möglich, zum Beispiel für Creator, Marken oder Agenturen mit regelmäßigem Content-Bedarf. Dadurch entstehen ein konsistenter Look, schnellere Abläufe und ein besseres Verständnis für Marke und Zielgruppe.",
        },
        {
          question: "Was kostet ein Video-Editing-Projekt?",
          answer:
            "Einzelne Reels starten ab 80 € pro Reel. Der finale Preis hängt von Umfang, Rohmaterial, Länge, Bearbeitungstiefe, Plattform und Deadline ab. Social Ads, YouTube-Videos, Kampagnenpakete und langfristige Kooperationen werden individuell kalkuliert.",
        },
      ],
    },
    work: {
      eyebrow: "AUSGEWÄHLTE ARBEIT",
      title: "Was guter Schnitt\nsichtbar macht",
      intro:
        "Ein erster Blick auf Pacing, Rhythmus und visuelle Richtung in Social Edits, Brand Content und Creator-Videos.",
      collaborationsCtaLabel: "Mehr Collaborations",
      collaborationsCtaHref: "#collaborations",
      viewMoreWork: "Mehr anzeigen",
      showLessWork: "Weniger anzeigen",
      items: [
        {
          title: "Prep My Meal Ad",
          description:
            "Commercial Edit für @prepmymeal mit @leon.haegele, umgesetzt als cleaner Social Ad für den Feed.",
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Posterbild für Prep My Meal Werbespot von Simon Saad Visuals",
          videoAriaLabel: "Prep My Meal Werbespot öffnen",
        },
        {
          title: "Educational Reel",
          description:
            "Meal-Plan-Content mit @ramonlimacher, als informatives Reel klar und ruhig aufbereitet.",
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Posterbild für Educational Meal-Plan-Reel",
          videoAriaLabel: "Educational Meal-Plan-Reel öffnen",
        },
        {
          title: "Cinematic Gym Edit",
          description:
            "Cinematic Edit mit @leon.haegele, fokussiert auf Gym-Atmosphäre, Bewegung und einen hochwertigen Look.",
          posterSrc: "/assets/clients/leon-haegele-hd.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Posterbild für Cinematic Gym Edit mit Leon Hägele",
          videoAriaLabel: "Cinematic Gym Edit öffnen",
        },
      ],
      moreItems: [
        {
          title: "Kool Savas × Ayo Reel",
          description:
            "Social Ad für Kool Savas und Ayo mit schnellem Einstieg, klarer visueller Führung und markenfähigem Schnitt für den Feed.",
          posterSrc: "/assets/videos/posters/savas/AYO X KOOLSAVAS-poster.webp",
          previewSrc: "/assets/videos/preview/savas/AYO X KOOLSAVAS-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/savas/AYO X KOOLSAVAS-lightbox.mp4",
          alt: "Posterbild für Kool Savas und Ayo Social Ad von Simon Saad Visuals",
          videoAriaLabel: "Kool Savas und Ayo Social Ad öffnen",
        },
        {
          title: "Energy Reel",
          description: "Energiegeladenes Social-Reel mit direktem Rhythmus und klarer Haltung.",
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Posterbild für Energy Reel",
          videoAriaLabel: "Energy Reel öffnen",
        },
        {
          title: "Podcast Trailer",
          description: "Podcast-Trailer mit moody Visuals und klaren atmosphärischen Cuts.",
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Posterbild für Podcast Trailer",
          videoAriaLabel: "Podcast Trailer öffnen",
        },
        {
          title: "Diamond Campaign",
          description:
            "Premium Campaign-Cut mit geschichteten Reveals und kontrollierter Spannung.",
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Posterbild für Diamond Campaign Edit",
          videoAriaLabel: "Diamond Campaign Edit öffnen",
        },
        {
          title: "Training Reel",
          description: "Training-Reel mit präzisen Übergängen und starker Gym-Atmosphäre.",
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Posterbild für Training Reel",
          videoAriaLabel: "Training Reel öffnen",
        },
        {
          title: "Andreas Ad Edit",
          description:
            "Vertikale Social Ad mit schnellem Einstieg, klarer visueller Führung und markenfähigem Schnitt für Short-Form.",
          posterSrc: "/assets/videos/posters/random/adres_edit-poster.webp",
          previewSrc: "/assets/videos/preview/random/adres_edit-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/adres_edit-lightbox.mp4",
          alt: "Posterbild für Andreas Social Ad von Simon Saad Visuals",
          videoAriaLabel: "Andreas Social Ad öffnen",
        },
        {
          title: "Creator Reel",
          description: "Creator-Reel mit retention-fokussiertem Pacing und starkem Hook für Social.",
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Posterbild für Creator Reel",
          videoAriaLabel: "Creator Reel öffnen",
        },
        {
          title: "Series Trailer",
          description: "Serien-Trailer mit klaren Hooks, Struktur und Retention.",
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Posterbild für Series Trailer",
          videoAriaLabel: "Series Trailer öffnen",
        },
        {
          title: "Weekly Drop",
          description: "Weekly Drop mit straffem Turnaround und konsistenter Bildsprache.",
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Posterbild für Weekly Drop",
          videoAriaLabel: "Weekly Drop öffnen",
        },
        {
          title: "Episode Teaser",
          description: "Episode-Teaser mit Mikro-Spannung, Rhythmus und schnellem Hook.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Posterbild für Episode Teaser",
          videoAriaLabel: "Episode Teaser öffnen",
        },
        {
          title: "Episode Trailer",
          description: "Episode-Trailer mit Makro-Pacing für längere Story-Formate.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Posterbild für Episode Trailer",
          videoAriaLabel: "Episode Trailer öffnen",
        },
        {
          title: "Explain Edit",
          description: "Explain-Edit für informationsreiche Visuals mit klarer Struktur.",
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Posterbild für Explain Edit",
          videoAriaLabel: "Explain Edit öffnen",
        },
      ],
    },
    impactSnapshot: {
      ariaLabel: "Engagement-Kennzahlen — Likes, Aufrufe, Kommentare und Shares",
      statementLines: ["Mehr Likes.", "Mehr Views.", "Mehr Wachstum."] as const,
      ctaLabel: "Jetzt Anfragen",
      ctaHref: "#contact",
      cards: [
        {
          label: "Likes",
          targetValue: 892,
          decimals: 0,
          suffix: "K",
          icon: "heart",
        },
        {
          label: "Aufrufe",
          targetValue: 1.24,
          decimals: 2,
          suffix: "M",
          icon: "eye",
        },
        {
          label: "Kommentare",
          targetValue: 24.5,
          decimals: 1,
          suffix: "K",
          icon: "message",
        },
        {
          label: "Shares",
          targetValue: 9.4,
          decimals: 1,
          suffix: "K",
          icon: "share2",
        },
      ],
    },
    testimonials: {
      eyebrow: "VERTRAUEN",
      title: "Wenn der Schnitt überzeugt",
      intro:
        "Echte Rückmeldungen aus Creator- und Brand-Projekten, in denen Rhythmus, Finish und verlässliche Zusammenarbeit zählen.",
    },
    clientStories: {
      eyebrow: "Kooperationen",
      title: "Langfristige Zusammenarbeit",
      intro:
        "Einblicke in wiederkehrende Projekte, Creator-Partnerschaften und veröffentlichte Social-Edits.",
      learnMore: "Mehr erfahren",
    },
    clientStoryDetail: {
      back: "Zurück",
      pageTitle: "Einblick in die Kooperation mit {name}",
      testimonialAriaLabel: "Kundenstimme",
      publishedEditsHeading: "Content, der in dieser Kooperation entstanden ist",
      publishedEditsIntro:
        "Eine Auswahl produzierter, geschnittener und editierter Formate aus der Zusammenarbeit.",
      ctaHeadline: "Du willst Content, der genauso hochwertig wirkt?",
      ctaBody: "Dann lass uns über dein nächstes Format sprechen.",
      ctaPrimary: "Anfrage senden",
      ctaSecondary: "Weitere Projekte ansehen",
    },
    contact: {
      title: "Bereit für Zusammenarbeit?",
      info: {
        body:
          "Eine kurze Nachricht genügt: Format, Einsatzzweck und vorhandenes Material können angegeben werden. Weitere Details werden im Gespräch geklärt.",
        channelsIntro: "Anfragen sind auch direkt per WhatsApp oder Instagram möglich.",
        whatsAppLabel: "WhatsApp",
        instagramLabel: "Instagram",
      },
      form: {
        nameLabel: "Name",
        emailLabel: "E-Mail-Adresse",
        messageLabel: "Nachricht",
        namePlaceholder: "Name",
        emailPlaceholder: "name@beispiel.de",
        messagePlaceholder:
          "Kurzbeschreibung: Format, Ziel, Material und Timing.",
        submit: "Anfrage senden",
        sending: "Wird gesendet…",
        success: "Deine Nachricht wurde erfolgreich gesendet.",
        errorSend:
          "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
        errors: {
          nameRequired: "Bitte gib deinen Namen ein.",
          nameTooShort: "Bitte mindestens 2 Zeichen eingeben.",
          emailRequired: "Bitte gib deine E-Mail-Adresse ein.",
          emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
          messageRequired: "Bitte schreib eine kurze Nachricht.",
          messageTooShort: "Bitte mindestens 10 Zeichen schreiben.",
        },
      },
    },
    caseDetail: {
      back: "Zurück zu ausgewählter Arbeit",
      overviewTitle: "Projektüberblick",
      scopeTitle: "Leistungsumfang",
      roleTitle: "Rolle",
      platformsTitle: "Plattformen",
      formatsTitle: "Formate",
      contentGridTitle: "Content aus dieser Kooperation",
      servicesLink: "Leistungen ansehen",
      servicesHref: "#services",
      cta: "Projekt starten",
      ctaHref: "#contact",
    },
    footer: {
      tagline: "Premium Video-Editing und Produktion für Brands und Creator.",
      copyright: "© Simon Saad Visuals",
      instagramLabel: "@simon__saad",
      columns: {
        navigation: "Navigation",
        contact: "Kontakt",
        legal: "Rechtliches",
      },
      links: {
        services: "Leistungen",
        work: "Projekte",
        process: "Ablauf",
        approach: "Ansatz",
        testimonials: "Stimmen",
        collaborations: "Collaborations",
        impact: "Impact",
        faq: "FAQ",
        contact: "Anfrage senden",
        impressum: "Impressum",
        datenschutz: "Datenschutz",
      },
    },
    legal: {
      impressum: {
        title: "Impressum",
        sections: [
          {
            heading: "Angaben gemäß § 5 TMG",
            body: "Simon Saad Visuals\n[Straße und Hausnummer]\n[PLZ] [Ort]\nDeutschland\n\nKontakt: über Instagram @simon__saad oder Projektanfrage über diese Website.\n\nVerantwortlich für den Inhalt: Simon Saad",
          },
          {
            heading: "Hinweis",
            body: "Bitte ersetze die Platzhalter-Adresse vor Veröffentlichung durch deine vollständigen Impressumsangaben.",
          },
        ],
      },
      datenschutz: {
        title: "Datenschutz",
        sections: [
          {
            heading: "Überblick",
            body: "Diese Website wird von Simon Saad Visuals betrieben. Personenbezogene Daten werden nur verarbeitet, soweit das für den Betrieb der Website und die Bearbeitung von Projektanfragen erforderlich ist.",
          },
          {
            heading: "Hosting & Server-Logs",
            body: "Beim Besuch der Website kann der Hosting-Anbieter technische Zugriffsdaten (z. B. IP-Adresse, Zeitstempel, aufgerufene URL) in Server-Logs für Betrieb und Sicherheit verarbeiten.",
          },
          {
            heading: "Externe Links",
            body: "Links zu Instagram und anderen Diensten unterliegen den Datenschutzbestimmungen der jeweiligen Anbieter.",
          },
          {
            heading: "Deine Rechte",
            body: "Du hast nach geltendem Datenschutzrecht u. a. Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch. Anfragen kannst du an Simon Saad richten.",
          },
          {
            heading: "Hinweis",
            body: "Dieser Text ist eine Basisversion. Bitte mit Hosting-Details und rechtlicher Prüfung vor Veröffentlichung ergänzen.",
          },
        ],
      },
    },
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
