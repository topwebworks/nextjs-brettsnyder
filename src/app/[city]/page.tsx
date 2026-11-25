import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityPage from '@/components/CityPage';
import { cities } from '@/lib/cities';
import { personSchema, shareImage } from '@/lib/profile';

export const dynamicParams = false;
type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map(city => ({ city: city.slug }));
}

function findCity(slug: string) {
  const city = cities.find(item => item.slug === slug);
  if (!city) notFound();
  return city;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = findCity((await params).city);
  const title = `${city.name} Web Designer & Developer`;
  const description = `${city.name} web design and frontend development with Brett Snyder. Next.js/React, Shopify/Liquid, and design systems. 22 LinkedIn recommendations.`;
  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: { title: `${title} | Brett Snyder`, description, siteName: 'Brett Snyder', url: `${personSchema.url}/${city.slug}`, type: 'website', images: [shareImage] },
  };
}

export default async function Page({ params }: Props) {
  return <CityPage city={findCity((await params).city)} />;
}
