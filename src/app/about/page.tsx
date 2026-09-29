import { Metadata } from 'next';
import AboutPage from './AboutPageClient';

export const metadata: Metadata = {
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

export default function Page() {
  return <AboutPage />;
}
