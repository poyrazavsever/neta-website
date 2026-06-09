"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Typography } from "poyraz-ui/atoms";

const INSTALL_COMMAND =
  "curl -sL https://raw.githubusercontent.com/poyrazavsever/neta/main/install.sh | bash";

const SELF_HOST_ITEMS = [
  {
    title: "Docker ile kurulur",
    description: "Standalone build için Docker Compose akışı hazır gelir.",
    icon: "mdi:docker",
  },
  {
    title: "Supabase bağlantısı",
    description: "Auth, PostgreSQL ve RLS yapılarını kendi Supabase instance ile bağla.",
    icon: "mdi:database-outline",
  },
  {
    title: "Tek admin hesabı",
    description: "İlk kayıt sonrası public register kapanır; alan freelancer hesabına ait kalır.",
    icon: "mdi:account-lock-outline",
  },
] as const;

export function SelfHostSection() {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="self-host" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-sm border border-border bg-card">
          <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className="space-y-5">
              <div className="space-y-3">
                <Typography variant="h2" component="h2" className="text-3xl">
                  Kendi sunucunda{" "}
                  <span className="font-secondary text-primary">self-host</span>
                </Typography>
                <Typography variant="lead">
                  Neta, freelancer verisini kendi altyapısında tutması için
                  tasarlandı. Docker ile ayağa kaldır, Supabase instance yapısını
                  bağla ve tek kullanıcılı işletim sistemini kur.
                </Typography>
              </div>

              <Button size="sm" asChild>
                <a
                  href="https://github.com/poyrazavsever/neta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="mdi:github" className="h-4 w-4" />
                  GitHub reposunu aç
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={copyInstallCommand}
                className={`w-full rounded-sm border bg-background text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                  copied ? "border-emerald-500" : "border-border"
                }`}
                aria-label="Kurulum komutunu kopyala"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <Typography variant="small">1-click installation</Typography>
                  <span
                    className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground"
                    aria-live="polite"
                  >
                    <Icon
                      icon={copied ? "mdi:check" : "mdi:content-copy"}
                      className={`h-4 w-4 ${copied ? "text-emerald-500" : ""}`}
                    />
                    <span>{copied ? "Kopyalandı" : "Kopyala"}</span>
                  </span>
                </div>
                <div className="px-4 py-4">
                  <code className="block overflow-x-auto whitespace-nowrap font-sans text-xs text-foreground sm:text-sm">
                    {INSTALL_COMMAND}
                  </code>
                </div>
              </button>

              <div className="grid gap-3">
                {SELF_HOST_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 rounded-sm border border-border bg-background p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-primary">
                      <Icon icon={item.icon} className="h-4 w-4" />
                    </span>
                    <div className="space-y-1">
                      <Typography variant="h3" component="h3" className="text-base">
                        {item.title}
                      </Typography>
                      <Typography variant="lead" className="text-sm">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
