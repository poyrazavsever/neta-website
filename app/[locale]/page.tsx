import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiAssistantSection } from "@/components/sections/ai-assistant-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ClientPortalSection } from "@/components/sections/client-portal-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { SelfHostSection } from "@/components/sections/self-host-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LOCALES, type Locale, isLocale, siteCopy } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  return siteCopy[rawLocale].metadata;
}

export default async function Home({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex min-h-screen flex-col">
        <HeroSection locale={locale} />

        <ModulesSection locale={locale} />
        <ClientPortalSection locale={locale} />
        <AiAssistantSection locale={locale} />
        <SelfHostSection locale={locale} />

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
