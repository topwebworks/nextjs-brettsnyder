// Projects Index Page using JSX Content Templates
// This replaces the old API-based approach with direct JSX content templates

import React from 'react';
import { Github, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import { emailLinks } from '@/lib/config';
import { getAllProjects } from '@/lib/projectLoader';
import type { ProjectData } from '@/lib/types/project';
import { getProjectImages } from '@/lib/generated/projectImageImports';
import Image from 'next/image';
import { Metadata } from 'next';
import ProjectScripts from '@/components/ProjectScripts';
import '@/styles/pagination.css';
import styles from './ProjectsPage.module.css';

// Page metadata
export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my latest projects and development work across web development, design, and technology.',
  openGraph: {
    title: 'Projects',
    description: 'Explore my latest projects and development work across web development, design, and technology.',
    type: 'website',
  },
};

// Enable static generation with revalidation
// Static regeneration - cache for 1 hour, matches other pages
export const revalidate = 3600; // 1 hour (matches blog page and HTTP headers)

export default async function ProjectsPage() {
  // Load all project data using auto-discovery
  const allProjects = await getAllProjects();
  
  // Get unique categories (removed 'All' button)
  const categories = Array.from(new Set(allProjects.map((project: ProjectData) => project.category)));
  const technologies = ['All', ...Array.from(new Set(allProjects.flatMap((project: ProjectData) => project.technologies || [])))];

  // Helper function to get first available image for a project
  const getFirstImage = (projectId: string, projectData: ProjectData) => {
    const images = getProjectImages(projectId);
    
    // Try static images first - ensure we return the StaticImageData object properly
    if (images.hero) {
      return images.hero;
    }
    
    if (images.screenshots && images.screenshots.length > 0) {
      return images.screenshots[0];
    }
    
    // Fallback to remote images from project data (as URL strings)
    const remoteHero = projectData.images?.hero;
    const remoteScreenshot = projectData.images?.screenshots?.[0];
    
    if (remoteHero) {
      return remoteHero;
    }
    
    if (remoteScreenshot) {
      return remoteScreenshot;
    }
    
    return null;
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {/* Atmospheric Background */}
        <AtmosphericBackground variant="subtle" orbCount={3} includeBackground={true} />
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Hero Section */}
          <section className={styles.heroSection}>

            {/* Subtle Background Glass Panel */}
            <div className={`${styles.floatPanel} float-panel`} />

            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Featured Work &amp; Projects
              </h1>
              <p className={styles.heroSubtitle}>
                A collection of projects showcasing modern web development, 
                creative problem-solving, and technical implementation across various&nbsp;domains.
              </p>

              {/* Project Stats */}
              <div className={`${styles.projectListStats} project-list-stats`}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {allProjects.length}
                  </div>
                  <div className={styles.statLabel}>
                    Projects
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {categories.length}
                  </div>
                  <div className={styles.statLabel}>
                    Categories
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {technologies.length - 1}
                  </div>
                  <div className={styles.statLabel}>
                    Technologies
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section className={styles.projectsGridSection}>
            <div className={styles.projectsGridContainer}>
              {/* Category Filter Buttons */}
              <div className={styles.categoryFilterContainer}>
                <div className={`category-filters-container ${styles.categoryFiltersContainer}`}>
                  <div className={`category-buttons-row ${styles.categoryButtonsRow}`}>
                    {categories.map((category, index) => (
                      <button
                        key={`category-${index}`}
                        className={`category-filter-btn ${styles.categoryFilterBtn}`}
                        data-filter={category}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Flexbox Container */}
              <div className={styles.projectsFlexContainer}>
                {allProjects.map((project: ProjectData, index: number) => (
                  <article
                    key={`project-${project?.id || index}`}
                    className={`project-card pagination-item ${styles.projectCard} ${styles.paginationItem} ${index >= 2 ? styles.hidden : ''}`}
                    data-category={project?.category || 'General'}
                    data-featured={project?.featured ? 'true' : 'false'}
                    data-index={index}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >

                    <div className={styles.projectCardContent}>

                   <div>

                      {/* Project Header Row - Category and Date */}
                      <div className={styles.projectHeaderRow}>
                        <div className={styles.projectCategoryBadge}>
                          {project?.category || 'General'}
                        </div>

                        <div className={styles.projectDateInfo}>
                          <Calendar size={14} />
                          {project?.publishDate 
                            ? new Date(project.publishDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short' 
                              })
                            : 'No Date'
                          }
                        </div>
                      </div>

                      {/* Image and Content Container */}
                      {(() => {
                        const firstImage = getFirstImage(project?.id || '', project);
                        
                        // Debug logging for production troubleshooting
                        if (process.env.NODE_ENV === 'development') {
                          console.log(`Project ${project?.id}: firstImage:`, firstImage);
                        }
                        
                        if (firstImage) {
                          // With image: stacked layout
                          return (
                            <div className={`project-image-container ${styles.projectImageContainer}`}>
                              <div 
                                className={`project-card-image ${styles.projectCardImage}`}
                              >
                                {/* Always use Next.js Image component - pass StaticImageData object directly */}
                                <Image
                                  src={firstImage}
                                  alt={`${project?.title || 'Project'} preview`}
                                  width={672}
                                  height={400}
                                  sizes="(max-width: 768px) 100vw, 550px"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: '100%',
                                    height: 'auto'
                                  }}
                                  quality={85}
                                  loading="lazy"
                                  placeholder={typeof firstImage === 'object' && firstImage.blurDataURL ? "blur" : "empty"}
                                />
                              </div>

                              <div className={`project-content-with-image ${styles.projectContentWithImage}`}>
                                {/* Project Title */}
                                <h3 className={styles.projectTitle}>
                                  {project?.title || 'Untitled Project'}
                                </h3>


                                {/* Project Description */}
                                <p className={styles.projectDescription}>
                                  {project?.description || 'No description available.'}
                                </p>

                                {/* Technology Tags */}
                                <div className={styles.techTagsContainer}>
                                  {(project.technologies || []).slice(0, 5).map((tech: string, techIndex: number) => (
                                    <span 
                                      key={`${project?.id || 'unknown'}-tech-${techIndex}`}
                                      className={`tech-tag ${styles.techTag}`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {(project.technologies || []).length > 5 && (
                                    <span className={styles.techTagMoreCount}>
                                      +{(project.technologies || []).length - 5}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          // Without image: normal stacked layout
                          return (
                            <>
                              {/* Project Title */}
                              <h3 className={styles.projectTitle}>
                                {project?.title || 'Untitled Project'}
                              </h3>

                              {/* Project Description */}
                              <p className={`${styles.projectDescription} ${styles.projectDescriptionNoImage}`}>
                                {project?.description || 'No description available.'}
                              </p>

                              {/* Technology Tags */}
                              <div className={`${styles.techTagsContainer} ${styles.techTagsContainerNoImage}`}>
                                {(project.technologies || []).slice(0, 5).map((tech: string, techIndex: number) => (
                                  <span 
                                    key={`${project?.id || 'unknown'}-tech-${techIndex}`}
                                    className={`tech-tag ${styles.techTag} ${styles.techTagAlt}`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {(project.technologies || []).length > 5 && (
                                  <span className={styles.techTagMoreCount}>
                                    +{(project.technologies || []).length - 5}
                                  </span>
                                )}
                              </div>
                            </>
                          );
                        }
                      })()}

                   </div>


                      {/* Project Actions */}
                      <div className={`${styles.projectActions} project-actions`}>
                        <div className={styles.projectActionsLeft}>
                          {/* Show only 2 links max - Priority: demo > live > github */}
                          {project.links?.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectLiveLink}
                            >
                              Demo
                            </a>
                          )}
                          {!project.links?.demo && project.links?.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectLiveLink}
                            >
                              Live
                            </a>
                          )}
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectGithubLink}
                            >
                              <Github size={16} />
                              Code
                            </a>
                          )}
                        </div>

                        <a
                          href={`/projects/${project?.id || 'unknown'}`}
                          className={`view-details-btn ${styles.viewDetailsBtn}`}
                        >
                          <Button
                            variant="secondary"
                            size="medium"
                            icon="arrow-right"
                          >
                            View Details
                          </Button>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Show More Button */}
              <div id="show-more-projects" className={`${styles.showMoreProjects} ${styles.showMoreProjectsVisible}`}>
                <Button
                  variant="secondary"
                  size="medium"
                  icon="chevron-down"
                >
                  Show More
                </Button>
              </div>

              {/* Contact CTA */}
              <div className={styles.contactCta}>
                <div className={styles.contactCtaContent}>
                  <h2 className={styles.contactCtaTitle}>
                    Love Building Things?
                  </h2>
                  <p className={styles.contactCtaSubtitle}>
                    I enjoy creating projects like these in my spare time. 
                    Always happy to share experiences and discuss development&nbsp;ideas.
                  </p>

                  {/* Two Button CTA matching homepage */}
                  <div className={styles.contactCtaActions}>
                    {/* Primary Button */}
                    <a 
                      href={emailLinks.project()}
                      className={styles.contactCtaLink}
                    >
                      <Button
                        variant="primary"
                        size="medium"
                        icon="user"
                      >
                        Say Hello
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Client-side scripts for category filtering and pagination */}
        <ProjectScripts />

      </div>
    </>
  );
}
