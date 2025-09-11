'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { getProjectImageByFilename } from '@/lib/generated/projectImageImports';
import { getBlogImageByFilename } from '@/lib/generated/blogImageImports';
// Import all possible project and blog images dynamically
import * as projectImages from '@/lib/generated/projectImageImports';
import * as blogImages from '@/lib/generated/blogImageImports';
import cssStyles from './EnhancedHTMLContent.module.css';

// Note: hljs types are declared in ProjectDetailUniversal.tsx

interface EnhancedHTMLContentProps {
  content: string;
  projectId: string;
  contentType?: 'project' | 'blog';
  className?: string;
}

export default function EnhancedHTMLContent({ 
  content, 
  projectId, 
  contentType = 'project',
  className = '' 
}: EnhancedHTMLContentProps) {
  
  // Trigger Highlight.js after HTML content renders (only if Highlight.js is already loaded)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.hljs) {
      window.hljs.highlightAll();
    }
  }, [content]);

  if (!content) {
    return (
      <div className={`enhanced-html-content ${className}`}>
        <p className="project-content-paragraph">
          No content available.
        </p>
      </div>
    );
  }

  // Process HTML content for Highlight.js compatibility
  const processedContent = content;

  // Parse HTML content and render with React Image components
  const renderContent = () => {
    try {
      // Split content by image tags and process each part
      const parts = parseHTMLWithImages(processedContent, projectId, contentType);
      return parts;
    } catch (error) {
      console.error('Error processing enhanced HTML content:', error);
      return <p>Error rendering content</p>;
    }
  };

  return (
    <div className={`${cssStyles['enhanced-html-content']} ${className}`}>
      {renderContent()}
    </div>
  );
}

// Parse HTML content and render with proper React Image components
function parseHTMLWithImages(htmlContent: string, projectId: string, contentType: 'project' | 'blog' = 'project'): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const imageRegex = /<Image\s+src=\{([^}]+)\}\s+alt="([^"]*)"[\s\S]*?\/>/gi;
  
  let lastIndex = 0;
  let match;
  let partIndex = 0;
  
  while ((match = imageRegex.exec(htmlContent)) !== null) {
    // Add HTML content before the image
    if (match.index > lastIndex) {
      const htmlBeforeImage = htmlContent.slice(lastIndex, match.index);
      if (htmlBeforeImage.trim()) {
        parts.push(
          <div 
            key={`html-${partIndex++}`}
            dangerouslySetInnerHTML={{ __html: htmlBeforeImage }}
          />
        );
      }
    }
    
    // Process the image
    const [, srcVar, alt] = match;
    const imageComponent = createImageComponent(srcVar, alt, projectId, contentType, partIndex++);
    if (imageComponent) {
      parts.push(imageComponent);
    }
    
    lastIndex = imageRegex.lastIndex;
  }
  
  // Add remaining HTML content
  if (lastIndex < htmlContent.length) {
    const remainingHtml = htmlContent.slice(lastIndex);
    if (remainingHtml.trim()) {
      parts.push(
        <div 
          key={`html-${partIndex++}`}
          dangerouslySetInnerHTML={{ __html: remainingHtml }}
        />
      );
    }
  }
  
  return parts;
}

// Create a proper React Image component
function createImageComponent(srcVar: string, alt: string, projectId: string, contentType: 'project' | 'blog', key: number): React.ReactNode | null {
  const imageImports = contentType === 'blog' ? blogImages : projectImages;
  const getImageByFilename = contentType === 'blog' ? getBlogImageByFilename : getProjectImageByFilename;
  
  // First try to get the image directly from the imported images module
  const dynamicImage = imageImports[srcVar as keyof typeof imageImports];
  
  if (dynamicImage && typeof dynamicImage === 'object' && 'src' in dynamicImage) {
    return (
      <div key={key} className="project-image-container">
        <Image
          src={dynamicImage as StaticImageData}
          alt={alt}
          className="project-content-image"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
          placeholder="blur"
          loading="lazy"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        />
      </div>
    );
  }
  
  // Fallback: try extracting filename and using the appropriate getImageByFilename function
  const filename = extractFilenameFromVariable(srcVar, projectId);
  
  if (filename) {
    const fallbackImage = getImageByFilename(projectId, filename);
    
    if (fallbackImage) {
      return (
        <div key={key} className="project-image-container">
          <Image
            src={fallbackImage as StaticImageData}
            alt={alt}
            className="project-content-image"
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
            placeholder="blur"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      );
    }
  }
  
  console.warn('Could not resolve image:', { srcVar, alt, projectId });
  return null;
}

// Helper function to extract filename from variable name
function extractFilenameFromVariable(varName: string, projectId: string): string | null {
  // The build script generates variables in the pattern: {cleanProjectId}{CleanFileName}
  // We need to reverse-engineer the original filename from this pattern
  
  // Strategy: Remove the project prefix and convert the remaining camelCase back to filename
  // This works by matching the pattern used in findStaticImportForImage() in the build script
  
  // Generate dynamic prefix from current projectId by converting to camelCase
  const generatePrefix = (id: string) => id.toLowerCase().replace(/-/g, '');
  const currentProjectPrefix = generatePrefix(projectId);
  
  let remainingPart = varName;
  
  // Try to remove the current project prefix first
  if (varName.toLowerCase().startsWith(currentProjectPrefix.toLowerCase())) {
    remainingPart = varName.slice(currentProjectPrefix.length);
  } else {
    // Fallback: try generic extraction by looking for the first uppercase letter
    const match = varName.match(/^[a-z]+([A-Z].+)$/);
    if (match) {
      remainingPart = match[1];
    }
  }
  
  // If we couldn't extract anything meaningful, return null
  if (!remainingPart || remainingPart === varName) {
    console.warn('Could not extract filename from variable:', varName);
    return null;
  }
  
  // Convert camelCase back to kebab-case filename
  // Examples: Ecom3jpg -> ecom-3.jpg, SomeImageNamejpg -> some-image-name.jpg
  let filename = remainingPart
    .replace(/([a-z])([A-Z])/g, '$1-$2')  // Add dashes before capitals
    .toLowerCase();
  
  // Handle file extensions
  if (filename.endsWith('jpg') && !filename.endsWith('.jpg')) {
    filename = filename.replace(/jpg$/, '.jpg');
  } else if (filename.endsWith('png') && !filename.endsWith('.png')) {
    filename = filename.replace(/png$/, '.png');
  } else if (filename.endsWith('gif') && !filename.endsWith('.gif')) {
    filename = filename.replace(/gif$/, '.gif');
  }
  
  return filename;
}
