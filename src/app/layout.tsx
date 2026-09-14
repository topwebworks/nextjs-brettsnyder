import type { Metadata, Viewport } from "next";
import "../utils/simpleEdgeFix"; // Simple Edge browser compatibility fix - re-enabled for Edge support
import "../utils/consoleFilter"; // Development console cleanup
import "./globals.css"; // CSS custom properties system and utilities
import ClientProviders from "./ClientProviders";
import { siteConfig } from "@/lib/config";

const siteUrl = siteConfig.url || "https://www.brettsnyder.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brett Snyder | Design Engineer & Frontend Developer",
    template: "%s | Brett Snyder",
  },
  description:
    "Brett Snyder is a Design Engineer and Product-Focused Frontend Developer building SaaS products, Shopify experiences, and conversion-focused websites.",
  authors: [{ name: "Brett Snyder" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Brett Snyder | Design Engineer & Frontend Developer",
    description:
      "Brett Snyder is a Design Engineer and Product-Focused Frontend Developer building SaaS products, Shopify experiences, and conversion-focused websites.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Brett Snyder | Design Engineer & Frontend Developer",
    description:
      "Brett Snyder is a Design Engineer and Product-Focused Frontend Developer building SaaS products, Shopify experiences, and conversion-focused websites.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body suppressHydrationWarning={true}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
