import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { headers } from "next/headers";

import { ConsentBanner } from "@/components/layout/ConsentBanner.client";
import { InitialLoader } from "@/components/layout/InitialLoader.client";
import { readLocaleFromHeaders } from "@/lib/locale-header";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
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
    >
      <body>
        <InitialLoader locale={lang} />
        <div id="site-content">{children}</div>
        <ConsentBanner locale={lang} />
      </body>
    </html>
  );
}
