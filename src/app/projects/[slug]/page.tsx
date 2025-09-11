// Dynamic Project Detail Page using Auto-Discovery
// Automatically loads any project from folder structure

import { notFound } from 'next/navigation';
import { getProject, generateStaticParams as getStaticParams } from '@/lib/projectLoader';
import ProjectDetailUniversal from '@/components/ProjectDetailUniversal';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const projectData = await getProject(slug);
    
    if (!projectData) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.',
      };
    }
    
    return {
      title: `${projectData.title} - RockitCode`,
      description: projectData.description,
      openGraph: {
        title: projectData.title,
        description: projectData.description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: projectData.title,
        description: projectData.description,
      },
    };
  } catch {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
}

// Main project detail page component
export default async function ProjectPage({ params }: ProjectPageProps) {
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
    // Load the project data using auto-discovery
    const project = await getProject(sanitizedSlug);
    
    if (!project) {
      notFound();
    }

    // Render using the universal project detail component
    return <ProjectDetailUniversal project={project} contentType="project" />;
  } catch (error) {
    console.error('Failed to load project:', error);
    notFound();
  }
}

// Generate static paths for all available projects at build time
export async function generateStaticParams() {
  // Use auto-discovery to get all project IDs
  return await getStaticParams();
}
