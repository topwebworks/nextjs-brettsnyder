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
import { getProjectImages } from '@/lib/generated/projectImageImports';
import { getBlogImages } from '@/lib/generated/blogImageImports';
import type { City } from '@/lib/cities';
import styles from '@/app/about/AboutPage.module.css';
import cityStyles from './CityPage.module.css';

export default function CityPage({ city }: { city: City }) {
  const content = cityContent[city.slug];
  const faqs = cityFaqs(city);
  const url = `${personSchema.url}/${city.slug}`;
  const facts = [
    { label: 'Years building websites', value: '15+', icon: Code },
    { label: 'LinkedIn recommendations', value: '22', icon: Target },
    { label: 'Shopify migrations', value: '2', icon: Layers },
    { label: 'WordPress sites managed', value: '13', icon: Code },
  ];
  const capabilities = [
    { title: 'Website design with Next.js / React', text: content.frontend, icon: Code },
    { title: 'Shopify web design / Liquid', text: content.shopify, icon: Layers },
    { title: content.focus.title, text: content.focus.text, icon: Target },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${city.name} Web Design & Shopify | Brett Snyder`, description: content.description, about: { '@id': personSchema['@id'] }, mainEntity: { '@id': `${url}#service` } },
      { '@type': 'Service', '@id': `${url}#service`, url, name: `Website design and Shopify development for ${city.name}`, description: content.introduction, serviceType: ['Small-business website design', 'Next.js and React website development', 'Shopify web design and Liquid development', 'Web design and design systems'], provider: { '@id': personSchema['@id'] }, areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Arizona' } } },
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
                  <h1 className={`${styles.textTitle} ${cityStyles.cityTitle}`}>Web design in {city.name}, AZ</h1>
                  <ListenButton targetId={['city-story', 'city-services', 'selected-work', 'city-faq']} title={`Web design in ${city.name}, AZ. ${content.introduction}`} className={styles.listen} />
                  <p className={styles.textIntroduction}>{content.introduction}</p>
                </div>
                <div id="city-story" className={styles.personalStorySections}>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>{content.contextTitle}</h2>
                    <p className={styles.personalStorySectionContent}>{content.context}</p>
                  </section>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>{content.approachTitle}</h2>
                    <p className={styles.personalStorySectionContent}>{content.approach}</p>
                    <div className={styles.faqLinks}>
                      {content.reading.map(link => <Link key={link.href} className={styles.faqLink} href={link.href}>{link.label}<ArrowRight size={16} className={cityStyles.proofArrow} aria-hidden="true" /></Link>)}
                    </div>
                  </section>
                  <section className={styles.personalStorySection}>
                    <h2 className={styles.personalStorySectionTitle}>My experience</h2>
                    <p className={styles.personalStorySectionContent}>I&apos;ve been building websites for more than 15 years. At Imagine Learning, I managed 13 WordPress sites and led two Shopify migrations. I started in design and moved into development, so I&apos;m comfortable working with both designers and developers. Today I build with Next.js/React and Shopify/Liquid.</p>
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
        <section id="city-services" className={styles.skillsSection}>
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
        <section id="selected-work" className={styles.skillsSection}>
          <div className={styles.skillsContainer}>
            <h2 className={styles.skillsTitle}>Selected work</h2>
            <div className={styles.skillsGrid}>
              {content.proof.map(proof => {
                const id = proof.href.split('/').at(-1)!;
                const image = (proof.href.startsWith('/projects/') ? getProjectImages(id) : getBlogImages(id)).hero;
                return (
                  <article key={proof.href} className={styles.skillCard}>
                    {image && <div className={cityStyles.proofThumbnail}><Image src={image} alt={`${proof.title}, from Brett Snyder's portfolio`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px" className={cityStyles.proofImage} /></div>}
                    <h3 className={styles.personalStorySectionTitle}><Link className={styles.faqLink} href={proof.href}>{proof.title} <ArrowRight size={16} className={cityStyles.proofArrow} aria-hidden="true" /></Link></h3>
                    <p className={styles.personalStorySectionContent}>{proof.text}</p>
                  </article>
                );
              })}
            </div>
            <figure className={cityStyles.recommendation}>
              <blockquote className={styles.valueQuoteBox}>
                <p className={styles.valueQuoteText}>{content.recommendation.quote}</p>
              </blockquote>
              <figcaption className={styles.personalStorySectionContent}>
                {content.recommendation.by}, {content.recommendation.context}.{' '}
                <Link className={styles.faqLink} href="https://www.linkedin.com/in/topwebworks">LinkedIn recommendation, {content.recommendation.date}</Link>
              </figcaption>
            </figure>
          </div>
        </section>
        <section id="city-faq" className={`${styles.valuesSection} ${styles.faqSection}`}>
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
