import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";

const MODULES = [
  {
    title: "Dashboard",
    label: "Komuta merkezi",
    description:
      "Aktif gelir, yaklaşan teslimler ve tamamlanan işler tek bakışta görünür.",
    image: "/appSs/dahboard.png",
    icon: "mdi:view-dashboard-outline",
    className: "md:col-span-3",
    imageClassName:
      "right-4 bottom-3 w-[46%] origin-bottom-right group-hover:scale-[1.04]",
  },
  {
    title: "Müşteriler",
    label: "CRM",
    description:
      "Müşteri notlarını, durumlarını ve bağlı projeleri aynı kayıt altında tut.",
    image: "/appSs/musteriler.png",
    icon: "mdi:account-group-outline",
    className: "md:col-span-3",
    imageClassName:
      "left-4 bottom-3 w-[50%] origin-bottom-left group-hover:scale-[1.04]",
  },
  {
    title: "Projeler",
    label: "Pipeline",
    description:
      "Milestone, ilerleme ve deadline takibiyle her işi net bir akışta yönet.",
    image: "/appSs/projeler.png",
    icon: "mdi:briefcase-outline",
    className: "md:col-span-2",
    imageClassName:
      "right-4 bottom-3 w-[58%] origin-bottom-right group-hover:scale-[1.04]",
  },
  {
    title: "Görevler",
    label: "Operasyon",
    description:
      "Öncelik, durum ve teslim tarihleriyle günlük iş yükünü parçalara ayır.",
    image: "/appSs/görevler.png",
    icon: "mdi:checkbox-marked-circle-outline",
    className: "md:col-span-2",
    imageClassName:
      "right-4 bottom-3 w-[58%] origin-bottom-right group-hover:scale-[1.04]",
  },
  {
    title: "Takvim",
    label: "Plan",
    description:
      "Teslimleri, görüşmeleri ve odak zamanlarını tek zaman çizgisinde gör.",
    image: "/appSs/takvim.png",
    icon: "mdi:calendar-month-outline",
    className: "md:col-span-2",
    imageClassName:
      "left-4 bottom-3 w-[58%] origin-bottom-left group-hover:scale-[1.04]",
  },
  {
    title: "Finans",
    label: "Ledger",
    description:
      "Gelir, gider ve nakit akışını proje bağlamından koparmadan takip et.",
    image: "/appSs/finans.png",
    icon: "mdi:finance",
    className: "md:col-span-3",
    imageClassName:
      "right-4 bottom-3 w-[48%] origin-bottom-right group-hover:scale-[1.04]",
  },
  {
    title: "AI Asistan",
    label: "İçgörü",
    description:
      "Veritabanındaki görev, proje ve finans bilgilerine göre özet ve cevap al.",
    image: "/appSs/ai.png",
    icon: "mdi:sparkles",
    className: "md:col-span-3",
    imageClassName:
      "right-4 bottom-3 w-[48%] origin-bottom-right group-hover:scale-[1.04]",
  },
] as const;

export function ModulesSection() {
  return (
    <section id="modules" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 max-w-2xl space-y-3">
          <Typography variant="h2" component="h2" className="text-3xl">
            Freelancer iş akışının tüm{" "}
            <span className="font-secondary text-primary">modülleri</span>
          </Typography>
          <Typography variant="lead">
            Günlük planından müşteri teslimlerine, finans takibinden AI
            özetlerine kadar Neta tek self-hosted çalışma alanı olarak çalışır.
          </Typography>
        </div>

        <div className="grid gap-3 md:grid-cols-6">
          {MODULES.map((module) => (
            <article
              key={module.title}
              className={`group relative isolate flex min-h-[250px] flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary ${module.className}`}
            >
              <div className="relative z-10 max-w-[18rem] space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background text-primary">
                      <Icon icon={module.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <Typography variant="h3" component="h3" className="text-base">
                        {module.title}
                      </Typography>
                      <Typography variant="muted">{module.label}</Typography>
                    </div>
                  </div>
                </div>

                <Typography variant="lead" className="text-sm">
                  {module.description}
                </Typography>
              </div>

              <div className="pointer-events-none relative h-full overflow-hidden bg-linear-to-t from-transparent to-muted/80">
                <img
                  src={module.image}
                  alt={`${module.title} ekran görüntüsü`}
                  className={`absolute h-auto rounded-sm border border-border bg-background object-contain transition-transform duration-300 ease-out ${module.imageClassName}`}
                />
                <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-card to-transparent" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
