import type { Metadata, Viewport } from "next";
import "../utils/simpleEdgeFix"; // Simple Edge browser compatibility fix - re-enabled for Edge support
import "../utils/consoleFilter"; // Development console cleanup
import "./globals.css"; // CSS custom properties system and utilities
import ClientProviders from "./ClientProviders";
import { siteConfig } from "@/lib/config";
import { shareImage, siteDescription } from "@/lib/profile";

const siteUrl = siteConfig.url || "https://www.brettsnyder.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brett Snyder | Frontend Developer & Design Engineer",
    template: "%s | Brett Snyder",
  },
  description: siteDescription,
  authors: [{ name: "Brett Snyder" }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    title: "Brett Snyder | Frontend Developer & Design Engineer",
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName: "Brett Snyder",
    images: [shareImage],
  },
  // Title, description, and image fall back to each page's Open Graph tags, so pages without their own twitter block stay accurate.
  twitter: { card: "summary" },
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
    // suppressHydrationWarning: the script below may switch data-theme to the visitor's saved choice before React hydrates.
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        {/* Apply a returning visitor's saved theme before first paint, so light-mode visitors don't see a dark flash.
            New visitors keep the dark default. ThemeContext reads the same key after hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
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
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
