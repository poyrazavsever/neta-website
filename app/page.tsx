import { NAV_LINKS } from "@/config/links";
import { AiAssistantSection } from "@/components/sections/ai-assistant-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ClientPortalSection } from "@/components/sections/client-portal-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { SelfHostSection } from "@/components/sections/self-host-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      <ModulesSection />
      <ClientPortalSection />
      <AiAssistantSection />
      <SelfHostSection />

      {/* Other Sections */}
      {NAV_LINKS.filter(
        (item) =>
          item.id !== "modules" &&
          item.id !== "client-portal" &&
          item.id !== "ai-assistant" &&
          item.id !== "self-host",
      ).map((item) => (
        <PlaceholderSection key={item.id} id={item.id} title={item.label} />
      ))}

      <SiteFooter />
    </div>
  );
}
