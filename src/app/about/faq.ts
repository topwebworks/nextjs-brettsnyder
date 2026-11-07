// About page FAQ. Shared by the visible section and its FAQPage structured data, so the two always match.
export type Faq = { q: string; a: string[]; link?: { href: string; label: string } };

export const faqs: Faq[] = [
  {
    q: 'Did you build this site yourself?',
    a: [
      'Yes, from scratch. I designed it in the browser and built it on the newest Next.js and React right after they came out. When Tailwind didn’t play well with them, I dropped it and wrote my own CSS.',
    ],
    link: { href: '/projects/personal-portfolio', label: 'Read the build story' },
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
