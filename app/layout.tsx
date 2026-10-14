import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { asset } from "@/lib/asset";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { PauseOffscreen } from "@/components/shared/PauseOffscreen";

const outfit = localFont({
  src: [
    {
      path: "./fonts/Outfit-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
    { path: "./fonts/Outfit-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE = "https://stasjuicytrax-arch.github.io/djsunrise";
const TITLE = "SUNRISE · DJ · Bangkok // Pattaya · Press kit";
const DESCRIPTION =
  "SUNRISE, DJ from Bangkok // Pattaya. Resident of Republic, Bootshaus and Space Plus, performances in more than 120 cities around the world.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE}/`),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [{ url: asset("/brand/favicon-sun.svg"), type: "image/svg+xml" }],
    apple: [{ url: asset("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/`,
    siteName: "SUNRISE",
    images: [{ url: `${SITE}/og.jpg`, width: 1200, height: 630, alt: "SUNRISE, DJ, Bangkok // Pattaya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE}/og.jpg`],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={asset("/video/posters/after-movie-grozzman-9x16.webp")}
          media="(max-width: 860px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={asset("/video/posters/after-movie-grozzman-16x9.webp")}
          media="(min-width: 861px)"
          fetchPriority="high"
        />
      </head>
      <body>
        <SmoothScroll />
        <PauseOffscreen />
        {children}
      </body>
    </html>
  );
}
