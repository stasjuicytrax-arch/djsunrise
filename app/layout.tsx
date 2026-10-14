import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { asset } from "@/lib/asset";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

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

export const metadata: Metadata = {
  title: "SUNRISE · DJ · Bangkok // Pattaya · Press kit",
  description:
    "SUNRISE, DJ from Bangkok // Pattaya. Resident of Republic, Bootshaus and Space Plus, performances in more than 120 cities around the world.",
  icons: { icon: asset("/brand/logo-sunrise.svg") },
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
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
