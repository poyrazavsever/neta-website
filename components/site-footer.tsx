"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";
import { AnimatedButton } from "@/components/ui/animated-button";

const GITHUB_URL = "https://github.com/poyrazavsever/neta";
const DOCS_URL = "https://docs.takeneta.com";
const MAKER_URL = "https://poyrazavsever.com";

const FOOTER_LINKS = [
  { id: "modules", label: "Modules", href: "#modules" },
  { id: "client-portal", label: "Features", href: "#client-portal" },
  { id: "ai-assistant", label: "AI Assistant", href: "#ai-assistant" },
  { id: "self-host", label: "Self-hosted", href: "#self-host" },
] as const;

export function SiteFooter() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <footer className="px-3 pb-8 pt-10 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-4 top-4 h-16 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative z-10 rounded-[2rem] border border-border/70 bg-background/95 px-4 py-5 shadow-[0_18px_56px_rgba(16,24,40,0.1),0_0_0_7px_rgba(255,255,255,0.7)] backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/"
                  onClick={scrollToTop}
                  className="flex shrink-0 items-center"
                  aria-label="Neta ana sayfa"
                >
                  <img
                    src="/logo/blackLogoLong.png"
                    alt="Neta"
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                <span className="hidden h-8 w-px bg-border sm:block" />

                <Typography
                  variant="muted"
                  className="max-w-sm text-sm leading-6"
                >
                  Self-hosted freelancer operating system.
                </Typography>
              </div>

              <nav className="flex flex-wrap items-center gap-1.5">
                {FOOTER_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent/70"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <AnimatedButton
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon="mdi:file-document-outline"
                  iconPosition="left"
                  className="h-10 rounded-[1rem] px-4 text-sm"
                >
                  Docs
                </AnimatedButton>

                <AnimatedButton
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon="mdi:github"
                  iconPosition="left"
                  className="h-10 rounded-[1rem] px-4 text-sm"
                >
                  GitHub
                </AnimatedButton>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} Neta.</span>

              <a
                href={MAKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
              >
                <span>poyrazavsever tarafından yapıldı</span>
                <Icon icon="mdi:arrow-top-right" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
