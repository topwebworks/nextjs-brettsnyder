import type { Faq } from '@/app/about/faq';
import type { City } from '@/lib/cities';

type CityContent = {
  description: string;
  introduction: string;
  contextTitle: string;
  context: string;
  approachTitle: string;
  approach: string;
  frontend: string;
  shopify: string;
  focus: { title: string; text: string };
  reading: { href: string; label: string }[];
  recommendation: { quote: string; by: string; context: string; date: string };
  question: string;
  answer: string;
  buyerFaqs: Faq[];
  proof: { title: string; href: string; text: string }[];
};

export const cityContent: Record<City['slug'], CityContent> = {
  'queen-creek': {
    description: 'Queen Creek, AZ web designer for small-business websites and Shopify storefronts. Work directly with Brett Snyder on Next.js/React and Liquid development.',
    contextTitle: "Make the homepage useful",
    approachTitle: "What happens after someone gets in touch?",
    focus: {"title":"Make it easy to get in touch","text":"I include SEO, AEO, and GEO setup, then check the details customers use: the contact button, form confirmation, and message to the person answering the inquiry. The AMW case study shows how I put those pieces together."},
    reading: [{"href":"https://topwebworks.com/blog/fix-your-homepage-first","label":"How I planned the AMW homepage"},{"href":"/projects/amw-hardscape","label":"See the AMW website work"}],
    recommendation: {"quote":"His technical skills were invaluable in quickly launching many high-impact marketing campaigns that ultimately resulted in strong conversions and revenue.","by":"Shaun Redgate","context":"Head of Business Development; former Imagine Learning colleague","date":"October 3, 2025"},
    introduction: "I'm Brett Snyder, a web designer and frontend developer in Queen Creek, Arizona. I build Next.js/React websites and Shopify/Liquid stores. I want people visiting your site to understand what you do and find it easy to call, buy, or ask for an estimate.",
    context: "Before adding pages, I look at what your homepage already does. People should be able to find your services, see examples of your work, and contact you on a phone. That's how I approached AMW Hardscape: service details, project photos, and clear call and estimate buttons, all on the homepage.",
    approach: "Someone who fills out a form should know their message arrived. You should get the details and know who needs to respond. On AMW, I connected the website forms to the CRM and follow-up system. Email me if you need help with a website or a specific development job. For ongoing website care and managed follow-up, take a look at Top Web Works.",
    frontend: "I build small business websites with Next.js and React, including service pages, project galleries, and contact or estimate forms. I can improve your current homepage or plan a new site around what your customers need.",
    shopify: "I design Shopify stores and write custom Liquid sections. That can mean clearer collections, better product pages, or sections your team can update without asking a developer every time. I'll look at your current store and talk through what needs to change.",
    question: "Should I fix my homepage or add a landing page?",
    answer: "I'd look at the homepage first. If people can't find what they need there, another page may leave the same problem in place. A separate landing page can make sense for a particular offer or ad campaign. AMW shows how I use a homepage and service pages together.",
    buyerFaqs: [
      {"q":"Do you build small business websites in Queen Creek?","a":["Yes. I can help you plan your services, photos, pages, and contact options. I build custom websites with Next.js/React and online stores with Shopify. I'll help you choose an approach that fits what your customers and business need."],"links":[{"href":"/projects/amw-hardscape","label":"AMW website and inquiry workflow"}]},
      {"q":"Can you work on my current Shopify theme?","a":["Yes. Send me the store link and tell me what you'd like to change. I can look at the theme, sections, product pages, and phone layouts, then explain what I can reuse and what needs development."],"links":[{"href":"/projects/shopify-migrations","label":"My custom Shopify sections and editor controls"}]},
      {"q":"How can I tell whether a Shopify developer is a good fit?","a":["Ask to see their work and find out what they built themselves. It also helps to ask which parts of the store you'll be able to update. My case study shows the Liquid sections and settings I built for AOP and Ignite Christian Academy, with the designers' and marketers' contributions credited."],"links":[{"href":"/projects/shopify-migrations","label":"AOP and Ignite Christian Academy migrations"}]},
    ],
    proof: [
      {"title":"AMW website and estimate form","href":"/projects/amw-hardscape","text":"The website, service information, project photos, and CRM connection I built for AMW Hardscape."},
      {"title":"Shopify pages your team can update","href":"/projects/shopify-migrations","text":"Custom Liquid sections and page settings I built for AOP and Ignite Christian Academy at Imagine Learning."},
      {"title":"How I build client websites","href":"/projects/topwebworks","text":"The design systems, branding, websites, and lead follow-up work behind Top Web Works."},
    ],
  },
  gilbert: {
    description: "Small business web design and Shopify development for Gilbert, AZ. Work with Brett Snyder, who also ran Funastics in Gilbert.",
    contextTitle: "I've run a business in Gilbert",
    approachTitle: "Make the website match the rest of your business",
    focus: {"title":"Keep the message consistent","text":"The flyer, website, and follow-up should sound like the same business. My Funastics and print projects show how I approach that. I also handle SEO, AEO, and GEO setup so your business and services are clearly described on the site."},
    reading: [{"href":"https://topwebworks.com/blog/two-print-pieces","label":"The flyers and cards I used for Funastics and AMW"},{"href":"/blog/funastics","label":"How I ran Funastics"}],
    recommendation: {"quote":"As our front-end developer, Brett was responsive, flexible, and always willing to explore different ways to bring ideas to life.","by":"Kristi Pies","context":"Marketing Project Manager; former AOP marketing teammate","date":"October 6, 2025"},
    introduction: "When I ran Funastics in Gilbert, I handled the website, branding, and marketing while running the gym. That experience still shapes the websites I build. I'm now based in Queen Creek and work with Gilbert businesses on Next.js/React websites and Shopify/Liquid stores.",
    context: "At Funastics, parents could sign up and pay bills through the website. Flyers and small marketing cards helped new families find the gym. I was responsible for all of it, so the website had to make sense alongside what happened at the gym. I still think about those day-to-day needs when I work with a business owner.",
    approach: "Your website should feel like the same business people saw on a flyer or heard about from a friend. I look at the photos, wording, and next step across those materials. My Top Web Works article shows the print pieces I used for Funastics and later designed for AMW. I can work with your existing branding or help you develop it.",
    frontend: "I build small business websites for Gilbert owners who need to explain their services and make it easy to get in touch. I use Next.js and React, with your branding, photos, and customer questions guiding the design.",
    shopify: "For a Shopify store, I'll work through the product pages, collections, and campaign content with you. Custom Liquid sections can keep the design consistent and give your team useful settings for making updates.",
    question: "How does running a business affect the way you build websites?",
    answer: "I know the website is one of several things an owner has to look after. At Funastics, I handled customer questions, marketing, the website, and the gym itself. I bring that experience to planning a site that's useful to customers and manageable for the business.",
    buyerFaqs: [
      {"q":"Can my website help me follow up with customers?","a":["Yes. I can connect forms to your CRM and plan the confirmation and notification messages. AMW is an example of that work. If you want the website and follow-up managed for you, Top Web Works offers ongoing plans."],"links":[{"href":"/projects/amw-hardscape","label":"See the website-to-inquiry workflow"}]},
      {"q":"Will I be able to update my Shopify pages myself?","a":["I can build settings for the content your team changes regularly, such as product information, images, and campaign sections. I'll talk through those needs with you before building. A new layout or feature may still need development."],"links":[{"href":"/projects/shopify-migrations","label":"Editable Shopify sections in practice"}]},
      {"q":"What did you build for Funastics?","a":["I handled the gym's branding, website, and local marketing. Parents could sign up and pay bills online, and I used flyers and cards to help families find the gym. It was my own business in Gilbert, and the article tells that story."],"links":[{"href":"/blog/funastics","label":"Read the Funastics business story"}]},
    ],
    proof: [
      {"title":"Funastics, the Gilbert business I ran","href":"/blog/funastics","text":"How I built the gym, its website, branding, and local marketing."},
      {"title":"Branding and print design","href":"/projects/print","text":"Logos, editorial layouts, and marketing pieces from my graphic design work."},
      {"title":"Shopify design and page settings","href":"/projects/shopify-migrations","text":"Storefronts I developed at Imagine Learning, with custom sections marketing teams could update."},
    ],
  },
  chandler: {
    description: "Web design and Shopify development for Chandler, AZ businesses. Brett Snyder builds from your designs and helps your team manage updates.",
    contextTitle: "Have a design ready to build?",
    approachTitle: "Make the next update easier",
    focus: {"title":"Keep the site easy to update","text":"A team needs to keep its pages accurate after launch. I plan content settings and reusable page sections around the updates people actually make. SEO, AEO, and GEO setup is part of that work, alongside the design and development."},
    reading: [{"href":"https://topwebworks.com/blog/shopify-without-app-bloat","label":"When a Shopify feature needs an app"},{"href":"/blog/design-systems","label":"How I build design systems"}],
    recommendation: {"quote":"I could hand off designs created in Figma, and he would consistently bring them to life with precision on whatever platform we were using.","by":"Marta Carden","context":"Director of Creative Services; former colleague","date":"May 18, 2026"},
    introduction: "If your team has designs ready to build, I can help turn them into a working website. I'm Brett Snyder, a Queen Creek-based web designer and frontend developer serving Chandler. I work with Next.js/React and Shopify/Liquid, and I'm comfortable working alongside designers and marketing teams.",
    context: "I worked in a hybrid UI/UX Designer/Developer role at Imagine Learning in Chandler. I made Figma designs and working HTML prototypes, then went on to build marketing websites and reusable page systems. I've worked on both sides of the design handoff, which helps when a team needs to talk through how a design will work on the web.",
    approach: "I think about the people who will update a site after launch. Master Blocks cut landing-page production time by 40% across more than 50 pages. For the two Shopify migrations, I built sections with settings for content, images, spacing, and layouts. I'll help your team work out which updates it can handle and which need a developer.",
    frontend: "I build Next.js and React pages from supplied designs and work on existing frontends. That can include a small business website, a set of reusable components, or a particular page your team needs help with.",
    shopify: "I build custom Shopify sections, product and collection templates, and campaign pages in Liquid. Before adding an app, I'll check whether Shopify or the current theme can already do the job. I'll also show your team which settings they can use to update the pages.",
    question: "Can you work with our designer or marketing team?",
    answer: "Yes. Send the designs and tell me what your team needs. I'll talk with you about phone layouts, accessibility, content, and what you'll want to update later. My case studies identify what I developed and what the designers and marketers contributed.",
    buyerFaqs: [
      {"q":"What can our team change in Shopify after launch?","a":["That depends on the settings I build. For the AOP and Ignite Christian Academy stores, I made content, image, spacing, and layout controls that marketing could use in the theme editor. I'll confirm what your team needs to change before I build the sections."],"links":[{"href":"/projects/shopify-migrations","label":"See the actual section settings and layout controls"}]},
      {"q":"Can you add a campaign page to our current Shopify theme?","a":["Yes. I'll look at the theme, your designs, and any apps involved. Then I'll work out how the page fits into the store and which parts your team needs to update."]},
      {"q":"Can you build from our existing designs?","a":["Yes. Send the designs, brand assets, and current website. I'll ask how the pages should work on phones, what visitors need to do, and what your team will maintain. I can then build the Next.js/React pages and reusable components."],"links":[{"href":"/projects/master-blocks","label":"Reusable components and publishing controls"}]},
    ],
    proof: [
      {"title":"Shopify sections and page settings","href":"/projects/shopify-migrations","text":"The Liquid sections, repeatable blocks, and templates I built for two Imagine Learning storefronts."},
      {"title":"Master Blocks","href":"/projects/master-blocks","text":"A reusable HTML/CSS page system that helped the marketing team build more than 50 campaign pages faster."},
      {"title":"How I build design systems","href":"/blog/design-systems","text":"Examples of turning brand guidelines into components and finished pages."},
    ],
  },
  tempe: {
    description: 'Small-business websites and Shopify web design for Tempe, AZ. Work with Brett Snyder on Next.js/React, Liquid development, and product interfaces.',
    contextTitle: "What do you need the site to do?",
    approachTitle: "Start with the main task",
    focus: {"title":"Give each page a clear job","text":"I plan SEO, AEO, and GEO for the public pages, then look at how people use them. A store needs a clear way to find and buy a product. A business site needs a clear way to ask a question or request a quote. My product work shows how I build around those tasks."},
    reading: [{"href":"https://topwebworks.com/blog/why-shopify-works-for-small-business","label":"When Shopify makes sense for a business"},{"href":"/projects/cywire","label":"How I built CyWire"}],
    recommendation: {"quote":"Alongside his technical depth, Brett has a strong eye for design. He cares about the details, aiming for pixel-perfect precision and clean, reliable results.","by":"Rob Haan","context":"Creative Collaborator; former teammate","date":"October 12, 2025"},
    introduction: "Some projects need a business website. Others need an online store or an interface for a web product. I help Tempe owners and teams work out what they need to build. I'm based in Queen Creek and work with Next.js/React and Shopify/Liquid.",
    context: "If you're selling products through a standard checkout, Shopify brings the catalog and orders into one place. Next.js/React can work well for a service website or a custom product interface. I'll ask what customers need to do, what your team needs to update, and which systems you already use before recommending an approach.",
    approach: "I built and launched CyWire, my own SaaS product, in three months. I also built Analytics Workbench to help inspect website tracking events. Both started with a specific job someone needed to do. I take the same approach to a business website or Shopify store: work through the main task, then build the pages and features it needs.",
    frontend: "I build Next.js and React websites for Tempe small businesses and product teams. I can help with service pages, contact forms, an existing interface design, or reusable components. Tell me what someone needs to do on the site, and I'll use that to plan the work.",
    shopify: "For a Shopify project, I'll look at the products, collections, variants, and questions people ask before buying. I can design the storefront and build Liquid sections that your team can update. The migration projects show the sections and settings I built for two enterprise stores.",
    question: "Can you help with a product interface, too?",
    answer: "Yes. CyWire and Analytics Workbench show my product and interface work. I can help turn a design into working frontend components, build a design system, or improve part of an existing interface. I'll confirm the scope with your team before starting.",
    buyerFaqs: [
      {"q":"Should I choose Shopify or a custom website?","a":["Shopify is worth considering when selling products through an online checkout is central to the business. Next.js/React can suit a service website or custom interface. I'll look at your products or services, the content you need to update, and the systems you already use."],"links":[{"href":"/projects/shopify-migrations","label":"Shopify storefront development"},{"href":"/projects/amw-hardscape","label":"Next.js service website"}]},
      {"q":"Do you also build websites for service businesses?","a":["Yes. The AMW website shows how I bring service information, photos, and estimate requests together. CyWire and Analytics Workbench show my product-interface work. The project starts with what your customers need to do."],"links":[{"href":"/projects/amw-hardscape","label":"Service website and customer inquiry example"}]},
      {"q":"Can you make changes to our existing Shopify store?","a":["Yes. Send the store link and the changes you have in mind. I can look at the theme, sections, navigation, and page settings, then work through the design and development with your team."],"links":[{"href":"/projects/shopify-migrations","label":"Liquid sections and storefront examples"}]},
    ],
    proof: [
      {"title":"CyWire, my own web product","href":"/projects/cywire","text":"The Master Prompt workspace I designed and built, from the product decisions to the working interface."},
      {"title":"Analytics Workbench","href":"/projects/analytics-workbench","text":"A tool I built to inspect analytics and advertising events and explain tracking problems."},
      {"title":"Shopify storefront development","href":"/projects/shopify-migrations","text":"The Liquid sections and content settings I built for AOP and Ignite Christian Academy at Imagine Learning."},
    ],
  },
  'san-tan-valley': {
    description: "Small business web design and Shopify development for San Tan Valley, AZ. Brett Snyder helps you plan a first website or improve the one you have.",
    contextTitle: "What should your first site include?",
    approachTitle: "See how the design works on a phone",
    focus: {"title":"Get the basics ready for launch","text":"Good photos, clear descriptions, contact details, and a working form give a new site something useful to say and do. I plan those alongside the SEO, AEO, and GEO setup. I'll confirm the launch requirements with you before setting a date."},
    reading: [{"href":"https://topwebworks.com/blog/why-i-build-your-homepage-first","label":"How the studio's homepage preview works"},{"href":"/projects/print","label":"See my branding and print work"}],
    recommendation: {"quote":"He consistently shared his knowledge with my design team, always made time for questions, and offered thoughtful advice that helped others grow.","by":"Lauren Halgerson","context":"Creative Director; former marketing teammate","date":"October 8, 2025"},
    introduction: "You don't need a polished brief to talk about a website. Bring your notes, photos, or current site, and I can help you work out what you need. I'm Brett Snyder, a Queen Creek-based web designer serving San Tan Valley with Next.js/React websites and Shopify/Liquid stores.",
    context: "I'll ask what you sell, who your customers are, and the questions they ask. That gives me a starting point for the pages, photos, and ways to contact you or buy. I also need to know who will supply the content and look after the site once it's live. I'll confirm the work and launch requirements in writing before starting.",
    approach: "A working homepage lets you try the layout, read the text, and tap the buttons on a phone. My Top Web Works article explains the studio's preview process and shows AMW as a completed example. You can contact me directly about a design or development project, or go through the studio for a managed website plan. I can also help with branding if you're starting from scratch.",
    frontend: "I build small business websites with Next.js and React, including service pages, project photos, and contact forms. I'll help you work out what content you already have, what still needs to be made, and how you'll keep the site up to date.",
    shopify: "For a first Shopify store, I start with the products, collections, variants, and shipping details. For a redesign, I review the current store and what needs to improve. I can build the Liquid sections and templates you'll need for those pages.",
    question: "What should I send you to get started?",
    answer: "Send your current website if you have one, a short description of the business, and any photos, logos, or notes you've collected. Tell me what you'd like the site to help people do. I can help you work out which pages and features you need.",
    buyerFaqs: [
      {"q":"What would my first website need?","a":["A first site usually needs a clear offer, details about who you serve, photos or examples, and a way to get in touch or buy. I can help you plan the pages from there. I'll also ask what content you already have and who will update the site after launch."]},
      {"q":"Can you help with branding as well as the website?","a":["Yes. I have a graphic design and branding background, and I can work with your current identity or help you develop one. My print portfolio shows original logos and marketing work. The AMW project shows how I bring a brand into a website."],"links":[{"href":"/projects/print","label":"Original branding and design work"},{"href":"/projects/amw-hardscape","label":"Branding applied to a business website"}]},
      {"q":"Can you help me launch or redesign a Shopify store?","a":["Yes. I'll look at your products, collections, photos, and the pages you need. If you have a store already, I'll review its theme and the changes you want. I can then design the pages and build the Liquid sections and settings your team needs."],"links":[{"href":"/projects/shopify-migrations","label":"Shopify templates and editing controls"}]},
    ],
    proof: [
      {"title":"AMW business website","href":"/projects/amw-hardscape","text":"The branding, service information, project photos, and estimate form I brought together for AMW."},
      {"title":"Branding and marketing design","href":"/projects/print","text":"Original logos, layouts, and campaign work from my graphic design background."},
      {"title":"Shopify pages your team can manage","href":"/projects/shopify-migrations","text":"Custom sections and templates I built for two enterprise storefronts at Imagine Learning."},
    ],
  },
  mesa: {
    description: "Web design and Shopify development for Mesa, AZ. Brett Snyder can review your current site, improve it, and help you track customer inquiries.",
    contextTitle: "What's worth keeping?",
    approachTitle: "Check what the site is measuring",
    focus: {"title":"Check the numbers behind the website","text":"I can review the site's SEO, AEO, and GEO setup and check how it records inquiries. Analytics Workbench shows how I inspect tracking events. The Shopify and CMS projects show how I work with existing sites and publishing systems."},
    reading: [{"href":"https://topwebworks.com/blog/shopify-without-app-bloat","label":"Reviewing the Shopify apps you use"},{"href":"/projects/analytics-workbench","label":"How I check website tracking"}],
    recommendation: {"quote":"I handled the wireframes and dev-ready designs in Figma, and Brett worked on the development, so we collaborated often and stayed aligned on the best way to move things forward.","by":"Christina Young Tessier","context":"Sr. Graphic Designer at Imagine Learning; Shopify redesign collaborator","date":"November 24, 2025"},
    introduction: "If you already have a website, I can look at what's working and what needs attention before recommending a rebuild. I'm Brett Snyder, a web designer and frontend developer serving Mesa from Queen Creek. I work with Next.js/React and Shopify/Liquid.",
    context: "I'll look at the pages, content, theme or code, and the way your team updates the site. That helps me see what to keep and what to change. My WordPress and CMS experience is useful when there's an older publishing system involved. For new builds, I mainly work with Next.js/React and Shopify.",
    approach: "A button click doesn't tell you whether someone sent a form or became a customer. I built Analytics Workbench to inspect events sent to GTM, GA4, and advertising platforms. On a Shopify store, I also look at what the theme and apps are doing. Those checks help me decide which changes are worth making.",
    frontend: "I build Next.js and React websites and make improvements to existing sites for Mesa small businesses and teams. I can work on a page, a component, a contact form, or a larger redesign, depending on what the site needs.",
    shopify: "I'll review the Shopify catalog, theme, navigation, apps, and current page addresses before planning a redesign. I'll talk with you about what to keep, what your team needs to edit, and which old addresses need redirects. Sometimes a built-in feature or a small theme change is enough to solve the problem.",
    question: "Can you look at my website before recommending a rebuild?",
    answer: "Yes. Send the link and tell me what the site needs to do, what's frustrating you, and how you update it. I'll use that information to talk through the options, including smaller changes that might solve the problem.",
    buyerFaqs: [
      {"q":"Can you improve my site without starting over?","a":["Possibly. I'll need to look at the site and understand what's causing trouble. A page update, a component fix, or a theme change may be enough. If the problem needs more work, I'll explain why and talk through a plan with you."]},
      {"q":"What do you keep when you redesign a Shopify store?","a":["I look at the catalog, page addresses, navigation, content, and the way your team uses the store. Then I'll recommend what to keep, what to change, and which old addresses need redirects. I'll also ask what your team wants to update in the theme editor."],"links":[{"href":"/projects/shopify-migrations","label":"The reusable Shopify section library"}]},
      {"q":"Can you check whether my site is tracking inquiries correctly?","a":["Yes. I can inspect the events sent to Google Tag Manager, GA4, and advertising platforms and compare them with what happens on the page. Analytics Workbench shows the tool I built for that. Any tracking changes need to fit your site's consent settings."],"links":[{"href":"/projects/analytics-workbench","label":"Analytics event inspection and findings"}]},
    ],
    proof: [
      {"title":"Checking website tracking","href":"/projects/analytics-workbench","text":"Analytics Workbench, the tool I built to inspect GTM, GA4, and advertising events."},
      {"title":"Making campaign pages easier to build","href":"/projects/master-blocks","text":"Master Blocks, a reusable page system I built for an enterprise marketing team."},
      {"title":"Shopify sections and templates","href":"/projects/shopify-migrations","text":"My development work on two Imagine Learning migrations, with the design and marketing contributions credited."},
    ],
  },
  'apache-junction': {
    description: 'Small-business web design and Shopify development for Apache Junction, AZ. Next.js/React websites, Liquid storefronts, and clear customer inquiry paths.',
    contextTitle: "Show customers the work",
    approachTitle: "Follow up when someone reaches out",
    focus: {"title":"Help a visitor take the next step","text":"I plan the SEO, AEO, and GEO setup alongside service details, project examples, and contact options. On AMW, those pages and buttons connect to an estimate form and follow-up system. The case study shows the website work, and the studio article covers what happens after a request arrives."},
    reading: [{"href":"https://topwebworks.com/blog/what-happens-after-the-lead","label":"What happens after the lead arrives"},{"href":"/projects/amw-hardscape","label":"See the AMW gallery and estimate form"}],
    recommendation: {"quote":"He consistently delivered high-quality work, bringing creativity and precision to every project.","by":"Carl Van Stryland","context":"Former marketing teammate","date":"October 6, 2025"},
    introduction: "People visiting a service business website often want to see the work, check the services, and ask for an estimate. I help build those pages and forms. I'm Brett Snyder, a Queen Creek-based web designer serving Apache Junction with Next.js/React websites and Shopify/Liquid stores.",
    context: "AMW serves Apache Junction, and its website is a useful example of the work I do. I built service details, a filterable project gallery, and call and estimate buttons people can use on a phone. The case study explains those choices and shows the finished site. I'm based in Queen Creek and work with businesses across the East Valley.",
    approach: "Once a request comes in, someone needs to receive it and know what to do next. I connected AMW's forms to its CRM and follow-up system. My Top Web Works article explains how that follow-up can work. Contact me for a website or development project, or use the studio's managed plans if you want ongoing website care and follow-up handled for you.",
    frontend: "I build Next.js and React websites for Apache Junction small businesses, with service details, project photos, and clear call or estimate buttons. I'll confirm where requests go, what customers see after submitting a form, and who will respond.",
    shopify: "I design Shopify sites and build Liquid sections for shops and product brands. I can work on product information, photos, collections, and phone layouts, whether you need a new storefront or changes to the theme you have.",
    question: "Should I add more pages or improve my project gallery?",
    answer: "I'd start with what customers need to see before contacting you. Better project photos, clearer service details, or an easier estimate form might help the page you already have. A new page can make sense when it has a specific service or offer to explain.",
    buyerFaqs: [
      {"q":"How can I make it easier for customers to request an estimate?","a":["Make the services clear, show relevant work, and put the estimate button where people can find it on a phone. The form should ask for useful details and confirm that the request arrived. AMW serves Apache Junction, and its case study shows how I built that process."],"links":[{"href":"/projects/amw-hardscape","label":"AMW website, estimate form, and follow-up"}]},
      {"q":"What does the AMW project show?","a":["It shows the service pages, project gallery, phone controls, estimate form, and CRM connection I built. You can see the design choices and the finished website, then consider which parts would be useful for your own business."],"links":[{"href":"/projects/amw-hardscape","label":"Read the attributed AMW case study"}]},
      {"q":"Do you build Shopify sites for Apache Junction businesses?","a":["Yes. I can design a new storefront, improve an existing theme, or build particular Liquid sections and templates. I'll look at your products, content, and the updates you want to make yourself before deciding on the work."],"links":[{"href":"/projects/shopify-migrations","label":"Shopify storefront and custom section examples"}]},
    ],
    proof: [
      {"title":"AMW project gallery and estimate form","href":"/projects/amw-hardscape","text":"A hardscape business that serves Apache Junction, with website and CRM work I built."},
      {"title":"Website care and lead follow-up","href":"/projects/topwebworks","text":"How I build and maintain client websites through Top Web Works."},
      {"title":"Shopify storefront work","href":"/projects/shopify-migrations","text":"Product templates, custom sections, and page settings I built at Imagine Learning."},
    ],
  },
};

export function cityFaqs(city: City): Faq[] {
  const content = cityContent[city.slug];
  return [
    { q: `Do you work with businesses and teams in ${city.name}?`, a: ["Yes. I'm based in Queen Creek, Arizona and work with businesses across the East Valley. You'll work directly with me. Most work happens online. If an in-person visit would help, let me know."] },
    { q: content.question, a: [content.answer] },
    ...content.buyerFaqs,
    { q: 'What will I own, and when will my site launch?', a: ["Before I start, I'll put the details in writing: what I'm building, who owns it, which accounts you need, and what you'll be able to change afterward. I'll also confirm any ongoing support and costs for other tools with you. The launch date depends on the work, content, and approvals. I'll give you a timeline once I know what's involved."] },
    { q: 'Can you take care of the site after launch?', a: ["Yes. Top Web Works offers ongoing hosting, maintenance, lead capture, and email follow-up through managed plans. Higher plans add text follow-up and other marketing work. The plan page covers what's included and any separate costs. If you need help with a particular design or development job, email me here."], links: [{ href: 'https://topwebworks.com/pricing', label: "See what's included in Top Web Works plans" }] },
  ];
}
