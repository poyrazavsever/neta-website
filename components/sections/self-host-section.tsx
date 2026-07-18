"use client";

import { Icon } from "@iconify/react";
import { Badge, Card, CardContent, Typography } from "poyraz-ui/atoms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedButton } from "@/components/ui/animated-button";

const DOCS_URL = "/docs";

type SelfHostFlowItem = {
  title: string;
  description: string;
  icon: string;
  accent: boolean;
  badges?: Array<{
    label: string;
    icon: string;
  }>;
};

const SELF_HOST_FLOW: SelfHostFlowItem[] = [
  {
    title: "Sunucu",
    description: "VPS / Bare Metal / Ev sunucusu",
    icon: "mdi:server-outline",
    accent: false,
  },
  {
    title: "Docker",
    description: "İzole, taşınabilir çalışma ortamı",
    icon: "mdi:docker",
    accent: false,
  },
  {
    title: "Neta App",
    description: "İş süreçlerin ve yönetim panelin",
    icon: "mdi:bird",
    accent: true,
  },
  {
    title: "Supabase",
    description: "Veritabanın senin kontrolünde",
    icon: "mdi:database-outline",
    accent: false,
  },
  {
    title: "AI Models",
    description: "",
    icon: "mdi:brain",
    accent: false,
    badges: [
      { label: "OpenAI", icon: "arcticons:openai-chatgpt" },
      { label: "Gemini", icon: "vscode-icons:file-type-gemini" },
      { label: "Ollama", icon: "simple-icons:ollama" },
    ],
  },
] as const;

function FlowCard({
  item,
  index,
}: {
  item: SelfHostFlowItem;
  index: number;
}) {
  return (
    <ScrollReveal
      delay={index * 90}
      y={20}
      x={index % 2 === 0 ? -12 : 12}
      className="relative"
    >
      <Card
        variant="bordered"
        className={`relative h-full rounded-[1.5rem] border bg-card/96 shadow-[0_16px_40px_rgba(16,24,40,0.08)] backdrop-blur ${
          item.accent
            ? "border-primary/30 shadow-[0_20px_54px_rgba(220,38,38,0.12)]"
            : "border-border/70"
        }`}
      >
        <CardContent className="flex h-full flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                item.accent
                  ? "bg-primary/10 text-primary"
                  : "border border-border/80 bg-background text-foreground"
              }`}
            >
              <Icon icon={item.icon} className="h-5.5 w-5.5" />
            </span>

            {item.accent ? (
              <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
            ) : null}
          </div>

          <div className="mt-4 space-y-2 text-left">
            <Typography variant="h3" component="h3" className="text-base leading-6">
              {item.title}
            </Typography>

            {item.description ? (
              <Typography
                variant="muted"
                className="text-sm leading-6 text-muted-foreground"
              >
                {item.description}
              </Typography>
            ) : null}
          </div>

          {item.badges ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.badges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="outline"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border-border/80 bg-background p-0 text-foreground"
                  aria-label={badge.label}
                  title={badge.label}
                >
                  <Icon icon={badge.icon} className="h-5 w-5" />
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {index < SELF_HOST_FLOW.length - 1 ? (
        <>
          <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-px w-8 -translate-y-1/2 border-t-2 border-dashed border-primary/35 xl:block" />
          <span className="pointer-events-none absolute -right-[1.1rem] top-1/2 hidden -translate-y-1/2 text-primary/70 xl:block">
            <Icon icon="mdi:arrow-right" className="h-4 w-4" />
          </span>
        </>
      ) : null}
    </ScrollReveal>
  );
}

export function SelfHostSection() {
  return (
    <section id="self-host" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center" parallaxY={10}>
          <Typography variant="h2" component="h2" className="text-3xl">
            Kendi sunucunda{" "}
            <span className="font-display text-primary">self-host</span>
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Neta; uygulama, veritabanı ve model seçimlerini sana bırakır.
            Kendi stack&apos;in üzerinde çalışır, veri akışı tek bir kontrol
            alanında kalır.
          </Typography>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:gap-5">
          {SELF_HOST_FLOW.map((item, index) => (
            <FlowCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <ScrollReveal
          className="mt-8 flex justify-center"
          delay={220}
          y={18}
        >
          <AnimatedButton
            href={DOCS_URL}
            icon="mdi:arrow-top-right"
            iconPosition="right"
            variant="outline"
            className="min-w-48"
          >
            Dokümantasyonu İncele
          </AnimatedButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
