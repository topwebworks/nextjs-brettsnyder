// MarkdownContent Component - React-based Markdown Parser with Next.js Image Optimization
// Handles both regular markdown images and StaticImage tokens from build process
// Eliminates need for InlineImage component by using static imports directly

'use client';

import { marked } from 'marked';
import type { Tokens } from 'marked';
import Image from 'next/image';
import { getProjectImageByFilename } from '@/lib/generated/projectImageImports';
import styles from './MarkdownContent.module.css';

interface MarkdownContentProps {
  content: string;
  projectId: string;
  className?: string;
}

interface ParsedContent {
  type: 'html' | 'image' | 'staticImage';
  content?: string;
  alt?: string;
  src?: string;
  importVar?: string;
}

export default function MarkdownContent({ content, projectId, className = '' }: MarkdownContentProps) {
  
  // Helper function to get static image from imports
  const getStaticImageSrc = (filename: string): string | null => {
    const staticImage = getProjectImageByFilename(projectId, filename);
    return staticImage ? staticImage.src : null;
  };
  
  // Parse content and extract images and static image tokens
  const parseContentWithImages = (rawContent: string): ParsedContent[] => {
    // Configure marked options with custom renderer for external links
    const renderer = new marked.Renderer();
    
    // Override link renderer to open external links in new tab
    renderer.link = ({ href, title, tokens }: { href: string; title?: string | null; tokens: Tokens.Generic[] }) => {
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      const titleAttr = title ? ` title="${title}"` : '';
      const text = tokens.map(token => token.raw).join('');
      return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
    };

    // Add custom header renderer to generate IDs
    renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
      // Convert header text to ID (lowercase, spaces to hyphens, remove special chars)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/--+/g, '-')     // Replace multiple hyphens with single
        .trim();
      
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    };
    
    marked.setOptions({
      breaks: true,
      gfm: true,
      renderer: renderer
    });
    
    // Convert JSON escape sequences to actual newlines
    const unescapedContent = rawContent
      .replace(/\\n/g, '\n')        // Convert \\n to actual newlines
      .replace(/\\t/g, '\t')        // Convert \\t to actual tabs
      .replace(/\\\\/g, '\\');      // Convert \\\\ to single backslash
    
    // Match both regular images ![alt](src) and StaticImage tokens <StaticImage importVar="..." alt="..." />
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)|<StaticImage importVar="([^"]+)" alt="([^"]*)" \/>/g;
    const parts: ParsedContent[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = imageRegex.exec(unescapedContent)) !== null) {
    // Add HTML content before image (convert markdown to HTML)
    if (match.index > lastIndex) {
      const markdownContent = unescapedContent.slice(lastIndex, match.index);
      if (markdownContent.trim()) {
        const htmlContent = marked.parse(markdownContent) as string;
        parts.push({
          type: 'html',
          content: htmlContent
        });
      }
    }      // Determine if this is a regular image or StaticImage token
      if (match[0].startsWith('<StaticImage')) {
        // StaticImage token: <StaticImage importVar="varName" alt="alt" />
        const importVar = match[3];
        const alt = match[4] || '';
        
        parts.push({
          type: 'staticImage',
          importVar,
          alt
        });
      } else {
        // Regular markdown image: ![alt](src)
        const alt = match[1] || '';
        const src = match[2];
        
        parts.push({
          type: 'image',
          alt,
          src
        });
      }
      
      lastIndex = imageRegex.lastIndex;
    }
    
    // Add remaining HTML content (convert markdown to HTML)
    if (lastIndex < unescapedContent.length) {
      const remainingContent = unescapedContent.slice(lastIndex);
      if (remainingContent.trim()) {
        const htmlContent = marked.parse(remainingContent) as string;
        parts.push({
          type: 'html',
          content: htmlContent
        });
      }
    }
    
    return parts;
  };

  const parsedParts = parseContentWithImages(content);

  return (
    <div 
      className={`${styles.markdownContent} ${className}`}
    >
      {parsedParts.map((part, index) => {
        if (part.type === 'image' && part.alt && part.src) {
          const staticImageSrc = getStaticImageSrc(part.src);
          
          return (
            <div
              key={`image-${index}`}
              className={styles.inlineImageContainer}
            >
              <div className={styles.imageWrapper}>
                {staticImageSrc ? (
                  <Image
                    src={staticImageSrc}
                    alt={part.alt}
                    width={600}
                    height={400}
                    className={styles.styledImage}
                    priority={false}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                ) : (
                  <div className={styles.imageNotFound}>
                    <p className={styles.imageNotFoundText}>Image not found: {part.alt}</p>
                    <small className={styles.imageNotFoundDetail}>{part.src}</small>
                  </div>
                )}
              </div>
              
              {/* Caption */}
              {part.alt && (
                <p className={styles.imageCaption}>
                  {part.alt}
                </p>
              )}
            </div>
          );
        } else if (part.type === 'html') {
          return (
            <div
              key={`html-${index}`}
              dangerouslySetInnerHTML={{ __html: part.content || '' }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
