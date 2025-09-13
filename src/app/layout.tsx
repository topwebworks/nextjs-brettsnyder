"use client";

import "../utils/simpleEdgeFix"; // Simple Edge browser compatibility fix - re-enabled for Edge support
import "../utils/consoleFilter"; // Development console cleanup
import "./globals.css"; // CSS custom properties system and utilities
import "../styles/atmospheric-background-fix.css"; // Fix for atmospheric background in production
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import HydrationFix from "../components/ui/HydrationFix";
import { useEffect } from "react";
import { registerServiceWorker } from "../utils/serviceWorkerRegistration";
import Script from "next/script";


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
  
  // Register service worker for caching
  useEffect(() => {
    registerServiceWorker();
  }, []);

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
  
  // Don't render children until theme is ready to prevent flash
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Brett Snyder Portfolio</title>
        <meta name="description" content="Personal portfolio of Brett Snyder" />
        <meta name="author" content="Brett Snyder" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Brett Snyder Portfolio" />
        <meta property="og:description" content="Personal portfolio of Brett Snyder" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brett Snyder Portfolio" />
        <meta name="twitter:description" content="Personal portfolio of Brett Snyder" />
      </head>
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
      </body>
    </html>
  );
}
