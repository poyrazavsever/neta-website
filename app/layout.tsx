import type { Metadata } from "next";
import { Agbalumo, Inter } from "next/font/google";
import { LocaleHtmlLang } from "@/components/locale-html-lang";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const agbalumo = Agbalumo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-agbalumo",
});

export const metadata: Metadata = {
  title: {
    default: "Neta",
    template: "%s",
  },
  description: "Self-hosted freelancer operating system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${agbalumo.variable} antialiased min-h-screen`}
      >
        <LocaleHtmlLang />
        {children}
      </body>
    </html>
  );
}
