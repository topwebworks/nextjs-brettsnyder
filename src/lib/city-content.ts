import type { Faq } from '@/app/about/faq';
import type { City } from '@/lib/cities';

type CityContent = {
  description: string;
  introduction: string;
  context: string;
  approach: string;
  frontend: string;
  shopify: string;
  question: string;
  answer: string;
  buyerFaqs: Faq[];
  proof: { title: string; href: string; text: string }[];
};

export const cityContent: Record<City['slug'], CityContent> = {
  'queen-creek': {
    description: 'Queen Creek, AZ web designer for small-business websites and Shopify storefronts. Work directly with Brett Snyder on Next.js/React and Liquid development.',
    introduction: "I'm Brett Snyder, a web designer and frontend developer based in Queen Creek, Arizona. I build small-business websites with Next.js/React and design and customize Shopify storefronts, including Liquid sections, templates, and editing controls. You work directly with me on the design, development, and handoff.",
    context: 'Queen Creek is my actual base. You work directly with me on a new website, a storefront redesign, a reusable component system, or a defined piece of frontend development. Most collaboration is online, and client visits can be arranged around the project.',
    approach: 'For a service business, I look at how a visitor understands the offer and requests an estimate or appointment. For a retailer, I look at product discovery and the purchase path. My portfolio shows the design decisions, code, editing controls, and measurement behind that work.',
    frontend: 'Small-business website design in Queen Creek, built with Next.js and React. Scope can include service pages, mobile-friendly layouts, accessible estimate or appointment requests, and reusable components. The AMW Hardscape project shows how I connect a website to native CRM forms, inquiry stages, and follow-up.',
    shopify: 'Shopify web design and Liquid development in Queen Creek for new storefronts, redesigns, and improvements to an existing theme. Work can include custom sections, product and collection templates, navigation, and editor controls. My two enterprise migrations at Imagine Learning show the experience behind that work.',
    question: 'Can I work directly with a Queen Creek developer on part of an existing site?',
    answer: 'Yes. Share the current site or codebase, the change you need, and who will maintain it. I can review a defined frontend task, redesign, or component-library project and agree the scope with you. The portfolio contact goes directly to me.',
    buyerFaqs: [
      { q: 'Do you design websites for small businesses in Queen Creek?', a: ['Yes. I can help a service business explain its offer, show relevant work, and make an estimate or appointment request easy on a phone. We define the pages, content, inquiry path, editing needs, and handoff together. Next.js/React is one option for a custom business website; Shopify is suited to a product catalog and online purchases.'], links: [{ href: '/projects/amw-hardscape', label: 'AMW website and inquiry workflow' }] },
      { q: 'Can you improve my existing Shopify theme?', a: ['Yes. Send the store URL, theme details, and the changes you need. I can review a defined scope for Liquid sections, product and collection templates, navigation, responsive layouts, or content controls. The review establishes what can be retained and what needs custom development before we agree the work.'], links: [{ href: '/projects/shopify-migrations', label: 'My custom Shopify sections and editor controls' }] },
      { q: 'What experience should I look for in a local Shopify developer?', a: ['Look for relevant storefront examples, a clear explanation of the developer\'s role, and editing controls that suit the people maintaining the store. At Imagine Learning, I planned and led two Shopify Plus migrations and built reusable Liquid sections and their editor settings. The case study distinguishes that development work from the artwork and final layouts selected by client designers and marketers.'], links: [{ href: '/projects/shopify-migrations', label: 'AOP and Ignite Christian Academy migrations' }] },
    ],
    proof: [
      { title: 'AMW website and lead workflow', href: '/projects/amw-hardscape', text: 'A service-business website connecting Next.js, conversion paths, search foundations, and native CRM follow-up.' },
      { title: 'Enterprise Shopify migrations', href: '/projects/shopify-migrations', text: 'Prior Imagine Learning work for AOP and Ignite Christian Academy, with custom Liquid sections and editable storefronts.' },
      { title: 'Design systems in practice', href: '/projects/topwebworks', text: 'Reusable website foundations, branding, and responsive components supporting custom client work.' },
    ],
  },
  gilbert: {
    description: 'Small-business web design and Shopify development for Gilbert, AZ. Brett Snyder brings Next.js/React, Liquid, and experience running a Gilbert business.',
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer serving Gilbert, Arizona. I build small-business websites with Next.js/React and Shopify storefronts with custom Liquid development. Having run Funastics in Gilbert, I bring a business-owner perspective to the content, customer journey, and handoff.",
    context: 'I ran Funastics in Gilbert and handled its website and local search work. That experience informs how I approach a business site: explain the offer, answer practical questions, and make the next step easy. My current portfolio also includes enterprise development and web-product work.',
    approach: 'A studio or service business may need a clearer inquiry path; a product brand may need better collection navigation and editable campaign pages. I connect those goals to the design, content, and frontend scope, then review the work directly with you.',
    frontend: 'Small-business web design for Gilbert service providers, studios, and teams, using Next.js and React. Clear service pages, mobile inquiry paths, and reusable components connect the brand to the next customer action. Product interfaces and scoped frontend work can also be discussed.',
    shopify: 'Shopify web design and custom Liquid sections for Gilbert retailers and product brands. My enterprise-employer work includes two migrations and content controls that marketing teams can use independently.',
    question: 'What does your Gilbert business-owner experience add to a website project?',
    answer: 'Running Funastics meant making decisions about customers, offers, inquiries, and local visibility as well as the website. I bring that perspective to project planning while keeping the current business goals and available evidence in view. The Funastics article describes that experience.',
    buyerFaqs: [
      { q: 'Can a Gilbert business connect its website to customer inquiries?', a: ['Yes. We can plan service pages, estimate or appointment requests, and the handoff into an existing inquiry workflow. The AMW project shows a Next.js website connected to native CRM forms and follow-up. Managed CRM and ongoing marketing are available separately through Top Web Works.'], links: [{ href: '/projects/amw-hardscape', label: 'See the website-to-inquiry workflow' }] },
      { q: 'Can you design a Shopify store that our Gilbert team can update?', a: ['Yes. We identify which product information, campaign content, and sections your team needs to change, then define the theme templates and editor controls around that work. My enterprise migrations include reusable Liquid sections with editable content, media, spacing, and mobile behavior. New layout or functionality requirements may still need development.'], links: [{ href: '/projects/shopify-migrations', label: 'Editable Shopify sections in practice' }] },
      { q: 'What website decisions did you make for Funastics in Gilbert?', a: ['Funastics was my own Gilbert gymnastics business. I handled its branding, website, and local marketing; the site let parents sign up and pay bills online. It is historical business-owner experience, rather than a current client or a Shopify project. The article explains how those decisions supported the way families used the business.'], links: [{ href: '/blog/funastics', label: 'Read the Funastics business story' }] },
    ],
    proof: [
      { title: 'Running Funastics in Gilbert', href: '/blog/funastics', text: 'The business-owner background behind my approach to websites, marketing, and customer decisions.' },
      { title: 'Shopify sections and migrations', href: '/projects/shopify-migrations', text: 'Editable storefront development and reusable Liquid sections from prior enterprise-employer work.' },
      { title: 'CMS and design-system experience', href: '/projects/master-blocks', text: 'Reusable components and editor controls built to help teams publish consistent pages efficiently.' },
    ],
  },
  chandler: {
    description: 'Web design and Shopify development for Chandler, AZ businesses and marketing teams. Next.js/React websites, custom Liquid sections, and practical handoff.',
    introduction: "I'm Brett Snyder, a web designer and frontend developer serving Chandler, Arizona from Queen Creek. I build small-business websites with Next.js/React and customize Shopify storefronts with Liquid, working directly with owners or alongside their design and marketing teams.",
    context: 'A Chandler project can start with an existing design, a storefront that needs clearer content controls, or a website ready for a considered redesign. I can work directly with an owner or alongside an existing design and marketing team on a defined frontend scope.',
    approach: 'I pay attention to what happens after handoff: which content the team can edit, which components can be reused, and how future pages stay consistent. The Shopify migrations and Master Blocks examples show those decisions in real enterprise work.',
    frontend: 'Small-business website design and Next.js/React implementation for Chandler owners and teams. Scope can include service pages, mobile inquiry paths, responsive UI, and reusable components built from your existing design direction.',
    shopify: 'Shopify web design and Liquid development for Chandler stores, including existing-theme improvements, custom sections, product templates, collection layouts, and campaign pages. Editor controls are planned around the content an owner or marketing team needs to manage.',
    question: 'Can you work with a Chandler design or marketing team?',
    answer: 'Yes. I can implement supplied designs, build reusable frontend components, and agree content controls and handoff needs with the team. My enterprise portfolio distinguishes my development role from the artwork, copy, and final compositions chosen by client designers and marketers.',
    buyerFaqs: [
      { q: 'Can our Chandler team edit Shopify pages after handoff?', a: ['We agree the editing requirements before development. Custom sections can expose content, media, spacing, and layout settings in the Shopify theme editor. In my AOP and Ignite Christian Academy migration work, repeatable blocks and section settings gave marketing teams reusable controls. Changes outside the agreed controls may require development.'], links: [{ href: '/projects/shopify-migrations', label: 'See the actual section settings and layout controls' }] },
      { q: 'Can you improve a Shopify campaign page without replacing the theme?', a: ['Yes, a defined campaign page or custom Liquid section can be a separate scope. I review the existing theme, required layouts, content, mobile behavior, and any app dependencies before recommending the implementation. That establishes whether the work fits the current theme and what the team will be able to edit.'] },
      { q: 'Can a Chandler small business start with an existing brand or design?', a: ['Yes. Bring the brand assets, supplied designs, current website, and the customer action you want the site to support. I can turn that direction into responsive Next.js/React pages and reusable components, with the content, accessibility, and handoff requirements agreed with your team.'], links: [{ href: '/projects/master-blocks', label: 'Reusable components and publishing controls' }] },
    ],
    proof: [
      { title: 'Shopify content controls', href: '/projects/shopify-migrations', text: 'Custom sections and storefront templates, with clear attribution for the development and client-design roles.' },
      { title: 'Master Blocks', href: '/projects/master-blocks', text: 'CMS components, reusable layouts, and an editor handoff designed for ongoing marketing work.' },
      { title: 'How I build design systems', href: '/blog/design-systems', text: 'A practical account of moving from design decisions and tokens to working components and page composition.' },
    ],
  },
  tempe: {
    description: 'Small-business websites and Shopify web design for Tempe, AZ. Work with Brett Snyder on Next.js/React, Liquid development, and product interfaces.',
    introduction: "I'm Brett Snyder, a web designer and frontend developer serving Tempe, Arizona from Queen Creek. I build small-business websites with Next.js/React and Shopify storefronts with Liquid, focusing on clear services or products, usable mobile pages, and the next customer action. My work also includes product interfaces and design systems.",
    context: 'Some Tempe projects need a complete marketing site; others need a developer who can turn an existing interface direction into working frontend components. I work directly with owners and teams to define the user journey, implementation, and handoff.',
    approach: 'For a web product, I look at useful flows, interface states, accessibility, and maintainable components. For a business website or store, I connect those same design principles to inquiries, product understanding, and the next customer action.',
    frontend: 'Small-business website design for Tempe, using Next.js and React for service pages, accessible inquiries, and responsive layouts. I also build product interfaces and reusable components: CyWire shows my own SaaS work, while Analytics Workbench demonstrates a focused technical workflow.',
    shopify: 'Shopify web design and Liquid development for Tempe stores and product brands, including storefront redesigns, custom sections, product and collection templates, and editable campaign pages. My enterprise migrations show the development and handoff behind those capabilities.',
    question: 'Can you help with a product interface as well as a business website?',
    answer: 'Yes. My portfolio includes SaaS and tool interfaces alongside business websites and Shopify development. I can discuss frontend implementation, reusable components, design systems, and UI/UX work with your team. The scope and responsibilities are agreed around the existing product and project needs.',
    buyerFaqs: [
      { q: 'Should my Tempe business use Shopify or a custom website?', a: ['Shopify is suited to a product catalog and native online commerce. Next.js/React can suit a custom service website or product interface. I start with what customers need to do, the content your team must edit, and the systems already in place. My Shopify migration and AMW website case studies show different uses of those platforms.'], links: [{ href: '/projects/shopify-migrations', label: 'Shopify storefront development' }, { href: '/projects/amw-hardscape', label: 'Next.js service website' }] },
      { q: 'Do you build websites for Tempe service businesses as well as web products?', a: ['Yes. A business website can focus on explaining services, showing relevant proof, and making a quote or appointment request straightforward. We define the content and inquiry path before the frontend work. My AMW case study demonstrates that approach; CyWire and Analytics Workbench show the separate product-interface side of my portfolio.'], links: [{ href: '/projects/amw-hardscape', label: 'Service website and customer inquiry example' }] },
      { q: 'Can you customize an existing Shopify storefront for a Tempe team?', a: ['Yes. I can review the current theme and a defined request for sections, templates, navigation, or content controls. We agree the development responsibilities, design assets, mobile behavior, and handoff. The enterprise migrations in my portfolio show the Liquid section system I built for marketing teams.'], links: [{ href: '/projects/shopify-migrations', label: 'Liquid sections and storefront examples' }] },
    ],
    proof: [
      { title: 'CyWire product work', href: '/projects/cywire', text: 'My own Master Prompt workspace, showing product-focused design engineering and frontend development.' },
      { title: 'Analytics Workbench', href: '/projects/analytics-workbench', text: 'An interface and workflow for examining analytics and advertising events and making tracking issues understandable.' },
      { title: 'Enterprise Shopify development', href: '/projects/shopify-migrations', text: 'Two migrations and a reusable Liquid section library from my work at Imagine Learning.' },
    ],
  },
  'san-tan-valley': {
    description: 'Small-business web design and Shopify storefronts for San Tan Valley, AZ. Brett Snyder builds Next.js/React websites and custom Liquid sections from Queen Creek.',
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer serving San Tan Valley, Arizona. I build small-business websites with Next.js/React and design and customize Shopify stores with Liquid. Clear services or products, consistent branding, and a practical inquiry or purchase path guide the work.",
    context: 'For a San Tan Valley owner planning a first website or a redesign, the starting point is the business: what you offer, who needs it, and what a visitor should do next. You can bring rough notes, an existing site, brand assets, or a defined development task.',
    approach: 'My graphic design and branding background helps connect the visual direction to the content and code. I plan the frontend and handoff together, so a service website and a product storefront each support the way the business will use them.',
    frontend: 'Small-business website design for San Tan Valley, using Next.js and React for first websites and considered redesigns. The agreed scope can include service pages, project examples, mobile-friendly estimate requests, and a handoff that identifies how content will be maintained.',
    shopify: 'Shopify website design and Liquid development for San Tan Valley retailers and product brands. Product information, collection structure, mobile layouts, and agreed editing controls are planned together.',
    question: 'What should I prepare for a first website or redesign?',
    answer: 'Send the current website if you have one, a description of the business and its customers, the services or products to feature, and any existing photos or brand assets. We can then define the content, frontend work, inquiry or purchase path, and launch priorities before agreeing the scope.',
    buyerFaqs: [
      { q: 'What can a first website for a San Tan Valley business include?', a: ['We can scope the service or product pages, business information, real project examples, mobile layouts, and a clear way to inquire or purchase. We also identify who supplies the copy, photos, and brand assets and how the finished content will be maintained. The proposal defines the deliverables and launch requirements.'] },
      { q: 'Can branding and website design be planned together?', a: ['Yes. My graphic design and branding background helps connect the logo, typography, imagery, and message to the website. We agree whether the project uses an existing identity or includes separate branding work. The print portfolio shows my original identity and marketing work, while AMW shows how a brand carries into a service website.'], links: [{ href: '/projects/print', label: 'Original branding and design work' }, { href: '/projects/amw-hardscape', label: 'Branding applied to a business website' }] },
      { q: 'Can you build or redesign a Shopify store for San Tan Valley?', a: ['Yes. We review the products, collection structure, current theme if there is one, and the content the owner needs to edit. The scope can include storefront design, custom Liquid sections, product and collection templates, and mobile layouts. My two Imagine Learning migrations demonstrate the underlying Shopify development experience.'], links: [{ href: '/projects/shopify-migrations', label: 'Shopify templates and editing controls' }] },
    ],
    proof: [
      { title: 'A service website and inquiry path', href: '/projects/amw-hardscape', text: 'How design, content, search setup, and native follow-up support the same service-business journey.' },
      { title: 'Shopify migration portfolio', href: '/projects/shopify-migrations', text: 'Established Liquid development, custom sections, and editor controls from two enterprise migrations.' },
      { title: 'Graphic design and branding', href: '/projects/print', text: 'Original identity and marketing work that supports my approach to visual communication on the web.' },
    ],
  },
  mesa: {
    description: 'Web design and Shopify development for Mesa, AZ. Brett Snyder reviews existing sites and builds Next.js/React websites, Liquid sections, and editing controls.',
    introduction: "I'm Brett Snyder, a web designer and frontend developer serving Mesa, Arizona from Queen Creek. I build small-business websites with Next.js/React and Shopify storefronts with Liquid. For an existing site, I review the content, theme or codebase, customer journey, and editing needs before recommending a defined scope.",
    context: 'A Mesa team may already have a website, content library, or brand system that needs to carry into the next build. I review those existing assets and the customer journey before recommending frontend work, reusable components, or a storefront redesign.',
    approach: 'The goal is a site that is understandable to customers and manageable for the people maintaining it. Master Blocks shows my earlier CMS and publishing-system work; Shopify and Next.js/React are the platforms I now emphasize for new web development.',
    frontend: 'Small-business website design and Next.js/React development for Mesa owners and teams. Service pages, mobile inquiry paths, reusable UI, and measurement are considered alongside the existing content and visual design. Scoped improvements and product interfaces can also be discussed.',
    shopify: 'Shopify web design and custom Liquid development for Mesa product brands. I review an existing theme and catalog before defining storefront changes, sections, product and collection templates, redirects, and content controls for the agreed scope.',
    question: 'Can you review an existing website before recommending a rebuild?',
    answer: 'Yes. Share the current site, its purpose, the content and features that matter, and how it is maintained. I can review a defined frontend or redesign scope using that context. My extensive CMS/WordPress background helps when an existing content system is part of the discussion.',
    buyerFaqs: [
      { q: 'Can you improve my Mesa website without rebuilding everything?', a: ['A focused improvement may be appropriate when the existing platform and code can support it. I review the requested change, content, dependencies, and maintenance needs before recommending a scope. That can identify work to preserve, a component to update, or a larger change that needs a separate discussion.'] },
      { q: 'How do you decide what a Shopify redesign should preserve?', a: ['We review the current catalog, theme, navigation, content, existing URLs, and the workflows the team relies on. The agreed scope identifies sections, templates, redirects, and editor controls to retain or change. My enterprise case study shows how I built reusable Liquid sections so marketing could publish campaigns without coding every page.'], links: [{ href: '/projects/shopify-migrations', label: 'The reusable Shopify section library' }] },
      { q: 'Can you review how a Mesa business website measures inquiries?', a: ['Yes. A defined review can examine what a page sends to Google Tag Manager, GA4, or advertising platforms and how the inquiry path is represented. Analytics Workbench demonstrates the inspection workflow I built for those events. Tracking requirements and any implementation work are agreed around the site and its consent settings.'], links: [{ href: '/projects/analytics-workbench', label: 'Analytics event inspection and findings' }] },
    ],
    proof: [
      { title: 'Analytics and measurement', href: '/projects/analytics-workbench', text: 'A focused product for understanding what a page sends to analytics and advertising platforms.' },
      { title: 'CMS publishing systems', href: '/projects/master-blocks', text: 'Enterprise experience connecting reusable components, responsive layouts, and editor needs.' },
      { title: 'Shopify sections and templates', href: '/projects/shopify-migrations', text: 'Prior Imagine Learning work demonstrating custom Liquid and a marketing-team handoff.' },
    ],
  },
  'apache-junction': {
    description: 'Small-business web design and Shopify development for Apache Junction, AZ. Next.js/React websites, Liquid storefronts, and clear customer inquiry paths.',
    introduction: "I'm Brett Snyder, a Queen Creek-based web designer serving Apache Junction, Arizona. I build small-business websites with Next.js/React and design and customize Shopify storefronts with Liquid. The work connects clear services or products, relevant examples, and a straightforward way to request an estimate or make a purchase.",
    context: 'An Apache Junction project starts with the information a customer needs to make a decision. For a service business, that may be project examples and an estimate request. For a product brand, it may be useful product details, collection navigation, and a clear purchase path.',
    approach: 'AMW serves Apache Junction and shows how I connect a service website to an inquiry workflow. My enterprise Shopify work demonstrates reusable storefront sections and editing controls. Both examples connect custom development, clear presentation, and the needs of the people using the finished site.',
    frontend: 'Small-business website design for Apache Junction service providers, built with Next.js and React. Scope can include service pages, real project examples, mobile-friendly estimate requests, and native forms connected to an agreed inquiry workflow.',
    shopify: 'Shopify design and Liquid development for Apache Junction shops and product brands. Custom sections, product and collection templates, and editing controls are scoped around the store and its content.',
    question: 'How would we work together on an Apache Junction project?',
    answer: 'I work from Queen Creek and serve Apache Junction directly. We can review your current site or idea, the content and features you need, and who will maintain the finished work. Most collaboration is online, and visits can be arranged around project needs. The AMW case study offers a relevant example of the service-website approach.',
    buyerFaqs: [
      { q: 'How can an Apache Junction service website help customers request an estimate?', a: ['Clear service pages, actual project examples, and an accessible estimate action help customers understand the work and send an inquiry. The form and follow-up need to fit how the business handles requests. AMW serves Apache Junction, and its case study shows a website connected to native CRM forms and inquiry stages.'], links: [{ href: '/projects/amw-hardscape', label: 'AMW website, estimate form, and follow-up' }] },
      { q: 'What can I learn from your AMW website project?', a: ['AMW serves Apache Junction, and the case study shows how I connected service information, real project examples, mobile estimate controls, native CRM forms, and follow-up. It explains the design and development decisions behind that workflow, so you can assess how a similar approach could fit your business.'], links: [{ href: '/projects/amw-hardscape', label: 'Read the attributed AMW case study' }] },
      { q: 'Do you offer Shopify website design for Apache Junction shops?', a: ['Yes. I can scope a new storefront, redesign, or improvements to an existing theme. Product and collection templates, navigation, custom Liquid sections, and editing controls are planned around the store and its content. My two enterprise migrations at Imagine Learning provide examples of that development work.'], links: [{ href: '/projects/shopify-migrations', label: 'Shopify storefront and custom section examples' }] },
    ],
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
    { q: content.question, a: [content.answer] },
    ...content.buyerFaqs,
    { q: 'How are ownership, handoff, and the launch timeline agreed?', a: ['Send the current site, the work you need, the audience, brand assets, and your target timeline. Before work begins, the written scope establishes deliverables, ownership and account access, third-party licenses, editing controls, handoff, and responsibility for maintenance. The launch date depends on that scope, content readiness, integrations, and review rounds; it is agreed for the project rather than promised in advance.'] },
    { q: 'Can you help with ongoing website and marketing support?', a: ['For a defined design or development project, contact me directly through this portfolio. For a managed small-business website with TWW CRM lead capture, follow-up, maintenance, and marketing by plan, my studio Top Web Works provides that service.'], links: [{ href: 'https://topwebworks.com', label: 'Top Web Works website and marketing services' }] },
  ];
}
