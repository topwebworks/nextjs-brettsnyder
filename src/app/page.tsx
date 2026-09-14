import { Metadata } from 'next';
import Homepage from './HomePageClient';
import { siteConfig } from '@/lib/config';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export const metadata: Metadata = {
  title: 'Brett Snyder | Design Engineer & Frontend Developer',
  description:
    "Brett Snyder is a Design Engineer and Product-Focused Frontend Developer. I build SaaS products, Shopify experiences, and conversion-focused websites.",
  openGraph: {
    title: 'Brett Snyder | Design Engineer & Frontend Developer',
    description:
      "Brett Snyder is a Design Engineer and Product-Focused Frontend Developer. I build SaaS products, Shopify experiences, and conversion-focused websites.",
    type: 'profile',
  },
};

const sameAs = [siteConfig.github, siteConfig.linkedin].filter(Boolean) as string[];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Brett Snyder | Design Engineer & Frontend Developer',
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Brett Snyder',
      jobTitle: 'Design Engineer & Frontend Developer',
      url: siteUrl,
      ...(sameAs.length > 0 && { sameAs }),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Brett Snyder Portfolio',
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Homepage />
    </>
  );
}
