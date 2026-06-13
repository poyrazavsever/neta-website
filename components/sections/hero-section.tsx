"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge, Card, CardContent, Typography } from "poyraz-ui/atoms";
import { AnimatedButton } from "@/components/ui/animated-button";

const GITHUB_URL = "https://github.com/poyrazavsever/neta";

const HERO_IMAGES = {
  bird: "/logo/iconLogo.png",
  dashboard: "/appSs/dashboard.png",
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MiniMetricCard({
  title,
  value,
  helper,
  icon,
  tone,
  className,
  style,
}: {
  title: string;
  value: string;
  helper: string;
  icon: string;
  tone: "red" | "blue" | "green" | "amber";
  className: string;
  style: CSSProperties;
}) {
  const toneClass = {
    red: "bg-primary/10 text-primary",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  }[tone];

  return (
    <Card
      variant="bordered"
      className={`absolute z-30 hidden rounded-2xl border-border/70 bg-card/95 shadow-[0_14px_36px_rgba(16,24,40,0.1)] backdrop-blur transition-opacity duration-700 md:block ${className}`}
      style={style}
    >
      <CardContent className="p-3.5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <Typography variant="muted" className="text-xs font-medium">
              {title}
            </Typography>
            <Typography variant="h3" component="p" className="text-2xl">
              {value}
            </Typography>
          </div>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClass}`}
          >
            <Icon icon={icon} className="h-4.5 w-4.5" />
          </span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 rounded-full bg-primary/70" />
        </div>
        <Typography variant="muted" className="mt-3 text-xs">
          {helper}
        </Typography>
      </CardContent>
    </Card>
  );
}

function MiniProjectCard({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) {
  return (
    <Card
      variant="bordered"
      className={`absolute z-30 hidden rounded-2xl border-border/70 bg-card/95 shadow-[0_14px_36px_rgba(16,24,40,0.1)] backdrop-blur transition-opacity duration-700 lg:block ${className}`}
      style={style}
    >
      <CardContent className="p-3.5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <Typography variant="h3" component="p" className="text-base">
              Targiz
            </Typography>
          </div>
          <Badge variant="outline" className="border-primary/20 text-primary">
            Aktif
          </Badge>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <Typography variant="muted" className="text-xs">
              İlerleme
            </Typography>
            <Typography variant="h3" component="p" className="mt-1 text-2xl">
              %42
            </Typography>
          </div>
          <Typography variant="muted" className="text-xs">
            3 görev açık
          </Typography>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[42%] rounded-full bg-primary" />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniAssistantCard({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) {
  return (
    <Card
      variant="bordered"
      className={`absolute z-30 hidden rounded-2xl border-border/70 bg-card/95 shadow-[0_14px_36px_rgba(16,24,40,0.1)] backdrop-blur transition-opacity duration-700 lg:block ${className}`}
      style={style}
    >
      <CardContent className="p-3.5 text-left">
        <div className="flex items-center justify-between">
          <Typography variant="small" className="font-semibold">
            AI Asistan
          </Typography>
          <Icon icon="mdi:sparkles" className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-4 rounded-xl bg-muted px-3 py-2 text-sm text-foreground">
          Projeni özetleyeyim mi?
        </div>
        <div className="mt-2 rounded-xl bg-primary/8 px-3 py-2 text-xs text-muted-foreground">
          1 aktif proje, %42 ilerleme ve 3 açık görev görünüyor.
        </div>
      </CardContent>
    </Card>
  );
}

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      setScrollY(window.scrollY);
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const parallax = useMemo(() => {
    const progress = clamp(scrollY / 520, 0, 1);

    return {
      dashboard: `translate3d(0, ${progress * 16}px, 0) scale(${1 + progress * 0.02})`,
      leftTop: `translate3d(${-progress * 42}px, ${progress * 18}px, 0)`,
      leftBottom: `translate3d(${-progress * 62}px, ${progress * 34}px, 0)`,
      rightTop: `translate3d(${progress * 52}px, ${progress * 14}px, 0)`,
      rightBottom: `translate3d(${progress * 70}px, ${progress * 32}px, 0)`,
      bird: `translate3d(${progress * 34}px, ${progress * 22}px, 0) rotate(${progress * 6}deg)`,
    };
  }, [scrollY]);

  const introClass = ready
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-4 opacity-0 blur-sm";

  return (
    <section className="relative isolate overflow-hidden px-4 pb-8 pt-14 sm:pt-16 lg:pb-0">
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[42rem] max-w-5xl rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),rgba(255,255,255,0)_66%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-linear-to-t from-primary/6 to-transparent" />

      <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div
          className={`mt-5 max-w-5xl transition-all delay-100 duration-700 ${introClass}`}
        >
          <Typography
            variant="h1"
            component="h1"
            className="text-4xl leading-[1.08] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
          >
            Freelancer işlerini
            <br />
            <span className="font-display text-primary">tek ve net</span>{" "}
            bir merkezde topla.
          </Typography>
        </div>

        <Typography
          variant="lead"
          className={`mt-5 max-w-3xl text-base leading-7 text-muted-foreground transition-all delay-200 duration-700 sm:text-xl ${introClass}`}
        >
          Neta; projelerden müşterilere, finanstan günlük performansına ve AI
          desteğine kadar her şeyi tek bir{" "}
          <span className="font-medium text-primary">self-hosted</span> çalışma
          alanında birleştirir.
        </Typography>

        <div
          className={`mt-7 flex flex-col items-center justify-center gap-3 transition-all delay-300 duration-700 sm:flex-row ${introClass}`}
        >
          <AnimatedButton
            href="#modules"
            icon="mdi:chevron-right"
            iconPosition="right"
            className="min-w-44"
          >
            Demo&apos;yu Gör
          </AnimatedButton>
          <AnimatedButton
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            icon="mdi:github"
            iconPosition="left"
            variant="outline"
            className="min-w-48"
          >
            GitHub&apos;da İncele
          </AnimatedButton>
        </div>

        <div className="relative z-0 mt-24 w-full sm:mt-40 lg:mt-48">
          <div className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[72%] rounded-t-[999px] border border-primary/10 bg-primary/5 blur-[1px]" />
          <div className="pointer-events-none absolute left-[6%] top-[10%] hidden h-28 w-28 rounded-full border border-dashed border-primary/25 sm:block" />
          <div className="pointer-events-none absolute right-[5%] top-[10%] hidden h-36 w-36 rounded-full border border-dashed border-primary/25 lg:block" />
          <span className="pointer-events-none absolute left-[12%] top-[24%] z-40 hidden text-primary/35 sm:block">
            <Icon icon="mdi:sparkles" className="h-5 w-5" />
          </span>

          <img
            src={HERO_IMAGES.bird}
            alt=""
            className={`pointer-events-none absolute right-[2%] top-[2%] z-40 hidden h-14 w-auto object-contain transition-opacity delay-500 duration-700 lg:block ${introClass}`}
            style={{ transform: parallax.bird }}
          />

          <div className="relative mx-auto min-h-[12.5rem] w-full sm:min-h-[16.5rem] lg:min-h-[20.5rem]">
            <div
              className={`absolute bottom-0 left-1/2 z-20 w-[96%] max-w-4xl -translate-x-1/2 transition-opacity delay-500 duration-700 sm:w-[88%] lg:w-[82%] ${introClass}`}
            >
              <div
                className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-border/80 bg-card shadow-[0_28px_90px_rgba(16,24,40,0.16)]"
                style={{ transform: parallax.dashboard }}
              >
                <img
                  src={HERO_IMAGES.dashboard}
                  alt="Neta müşteri paneli dashboard önizlemesi"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </div>

            <MiniMetricCard
              title="Aktif Projeler"
              value="1"
              helper="Müşteri panelinde takip ediliyor"
              icon="mdi:folder-account-outline"
              tone="blue"
              className={`left-[2%] top-[30%] w-44 delay-700 ${introClass}`}
              style={{ transform: parallax.leftTop }}
            />

            <MiniProjectCard
              className={`bottom-[5%] left-[5%] w-52 delay-[800ms] ${introClass}`}
              style={{ transform: parallax.leftBottom }}
            />

            <MiniMetricCard
              title="Ortalama İlerleme"
              value="%42"
              helper="Revizyon ve görev akışına bağlı"
              icon="mdi:chart-line"
              tone="amber"
              className={`right-[2%] top-[31%] w-48 delay-700 ${introClass}`}
              style={{ transform: parallax.rightTop }}
            />

            <MiniAssistantCard
              className={`bottom-[5%] right-[5%] w-56 delay-[800ms] ${introClass}`}
              style={{ transform: parallax.rightBottom }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
