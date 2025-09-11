// Unified Project Data Converter - Markdown to JSON + Image Generation + HTML Enhancement
// Combines markdown processing with static image import generation + Component HTML
// Non-destructive: Processes .md files alongside existing .json files
// Memory safe: Generates new files, preserves existing system
// ENHANCED: Generates both raw markdown AND rich component HTML

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Dynamic import for marked (ES module)
let marked = null;
async function getMarked() {
  if (!marked) {
    const markedModule = await import('marked');
    marked = markedModule.marked;
  }
  return marked;
}

// Configuration
const PROJECTS_DIR = path.join(process.cwd(), 'src/app/projects/content');
const BLOG_DIR = path.join(process.cwd(), 'src/app/blog/content');
const GENERATED_IMPORTS_PATH = path.join(process.cwd(), 'src/lib/generated/projectImageImports.ts');
const GENERATED_BLOG_IMPORTS_PATH = path.join(process.cwd(), 'src/lib/generated/blogImageImports.ts');

console.log('🔧 Generating Project & Blog Data...');
console.log('');

// Image extensions supported by Next.js
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Helper function to convert markdown content to JSON-escaped string
function markdownToJsonString(markdown) {
  return markdown
    .replace(/\\/g, '\\\\')    // Escape backslashes first
    .replace(/"/g, '\\"')     // Escape quotes
    .replace(/\n/g, '\\n')    // Convert newlines to \\n
    .replace(/\t/g, '\\t');   // Convert tabs to \\t
}

// Helper function to generate variable names for imports
function generateVariableName(projectId, imageType, index = null) {
  const cleanProjectId = projectId.replace(/[^a-zA-Z0-9]/g, '');
  const suffix = index !== null ? (index + 1) : '';
  return `${cleanProjectId}${imageType.charAt(0).toUpperCase() + imageType.slice(1)}${suffix}`;
}

// ============================================================================
// PHASE 2 ENHANCEMENT: Rich HTML Generation Functions
// ============================================================================

// Process existing JSON files to add rich HTML (for pure JSON projects)
async function enhanceExistingJsonWithHTML(projectId) {
  return enhanceExistingContentJsonWithHTML(projectId, PROJECTS_DIR, 'project');
}

// Process existing blog JSON files to add rich HTML
async function enhanceExistingBlogJsonWithHTML(blogId) {
  return enhanceExistingContentJsonWithHTML(blogId, BLOG_DIR, 'project'); // Still uses project.json filename
}

// Generic JSON enhancement function (works for both projects and blogs)
async function enhanceExistingContentJsonWithHTML(contentId, contentDir, filename) {
  const contentFolder = path.join(contentDir, contentId);
  const jsonPath = path.join(contentFolder, `${filename}.json`);
  
  if (!fs.existsSync(jsonPath)) {
    return null;
  }
  
  try {
    // Silent enhancement processing
    
    // Read existing JSON
    const jsonContent = await fs.promises.readFile(jsonPath, 'utf-8');
    const jsonData = JSON.parse(jsonContent);
    
    // Skip if already has HTML
    if (jsonData.content?.overviewHtml) {
      return jsonData; // Silent skip
    }
    
    // Extract raw markdown from overview (unescape JSON strings)
    const rawOverview = jsonData.content?.overview;
    if (!rawOverview) {
      console.log(`  ⚠️  No overview content found: ${contentId}`);
      return jsonData;
    }
    
    // Unescape JSON string back to markdown
    const markdownContent = rawOverview
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"');
    
    // Generate rich HTML
    const contentImages = await discoverContentImages(contentId, contentDir);
    const richHTML = await convertMarkdownToRichHTML(markdownContent, contentId, contentImages);
    
    // Add HTML to existing JSON structure (preserve everything)
    const enhancedJsonData = {
      ...jsonData,
      content: {
        ...jsonData.content,
        overviewHtml: richHTML // Add rich HTML while preserving all existing content
      }
    };
    
    // Add auto-generation warning to enhanced JSON
    const jsonWithWarning = {
      "_WARNING": "IMPORTANT: The contents of this file are auto-generated. Manual changes will be overwritten when the generator runs.",
      ...enhancedJsonData
    };
    
    // Write enhanced JSON back
    await fs.promises.writeFile(jsonPath, JSON.stringify(jsonWithWarning, null, 2), 'utf-8');
    console.log(`  ✅ Enhanced ${contentId} with rich HTML`);
    
    return enhancedJsonData;
  } catch (error) {
    console.error(`❌ Error enhancing JSON for ${contentId}:`, error);
    return null;
  }
}

// Convert markdown to rich HTML with Next.js Image components
async function convertMarkdownToRichHTML(markdownContent, projectId, projectImages = {}) {
  if (!markdownContent) return '';
  
  try {
    // Get marked instance
    const markedInstance = await getMarked();
    
    // Configure custom renderer for external links (matching MarkdownContent.tsx)
    const renderer = new markedInstance.Renderer();
    
    // Override link renderer to open external links in new tab
    renderer.link = ({ href, title, tokens }) => {
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      const titleAttr = title ? ` title="${title}"` : '';
      const text = tokens.map(token => token.raw).join('');
      return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
    };

    // Add custom header renderer to generate IDs (matching MarkdownContent.tsx)
    renderer.heading = ({ text, depth }) => {
      // Convert header text to ID (lowercase, spaces to hyphens, remove special chars)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/--+/g, '-')     // Replace multiple hyphens with single
        .trim();
      
      // Apply appropriate CSS class based on depth
      let cssClass = 'project-section-title';
      if (depth === 3) cssClass = 'project-subsection-title';
      if (depth === 4) cssClass = 'project-detail-title';
      
      return `<h${depth} id="${id}" class="${cssClass}">${text}</h${depth}>`;
    };
    
    // Configure marked for GitHub-flavored markdown
    markedInstance.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
      renderer: renderer
    });
    
    // First, convert markdown to HTML
    let html = markedInstance(markdownContent);
    
    // Process images: Convert to Next.js Image component strings
    html = processImagesInHTML(html, projectId, projectImages);
    
    // Apply gold-standard CSS classes (matching About/Homepage)
    html = applyGoldStandardStyling(html);
    
    return html;
  } catch (error) {
    console.error(`❌ Error converting markdown to HTML for ${projectId}:`, error);
    return markdownContent; // Fallback to original markdown
  }
}

