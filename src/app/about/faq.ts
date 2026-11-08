// About page FAQ. Shared by the visible section and its FAQPage structured data, so the two always match.
export type Faq = { q: string; a: string[]; links?: { href: string; label: string }[] };

export const faqs: Faq[] = [
  {
    q: 'Who is Brett Snyder?',
    a: [
      'I’m a frontend developer and design engineer in Queen Creek, Arizona, with more than 15 years building websites. I started as a designer and moved into code. Today I’m the founder of Cosaint, Inc., the company behind CyWire and TopWebWorks.',
    ],
  },
  {
    q: 'What kind of work does Brett Snyder do?',
    a: [
      'I design and build websites and web products: SaaS platforms like CyWire, design systems, and Shopify stores, including two Shopify Plus migrations at Imagine Learning.',
      'Through TopWebWorks, I build custom websites and Shopify stores for local businesses and set up what happens after someone reaches out: lead capture, automated email and text follow-up, SEO, and ongoing digital marketing.',
    ],
    links: [
      { href: '/projects/cywire', label: 'CyWire' },
      { href: '/projects/shopify-migrations', label: 'Shopify Plus migrations' },
      { href: '/projects/topwebworks', label: 'TopWebWorks' },
    ],
  },
  {
    q: 'Is Brett Snyder available for work?',
    a: [
      'Yes, I’m open to new work. Click Say Hello or any mail icon and tell me what you have in mind.',
    ],
  },
  {
    q: 'Does Brett Snyder handle SEO, AEO, GEO, and web analytics?',
    a: [
      'Yes. SEO gets a site found on Google. AEO (answer engine optimization) and GEO (generative engine optimization) get it quoted by AI tools like ChatGPT, Perplexity, and Google AI Overviews. I build for all three: fast, crawlable pages, JSON-LD structured data, and content written as direct answers an AI can lift.',
      'For analytics, I set up and audit GA4, Google Tag Manager, and Search Console. I also built Analytics Workbench, a tool that records what a page sends to GTM, GA4, and ad platforms and explains each tracking problem as a fix.',
      'It works. People have told me they found TopWebWorks through ChatGPT.',
    ],
    links: [
      { href: '/projects/analytics-workbench', label: 'Analytics Workbench' },
      { href: '/projects/topwebworks', label: 'SEO, AEO, and GEO at TopWebWorks' },
      { href: '/projects/amw-hardscape', label: 'AMW Hardscape client site' },
    ],
  },
  {
    q: 'Did you build this site yourself?',
    a: [
      'Yes, from scratch. I built it on the newest Next.js and React right after they came out. When Tailwind didn’t play well with them, I dropped it and wrote my own CSS.',
    ],
    links: [{ href: '/projects/personal-portfolio', label: 'Read the build story' }],
  },
  {
    q: 'How do I get a copy of your resume?',
    a: [
      'Click Download Resume on this page, or the resume icon in the header menu or footer. It opens a preview right here, with buttons to download the PDF or print it.',
    ],
  },
  {
    q: 'What’s the best way to reach you?',
    a: [
      'Email. Click Say Hello or any mail icon and your email app opens with my address and a short starter note filled in. I skipped contact forms on purpose. Email is simpler for both of us.',
    ],
  },
  {
    q: 'Can I listen to blog posts and project pages instead of reading them?',
    a: [
      'Yes. Blog posts, project pages, and this About page have a Listen button at the top. The voice comes from your own browser, so quality depends on your device.',
      'Microsoft Edge has the most natural voices, like Ava and Andrew, and you can pick one from the menu next to Listen. Chrome on Windows and Firefox have fewer voice choices, so Edge is the best option there.',
      'On an iPhone, go to Settings, then Accessibility, then Spoken Content, then Voices, and download an Enhanced or Premium English voice. On a Mac, the same voices are under System Settings, then Accessibility, then Spoken Content. On Android, the voice comes from your phone’s text-to-speech settings.',
    ],
  },
  {
    q: 'How do you add new projects and posts?',
    a: [
      'I make a folder, drop in the images, and run one script. I write in Markdown, and the site loads a fast JSON copy of it. The gallery, previous and next links, and share previews fill in on their own.',
    ],
  },
  {
    q: 'Why does everything look like glass?',
    a: [
      'I wanted something warmer than a flat black-and-white dark mode. See-through panels, soft color orbs, and a slow floating background give it depth without getting in the way.',
      'On a desktop, hover over the homepage to see my portrait fade in. The button in the header switches between light and dark.',
    ],
  },
];
