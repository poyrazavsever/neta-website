"use client";

import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";
import { NAV_LINKS } from "@/config/links";

const GITHUB_URL = "https://github.com/poyrazavsever/neta";

export function SiteFooter() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="px-4 pb-8 pt-4">
      <div className="container mx-auto max-w-5xl border-t border-border pt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <img
              src="/logo/blackLogoLong.png"
              alt="Neta Logo"
              className="h-10 w-auto object-contain"
            />
            <Typography variant="muted">
              Self-hosted freelancer operating system.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.id)}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Icon icon="mdi:github" className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