// Process <img> tags to Next.js <Image> component strings
function processImagesInHTML(html, projectId, projectImages = {}) {
  const imgRegex = /<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;
  
  return html.replace(imgRegex, (match, src, alt) => {
    // Check if it's a local image (no protocol)
    if (!src.startsWith('http') && !src.startsWith('//')) {
      // Find corresponding static import
      const imageName = path.basename(src);
      const staticImport = findStaticImportForImage(projectId, imageName, projectImages);
      
      if (staticImport) {
        // Generate Next.js Image component string with caption
        const imageComponent = `<Image 
  src={${staticImport}} 
  alt="${alt || 'Project Image'}" 
  class="project-content-image"
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
/>`;
        
        // Add caption if alt text is provided
        if (alt && alt.trim() !== '' && alt !== 'Project Image') {
          return `<div style="margin-bottom: 0rem;">
  <div class="image-container">
  ${imageComponent}
  </div>

</div>`;
        }
        
        return `<div class="image-container">
  ${imageComponent}
</div>`;
      }
    }
    
    // Fallback: keep as img but with enhanced styling and caption
    const fallbackImg = `<img src="${src}" alt="${alt || 'Project Image'}" class="project-content-image" style="width: 100%; height: auto; border-radius: 8px;" />`;
    
    // Add caption if alt text is provided
    if (alt && alt.trim() !== '' && alt !== 'Project Image') {
      return `<div style="margin-bottom: 0rem;">
  <div class="image-container">
    ${fallbackImg}
  </div>

</div>`;
    }
    
    return `<div class="image-container">
  ${fallbackImg}
</div>`;
  });
}

// Process YouTube video links in raw markdown before HTML conversion
// Find static import variable name for image
function findStaticImportForImage(projectId, imageName, projectImages) {
  // First try to find the image in the projectImages mapping (most reliable)
  if (projectImages && projectImages.hero === imageName) {
    return generateVariableName(projectId, 'Hero');
  }
  if (projectImages && projectImages.demo === imageName) {
    return generateVariableName(projectId, 'Demo');
  }
  if (projectImages && projectImages.screenshots) {
    const screenshotIndex = projectImages.screenshots.indexOf(imageName);
    if (screenshotIndex !== -1) {
      return generateVariableName(projectId, 'Screenshot', screenshotIndex);
    }
  }
  
  // Legacy fallback for hardcoded image names
  const imageMap = {
    'continuous-innovation.jpg': `continuousInnovationImage`,
    'tech-excellence.jpg': `techExcellenceImage`, 
    'user-centered-design.jpg': `userCenteredDesignImage`,
    'hero.jpg': `${projectId.replace(/-/g, '')}HeroImage`,
    'demo.gif': `${projectId.replace(/-/g, '')}DemoImage`
  };
  
  // Try exact match from legacy map
  if (imageMap[imageName]) {
    return imageMap[imageName];
  }
  
  // Final fallback: generate variable name from image filename (may not match actual imports)
  const cleanName = imageName.replace(/[^a-zA-Z0-9]/g, '');
  return `${projectId.replace(/-/g, '')}${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`;
}

// Apply gold-standard CSS classes and styling
function applyGoldStandardStyling(html) {
  // Apply glassmorphism styling to sections
  html = html.replace(/<h2>/gi, '<h2 class="project-section-title">');
  html = html.replace(/<h3>/gi, '<h3 class="project-subsection-title">');
  html = html.replace(/<h4>/gi, '<h4 class="project-detail-title">');
  
  // Wrap paragraphs with enhanced styling
  html = html.replace(/<p>/gi, '<p class="project-content-paragraph">');
  
  // Style blockquotes as callout panels
  html = html.replace(/<blockquote>/gi, '<div class="project-callout-panel"><blockquote class="project-quote">');
  html = html.replace(/<\/blockquote>/gi, '</blockquote></div>');
  
  // Style lists
  html = html.replace(/<ul>/gi, '<ul class="project-content-list">');
  html = html.replace(/<ol>/gi, '<ol class="project-content-list project-numbered-list">');
  
  // Style code blocks
  html = html.replace(/<pre><code>/gi, '<div class="project-code-block"><pre><code>');
  html = html.replace(/<\/code><\/pre>/gi, '</code></pre></div>');
  
  // Style inline code
  html = html.replace(/<code>/gi, '<code class="project-inline-code">');
  
  return html;
}

