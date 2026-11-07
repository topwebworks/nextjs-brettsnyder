import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllProjects } from '@/lib/projectLoader';
import { getAllBlogs } from '@/lib/blogLoader';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

type Dated = { publishDate: string; updatedDate?: string };
const lastModified = (item: Dated) => item.updatedDate || item.publishDate;
// A list page changes when its newest entry does. ISO dates sort as strings.
const newest = (items: Dated[]) => items.map(lastModified).sort().at(-1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([getAllProjects(), getAllBlogs()]);

  // Home, About, and Tools have no content date, so they omit lastModified rather than guess.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, images: [`${siteUrl}/brett-snyder-portrait.jpg`], changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, images: [`${siteUrl}/brett-snyder-portrait.jpg`], changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: newest(projects), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: newest(blogs), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/tools`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: lastModified(project),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.id}`,
    lastModified: lastModified(blog),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
