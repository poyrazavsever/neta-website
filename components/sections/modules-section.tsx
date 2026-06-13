import { Icon } from "@iconify/react";
import { Card, CardContent, Typography } from "poyraz-ui/atoms";

const LEFT_FEATURES = [
  {
    title: "Görevler",
    subtitle: "Trello, Asana, Notion",
    icon: "mdi:checkbox-marked-outline",
    tilt: "lg:-rotate-3",
  },
  {
    title: "Müşteriler",
    subtitle: "Airtable, CRM'ler",
    icon: "mdi:account-group-outline",
    tilt: "lg:rotate-2",
  },
  {
    title: "Finans",
    subtitle: "Excel, banka, muhasebe",
    icon: "mdi:currency-usd-circle-outline",
    tilt: "lg:-rotate-1",
  },
  {
    title: "Notlar",
    subtitle: "Notion, Evernote",
    icon: "mdi:file-document-outline",
    tilt: "lg:rotate-2",
  },
] as const;

const RIGHT_FEATURES = [
  {
    title: "AI",
    subtitle: "ChatGPT, Gemini",
    icon: "mdi:sparkles",
    tilt: "lg:rotate-3",
  },
  {
    title: "Takvim",
    subtitle: "Google Calendar",
    icon: "mdi:calendar-month-outline",
    tilt: "lg:-rotate-2",
  },
  {
    title: "Dosyalar",
    subtitle: "Drive, Dropbox, Box",
    icon: "mdi:folder-outline",
    tilt: "lg:rotate-1",
  },
  {
    title: "Faturalar",
    subtitle: "Fatura programları",
    icon: "mdi:receipt-text-outline",
    tilt: "lg:-rotate-2",
  },
] as const;

function FeatureCard({
  feature,
  side,
  index,
}: {
  feature: (typeof LEFT_FEATURES | typeof RIGHT_FEATURES)[number];
  side: "left" | "right";
  index: number;
}) {
  const lineClass =
    side === "left"
      ? "lg:after:left-[calc(100%+0.25rem)] lg:after:origin-left"
      : "lg:after:right-[calc(100%+0.25rem)] lg:after:origin-right";

  const lineTilt =
    index === 0
      ? side === "left"
        ? "lg:after:rotate-[8deg]"
        : "lg:after:-rotate-[8deg]"
      : index === 3
        ? side === "left"
          ? "lg:after:-rotate-[8deg]"
          : "lg:after:rotate-[8deg]"
        : "";

  const dotClass =
    side === "left" ? "lg:before:-right-3" : "lg:before:-left-3";

  return (
    <Card
      variant="bordered"
      className={`relative border-border/60 bg-card/95 shadow-[0_18px_52px_rgba(16,24,40,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${feature.tilt} lg:before:absolute lg:before:top-1/2 lg:before:z-20 lg:before:h-2 lg:before:w-2 lg:before:-translate-y-1/2 lg:before:rounded-full lg:before:bg-primary lg:after:absolute lg:after:top-1/2 lg:after:h-px lg:after:w-16 lg:after:border-t lg:after:border-dashed lg:after:border-primary/35 ${dotClass} ${lineClass} ${lineTilt}`}
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

export function ModulesSection() {
  return (
    <section id="modules" className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-40 mx-auto h-[34rem] max-w-5xl rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),rgba(255,255,255,0)_68%)]" />

      <div className="container relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
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
            Projelerini, müşterilerini, finansını, notlarını, günlük performansını
            ve AI desteğini tek, self-hosted merkezde birleştir. Dağınıklığı
            bitir, işine odaklan.
          </Typography>
        </div>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.5fr_0.72fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {LEFT_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                side="left"
                index={index}
              />
            ))}
          </div>

          <div className="relative order-first lg:order-none">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {RIGHT_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                side="right"
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
