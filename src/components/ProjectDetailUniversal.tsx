

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ProjectData } from '@/lib/types/project';
import { Tag, Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import MarkdownContent from '@/components/ui/MarkdownContent';
import EnhancedHTMLContent from '@/components/ui/EnhancedHTMLContent';
import { getProjectImages, getProjectImageByFilename } from '@/lib/generated/projectImageImports';
import { getBlogImages, getBlogImageByFilename } from '@/lib/generated/blogImageImports';
import { useTheme } from '@/contexts/ThemeContext';
import '@/styles/markdown.css';
import styles from './ProjectDetailUniversal.module.css';

// Declare Highlight.js types
declare global {
  interface Window {
    hljs?: {
      highlightAll: () => void;
      configure: (options: { ignoreUnescapedHTML?: boolean; languages?: string[] }) => void;
    };
  }
}

// Helper function to extract YouTube video ID from URL (supports Shorts)
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Helper function to detect if a YouTube URL is a Short (vertical video)
function isYouTubeShort(url: string): boolean {
  return url.includes('/shorts/');
}

// Unified media processing with backward compatibility
function getUnifiedMediaItems(project: ProjectData): Array<{type: 'video' | 'image', src: string, title?: string}> {
  // Check if project uses new unified media format
  if (project.content?.media?.items) {
    return project.content.media.items;
  }
  
  // Backward compatibility: convert old format to new format
  const legacyItems: Array<{type: 'video' | 'image', src: string, title?: string}> = [];
  
  // Add videos first (if any)
  if (project.content?.media?.videos) {
    project.content.media.videos.forEach((videoUrl, index) => {
      legacyItems.push({
        type: 'video' as const,
        src: videoUrl,
        title: `Demo Video ${index + 1}`
      });
    });
  }
  
  // Add featured images
  if (project.content?.media?.featured_images) {
    project.content.media.featured_images.forEach((imageName, index) => {
      legacyItems.push({
        type: 'image' as const,
        src: imageName,
        title: `Featured Image ${index + 1}`
      });
    });
  }
  
  return legacyItems;
}

interface ProjectDetailProps {
  project: ProjectData;
  contentType?: 'project' | 'blog';
}

export default function ProjectDetailUniversal({ project, contentType = 'project' }: ProjectDetailProps) {
  // State for dynamic hero image
  const [currentHeroImage, setCurrentHeroImage] = useState<string | null>(null);
  const [currentHeroVideo, setCurrentHeroVideo] = useState<string | null>(null);
  // State for dynamic aspect ratio detection
  const [currentAspectRatio, setCurrentAspectRatio] = useState<'portrait' | 'landscape' | 'square'>('landscape');
  // State for scroll arrow visibility
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Get theme for dynamic highlighting
  const { theme } = useTheme();

  // Load Highlight.js on-demand with theme switching
  useEffect(() => {
    const loadHighlightJS = async () => {
      // Prevent multiple loads
      if (document.querySelector('script[data-hljs-loading]')) {
        return;
      }
      
      // Check if already loaded but with wrong theme
      const themeFile = theme === 'light' ? 'github' : 'github-dark';
      const existingLink = document.querySelector('link[data-hljs-theme]');
      
      if (window.hljs) {
        // Already loaded, just switch theme if needed
        if (existingLink && existingLink.getAttribute('data-hljs-theme') !== theme) {
          existingLink.remove();
          
          const link = document.createElement('link');
          link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFile}.min.css`;
          link.rel = 'stylesheet';
          link.setAttribute('data-hljs-theme', theme);
          document.head.appendChild(link);
          
          setTimeout(() => window.hljs?.highlightAll(), 50);
        } else {
          window.hljs.highlightAll();
        }
        return;
      }
      
      // Load theme-appropriate CSS
      const link = document.createElement('link');
      link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFile}.min.css`;
      link.rel = 'stylesheet';
      link.setAttribute('data-hljs-theme', theme);
      document.head.appendChild(link);
      
      // Load main Highlight.js
      const script = document.createElement('script');
      script.setAttribute('data-hljs-loading', 'true');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      script.onload = () => {
        script.removeAttribute('data-hljs-loading');
        if (window.hljs) {
          window.hljs.configure({ ignoreUnescapedHTML: true });
          window.hljs.highlightAll();
        }
      };
      document.head.appendChild(script);
    };
    
    loadHighlightJS();
  }, [theme]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Function to update scroll arrow visibility based on overflow
  const updateScrollArrows = useCallback(() => {
    if (!scrollContainerRef.current) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const container = scrollContainerRef.current;
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    const hasOverflow = container.scrollWidth > container.clientWidth;

    setShowLeftArrow(hasOverflow && canScrollLeft);
    setShowRightArrow(hasOverflow && canScrollRight);
  }, []);

  // Get unified media items
  const unifiedMediaItems = getUnifiedMediaItems(project);
  
  // Get static image imports for this project/blog (ZERO API CALLS!)
  const staticImages = contentType === 'blog' ? getBlogImages(project.id) : getProjectImages(project.id);
  
  // Generate placeholder images for consistent UI
  const getPlaceholderImage = useCallback((type: 'hero' | 'demo' | 'screenshot', index?: number) => {
    const seed = project.id + type + (index || 0);
    return `https://picsum.photos/seed/${seed}/800/600`;
  }, [project.id]);
  
  // Utility function to calculate aspect ratio from static import metadata
  const calculateAspectRatio = useCallback((imageData: StaticImageData | null): 'portrait' | 'landscape' | 'square' => {
    // Handle static import objects with width/height metadata
    if (imageData && imageData.width && imageData.height) {
      const ratio = imageData.width / imageData.height;
      
      if (ratio < 0.8) {
        return 'portrait';  // Tall images (mobile screenshots, portraits)
      } else if (ratio > 1.2) {
        return 'landscape'; // Wide images (desktop screenshots, catalogs)
      } else {
        return 'square';    // Square-ish images
      }
    }
    
    // Default to landscape for missing metadata
    return 'landscape';
  }, []);
  
  // Function to resolve image data and calculate aspect ratio
  const getImageAspectRatio = useCallback((imageSrc: string | StaticImageData): 'portrait' | 'landscape' | 'square' => {
    // If it's already a static import object, use it directly
    if (typeof imageSrc === 'object' && imageSrc.width && imageSrc.height) {
      return calculateAspectRatio(imageSrc);
    }
    
    // Try to find the static import from our project images
    const heroImage = staticImages.hero;
    if (heroImage && heroImage.src === imageSrc) {
      return calculateAspectRatio(heroImage);
    }
    
    // Check screenshots
    for (const screenshot of staticImages.screenshots) {
      if (screenshot && screenshot.src === imageSrc) {
        return calculateAspectRatio(screenshot);
      }
    }
    
    // Default fallback
    return 'landscape';
  }, [staticImages, calculateAspectRatio]);
  
  // Set first item as default hero if available and no hero is currently set
  useEffect(() => {
    if (!currentHeroImage && !currentHeroVideo && unifiedMediaItems.length > 0) {
      const firstItem = unifiedMediaItems[0];
      if (firstItem.type === 'video') {
        const videoId = getYouTubeVideoId(firstItem.src);
        setCurrentHeroVideo(videoId);
        // Detect aspect ratio based on video type
        const aspectRatio = isYouTubeShort(firstItem.src) ? 'portrait' : 'landscape';
        setCurrentAspectRatio(aspectRatio);
      } else {
        // Resolve the image source from filename to static import using dynamic resolver
        const dynamicImage = contentType === 'blog' 
          ? getBlogImageByFilename(project.id, firstItem.src)
          : getProjectImageByFilename(project.id, firstItem.src);
        let resolvedImageSrc = '';
        let aspectRatio: 'portrait' | 'landscape' | 'square' = 'landscape';
        
        if (dynamicImage) {
          resolvedImageSrc = typeof dynamicImage === 'object' ? dynamicImage.src : dynamicImage;
          // Calculate aspect ratio from static import metadata
          aspectRatio = getImageAspectRatio(dynamicImage);
        } else {
          // If not found in static imports, check if it's a remote URL
          if (firstItem.src.includes('http')) {
            resolvedImageSrc = firstItem.src;
            // Remote images default to landscape
            aspectRatio = 'landscape';
          } else {
            // Final fallback to placeholder
            resolvedImageSrc = getPlaceholderImage('hero');
            // Placeholders are landscape by default
            aspectRatio = 'landscape';
          }
        }
        setCurrentHeroImage(resolvedImageSrc);
        setCurrentAspectRatio(aspectRatio);
      }
    }
  }, [unifiedMediaItems, currentHeroImage, currentHeroVideo, staticImages, getPlaceholderImage, getImageAspectRatio, project.id, contentType]);
  
  // Effect for handling scroll arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Update arrows on mount and when media items change
    updateScrollArrows();

    // Add event listeners for scroll and resize
    const handleScroll = () => updateScrollArrows();
    const handleResize = () => updateScrollArrows();

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup event listeners
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollArrows, unifiedMediaItems, staticImages]);
  
  // Helper function to get static image or fallback
  const getImageSrc = (type: 'hero' | 'demo' | 'screenshots', index?: number) => {
    if (type === 'hero') {
      return staticImages.hero || getPlaceholderImage('hero');
    }
    if (type === 'demo') {
      return staticImages.demo || getPlaceholderImage('demo');
    }
    if (type === 'screenshots' && typeof index === 'number') {
      return staticImages.screenshots[index] || getPlaceholderImage('screenshot', index);
    }
    return getPlaceholderImage('hero');
  };

  // Render media gallery section - extracted for better JSX parsing
  const renderMediaGallery = () => {
    // Only show media gallery if we have actual media items to display in the scrollable thumbnails
    const hasMediaItems = unifiedMediaItems.length > 0;
    const hasStaticScreenshots = staticImages.screenshots && staticImages.screenshots.length > 0;
    const shouldShowGallery = hasMediaItems || hasStaticScreenshots;

    if (!shouldShowGallery) {
      return null;
    }

    return (
      <section className={styles.mediaSection}>
        <div className={styles.mediaContainer}>
          {showLeftArrow && (
            <button
              className={`scroll-arrow-left ${styles.scrollArrow} ${styles.scrollArrowLeft}`}
              onClick={scrollLeft}
            >
              <ChevronLeft size={22} />
            </button>
          )}
          
          {showRightArrow && (
            <button
              className={`scroll-arrow-right ${styles.scrollArrow} ${styles.scrollArrowRight}`}
              onClick={scrollRight}
            >
              <ChevronRight size={20} />
            </button>
          )}            
          <div 
            ref={scrollContainerRef}
            className={styles.mediaScrollContainer}
          >
            
            {/* Render unified media items if they exist */}
            {unifiedMediaItems.map((item, index) => {
              if (item.type === 'video') {
                const videoId = getYouTubeVideoId(item.src);
                if (!videoId) return null;
                
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                
                return (
                  <div key={`video-${index}`} 
                    className={styles.mediaItem}
                    data-type="video"
                    onClick={() => {
                      setCurrentHeroVideo(videoId);
                      setCurrentHeroImage(null);
                      // Detect aspect ratio based on video type
                      const aspectRatio = isYouTubeShort(item.src) ? 'portrait' : 'landscape';
                      setCurrentAspectRatio(aspectRatio);
                    }}
                  >
                    <div className={styles.videoThumbnailContainer}>
                      <Image
                        src={thumbnailUrl}
                        alt={item.title || `Video ${index + 1}`}
                        width={350}
                        height={200}
                        className={styles.videoThumbnail}
                      />
                      <div className={styles.playButtonOverlay}>
                        <Play size={40} className={styles.playIcon} />
                      </div>
                    </div>
                    <div className={styles.mediaItemTitle}>
                      {item.title || `Demo Video ${index + 1}`}
                    </div>
                  </div>
                );
              } else {
                // Handle Image Items - Dynamic mapping from JSON filename to static import
                let resolvedImageSrc = '';
                
                // Try to resolve using the dynamic filename resolver
                const dynamicImage = contentType === 'blog' 
                  ? getBlogImageByFilename(project.id, item.src)
                  : getProjectImageByFilename(project.id, item.src);
                if (dynamicImage) {
                  resolvedImageSrc = typeof dynamicImage === 'object' ? dynamicImage.src : dynamicImage;
                } else {
                  // If not found in static imports, check if it's a remote URL
                  if (item.src.includes('http')) {
                    resolvedImageSrc = item.src;
                  } else {
                    // Fallback to placeholder if static import not found
                    console.warn(`Image ${item.src} not found in static imports for project ${project.id}`);
                    resolvedImageSrc = getPlaceholderImage('screenshot');
                  }
                }
                
                return (
                  <div key={`image-${index}`} 
                    className={styles.mediaItem}
                    data-type="image"
                    onClick={() => {
                      console.log('Image clicked, setting hero to:', resolvedImageSrc);
                      setCurrentHeroImage(resolvedImageSrc);
                      setCurrentHeroVideo(null);
                      // Calculate and set aspect ratio for the clicked image
                      const clickedImage = contentType === 'blog' 
                        ? getBlogImageByFilename(project.id, item.src)
                        : getProjectImageByFilename(project.id, item.src);
                      const aspectRatio = getImageAspectRatio(clickedImage || resolvedImageSrc);
                      setCurrentAspectRatio(aspectRatio);
                    }}
                  >
                    <Image
                      src={resolvedImageSrc}
                      alt={item.title || `Project Image ${index + 1}`}
                      width={350}
                      height={200}
                      className={styles.mediaItemImage}
                    />
                    <div className={styles.mediaItemTitle}>
                      {item.title || 'Project Image'}
                    </div>
                  </div>
                );
              }
            })}
            
            {/* Fallback: If no unified media items, show static images */}
            {unifiedMediaItems.length === 0 && staticImages.screenshots && staticImages.screenshots.map((screenshot, index) => {
              const imageSrc = typeof screenshot === 'string' ? screenshot : screenshot.src;
              return (
                <div key={`static-image-${index}`} 
                  className={styles.mediaItem}
                  data-type="image"
                  onClick={() => {
                    setCurrentHeroImage(imageSrc);
                    setCurrentHeroVideo(null);
                    // Calculate and set aspect ratio for the clicked screenshot
                    const aspectRatio = getImageAspectRatio(screenshot);
                    setCurrentAspectRatio(aspectRatio);
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt={`Project Screenshot ${index + 1}`}
                    width={350}
                    height={200}
                    className={styles.mediaItemImage}
                  />
                  <div className={styles.mediaItemTitle}>
                    Screenshot {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="relative">
      <AtmosphericBackground variant="subtle" includeBackground={true} />
      
      <Header />

      {/* Subtle Background Panel */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        background: 'var(--glass-gradient-linear)',
        backdropFilter: 'var(--glass-backdrop-light)',
        borderRadius: '8px',
        border: '1px solid var(--glass-border-subtle)',
        opacity: '0.2',
        zIndex: 0
      }} 
      className='float-panel'
      />

      <section className={styles.heroSection}>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.projectCategory}>
              <Tag 
                size={16} 
                className={styles.categoryIcon}
              />
              <span className={styles.categoryText}>
                {project.category}
              </span>
            </div>
            
            <h1 className={styles.heroTitle}>
              {project.title}
            </h1>
            
            <p className={styles.heroDescription}>
              {project.description}
            </p>
            
            {/* Tech Stack Tags - Moved from Meta Info to Hero */}
            <div className={styles.heroTechStackContainer}>
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className={styles.heroTechStackPill}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Media Container - Dynamic Aspect Ratio Responsive */}
          <div className={styles.heroMediaContainer}>
            <div className={`${styles.heroMediaAspectRatio} ${styles[currentAspectRatio]}`}>
              <div className={styles.heroMediaContent}>
                {/* Absolute positioned content container */}
            <div className={styles.heroAbsoluteContainer}>
              {/* Slow Moving Hero Media - Image or Video */}
              <div className={currentHeroVideo ? styles.heroMediaStatic : styles.heroMediaAnimated}>
              {currentHeroVideo ? (
                <div className={styles.heroVideoContainer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${currentHeroVideo}?controls=1&modestbranding=1&fs=1&rel=0&playsinline=1`}
                    title="Project Demo Video"
                    className={styles.heroVideo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                  />
                  
                  {/* 
                    AUTOPLAY CONFIGURATION:
                    - Default: autoplay=0 (disabled) for better UX
                    - To enable: add &autoplay=1 to src URL
                    - Note: Browsers restrict autoplay with sound
                    
                    CONTROLS CONFIGURATION:
                    - controls=1: Shows YouTube player controls
                    - disablekb=0: Enables keyboard controls  
                    - showinfo=1: Shows video title and uploader
                    - fs=1: Enables fullscreen button
                  */}

                </div>
              ) : (
                <div className={styles.heroImageContainer}>
                  {/* Background div with Next.js image URL */}
                  <div 
                    className={styles.heroImageBackground}
                    style={{
                      backgroundImage: `url(${(() => {
                        const imageSrc = currentHeroImage || getImageSrc('hero');
                        return typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
                      })()})`
                    }}
                  />
                  {/* Hidden Next.js Image for optimization and preloading */}
                  <Image
                    src={(() => {
                      const imageSrc = currentHeroImage || getImageSrc('hero');
                      return typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
                    })()}
                    alt={`${project.title} hero image`}
                    fill
                    sizes="100vw"
                    className={styles.heroImage}
                    quality={90}
                    priority
                  />
                </div>
              )}
            </div>
            
            {/* Subtle Overlay for Better Text Contrast - Only for Images */}
            {!currentHeroVideo && (
              <div className={styles.heroOverlay} />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

      </section>

      {renderMediaGallery()}

      <section className={styles.mainContentSection}>

        <div className={styles.mainContentContainer}>

          {/* Comprehensive Project Case Study */}
          <article className={styles.mainContentArticle}>
            
            {/* Content */}
            <div className={styles.mainContentContainer}>
              {/* Only show content title if contentTitle is specified */}
              {project.contentTitle && project.contentTitle.trim() && (
                <h2 id="top-links" className={styles.mainContentTitle}>
                  {project.contentTitle}
                </h2>
              )}

              {/* Project Meta Information - Only show if we have meaningful data */}
              {((project.publishDate) || 
                (project.status && project.status.trim() && project.status.toLowerCase() !== 'unknown') || 
                project.featured || 
                project.links.demo || 
                project.links.live || 
                project.links.github) && (
                <div className={styles.projectMetaInfo}>
                  {/* Subtle accent overlay for meta section */}
                  <div className={styles.metaAccentOverlay} />
                  {/* Top Row - Main Info and Buttons (Mobile Responsive) */}
                  <div className={styles.metaInfoTopRow}>
                    {/* Project Info Row */}
                    <div className={styles.projectInfoRow}>
                      {project.publishDate && (
                        <div className={styles.metaInfoItem}>
                          <Calendar size={16} className={styles.metaIcon} />
                          <span className={styles.metaText}>
                            {new Date(project.publishDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })}
                          </span>
                        </div>
                      )}
                      
                      {project.status && project.status.trim() && project.status.toLowerCase() !== 'unknown' && (
                        <div className={styles.metaInfoItem}>
                          <span className={`${styles.statusBadge} ${
                            project.status === 'Production Ready' || project.status === 'Production' ? styles.production :
                            project.status === 'In Development' ? styles.development : styles.default
                          }`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                      )}
                      
                      {project.featured && (
                        <div className={styles.featuredBadge}>
                          FEATURED
                        </div>
                      )}
                    </div>
                    
                    {/* Buttons Row - Stack on mobile (480px and below) */}
                    <div className={styles.projectButtonsContainer}>
                      {project.links.demo && (
                        <Link href={project.links.demo} target="_blank" 
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            variant="primary"
                            size="small"
                          >
                            Demo
                          </Button>
                        </Link>
                      )}
                      
                      {project.links.live && (
                        <Link href={project.links.live} target="_blank" 
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            variant="primary"
                            size="small"
                          >
                            Live
                          </Button>
                        </Link>
                      )}
                      
                      {project.links.github && (
                        <Link href={project.links.github} target="_blank" 
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            variant="secondary"
                            size="small"
                            icon="github"
                          >
                            Code
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Long-form Case Study Content */}
              <div className={styles.caseStudyContent}>
                {project.content?.overviewHtml ? (
                  <EnhancedHTMLContent 
                    content={project.content.overviewHtml} 
                    projectId={project.id} 
                    contentType={contentType}
                  />
                ) : project.content?.overview ? (
                  <MarkdownContent 
                    content={project.content.overview} 
                    projectId={project.id} 
                  />
                ) : (
                  <div className={styles.defaultContent}>
                    <p className={styles.contentParagraph}>
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Key Achievements & Impact - Only show if achievements exist */}
          {project.content?.keyAchievements && project.content.keyAchievements.length > 0 && (
            <article className={styles.keyAchievementsSection}>
              {/* Dynamic Accent Background - Success Green for Achievements */}
              <div className={styles.achievementAccentBackground} />
              
              <div className={styles.achievementContent}>
                <h2 className={styles.achievementTitle}>
                  {project.achievementTitle || 'Key Achievements & Impact'}
                </h2>

                {/* Dynamic Achievement Cards from JSON */}
                <div className={styles.achievementCardsContainer}>
                  
                  {project.content.keyAchievements.map((achievement, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.achievementCard} ${
                          achievement.type === 'performance' ? styles.achievementCardPerformance :
                          achievement.type === 'technical' ? styles.achievementCardTechnical :
                          styles.achievementCardImpact
                        }`}
                      >
                        <div className={styles.achievementCardHeader}>
                          <div className={styles.achievementIconContainer}>
                            <div className={styles.achievementIcon}>
                              {achievement.icon}
                            </div>
                            <div className={
                              achievement.type === 'performance' ? styles.achievementIconDotPerformance :
                              achievement.type === 'technical' ? styles.achievementIconDotTechnical :
                              styles.achievementIconDotImpact
                            } />
                          </div>
                          <h3 className={styles.achievementCardTitle}>
                            {achievement.title}
                          </h3>
                        </div>
                        <p className={styles.achievementDescription}>
                          {achievement.description}
                        </p>
                        {achievement.metrics && achievement.metrics.length > 0 && (
                          <ul className={styles.achievementMetrics}>
                            {achievement.metrics.map((metric, metricIndex) => (
                              <li key={metricIndex} className={styles.achievementMetric}>
                                <span className={
                                  achievement.type === 'performance' ? styles.achievementMetricBulletPerformance :
                                  achievement.type === 'technical' ? styles.achievementMetricBulletTechnical :
                                  styles.achievementMetricBulletImpact
                                }>
                                  •
                                </span>
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>
            </article>
          )}

        </div>
      </section>

      {/* Back to Projects/Blog - Bottom Navigation */}
      <section className={styles.backToProjectsSection}>
        <div className={styles.backToProjectsContainer}>
          <Link href={contentType === 'blog' ? '/blog' : '/projects'} style={{ textDecoration: 'none' }}>
            <Button
              variant="secondary"
              size="medium"
              icon="arrow-left"
              style={{
                margin: '0 auto',
              }}
            >
              {contentType === 'blog' ? 'Back to Blog' : 'Back to Projects'}
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
