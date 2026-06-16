"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { AnimatedButton } from "@/components/ui/animated-button";

const GITHUB_URL = "https://github.com/poyrazavsever/neta";

const HEADER_LINKS = [
  {
    id: "modules",
    label: "Modüller",
    href: "/#modules",
    accent: false,
    external: false,
  },
  {
    id: "client-portal",
    label: "Özellikler",
    href: "/#client-portal",
    accent: false,
    external: false,
  },
  {
    id: "ai-assistant",
    label: "AI Asistanı",
    href: "/#ai-assistant",
    accent: true,
    external: false,
  },
  {
    id: "self-host",
    label: "Self-Host",
    href: "/#self-host",
    accent: false,
    external: false,
  },
  {
    id: "docs",
    label: "Dökümantasyon",
    href: "/docs",
    accent: false,
    external: false,
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionLinks = HEADER_LINKS.filter((item) => !item.external);
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
  }, []);

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
    if (pathname !== "/") {
      return;
    }

    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.assign(`/#${id}`);
  };

  const scrollMobileToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    scrollToSection(e, id);
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-3 pt-2 transition-all duration-300 sm:px-6 ${
        scrolled ? "translate-y-0" : ""
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-4 top-3 h-16 rounded-full bg-primary/10 blur-2xl" />

          <div
            className={`relative z-10 flex min-h-16 items-center justify-between gap-4 rounded-4xl border bg-background/95 px-4 py-3 shadow-[0_18px_56px_rgba(16,24,40,0.12),0_0_0_7px_rgba(255,255,255,0.7)] backdrop-blur-xl transition-all duration-300 sm:min-h-18 sm:px-6 lg:px-8 ${
              scrolled ? "border-border/90" : "border-border/70"
            }`}
          >
            <Link
              href="/"
              onClick={scrollToTop}
              className="flex min-w-0 shrink-0 items-center"
              aria-label="Neta ana sayfa"
            >
              <img
                src="/logo/blackLogoLong.png"
                alt="Neta"
                className="h-10 w-auto object-contain sm:h-12"
              />
            </Link>

            <nav className="hidden items-center justify-center gap-1.5 xl:flex">
              {HEADER_LINKS.map((item) => {
                const isPageLink =
                  item.href.startsWith("/") && !item.href.startsWith("/#");
                const isActive = isPageLink
                  ? pathname.startsWith(item.href)
                  : activeSection === item.id;
                const className = isActive
                  ? "relative bg-primary/8 text-primary shadow-[inset_0_0_0_1px_rgba(220,38,38,0.08)]"
                  : "text-foreground hover:bg-accent/70";

                const content = (
                  <>
                    <span>{item.label}</span>
                    {item.accent ? (
                      <Icon icon="mdi:sparkles" className="h-4 w-4 text-primary" />
                    ) : null}
                    {isActive ? (
                      <span className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
                    ) : null}
                  </>
                );

                if (isPageLink) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${className}`}
                    >
                      {content}
                    </Link>
                  );
                }

                if (item.external) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${className}`}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${className}`}
                  >
                    {content}
                  </a>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden items-center gap-2 xl:flex">
                <AnimatedButton
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon="mdi:github"
                  iconPosition="left"
                  className="h-10 rounded-2xl px-4 text-sm"
                >
                  GitHub&apos;da İncele
                </AnimatedButton>

                <AnimatedButton
                  href="https://demo.takeneta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon="mdi:chevron-right"
                  iconPosition="right"
                  className="h-10 rounded-2xl px-4 text-sm"
                >
                  Demo&apos;yu Gör
                </AnimatedButton>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition-colors hover:bg-accent xl:hidden"
                aria-label="Menüyü aç"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icon icon="mdi:menu" className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={`fixed inset-0 z-50 flex min-h-dvh flex-col bg-background px-5 py-5 shadow-[24px_0_80px_rgba(16,24,40,0.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] xl:hidden ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={scrollToTop}
                className="flex items-center"
                aria-label="Neta ana sayfa"
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
                aria-label="Menüyü kapat"
              >
                <Icon icon="mdi:close" className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-12 grid gap-2">
              {HEADER_LINKS.map((item) => {
                const isPageLink =
                  item.href.startsWith("/") && !item.href.startsWith("/#");
                const isActive = isPageLink
                  ? pathname.startsWith(item.href)
                  : activeSection === item.id;
                const className = isActive
                  ? "border-primary/15 bg-primary/8 text-primary"
                  : "border-border/70 bg-card text-foreground";

                if (isPageLink) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 text-lg font-semibold transition-colors hover:bg-accent ${className}`}
                    >
                      <span>{item.label}</span>
                      <Icon icon="mdi:chevron-right" className="h-5 w-5" />
                    </Link>
                  );
                }

                if (item.external) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 text-lg font-semibold transition-colors hover:bg-accent ${className}`}
                    >
                      <span>{item.label}</span>
                      <Icon icon="mdi:arrow-top-right" className="h-5 w-5" />
                    </a>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollMobileToSection(e, item.id)}
                    className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 text-lg font-semibold transition-colors hover:bg-accent ${className}`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.accent ? (
                        <Icon icon="mdi:sparkles" className="h-4 w-4 text-primary" />
                      ) : null}
                    </span>
                    <Icon icon="mdi:chevron-right" className="h-5 w-5" />
                  </a>
                );
              })}
            </nav>

            <div className="mt-auto grid gap-3 pb-2">
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
                View on GitHub
              </AnimatedButton>

              <AnimatedButton
                href="/#self-host"
                onClick={(e) => scrollMobileToSection(e, "self-host")}
                icon="mdi:chevron-right"
                iconPosition="right"
                className="w-full"
              >
                Get Early Access
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
