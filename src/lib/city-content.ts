import type { Faq } from '@/app/about/faq';
import type { City } from '@/lib/cities';

type CityContent = {
  introduction: string;
  context: string;
  approach: string;
  frontend: string;
  shopify: string;
  question: string;
  answer: string;
  proof: { title: string; href: string; text: string }[];
};

export const cityContent: Record<City['slug'], CityContent> = {
  'queen-creek': {
    introduction: "I'm Brett Snyder, a frontend developer and design engineer based in Queen Creek. I design and build Next.js/React websites and Shopify storefronts, bringing together visual design, usable interfaces, search foundations, and a clear next step for the visitor.",
    context: 'Queen Creek is my actual base. You work directly with me on a new website, a storefront redesign, a reusable component system, or a defined piece of frontend development. Most collaboration is online, and client visits can be arranged around the project.',
    approach: 'For a service business, I look at how a visitor understands the offer and requests an estimate or appointment. For a retailer, I look at product discovery and the purchase path. My portfolio shows the design decisions, code, editing controls, and measurement behind that work.',
    frontend: 'Next.js and React websites with purposeful service pages, accessible interactions, and reusable components. The AMW Hardscape project shows how I connect the frontend to native CRM forms, inquiry stages, and follow-up.',
    shopify: 'Shopify design and Liquid development for product brands: custom sections, product and collection templates, navigation, and editor controls. My two enterprise migrations at Imagine Learning show the experience behind that work.',
    question: 'Can I work directly with a Queen Creek developer on part of an existing site?',
    answer: 'Yes. Share the current site or codebase, the change you need, and who will maintain it. I can review a defined frontend task, redesign, or component-library project and agree the scope with you. The portfolio contact goes directly to me.',
    proof: [
      { title: 'AMW website and lead workflow', href: '/projects/amw-hardscape', text: 'A service-business website connecting Next.js, conversion paths, search foundations, and native CRM follow-up.' },
      { title: 'Enterprise Shopify migrations', href: '/projects/shopify-migrations', text: 'Prior Imagine Learning work for AOP and Ignite Christian Academy, with custom Liquid sections and editable storefronts.' },
      { title: 'Design systems in practice', href: '/projects/topwebworks', text: 'Reusable website foundations, branding, and responsive components supporting custom client work.' },
    ],
  },
  gilbert: {
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer and frontend developer serving Gilbert. My work spans Next.js/React websites, Shopify/Liquid storefronts, and design systems, with the perspective of someone who has also run a Gilbert business.",
    context: 'I ran Funastics in Gilbert and handled its website and local search work. That experience informs how I approach a business site: explain the offer, answer practical questions, and make the next step easy. My current portfolio also includes enterprise development and web-product work.',
    approach: 'A studio or service business may need a clearer inquiry path; a product brand may need better collection navigation and editable campaign pages. I connect those goals to the design, content, and frontend scope, then review the work directly with you.',
    frontend: 'Next.js and React development for marketing sites, service websites, and product interfaces. Reusable design systems help carry branding and accessible interaction patterns across pages and future changes.',
    shopify: 'Shopify web design and custom Liquid sections for Gilbert retailers and product brands. My enterprise-employer work includes two migrations and content controls that marketing teams can use independently.',
    question: 'What does your Gilbert business-owner experience add to a website project?',
    answer: 'Running Funastics meant making decisions about customers, offers, inquiries, and local visibility as well as the website. I bring that perspective to project planning while keeping the current business goals and available evidence in view. The Funastics article describes that experience.',
    proof: [
      { title: 'Running Funastics in Gilbert', href: '/blog/funastics', text: 'The business-owner background behind my approach to websites, marketing, and customer decisions.' },
      { title: 'Shopify sections and migrations', href: '/projects/shopify-migrations', text: 'Editable storefront development and reusable Liquid sections from prior enterprise-employer work.' },
      { title: 'CMS and design-system experience', href: '/projects/master-blocks', text: 'Reusable components and editor controls built to help teams publish consistent pages efficiently.' },
    ],
  },
  chandler: {
    introduction: "I'm Brett Snyder, a frontend developer and web designer serving Chandler from Queen Creek. I bring several years of hands-on Shopify/Liquid and Next.js/React work, backed by a longer foundation in CMS websites, graphic design, and branding.",
    context: 'A Chandler project can start with an existing design, a storefront that needs clearer content controls, or a website ready for a considered redesign. I can work directly with an owner or alongside an existing design and marketing team on a defined frontend scope.',
    approach: 'I pay attention to what happens after handoff: which content the team can edit, which components can be reused, and how future pages stay consistent. The Shopify migrations and Master Blocks examples show those decisions in real enterprise work.',
    frontend: 'Next.js and React implementation, responsive UI, and component systems that connect a design direction to working pages. Scope can include a business website or frontend work within an established product team.',
    shopify: 'Custom Shopify Liquid sections, product templates, collection layouts, and campaign pages. Editor controls are planned around the content a Chandler store owner or marketing team needs to manage.',
    question: 'Can you work with a Chandler design or marketing team?',
    answer: 'Yes. I can implement supplied designs, build reusable frontend components, and agree content controls and handoff needs with the team. My enterprise portfolio distinguishes my development role from the artwork, copy, and final compositions chosen by client designers and marketers.',
    proof: [
      { title: 'Shopify content controls', href: '/projects/shopify-migrations', text: 'Custom sections and storefront templates, with clear attribution for the development and client-design roles.' },
      { title: 'Master Blocks', href: '/projects/master-blocks', text: 'CMS components, reusable layouts, and an editor handoff designed for ongoing marketing work.' },
      { title: 'How I build design systems', href: '/blog/design-systems', text: 'A practical account of moving from design decisions and tokens to working components and page composition.' },
    ],
  },
  tempe: {
    introduction: "I'm Brett Snyder, a web designer and frontend developer serving Tempe from Queen Creek. My portfolio combines Next.js/React product interfaces, Shopify storefront development, reusable design systems, and conversion-focused business websites.",
    context: 'Some Tempe projects need a complete marketing site; others need a developer who can turn an existing interface direction into working frontend components. I work directly with owners and teams to define the user journey, implementation, and handoff.',
    approach: 'For a web product, I look at useful flows, interface states, accessibility, and maintainable components. For a business website or store, I connect those same design principles to inquiries, product understanding, and the next customer action.',
    frontend: 'React and Next.js frontend development with a product and design-system perspective. CyWire shows my own SaaS work, while Analytics Workbench demonstrates interface design around a focused technical workflow.',
    shopify: 'Shopify design and Liquid development for stores and product brands, including custom sections and editable page layouts. My enterprise migrations show how I support marketing content alongside storefront functionality.',
    question: 'Can you help with a product interface as well as a business website?',
    answer: 'Yes. My portfolio includes SaaS and tool interfaces alongside business websites and Shopify development. I can discuss frontend implementation, reusable components, design systems, and UI/UX work with your team. The scope and responsibilities are agreed around the existing product and project needs.',
    proof: [
      { title: 'CyWire product work', href: '/projects/cywire', text: 'My own Master Prompt workspace, showing product-focused design engineering and frontend development.' },
      { title: 'Analytics Workbench', href: '/projects/analytics-workbench', text: 'An interface and workflow for examining analytics and advertising events and making tracking issues understandable.' },
      { title: 'Enterprise Shopify development', href: '/projects/shopify-migrations', text: 'Two migrations and a reusable Liquid section library from my work at Imagine Learning.' },
    ],
  },
  'san-tan-valley': {
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer and developer serving San Tan Valley. I build Next.js/React websites and Shopify stores with clear content, consistent branding, useful buyer answers, and a practical path to inquire or purchase.",
    context: 'For a San Tan Valley owner planning a first website or a redesign, the starting point is the business: what you offer, who needs it, and what a visitor should do next. You can bring rough notes, an existing site, brand assets, or a defined development task.',
    approach: 'My graphic design and branding background helps connect the visual direction to the content and code. I plan the frontend and handoff together, so a service website and a product storefront each support the way the business will use them.',
    frontend: 'Custom Next.js and React websites for service businesses and considered redesigns. Clear service pages, accessible calls to action, and native inquiry workflows support the customer journey.',
    shopify: 'Shopify website design and Liquid development for San Tan Valley retailers and product brands. Product information, collection structure, mobile layouts, and agreed editing controls are planned together.',
    question: 'What should I prepare for a first website or redesign?',
    answer: 'Send the current website if you have one, a description of the business and its customers, the services or products to feature, and any existing photos or brand assets. We can then define the content, frontend work, inquiry or purchase path, and launch priorities before agreeing the scope.',
    proof: [
      { title: 'A service website and inquiry path', href: '/projects/amw-hardscape', text: 'How design, content, search setup, and native follow-up support the same service-business journey.' },
      { title: 'Shopify migration portfolio', href: '/projects/shopify-migrations', text: 'Established Liquid development, custom sections, and editor controls from two enterprise migrations.' },
      { title: 'Graphic design and branding', href: '/projects/print', text: 'Original identity and marketing work that supports my approach to visual communication on the web.' },
    ],
  },
  mesa: {
    introduction: "I'm Brett Snyder, a frontend developer and design engineer serving Mesa from Queen Creek. My work connects Next.js/React websites and product interfaces, Shopify/Liquid development, CMS experience, and practical analytics.",
    context: 'A Mesa team may already have a website, content library, or brand system that needs to carry into the next build. I review those existing assets and the customer journey before recommending frontend work, reusable components, or a storefront redesign.',
    approach: 'The goal is a site that is understandable to customers and manageable for the people maintaining it. Master Blocks shows my earlier CMS and publishing-system work; Shopify and Next.js/React are the platforms I now emphasize for new web development.',
    frontend: 'Next.js and React development for websites, design systems, and focused interfaces. Content structure, reusable UI, responsive behavior, and measurement are considered alongside the visual design.',
    shopify: 'Shopify storefront design and custom Liquid development for Mesa product brands. I can review an existing theme and catalog before defining sections, templates, redirects, and content controls for the agreed scope.',
    question: 'Can you review an existing website before recommending a rebuild?',
    answer: 'Yes. Share the current site, its purpose, the content and features that matter, and how it is maintained. I can review a defined frontend or redesign scope using that context. My extensive CMS/WordPress background helps when an existing content system is part of the discussion.',
    proof: [
      { title: 'Analytics and measurement', href: '/projects/analytics-workbench', text: 'A focused product for understanding what a page sends to analytics and advertising platforms.' },
      { title: 'CMS publishing systems', href: '/projects/master-blocks', text: 'Enterprise experience connecting reusable components, responsive layouts, and editor needs.' },
      { title: 'Shopify sections and templates', href: '/projects/shopify-migrations', text: 'Prior Imagine Learning work demonstrating custom Liquid and a marketing-team handoff.' },
    ],
  },
  'apache-junction': {
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer and frontend developer serving Apache Junction. I build Next.js/React websites and Shopify storefronts with clear services or product information, relevant proof, and a straightforward next step.",
    context: 'An Apache Junction project starts with the information a customer needs to make a decision. For a service business, that may be project examples and an estimate request. For a product brand, it may be useful product details, collection navigation, and a clear purchase path.',
    approach: 'AMW serves Apache Junction and shows how I connect a service website to an inquiry workflow. My enterprise Shopify work demonstrates reusable storefront sections and editing controls. Both examples connect custom development, clear presentation, and the needs of the people using the finished site.',
    frontend: 'Next.js and React service websites with responsive pages, useful answers, and accessible inquiry paths. Native forms and lead workflows can be planned around how your business handles new requests.',
    shopify: 'Shopify design and Liquid development for Apache Junction shops and product brands. Custom sections, product and collection templates, and editing controls are scoped around the store and its content.',
    question: 'How would we work together on an Apache Junction project?',
    answer: 'I work from Queen Creek and serve Apache Junction directly. We can review your current site or idea, the content and features you need, and who will maintain the finished work. Most collaboration is online, and visits can be arranged around project needs. The AMW case study offers a relevant example of the service-website approach.',
    proof: [
      { title: 'AMW website and follow-up', href: '/projects/amw-hardscape', text: 'A relevant service-business example: AMW serves Apache Junction, and the site connects inquiries to a native CRM workflow.' },
      { title: 'Enterprise Shopify experience', href: '/projects/shopify-migrations', text: 'The custom Liquid sections, templates, and content controls I built during two Imagine Learning migrations.' },
      { title: 'Reusable web foundations', href: '/projects/topwebworks', text: 'Design systems and responsive components supporting custom business websites and ongoing changes.' },
    ],
  },
};