// Create template markdown file for new projects (SCENARIO 1)
function createTemplateMarkdown(projectId) {
  const displayName = projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `---
# PROJECT METADATA - Remove comments after editing
title: "${displayName}"
description: "Brief description for project listing (under 150 characters)"
contentTitle: ""
achievementTitle: ""
technologies:
  - "Next.js"
  - "TypeScript" 
  - "Your Tech"
category: "Web Application"
status: "Production"
featured: true
publishDate: "${new Date().toISOString().split('T')[0]}"
links:
  live: "https://your-demo.com"
  github: "https://github.com/username/repo"

# KEY ACHIEVEMENTS - Cards shown on detail page
keyAchievements:
  - type: "performance"
    icon: "💹"
    title: "Performance Impact"
    description: "What was achieved"
    metrics:
      - "50% faster load times"
      - "95% user satisfaction"
      
  - type: "technical"  
    icon: "🔧"
    title: "Technical Innovation"
    description: "Engineering excellence"
    metrics:
      - "Microservices architecture"
      - "Real-time processing"

# MEDIA - Optional additional images/videos      
media:
  items: []
---

<!-- 
MEDIA GUIDELINES:
- INLINE IMAGES: Use ![Alt Text](filename.jpg) for images within content
  * Images show with captions based on alt text
  * Only .jpg, .png, .webp supported for inline content
  * Place image files in the same folder as this markdown file
  
- MEDIA GALLERY: Use the 'media.items' array above for videos and additional images
  * Supports YouTube videos, image galleries, and demos
  * Videos should only be added to media gallery, not inline
  * Example: { type: "video", title: "Demo", src: "https://youtube.com/watch?v=xyz", thumbnail: "thumb.jpg" }

CONTENT TITLE FIELD: If specified, replaces the automatic "Article" or "Case Study" appended title
-->

<!-- PROJECT CONTENT - Markdown body text -->

## Executive Summary

Write your project overview here. This appears as the main content on your project detail page.

## Technical Architecture

Describe your technical approach and key decisions.

### Key Features:
- **Feature 1**: Description of what it does
- **Feature 2**: Another key capability  
- **Feature 3**: Third major feature

## Development Process

Share your development workflow and lessons learned.

## Results & Impact

Quantify the success with metrics and outcomes.

<!-- 
INSTRUCTIONS:
1. Edit the YAML frontmatter above (between ---) 
2. Add images to this project folder
3. Write your content in markdown below
4. Run: npm run generate-project-data
5. Your project appears on the site!

IMAGE HANDLING:
- hero.jpg or main.jpg = Main project image  
- demo.gif or demo.mp4 = Demo/video thumbnail
- Other .jpg/.png files = Screenshots gallery
- Reference in content: ![Description](filename.jpg)
-->`;
}

// Create template markdown file for new blogs (SCENARIO 1B)
function createBlogTemplateMarkdown(blogId) {
  const displayName = blogId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `---
# BLOG METADATA - Remove comments after editing
title: "${displayName}"
description: "Brief description for blog listing (under 150 characters)"
contentTitle: ""
achievementTitle: ""
technologies:
  - "JavaScript"
  - "Web Development" 
  - "Your Topic"
category: "Development"
status: "Published"
featured: true
readTime: "10 min read"
publishDate: "${new Date().toISOString().split('T')[0]}"
author: "Brett Snyder"
excerpt: "Brief excerpt that appears in blog listings and social sharing (under 200 characters)."
links:
  canonical: "https://brettsnyderdev.com/blog/${blogId}"
  external: "https://optional-reference-link.com"

# MEDIA - Optional additional images/videos      
media:
  items: []
---

<!-- 
MEDIA GUIDELINES:
- INLINE IMAGES: Use ![Alt Text](filename.jpg) for images within content
  * Images show with captions based on alt text
  * Only .jpg, .png, .webp supported for inline content
  * Place image files in the same folder as this markdown file
  
- MEDIA GALLERY: Use the 'media.items' array above for videos and additional images
  * Supports YouTube videos, image galleries, and demos
  * Videos should only be added to media gallery, not inline
  * Example: { type: "video", title: "Demo", src: "https://youtube.com/watch?v=xyz", thumbnail: "thumb.jpg" }

CONTENT TITLE FIELD: If specified, replaces the automatic "Article" or "Case Study" appended title
-->

<!-- BLOG CONTENT - Markdown body text -->

## Introduction

Write your blog post introduction here. This appears as the main content on your blog detail page.

## Key Concepts

Explain the main ideas and concepts covered in your post.

![Concept Diagram](your-image.jpg)

### Important Points:
- **Point 1**: First major concept
- **Point 2**: Second key idea  
- **Point 3**: Third important aspect

## Practical Examples

Show real-world examples or code snippets that demonstrate your points.

## Conclusion

Summarize the key takeaways and next steps for readers.
`;
}

// Helper function to categorize images based on filename patterns (same as projectLoader.ts)
function categorizeImage(fileName, allImages) {
  const lowerFileName = fileName.toLowerCase();
  
  // Hero patterns - first priority
  if (lowerFileName.includes('hero') || 
      lowerFileName.includes('main') || 
      lowerFileName.includes('continuous-innovation') || 
      allImages.indexOf(fileName) === 0) {
    return 'hero';
  }
  
  // Demo patterns
  if (lowerFileName.includes('demo') || lowerFileName.includes('gif')) {
    return 'demo';
  }
  
  // Everything else is a screenshot
  return 'screenshot';
}

// Discover all project folders
async function discoverProjects() {
  return discoverContent(PROJECTS_DIR, 'projects');
}

// Discover all blog folders
async function discoverBlogs() {
  return discoverContent(BLOG_DIR, 'blogs');
}

// Generic content discovery function (works for both projects and blogs)
async function discoverContent(contentDir, contentType) {
  try {
    const entries = await fs.promises.readdir(contentDir, { withFileTypes: true });
    const contentFolders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    console.log(`📁 Found ${contentFolders.length} ${contentType}: ${contentFolders.join(', ')}`);
    return contentFolders;
  } catch (error) {
    console.error(`❌ Failed to discover ${contentType}:`, error);
    return [];
  }
}

// Process markdown file to generate JSON with smart fallback handling
async function processMarkdownToJson(projectId) {
  return processContentMarkdownToJson(projectId, PROJECTS_DIR, 'project');
}

// Process blog markdown file to generate JSON
async function processBlogMarkdownToJson(blogId) {
  return processContentMarkdownToJson(blogId, BLOG_DIR, 'blog');
}

