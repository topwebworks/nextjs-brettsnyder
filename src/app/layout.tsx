import type { Metadata, Viewport } from "next";
import "../utils/simpleEdgeFix"; // Simple Edge browser compatibility fix - re-enabled for Edge support
import "../utils/consoleFilter"; // Development console cleanup
import "./globals.css"; // CSS custom properties system and utilities
import ClientProviders from "./ClientProviders";
import { siteConfig } from "@/lib/config";

const siteUrl = siteConfig.url || "https://www.brettsnyder.me";
const siteDescription =
  "Brett Snyder is a frontend developer and design engineer building SaaS products, design systems, Shopify experiences, and conversion-focused websites.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brett Snyder | Frontend Developer & Design Engineer",
    template: "%s | Brett Snyder",
  },
  description: siteDescription,
  authors: [{ name: "Brett Snyder" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Brett Snyder | Frontend Developer & Design Engineer",
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName: "Brett Snyder",
    images: [{ url: "/brett-snyder-portrait.jpg", width: 896, height: 1200, alt: "Brett Snyder" }],
  },
  twitter: {
    card: "summary",
    title: "Brett Snyder | Frontend Developer & Design Engineer",
    description: siteDescription,
    images: ["/brett-snyder-portrait.jpg"],
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
        {/* Google Consent Mode default - must run before GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              window.gtag = gtag;
            `,
          }}
        />

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
