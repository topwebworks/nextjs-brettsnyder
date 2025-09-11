"use client"

import React from 'react';
import Image from 'next/image';
import { Zap, Heart, Code, Lightbulb, Target } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import { emailLinks, resumeLinks, siteConfig } from '@/lib/config';
import { ScrollAnimationsProvider } from "@/components/providers/ScrollAnimationsProvider";
import styles from './AboutPage.module.css';

// Global/shared images from src/images/
import professionalPortrait from '@/images/portrait/professional-portrait.jpg';
import techExcellenceImage from '@/images/tech-excellence.jpg';
import continuousInnovationImage from '@/images/continuous-innovation.jpg';
import userCenteredDesignImage from '@/images/user-centered-design.jpg';

// Personal story data with employer-focused content
const personalStory = {
  introduction: "I’m Brett Snyder, a designer-turned-developer with a love for bringing ideas to life on the web. From sketches that ended up in stores to code powering high-performing campaigns, I’ve spent my career balancing creativity with technology.",
  journey: "My path started in ad agencies and design departments at NuSkin and Franklin Covey, where I worked on everything from catalogs to brand campaigns. Later, I moved into direct marketing, freelancing, and even ran a recreational gymnastics business before shifting fully into web development.",
  achievements: "Along the way, I’ve created reusable systems that saved teams time, built CMS sites adopted by large organizations like Pearson, and helped grow both businesses and communities through design and code. I’ve also taught and mentored kids and colleagues alike—helping people believe in themselves as much as in the work.",
  current: "Today I’m at Imagine Learning, where I’ve moved from Senior Designer to Frontend Developer. I focus on building flexible, responsive solutions for marketing campaigns and continue to explore new tools, frameworks, and creative projects on the side."
};

// Professional achievements and metrics
const achievements = [
  { label: 'Industry Years', value: '25+', icon: Target },
  { label: 'Artwork Sold', value: '10K+', icon: Zap },
  { label: 'Team Members Mentored', value: '12+', icon: Heart },
  { label: 'Imagine Learning Years', value: '8+', icon: Code }
];

// Core skills with proficiency levels
const coreSkills = [
  { name: 'Shopify/Liquid', level: 75, category: 'Development', icon: Code },
  { name: 'Next.js/React', level: 75, category: 'Frameworks', icon: Code },
  { name: 'HTML/CSS/JS', level: 95, category: 'Languages', icon: Code },
  { name: 'UI/UX Design', level: 85, category: 'Design', icon: Lightbulb },
  { name: 'Performance Optimization', level: 80, category: 'Technical', icon: Zap },
  { name: 'Fluid Responsive', level: 95, category: 'Design', icon: Target }
];

// Personal values and working style - Enhanced for staggered layout
const personalValues = [
  {
    title: "Technical Excellence",
    subtitle: "Crafting solutions that scale",
    description: "High-performing code is more than just neat syntax—it’s the engine behind better engagement and stronger ROI. A slow or buggy site loses users before they even see the message.",
    details: "I build fast, accessible, and scalable frontends using clean, maintainable code. I focus on fluid responsive layouts, sub-2-second load times, and reusable components that make future campaigns quicker to launch and easier to maintain.",
    icon: Code,
    metrics: "95+ Lighthouse Score",
    image: techExcellenceImage,
    imageAlt: "Modern development workspace with multiple monitors showing code"
  },
  {
    title: "Continuous Innovation",
    subtitle: "Always learning, always growing",
    description: "Digital markets shift quickly, and the best results come from staying ahead of the curve. Innovation keeps websites relevant and ensures they outperform competitors.",
    details: "I set aside time each month to explore new frameworks, conversion strategies, and UX patterns. I bring these lessons back into client and employer projects—delivering fresh, modern solutions that keep brands competitive and profitable.",
    icon: Lightbulb,
    metrics: "30+ Hrs/mo Learning",
    image: continuousInnovationImage,
    imageAlt: "Futuristic technology and digital innovation concept"
  },
  {
    title: "User-Centered Design",
    subtitle: "Technology should serve people",
    description: "A website succeeds when it connects with its audience. Technology should serve people by being clear, intuitive, and focused on guiding users toward action.",
    details: "I design with conversion in mind, clean layouts, clear content hierarchy, and easy navigation that reduces friction. Prototyping, testing, and iterating ensure the end product not only looks good but also drives measurable results.",
    icon: Heart,
    metrics: "ADA Compliance",
    image: userCenteredDesignImage,
    imageAlt: "User experience design process with sketches and wireframes"
  }
];

