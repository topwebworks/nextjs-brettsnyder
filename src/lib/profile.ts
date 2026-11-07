import { siteConfig } from '@/lib/config';
import type { KeyAchievement } from '@/lib/types/project';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export const siteDescription =
  'Brett Snyder is a frontend developer and design engineer building SaaS products, design systems, Shopify experiences, and conversion-focused websites.';

// One identity for every page and for topwebworks.com (same @id). Employer, skills, and city tell this
// Brett Snyder apart from the others; all of it matches the public resume.
export const personSchema = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Brett Snyder',
  jobTitle: 'Frontend Developer and Design Engineer',
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/brett-snyder-portrait.jpg`,
  homeLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: 'Queen Creek', addressRegion: 'AZ', addressCountry: 'US' },
  },
  worksFor: [
    { '@type': 'Organization', name: 'Cosaint, Inc.' },
    { '@type': 'Organization', name: 'TopWebWorks', url: 'https://topwebworks.com' },
  ],
  knowsAbout: [
    'Frontend development',
    'Design engineering',
    'Design systems',
    'Shopify and Liquid',
    'Next.js',
    'React',
    'UI/UX design',
    'WordPress',
    'AI and agentic development',
    'Conversion-focused websites',
    'Lead generation and marketing automation',
    'Search engine optimization (SEO)',
    'Answer engine optimization (AEO)',
    'Generative engine optimization (GEO)',
    'Web analytics, GA4, and Google Tag Manager',
    'Digital marketing',
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin, 'https://topwebworks.com/about'].filter(Boolean) as string[],
};

// A page that sets its own openGraph replaces the layout's, so every page passes this (or its hero) explicitly.
export const shareImage = { url: '/brett-snyder-portrait.jpg', width: 896, height: 1200, alt: 'Brett Snyder' };

// The bottom-of-page summary card as plain sentences: JSON-LD `abstract` for answer engines. Same facts as the visible card.
export function summaryAbstract(achievements: KeyAchievement[] = []) {
  const sentences = achievements.flatMap((a) => [`${a.title}: ${a.description}`, ...(a.metrics ?? [])]);
  return sentences.map((s) => s.trim().replace(/[.\s]*$/, '.')).join(' ') || undefined;
}

// Home > Projects|Blog > Page, for detail-page structured data. The current page needs no URL.
export function breadcrumbSchema(section: 'Projects' | 'Blog', sectionPath: string, title: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: section, item: `${siteUrl}/${sectionPath}` },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  };
}
