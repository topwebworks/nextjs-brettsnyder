import { siteConfig } from '@/lib/config';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

export const personSchema = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Brett Snyder',
  jobTitle: 'Frontend Developer and Design Engineer',
  url: siteUrl,
  image: `${siteUrl}/brett-snyder-portrait.jpg`,
  sameAs: [siteConfig.github, siteConfig.linkedin, 'https://topwebworks.com/about'].filter(Boolean) as string[],
};
