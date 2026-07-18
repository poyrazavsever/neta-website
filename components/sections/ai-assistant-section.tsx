import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const AI_FEATURES = [
  {
    title: "Verine göre cevap verir",
    description:
      "Görev, proje ve finans kayıtlarını okuyup mevcut iş yükün hakkında özet çıkarır.",
    icon: "mdi:database-search-outline",
  },
  {
    title: "Sağlayıcıyı sen seçersin",
    description:
      "OpenAI, Gemini, Groq veya yerel Ollama kurulumlarıyla aynı arayüzden çalışır.",
    icon: "mdi:tune-variant",
  },
] as const;

export function AiAssistantSection() {
  return (
    <section id="ai-assistant" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <ScrollReveal x={-24} y={24} parallaxY={14}>
            <div className="group overflow-hidden rounded-sm border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <Typography variant="small">AI workspace</Typography>
                </div>
                <Typography variant="muted">Database-aware assistant</Typography>
              </div>

              <div className="overflow-hidden bg-muted/60 p-3">
                <img
                  src="/appSs/ai.png"
                  alt="Neta AI asistan ekran görüntüsü"
                  className="h-auto w-full rounded-sm border border-border bg-background transition-transform duration-300 ease-out group-hover:scale-[1.015]"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal x={24} y={22} parallaxY={10}>
              <div className="space-y-3">
                <Typography variant="h2" component="h2" className="text-3xl">
                  Çalışma alanını bilen{" "}
                  <span className="font-display text-primary">AI asistan</span>
                </Typography>
                <Typography variant="lead">
                  Neta içindeki asistan, boş bir sohbet kutusu gibi davranmaz.
                  Kendi veritabanındaki proje, görev ve finans kayıtlarını
                  bağlam olarak kullanıp freelancer operasyonuna göre cevap
                  verir.
                </Typography>
              </div>
            </ScrollReveal>

            <div className="grid gap-3">
              {AI_FEATURES.map((feature, index) => (
                <ScrollReveal
                  key={feature.title}
                  delay={140 + index * 90}
                  x={20}
                  y={18}
                >
                  <div className="rounded-sm border border-border bg-card p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background text-primary">
                        <Icon icon={feature.icon} className="h-4 w-4" />
                      </span>
                      <Typography variant="h3" component="h3" className="text-base">
                        {feature.title}
                      </Typography>
                    </div>
                    <Typography variant="lead" className="text-sm">
                      {feature.description}
                    </Typography>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
