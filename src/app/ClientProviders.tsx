"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import HydrationFix from "../components/ui/HydrationFix";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();

  // EDGE WHITE PAGE FIX - Clear all caches aggressively on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Edg\//.test(navigator.userAgent)) {
      // Clear ALL caches immediately in Edge
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          if (cacheNames.length > 0) {
            console.log('🧹 Edge: Clearing', cacheNames.length, 'caches to prevent white page');
            Promise.all(cacheNames.map(name => caches.delete(name)));
          }
        });
      }

      // Unregister any service workers that might interfere
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(reg => reg.unregister());
        });
      }
    }
  }, []); // Run once on mount

  // Simple Edge cache fix - auto-refresh if chunks are missing
  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Edge\/|Edg\//.test(navigator.userAgent) && process.env.NODE_ENV === 'development') {
      const checkForMissingChunks = () => {
        const hasErrors = document.querySelectorAll('script[src*="_next/static/"]').length === 0 && mounted;
        if (hasErrors && !sessionStorage.getItem('edge-cache-refresh-attempted')) {
          sessionStorage.setItem('edge-cache-refresh-attempted', 'true');
          console.log('🔄 Edge: Missing chunks detected, clearing cache and refreshing...');

          // Clear caches and refresh
          if ('caches' in window) {
            caches.keys().then(cacheNames => {
              cacheNames.forEach(cacheName => caches.delete(cacheName));
              setTimeout(() => window.location.reload(), 100);
            });
          } else {
            setTimeout(() => window.location.reload(), 100);
          }
        }
      };

      // Check after initial load and theme mount
      const timer = setTimeout(checkForMissingChunks, 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Initialize Termly script (simple useEffect approach)
  useEffect(() => {
    if (!window.termlyInitialized) {
      const termlyScript = document.createElement('script');
      termlyScript.src = `https://app.termly.io/resource-blocker/${process.env.NEXT_PUBLIC_TERMLY_UUID || 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}?autoBlock=on`;
      termlyScript.async = false;
      document.head.prepend(termlyScript);
      window.termlyInitialized = true;
    }
  }, []);

  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HydrationFix />
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
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}');
          `,
        }}
      />
    </>
  );
}
