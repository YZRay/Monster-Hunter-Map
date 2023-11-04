import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
