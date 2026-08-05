"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand/BrandMark";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { switchLocalePath } from "@/lib/locale-path";
import { getProjectsPath } from "@/lib/route-config";

import { LanguageToggle } from "./LanguageToggle";
import { PaletteToggle } from "./PaletteToggle";
import styles from "./Navbar.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  introAnimation?: boolean;
}>;

const MOBILE_MENU_ID = "happyreels-mobile-menu";
type NavbarTheme = "rose" | "brown";

export function Navbar({ locale, dict, introAnimation = false }: Props) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<NavbarTheme>("brown");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const home = `/${locale}`;
  const heroHref = `${home}#hero`;
  const switchTo = otherLocale(locale);
  const switchHref = switchLocalePath(pathname ?? home, switchTo);

  const links = [
    { href: getProjectsPath(locale), label: dict.nav.links.work },
    { href: `${home}#services`, label: dict.nav.links.services },
    { href: `${home}#process`, label: dict.nav.links.process },
    { href: `${home}/about`, label: dict.nav.links.about },
    { href: `${home}#faq`, label: dict.nav.links.faq },
  ] as const;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
    );
    if (!header || themedSections.length === 0) {
      setTheme("brown");
      return;
    }

    let observer: IntersectionObserver | null = null;
    let themeObserver: MutationObserver | null = null;
    let resizeFrame = 0;

    const observeContactPoint = () => {
      observer?.disconnect();
      const navbarHeight = header.getBoundingClientRect().height;
      const bottomMargin = Math.max(window.innerHeight - navbarHeight - 1, 0);

      const updateTheme = () => {
        const activeSection = themedSections.findLast(
          (section) => section.getBoundingClientRect().top <= navbarHeight,
        ) ?? themedSections[0];
        const nextTheme: NavbarTheme =
          activeSection.dataset.navbarTheme === "brown" ? "brown" : "rose";
        setTheme((currentTheme) => currentTheme === nextTheme ? currentTheme : nextTheme);
      };

      updateTheme();

      observer = new IntersectionObserver(
        updateTheme,
        {
          rootMargin: `-${navbarHeight}px 0px -${bottomMargin}px 0px`,
          threshold: 0,
        },
      );

      themedSections.forEach((section) => observer?.observe(section));

      themeObserver?.disconnect();
      themeObserver = new MutationObserver(updateTheme);
      themedSections.forEach((section) => {
        themeObserver?.observe(section, {
          attributes: true,
          attributeFilter: ["data-navbar-theme"],
        });
      });
    };

    const handleResize = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(observeContactPoint);
    };

    observeContactPoint();
    window.addEventListener("resize", handleResize);

    return () => {
      observer?.disconnect();
      themeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <header
        ref={headerRef}
        className={styles.header}
        data-open={open ? "true" : undefined}
        data-theme={theme}
        data-intro={introAnimation ? "true" : undefined}
      >
        <nav className={`container-base ${styles.nav}`} aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}>
          <Link
            href={heroHref}
            className={styles.brand}
            aria-label={dict.nav.wordmark}
            onClick={() => setOpen(false)}
          >
            <BrandMark
              size="navigation"
              accent={theme === "brown" ? "yellow" : "light"}
              reveal={introAnimation ? "intro" : "immediate"}
              revealDelay={introAnimation ? 2040 : 0}
              interactive
            />
          </Link>

        <div className={styles.desktopLinks}>
          {links.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <LanguageToggle locale={locale} href={switchHref} />
          <PaletteToggle locale={locale} />
          <HappyReelsButton
            href={`${home}#contact`}
            variant="on-rose"
            showIcon={false}
            enableMovingBorder={false}
            className={styles.navCta}
          >
            {dict.nav.cta}
          </HappyReelsButton>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? (locale === "de" ? "Menü schließen" : "Close menu") : locale === "de" ? "Menü öffnen" : "Open menu"}
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        </nav>

      <div
        id={MOBILE_MENU_ID}
        className={styles.mobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label={locale === "de" ? "Mobile Navigation" : "Mobile navigation"}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label={locale === "de" ? "Mobile Navigation" : "Mobile navigation"}>
          {links.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstMobileLink : undefined}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <LanguageToggle locale={locale} href={switchHref} onClick={() => setOpen(false)} />
          <HappyReelsButton href={`${home}#contact`} variant="on-brown" onClick={() => setOpen(false)}>
            {dict.nav.cta}
          </HappyReelsButton>
        </div>
        </div>
      </header>
    </>
  );
}
