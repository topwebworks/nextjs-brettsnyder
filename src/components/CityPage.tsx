import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Code, Layers, Target } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import ResumeButton from '@/components/ui/ResumeButton';
import ListenButton from '@/components/ui/ListenButton';
import { emailLinks, siteConfig } from '@/lib/config';
import { personSchema } from '@/lib/profile';
import { cityContent, cityFaqs } from '@/lib/city-content';
import type { City } from '@/lib/cities';
import styles from '@/app/about/AboutPage.module.css';

export default function CityPage({ city }: { city: City }) {
  const content = cityContent[city.slug];
  const faqs = cityFaqs(city);
  const url = `${personSchema.url}/${city.slug}`;
  const facts = [
    { label: 'Years building websites', value: '15+', icon: Code },
    { label: 'LinkedIn recommendations', value: '22', icon: Target },
    { label: 'Enterprise Shopify migrations', value: '2', icon: Layers },
    { label: 'Enterprise CMS properties', value: '13', icon: Code },
  ];
  const capabilities = [
    { title: 'Next.js / React', text: content.frontend, icon: Code },
    { title: 'Shopify / Liquid', text: content.shopify, icon: Layers },
    { title: 'Search and conversions', text: 'SEO, AEO, and GEO foundations, useful buyer answers, accessible interfaces, and tracking around the inquiry or purchase path. My design and branding background connects the visual work to the customer journey.', icon: Target },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${city.name} Web Designer & Developer | Brett Snyder`, about: { '@id': personSchema['@id'] }, mainEntity: { '@id': `${url}#service` } },
      { '@type': 'Service', '@id': `${url}#service`, url, name: `Web design and frontend development for ${city.name}`, description: content.introduction, serviceType: ['Next.js and React website development', 'Shopify and Liquid development', 'Web design and design systems'], provider: { '@id': personSchema['@id'] }, areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Arizona' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: personSchema.url }, { '@type': 'ListItem', position: 2, name: city.name, item: url }] },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a.join(' ') } })) },
    ],
  };

  return (
    <div className={styles.pageContainer} data-city-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <AtmosphericBackground variant="subtle" orbCount={4} />
      <Header />
      <div className={`${styles.backgroundGlassPanel} float-panel`} />
      <main id="city-content">
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.portraitContainer}>
                <div className={styles.portraitImageWrapper}>
                  <div className={`${styles.portraitHoverOverlay} portrait-hover-overlay`} />
                  <div className={styles.portraitWrapper}>
                    <div className={styles.portraitInteractiveLayer} />
                    <Image src="/brett-snyder-portrait.jpg" alt="Brett Snyder, frontend developer and design engineer based in Queen Creek, Arizona" fill sizes="(max-width: 768px) 350px, (max-width: 1024px) 400px, 450px" className={`portrait-image ${styles.portraitImage} ${styles.portraitImageLoaded}`} priority />
                    <div className={styles.portraitOverlay} />
                  </div>
                </div>
                <div className={styles.achievementsGrid}>
                  {facts.map(fact => (
                    <div key={fact.label} className={styles.achievementCard}>
                      <div className={`${styles.achievementCardHover} stats-hover-overlay`} />
                      <div className={styles.achievementInteractiveLayer} />
                      <fact.icon size={22} className={styles.achievementCardIcon} />
                      <div className={styles.achievementCardLabel}>{fact.label}</div>
                      <div className={styles.achievementCardValue}>{fact.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.textContent}>
                <div className={styles.textHeader}>
                  <h1 className={styles.textTitle}>Web design in {city.name}</h1>
                  <ListenButton targetId="city-content" title={`Web design in ${city.name}. ${content.introduction}`} className={styles.listen} />
                  <p className={styles.textIntroduction}>{content.introduction}</p>
                </div>
                <div className={styles.personalStorySections}>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>Working with you in {city.name}</h2>
                    <p className={styles.personalStorySectionContent}>{content.context}</p>
                  </section>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>Design, development, and the next step</h2>
                    <p className={styles.personalStorySectionContent}>{content.approach}</p>
                  </section>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>Experience behind the work</h2>
                    <p className={styles.personalStorySectionContent}>I bring more than 15 years building websites, extensive CMS/WordPress experience, and several years working with Shopify and Next.js/React. At Imagine Learning, my work included two enterprise Shopify migrations and 13 enterprise WordPress properties. My graphic design and branding background supports the way I plan content and interfaces.</p>
                    <div className={styles.faqLinks}>
                      <Link className={styles.faqLink} href="https://www.linkedin.com/in/topwebworks">22 LinkedIn recommendations <ArrowRight size={16} aria-hidden="true" /></Link>
                      <Link className={styles.faqLink} href="/about">More about Brett <ArrowRight size={16} aria-hidden="true" /></Link>
                    </div>
                  </section>
                </div>
                <div className={styles.actionButtons}>
                  <Button variant="primary" size="medium" icon="mail" href={emailLinks.portfolio()}>Discuss a project</Button>
                  {siteConfig.showResume && <ResumeButton variant="secondary" size="medium" icon="download">Download Resume</ResumeButton>}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.skillsSection}>
          <div className={styles.skillsContainer}>
            <h2 className={styles.skillsTitle}>What I can help you build</h2>
            <div className={styles.skillsGrid}>
              {capabilities.map(capability => (
                <article key={capability.title} className={styles.skillCard}>
                  <div className={styles.skillCardHeader}><capability.icon size={22} className={styles.skillCardIcon} /><h3 className={styles.skillCardTitle}>{capability.title}</h3></div>
                  <p className={styles.personalStorySectionContent}>{capability.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.skillsSection}>
          <div className={styles.skillsContainer}>
            <h2 className={styles.skillsTitle}>Selected work behind the experience</h2>
            <div className={styles.skillsGrid}>
              {content.proof.map(proof => (
                <article key={proof.href} className={styles.skillCard}>
                  <h3 className={styles.personalStorySectionTitle}>{proof.title}</h3>
                  <p className={styles.personalStorySectionContent}>{proof.text}</p>
                  <div className={styles.faqLinks}><Link className={styles.faqLink} href={proof.href}>Explore the work <ArrowRight size={16} aria-hidden="true" /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.valuesSection} ${styles.faqSection}`}>
          <div className={styles.valuesContainer}>
            <h2 className={styles.valuesSectionTitle}>Questions about working together</h2>
            <div className={styles.faqList}>
              {faqs.map(faq => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}><span>{faq.q}</span><ChevronDown size={20} className={styles.faqIcon} aria-hidden="true" /></summary>
                  <div className={styles.faqAnswer}>
                    {faq.a.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {faq.links && <div className={styles.faqLinks}>{faq.links.map(link => <Link key={link.href} href={link.href} className={styles.faqLink}>{link.label}<ArrowRight size={16} aria-hidden="true" /></Link>)}</div>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
