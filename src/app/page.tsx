import { Metadata } from 'next';
import Homepage from './HomePageClient';
import { siteConfig } from '@/lib/config';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';
const portraitUrl = `${siteUrl}/brett-snyder-portrait.jpg`;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const sameAs = [siteConfig.github, siteConfig.linkedin].filter(Boolean) as string[];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Brett Snyder | Frontend Developer & Design Engineer',
      mainEntity: { '@id': `${siteUrl}/#person` },
      primaryImageOfPage: portraitUrl,
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Brett Snyder',
      jobTitle: 'Frontend Developer and Design Engineer',
      url: siteUrl,
      image: portraitUrl,
      ...(sameAs.length > 0 && { sameAs }),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Brett Snyder',
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
