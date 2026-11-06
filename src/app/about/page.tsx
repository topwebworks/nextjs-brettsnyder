import { Metadata } from 'next';
import AboutPage from './AboutPageClient';
import { personSchema } from '@/lib/profile';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description:
    "Brett Snyder is a designer-turned-developer who builds SaaS products, Shopify experiences, and conversion-focused websites. Learn about his background, skills, and approach.",
  openGraph: {
    title: 'About Brett Snyder',
    description:
      "Brett Snyder is a designer-turned-developer who builds SaaS products, Shopify experiences, and conversion-focused websites. Learn about his background, skills, and approach.",
    type: 'website',
    images: [{ url: '/brett-snyder-portrait.jpg', width: 896, height: 1200, alt: 'Brett Snyder' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${personSchema.url}/about#profilepage`,
  url: `${personSchema.url}/about`,
  name: 'About Brett Snyder',
  mainEntity: personSchema,
  primaryImageOfPage: personSchema.image,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}
