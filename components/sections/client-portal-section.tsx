"use client";

import { useEffect, useState } from "react";
import { Typography } from "poyraz-ui/atoms";

const PORTAL_SCREENS = [
  {
    title: "Dashboard",
    image: "/clientSs/dashboard.png",
    alt: "Müşteri portal dashboard ekran görüntüsü",
  },
  {
    title: "Proje ilerlemesi",
    image: "/clientSs/projeİlerlemesi.png",
    alt: "Müşteri portal proje ilerlemesi ekran görüntüsü",
  },
  {
    title: "Revizyon akışı",
    image: "/clientSs/revizyın.png",
    alt: "Müşteri portal revizyon ekran görüntüsü",
  },
] as const;

const POSITIONS = [
  {
    wrapper:
      "left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2",
    image: "scale-100",
  },
  {
    wrapper:
      "right-0 top-5 w-[58%] translate-x-0 translate-y-0",
    image: "scale-95",
  },
  {
    wrapper:
      "left-0 bottom-5 w-[58%] translate-x-0 translate-y-0",
    image: "scale-95",
  },
] as const;

export function ClientPortalSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PORTAL_SCREENS.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="client-portal"
      className="px-4 py-16 sm:py-20"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="max-w-xl space-y-5">
            <div className="space-y-3">
              <Typography variant="h2" component="h2" className="text-3xl">
                Müşteriye ayrı, kontrollü bir{" "}
                <span className="font-display text-primary">portal</span>
              </Typography>
              <Typography variant="lead">
                Müşteriler yalnızca kendi projelerinin durumunu, görünür
                görevleri ve revizyon akışını takip eder. İç notlar, finans ve
                kişisel planlama freelancer tarafında kalır.
              </Typography>
            </div>

            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-sm border border-border bg-card p-3">
                Proje ilerlemesi sade ve anlaşılır görünür.
              </div>
              <div className="rounded-sm border border-border bg-card p-3">
                Revizyon istekleri proje bağlamında toplanır.
              </div>
              <div className="rounded-sm border border-border bg-card p-3">
                Portal, müşteriye kontrollü bir okuma alanı sunar.
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[420px]">
            <div className="absolute inset-0 rounded-sm border border-border bg-muted/40" />
            <div className="absolute inset-4 overflow-hidden rounded-sm border border-border bg-card">
              {PORTAL_SCREENS.map((screen, index) => {
                const isActive = index === activeIndex;
                const position = POSITIONS[index];
                return (
                  <div
                    key={screen.title}
                    className={`absolute transition-opacity duration-700 ease-out ${
                      isActive ? "z-30 opacity-100" : "z-10 opacity-20"
                    } ${position.wrapper}`}
                  >
                    <img
                      src={screen.image}
                      alt={screen.alt}
                      className={`h-auto w-full rounded-sm border border-border bg-background ${position.image}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
