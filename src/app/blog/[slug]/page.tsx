// Dynamic Blog Detail Page using Auto-Discovery
// Automatically loads any blog from folder structure

import { notFound } from 'next/navigation';
import { loadBlogData } from '@/lib/blogLoader';
import ProjectDetailUniversal from '@/components/ProjectDetailUniversal';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { getBlogImages } from '@/lib/generated/blogImageImports';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const blogData = await loadBlogData(slug);
    
    if (!blogData) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.',
      };
    }
    
    return {
      title: blogData.title,
      description: blogData.description,
      openGraph: {
        title: blogData.title,
        description: blogData.description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: blogData.title,
        description: blogData.description,
      },
    };
  } catch {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

// Main blog detail page component
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // Add validation before processing
  if (!slug || typeof slug !== 'string' || slug.length === 0) {
    notFound();
  }

  // Sanitize slug for security
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  if (sanitizedSlug.length === 0 || sanitizedSlug !== slug) {
    notFound();
  }

  try {
    // Load the blog data using auto-discovery
    const blog = await loadBlogData(sanitizedSlug);
    
    if (!blog) {
      notFound();
    }

    // Convert blog data to project data format for the universal component
    const adaptedBlog = {
      ...blog,
      technologies: blog.tags, // Map tags to technologies for compatibility
    };

    const heroImage = getBlogImages(sanitizedSlug).hero;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      url: `${siteUrl}/blog/${sanitizedSlug}`,
      datePublished: blog.publishDate,
      author: { '@type': 'Person', name: blog.author || 'Brett Snyder' },
      ...(heroImage && { image: `${siteUrl}${heroImage.src}` }),
    };

    // Render using the universal project detail component with blog content type
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectDetailUniversal project={adaptedBlog} contentType="blog" />
      </>
    );
  } catch (error) {
    console.error('Failed to load blog:', error);
    notFound();
  }
}

// Generate static paths for all available blogs at build time
export async function generateStaticParams() {
  // Use pre-generated static manifest instead of filesystem discovery for Vercel compatibility
  const { getStaticBlogParams } = await import('@/lib/generated/blogManifest');
  return getStaticBlogParams();
}
