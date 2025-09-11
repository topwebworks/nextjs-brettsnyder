'use client';

import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Calendar, ArrowRight } from 'lucide-react';
import type { ProjectData } from '@/lib/types/project';
import styles from './ProjectFilter.module.css';

interface ProjectFilterProps {
  projects: ProjectData[];
  categories: string[];
}

export default function ProjectFilter({ projects, categories }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <>
      {/* Category Filter */}
      <div className={styles.filterContainer}>
        <div className={styles.categoryFilter}>
          {categories.map((category, index) => (
            <button
              key={`category-${index}`}
              className={`${styles.categoryFilterItem} ${category === selectedCategory ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {/* Subtle background accent */}
              <div className={`${styles.categoryAccent} ${category === selectedCategory ? styles.active : ''}`} />
              <span className={styles.categoryText}>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Flexbox */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project: ProjectData, index: number) => (
          <article
            key={`project-${project?.id || index}`}
            className={styles.projectCard}
          >
            {/* Hover Overlay with Orange Accent for Project Cards */}
            <div className={styles.projectHoverOverlay} />

            {/* Dynamic Accent Background Overlay */}
            <div className={styles.projectAccentBg} />

            <div className={styles.projectContent}>
              {/* Enhanced Project Header */}
              <div className={styles.projectHeader}>
                <div className={styles.projectTitleContainer}>
                  <h3 className={styles.projectTitle}>
                    {project?.title || 'Untitled Project'}
                  </h3>
                </div>

                {/* Enhanced Date Badge */}
                <div className={styles.dateBadge}>
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

              {/* Project Description */}
              <p className={styles.projectDescription}>
                {project?.description || 'No description available.'}
              </p>

              {/* Enhanced Technology Tags */}
              <div className={styles.techTags}>
                {(project.technologies || []).slice(0, 5).map((tech: string, techIndex: number) => (
                  <span 
                    key={`${project?.id || 'unknown'}-tech-${techIndex}`}
                    className={styles.techTag}
                  >
                    {tech}
                  </span>
                ))}
                {(project.technologies || []).length > 5 && (
                  <span className={styles.techTagExtra}>
                    +{(project.technologies || []).length - 5}
                  </span>
                )}
              </div>

              {/* Enhanced Project Actions */}
              <div className={styles.projectActions}>
                <div className={styles.projectLinks}>
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} ${styles.projectLinkLive}`}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} ${styles.projectLinkGithub}`}
                    >
                      <Github size={16} />
                      Source
                    </a>
                  )}
                </div>

                {/* Primary Hero Button Style - View Details */}
                <a
                  href={`/projects/${project?.id || 'unknown'}`}
                  className={styles.viewDetailsBtn}
                >
                  View Details
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
