"use client";

import Script from "next/script";
import { ThemeProvider } from "../contexts/ThemeContext";
import CookieConsent from "../components/layout/CookieConsent";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // EMERGENCY: Add global cache clear command for browser console (DEVELOPMENT ONLY)
              window.clearAllCacheNow = function() {
                console.log('🚨 CLEARING ALL CACHES...');

                // Clear all caches
                if ('caches' in window) {
                  caches.keys().then(cacheNames => {
                    cacheNames.forEach(cacheName => {
                      caches.delete(cacheName);
                      console.log('Deleted cache:', cacheName);
                    });
                  });
                }

                // Unregister service workers
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => registration.unregister());
                  });
                }

                // Clear storage
                localStorage.clear();
                sessionStorage.clear();

                console.log('✅ Cache cleared! Refreshing in 2 seconds...');
                setTimeout(() => location.reload(), 2000);
              };

              console.log('🛠️  AVAILABLE: Type "clearAllCacheNow()" in console to clear all caches');
            `,
          }}
        />
      )}
      <ThemeProvider>{children}</ThemeProvider>

      <CookieConsent />

      {/* Google Tag Manager */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
    </>
  );
}
