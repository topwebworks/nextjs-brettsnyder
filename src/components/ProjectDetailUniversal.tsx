

'use client';

import { useState, useRef, useEffect, useCallback, ViewTransition, type KeyboardEvent, type MouseEvent } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ProjectData } from '@/lib/types/project';
import { Tag, Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import MarkdownContent from '@/components/ui/MarkdownContent';
import EnhancedHTMLContent from '@/components/ui/EnhancedHTMLContent';
import { getProjectImages, getProjectImageByFilename, projectImagesByFilename } from '@/lib/generated/projectImageImports';
import { getBlogImages, getBlogImageByFilename, blogImagesByFilename } from '@/lib/generated/blogImageImports';
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

// Turn a filename like "course-manager.png" into a readable title like "Course Manager"
function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Look up a static image's real filename (by reference) so gallery thumbnails
// can show its actual name instead of a generic "Screenshot N" fallback.
function getScreenshotTitle(
  filenameMap: Record<string, StaticImageData> | undefined,
  image: StaticImageData,
  index: number
): string {
  if (filenameMap) {
    const match = Object.entries(filenameMap).find(([, img]) => img === image);
    if (match) return titleFromFilename(match[0]);
  }
  return `Screenshot ${index + 1}`;
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
  const [currentHeroImage, setCurrentHeroImage] = useState<string | StaticImageData | null>(null);
  const [loadedHeroImage, setLoadedHeroImage] = useState<string | null>(null);
  const [currentHeroVideo, setCurrentHeroVideo] = useState<string | null>(null);
  const [currentVideoAspectRatio, setCurrentVideoAspectRatio] = useState<'portrait' | 'landscape'>('landscape');
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

  // Safari and macOS Firefox don't focus buttons on click, so arrow keys would have no starting thumbnail
  const focusClickedThumbnail = (e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).closest('button')?.focus({ preventScroll: true });
  };

  // Arrow keys move to the previous/next thumbnail and load it into the hero, same as a click
  const handleGalleryKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const current = (e.target as HTMLElement).closest('button');
    const next = e.key === 'ArrowRight' ? current?.nextElementSibling : current?.previousElementSibling;
    if (next instanceof HTMLButtonElement) {
      e.preventDefault();
      // focus() alone won't scroll a partly visible thumbnail into view. inline 'start' matches the strip's
      // scroll-snap-align, so mandatory snapping can't pull a partly scrolled thumbnail back out of view.
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: 'nearest', inline: 'start' });
      next.click();
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
  const staticImagesByFilename = contentType === 'blog' ? blogImagesByFilename[project.id] : projectImagesByFilename[project.id];

  // Generate placeholder images for consistent UI
  const getPlaceholderImage = useCallback((type: 'hero' | 'demo' | 'screenshot', index?: number) => {
    const seed = project.id + type + (index || 0);
    return `https://picsum.photos/seed/${seed}/800/600`;
  }, [project.id]);
  
  // Set first item as default hero if available and no hero is currently set
  useEffect(() => {
    if (!currentHeroImage && !currentHeroVideo && unifiedMediaItems.length > 0) {
      const firstItem = unifiedMediaItems[0];
      if (firstItem.type === 'video') {
        const videoId = getYouTubeVideoId(firstItem.src);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time default; user gallery clicks own this state afterwards
        setCurrentHeroVideo(videoId);
        // Detect aspect ratio based on video type
        const aspectRatio = isYouTubeShort(firstItem.src) ? 'portrait' : 'landscape';
        setCurrentVideoAspectRatio(aspectRatio);
      } else {
        // Resolve the image source from filename to static import using dynamic resolver
        const dynamicImage = contentType === 'blog' 
          ? getBlogImageByFilename(project.id, firstItem.src)
          : getProjectImageByFilename(project.id, firstItem.src);
        let resolvedImageSrc: string | StaticImageData;
        
        if (dynamicImage) {
          resolvedImageSrc = dynamicImage;
        } else {
          // If not found in static imports, check if it's a remote URL
          if (firstItem.src.includes('http')) {
            resolvedImageSrc = firstItem.src;
          } else {
            // Final fallback to placeholder
            resolvedImageSrc = getPlaceholderImage('hero');
          }
        }
        setCurrentHeroImage(resolvedImageSrc);
      }
    }
  }, [unifiedMediaItems, currentHeroImage, currentHeroVideo, getPlaceholderImage, project.id, contentType]);
  
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

  const heroImageSrc = currentHeroImage || getImageSrc('hero');
  const heroImageKey = typeof heroImageSrc === 'string' ? heroImageSrc : heroImageSrc.src;

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
              type="button"
              aria-label="Scroll gallery left"
              className={`scroll-arrow-left ${styles.scrollArrow} ${styles.scrollArrowLeft}`}
              onClick={scrollLeft}
            >
              <ChevronLeft size={22} />
            </button>
          )}
          
          {showRightArrow && (
            <button
              type="button"
              aria-label="Scroll gallery right"
              className={`scroll-arrow-right ${styles.scrollArrow} ${styles.scrollArrowRight}`}
              onClick={scrollRight}
            >
              <ChevronRight size={20} />
            </button>
          )}            
          <div 
            ref={scrollContainerRef}
            className={styles.mediaScrollContainer}
            onClick={focusClickedThumbnail}
            onKeyDown={handleGalleryKeyDown}
          >
            
            {/* Render unified media items if they exist */}
            {unifiedMediaItems.map((item, index) => {
              if (item.type === 'video') {
                const videoId = getYouTubeVideoId(item.src);
                if (!videoId) return null;
                
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                
                return (
                  <button key={`video-${index}`}
                    type="button"
                    className={styles.mediaItem}
                    data-type="video"
                    aria-pressed={currentHeroVideo === videoId}
                    onClick={() => {
                      setCurrentHeroVideo(videoId);
                      setCurrentHeroImage(null);
                      // Detect aspect ratio based on video type
                      const aspectRatio = isYouTubeShort(item.src) ? 'portrait' : 'landscape';
                      setCurrentVideoAspectRatio(aspectRatio);
                    }}
                  >
                    <span className={styles.videoThumbnailContainer}>
                      <Image
                        src={thumbnailUrl}
                        alt=""
                        width={350}
                        height={200}
                        className={styles.videoThumbnail}
                      />
                      <span className={styles.playButtonOverlay}>
                        <Play size={40} className={styles.playIcon} aria-hidden="true" />
                      </span>
                    </span>
                    <span className={styles.mediaItemTitle}>
                      {item.title || `Demo Video ${index + 1}`}
                    </span>
                  </button>
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
                    resolvedImageSrc = getPlaceholderImage('screenshot');
                  }
                }
                
                return (
                  <button key={`image-${index}`}
                    type="button"
                    className={styles.mediaItem}
                    data-type="image"
                    aria-pressed={!currentHeroVideo && heroImageKey === resolvedImageSrc}
                    onClick={() => {
                      setCurrentHeroImage(dynamicImage || resolvedImageSrc);
                      setCurrentHeroVideo(null);
                    }}
                  >
                    <Image
                      src={resolvedImageSrc}
                      alt=""
                      width={350}
                      height={200}
                      className={styles.mediaItemImage}
                    />
                    <span className={styles.mediaItemTitle}>
                      {item.title || 'Project Image'}
                    </span>
                  </button>
                );
              }
            })}
            
            {/* Fallback: If no unified media items, show static images */}
            {unifiedMediaItems.length === 0 && staticImages.screenshots && staticImages.screenshots.map((screenshot, index) => {
              const imageSrc = typeof screenshot === 'string' ? screenshot : screenshot.src;
              const title = getScreenshotTitle(staticImagesByFilename, screenshot, index);
              return (
                <button key={`static-image-${index}`}
                  type="button"
                  className={styles.mediaItem}
                  data-type="image"
                  aria-pressed={!currentHeroVideo && heroImageKey === imageSrc}
                  onClick={() => {
                    setCurrentHeroImage(screenshot);
                    setCurrentHeroVideo(null);
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    width={350}
                    height={200}
                    className={styles.mediaItemImage}
                  />
                  <span className={styles.mediaItemTitle}>
                    {title}
                  </span>
                </button>
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
      <div className={`${styles.floatPanel} float-panel`} />

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

            {project.designSystem && (
              <div className={styles.designSystemBadge}>
                Design System
              </div>
            )}

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

          {/* Images follow their natural proportions; videos keep their responsive frame.
              Stable wrapper (not the keyed image) so the list card morphs in even when the gallery swaps media.
              Morphs only for card clicks (Link transitionTypes 'card-to-hero'). Browser Back stays instant:
              React renders popstate synchronously for scroll restoration and would only sometimes animate it. */}
          <ViewTransition name={`${contentType}-${project.id}`} default="none" share={{ 'card-to-hero': 'auto', default: 'none' }}>
            <div className={styles.heroMediaContainer}>
              {currentHeroVideo ? (
                <div className={`${styles.heroMediaAspectRatio} ${styles[currentVideoAspectRatio]}`}>
                  <div className={styles.heroMediaContent}>
                    <div className={styles.heroVideoContainer}>
                      <iframe
                        src={`https://www.youtube.com/embed/${currentHeroVideo}?controls=1&modestbranding=1&fs=1&rel=0&playsinline=1`}
                        title="Project Demo Video"
                        className={styles.heroVideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        frameBorder="0"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.heroImageContainer}>
                  <Image
                    key={heroImageKey}
                    src={heroImageSrc}
                    alt={`${project.title} hero image`}
                    width={typeof heroImageSrc === 'string' ? 800 : heroImageSrc.width}
                    height={typeof heroImageSrc === 'string' ? 600 : heroImageSrc.height}
                    sizes="(max-width: 1276px) 94vw, 1200px"
                    className={`${styles.heroImage} ${loadedHeroImage === heroImageKey ? styles.heroImageLoaded : ''}`}
                    // First load stores '' (no fade) so the card morph lands on an opaque hero; gallery swaps still fade in
                    onLoad={() => setLoadedHeroImage((prev) => (prev === null ? '' : heroImageKey))}
                    quality={90}
                    priority
                  />
                  <div className={styles.heroOverlay} />
                </div>
              )}
            </div>
          </ViewTransition>
        </div>

      </section>

      {renderMediaGallery()}

      <section className={styles.mainContentSection}>

        <div className={styles.mainContentContainer}>

          {/* Comprehensive Project Case Study */}
          <article className={styles.mainContentArticle}>
            
            {/* Content */}
            <div id="top-links" className={styles.mainContentContainer}>
              {/* Only show content title if contentTitle is specified */}
              {project.contentTitle && project.contentTitle.trim() && (
                <h2 className={styles.mainContentTitle}>
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
                        <Button
                          variant="primary"
                          size="small"
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo
                        </Button>
                      )}
                      
                      {project.links.live && (
                        <Button
                          variant="primary"
                          size="small"
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                        </Button>
                      )}
                      
                      {project.links.github && (
                        <Button
                          variant="secondary"
                          size="small"
                          icon="github"
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code
                        </Button>
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
          <Button
            variant="secondary"
            size="medium"
            icon="arrow-left"
            href={contentType === 'blog' ? '/blog' : '/projects'}
            className={styles.backButton}
          >
            {contentType === 'blog' ? 'Back to Blog' : 'Back to Projects'}
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
