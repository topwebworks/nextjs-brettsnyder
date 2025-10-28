'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Mail, Github, Linkedin, FileText, Calendar, MapPin, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import { siteConfig, emailLinks, resumeLinks } from '@/lib/config';
import { latestBlogPosts } from '@/lib/generated/latestBlogPosts';
import professionalPortrait from '@/images/portrait/professional-portrait.jpg';
import styles from './HomePage.module.css';


// Memoize static data to prevent unnecessary re-renders
const workHistory = [
  {
    id: 1,
    title: "Marketing Web Developer",
    company: "Imagine Learning",
    location: "Tempe, AZ",
    period: "2022 - Oct 2025",
    current: false,
    description: "I focus on building fast, flexible landing pages and micro sites. I created a reusable Master Blocks template that let our team launch responsive lead-gen pages in half the time. Created many custom core Shopify marketing sections."
  },
  {
    id: 2,
    title: "UI/UX Designer/Developer",
    company: "Imagine Learning",
    location: "Chandler, AZ",
    period: "2019 - 2022",
    current: false,
    description: "In my UI/UX role, I worked closely with stakeholders through live prototyping sessions to shape site flows and designs. I delivered custom WordPress sites, landing pages, and HTML emails, and supported dev teams with front-end style code and QA. "
  },
  {
    id: 3,
    title: "Senior Designer",
    company: "Glynlyon",
    location: "Chandler, AZ",
    period: "Oct 2016 - 2019",
    current: false,
    description: "I designed and built responsive micro sites, landing pages, and HTML email campaigns. I also improved team workflows with reusable email templates, represented at national conventions, graphic and web designs, and mentored team in design and dev best practices."
  }
];

export default function Homepage() {
  // Image loading states
  const [portraitLoaded, setPortraitLoaded] = React.useState(false);
  const [mobilePortraitLoaded, setMobilePortraitLoaded] = React.useState(false);
    
  // Animation configuration
  const animationConfig = {
    useRandom: false,
    maxWords: 3
  };

  // Memoize animated words to prevent unnecessary re-renders
  const animatedWords = React.useMemo(() => [
    'UX/UI,',
    'FE Code,',
    'Websites.'
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
    }, isDeleting ? 80 : isPaused ? 5000 : 120); // Much longer pause between words for better readability

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
          onMouseEnter={(e) => {
            const portrait = e.currentTarget.querySelector(`.${styles.heroPortrait}`) as HTMLElement;
            if (portrait) {
              // Simple desktop hover - CSS handles mobile hiding
              portrait.style.opacity = '0.65';
              portrait.style.transform = 'scale(1)';
              portrait.style.filter = 'blur(0px) brightness(0.6) contrast(1.0) saturate(1.6) hue-rotate(15deg)';
            }
          }}
          onMouseLeave={(e) => {
            const portrait = e.currentTarget.querySelector(`.${styles.heroPortrait}`) as HTMLElement;
            if (portrait) {
              portrait.style.opacity = '0';
              portrait.style.transform = 'scale(1.05)';
              portrait.style.filter = 'blur(0px) brightness(0.5) contrast(0.8) saturate(1.1)';
            }
          }}
        >
          {/* Portrait Background */}
          <div className={styles.heroPortrait}>
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
              { icon: Github, href: siteConfig.github, label: 'GitHub' },
              { icon: Linkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: emailLinks.portfolio(), label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <Button
                key={label}
                variant="secondary"
                size="medium"
                icon={Icon}
                aria-label={label}
                onClick={() => window.open(href, '_blank')}
                className={styles.heroSocialIcon}
              />
            ))}
          </div>

          {/* Typography Hierarchy */}
          <div className={styles.heroContent}>
            {/* Refined Role Badge */}
            <div className={styles.roleBadge}>
              MARKETING WEB DEVELOPER
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
              I create
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
              I’m Brett Snyder. At 17, a sketch of mine reached stores. I’ve since worked in graphic and web design, turned ideas into code, and taught gymnastics to kids in Vermont and Arizona. This site highlights my interests and&nbsp;projects.</p>
            </div>

            {/* CTA */}
            <div className={styles.heroActions}>
              <Button
                variant="primary"
                size="large"
                icon={ArrowRight}
                onClick={() => window.location.href = 'projects'}
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                size="large"
                icon={Mail}
                onClick={() => window.location.href = emailLinks.workTogether()}
              >
                Say Hello
              </Button>
            </div>
          </div>

          {/* Legacy support for mobile portrait visibility */}
          <style jsx global>{`
            @media (max-width: 768px) {
              /* Hide background portrait on mobile */
              .${styles.heroSection}:hover .${styles.heroPortrait} {
                opacity: 0 !important;
              }
            }
          `}</style>
          
        </section>

        {/* Main Content Section */}
        <section className={styles.section}>
          
          {/* Subtle Background Glass Panel */}
          <div className={styles.sectionBackgroundPanel} />
          
          <div className={styles.sectionContent}>
            <div className={styles.contentColumns}>
              {/* Left Column - Latest Blog Articles */}
              <div className={styles.contentColumn}>
                <div className={styles.sectionHeadingRow}>
                  <h2 className={styles.sectionHeadingRowTitle}>
                    Latest Articles
                  </h2>
                  
                  {/* Blog Icon Link */}
                  <div className={styles.headerButtonGroup}>
                    <Button
                      variant="ghost"
                      size="small"
                      icon={BookOpen}
                      aria-label="View all blog posts"
                      onClick={() => window.location.href = '/blog'}
                    />
                  </div>
                </div>
                
                <div className={styles.blogArticleList}>
                  {latestBlogPosts.map((post) => (
                    <article 
                      key={post.id}
                      className={styles.blogArticle}
                    >
                      
                      {/* Floating Category Badge */}
                      <div className={styles.blogCategoryBadge}>
                        {post.category}
                      </div>
                      
                      <div className={styles.blogMetaRow}>
                        <span className={styles.blogReadTime}>
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className={styles.blogTitle}>
                        <a 
                          href={`/blog/${post.id}`}
                          className={styles.blogTitleLink}
                        >
                          {post.title}
                          {/* <ArrowRight size={18} className={styles.blogArrowIcon} /> */}
                        </a>
                      </h3>
                      
                      <p className={styles.blogExcerpt}>
                        {post.excerpt || post.description}
                      </p>
                      
                      <div className={styles.blogFooter}>
                        <time className={styles.blogDate}>
                          <Calendar size={12} />
                          {new Date(post.publishDate + 'T00:00:00').toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </time>

                        {/* Button - Bottom Right */}
                        <a
                          href={`/blog/${post.id}`}
                          className={`${styles.blogReadMoreLink} view-details-btn blog-read-more-btn`}
                        >
                          <Button
                            variant="secondary"
                            size="medium"
                            icon="arrow-right"
                          >
                            Read
                          </Button>
                        </a>
                      </div>
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
                      variant="ghost"
                      size="small"
                      icon={Linkedin}
                      aria-label="LinkedIn Profile"
                      onClick={() => window.open('https://linkedin.com/in/yourprofile', '_blank')}
                    />
                    
                    {siteConfig.showResume && (
                      <Button
                        variant="ghost"
                        size="small"
                        icon={FileText}
                        aria-label="Download Resume"
                        onClick={() => resumeLinks.download()}
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