// Generic markdown to JSON processor (works for both projects and blogs)
async function processContentMarkdownToJson(contentId, contentDir, contentType) {
  const contentFolder = path.join(contentDir, contentId);
  const markdownPath = path.join(contentFolder, `${contentType}.md`);
  const jsonPath = path.join(contentFolder, `${contentType}.json`);
  
  // SCENARIO 1: No markdown file exists - skip
  if (!fs.existsSync(markdownPath)) {
    console.log(`  ℹ️  No ${contentType}.md found in ${contentId}, skipping conversion`);
    return null;
  }
  
  try {
    console.log(`  🔄 Processing ${contentId}/${contentType}.md`);
    
    // Read and parse markdown file
    const markdownContent = await fs.promises.readFile(markdownPath, 'utf-8');
    const { data: frontmatter, content: naturalMarkdown } = matter(markdownContent);
    
    // SCENARIO 2: Both markdown and JSON exist - smart merge with timestamp check
    let existingJson = null;
    let forceRegeneration = false;
    
    if (fs.existsSync(jsonPath)) {
      try {
        // Check file modification times (lightweight comparison)
        const markdownStats = await fs.promises.stat(markdownPath);
        const jsonStats = await fs.promises.stat(jsonPath);
        
        if (markdownStats.mtime > jsonStats.mtime) {
          console.log(`  🔄 ${contentId}: Regenerating (markdown is newer)`);
          forceRegeneration = true;
        } else {
          const existingContent = await fs.promises.readFile(jsonPath, 'utf-8');
          existingJson = JSON.parse(existingContent);
          console.log(`  ⚡ ${contentId}: Skipping (JSON up to date)`);
        }
      } catch (error) {
        console.log(`  ⚠️  ${contentId}: JSON corrupted, regenerating`);
        forceRegeneration = true;
      }
    }
    
    // Convert markdown content to escaped JSON string (backward compatibility)
    const escapedOverview = markdownToJsonString(naturalMarkdown);
    
    // Determine if we're actually processing or just checking timestamps
    let action = 'skipped';
    let shouldGenerateHTML = false;
    
    if (!fs.existsSync(jsonPath)) {
      action = 'generated';
      shouldGenerateHTML = true;
      console.log(`  ✨ ${contentId}: First time generation`);
    } else if (forceRegeneration) {
      action = 'regenerated';
      shouldGenerateHTML = true;
    } else if (existingJson) {
      // Check if we need to add HTML to existing JSON
      if (!existingJson.content?.overviewHtml) {
        action = 'merged';
        shouldGenerateHTML = true;
        console.log(`  🔧 ${contentId}: Adding HTML enhancement`);
      } else {
        return { contentId, jsonData: existingJson, action: 'skipped' };
      }
    }
    
    // PHASE 2 ENHANCEMENT: Generate rich HTML (only when needed)
    let richHTML = '';
    if (shouldGenerateHTML) {
      const contentImages = await discoverContentImages(contentId, contentDir);
      richHTML = await convertMarkdownToRichHTML(naturalMarkdown, contentId, contentImages);
    }
    
    // Build JSON structure with smart fallbacks + ENHANCED HTML
    // Use force regeneration when markdown is newer or if JSON doesn't exist
    const useExistingJson = existingJson && !forceRegeneration;
    
    const jsonData = {
      title: frontmatter.title || (useExistingJson ? existingJson?.title : undefined) || `Untitled ${contentType}`,
      description: frontmatter.description || (useExistingJson ? existingJson?.description : undefined) || '',
      technologies: frontmatter.technologies || frontmatter.tags || (useExistingJson ? existingJson?.technologies : undefined) || [],
      tags: frontmatter.tags || frontmatter.technologies || (useExistingJson ? existingJson?.tags : undefined) || [], // Support both
      category: frontmatter.category || (useExistingJson ? existingJson?.category : undefined) || 'Uncategorized',
      status: frontmatter.status || (useExistingJson ? existingJson?.status : undefined) || 'Unknown',
      featured: frontmatter.featured !== undefined ? frontmatter.featured : (useExistingJson ? existingJson?.featured : undefined) || false,
      publishDate: frontmatter.publishDate || (useExistingJson ? existingJson?.publishDate : undefined) || new Date().toISOString().split('T')[0],
      contentTitle: frontmatter.contentTitle || frontmatter['content-title'] || (useExistingJson ? existingJson?.contentTitle : undefined) || undefined,
      achievementTitle: frontmatter.achievementTitle || frontmatter['achievement-title'] || (useExistingJson ? existingJson?.achievementTitle : undefined) || undefined,
      // Blog-specific fields
      readTime: frontmatter.readTime || (useExistingJson ? existingJson?.readTime : undefined) || '5 min read',
      author: frontmatter.author || (useExistingJson ? existingJson?.author : undefined) || undefined,
      excerpt: frontmatter.excerpt || frontmatter.description || (useExistingJson ? existingJson?.excerpt : undefined) || '',
      links: frontmatter.links || (useExistingJson ? existingJson?.links : undefined) || {},
      content: {
        overview: escapedOverview, // Keep original for backward compatibility
        overviewHtml: richHTML,    // NEW: Rich HTML for enhanced rendering
        keyAchievements: frontmatter.keyAchievements || (useExistingJson ? existingJson?.content?.keyAchievements : undefined) || [],
        media: frontmatter.media || (useExistingJson ? existingJson?.content?.media : undefined) || { items: [] }
      }
    };
    
    // SCENARIO 2b: Preserve any JSON-only fields that markdown doesn't have (only if not forcing regeneration)
    if (useExistingJson) {
      // Check for fields that exist in JSON but not in markdown frontmatter
      const jsonOnlyFields = {};
      Object.keys(existingJson).forEach(key => {
        if (!(key in frontmatter) && key !== 'content') {
          jsonOnlyFields[key] = existingJson[key];
        }
      });
      
      if (Object.keys(jsonOnlyFields).length > 0) {
        // Silently preserve JSON-only fields
        Object.assign(jsonData, jsonOnlyFields);
      }
      
      // Check for content fields that exist in JSON but not in markdown
      if (existingJson.content) {
        Object.keys(existingJson.content).forEach(key => {
          if (key !== 'overview' && !(key in frontmatter)) {
            jsonData.content[key] = existingJson.content[key];
          }
        });
      }
    }
    
    // Add auto-generation warning to JSON data
    const jsonWithWarning = {
      "_WARNING": "IMPORTANT: The contents of this file are auto-generated. Manual changes will be overwritten when the generator runs.",
      ...jsonData
    };
    
    // Write generated JSON file
    await fs.promises.writeFile(
      jsonPath, 
      JSON.stringify(jsonWithWarning, null, 2),
      'utf-8'
    );
    
    return { contentId, jsonData, action };
    
  } catch (error) {
    console.error(`  ❌ Failed to process ${contentId}/${contentType}.md:`, error.message);
    return null;
  }
}

