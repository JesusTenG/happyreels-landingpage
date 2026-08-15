"use client";

import { ChevronDown, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { BrandMark } from "@/components/brand/BrandMark";
import { useHeroVariant } from "@/components/hero/HeroVariantContext.client";
import {
  HERO_VARIANTS,
  HERO_VARIANT_NUMBERS,
  type HeroVariant,
} from "@/components/hero/Hero.types";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { switchLocalePath } from "@/lib/locale-path";
import { getProjectsPath, getServicesPath } from "@/lib/route-config";

import { LanguageToggle } from "./LanguageToggle";
import { PaletteToggle } from "./PaletteToggle";
import { TextMarkerToggle } from "./TextMarkerToggle";
import styles from "./Navbar.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  introAnimation?: boolean;
}>;

const MOBILE_MENU_ID = "happyreels-mobile-menu";
const MOBILE_NAVBAR_MEDIA = "(max-width: 940px)";
type NavbarTheme = "rose" | "paper" | "blush" | "gold" | "brown";

type HeroVariantDropdownProps = Readonly<{
  locale: Locale;
  value: HeroVariant;
  onChange: (variant: HeroVariant) => void;
  mobile?: boolean;
}>;

function HeroVariantDropdown({
  locale,
  value,
  onChange,
  mobile = false,
}: HeroVariantDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = `hero-variant-${useId().replaceAll(":", "")}`;
  const currentNumber = HERO_VARIANT_NUMBERS[value];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    rootRef.current
      ?.querySelector<HTMLButtonElement>("[role='menuitemradio'][aria-checked='true']")
      ?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']"),
    );
    const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : event.key === "ArrowDown"
          ? (activeIndex + 1 + buttons.length) % buttons.length
          : (activeIndex - 1 + buttons.length) % buttons.length;

    event.preventDefault();
    buttons[nextIndex]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.heroDropdown} ${mobile ? styles.mobileHeroDropdown : ""}`}
      data-open={open ? "true" : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.heroDropdownTrigger}
        aria-label={locale === "de"
          ? `Hero-Variante, aktuell ${currentNumber}`
          : `Hero variant, currently ${currentNumber}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Hero</span>
        <strong>{currentNumber}</strong>
        <ChevronDown aria-hidden="true" />
      </button>

      <div
        id={menuId}
        className={styles.heroDropdownMenu}
        role="menu"
        aria-label={locale === "de" ? "Hero-Variante" : "Hero variant"}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={handleMenuKeyDown}
      >
        {HERO_VARIANTS.map((variant) => (
          <button
            key={variant}
            type="button"
            role="menuitemradio"
            aria-checked={value === variant}
            onClick={() => {
              onChange(variant);
              setOpen(false);
              triggerRef.current?.focus();
            }}
          >
            <span>{locale === "de" ? "Hero" : "Hero"}</span>
            <strong>{HERO_VARIANT_NUMBERS[variant]}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

type NavbarUtilitiesDropdownProps = Readonly<{
  locale: Locale;
  heroValue?: HeroVariant;
  onHeroChange?: (variant: HeroVariant) => void;
  switchHref: string;
}>;

function NavbarUtilitiesDropdown({
  locale,
  heroValue,
  onHeroChange,
  switchHref,
}: NavbarUtilitiesDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `navbar-utilities-${useId().replaceAll(":", "")}`;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    rootRef.current
      ?.querySelector<HTMLElement>("[data-utilities-panel] button, [data-utilities-panel] a")
      ?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={styles.compactUtilities}
      data-open={open ? "true" : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.compactUtilitiesTrigger}
        aria-label={locale === "de" ? "Zusatzoptionen öffnen" : "Open additional options"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <Settings2 aria-hidden="true" />
        <span>{locale === "de" ? "Optionen" : "Options"}</span>
        <ChevronDown aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className={styles.compactUtilitiesPanel}
        role="dialog"
        aria-label={locale === "de" ? "Zusatzoptionen" : "Additional options"}
        aria-hidden={!open}
        inert={!open}
        data-utilities-panel
      >
        {heroValue && onHeroChange ? (
          <div className={styles.compactUtilityRow}>
            <span>{locale === "de" ? "Hero-Variante" : "Hero variant"}</span>
            <div className={styles.compactHeroToggle} role="group" aria-label={locale === "de" ? "Hero-Variante" : "Hero variant"}>
              {HERO_VARIANTS.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  aria-pressed={heroValue === variant}
                  onClick={() => onHeroChange(variant)}
                >
                  {HERO_VARIANT_NUMBERS[variant]}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.compactUtilityRow}>
          <span>{locale === "de" ? "Sprache" : "Language"}</span>
          <LanguageToggle
            locale={locale}
            href={switchHref}
            onClick={() => setOpen(false)}
          />
        </div>

        {heroValue ? (
          <div className={styles.compactUtilityRow}>
            <span>{locale === "de" ? "Darstellung" : "Appearance"}</span>
            <div className={styles.compactVisualToggles}>
              <PaletteToggle locale={locale} />
              <TextMarkerToggle locale={locale} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Navbar({ locale, dict, introAnimation = false }: Props) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<NavbarTheme>("brown");
  const heroVariant = useHeroVariant();
  const usesCollapsingStyle = Boolean(heroVariant);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const home = `/${locale}`;
  const heroHref = `${home}#hero`;
  const switchTo = otherLocale(locale);
  const switchHref = switchLocalePath(pathname ?? home, switchTo);

  const links = [
    { href: heroHref, label: dict.nav.links.home, isHome: true },
    { href: getProjectsPath(locale), label: dict.nav.links.work, isHome: false },
    { href: getServicesPath(locale), label: dict.nav.links.services, isHome: false },
    { href: `${home}#process`, label: dict.nav.links.process, isHome: false },
    { href: `${home}/about`, label: dict.nav.links.about, isHome: false },
    { href: `${home}#faq`, label: dict.nav.links.faq, isHome: false },
  ] as const;

  const handleHomeNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);

    const isModifiedClick = event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey;

    if (isModifiedClick || pathname !== home) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", heroHref);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

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

      if (usesCollapsingStyle) {
        themedSections = [];
        setTheme((currentTheme) => currentTheme === "brown" ? currentTheme : "brown");
        return;
      }

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
  }, [usesCollapsingStyle, pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let animationFrame = 0;
    let deferredFadeDistance = 1;
    let deferredFadeStart = 0;
    let heroStart = 0;
    let heroScrollDistance = 1;
    let hasHero = false;
    let useExtendedFade = false;
    let heroTransitionMode = "";

    const setCollapsingShellMetrics = (progress: number) => {
      if (header.dataset.collapsingShell !== "true") return;

      const viewportWidth = document.documentElement.clientWidth;
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize,
      ) || 16;
      const interpolate = (start: number, end: number) =>
        start + (end - start) * progress;
      const clamp = (minimum: number, value: number, maximum: number) =>
        Math.min(maximum, Math.max(minimum, value));

      const initialWidth = viewportWidth * 0.9;
      const compactPillWidth = Math.min(
        92 * rootFontSize,
        viewportWidth - 1.5 * rootFontSize,
      );
      const compactWidth = Math.min(initialWidth, compactPillWidth);
      const initialPadding = clamp(
        0.75 * rootFontSize,
        viewportWidth * 0.012,
        rootFontSize,
      );
      const compactPadding = clamp(
        rootFontSize,
        viewportWidth * 0.018,
        1.5 * rootFontSize,
      );
      const initialLinkGap = clamp(
        0.2 * rootFontSize,
        viewportWidth * 0.009,
        0.85 * rootFontSize,
      );

      header.style.setProperty(
        "--nav-collapse-width",
        `${interpolate(initialWidth, compactWidth).toFixed(2)}px`,
      );
      header.style.setProperty(
        "--nav-collapse-height",
        `${interpolate(5.25 * rootFontSize, 4.5 * rootFontSize).toFixed(2)}px`,
      );
      header.style.setProperty(
        "--nav-collapse-top",
        `${interpolate(0, 0.75 * rootFontSize).toFixed(2)}px`,
      );
      header.style.setProperty(
        "--nav-collapse-padding",
        `${interpolate(initialPadding, compactPadding).toFixed(2)}px`,
      );
      header.style.setProperty(
        "--nav-collapse-link-gap",
        `${interpolate(initialLinkGap, 0.2 * rootFontSize).toFixed(2)}px`,
      );
      header.style.setProperty(
        "--nav-collapse-border-alpha",
        `${(progress * 26).toFixed(2)}%`,
      );
    };

    const setShellProgress = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      header.style.setProperty("--nav-shell-progress", clamped.toFixed(4));
      header.style.setProperty("--nav-shell-alpha", `${(clamped * 100).toFixed(2)}%`);
      header.style.setProperty(
        "--nav-backdrop-filter",
        clamped > 0 && clamped < 0.98
          ? `blur(${(18 * clamped).toFixed(2)}px) saturate(1.08)`
          : "none",
      );
      setCollapsingShellMetrics(clamped);
    };

    const updateShell = () => {
      animationFrame = 0;
      if (!hasHero) {
        setShellProgress(1);
        return;
      }

      const fadeProgress = useExtendedFade
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
      const easedProgress = fadeProgress * fadeProgress * fadeProgress
        * (fadeProgress * (fadeProgress * 6 - 15) + 10);
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
      heroTransitionMode = hero.dataset.navbarHero ?? "";
      useExtendedFade = heroTransitionMode === "deferred" || heroTransitionMode === "collapsing";
      heroScrollDistance = Math.max(
        stickyScrollDistance > window.innerHeight * 0.25
          ? stickyScrollDistance
          : standardExitDistance,
        1,
      );

      if (heroTransitionMode === "deferred") {
        const themedSections = Array.from(
          document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
        );
        const heroIndex = themedSections.indexOf(hero);
        const nextSection = heroIndex >= 0 ? themedSections[heroIndex + 1] : null;
        const nextSectionTop = nextSection
          ? window.scrollY + nextSection.getBoundingClientRect().top
          : heroStart + heroHeight;

        const sectionApproach = nextSectionTop - window.innerHeight;
        deferredFadeDistance = Math.min(
          1280,
          Math.max(800, window.innerHeight * 1.25),
        );
        deferredFadeStart = sectionApproach - deferredFadeDistance * 0.35;
      } else if (heroTransitionMode === "collapsing") {
        deferredFadeStart = heroStart;
        deferredFadeDistance = Math.max(
          Math.min(heroHeight - header.offsetHeight, window.innerHeight * 0.9),
          1,
        );
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
  }, [heroVariant?.variant, pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <header
        ref={headerRef}
        className={styles.header}
        data-open={open ? "true" : undefined}
        data-theme={usesCollapsingStyle ? "brown" : theme}
        data-hero-variant={heroVariant?.variant}
        data-collapsing-shell={usesCollapsingStyle ? "true" : undefined}
        data-intro={introAnimation ? "true" : undefined}
      >
        <nav className={styles.nav} aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}>
          <Link
            href={heroHref}
            className={styles.brand}
            aria-label={dict.nav.wordmark}
            onClick={handleHomeNavigation}
          >
            <BrandMark
              size="navigation"
              accent={
                usesCollapsingStyle || theme === "brown"
                    ? "yellow"
                    : theme === "gold"
                      ? "brown"
                      : "light"
              }
              reveal={introAnimation ? "none" : "immediate"}
              interactive
            />
          </Link>

        <div className={styles.desktopLinks}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isHome && pathname === home ? "page" : undefined}
              onClick={item.isHome ? handleHomeNavigation : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.desktopUtilities}>
            {heroVariant ? (
              <HeroVariantDropdown
                locale={locale}
                value={heroVariant.variant}
                onChange={heroVariant.setVariant}
              />
            ) : null}
            <span className={styles.navLanguage}>
              <LanguageToggle locale={locale} href={switchHref} />
            </span>
            <PaletteToggle locale={locale} />
            <TextMarkerToggle locale={locale} />
          </div>
          <NavbarUtilitiesDropdown
            locale={locale}
            heroValue={heroVariant?.variant}
            onHeroChange={heroVariant?.setVariant}
            switchHref={switchHref}
          />
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
              aria-current={item.isHome && pathname === home ? "page" : undefined}
              onClick={item.isHome ? handleHomeNavigation : () => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <div className={styles.mobileUtilities}>
            {heroVariant ? (
              <HeroVariantDropdown
                locale={locale}
                value={heroVariant.variant}
                onChange={heroVariant.setVariant}
                mobile
              />
            ) : null}
            <PaletteToggle locale={locale} />
            <TextMarkerToggle locale={locale} />
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
