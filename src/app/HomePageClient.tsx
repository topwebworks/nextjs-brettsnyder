'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Github, Linkedin, Calendar, MapPin, FolderOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import { siteConfig, emailLinks } from '@/lib/config';
import ResumeButton from '@/components/ui/ResumeButton';
import { latestProjects } from '@/lib/generated/latestProjects';
import professionalPortrait from '@/images/portrait/professional-portrait.jpg';
import styles from './HomePage.module.css';


// Memoize static data to prevent unnecessary re-renders
const workHistory = [
  {
    id: 1,
    title: "Product & Frontend Developer",
    company: "Cosaint, Inc.",
    location: "Queen Creek, AZ",
    period: "Nov 2025 - Present",
    current: true,
    description: "I built and launched CyWire, a B2B AI SaaS platform, in three months and continue to lead its product and frontend development. I also run TopWebWorks projects from positioning and functional prototypes through custom conversion-focused sites and Shopify e-commerce stores, CRM workflows, and ongoing growth support."
  },
  {
    id: 2,
    title: "Marketing Web Developer",
    company: "Imagine Learning",
    location: "Arizona (Remote)",
    period: "Mar 2022 - Oct 2025",
    current: false,
    description: "I managed 13 WordPress sites and one custom CMS property, led three Shopify migrations, and built two design systems: Master Blocks for HTML/CMS landing pages and a Shopify Plus marketing design system in Liquid. Master Blocks reduced landing-page production time by 40% across more than 50 pages."
  },
  {
    id: 3,
    title: "UI/UX Designer/Developer",
    company: "Imagine Learning",
    location: "Chandler, AZ",
    period: "Apr 2019 - Mar 2022",
    current: false,
    description: "I led UI/UX and frontend work for marketing and product experiences, maintained WordPress properties, and turned Figma designs into functional HTML prototypes. I also built the responsive Monarch Catalog prototype with working interactions for engineering handoff."
  }
];

