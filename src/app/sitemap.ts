import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { PROJECT_IDS } from '@/lib/generated/projectManifest';
import { BLOG_IDS } from '@/lib/generated/blogManifest';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/projects`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/tools`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_IDS.map((id) => ({
    url: `${siteUrl}/projects/${id}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_IDS.map((id) => ({
    url: `${siteUrl}/blog/${id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
