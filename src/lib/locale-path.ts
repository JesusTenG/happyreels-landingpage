import { isLocale, type Locale } from "@/i18n/config";
import {
  findServiceKey,
  projectSegments,
  serviceSegments,
  serviceSlugs,
} from "@/lib/route-config";

/**
 * Switches the locale segment in a pathname while preserving the rest of the path.
 * `/de/work/foo` + `en` → `/en/work/foo`
 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    const sourceLocale = segments[0];
    const section = segments[1];

    if (section === projectSegments[sourceLocale]) {
      segments[1] = projectSegments[targetLocale];
    } else if (section === serviceSegments[sourceLocale]) {
      segments[1] = serviceSegments[targetLocale];
      const serviceKey = segments[2]
        ? findServiceKey(sourceLocale, segments[2])
        : undefined;
      if (serviceKey) segments[2] = serviceSlugs[serviceKey][targetLocale];
    }

    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
