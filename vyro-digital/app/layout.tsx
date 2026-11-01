import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: { default: "VYRO Digital | Build. Brand. Grow.", template: "%s | VYRO Digital" },
  description: "VYRO Digital is a digital growth studio helping businesses build their brand, establish their online presence and generate customers.",
  keywords: ["digital agency", "web development", "branding", "SEO", "performance marketing", "Jammu"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vyrodigital.in"),
  openGraph: { title: "VYRO Digital — Build. Brand. Grow.", description: "A digital growth studio for ambitious businesses.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}