export default function Homepage() {
  // Image loading states
  const [portraitLoaded, setPortraitLoaded] = React.useState(false);
  const [mobilePortraitLoaded, setMobilePortraitLoaded] = React.useState(false);
  
  // Portrait hover state
  const [isPortraitHovered, setIsPortraitHovered] = React.useState(false);
    
  // Animation configuration
  const animationConfig = {
    useRandom: false,
    maxWords: 3
  };

  // Memoize animated words to prevent unnecessary re-renders
  const animatedWords = React.useMemo(() => [
    'design engineer,',
    'Shopify developer,',
    'frontend developer.'
  ], []);

  // Generate sequence of words on component mount
  const [randomWords, setRandomWords] = React.useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState(''); 
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);
  const [wordsShown, setWordsShown] = React.useState(1); // Start at 1 since first word is shown immediately

  const maxWords = animationConfig.maxWords;
  const showCursor = wordsShown < maxWords;

  // Initialize words on mount (random or in order based on config)
  React.useEffect(() => {
    const getWords = () => {
      if (animationConfig.useRandom) {
        const shuffled = [...animatedWords].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, maxWords);
      } else {
        return animatedWords.slice(0, maxWords);
      }
    };
    
    const wordSelection = getWords();
    setRandomWords(wordSelection);
    setCurrentText(wordSelection[0] || 'experiences'); // Start with first word
  }, [animatedWords, maxWords, animationConfig.useRandom]);

  React.useEffect(() => {
    if (randomWords.length === 0) return; // Wait for random words to be set
    
    const currentWord = randomWords[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        // Check if we've shown the maximum number of words after completing a word
        if (wordsShown >= maxWords) {
          return; // Stop animation completely after showing the word
        }
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % randomWords.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setIsPaused(true);
          setWordsShown(prev => prev + 1); // Increment counter when word is fully typed
        }
      }
    }, isDeleting ? 80 : isPaused ? 2000 : 120); // Much longer pause between words for better readability

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, wordsShown, maxWords, randomWords]);

  return (
    <>      
      <div className={styles.mainContainer}>
      
      {/* Atmospheric Background Component */}
      <AtmosphericBackground variant="subtle" orbIds={[3, 4]} includeBackground={true} />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section with Portrait Reveal */}
        <section 
          className={styles.heroSection}
          onMouseEnter={() => setIsPortraitHovered(true)}
          onMouseLeave={() => setIsPortraitHovered(false)}
          onFocusCapture={() => setIsPortraitHovered(true)}
          onBlurCapture={() => setIsPortraitHovered(false)}
        >
          {/* Portrait Background */}
          <div 
            className={`${styles.heroPortrait} ${isPortraitHovered ? styles.heroPortraitVisible : styles.heroPortraitHidden}`}
          >
            {/* Loading placeholder */}
            {!portraitLoaded && (
              <div className={styles.heroPortraitLoading}>
                <LoadingSpinner size="lg" />
              </div>
            )}
            
            <Image 
              src={professionalPortrait}
              alt="Professional Portrait"
              fill
              className={`${styles.heroPortraitImage} ${portraitLoaded ? styles['heroPortraitImage--loaded'] : styles['heroPortraitImage--loading']}`}
              priority
              placeholder="blur"
              onLoad={() => setPortraitLoaded(true)}
            />

            {/* Subtle accent overlay */}
            <div className={styles.heroPortraitAccentOverlay} />

            {/* Additional color enhancement layer */}
            <div className={styles.heroPortraitColorOverlay} />
          </div>

          {/* Background Elements */}
          <div className={styles.heroBgElementPrimary} />
          
          <div className={styles.heroBgElementSecondary} />

          {/* Refined Social Icons - Minimal & Elegant */}
          <div className={styles.heroSocialIcons}>
            {[
              { icon: Github, href: siteConfig.github, label: 'GitHub', external: true },
              { icon: Linkedin, href: siteConfig.linkedin, label: 'LinkedIn', external: true },
              { icon: Mail, href: emailLinks.portfolio(), label: 'Email', external: false }
            ].map(({ icon: Icon, href, label, external }) => (
              <Button
                key={label}
                variant="secondary"
                size="medium"
                icon={Icon}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className={styles.heroSocialIcon}
              />
            ))}
          </div>

          {/* Typography Hierarchy */}
          <div className={styles.heroContent}>
            {/* Refined Role Badge */}
            <div className={styles.roleBadge}>
              DESIGN ENGINEER &amp; FRONTEND DEVELOPER
            </div>

            {/* Mobile Portrait - Shows only on mobile */}
            <div className={styles.mobilePortraitContainer}>
              {/* Loading placeholder for mobile portrait */}
              {!mobilePortraitLoaded && (
                <div className={styles.mobilePortraitLoadingPlaceholder}>
                  <LoadingSpinner size="md" />
                </div>
              )}
              
              <Image 
                src={professionalPortrait}
                alt="Professional Portrait"
                width={120}
                height={120}
                className={`${styles.mobilePortraitImage} ${mobilePortraitLoaded ? styles['mobilePortraitImage--loaded'] : styles['mobilePortraitImage--loading']}`}
                priority
                placeholder="blur"
                onLoad={() => setMobilePortraitLoaded(true)}
              />
            </div>

            {/* Main Heading - with Animated Word */}
            <h1 className={styles.heroTitle}>
              I am a
              <br />
              <span className={styles.animatedTextContainer}>
                <span className={styles.animatedText}>{currentText}</span>
                {showCursor && (
                   <span className={styles.textCursor}>|</span>
                )}
              </span>
              <br />
            </h1>

            {/* Refined Description */}
            <div>
              <p className={styles.heroSubtitle}>
              I’m Brett Snyder, a design engineer and frontend developer. I build SaaS products, Shopify experiences, and conversion-focused websites. This site highlights the products, systems, and campaigns behind that&nbsp;work.</p>
            </div>

            {/* CTA */}
            <div className={styles.heroActions}>
              <Button
                variant="primary"
                size="large"
                icon={ArrowRight}
                href="/projects"
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                size="large"
                icon={Mail}
                href={emailLinks.workTogether()}
              >
                Say Hello
              </Button>
            </div>
          </div>
          
        </section>

        {/* Main Content Section */}
        <section className={styles.section}>
          
          {/* Subtle Background Glass Panel */}
          <div className={styles.sectionBackgroundPanel} />
          
          <div className={styles.sectionContent}>
            <div className={styles.contentColumns}>
              {/* Left Column - Latest Projects */}
              <div className={styles.contentColumn}>
                <div className={styles.sectionHeadingRow}>
                  <h2 className={styles.sectionHeadingRowTitle}>
                    Latest Projects
                  </h2>
                  
                  {/* Projects Icon Link */}
                  <div className={styles.headerButtonGroup}>
                    <Button
                      variant="secondary"
                      size="small"
                      icon={FolderOpen}
                      href="/projects"
                      aria-label="View all projects"
                    />
                  </div>
                </div>
                
                <div className={styles.blogArticleList}>
                  {latestProjects.map((project) => (
                    <article
                      key={project.id}
                      className={styles.blogArticle}
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className={styles.blogArticleOverlayLink}
                        aria-label={project.title}
                        tabIndex={-1}
                      />

                      {/* Floating Category Badge */}
                      <div className={styles.blogCategoryBadge}>
                        {project.category}
                      </div>
                      
                      <div className={styles.blogMetaRow}>
                        <time className={styles.blogDate}>
                          <Calendar size={12} />
                          {new Date(project.publishDate + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>

                        <span className={styles.blogReadTime}>
                          {project.technologies.slice(0, 2).join(' + ') || 'Project'}
                        </span>
                      </div>

                      <h3 className={styles.blogTitle}>
                        <Link
                          href={`/projects/${project.id}`}
                          className={styles.blogTitleLink}
                        >
                          {project.title}
                          {/* <ArrowRight size={18} className={styles.blogArrowIcon} /> */}
                        </Link>
                      </h3>

                      <p className={styles.blogExcerpt}>
                        {project.excerpt}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className={styles.contentColumn}>
                <div className={styles.sectionHeadingRow}>
                  <h2 className={styles.sectionHeadingRowTitle}>
                    Recent Work
                  </h2>
                  
                  {/* LinkedIn and Resume Links */}
                  <div className={styles.headerButtonGroup}>
                    <Button
                      variant="secondary"
                      size="small"
                      icon={Linkedin}
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    />
                    
                    {siteConfig.showResume && (
                      <ResumeButton
                        variant="secondary"
                        size="small"
                        icon="file"
                        showText={false}
                      />
                    )}
                  </div>
                </div>
                
                {/* Clean Timeline */}
                <div className={styles.timelineContainer}>
                  {/* Vertical Timeline Line */}
                  <div className={styles.timelineLine} />
                  
                  <div className={styles.timelineContent}>
                    {workHistory.map((job) => (
                      <div 
                        key={`work-${job.id}-${job.company}`}
                        className={styles.timelineItem}
                      >
                        {/* Timeline Dot */}
                        <div className={`${styles.timelineDot} ${job.current ? styles['timelineDot--current'] : styles['timelineDot--past']}`} />

                        {/* Content */}
                        <div className={styles.timelineItemContent}>
                          {/* Header Row */}
                          <div className={styles.workHeader}>
                            <h3 className={`${styles.workTitle} ${job.current ? styles['workTitle--current'] : ''}`}>
                              {job.title}
                            </h3>
                            <span className={styles.workCompany}>
                              {job.company}
                            </span>
                            {job.current && (
                              <span className={styles.workCurrentBadge}>
                                Current
                              </span>
                            )}
                          </div>

                          {/* Meta Info Row */}
                          <div className={styles.workMeta}>
                            <div className={styles.workMetaItem}>
                              <Calendar size={12} />
                              <span>{job.period}</span>
                            </div>
                            <div className={styles.workMetaItem}>
                              <MapPin size={12} />
                              <span>{job.location}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={styles.workDescription}>
                            {job.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inline animations moved to CSS module */}
          </div>
        </section>
      </main>

      {/* Global Footer Component */}
      <Footer />
    </div>
    </>
  );
}