export default function AboutPage() {
  const [portraitLoaded, setPortraitLoaded] = React.useState(false);
  const [skillsVisible, setSkillsVisible] = React.useState(false);
  const skillsRef = React.useRef<HTMLElement>(null);
  
  // Set up skills scroll animation
  React.useEffect(() => {
    if (!skillsRef.current) return;

    const skillsElement = skillsRef.current;

    // Add scroll animation class
    skillsElement.classList.add('scroll-skills-progress');

    // Listen for the custom event triggered by scroll animation
    const handleSkillsInView = () => {
      setSkillsVisible(true);
    };

    skillsElement.addEventListener('skillsInView', handleSkillsInView);

    return () => {
      skillsElement.removeEventListener('skillsInView', handleSkillsInView);
    };
  }, []);
  
  return (
    <>      
      <div className={styles.pageContainer}>
        {/* Atmospheric Background Component */}
        <AtmosphericBackground variant="subtle" orbCount={4} />
        
        {/* Header */}
        <Header />


          {/* Subtle Background Glass Panel */}
          <div className={`${styles.backgroundGlassPanel} float-panel`} />


        {/* Main Content */}
        <main>

          {/* Hero Section - About Introduction */}
          <section className={styles.heroSection}>
            
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                {/* Left Column - Portrait */}
                <div className={styles.portraitContainer}>
                  {/* Enhanced Professional Portrait Container with Sophisticated Glassmorphism */}
                  <div className={styles.portraitImageWrapper}>
                    {/* Hover Overlay with Purple Accent - Outside main container */}
                    <div className={`${styles.portraitHoverOverlay} portrait-hover-overlay`}></div>

                    <div className={styles.portraitWrapper}>
                      {/* Interactive Layer */}
                      <div
                        className={styles.portraitInteractiveLayer}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.parentElement?.parentElement?.querySelector('.portrait-hover-overlay') as HTMLElement;
                          const container = e.currentTarget.parentElement?.parentElement as HTMLElement;
                          if (overlay && container) {
                            overlay.style.opacity = '1';
                            container.style.transform = 'translateY(-6px) scale(1.02)';
                            container.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.parentElement?.parentElement?.querySelector('.portrait-hover-overlay') as HTMLElement;
                          const container = e.currentTarget.parentElement?.parentElement as HTMLElement;
                          if (overlay && container) {
                            overlay.style.opacity = '0';
                            container.style.transform = 'translateY(0) scale(1)';
                          }
                        }}
                      />
                    {/* Loading placeholder */}
                    {!portraitLoaded && (
                      <div className={styles.portraitLoadingPlaceholder}>
                        <LoadingSpinner size="lg" />
                      </div>
                    )}
                    
                    <Image 
                      src={professionalPortrait}
                      alt="Professional Portrait"
                      fill
                      sizes="(max-width: 768px) 350px, (max-width: 1024px) 400px, 450px"
                      className={`portrait-image ${styles.portraitImage} ${portraitLoaded ? styles.portraitImageLoaded : styles.portraitImageLoading}`}
                      placeholder="blur"
                      loading="eager"
                      priority={true}
                      onLoad={() => setPortraitLoaded(true)}
                    />

                    {/* Subtle overlay for depth */}
                    <div className={styles.portraitOverlay} />
                    </div>
                  </div>

                  {/* Enhanced Professional Achievements Grid with Production Glassmorphism */}
                  <div className={styles.achievementsGrid}>
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.label}
                        className={styles.achievementCard}
                      >
                        {/* Hover Overlay with Blue Accent */}
                        <div className={`${styles.achievementCardHover} stats-hover-overlay`} />

                        {/* Interactive Layer */}
                        <div
                          className={styles.achievementInteractiveLayer}
                          onMouseEnter={(e) => {
                            const overlay = e.currentTarget.parentElement?.querySelector('.stats-hover-overlay') as HTMLElement;
                            const container = e.currentTarget.parentElement as HTMLElement;
                            if (overlay && container) {
                              overlay.style.opacity = '1';
                              container.style.transform = 'translateY(-6px)';
                              container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const overlay = e.currentTarget.parentElement?.querySelector('.stats-hover-overlay') as HTMLElement;
                            const container = e.currentTarget.parentElement as HTMLElement;
                            if (overlay && container) {
                              overlay.style.opacity = '0';
                              container.style.transform = 'translateY(0)';
                            }
                          }}
                        />

                        <achievement.icon 
                          size={22} 
                          className={styles.achievementCardIcon} 
                        />
                        <div className={styles.achievementCardLabel}>
                          {achievement.label}
                        </div>
                        <div className={styles.achievementCardValue}>
                          {achievement.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className={styles.textContent}>
                  {/* Header */}
                  <div className={styles.textHeader}>
                    <h1 className={styles.textTitle}>
                      About Me
                    </h1>
                    
                    <p className={styles.textIntroduction}>
                      {personalStory.introduction}
                    </p>
                  </div>

                  {/* Personal Story Sections */}
                  <div className={styles.personalStorySections}>
                    {[
                      { title: 'My Journey', content: personalStory.journey },
                      { title: 'Key Achievements', content: personalStory.achievements },
                      { title: 'Current Focus - Employed', content: personalStory.current }
                    ].map((section) => (
                      <div 
                        key={section.title}
                        className={styles.personalStorySection}
                      >
                        <h2 className={styles.personalStorySectionTitle}>
                          {section.title}
                        </h2>
                        <p className={styles.personalStorySectionContent}>
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons with Mobile Responsiveness */}
                  <div className={styles.actionButtons}>
                    {siteConfig.showResume && (
                      <div 
                        onClick={resumeLinks.download}
                        className={styles.actionButtonContainer}
                      >
                        <Button
                          variant="primary"
                          size="medium"
                          icon="download"
                        >
                          Download Resume
                        </Button>
                      </div>
                    )}

                    <a 
                      href={emailLinks.connect()}
                      className={styles.actionButtonLink}
                    >
                      <Button
                        variant="secondary"
                        size="medium"
                        icon="mail"
                      >
                        Say Hello
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Skills Section */}
          <section ref={skillsRef} className={styles.skillsSection}>

            <div className={styles.skillsContainer}>
              <h2 className={styles.skillsTitle}>
                Core Skills
              </h2>

              <div className={`${styles.skillsGrid} skills-grid`}>
                {coreSkills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={styles.skillCard}
                  >
                    {/* Hover Overlay with Green Accent */}
                    <div className={`${styles.skillHoverOverlay} skill-hover-overlay`} />

                    {/* Interactive Layer */}
                    <div
                      className={styles.skillInteractiveLayer}
                      onMouseEnter={(e) => {
                        const overlay = e.currentTarget.parentElement?.querySelector('.skill-hover-overlay') as HTMLElement;
                        const container = e.currentTarget.parentElement as HTMLElement;
                        if (overlay && container) {
                          overlay.style.opacity = '1';
                          // Only transform, no scaling to avoid border conflicts
                          container.style.transform = 'translateY(-6px)';
                          container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const overlay = e.currentTarget.parentElement?.querySelector('.skill-hover-overlay') as HTMLElement;
                        const container = e.currentTarget.parentElement as HTMLElement;
                        if (overlay && container) {
                          overlay.style.opacity = '0';
                          container.style.transform = 'translateY(0)';
                        }
                      }}
                    />
                    
                    <div className={styles.skillCardHeader}>
                      <skill.icon 
                        size={22} 
                        className={styles.skillCardIcon}
                      />
                      <div>
                        <h2 className={styles.skillCardTitle}>
                          {skill.name}
                        </h2>
                        <div className={styles.skillCategory}>
                          {skill.category}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Skill Progress Bar with Better Visibility */}
                    <div className={styles.skillProgressBarContainer}>
                      <div 
                        className={`${styles.skillProgressBar} ${skillsVisible ? styles.skillProgressBarVisible : ''}`}
                        style={{
                          width: skillsVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.2}s`,
                        }}
                      />
                    </div>

                    <div className={styles.skillLevelDisplay}>
                      {skill.level}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* Personal Values Section - Staggered Image & Content Layout */}
        <ScrollAnimationsProvider>

          <section className={styles.valuesSection}>            

            <div className={styles.valuesContainer}>
              <h2 className={styles.valuesSectionTitle}>
                Philosophy & Approach
              </h2>

              <div className={styles.valuesListContainer}>
                {personalValues.map((value, index) => {
                  const Icon = value.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={value.title}
                      className={`${styles.valueContainer} ${isEven ? styles.valueContainerEven : styles.valueContainerOdd} value-container value-container-${index}`}
                      data-scroll-trigger={index}
                    >
                      {/* Image Panel with Hover Effects */}
                      <div 
                        className={`${styles.valueImagePanel} image-panel photo-contemporary-container scroll-fade-up-fast`}
                      >
                        {/* Hover Overlay with Orange Accent */}
                        <div
                          className={`${styles.valueImageHoverOverlay} image-hover-overlay`}
                        />

                        <Image 
                          src={value.image}
                          alt={value.imageAlt}
                          fill
                          sizes="(max-width: 768px) 95vw, (max-width: 1024px) 400px, 450px"
                          className="photo-contemporary"
                          loading="lazy"
                          placeholder="blur"
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                        
                        {/* Subtle Gradient Overlay */}
                        <div className={styles.valueImageOverlay} />
                        
                        {/* Glassmorphism Pill Badge */}
                        <div className={styles.valueImageBadge}>
                          {value.metrics}
                        </div>

                        {/* Interactive Layer - Must be last to capture hover */}
                        <div className={styles.valueImageInteractiveLayer} />
                      </div>

                      {/* Content Panel with Hover Effects */}
                      <div 
                        className={`${styles.valueContentPanel} ${isEven ? styles.valueContentPanelEven : styles.valueContentPanelOdd} content-panel scroll-fade-up`}
                      >
                        {/* Hover Overlay with Purple Accent */}
                        <div
                          className={`${styles.valueContentHoverOverlay} hover-overlay`}
                        />
                        
                        {/* Interactive Layer for Hover Detection */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10
                          }}
                          onMouseEnter={(e) => {
                            const overlay = e.currentTarget.parentElement?.querySelector('.hover-overlay') as HTMLElement;
                            if (overlay) {
                              overlay.style.opacity = '1';
                              overlay.style.transform = 'translateY(0)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const overlay = e.currentTarget.parentElement?.querySelector('.hover-overlay') as HTMLElement;
                            if (overlay) {
                              overlay.style.opacity = '0';
                              overlay.style.transform = 'translateY(2px)';
                            }
                          }}
                        />
                        
                        {/* Header with Enhanced Icon */}
                        <div 
                          className={`${styles.valueHeader} value-header`}
                        >
                          <div className={styles.valueIconContainer}>
                            <Icon 
                              size={36} 
                              className={styles.valueIcon}
                            />
                          </div>
                          <div>
                            <h2 className={styles.valueTitle}>
                              {value.title}
                            </h2>
                            <p className={styles.valueSubtitle}>
                              {value.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={styles.valueDescriptionUpdated}>
                          {value.description}
                        </p>
                        
                        {/* Clean Modern Quote Box */}
                        <div className={styles.valueQuoteBox}>
                          <p className={styles.valueQuoteText}>
                            {value.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          
        </ScrollAnimationsProvider>

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
