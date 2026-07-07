import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/shared/SkipToContent";
import { BackToTop } from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";
import { Providers } from "@/providers/Providers";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────────────────────
   CSS variables exposed here are consumed by @theme inline in globals.css.
   display: "swap" prevents invisible text during font load.
   ─────────────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────────────
   createMetadata() sets all sensible defaults; individual pages override
   via their own `export const metadata` export.
   ─────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#191921" },
  ],
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    /*
     * suppressHydrationWarning: next-themes mutates the `class` attribute on
     * <html> after the server render to apply the persisted theme. Without
     * this, React throws a hydration mismatch warning on every page load.
     */
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground flex min-h-dvh flex-col font-sans antialiased`}
      >
        <Providers>
          <SkipToContent />
          <Header />
          {/*
           * tabIndex={-1} lets the "Skip to content" link programmatically
           * focus this element without making it part of the tab order.
           */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col outline-none"
          >
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
