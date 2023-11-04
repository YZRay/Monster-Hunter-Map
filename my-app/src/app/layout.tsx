import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import GoogleAnalytics from "../components/api/GA";

export const metadata: Metadata = {
  title: "魔物獵人",
  description: "Practice",
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