// Discover images in project folder (same logic as projectLoader.ts)
async function discoverProjectImages(projectId) {
  return discoverContentImages(projectId, PROJECTS_DIR);
}

// Discover images in blog folder
async function discoverBlogImages(blogId) {
  return discoverContentImages(blogId, BLOG_DIR);
}

// Generic image discovery function (works for both projects and blogs)
async function discoverContentImages(contentId, contentDir) {
  const contentFolder = path.join(contentDir, contentId);
  
  try {
    const entries = await fs.promises.readdir(contentFolder, { withFileTypes: true });
    const imageFiles = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
      .filter(file => IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext)));
    
    if (imageFiles.length === 0) {
      return { hero: null, demo: null, screenshots: [] };
    }
    
    // Categorize images
    const images = { hero: null, demo: null, screenshots: [] };
    
    imageFiles.forEach(file => {
      const category = categorizeImage(file, imageFiles);
      
      if (category === 'hero' && !images.hero) {
        images.hero = file;
      } else if (category === 'demo' && !images.demo) {
        images.demo = file;
      } else if (category === 'screenshot') {
        images.screenshots.push(file);
      }
    });
    
    // Categorization happens silently - no need to log for each item
    return images;
    
  } catch (error) {
    console.error(`  ❌ Failed to discover images for ${contentId}:`, error);
    return { hero: null, demo: null, screenshots: [] };
  }
}

// Generate static image imports file
async function generateImageImports(allProjectData) {
  return generateContentImageImports(allProjectData, 'projects', GENERATED_IMPORTS_PATH);
}

// Generate blog image imports file
async function generateBlogImageImports(allBlogData) {
  return generateContentImageImports(allBlogData, 'blog', GENERATED_BLOG_IMPORTS_PATH);
}