export function cityFaqs(city: City): Faq[] {
  const content = cityContent[city.slug];
  return [
    { q: `Do you work with businesses and teams in ${city.name}?`, a: [`Yes. I serve ${city.name} from Queen Creek, Arizona. You work directly with me on website design, Next.js/React frontend development, Shopify/Liquid work, and reusable design systems. Most collaboration is online, and visits can be arranged around the project.`] },
    { q: `Do you offer both Next.js/React and Shopify development for ${city.name}?`, a: ['Yes. I have several years of hands-on experience with both platforms. Next.js/React suits custom websites and product interfaces; Shopify supports product catalogs and native commerce. My portfolio includes my own web products, client websites, and two enterprise Shopify migrations at Imagine Learning.'], links: [{ href: '/projects/shopify-migrations', label: 'Shopify migration work' }, { href: '/projects/cywire', label: 'React and product work' }] },
    { q: content.question, a: [content.answer] },
    { q: 'How do SEO, AEO, and GEO fit your website work?', a: ['I plan crawlable content, descriptive titles and headings, direct buyer answers, consistent business details, and appropriate structured data. SEO supports search visibility; AEO and GEO help search and AI tools understand and reference the content. Those foundations apply to both Next.js/React and Shopify. Rankings and AI citations depend on the market, content, and search platform.'], links: [{ href: '/projects/amw-hardscape', label: 'Website, search, and inquiry workflow' }, { href: '/projects/analytics-workbench', label: 'Analytics and tracking work' }] },
    { q: 'What is your WordPress and CMS background?', a: ['I have extensive CMS/WordPress experience, including enterprise website and publishing-system work at Imagine Learning. That foundation informs how I plan reusable components and content controls. I now emphasize Next.js/React and Shopify for new builds; existing-site support and scoped improvements can be discussed.'], links: [{ href: '/projects/master-blocks', label: 'CMS and design-system experience' }] },
    { q: 'How do you scope a project, and what should I send?', a: ['Send the current site or project, the work you need, the audience, relevant design or brand assets, and the target timeline. We agree the responsibilities, deliverables, handoff, and written scope before work begins. This portfolio is a direct way to discuss freelance, contract, or team opportunities with me.'] },
    { q: 'Can you help with ongoing website and marketing support?', a: ['For a defined design or development project, contact me directly through this portfolio. For a managed small-business website with TWW CRM lead capture, follow-up, maintenance, and marketing by plan, my studio Top Web Works provides that service.'], links: [{ href: 'https://topwebworks.com', label: 'Top Web Works website and marketing services' }] },
  ];
}
