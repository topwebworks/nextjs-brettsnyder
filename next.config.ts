import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 3600, // 1 hour cache (was 60 seconds)
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90], // Next 16 only allows 75 by default; card images use 85, project hero 90
  },
  
  // Enhanced caching and optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true, // Re-enable ETags for better caching
  trailingSlash: false,
  
  // No custom Cache-Control: Next.js/Vercel defaults let the CDN cache pages and clear it on
  // each deploy. A browser max-age on pages served stale HTML after deploys.
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Permanent redirects for moved/renamed content
  async redirects() {
    return [
      {
        source: '/projects/shopify-what-i-learned',
        destination: '/blog/shopify-tips',
        permanent: true,
      },
    ];
  },
}

export default nextConfig;
