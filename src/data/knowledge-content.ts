import type { Locale } from "@/i18n/config";
import type { KnowledgeKey, ServiceKey } from "@/lib/route-config";

export type KnowledgeSection = Readonly<{
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
}>;

export type KnowledgePageContent = Readonly<{
  metaTitle: string;
  metaDescription: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  intro: string;
  quickAnswerTitle: string;
  quickAnswer: string;
  sections: readonly KnowledgeSection[];
  faqTitle: string;
  faqs: readonly Readonly<{ question: string; answer: string }>[];
  relatedServiceKey: ServiceKey;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  hasComparison?: boolean;
  sources?: readonly Readonly<{ label: string; href: string }>[];
}>;

export const knowledgeKeys = ["colorGrading", "videoProductionCosts", "videoEditingWorkflow"] as const satisfies readonly KnowledgeKey[];

export const knowledgeImages: Record<KnowledgeKey, string> = {
  colorGrading: "/assets/hero/hero-frame-04-city-shot.webp",
  videoProductionCosts: "/assets/hero/hero-frame-02-fitness-filming.webp",
  videoEditingWorkflow: "/assets/hero/hero-frame-03-cutter-desktop.webp",
};

export const knowledgeHubCopy = {
  "de": {
    "title": "Was macht ein gutes Video aus?",
    "intro": "Produktion planen, Schnitt verstehen, Farbe beurteilen. Antworten auf die Fragen vor dem nächsten Video.",
    "sectionTitle": "Drei Themen. Klar erklärt.",
    "sectionIntro": "Was beeinflusst das Budget? Wie läuft Schnitt ab? Und was macht einen guten Look aus?",
    "ctaTitle": "Noch eine Frage zu deinem Projekt?",
    "ctaBody": "Schick uns Ziel, Plattform und vorhandenes Material. Wir besprechen den passenden Umfang.",
    "ctaLabel": "Projekt besprechen"
  },
  "en": {
    "title": "What makes a good video?",
    "intro": "Plan a production, understand the edit and assess the look. Practical answers before your next video.",
    "sectionTitle": "Three topics. Clear answers.",
    "sectionIntro": "What shapes the budget? How does editing work? And what makes a good grade?",
    "ctaTitle": "A question about your project?",
    "ctaBody": "Send your goal, platform and existing footage. We will discuss the right scope.",
    "ctaLabel": "Discuss your project"
  }
} as const;

