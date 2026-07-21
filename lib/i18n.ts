export const LOCALES = ["tr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export const localeLabels: Record<
  Locale,
  {
    short: string;
    native: string;
    switchTo: string;
    flag: string;
  }
> = {
  tr: {
    short: "TR",
    native: "Türkçe",
    switchTo: "Switch to English",
    flag: "/flags/tr.Png",
  },
  en: {
    short: "EN",
    native: "English",
    switchTo: "Türkçe'ye geç",
    flag: "/flags/en.Png",
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

export function getHomeHref(locale: Locale) {
  return `/${locale}`;
}

export function getSectionHref(locale: Locale, id: string) {
  return `/${locale}#${id}`;
}

export function getDocsHref(locale: Locale, slug: readonly string[] = []) {
  return slug.length === 0 ? `/${locale}/docs` : `/${locale}/docs/${slug.join("/")}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const cleanPath = pathname.split("?")[0]?.split("#")[0] || "/";
  const segments = cleanPath.split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return cleanPath || "/";
}

export function localizePath(locale: Locale, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function getAlternateLocaleHref(pathname: string, locale: Locale) {
  return localizePath(locale, stripLocaleFromPathname(pathname));
}

export const siteCopy = {
  tr: {
    metadata: {
      title: "Neta | Self-hosted freelancer işletim sistemi",
      description:
        "Neta; freelancerlar için müşteri, proje, finans, AI ve portal akışlarını tek self-hosted çalışma alanında birleştirir.",
    },
    nav: {
      homeAria: "Neta ana sayfa",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      language: "Dil seç",
      github: "GitHub'da İncele",
      links: [
        { id: "modules", label: "Modüller", accent: false },
        { id: "client-portal", label: "Özellikler", accent: false },
        { id: "ai-assistant", label: "AI Asistanı", accent: true },
        { id: "self-host", label: "Self-Host", accent: false },
        { id: "docs", label: "Dökümantasyon", accent: false },
      ],
    },
    demo: {
      button: "Demo'yu Gör",
      title: "Neta Demo",
      description: "Demo ortamına giriş için test hesabını kullanabilirsin.",
      email: "E-posta",
      password: "Şifre",
      copy: "Kopyala",
      copied: "Kopyalandı",
      copyAll: "Bilgileri kopyala",
      copiedAll: "Bilgiler kopyalandı",
      openDemo: "Demo'ya git",
      allCredentialsLabel: "Email",
      allCredentialsPasswordLabel: "Şifre",
    },
    hero: {
      titlePrefix: "İşlerini",
      titleAccent: "tek ve net",
      titleSuffix: "yönet.",
      description:
        "Neta; projelerden müşterilere, finanstan günlük performansına ve AI desteğine kadar her şeyi tek bir self-hosted çalışma alanında birleştirir.",
      github: "GitHub'da İncele",
    },
    modules: {
      titleLine1: "Neta bir görev uygulaması değil.",
      titlePrefix: "Kişisel",
      titleAccent: "işletim sistemin.",
      description:
        "Projelerini, müşterilerini, finansını, notlarını, günlük performansını ve AI desteğini tek, self-hosted merkezde birleştir. Dağınıklığı bitir, işine odaklan.",
      dashboardAlt: "Neta dashboard ekran görüntüsü",
      leftFeatures: [
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
      ],
      rightFeatures: [
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
      ],
    },
    clientPortal: {
      titlePrefix: "Müşteriye ayrı, kontrollü bir",
      titleAccent: "portal",
      description:
        "Müşteriler yalnızca kendi projelerinin durumunu, görünür görevleri ve revizyon akışını takip eder. İç notlar, finans ve kişisel planlama freelancer tarafında kalır.",
      points: [
        "Proje ilerlemesi sade ve anlaşılır görünür.",
        "Revizyon istekleri proje bağlamında toplanır.",
        "Portal, müşteriye kontrollü bir okuma alanı sunar.",
      ],
      screens: [
        {
          title: "Dashboard",
          image: "/clientSs/dashboard.png",
          alt: "Müşteri portal dashboard ekran görüntüsü",
        },
        {
          title: "Proje ilerlemesi",
          image: "/clientSs/projeİlerlemesi.png",
          alt: "Müşteri portal proje ilerlemesi ekran görüntüsü",
        },
        {
          title: "Revizyon akışı",
          image: "/clientSs/revizyın.png",
          alt: "Müşteri portal revizyon ekran görüntüsü",
        },
      ],
    },
    ai: {
      workspace: "AI workspace",
      assistantLabel: "Database-aware assistant",
      screenshotAlt: "Neta AI asistan ekran görüntüsü",
      titlePrefix: "Çalışma alanını bilen",
      titleAccent: "AI asistan",
      description:
        "Neta içindeki asistan, boş bir sohbet kutusu gibi davranmaz. Kendi veritabanındaki proje, görev ve finans kayıtlarını bağlam olarak kullanıp freelancer operasyonuna göre cevap verir.",
      features: [
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
      ],
    },
    selfHost: {
      titlePrefix: "Kendi sunucunda",
      titleAccent: "self-host",
      description:
        "Neta; uygulama, veritabanı ve model seçimlerini sana bırakır. Kendi stack'in üzerinde çalışır, veri akışı tek bir kontrol alanında kalır.",
      docsCta: "Dokümantasyonu İncele",
      flow: [
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
      ],
    },
    footer: {
      description: "Self-hosted freelancer işletim sistemi.",
      docs: "Dökümantasyon",
      madeBy: "poyrazavsever tarafından yapıldı",
      links: [
        { id: "modules", label: "Modüller" },
        { id: "client-portal", label: "Özellikler" },
        { id: "ai-assistant", label: "AI Asistanı" },
        { id: "self-host", label: "Self-Host" },
      ],
    },
    docs: {
      title: "Dökümantasyon",
      metadataTitle: "Dökümantasyon | Neta",
      resources: "Kaynaklar",
      previous: "Önceki",
      next: "Sonraki",
      startBadge: "Başla",
      backHome: "Siteye dön",
      openMenu: "Dokümantasyon menüsünü aç",
      closeMenu: "Dokümantasyon menüsünü kapat",
      sidebarAria: "Neta dokümantasyon",
    },
  },
  en: {
    metadata: {
      title: "Neta | Self-hosted freelancer operating system",
      description:
        "Neta brings clients, projects, finance, AI, and portal workflows into one self-hosted workspace for freelancers.",
    },
    nav: {
      homeAria: "Neta home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Select language",
      github: "View on GitHub",
      links: [
        { id: "modules", label: "Modules", accent: false },
        { id: "client-portal", label: "Features", accent: false },
        { id: "ai-assistant", label: "AI Assistant", accent: true },
        { id: "self-host", label: "Self-Host", accent: false },
        { id: "docs", label: "Docs", accent: false },
      ],
    },
    demo: {
      button: "View Demo",
      title: "Neta Demo",
      description: "Use the test account below to enter the demo workspace.",
      email: "Email",
      password: "Password",
      copy: "Copy",
      copied: "Copied",
      copyAll: "Copy credentials",
      copiedAll: "Credentials copied",
      openDemo: "Open demo",
      allCredentialsLabel: "Email",
      allCredentialsPasswordLabel: "Password",
    },
    hero: {
      titlePrefix: "Run your work",
      titleAccent: "clear and focused",
      titleSuffix: "with Neta.",
      description:
        "Neta brings projects, clients, finance, daily performance, and AI support into one self-hosted workspace.",
      github: "View on GitHub",
    },
    modules: {
      titleLine1: "Neta is not another task app.",
      titlePrefix: "It is your personal",
      titleAccent: "operating system.",
      description:
        "Bring projects, clients, finance, notes, daily performance, and AI support into one self-hosted center. Cut the noise and focus on the work.",
      dashboardAlt: "Neta dashboard screenshot",
      leftFeatures: [
        {
          title: "Tasks",
          subtitle: "Trello, Asana, Notion",
          icon: "mdi:checkbox-marked-outline",
          tilt: "rotate-[-3deg]",
        },
        {
          title: "Clients",
          subtitle: "Airtable, CRMs",
          icon: "mdi:account-group-outline",
          tilt: "rotate-[2deg]",
        },
        {
          title: "Finance",
          subtitle: "Excel, banking, accounting",
          icon: "mdi:currency-usd-circle-outline",
          tilt: "rotate-[-1deg]",
        },
        {
          title: "Notes",
          subtitle: "Notion, Evernote",
          icon: "mdi:file-document-outline",
          tilt: "rotate-[2deg]",
        },
      ],
      rightFeatures: [
        {
          title: "AI",
          subtitle: "ChatGPT, Gemini",
          icon: "mdi:sparkles",
          tilt: "rotate-[3deg]",
        },
        {
          title: "Calendar",
          subtitle: "Google Calendar",
          icon: "mdi:calendar-month-outline",
          tilt: "rotate-[-2deg]",
        },
        {
          title: "Files",
          subtitle: "Drive, Dropbox, Box",
          icon: "mdi:folder-outline",
          tilt: "rotate-[1deg]",
        },
        {
          title: "Invoices",
          subtitle: "Invoicing tools",
          icon: "mdi:receipt-text-outline",
          tilt: "rotate-[-2deg]",
        },
      ],
    },
    clientPortal: {
      titlePrefix: "A separate, controlled",
      titleAccent: "client portal",
      description:
        "Clients only follow their own project status, visible tasks, and revision flow. Internal notes, finance, and personal planning stay on the freelancer side.",
      points: [
        "Project progress stays simple and readable.",
        "Revision requests stay attached to project context.",
        "The portal gives clients a controlled place to read updates.",
      ],
      screens: [
        {
          title: "Dashboard",
          image: "/clientSs/dashboard.png",
          alt: "Client portal dashboard screenshot",
        },
        {
          title: "Project progress",
          image: "/clientSs/projeİlerlemesi.png",
          alt: "Client portal project progress screenshot",
        },
        {
          title: "Revision flow",
          image: "/clientSs/revizyın.png",
          alt: "Client portal revision screenshot",
        },
      ],
    },
    ai: {
      workspace: "AI workspace",
      assistantLabel: "Database-aware assistant",
      screenshotAlt: "Neta AI assistant screenshot",
      titlePrefix: "An AI assistant that",
      titleAccent: "knows your workspace",
      description:
        "Neta's assistant is not an empty chat box. It uses your own project, task, and finance records as context, then answers for the way your freelance operation actually works.",
      features: [
        {
          title: "Answers from your data",
          description:
            "Reads task, project, and finance records to summarize your current workload.",
          icon: "mdi:database-search-outline",
        },
        {
          title: "Choose your provider",
          description:
            "Use OpenAI, Gemini, Groq, or a local Ollama setup through the same interface.",
          icon: "mdi:tune-variant",
        },
      ],
    },
    selfHost: {
      titlePrefix: "Self-host on",
      titleAccent: "your own server",
      description:
        "Neta lets you choose the app, database, and model setup. It runs on your stack and keeps the data flow inside one control area.",
      docsCta: "Read the Docs",
      flow: [
        {
          title: "Server",
          description: "VPS / Bare Metal / Home server",
          icon: "mdi:server-outline",
          accent: false,
        },
        {
          title: "Docker",
          description: "Isolated, portable runtime",
          icon: "mdi:docker",
          accent: false,
        },
        {
          title: "Neta App",
          description: "Your workflows and management panel",
          icon: "mdi:bird",
          accent: true,
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
      ],
    },
    footer: {
      description: "Self-hosted freelancer operating system.",
      docs: "Docs",
      madeBy: "Built by poyrazavsever",
      links: [
        { id: "modules", label: "Modules" },
        { id: "client-portal", label: "Features" },
        { id: "ai-assistant", label: "AI Assistant" },
        { id: "self-host", label: "Self-Host" },
      ],
    },
    docs: {
      title: "Docs",
      metadataTitle: "Docs | Neta",
      resources: "Resources",
      previous: "Previous",
      next: "Next",
      startBadge: "Start",
      backHome: "Back to site",
      openMenu: "Open documentation menu",
      closeMenu: "Close documentation menu",
      sidebarAria: "Neta documentation",
    },
  },
} as const;
