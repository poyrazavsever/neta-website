"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";

const INSTALL_COMMAND =
  "curl -sL https://raw.githubusercontent.com/poyrazavsever/neta/main/install.sh | bash";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = Math.min(1 + scrollY * 0.0005, 1.25);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative flex flex-col items-center pt-24 sm:pt-32 overflow-hidden min-h-[80vh]">
      {/* Content */}
      <div className="container max-w-3xl mx-auto space-y-5 text-center z-10 relative px-4">
        <Typography
          variant="h1"
          component="h1"
          className="text-4xl sm:text-5xl"
        >
          Tüm Freelance Süreciniz <br className="hidden sm:block" />
          <span className="font-display text-primary">
            Tek Bir Çatı Altında
          </span>
        </Typography>
        
        <Typography
          variant="lead"
          className="max-w-xl mx-auto sm:text-lg"
        >
          Müşterilerinizi sisteme kaydedin, projeleri planlayın ve onların durumu takip edebilmesi için özel portal hesapları oluşturun. Self-hosted kontrol sizde.
        </Typography>
        
        <button
          type="button"
          onClick={copyInstallCommand}
          className={`mx-auto flex w-full max-w-2xl items-center gap-3 rounded-sm border bg-card px-4 py-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            copied ? "border-emerald-500" : "border-border"
          }`}
          aria-label="Kurulum komutunu kopyala"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-primary sm:block" />
            <code className="font-sans truncate text-xs font-medium text-foreground sm:text-sm">
              {INSTALL_COMMAND}
            </code>
          </div>
          <span
            className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground"
            aria-live="polite"
          >
            <Icon
              icon={copied ? "mdi:check" : "mdi:content-copy"}
              className={`h-4 w-4 ${copied ? "text-emerald-500" : ""}`}
            />
            <span className="hidden sm:inline">
              {copied ? "Kopyalandı" : "Kopyala"}
            </span>
          </span>
        </button>
      </div>

      {/* Parallax Scaling Image (Alta sıfır, user ayarı) */}
      <div className="absolute -bottom-13 w-full flex justify-center px-4">
        <div 
          className="relative w-full max-w-4xl origin-bottom"
          style={{ 
            transform: `scale(${scale})`,
            transition: "transform 0.1s ease-out" 
          }}
        >
          <Image
            src="/images/heroSection.png"
            alt="Neta Dashboard Preview"
            width={1200}
            height={600}
            className="w-full h-auto object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
