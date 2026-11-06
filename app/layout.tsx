import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vyrodigital.com").replace(
  /\/$/,
  ""
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VYRO Digital | Build. Brand. Grow.",
    template: "%s | VYRO Digital",
  },
  description:
    "VYRO Digital is a digital growth studio creating high-performance websites, cinematic brand identities, and measurable scale for ambitious businesses.",
  keywords: [
    "digital agency",
    "web development",
    "branding studio",
    "SEO",
    "performance marketing",
    "growth marketing",
    "Jammu",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VYRO Digital — Build. Brand. Grow.",
    description:
      "A digital growth studio helping ambitious businesses build their brand, launch high-converting websites, and scale customer acquisition.",
    url: siteUrl,
    siteName: "VYRO Digital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VYRO Digital — Build. Brand. Grow.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYRO Digital — Build. Brand. Grow.",
    description:
      "A digital growth studio helping ambitious businesses build their brand, launch high-converting websites, and scale customer acquisition.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
