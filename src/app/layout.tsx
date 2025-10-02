import "./globals.css";
import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import HeaderNav from "@/components/layout/HeaderNav";
import LenisRoot from "@/components/layout/LenisRoot";
import ParticlesBackground from "@/components/layout/ParticlesBackground";
import CommandPalette from "@/components/ui/CommandPalette";

const font = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Karolina Ćwiklińska | Portfolio",
  description: "Full Stack Developer Portfolio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
    ]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${font.className} bg-gray-950 text-white`}>
        <LanguageProvider>
          <LenisRoot />
          <ParticlesBackground />
          <HeaderNav />
          <CommandPalette />
          <div className="page-x pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
