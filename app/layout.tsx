import type { Metadata } from "next";
import { Agbalumo, Inter } from "next/font/google";
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
  title: "Neta",
  description: "Freelance Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${agbalumo.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
