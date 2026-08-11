"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand/BrandMark";
import { useHeroVariant } from "@/components/hero/HeroVariantContext.client";
import { HERO_VARIANTS, HERO_VARIANT_NUMBERS } from "@/components/hero/Hero.types";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { switchLocalePath } from "@/lib/locale-path";
import { getProjectsPath, getServicesPath } from "@/lib/route-config";

import { LanguageToggle } from "./LanguageToggle";
import { PaletteToggle } from "./PaletteToggle";
import styles from "./Navbar.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  introAnimation?: boolean;
}>;

const MOBILE_MENU_ID = "happyreels-mobile-menu";
const MOBILE_NAVBAR_MEDIA = "(max-width: 940px)";
type NavbarTheme = "rose" | "paper" | "blush" | "gold" | "brown";

export function Navbar({ locale, dict, introAnimation = false }: Props) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<NavbarTheme>("brown");
  const heroVariant = useHeroVariant();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const home = `/${locale}`;
  const heroHref = `${home}#hero`;
  const switchTo = otherLocale(locale);
  const switchHref = switchLocalePath(pathname ?? home, switchTo);

  const links = [
    { href: getProjectsPath(locale), label: dict.nav.links.work },
    { href: getServicesPath(locale), label: dict.nav.links.services },
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
    if (!header) {
      setTheme("brown");
      return;
    }

    let themedSections: HTMLElement[] = [];
    let observer: IntersectionObserver | null = null;
    let themeObserver: MutationObserver | null = null;
    let sectionTreeObserver: MutationObserver | null = null;
    let headerResizeObserver: ResizeObserver | null = null;
    let resizeFrame = 0;

    const observeContactPoint = () => {
      observer?.disconnect();
      themeObserver?.disconnect();

      if (window.matchMedia(MOBILE_NAVBAR_MEDIA).matches) {
        themedSections = [];
        setTheme((currentTheme) => currentTheme === "brown" ? currentTheme : "brown");
        return;
      }

      themedSections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
      );
      if (themedSections.length === 0) {
        setTheme("brown");
        return;
      }

      const navbarHeight = header.getBoundingClientRect().height;
      const bottomMargin = Math.max(window.innerHeight - navbarHeight - 1, 0);

      const updateTheme = () => {
        const activeSection = themedSections.findLast(
          (section) => section.getBoundingClientRect().top <= navbarHeight,
        ) ?? themedSections[0];
        const requestedTheme = activeSection.dataset.navbarTheme;
        const nextTheme: NavbarTheme =
          requestedTheme === "brown" ||
          requestedTheme === "paper" ||
          requestedTheme === "blush" ||
          requestedTheme === "gold"
            ? requestedTheme
            : "rose";
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
    const mainContent = document.querySelector("#main-content");
    if (mainContent) {
      sectionTreeObserver = new MutationObserver(observeContactPoint);
      sectionTreeObserver.observe(mainContent, { childList: true });
    }
    window.addEventListener("resize", handleResize);
    headerResizeObserver = new ResizeObserver(handleResize);
    headerResizeObserver.observe(header);

    return () => {
      observer?.disconnect();
      themeObserver?.disconnect();
      sectionTreeObserver?.disconnect();
      headerResizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let animationFrame = 0;
    let deferredFadeDistance = 1;
    let deferredFadeStart = 0;
    let heroStart = 0;
    let heroScrollDistance = 1;
    let hasHero = false;
    let useDeferredFade = false;

    const setShellProgress = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      header.style.setProperty("--nav-shell-progress", clamped.toFixed(4));
      header.style.setProperty("--nav-shell-alpha", `${(clamped * 100).toFixed(2)}%`);
    };

    const updateShell = () => {
      animationFrame = 0;
      if (!hasHero) {
        setShellProgress(1);
        return;
      }

      const fadeProgress = useDeferredFade
        ? Math.min(
            1,
            Math.max(0, (window.scrollY - deferredFadeStart) / deferredFadeDistance),
          )
        : Math.min(
            1,
            Math.max(
              0,
              ((window.scrollY - heroStart) / heroScrollDistance - 0.9) / 0.1,
            ),
          );
      const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
      setShellProgress(easedProgress);
    };

    const requestShellUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateShell);
    };

    const measureHero = () => {
      const hero = document.querySelector<HTMLElement>("[data-navbar-hero]");
      hasHero = Boolean(hero);

      if (!hero) {
        setShellProgress(1);
        return;
      }

      const heroHeight = hero.offsetHeight;
      const stickyScrollDistance = heroHeight - window.innerHeight;
      const standardExitDistance = heroHeight - header.offsetHeight;
      heroStart = window.scrollY + hero.getBoundingClientRect().top;
      useDeferredFade = hero.dataset.navbarHero === "deferred";
      heroScrollDistance = Math.max(
        stickyScrollDistance > window.innerHeight * 0.25
          ? stickyScrollDistance
          : standardExitDistance,
        1,
      );

      if (useDeferredFade) {
        const themedSections = Array.from(
          document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
        );
        const heroIndex = themedSections.indexOf(hero);
        const nextSection = heroIndex >= 0 ? themedSections[heroIndex + 1] : null;
        const nextSectionTop = nextSection
          ? window.scrollY + nextSection.getBoundingClientRect().top
          : heroStart + heroHeight;

        deferredFadeStart = nextSectionTop - window.innerHeight;
        deferredFadeDistance = Math.max(header.offsetHeight * 1.25, 1);
      }

      updateShell();
    };

    measureHero();
    const mainContent = document.querySelector("#main-content");
    const heroTreeObserver = mainContent ? new MutationObserver(measureHero) : null;
    heroTreeObserver?.observe(mainContent!, { childList: true });
    window.addEventListener("scroll", requestShellUpdate, { passive: true });
    window.addEventListener("resize", measureHero);

    return () => {
      heroTreeObserver?.disconnect();
      window.removeEventListener("scroll", requestShellUpdate);
      window.removeEventListener("resize", measureHero);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
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
              accent={theme === "brown" ? "yellow" : theme === "gold" ? "brown" : "light"}
              reveal={introAnimation ? "none" : "immediate"}
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
          {heroVariant ? (
            <div
              className={styles.heroToggle}
              role="group"
              aria-label={locale === "de" ? "Hero-Variante" : "Hero variant"}
            >
              {HERO_VARIANTS.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  aria-label={`${locale === "de" ? "Hero" : "Hero"} ${HERO_VARIANT_NUMBERS[variant]}`}
                  aria-pressed={heroVariant.variant === variant}
                  onClick={() => heroVariant.setVariant(variant)}
                >
                  {HERO_VARIANT_NUMBERS[variant]}
                </button>
              ))}
            </div>
          ) : null}
          <span className={styles.navLanguage}>
            <LanguageToggle locale={locale} href={switchHref} />
          </span>
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
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <div className={styles.mobileUtilities}>
            {heroVariant ? (
              <div
                className={`${styles.heroToggle} ${styles.mobileHeroToggle}`}
                role="group"
                aria-label={locale === "de" ? "Hero-Variante" : "Hero variant"}
              >
                {HERO_VARIANTS.map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    aria-label={`Hero ${HERO_VARIANT_NUMBERS[variant]}`}
                    aria-pressed={heroVariant.variant === variant}
                    onClick={() => heroVariant.setVariant(variant)}
                  >
                    {HERO_VARIANT_NUMBERS[variant]}
                  </button>
                ))}
              </div>
            ) : null}
            <PaletteToggle locale={locale} />
          </div>
          <div className={styles.mobileCtaRow}>
            <LanguageToggle locale={locale} href={switchHref} onClick={() => setOpen(false)} />
            <HappyReelsButton href={`${home}#contact`} variant="on-brown" onClick={() => setOpen(false)}>
              {dict.nav.cta}
            </HappyReelsButton>
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
