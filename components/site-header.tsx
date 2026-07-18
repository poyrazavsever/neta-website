"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { DemoAccessButton } from "@/components/demo-access-button";
import { LanguageDropdown } from "@/components/language-dropdown";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  type Locale,
  getDocsHref,
  getHomeHref,
  getSectionHref,
  siteCopy,
} from "@/lib/i18n";

const GITHUB_URL = "https://github.com/poyrazavsever/neta";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = siteCopy[locale];
  const homeHref = getHomeHref(locale);
  const docsHref = getDocsHref(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionLinks = siteCopy[locale].nav.links.filter(
        (item) => item.id !== "docs",
      );
      const viewportAnchor = window.innerHeight * 0.32;
      let currentSection = "";

      for (const item of sectionLinks) {
        const element = document.getElementById(item.id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
          currentSection = item.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (pathname !== homeHref) {
      return;
    }

    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", getSectionHref(locale, id));
      return;
    }

    window.location.assign(getSectionHref(locale, id));
  };

  const scrollMobileToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    scrollToSection(e, id);
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== homeHref) {
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", homeHref);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/80 bg-background/95 shadow-[0_8px_30px_rgba(16,24,40,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative">
          <div className="relative z-10 flex min-h-20 items-center justify-between gap-4 transition-all duration-300">
            <div className="flex min-w-0 items-center gap-4 xl:gap-5">
              <Link
                href={homeHref}
                onClick={scrollToTop}
                className="flex min-w-0 shrink-0 items-center"
                aria-label={copy.nav.homeAria}
              >
                <img
                  src={
                    scrolled
                      ? "/logo/blackLogoLong.png"
                      : "/logo/lightLogoLong.png"
                  }
                  alt="Neta"
                  className="h-10 w-auto object-contain transition-opacity duration-300 xl:h-12"
                />
              </Link>

              <nav className="hidden items-center gap-0.5 min-[1100px]:flex xl:gap-1.5">
                {copy.nav.links.map((item) => {
                  const isDocsLink = item.id === "docs";
                  const href = isDocsLink
                    ? docsHref
                    : getSectionHref(locale, item.id);
                  const isActive = isDocsLink
                    ? pathname.startsWith(docsHref)
                    : activeSection === item.id;
                  const className = isActive
                    ? scrolled
                      ? "relative bg-primary/8 text-primary shadow-[inset_0_0_0_1px_rgba(220,38,38,0.08)]"
                      : "relative bg-white/12 text-white"
                    : scrolled
                      ? "text-foreground hover:bg-accent/70"
                      : "text-white hover:bg-white/12";

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      onClick={
                        isDocsLink
                          ? undefined
                          : (e) => scrollToSection(e, item.id)
                      }
                      className={`inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold transition-colors xl:gap-2 xl:px-4 xl:text-sm ${className}`}
                    >
                      <span>{item.label}</span>
                      {item.accent ? (
                        <Icon
                          icon="mdi:sparkles"
                          className={`h-4 w-4 ${
                            scrolled ? "text-primary" : "text-white"
                          }`}
                        />
                      ) : null}
                      {isActive ? (
                        <span
                          className={`absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                            scrolled ? "bg-primary" : "bg-white"
                          }`}
                        />
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <LanguageDropdown
                locale={locale}
                pathname={pathname}
                label={copy.nav.language}
                scrolled={scrolled}
              />

              <div className="hidden items-center gap-1.5 min-[1100px]:flex xl:gap-2">
                <AnimatedButton
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon="mdi:github"
                  iconPosition="left"
                  className={`h-9 rounded-2xl px-3 text-[13px] xl:h-10 xl:px-4 xl:text-sm ${
                    scrolled
                      ? ""
                      : "border-white/35 bg-white/10 text-white shadow-none hover:border-white/60 hover:bg-white/20"
                  }`}
                >
                  {copy.nav.github}
                </AnimatedButton>

                <DemoAccessButton
                  locale={locale}
                  className="h-9 rounded-2xl px-3 text-[13px] xl:h-10 xl:px-4 xl:text-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors min-[1100px]:hidden ${
                  scrolled
                    ? "border-border bg-background text-foreground hover:bg-accent"
                    : "border-white/35 bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={copy.nav.openMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icon icon="mdi:menu" className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={`fixed inset-0 z-50 flex min-h-dvh flex-col bg-background px-5 py-5 shadow-[24px_0_80px_rgba(16,24,40,0.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] min-[1100px]:hidden ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="flex items-center justify-between">
              <Link
                href={homeHref}
                onClick={scrollToTop}
                className="flex items-center"
                aria-label={copy.nav.homeAria}
              >
                <img
                  src="/logo/blackLogoLong.png"
                  alt="Neta"
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition-colors hover:bg-accent"
                aria-label={copy.nav.closeMenu}
              >
                <Icon icon="mdi:close" className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-12 grid gap-2">
              {copy.nav.links.map((item) => {
                const isDocsLink = item.id === "docs";
                const href = isDocsLink
                  ? docsHref
                  : getSectionHref(locale, item.id);
                const isActive = isDocsLink
                  ? pathname.startsWith(docsHref)
                  : activeSection === item.id;
                const className = isActive
                  ? "border-primary/15 bg-primary/8 text-primary"
                  : "border-border/70 bg-card text-foreground";

                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={
                      isDocsLink
                        ? () => setMobileMenuOpen(false)
                        : (e) => scrollMobileToSection(e, item.id)
                    }
                    className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 text-lg font-semibold transition-colors hover:bg-accent ${className}`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.accent ? (
                        <Icon
                          icon="mdi:sparkles"
                          className="h-4 w-4 text-primary"
                        />
                      ) : null}
                    </span>
                    <Icon icon="mdi:chevron-right" className="h-5 w-5" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto grid gap-3 pb-2">
              <LanguageDropdown
                locale={locale}
                pathname={pathname}
                label={copy.nav.language}
                scrolled
                fullWidth
                onSelect={() => setMobileMenuOpen(false)}
              />

              <AnimatedButton
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                variant="outline"
                icon="mdi:github"
                iconPosition="left"
                className="w-full"
              >
                {copy.nav.github}
              </AnimatedButton>

              <DemoAccessButton
                locale={locale}
                onOpen={() => setMobileMenuOpen(false)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
