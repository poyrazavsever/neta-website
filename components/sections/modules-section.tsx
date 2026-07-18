import { Icon } from "@iconify/react";
import { Card, CardContent, Typography } from "poyraz-ui/atoms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const LEFT_FEATURES = [
  {
    title: "Görevler",
    subtitle: "Trello, Asana, Notion",
    icon: "mdi:checkbox-marked-outline",
    tilt: "rotate-[-3deg]",
  },
  {
    title: "Müşteriler",
    subtitle: "Airtable, CRM'ler",
    icon: "mdi:account-group-outline",
    tilt: "rotate-[2deg]",
  },
  {
    title: "Finans",
    subtitle: "Excel, banka, muhasebe",
    icon: "mdi:currency-usd-circle-outline",
    tilt: "rotate-[-1deg]",
  },
  {
    title: "Notlar",
    subtitle: "Notion, Evernote",
    icon: "mdi:file-document-outline",
    tilt: "rotate-[2deg]",
  },
] as const;

const RIGHT_FEATURES = [
  {
    title: "AI",
    subtitle: "ChatGPT, Gemini",
    icon: "mdi:sparkles",
    tilt: "rotate-[3deg]",
  },
  {
    title: "Takvim",
    subtitle: "Google Calendar",
    icon: "mdi:calendar-month-outline",
    tilt: "rotate-[-2deg]",
  },
  {
    title: "Dosyalar",
    subtitle: "Drive, Dropbox, Box",
    icon: "mdi:folder-outline",
    tilt: "rotate-[1deg]",
  },
  {
    title: "Faturalar",
    subtitle: "Fatura programları",
    icon: "mdi:receipt-text-outline",
    tilt: "rotate-[-2deg]",
  },
] as const;

const MOBILE_FEATURES = [...LEFT_FEATURES, ...RIGHT_FEATURES];

function DesktopFeatureCard({
  feature,
  side,
}: {
  feature: (typeof LEFT_FEATURES | typeof RIGHT_FEATURES)[number];
  side: "left" | "right";
}) {
  return (
    <Card
      variant="bordered"
      className={`relative border-border/60 bg-card/95 shadow-[0_18px_52px_rgba(16,24,40,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
        side === "left" ? "origin-right" : "origin-left"
      } ${feature.tilt}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
            <Icon icon={feature.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0 text-left">
            <Typography variant="h3" component="h3" className="text-base">
              {feature.title}
            </Typography>
            <Typography variant="muted" className="mt-1 text-xs">
              {feature.subtitle}
            </Typography>
            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-muted" />
              <span className="block h-1.5 w-4/5 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MobileFeatureCard({
  feature,
}: {
  feature: (typeof MOBILE_FEATURES)[number];
}) {
  return (
    <Card
      variant="bordered"
      className="border-border/60 bg-card/95 shadow-[0_14px_36px_rgba(16,24,40,0.08)]"
    >
      <CardContent className="p-3.5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
            <Icon icon={feature.icon} className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 text-left">
            <Typography variant="h3" component="h3" className="text-sm">
              {feature.title}
            </Typography>
            <Typography variant="muted" className="mt-1 text-[11px] leading-5">
              {feature.subtitle}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConnectorOverlay() {
  return (
    <svg
      viewBox="0 0 1200 720"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="neta-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0 0L10 5L0 10" fill="none" stroke="rgba(220,38,38,0.62)" strokeWidth="1.6" />
        </marker>
      </defs>

      {[
        "M255 120 C360 120, 420 165, 490 205",
        "M255 280 C365 280, 425 295, 490 320",
        "M255 445 C360 445, 420 430, 490 410",
        "M255 610 C355 610, 415 520, 490 455",
      ].map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(220,38,38,0.34)"
          strokeWidth="2.2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#neta-arrow)"
        />
      ))}

      {[
        "M945 120 C840 120, 780 165, 710 205",
        "M945 280 C835 280, 775 295, 710 320",
        "M945 445 C840 445, 780 430, 710 410",
        "M945 610 C845 610, 785 520, 710 455",
      ].map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(220,38,38,0.34)"
          strokeWidth="2.2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#neta-arrow)"
        />
      ))}
    </svg>
  );
}

export function ModulesSection() {
  return (
    <section id="modules" className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-40 mx-auto h-[34rem] max-w-6xl rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),rgba(255,255,255,0)_68%)]" />

      <div className="container relative mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center" parallaxY={10}>
          <Typography
            variant="h2"
            component="h2"
            className="text-3xl leading-tight"
          >
            Neta bir görev uygulaması değil.
            <br />
            Kişisel{" "}
            <span className="font-display text-primary">işletim sistemin.</span>
          </Typography>

          <Typography
            variant="lead"
            className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Projelerini, müşterilerini, finansını, notlarını, günlük
            performansını ve AI desteğini tek, self-hosted merkezde birleştir.
            Dağınıklığı bitir, işine odaklan.
          </Typography>
        </ScrollReveal>

        <div className="mt-10 lg:hidden">
          <ScrollReveal y={28} parallaxY={12}>
            <Card
              variant="bordered"
              className="overflow-hidden rounded-[1.35rem] border-border/70 bg-card shadow-[0_22px_70px_rgba(16,24,40,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/appSs/dashboard.png"
                  alt="Neta dashboard ekran görüntüsü"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </Card>
          </ScrollReveal>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {MOBILE_FEATURES.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={index * 70}
                y={18}
                x={index % 2 === 0 ? -12 : 12}
              >
                <MobileFeatureCard feature={feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="relative mt-12 hidden lg:grid lg:grid-cols-[0.72fr_1.5fr_0.72fr] lg:items-center lg:gap-6">
          <ConnectorOverlay />

          <div className="relative z-10 grid gap-4">
            {LEFT_FEATURES.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={index * 90}
                x={-28}
                y={20}
              >
                <DesktopFeatureCard feature={feature} side="left" />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal
            className="relative z-20"
            delay={120}
            y={30}
            parallaxY={16}
          >
            <div className="pointer-events-none absolute inset-x-8 top-8 h-64 rounded-full bg-primary/8 blur-3xl" />
            <Card
              variant="bordered"
              className="relative overflow-hidden rounded-[1.4rem] border-border/70 bg-card shadow-[0_26px_90px_rgba(16,24,40,0.13)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/appSs/dashboard.png"
                  alt="Neta dashboard ekran görüntüsü"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </Card>
          </ScrollReveal>

          <div className="relative z-10 grid gap-4">
            {RIGHT_FEATURES.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={index * 90}
                x={28}
                y={20}
              >
                <DesktopFeatureCard feature={feature} side="right" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