// Generic image imports generator (works for both projects and blogs)
async function generateContentImageImports(allContentData, contentType, outputPath) {
  // Silent processing - only show completion
  let imports = [];
  let exports = [];
  let contentMappings = [];
  let filenameMappings = [];
  let availableContent = [];
  const contentTypeTitle = contentType.charAt(0).toUpperCase() + contentType.slice(1);
  // Keep plural form for paths (projects, blogs)
  const contentTypePlural = contentType; 
  // Handle singular form for types and function names
  const contentTypeSingular = contentType === 'blog' ? 'blog' : contentType.slice(0, -1);
  // Handle singular title form 
  const contentTypeSingularTitle = contentType === 'blog' ? 'Blog' : contentTypeTitle.slice(0, -1);
  
  for (const { contentId, images } of allContentData) {
    if (!images.hero && images.screenshots.length === 0) {
      console.log(`  ⚠️  No images found for ${contentId}, skipping`);
      continue;
    }
    
    availableContent.push(contentId);
    const importVars = {};
    const contentFileMap = {};
    
    // Generate hero import
    if (images.hero) {
      const varName = generateVariableName(contentId, 'Hero');
      imports.push(`import ${varName} from '@/app/${contentTypePlural}/content/${contentId}/${images.hero}';`);
      importVars.hero = varName;
      contentFileMap[images.hero] = varName;
    }
    
    // Generate demo import
    if (images.demo) {
      const varName = generateVariableName(contentId, 'Demo');
      imports.push(`import ${varName} from '@/app/${contentTypePlural}/content/${contentId}/${images.demo}';`);
      importVars.demo = varName;
      contentFileMap[images.demo] = varName;
    }
    
    // Generate screenshot imports
    const screenshotVars = [];
    images.screenshots.forEach((screenshot, index) => {
      const varName = generateVariableName(contentId, 'Screenshot', index);
      imports.push(`import ${varName} from '@/app/${contentTypePlural}/content/${contentId}/${screenshot}';`);
      screenshotVars.push(varName);
      contentFileMap[screenshot] = varName;
    });
    
    // Create content mapping
    contentMappings.push(`  '${contentId}': {
    hero: ${importVars.hero || 'null'},
    demo: ${importVars.demo || 'null'},
    screenshots: [${screenshotVars.join(', ')}]
  }`);
    
    // Create filename mapping for this content
    const filenames = Object.keys(contentFileMap).map(filename => 
      `    '${filename}': ${contentFileMap[filename]}`
    );
    if (filenames.length > 0) {
      filenameMappings.push(`  '${contentId}': {\n${filenames.join(',\n')}\n  }`);
    }
  }
  
  // Generate the complete TypeScript file
  const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-project-data.js
// This file provides static imports for all ${contentTypeSingular} images to eliminate API calls

import { StaticImageData } from 'next/image';

// Import statements for all ${contentTypeSingular} images
${imports.join('\n')}

// Type definition for ${contentTypeSingular} image imports
export interface ${contentTypeSingularTitle}ImageImports {
  hero: StaticImageData | null;
  demo: StaticImageData | null;
  screenshots: StaticImageData[];
}

// Export map for easy access by ${contentTypeSingular} ID
export const ${contentTypeSingular}ImageImports: Record<string, ${contentTypeSingularTitle}ImageImports> = {
${contentMappings.join(',\n')}
};

// Filename-based lookup for direct image resolution
export const ${contentTypeSingular}ImagesByFilename: Record<string, Record<string, StaticImageData>> = {
${filenameMappings.join(',\n')}
};

// Helper function to get images for a specific ${contentTypeSingular}
export function get${contentTypeSingularTitle}Images(${contentTypeSingular}Id: string): ${contentTypeSingularTitle}ImageImports {
  return ${contentTypeSingular}ImageImports[${contentTypeSingular}Id] || {
    hero: null,
    demo: null,
    screenshots: []
  };
}

// Helper function to get image by filename for a ${contentTypeSingular}
export function get${contentTypeSingularTitle}ImageByFilename(${contentTypeSingular}Id: string, filename: string): StaticImageData | null {
  const ${contentTypeSingular}Files = ${contentTypeSingular}ImagesByFilename[${contentTypeSingular}Id];
  return ${contentTypeSingular}Files ? (${contentTypeSingular}Files[filename] || null) : null;
}

// List of all available ${contentTypeSingular} IDs
export const available${contentTypeTitle} = [${availableContent.map(id => `'${id}'`).join(', ')}];

// Note: Console logging removed to reduce build noise

// Individual variable exports for direct access
${allContentData.flatMap(({ contentId, images }) => {
  const exports = [];
  const contentData = allContentData.find(item => item.contentId === contentId);
  if (!contentData) return [];
  
  // Export hero image
  if (images.hero) {
    const varName = generateVariableName(contentId, 'Hero');
    exports.push(`export { ${varName} };`);
  }
  
  // Export demo image
  if (images.demo) {
    const varName = generateVariableName(contentId, 'Demo');
    exports.push(`export { ${varName} };`);
  }
  
  // Export screenshots
  images.screenshots.forEach((screenshot, index) => {
    const varName = generateVariableName(contentId, 'Screenshot', index);
    exports.push(`export { ${varName} };`);
  });
  
  return exports;
}).join('\n')}
`;

  // Write the generated file
  await fs.promises.writeFile(outputPath, fileContent, 'utf-8');
  console.log(`📦 Generated ${contentType} image imports (${imports.length} imports)`);
}

// Generate project manifest to eliminate runtime filesystem scanning
async function generateProjectManifest(projectIds) {
  return generateContentManifest(projectIds, 'project', 'Project');
}

// Generate blog manifest to eliminate runtime filesystem scanning
async function generateBlogManifest(blogIds) {
  return generateContentManifest(blogIds, 'blog', 'Blog');
}

// Generic manifest generator (works for both projects and blogs)
async function generateContentManifest(contentIds, contentType, contentTypeTitle) {
  // Silent generation - only show completion
  const manifestPath = path.join(process.cwd(), `src/lib/generated/${contentType}Manifest.ts`);
  
  const manifestContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-project-data.js
// Pre-built ${contentType} list to eliminate runtime filesystem scanning during builds

// Static ${contentType} list - no filesystem calls needed
export const ${contentType.toUpperCase()}_IDS: readonly string[] = [
${contentIds.map(id => `  '${id}'`).join(',\n')}
] as const;

// ${contentTypeTitle} count for quick reference
export const ${contentType.toUpperCase()}_COUNT = ${contentIds.length};

// Type for ${contentType} ID validation
export type ${contentTypeTitle}Id = typeof ${contentType.toUpperCase()}_IDS[number];

// Quick lookup function - no async needed
export function get${contentTypeTitle}Ids(): readonly string[] {
  return ${contentType.toUpperCase()}_IDS;
}

// Validate if a ${contentType} ID exists (for routing)
export function isValid${contentTypeTitle}Id(id: string): id is ${contentTypeTitle}Id {
  return ${contentType.toUpperCase()}_IDS.includes(id as ${contentTypeTitle}Id);
}

// Export for generateStaticParams in Next.js
export function getStatic${contentTypeTitle}Params() {
  return ${contentType.toUpperCase()}_IDS.map(slug => ({ slug }));
}
`;

  // Write the manifest file
  await fs.promises.writeFile(manifestPath, manifestContent, 'utf-8');
  // Silent completion - no logging needed
}

