import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, type Locale } from "@/i18n/config";
import { negotiateLocaleFromAcceptLanguage } from "@/i18n/negotiate-locale";
import { LOCALE_HEADER } from "@/lib/locale-header";
import { getProjectsPath } from "@/lib/route-config";

function localeFromPathname(pathname: string): Locale | null {
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return null;
}

const localizedEntryPaths: Record<string, Record<Locale, string>> = {
  "/about": { de: "/de/about", en: "/en/about" },
  "/projekte": { de: getProjectsPath("de"), en: getProjectsPath("en") },
  "/projects": { de: getProjectsPath("de"), en: getProjectsPath("en") },
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = negotiateLocaleFromAcceptLanguage(
      request.headers.get("accept-language"),
    );
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const localizedEntry = localizedEntryPaths[pathname];
  if (localizedEntry) {
    const locale = negotiateLocaleFromAcceptLanguage(
      request.headers.get("accept-language"),
    );
    const url = request.nextUrl.clone();
    url.pathname = localizedEntry[locale];
    return NextResponse.redirect(url, 308);
  }

  const locale = localeFromPathname(pathname) ?? defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/about", "/projekte", "/projects", "/de", "/de/:path*", "/en", "/en/:path*"],
};
