import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Script from "next/script";

import { ConsentBanner } from "@/components/layout/ConsentBanner.client";
import { InitialLoader } from "@/components/layout/InitialLoader.client";
import { readLocaleFromHeaders } from "@/lib/locale-header";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

const colorModeInitScript = `
  (() => {
    const storageKey = "happyreels-color-mode";
    const colorSchemeQuery = "(prefers-color-scheme: dark)";
    let storedMode = null;

    try {
      const value = window.localStorage.getItem(storageKey);
      storedMode = value === "light" || value === "dark" ? value : null;
    } catch {
      storedMode = null;
    }

    const mode = storedMode ?? (window.matchMedia(colorSchemeQuery).matches ? "dark" : "light");

    document.documentElement.dataset.siteColorMode = mode;
    document.documentElement.style.colorScheme = mode;

    const applyModeToSite = () => {
      const siteRoot = document.querySelector(".site-variant-root");

      if (!siteRoot) return false;

      siteRoot.dataset.siteColorMode = mode;
      return true;
    };

    if (!applyModeToSite()) {
      const observer = new MutationObserver(() => {
        if (applyModeToSite()) observer.disconnect();
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  })();
`;

const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  weight: "200 800",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "happyreels",
  title: {
    default: "happyreels | Social-first Videoproduktion",
    template: "%s | happyreels",
  },
  description:
    "Social-first Videoproduktion für Creator und Marken. Shortform Editing, YouTube und Filmproduktion mit filmischem Anspruch.",
  authors: [{ name: "Simon Saad" }],
  creator: "HappyReels",
  publisher: "HappyReels",
  category: "Video production",
  icons: {
    icon: [{ url: "/assets/logo/happyreels-logo.svg", type: "image/svg+xml" }],
    apple: "/assets/logo/happyreelslogoyellow.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const lang = readLocaleFromHeaders(headerList.get("x-locale"));

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${instrumentSerif.variable}`}
      data-site-intro=""
      suppressHydrationWarning
    >
      <body>
        <Script
          id="happyreels-color-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: colorModeInitScript }}
        />
        <InitialLoader locale={lang} />
        <div id="site-content">{children}</div>
        <ConsentBanner locale={lang} />
      </body>
    </html>
  );
}