// Generate latest blog posts data for homepage
async function generateLatestBlogsData(blogIds = []) {
  // Silent generation for latest blog posts
  
  try {
    // Use provided blogIds or discover if not provided
    if (blogIds.length === 0) {
      blogIds = await discoverBlogs();
    }
    
    if (blogIds.length === 0) {
      console.log('  ⚠️  No blogs found, creating empty data file');
      const emptyData = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-project-data.js
// Latest blog posts data for homepage

export const latestBlogPosts = [];
`;
      const outputPath = path.join(process.cwd(), 'src/lib/generated/latestBlogPosts.ts');
      await fs.promises.writeFile(outputPath, emptyData, 'utf-8');
      return;
    }
    
    // Load all blog data and sort by publish date
    const allBlogData = [];
    
    for (const blogId of blogIds) {
      try {
        const blogDir = path.join(BLOG_DIR, blogId);
        const dataPath = path.join(blogDir, 'blog.json');
        
        if (fs.existsSync(dataPath)) {
          const rawData = await fs.promises.readFile(dataPath, 'utf-8');
          const blogData = JSON.parse(rawData);
          
          // Add the ID and normalize the data
          const normalizedData = {
            id: blogId,
            title: blogData.title || 'Untitled',
            description: blogData.description || '',
            excerpt: blogData.excerpt || blogData.description || '',
            category: blogData.category || 'General',
            publishDate: blogData.publishDate || new Date().toISOString().split('T')[0],
            readTime: blogData.readTime || '5 min read',
            tags: blogData.tags || blogData.technologies || []
          };
          
          allBlogData.push(normalizedData);
        }
      } catch (error) {
        console.warn(`  ⚠️  Failed to load blog ${blogId}:`, error.message);
      }
    }
    
    // Sort by publish date (newest first)
    allBlogData.sort((a, b) => {
      const dateA = new Date(a.publishDate).getTime();
      const dateB = new Date(b.publishDate).getTime();
      return dateB - dateA; // Newest first
    });
    
    // Take the latest 2 posts
    const latestPosts = allBlogData.slice(0, 2);
    
    // Generate the TypeScript file
    const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-project-data.js
// Latest blog posts data for homepage

export interface LatestBlogPost {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

export const latestBlogPosts: LatestBlogPost[] = ${JSON.stringify(latestPosts, null, 2)};
`;
    
    const outputPath = path.join(process.cwd(), 'src/lib/generated/latestBlogPosts.ts');
    await fs.promises.writeFile(outputPath, fileContent, 'utf-8');
    
    // Silent completion - blog post data generated
    
  } catch (error) {
    console.error('❌ Failed to generate latest blog posts:', error);
    // Create empty fallback file
    const fallbackData = `// AUTO-GENERATED FILE - DO NOT EDIT
// Latest blog posts data for homepage (fallback)

export interface LatestBlogPost {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

export const latestBlogPosts: LatestBlogPost[] = [];
`;
    const outputPath = path.join(process.cwd(), 'src/lib/generated/latestBlogPosts.ts');
    await fs.promises.writeFile(outputPath, fallbackData, 'utf-8');
  }
}

// Create template markdown file for new projects (SCENARIO 1 handler)
async function createProjectTemplate(projectId) {
  const projectDir = path.join(PROJECTS_DIR, projectId);
  const markdownPath = path.join(projectDir, 'project.md');
  
  // Check if project directory exists, create if not
  if (!fs.existsSync(projectDir)) {
    await fs.promises.mkdir(projectDir, { recursive: true });
    console.log(`  📁 Created project directory: ${projectId}`);
  }
  
  // Check if markdown file already exists
  if (fs.existsSync(markdownPath)) {
    console.log(`  ⚠️  Template already exists at ${projectId}/project.md`);
    return false;
  }
  
  // Create template content
  const templateContent = createTemplateMarkdown(projectId);
  
  // Write template file
  await fs.promises.writeFile(markdownPath, templateContent, 'utf-8');
  console.log(`  ✅ Created template: ${projectId}/project.md`);
  console.log(`  📝 Edit the file and run 'npm run generate-project-data' to build JSON`);
  
  return true;
}

// Create template markdown file for new blogs (SCENARIO 1B handler)
async function createBlogTemplate(blogId) {
  const blogDir = path.join(BLOG_DIR, blogId);
  const markdownPath = path.join(blogDir, 'blog.md');
  
  // Check if blog directory exists, create if not
  if (!fs.existsSync(blogDir)) {
    await fs.promises.mkdir(blogDir, { recursive: true });
    console.log(`  📁 Created blog directory: ${blogId}`);
  }
  
  // Check if markdown file already exists
  if (fs.existsSync(markdownPath)) {
    console.log(`  ⚠️  Template already exists at ${blogId}/blog.md`);
    return false;
  }
  
  // Create template content
  const templateContent = createBlogTemplateMarkdown(blogId);
  
  // Write template file
  await fs.promises.writeFile(markdownPath, templateContent, 'utf-8');
  console.log(`  ✅ Created template: ${blogId}/blog.md`);
  console.log(`  📝 Edit the file and run 'npm run generate-project-data' to build JSON`);
  
  return true;
}

// Main conversion process
async function runConverter(options = {}) {
  const { createTemplate, projectId: newProjectId, createBlogTemplate: shouldCreateBlogTemplate, blogId: newBlogId } = options;
  
  console.log('🚀 Processing content...\n');
  
  try {
    // SCENARIO 1: Create new project template
    if (createTemplate && newProjectId) {
      console.log('📋 CREATING NEW PROJECT TEMPLATE');
      console.log('================================');
      const created = await createProjectTemplate(newProjectId);
      if (created) {
        console.log('\n✅ PROJECT TEMPLATE CREATED SUCCESSFULLY');
        console.log(`📝 Next steps:`);
        console.log(`   1. Edit src/app/projects/content/${newProjectId}/project.md`);
        console.log(`   2. Add your images to the same folder`);
        console.log(`   3. Run 'npm run generate-project-data' to build JSON`);
      }
      return;
    }

    // SCENARIO 1B: Create new blog template
    if (shouldCreateBlogTemplate && newBlogId) {
      console.log('📋 CREATING NEW BLOG TEMPLATE');
      console.log('=============================');
      const created = await createBlogTemplate(newBlogId);
      if (created) {
        console.log('\n✅ BLOG TEMPLATE CREATED SUCCESSFULLY');
        console.log(`📝 Next steps:`);
        console.log(`   1. Edit src/app/blog/content/${newBlogId}/blog.md`);
        console.log(`   2. Add your images to the same folder`);
        console.log(`   3. Run 'npm run generate-project-data' to build JSON`);
      }
      return;
    }
    
    // Step 1: Discover all projects and blogs
    const projectIds = await discoverProjects();
    const blogIds = await discoverBlogs();
    
    if (projectIds.length === 0 && blogIds.length === 0) {
      console.log('❌ No projects or blogs found, exiting');
      return;
    }
    
    // Initialize counters for clear reporting
    let projectsProcessed = 0;
    let blogsProcessed = 0;
    let filesRegenerated = 0;
    let filesMerged = 0;
    let filesSkipped = 0;
    
    // Step 2: Check for image-only folders and generate templates
    // Silent processing unless templates are needed
    const templatesCreated = [];
    
    // Check projects for missing markdown files
    for (const projectId of projectIds) {
      const projectDir = path.join(PROJECTS_DIR, projectId);
      const markdownPath = path.join(projectDir, 'project.md');
      
      if (!fs.existsSync(markdownPath)) {
        // Check if folder has images
        const images = await discoverProjectImages(projectId);
        if (images.hero || images.screenshots.length > 0) {
          console.log(`  🎯 Found image-only project folder: ${projectId}`);
          await createProjectTemplate(projectId);
          templatesCreated.push({ id: projectId, type: 'project' });
        }
      }
    }
    
    // Check blogs for missing markdown files  
    for (const blogId of blogIds) {
      const blogDir = path.join(BLOG_DIR, blogId);
      const markdownPath = path.join(blogDir, 'blog.md');
      
      if (!fs.existsSync(markdownPath)) {
        // Check if folder has images
        const images = await discoverBlogImages(blogId);
        if (images.hero || images.screenshots.length > 0) {
          console.log(`  🎯 Found image-only blog folder: ${blogId}`);
          await createBlogTemplate(blogId);
          templatesCreated.push({ id: blogId, type: 'blog' });
        }
      }
    }
    
    if (templatesCreated.length > 0) {
      console.log(`✅ Auto-generated ${templatesCreated.length} template markdown files`);
      templatesCreated.forEach(({ id, type }) => {
        console.log(`   📝 Created ${type}: ${id}/${type}.md`);
      });
    } else {
      // Only show if templates were needed
    }

    // Step 3: Process markdown files to JSON (handles SCENARIOS 2 & 3)
    console.log('📝 Processing markdown files...');
    const markdownResults = [];
    const blogMarkdownResults = [];
    
    // Process projects
    for (const projectId of projectIds) {
      const result = await processMarkdownToJson(projectId);
      if (result) {
        markdownResults.push({ ...result, type: 'project' });
        projectsProcessed++;
        
        // Track the action taken
        if (result.action === 'regenerated') {
          filesRegenerated++;
        } else if (result.action === 'merged') {
          filesMerged++;
        } else if (result.action === 'skipped') {
          filesSkipped++;
        }
      }
    }
    
    // Process blogs
    for (const blogId of blogIds) {
      const result = await processBlogMarkdownToJson(blogId);
      if (result) {
        blogMarkdownResults.push({ ...result, type: 'blog' });
        blogsProcessed++;
        
        // Track the action taken
        if (result.action === 'regenerated') {
          filesRegenerated++;
        } else if (result.action === 'merged') {
          filesMerged++;
        } else if (result.action === 'skipped') {
          filesSkipped++;
        }
      }
    }
    
    // Clear summary of what happened
    console.log(`📊 Summary:`);
    console.log(`   📁 Projects: ${projectsProcessed}, Blogs: ${blogsProcessed}`);
    console.log(`   🔄 Regenerated: ${filesRegenerated}, Merged: ${filesMerged}, Skipped: ${filesSkipped}`);
    
    // Step 4: PHASE 2 ENHANCEMENT - Add HTML to existing JSON files
    // Silent processing
    const enhancementResults = [];
    const blogEnhancementResults = [];
    
    // Enhance projects
    for (const projectId of projectIds) {
      const result = await enhanceExistingJsonWithHTML(projectId);
      if (result) {
        enhancementResults.push(result);
      }
    }
    
    // Enhance blogs (reuse same function, works for both)
    for (const blogId of blogIds) {
      const result = await enhanceExistingBlogJsonWithHTML(blogId);
      if (result) {
        blogEnhancementResults.push(result);
      }
    }
    
    // Step 5: Discover all content images and generate static imports
    // Silent processing
    const allProjectData = [];
    const allBlogData = [];
    
    // Process project images
    for (const projectId of projectIds) {
      const images = await discoverProjectImages(projectId);
      allProjectData.push({ contentId: projectId, images });
    }
    
    // Process blog images
    for (const blogId of blogIds) {
      const images = await discoverBlogImages(blogId);
      allBlogData.push({ contentId: blogId, images });
    }
    
    await generateImageImports(allProjectData);
    await generateBlogImageImports(allBlogData);
    
    // Step 6: Generate manifests for build optimization
    await generateProjectManifest(projectIds);
    await generateBlogManifest(blogIds);
    
    // Step 7: Generate latest blog posts for homepage
    await generateLatestBlogsData(blogIds);
    
    // Simple completion message
    console.log(`✅ Build optimization complete: ${filesRegenerated} regenerated, ${filesMerged} enhanced, ${filesSkipped} up-to-date\n`);
    
  } catch (error) {
    console.error('❌ Build generation failed:', error);
    process.exit(1);
  }
}

// Export functions for testing
module.exports = {
  runConverter,
  createProjectTemplate,
  processMarkdownToJson,
  discoverProjectImages,
  generateImageImports,
  markdownToJsonString,
  createTemplateMarkdown
};

// Command line argument parsing
function parseArguments() {
  const args = process.argv.slice(2);
  
  // Check for template creation: npm run create-project -- project-name
  if (args.includes('--create') || args.includes('create')) {
    const createIndex = args.indexOf('--create') !== -1 ? args.indexOf('--create') : args.indexOf('create');
    const itemName = args[createIndex + 1];
    
    if (!itemName) {
      console.error('❌ Name required: npm run create-project -- your-project-name or npm run create-blog -- your-blog-name');
      process.exit(1);
    }
    return { createTemplate: true, projectId: itemName };
  }

  // Check for blog template creation: npm run create-blog -- blog-name  
  if (args.includes('--create-blog') || args.includes('create-blog')) {
    const createIndex = args.indexOf('--create-blog') !== -1 ? args.indexOf('--create-blog') : args.indexOf('create-blog');
    const blogName = args[createIndex + 1];
    
    if (!blogName) {
      console.error('❌ Blog name required: npm run create-blog -- your-blog-name');
      process.exit(1);
    }
    return { createBlogTemplate: true, blogId: blogName };
  }
  
  return {};
}

// Run if called directly
if (require.main === module) {
  const options = parseArguments();
  runConverter(options)
    .then(() => {
      // Conversion completed successfully
    })
    .catch((error) => {
      console.error('❌ Conversion failed:', error);
      process.exit(1);
    });
}
