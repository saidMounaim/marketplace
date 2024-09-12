import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/Header";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import SessionProvierAuth from "@/sessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Marketplace full stack app using nestJs, next.js, prisma & next-auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvierAuth>
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </SessionProvierAuth>
      </body>
    </html>
  );
}
