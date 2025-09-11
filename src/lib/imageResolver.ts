// MODERN IMAGE RESOLVER - Uses Static Import System
// This provides a compatibility layer between old API-based system and new static imports
// Migrated from API routes to static imports for Vercel free tier optimization

/* 
  MEDIA SHORTCODE INTEGRATION - FUTURE ENHANCEMENT
  ==============================================
  
  This file will serve as the processing hub for media shortcodes in project content.
  
  PLANNED SHORTCODE PROCESSING:
  
  IMAGE SHORTCUTS:
  - ![Alt Text](image-name.jpg) -> resolveProjectImage(projectSlug, 'image-name.jpg')
  - ![Hero](hero) -> resolveProjectImage(projectSlug, 'hero')
  - ![Screenshot 1](screenshot:0) -> getProjectImages(projectSlug)[0]
  - ![Gallery](gallery) -> openLightboxGallery(getProjectImages(projectSlug))
  
  VIDEO SHORTCUTS:
  - [📺 Demo](https://youtube.com/watch?v=ID) -> <YouTubeEmbed videoId="ID" />
  - [🎥 Tutorial](demo-video.mp4) -> <VideoPlayer src={resolveProjectVideo()} />
  
  INTERACTIVE SHORTCUTS:
  - [🌐 Live Demo](live) -> project.links.live with special link styling
  - [📁 Source Code](github) -> project.links.github with GitHub icon
  - [🔍 View Gallery](gallery) -> openLightboxModal(projectImages)
  
  IMPLEMENTATION ROADMAP:
  1. Content parser: processProjectContent(content: string, project: ProjectData)
  2. Shortcode expander: expandShortcodes(content: string) -> ReactNode[]
  3. Media resolver integration: Link shortcodes to actual media files
  4. Component mapping: Map shortcodes to React components
  
  STATUS: 🔄 PLANNED FOR PHASE 2.4+
  
  EXAMPLE USAGE IN PROJECT.JSON:
  {
    "content": {
      "overview": "This project shows modern development. ![Hero](hero) The platform features ![Mobile View](screenshot:0) optimization. [📺 Watch demo](https://youtube.com/watch?v=example) and [🌐 try it live](live)."
    }
  }
*/

import { getProjectImages } from '@/lib/generated/projectImageImports';
import { type StaticImageData } from 'next/image';

// DEPRECATED: This function is kept for compatibility but now uses static imports
export async function resolveProjectImage(projectId: string, imageName: string): Promise<string> {
  const images = getProjectImages(projectId);
  
  // Map image names to StaticImageData objects
  if (imageName.includes('hero') || imageName === 'continuous-innovation.jpg') {
    return images.hero?.src || '';
  }
  
  // For screenshots, return the first available
  if (images.screenshots.length > 0) {
    return images.screenshots[0].src || '';
  }
  
  // Fallback for missing images
  console.warn(`Image not found: ${projectId}/${imageName}`);
  return '';
}

// MODERN: Direct access to StaticImageData for Next.js Image component
export function getProjectImageSrc(projectId: string, imageType: 'hero' | 'demo' | 'screenshot', index = 0): StaticImageData | null {
  const images = getProjectImages(projectId);
  
  switch (imageType) {
    case 'hero':
      return images.hero;
    case 'demo':
      return images.demo;
    case 'screenshot':
      return images.screenshots[index] || null;
    default:
      return null;
  }
}

// LEGACY COMPATIBILITY: For components still using old string-based paths
export function getProjectImagePath(projectId: string, imageName: string): string {
  const images = getProjectImages(projectId);
  
  // Map legacy string names to new static imports
  if (imageName.includes('hero') || imageName === 'continuous-innovation.jpg') {
    return images.hero?.src || '';
  }
  
  // For screenshots
  const screenshot = images.screenshots[0];
  return screenshot?.src || '';
}
