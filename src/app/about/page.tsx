import { Metadata } from 'next';
import AboutPage from './AboutPageClient';
import { personSchema, shareImage } from '@/lib/profile';
import { faqs } from './faq';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description:
    "Brett Snyder, a designer-turned-developer in Queen Creek, AZ, builds SaaS, design systems, and Shopify experiences. Read his 22 LinkedIn recommendations.",
  openGraph: {
    siteName: 'Brett Snyder',
    title: 'About Brett Snyder',
    description:
      "Brett Snyder, a designer-turned-developer in Queen Creek, AZ, builds SaaS, design systems, and Shopify experiences. Read his 22 LinkedIn recommendations.",
    type: 'website',
    images: [shareImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${personSchema.url}/about#profilepage`,
      url: `${personSchema.url}/about`,
      name: 'About Brett Snyder',
      mainEntity: personSchema,
      primaryImageOfPage: personSchema.image,
    },
    // Keep the structured answers consistent with the visible FAQs; FAQ rich results are retired.
    {
      '@type': 'FAQPage',
      '@id': `${personSchema.url}/about#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a.join(' ') },
      })),
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
      <AboutPage />
    </>
  );
}
