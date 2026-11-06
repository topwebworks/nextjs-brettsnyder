import { Metadata } from 'next';
import Homepage from './HomePageClient';
import { siteConfig } from '@/lib/config';
import { personSchema } from '@/lib/profile';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Brett Snyder | Frontend Developer & Design Engineer',
      mainEntity: { '@id': `${siteUrl}/#person` },
      primaryImageOfPage: personSchema.image,
    },
    personSchema,
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
