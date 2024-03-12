import "./globals.css";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import GoogleAnalytics from "../../components/scripts/GA";
import Adsense from "../../components/scripts/Adsense";
import { ThemeProviders } from "@/components/Providers/ThemeProvider";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import ATSManager from "../../components/scripts/atsManager.js";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mhnow.cc"),
  openGraph: {
    title: "MHNow 魔物地圖",
    description: "歡迎上傳你看到的魔物...方便大家找怪喔",
    url: "https://mhnow.cc",
    siteName: "MHNow 魔物地圖",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/assets/og.jpg",
        width: 1200,
        height: 630,
        alt: "MHNow 魔物地圖",
      },
    ],
  },
  title: "MHNow 魔物地圖 Monster Hunter Now Map",
  description:
    "Monster Hunter Now 的各位獵人們 歡迎上傳你看到的魔物...方便大家找怪喔。芒亨Now、萌夯Now",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/assets/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/assets/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/assets/apple-touch-icon.png",
    },
  ],
  keywords: [
    "Monster Hunter Now",
    "MonsterHunter",
    "MHN",
    "魔物獵人",
    "魔物獵人 Now",
    "魔物獵人地圖",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="bg-light-gradient dark:bg-dark-gradient">
        <Adsense />
        <ATSManager />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ThemeProviders>
          <Navbar lng={lng} />
          {children}
          <Footer lng={lng} />
        </ThemeProviders>
      </body>
    </html>
  );
}
