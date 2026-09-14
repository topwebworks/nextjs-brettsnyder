import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
