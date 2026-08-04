import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceContent } from "@/data/service-content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  findServiceKey,
  getServicePathnames,
  type ServiceKey,
} from "@/lib/route-config";
import { buildPageMetadata } from "@/lib/seo";
import { buildServiceJsonLd } from "@/lib/structured-data";

import { ServiceLandingPage } from "./ServiceLandingPage";

export function resolveServiceKey(locale: Locale, slug: string): ServiceKey {
  const serviceKey = findServiceKey(locale, slug);
  if (!serviceKey) notFound();
  return serviceKey;
}

export function buildServiceMetadata(locale: Locale, slug: string): Metadata {
  const serviceKey = resolveServiceKey(locale, slug);
  const content = getServiceContent(serviceKey, locale);

  return buildPageMetadata({
    locale,
    title: content.seoTitle,
    description: content.metaDescription,
    localizedPathnames: getServicePathnames(serviceKey),
  });
}

export async function ServiceRoute({
  locale,
  slug,
}: Readonly<{ locale: Locale; slug: string }>) {
  const serviceKey = resolveServiceKey(locale, slug);
  const content = getServiceContent(serviceKey, locale);
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={buildServiceJsonLd(locale, serviceKey, content)} />
      <Navbar locale={locale} dict={dict} />
      <ServiceLandingPage locale={locale} serviceKey={serviceKey} content={content} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
