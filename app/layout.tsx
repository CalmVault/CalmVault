import type { Metadata } from "next";
import { Geist, Geist_Mono, Poly } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poly = Poly({
  weight: ['400'], 
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-poly",
});

export const metadata: Metadata = {
  title: "Calm Vault",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poly.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}