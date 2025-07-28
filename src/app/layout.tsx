import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analise",
  description:
    "Potencialize suas ideias com feedback técnico, inovador e de mercado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
