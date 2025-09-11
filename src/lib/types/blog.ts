// Blog data types - extends project system for consistency

import { ProjectData } from './project';

// Blog-specific data structure (extends project foundation)
export interface BlogData extends Omit<ProjectData, 'technologies' | 'links'> {
  // Blog-specific fields
  tags: string[];           // Replaces technologies for blogs
  readTime: string;         // "5 min read"
  publishDate: string;      // "2024-08-25"
  author?: string;          // Optional author field
  excerpt?: string;         // Short excerpt for listings
  contentTitle?: string;    // Optional content-specific title (inherited from ProjectData)
  achievementTitle?: string;// Optional achievement section title (inherited from ProjectData)
  
  // Blog-specific links
  links: {
    canonical?: string;     // Canonical URL
    external?: string;      // External reference
    demo?: string;          // Live example if applicable
  };
}

// Re-export project types for shared usage
export type { ProjectData, KeyAchievement } from './project';
