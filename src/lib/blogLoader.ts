// Blog Loader - Memory-safe extension of project loader system
// Uses same build-time optimization patterns for blogs

import fs from 'fs';
import path from 'path';
import { BlogData } from '@/lib/types/blog';

// Re-export the type for convenience
export type { BlogData };

const BLOG_DIR = path.join(process.cwd(), 'src/app/blog/content');

// OPTIMIZED: Use pre-generated manifest or fallback to filesystem scanning
export async function discoverBlogs(silent = false): Promise<string[]> {
  // FAST PATH: Try to use pre-generated manifest (no filesystem calls)
  try {
    const blogManifest = await import('@/lib/generated/blogManifest');
    const blogIds = blogManifest.getBlogIds();
    if (!silent) {
      console.log('Discovered blog folders:', blogIds);
    }
    return [...blogIds]; // Convert readonly to mutable array
  } catch {
    // FALLBACK: Filesystem scanning (only during development or if manifest missing)
    if (!silent) {
      console.log('⚠️  Using filesystem fallback for blogs - consider running npm run generate-project-data');
    }
    try {
      const entries = await fs.promises.readdir(BLOG_DIR, { withFileTypes: true });
      const blogFolders = entries
        .filter((entry: fs.Dirent) => entry.isDirectory())
        .map((entry: fs.Dirent) => entry.name);
      
      if (!silent) {
        console.log('Discovered blog folders:', blogFolders);
      }
      return blogFolders;
    } catch (error) {
      console.error('Failed to discover blogs:', error);
      return [];
    }
  }
}

// Load blog data from blog.json (mirrors project.json structure)
export async function loadBlogData(blogId: string): Promise<BlogData> {
  try {
    const blogDir = path.join(BLOG_DIR, blogId);
    const dataPath = path.join(blogDir, 'blog.json'); // Use blog.json for blogs
    
    const rawData = await fs.promises.readFile(dataPath, 'utf-8');
    const blogData = JSON.parse(rawData) as Omit<BlogData, 'id' | 'images'>;

    // Convert project data to blog data structure
    const rawBlogData = blogData as unknown as Record<string, unknown>;
    const convertedData: BlogData = {
      ...blogData,
      id: blogId,
      // Map technologies to tags if they exist, otherwise use empty array
      tags: (rawBlogData.technologies as string[]) || blogData.tags || [],
      // Add blog-specific defaults
      readTime: blogData.readTime || '5 min read',
      publishDate: blogData.publishDate || new Date().toISOString().split('T')[0],
      author: blogData.author || undefined,
      excerpt: blogData.excerpt || blogData.description,
      images: {}, // Images handled by static imports
    };

    return convertedData;
  } catch (error) {
    console.error(`Failed to load blog data for ${blogId}:`, error);
    throw new Error(`Blog data not found: ${blogId}`);
  }
}

// Get all blogs for listing page
export async function getAllBlogs(): Promise<BlogData[]> {
  const blogIds = await discoverBlogs(); // Keep logging for listing pages
  const blogs: BlogData[] = [];
  
  for (const blogId of blogIds) {
    try {
      const blogData = await loadBlogData(blogId);
      blogs.push(blogData);
    } catch (error) {
      console.warn(`Skipping blog ${blogId}:`, error);
    }
  }
  
  return blogs.sort((a, b) => {
    // Sort by publish date (newest first), then by featured status
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return dateB - dateA;
  });
}

// Get blog by ID for detail page
export async function getBlog(blogId: string): Promise<BlogData | null> {
  try {
    return await loadBlogData(blogId);
  } catch {
    return null;
  }
}

// Get blogs by category
export async function getBlogsByCategory(category: string): Promise<BlogData[]> {
  const allBlogs = await getAllBlogs();
  if (category === 'All' || !category) {
    return allBlogs;
  }
  return allBlogs.filter(blog => 
    blog.category.toLowerCase() === category.toLowerCase()
  );
}

// Get blogs by tag
export async function getBlogsByTag(tag: string): Promise<BlogData[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => 
    blog.tags.some(blogTag => 
      blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get featured blogs
export async function getFeaturedBlogs(): Promise<BlogData[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => blog.featured);
}

// Generate static params for Next.js (mirrors projects)
export async function generateStaticParams() {
  try {
    const blogIds = await discoverBlogs(true); // Silent mode to avoid redundant logging
    
    // Add validation and sanitization
    return blogIds
      .filter(Boolean) // Remove any null/undefined values
      .filter(id => typeof id === 'string' && id.length > 0) // Ensure valid strings
      .map(id => ({ 
        slug: String(id).replace(/[^a-zA-Z0-9-_]/g, '') // Sanitize slug for URL safety
      }))
      .filter(({ slug }) => slug.length > 0); // Remove any empty slugs after sanitization
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return []; // Return empty array on error to prevent build failure
  }
}
