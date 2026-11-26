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
      'I design and build websites and web products: SaaS platforms like CyWire, design systems, and Shopify stores, including two Shopify Plus migrations at Imagine Learning (AOP.com and IgniteChristianAcademy.com).',
      'Through TopWebWorks, I build custom websites and Shopify stores for local businesses that work on every device, host and maintain them, add custom AI features, and handle branding, SEO, AEO, GEO, analytics, and ongoing digital marketing. I also set up what happens after someone reaches out: lead capture with automated email and text follow-up.',
    ],
    links: [
      { href: '/projects/cywire', label: 'CyWire' },
      { href: '/projects/shopify-migrations', label: 'Shopify Plus migrations' },
      { href: '/projects/topwebworks', label: 'TopWebWorks' },
    ],
  },
  {
    q: 'Where do you offer local website design and Shopify development?',
    a: ["I'm based in Queen Creek, Arizona and work with local businesses across the East Valley, as well as remote teams elsewhere. You'll work directly with me on a website or Shopify project. Most work happens online. For ongoing hosting, maintenance, and marketing, I offer managed plans through Top Web Works. The city pages below explain more about the work I do."],
    links: [
      { href: '/queen-creek', label: 'Queen Creek web design and Shopify' },
      { href: '/gilbert', label: 'Gilbert web design and Shopify' },
      { href: '/chandler', label: 'Chandler web design and Shopify' },
      { href: '/tempe', label: 'Tempe web design and Shopify' },
      { href: '/san-tan-valley', label: 'San Tan Valley web design and Shopify' },
      { href: '/mesa', label: 'Mesa web design and Shopify' },
      { href: '/apache-junction', label: 'Apache Junction web design and Shopify' },
      { href: 'https://topwebworks.com', label: 'Managed websites and marketing at Top Web Works' },
    ],
  },
  {
    q: 'Where can I read recommendations for Brett Snyder?',
    a: [
      'I have 22 LinkedIn recommendations from clients and colleagues about my design, development, and marketing work. Top Web Works, my website and marketing studio, also has 5 stars on Google.',
    ],
    links: [
      { href: 'https://www.linkedin.com/in/topwebworks', label: 'Read all 22 LinkedIn recommendations' },
      { href: 'https://www.google.com/maps/place/Top+Web+Works/@33.2912572,-111.8875128,11z', label: 'Top Web Works on Google' },
    ],
  },
  {
    q: 'What is your experience with Shopify, Next.js/React, and WordPress?',
    a: ['I bring more than 15 years building websites, including extensive CMS/WordPress work and several years of hands-on Shopify/Liquid and Next.js/React development. My graphic design and branding background supports the way I plan content, interfaces, and reusable design systems. Today I emphasize Next.js/React and Shopify for new builds; existing CMS maintenance and scoped improvements can be discussed.'],
    links: [{ href: '/projects/shopify-migrations', label: 'Shopify migration experience' }, { href: '/projects/master-blocks', label: 'CMS and design-system work' }],
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
      'Yes. I build SEO, AEO (answer engine optimization), and GEO (generative engine optimization) foundations into website work: crawlable content, clear customer answers, consistent business details, and appropriate structured data. These help search and AI tools understand and reference a site. Rankings and AI citations depend on the content, market, and search platform.',
      'For analytics, I set up and audit GA4, Google Tag Manager, and Search Console. I also built Analytics Workbench, a tool that records what a page sends to GTM, GA4, and ad platforms and explains each tracking problem as a fix.',
      'The AMW Hardscape case study shows a website connected to search foundations and an inquiry workflow. The client has reported an inquiry through ChatGPT.',
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
