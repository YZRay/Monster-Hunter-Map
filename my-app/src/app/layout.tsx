import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import GoogleAnalytics from "../components/api/GA";

export const metadata: Metadata = {
  title: "MHNow 魔物地圖",
  description: "歡迎上傳你看到的魔物...方便大家找怪喔",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-tw">
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