const content: Record<KnowledgeKey, Record<Locale, KnowledgePageContent>> = {
  "colorGrading": {
    "de": {
      "metaTitle": "Was ist Color Grading? Unterschied, Ablauf & Beispiele",
      "metaDescription": "Color Grading verständlich erklärt: Unterschied zur Farbkorrektur, Vorher-Nachher-Beispiel, Materialübergabe und Antworten zu LUTs, Kosten und Grenzen.",
      "cardTitle": "Was ist Color Grading?",
      "cardSummary": "Farbkorrektur und Look im Vergleich. Mit interaktiver Vorschau.",
      "title": "Was ist Color Grading?",
      "intro": "Color Grading gestaltet die Farben eines Videos. Es schafft eine Bildstimmung und verbindet einzelne Aufnahmen zu einem einheitlichen Look.",
      "quickAnswerTitle": "Kurz erklärt",
      "quickAnswer": "Farbkorrektur gleicht Belichtung, Weißabgleich und Unterschiede zwischen Aufnahmen aus. Color Grading gestaltet darauf aufbauend den Look: etwa natürlich, warm oder kontrastreich. Beides gehört zusammen, erfüllt aber unterschiedliche Aufgaben.",
      "sections": [
        {
          "title": "Korrektur vor Look",
          "paragraphs": [
            "Ein Interview wechselt zwischen zwei Kameras: In einer Aufnahme wirkt die Haut kühl, in der anderen warm. Zuerst gleichen wir diese Unterschiede aus. Erst danach bekommt die gesamte Szene ihren Look."
          ],
          "points": [
            "Belichtung und Weißabgleich angleichen",
            "Haut- und Produktfarben prüfen",
            "Anschließende Einstellungen miteinander vergleichen"
          ]
        },
        {
          "title": "Farbe mit einer Aufgabe",
          "paragraphs": [
            "Ein Look muss zum Inhalt passen. Bei einem Interview kann natürliche Farbe die Person in den Mittelpunkt stellen. Ein Musikvideo darf stärker stilisieren. Mehr Sättigung oder Kontrast ist dabei nicht automatisch besser."
          ],
          "points": [
            "Ein bis zwei Bildreferenzen abstimmen",
            "Markenfarben und Hauttöne im Blick behalten",
            "Den Look über die ganze Szene beurteilen"
          ]
        },
        {
          "title": "Was Grading leisten kann",
          "paragraphs": [
            "Grading kann unterschiedliche Aufnahmen verbinden und den Blick durch Helligkeit und Farbe lenken. Fehlende Bildinformation ersetzt es nicht: Überbelichtete Flächen ohne Zeichnung oder unscharfe Aufnahmen lassen sich damit nicht zuverlässig retten."
          ],
          "points": [
            "Gemischte Kameras und Lichtstimmungen angleichen",
            "Einen konsistenten Look für Serien entwickeln",
            "Probleme im Ausgangsmaterial früh erkennen"
          ]
        },
        {
          "title": "Material richtig übergeben",
          "paragraphs": [
            "Am besten liegt der Schnitt bereits in seiner finalen Reihenfolge vor. Vor der Übergabe klären wir, ob Originaldateien mit Projektübergabe oder ein hochwertiger Export sinnvoll sind."
          ],
          "points": [
            "Originaldateien und Referenzvideo bereitstellen",
            "Kamera, Farbprofil und bereits angewendete LUTs nennen",
            "Schnittänderungen, Zielformat und Abgabe abstimmen"
          ]
        }
      ],
      "faqTitle": "Fragen zu Color Grading",
      "faqs": [
        {
          "question": "Was unterscheidet eine LUT von individuellem Grading?",
          "answer": "Eine LUT übersetzt Farbwerte nach einer festen Zuordnung. Sie kann eine technische Umwandlung oder einen kreativen Look unterstützen. Sie beurteilt jedoch nicht, ob eine einzelne Aufnahme zu dunkel ist oder ein Hautton angepasst werden muss. Deshalb werden Belichtung, Weißabgleich und Szenenabgleich weiterhin am jeweiligen Material kontrolliert. Eine LUT ist ein Werkzeug im Prozess, kein fertiges Grading."
        },
        {
          "question": "Ist Color Grading auch bei Handyvideos sinnvoll?",
          "answer": "Ja, wenn Licht, Belichtung und Aufnahmequalität ausreichend sind. Schon ein zurückhaltender Abgleich kann Clips aus verschiedenen Situationen besser zusammenbringen. Stark komprimierte Aufnahmen und wechselnde automatische Belichtung begrenzen allerdings den Spielraum. Vor einem größeren Auftrag lohnt sich ein Test mit repräsentativen Originalclips. So lässt sich einschätzen, welcher Look erreichbar ist und ob eine einfache Korrektur genügt."
        },
        {
          "question": "Kann ein fertiger Schnitt nachträglich gegradet werden?",
          "answer": "Ja. Ideal ist eine abgestimmte Übergabe mit Originalmedien und einer Schnittreferenz. Je nach Projekt ist auch ein hochwertiger, möglichst wenig komprimierter Export nutzbar. Eingebrannte Titel, Übergänge oder bereits angewendete Looks können die getrennte Bearbeitung erschweren. Deshalb klären wir den technischen Übergabeweg, bevor du das gesamte Material exportierst oder hochlädst."
        },
        {
          "question": "Kann Grading schlechte Belichtung reparieren?",
          "answer": "Nur soweit noch brauchbare Bildinformation vorhanden ist. Leichte Belichtungs- und Farbstiche lassen sich häufig ausgleichen. Vollständig ausgebrannte Lichter enthalten jedoch keine wiederherstellbaren Details; stark aufgehellte Schatten können Rauschen sichtbar machen. Eine Materialprüfung zeigt, welche Korrekturen möglich sind. Bei wichtigen Produkt- oder Hautfarben ist eine saubere Aufnahme die verlässlichere Grundlage."
        },
        {
          "question": "Wie viel Aufwand bedeutet Color Grading?",
          "answer": "Der Aufwand hängt nicht nur von der Filmlänge ab. Entscheidend sind die Anzahl unterschiedlicher Einstellungen, Kameras und Lichtsituationen sowie die gewünschte Bearbeitungstiefe. Ein kurzer Film mit vielen schwierigen Aufnahmen kann mehr Arbeit verursachen als ein längeres, gleichmäßig beleuchtetes Interview. Für eine Einschätzung helfen ein Referenzschnitt, einige Originalclips und ein bis zwei Look-Referenzen."
        },
        {
          "question": "Warum sieht das Video auf jedem Display etwas anders aus?",
          "answer": "Displays unterscheiden sich in Helligkeit, Farbdarstellung und Einstellungen. Auch HDR-Wiedergabe, Nachtmodi und die Verarbeitung durch Plattformen können den Eindruck verändern. Für die Abnahme sollten deshalb Zielfarbraum und Export feststehen und störende Displaymodi ausgeschaltet sein. Eine zusätzliche Kontrolle auf typischen Endgeräten ist sinnvoll, ersetzt aber keine verlässliche Referenz bei der Farbgestaltung."
        }
      ],
      "relatedServiceKey": "motionFinishing",
      "ctaTitle": "Welcher Look passt zu deinem Film?",
      "ctaBody": "Schick uns einen Beispielclip und deine Referenz. Wir prüfen, welcher Umfang sinnvoll ist.",
      "ctaLabel": "Grading anfragen",
      "hasComparison": true,
      "sources": [
        {
          "label": "Adobe: Color-Correction-Workflow",
          "href": "https://helpx.adobe.com/au/premiere/desktop/correct-color/color-correction-fundamentals/color-correction-workflow.html"
        }
      ]
    },
    "en": {
      "metaTitle": "What is color grading? Correction, workflow & examples",
      "metaDescription": "Color grading explained: how it differs from correction, an interactive comparison, footage handover and practical answers about LUTs, effort and limits.",
      "cardTitle": "What is color grading?",
      "cardSummary": "Correction and creative looks compared, with an interactive preview.",
      "title": "What is color grading?",
      "intro": "Color grading shapes the colors of a video. It creates a visual mood and connects individual shots through a consistent look.",
      "quickAnswerTitle": "In brief",
      "quickAnswer": "Color correction balances exposure, white balance and differences between shots. Grading builds the look on that foundation: natural, warm or high-contrast, for example. The two work together but solve different problems.",
      "sections": [
        {
          "title": "Correction before the look",
          "paragraphs": [
            "An interview cuts between two cameras. Skin looks cool in one shot and warm in the other. First we match those differences; then we give the whole scene its intended look."
          ],
          "points": [
            "Match exposure and white balance",
            "Check skin and product colors",
            "Compare adjoining shots"
          ]
        },
        {
          "title": "Color with a purpose",
          "paragraphs": [
            "The look should fit the content. Natural color can put an interview subject first; a music video may call for stronger stylisation. More saturation or contrast is not automatically better."
          ],
          "points": [
            "Agree on one or two visual references",
            "Protect important brand and skin colors",
            "Judge the look across the full scene"
          ]
        },
        {
          "title": "What grading can do",
          "paragraphs": [
            "Grading connects different shots and directs attention through brightness and color. It cannot replace missing image information: blown highlights with no detail or out-of-focus footage cannot reliably be repaired this way."
          ],
          "points": [
            "Match cameras and lighting conditions",
            "Develop a consistent look for a series",
            "Identify limits in the source footage early"
          ]
        },
        {
          "title": "Preparing the handover",
          "paragraphs": [
            "Ideally the edit is locked before grading begins. We first agree whether original media with an edit handover or a high-quality export is the right starting point."
          ],
          "points": [
            "Provide original files and a reference edit",
            "Identify cameras, color profiles and applied LUTs",
            "Agree on edit changes, delivery format and deadline"
          ]
        }
      ],
      "faqTitle": "Color grading questions",
      "faqs": [
        {
          "question": "How is a LUT different from individual grading?",
          "answer": "A LUT maps color values using a fixed set of rules. It can support a technical conversion or a creative look. It does not assess whether a particular shot is too dark or whether a skin tone needs adjustment. Exposure, white balance and shot matching still need to be checked against the actual footage. A LUT is a tool in the process, not a finished grade."
        },
        {
          "question": "Is grading useful for phone footage?",
          "answer": "Yes, when the lighting, exposure and recording quality provide a workable starting point. Even a restrained correction can connect clips from different situations. Heavy compression and changing automatic exposure limit the available flexibility. Testing representative original clips before a larger commission helps establish what is achievable and whether a simple correction will be enough."
        },
        {
          "question": "Can an already edited video still be graded?",
          "answer": "Yes. The preferred handover includes original media and a reference edit. A high-quality, lightly compressed export may also work, depending on the project. Baked-in titles, transitions or existing looks can make separate adjustments harder. We therefore agree on the handover method before you export or upload the complete project."
        },
        {
          "question": "Can grading fix poor exposure?",
          "answer": "Only where usable image information remains. Small exposure and color shifts can often be balanced. Completely clipped highlights have no recoverable detail, while brightening deep shadows may expose noise. A footage check helps establish which corrections are realistic. Good capture remains the more reliable foundation, especially when accurate product or skin colors matter."
        },
        {
          "question": "How much work does grading involve?",
          "answer": "The running time is only one factor. The number of different shots, cameras and lighting situations matters, as does the depth of the adjustments. A short film with difficult footage can take more work than a longer, evenly lit interview. A reference cut, sample original clips and one or two look references make a scope estimate much more useful."
        },
        {
          "question": "Why does the video look different on different screens?",
          "answer": "Screens differ in brightness, color reproduction and settings. HDR playback, night modes and platform processing can also change the impression. Agree on the delivery color space and export for review, and turn off display modes that alter color. Checking typical viewing devices is helpful, but does not replace a dependable reference when making color decisions."
        }
      ],
      "relatedServiceKey": "motionFinishing",
      "ctaTitle": "Find the look for your film",
      "ctaBody": "Send a sample clip and a visual reference. We will review the scope with you.",
      "ctaLabel": "Discuss color grading",
      "hasComparison": true,
      "sources": [
        {
          "label": "Adobe: Color correction workflow",
          "href": "https://helpx.adobe.com/au/premiere/desktop/correct-color/color-correction-fundamentals/color-correction-workflow.html"
        }
      ]
    }
  },
  "videoProductionCosts": {
    "de": {
      "metaTitle": "Videoproduktion: Kosten, Budget & Angebotscheck",
      "metaDescription": "Was kostet eine Videoproduktion? Die wichtigsten Kostenfaktoren, ein konkretes Briefing-Beispiel und Tipps zum Vergleichen von Angeboten.",
      "cardTitle": "Was kostet ein Video?",
      "cardSummary": "Die Budgetfaktoren und eine Checkliste für vergleichbare Angebote.",
      "title": "Was kostet eine Videoproduktion?",
      "intro": "Der Preis folgt dem Produktionsumfang. Entscheidend sind Vorbereitung, Drehtage und Bearbeitung, nicht allein die Länge des fertigen Videos.",
      "quickAnswerTitle": "Kurz erklärt",
      "quickAnswer": "Ein belastbares Angebot benennt Konzept, Dreh, Postproduktion und die genauen Lieferdateien. Dazu gehören auch Feedbackrunden, Fremdkosten und der vereinbarte Nutzungsumfang. Ohne diese Angaben sind Pauschalpreise schwer vergleichbar.",
      "sections": [
        {
          "title": "Vorbereitung & Dreh",
          "paragraphs": [
            "Wie viele Motive, Personen und Locations braucht das Konzept? Daraus ergeben sich Planung, Crew, Technik und Zeit am Set. Ein Interview an einem Ort hat einen anderen Umfang als mehrere Szenen mit Ortswechseln."
          ],
          "points": [
            "Konzept und Drehplanung",
            "Drehtage, Team, Licht und Ton",
            "Location, Anreise und externe Leistungen"
          ]
        },
        {
          "title": "Schnitt & Varianten",
          "paragraphs": [
            "Sichtung, Schnitt, Ton, Farbe und Grafik sind eigene Arbeitsschritte. Drei eigenständige Reels benötigen andere Entscheidungen als drei Exporte desselben Films. Diese Unterscheidung sollte im Angebot stehen."
          ],
          "points": [
            "Rohmaterial und Anzahl der fertigen Videos",
            "Untertitel, Animationen und Bearbeitungstiefe",
            "Zusätzliche Sprach- und Formatversionen"
          ]
        },
        {
          "title": "Ein konkretes Briefing",
          "paragraphs": [
            "Beispiel, keine Preiszusage: ein Interview an einem Ort, eine Hauptfassung und drei kurze Clips. Dazu zwei Kameraperspektiven, Untertitel und ein vereinbarter Feedbackablauf. Das ist kalkulierbarer als die Anfrage nach „einem kurzen Video“."
          ],
          "points": [
            "Ziel, Zielgruppe und Veröffentlichungstermin",
            "Anzahl, Länge und Seitenverhältnis jeder Fassung",
            "Vorhandene Assets und ein realistischer Budgetrahmen"
          ]
        },
        {
          "title": "Angebote vergleichen",
          "paragraphs": [
            "Vergleiche denselben Leistungsumfang. Ein günstigerer Drehpreis hilft wenig, wenn benötigte Schnittfassungen oder Nebenkosten fehlen. Lass offene Punkte vor der Beauftragung schriftlich klären."
          ],
          "points": [
            "Was ist enthalten, was optional?",
            "Wie werden Zusatzaufwand und Änderungen abgestimmt?",
            "Sind Fremdkosten, Lieferdateien und Nutzungsumfang benannt?"
          ]
        }
      ],
      "faqTitle": "Fragen zu Kosten & Planung",
      "faqs": [
        {
          "question": "Warum gibt es hier keinen pauschalen Videopreis?",
          "answer": "Eine Zahl ohne definierten Umfang wäre wenig aussagekräftig. Selbst zwei gleich lange Videos können sich bei Recherche, Dreh, Materialmenge und Animation stark unterscheiden. Für einen sinnvollen Vergleich braucht es mindestens Ziel, Anzahl der Fassungen, vorhandenes Material und Termin. Auf dieser Basis lässt sich der Aufwand eingrenzen und ein konkretes Angebot erstellen."
        },
        {
          "question": "Welche Angaben braucht ihr für eine Kalkulation?",
          "answer": "Beschreibe Ziel und Zielgruppe, die geplanten Plattformen sowie Anzahl und ungefähre Länge der Videos. Nenne vorhandenes Material, mögliche Drehorte und den Veröffentlichungstermin. Ein Budgetrahmen hilft, das Konzept passend zu planen. Mit ein oder zwei Referenzen und einem Hinweis, was dir daran gefällt, lässt sich die gewünschte Bearbeitungstiefe besser einschätzen."
        },
        {
          "question": "Ist ein kürzeres Video automatisch günstiger?",
          "answer": "Nein. Ein kurzer Werbeclip mit mehreren Motiven, aufwendigem Licht und Animation kann mehr Arbeit verursachen als ein längeres Interview. Auch die Sichtung zählt: Aus mehreren Stunden Material die besten 30 Sekunden auszuwählen, braucht Zeit. Aussagekräftiger als die Endlänge sind daher Drehaufwand, Rohmaterialmenge, Gestaltungsumfang und Anzahl der Varianten."
        },
        {
          "question": "Wie kann ich das Budget sinnvoll reduzieren?",
          "answer": "Konzentriere dich auf eine klare Kernbotschaft, bündele Motive an möglichst wenigen Orten und entscheide früh über Formate. Stelle Logos, Schriften und Feedback rechtzeitig bereit. Mehrere Clips aus einem geplanten Dreh können effizient sein. Spare zuerst bei unnötigen Varianten und vermeidbaren Änderungen; unverständlicher Ton oder fehlende Kernaufnahmen lassen sich später oft nur schwer ausgleichen."
        },
        {
          "question": "Was kann zusätzliche Kosten verursachen?",
          "answer": "Typische Auslöser sind zusätzliche Drehtage, neue Motive, weitere Schnittfassungen oder größere Konzeptänderungen nach einer Freigabe. Auch Anreise, Locations und externe Leistungen können gesonderte Positionen sein. Deshalb sollte das Angebot Leistungen und Annahmen benennen. Änderungen lassen sich dann vor der Umsetzung mit ihrem Einfluss auf Budget und Termin abstimmen."
        },
        {
          "question": "Sind Rohmaterial, Projektdateien und Nutzungsrechte enthalten?",
          "answer": "Das sollte ausdrücklich im Angebot stehen. Fertige Exportdateien, Kameraoriginale und bearbeitbare Projekte sind unterschiedliche Liefergegenstände. Bei Musik, Stockmaterial oder anderen externen Assets muss der geplante Einsatz ebenfalls geklärt werden. Nenne deshalb früh, ob du organisch veröffentlichen, Werbung schalten oder Material selbst weiterbearbeiten möchtest, damit dieser Bedarf in die Vereinbarung einfließt."
        }
      ],
      "relatedServiceKey": "videoProduction",
      "ctaTitle": "Dein Projekt konkret kalkulieren",
      "ctaBody": "Ziel, Formate, Termin und vorhandenes Material reichen für den ersten Austausch.",
      "ctaLabel": "Projekt besprechen"
    },
    "en": {
      "metaTitle": "Video production costs: budget factors & quotes",
      "metaDescription": "What shapes a video production budget? Explore the main cost factors, a practical briefing example and tips for comparing production quotes.",
      "cardTitle": "What does a video cost?",
      "cardSummary": "Budget factors and a checklist for comparing production quotes.",
      "title": "What does video production cost?",
      "intro": "The price follows the production scope. Preparation, shooting and postproduction matter more than running time alone.",
      "quickAnswerTitle": "In brief",
      "quickAnswer": "A useful quote defines the concept, shoot, postproduction and exact deliverables. It also clarifies review rounds, third-party costs and the agreed usage. Without that detail, headline prices are difficult to compare.",
      "sections": [
        {
          "title": "Preparation & filming",
          "paragraphs": [
            "How many scenes, people and locations does the concept need? Those choices determine planning, crew, equipment and time on set. A single-location interview has a different scope from a shoot with several location changes."
          ],
          "points": [
            "Concept and shoot planning",
            "Shoot days, crew, lighting and audio",
            "Locations, travel and external services"
          ]
        },
        {
          "title": "Editing & versions",
          "paragraphs": [
            "Reviewing footage, editing, sound, color and graphics are separate tasks. Three standalone reels require different decisions from three exports of the same film. The quote should distinguish between them."
          ],
          "points": [
            "Raw footage and number of finished videos",
            "Captions, animation and finishing depth",
            "Additional language and aspect-ratio versions"
          ]
        },
        {
          "title": "A practical brief",
          "paragraphs": [
            "An example, not a price commitment: one interview at one location, one main film and three short clips. Add two camera angles, captions and an agreed review process. This is easier to scope than a request for “a short video”."
          ],
          "points": [
            "Goal, audience and publication date",
            "Number, length and aspect ratio of each version",
            "Existing assets and a realistic budget range"
          ]
        },
        {
          "title": "Comparing quotes",
          "paragraphs": [
            "Compare like-for-like scope. A lower shoot fee may not include the edits or external costs you need. Clarify open points in writing before commissioning the work."
          ],
          "points": [
            "What is included and what is optional?",
            "How are changes and extra work agreed?",
            "Are external costs, delivery files and usage specified?"
          ]
        }
      ],
      "faqTitle": "Budget & planning questions",
      "faqs": [
        {
          "question": "Why is there no universal video price here?",
          "answer": "A number without a defined scope would not tell you much. Videos of the same length can differ considerably in research, filming, footage volume and animation. A useful comparison needs at least the goal, number of versions, available material and deadline. Those details make it possible to narrow the scope and prepare a project-specific quote."
        },
        {
          "question": "What information is needed for an estimate?",
          "answer": "Describe your goal, audience and platforms, along with the number and approximate length of the videos. Include existing footage, possible filming locations and the intended publication date. A budget range helps shape an appropriate concept. One or two references, with a note about what you like in each, make the required editing depth easier to assess."
        },
        {
          "question": "Is a shorter video always less expensive?",
          "answer": "No. A short commercial with several setups, detailed lighting and animation can need more work than a longer interview. Footage review also matters: finding the right 30 seconds in hours of material takes time. Shoot requirements, source footage, design complexity and version count are therefore more useful cost indicators than running time alone."
        },
        {
          "question": "How can I reduce the budget sensibly?",
          "answer": "Focus on one main message, group scenes into fewer locations and decide on delivery formats early. Provide logos, fonts and feedback on time. Several clips from one planned shoot can be efficient. Start by removing unnecessary versions and avoidable changes; unclear audio or missing essential footage can be much harder to address later."
        },
        {
          "question": "What can lead to additional costs?",
          "answer": "Common triggers include extra shoot days, new scenes, additional edits or substantial concept changes after approval. Travel, locations and external services may also be separate items. A quote should therefore identify both deliverables and assumptions. Any changes can then be assessed for their impact on the budget and schedule before the work goes ahead."
        },
        {
          "question": "Are raw footage, project files and usage rights included?",
          "answer": "The quote should state this explicitly. Finished exports, camera originals and editable projects are different deliverables. Planned uses of music, stock footage and other external assets also need to be clarified. Tell us early whether you intend to publish organically, run ads or re-edit the material so those requirements can be reflected in the agreement."
        }
      ],
      "relatedServiceKey": "videoProduction",
      "ctaTitle": "Get a quote for your project",
      "ctaBody": "Start with your goal, formats, timeline and any footage you already have.",
      "ctaLabel": "Discuss your project"
    }
  },
  "videoEditingWorkflow": {
    "de": {
      "metaTitle": "Professioneller Videoschnitt: Ablauf & Materialübergabe",
      "metaDescription": "Vom Briefing zum fertigen Video: Material vorbereiten, Rohschnitt prüfen, Feedback mit Timecodes geben und die richtigen Exporte vereinbaren.",
      "cardTitle": "Wie läuft Videoschnitt ab?",
      "cardSummary": "Von der Materialübergabe bis zur Freigabe, ohne unnötige Schleifen.",
      "title": "So läuft professioneller Videoschnitt ab",
      "intro": "Ein klarer Ablauf macht aus Rohmaterial ein fertiges Video. Erst stehen Aussage und Reihenfolge, danach folgen Grafik, Ton und Farbe.",
      "quickAnswerTitle": "Kurz erklärt",
      "quickAnswer": "Der Ablauf: Briefing und Materialcheck, Rohschnitt, abgestimmtes Feedback, Feinschnitt und Finishing, anschließend technische Kontrolle und Export. Eine klare Freigabe pro Phase verhindert, dass fertige Gestaltung mehrfach neu gebaut werden muss.",
      "sections": [
        {
          "title": "Briefing & Übergabe",
          "paragraphs": [
            "Vor dem ersten Schnitt klären wir Zielgruppe, Kernaussage und Veröffentlichung. Übergebe möglichst die Originaldateien mit unveränderter Ordnerstruktur. Eine kurze Materialübersicht hilft beim Einstieg."
          ],
          "points": [
            "Video, separat aufgenommenen Ton und Markenassets sammeln",
            "Format, Länge und Veröffentlichungstermin benennen",
            "Wichtige Aussagen, Timecodes und No-Gos markieren"
          ]
        },
        {
          "title": "Rohschnitt & Struktur",
          "paragraphs": [
            "Im Rohschnitt zählen Auswahl, Reihenfolge und Tempo. Musik, Grafiken oder Farben können noch vorläufig sein. Prüfe zuerst, ob die Geschichte funktioniert und alle wichtigen Aussagen richtig wiedergegeben werden."
          ],
          "points": [
            "Ist der Einstieg verständlich?",
            "Fehlt eine wesentliche Information?",
            "Passt die Schlussaussage zum Ziel?"
          ]
        },
        {
          "title": "Feedback & Feinschnitt",
          "paragraphs": [
            "Eine gebündelte Rückmeldung ist hilfreicher als widersprüchliche Einzelkommentare. Beispiel: „Bei 00:18 den zweiten Satz kürzen, die Erklärung wiederholt sich.“ Benenne die Stelle, das Problem und möglichst das Ziel."
          ],
          "points": [
            "Feedback aller Beteiligten zusammenführen",
            "Struktur vor Detailgestaltung freigeben",
            "Neue Wünsche von vereinbarten Korrekturen unterscheiden"
          ]
        },
        {
          "title": "Finish & Auslieferung",
          "paragraphs": [
            "Nach dem Schnitt folgen die vereinbarten Untertitel, Grafiken, Ton- und Farbanpassungen. Vor der Auslieferung werden Schreibweisen, Bildränder, Ton und die einzelnen Fassungen kontrolliert."
          ],
          "points": [
            "Jede Sprach- und Formatversion separat prüfen",
            "Exportdateien eindeutig benennen",
            "Masterdateien für spätere Anpassungen aufbewahren"
          ]
        }
      ],
      "faqTitle": "Fragen zum Videoschnitt",
      "faqs": [
        {
          "question": "Welche Dateien sollte ich für den Schnitt schicken?",
          "answer": "Am besten die originalen Video- und Audiodateien sowie Logos, Schriften und vorhandene Gestaltungsvorgaben. Ergänze ein kurzes Briefing mit Ziel, Plattform und gewünschter Länge. Bei umfangreichem Material helfen markierte Aussagen oder eine Liste mit Timecodes. Stark komprimierte Messenger-Kopien sind als Schnittgrundlage weniger geeignet. Den Übertragungsweg und die Ordnerstruktur stimmen wir vorab ab."
        },
        {
          "question": "Was unterscheidet Rohschnitt und Feinschnitt?",
          "answer": "Der Rohschnitt legt fest, welche Inhalte vorkommen, in welcher Reihenfolge sie stehen und wie das Video erzählt. Der Feinschnitt präzisiert Timing, Anschlüsse und Bildauswahl. Gestaltung, Sound und Farbe kommen je nach Projekt anschließend oder teilweise parallel hinzu. Feedback zum Rohschnitt sollte deshalb zuerst die Geschichte klären und nicht vorläufige Schriftarten oder unfertige Farben bewerten."
        },
        {
          "question": "Wie gebe ich möglichst hilfreiches Feedback?",
          "answer": "Sammle die Rückmeldungen aller Entscheider in einer gemeinsamen Liste. Gib zu jedem Punkt einen Timecode und beschreibe, was verändert werden soll oder was dich stört. „Bei 00:24 ist die Erklärung zu schnell“ ist hilfreicher als „Bitte dynamischer“. Trenne notwendige Korrekturen von neuen Ideen und benenne eine Person, die die abschließende Freigabe erteilt."
        },
        {
          "question": "Wie lange dauert professioneller Videoschnitt?",
          "answer": "Das hängt von Rohmaterial, Ziellänge, Gestaltung und Anzahl der Fassungen ab. Auch die Verfügbarkeit der Feedbackgeber beeinflusst den Kalender. Mehrere Stunden Interviewmaterial benötigen einen anderen Sichtungsaufwand als eine vorsortierte Clip-Auswahl. Nach dem Materialcheck lassen sich Meilensteine für Rohschnitt, Rückmeldung und Lieferung abstimmen. Feste Veröffentlichungstermine sollten bereits im Briefing stehen."
        },
        {
          "question": "Können aus einem langen Video mehrere Reels entstehen?",
          "answer": "Ja, wenn geeignete Aussagen oder Momente vorhanden sind. Ein guter Kurzclip braucht aber einen verständlichen Einstieg und einen eigenen Abschluss. Das reine Kürzen oder vertikale Beschneiden reicht nicht immer. Auswahl, neue Bildausschnitte, Untertitel und gegebenenfalls ergänzende Bilder sind zusätzliche Arbeitsschritte. Anzahl und Umfang dieser Fassungen sollten deshalb vor dem Schnitt vereinbart werden."
        },
        {
          "question": "Was passiert bei Änderungen nach der Freigabe?",
          "answer": "Kleine Textkorrekturen und ein neuer Aufbau des Films haben sehr unterschiedliche Folgen. Eine Strukturänderung kann bereits fertige Musik, Grafik, Untertitel und Grading betreffen. Deshalb wird zuerst geprüft, welche Fassungen betroffen sind und ob sich Aufwand oder Termin ändern. Klare Freigabestufen und ein vereinbarter Korrekturumfang machen diese Abstimmung für beide Seiten nachvollziehbar."
        }
      ],
      "relatedServiceKey": "shortFormEditing",
      "ctaTitle": "Rohmaterial bereit?",
      "ctaBody": "Erzähl uns, was daraus werden soll. Gemeinsam klären wir Schnitt, Formate und Übergabe.",
      "ctaLabel": "Videoschnitt anfragen"
    },
    "en": {
      "metaTitle": "Professional video editing: workflow & footage handover",
      "metaDescription": "From brief to final video: prepare your footage, review the rough cut, give useful timecoded feedback and agree on delivery formats.",
      "cardTitle": "How does video editing work?",
      "cardSummary": "From footage handover to approval, with a clear review process.",
      "title": "How professional video editing works",
      "intro": "A clear process turns raw footage into a finished video. Message and structure come first, followed by graphics, sound and color.",
      "quickAnswerTitle": "In brief",
      "quickAnswer": "The workflow: brief and footage check, rough cut, consolidated feedback, fine cut and finishing, then technical checks and export. Clear approval at each stage helps avoid rebuilding completed design work.",
      "sections": [
        {
          "title": "Brief & handover",
          "paragraphs": [
            "Before editing begins, we clarify the audience, main message and release. Provide original files with their folder structure intact where possible. A short overview makes the material easier to navigate."
          ],
          "points": [
            "Gather video, separate audio and brand assets",
            "Define format, length and publication date",
            "Mark key statements, timecodes and exclusions"
          ]
        },
        {
          "title": "Rough cut & structure",
          "paragraphs": [
            "The rough cut establishes selection, order and pace. Music, graphics and color may still be temporary. First check that the story works and that important statements are represented accurately."
          ],
          "points": [
            "Is the opening clear?",
            "Is any essential information missing?",
            "Does the ending support the goal?"
          ]
        },
        {
          "title": "Feedback & fine cut",
          "paragraphs": [
            "One consolidated review is more helpful than conflicting individual comments. For example: “At 00:18, shorten the second sentence because it repeats the explanation.” Identify the moment, the issue and ideally the intended result."
          ],
          "points": [
            "Combine feedback from all stakeholders",
            "Approve structure before detailed design",
            "Distinguish revisions from new requirements"
          ]
        },
        {
          "title": "Finishing & delivery",
          "paragraphs": [
            "The agreed captions, graphics, sound and color work follow the edit. Spelling, framing, audio and each version are checked before delivery."
          ],
          "points": [
            "Review every language and format version",
            "Name export files clearly",
            "Keep master files for future adaptations"
          ]
        }
      ],
      "faqTitle": "Video editing questions",
      "faqs": [
        {
          "question": "Which files should I send for editing?",
          "answer": "Provide original video and audio files, logos, fonts and any existing design guidance where possible. Include a short brief covering the goal, platform and intended length. Marked statements or timecoded notes help with larger footage collections. Heavily compressed messaging-app copies are a weaker editing source. We agree on the transfer method and folder structure before the handover."
        },
        {
          "question": "How do the rough cut and fine cut differ?",
          "answer": "The rough cut establishes the content, its order and the story. The fine cut refines timing, transitions between shots and image selection. Design, sound and color follow or partly overlap, depending on the project. Rough-cut feedback should therefore focus on the narrative before judging temporary typography, placeholder music or unfinished color."
        },
        {
          "question": "How can I give useful feedback?",
          "answer": "Combine comments from all decision-makers into a single list. Give each point a timecode and describe the requested change or the problem you noticed. “At 00:24 the explanation is too fast” is more actionable than “Make it more dynamic”. Separate corrections from new ideas and identify one person who can give final approval."
        },
        {
          "question": "How long does professional editing take?",
          "answer": "The schedule depends on raw footage, target length, design work and the number of versions. Reviewer availability also affects delivery. Several hours of interviews need a different review effort from a preselected clip collection. After checking the footage, we can agree on rough-cut, feedback and delivery milestones. Include any fixed publication date in the initial brief."
        },
        {
          "question": "Can several reels come from one long video?",
          "answer": "Yes, where the material contains suitable statements or moments. A useful short clip still needs a clear opening and an ending of its own. Simply shortening the original or cropping it vertically may not be enough. Selection, reframing, captions and any supporting images are additional work. Agree on the number and scope of those versions before editing begins."
        },
        {
          "question": "What happens if I request changes after approval?",
          "answer": "A small text correction and a new story structure have very different consequences. Structural changes may affect completed music, graphics, captions and grading. We first check which versions are affected and whether the work changes the budget or deadline. Defined approval stages and an agreed revision scope make that discussion easier for everyone involved."
        }
      ],
      "relatedServiceKey": "shortFormEditing",
      "ctaTitle": "Footage ready?",
      "ctaBody": "Tell us what you want to make. We will agree on the edit, formats and handover.",
      "ctaLabel": "Discuss your edit"
    }
  }
};

export function getKnowledgeContent(key: KnowledgeKey, locale: Locale): KnowledgePageContent {
  return content[key][locale];
}
