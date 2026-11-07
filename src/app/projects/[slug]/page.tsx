// Dynamic Project Detail Page using Auto-Discovery
// Automatically loads any project from folder structure

import { notFound } from 'next/navigation';
import { getProject, getAllProjects, generateStaticParams as getStaticParams } from '@/lib/projectLoader';
import ProjectDetailUniversal from '@/components/ProjectDetailUniversal';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { getProjectImages } from '@/lib/generated/projectImageImports';
import { breadcrumbSchema, personSchema, shareImage, summaryAbstract } from '@/lib/profile';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

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
    
    const hero = getProjectImages(slug).hero;

    return {
      title: projectData.title,
      alternates: { canonical: `/projects/${slug}` },
      description: projectData.description,
      openGraph: {
        title: projectData.title,
        description: projectData.description,
        type: 'website',
        images: [hero ? { url: hero.src, width: hero.width, height: hero.height, alt: projectData.title } : shareImage],
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

  // Load the project data using auto-discovery (returns null on load errors)
  const project = await getProject(sanitizedSlug);

  if (!project) {
    notFound();
  }

  // Previous/next follow the /projects list order; only id + title go to the client
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.id === sanitizedSlug);
  const [prev, next] = [all[index - 1], all[index + 1]].map((p) => (index >= 0 && p ? { id: p.id, title: p.title } : null));

  const heroImage = getProjectImages(sanitizedSlug).hero;
  const isCyWire = sanitizedSlug === 'cywire';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isCyWire ? 'SoftwareApplication' : 'CreativeWork',
        name: project.title,
        description: project.description,
        url: `${siteUrl}/projects/${sanitizedSlug}`,
        author: personSchema,
        datePublished: project.publishDate,
        dateModified: project.updatedDate || project.publishDate,
        abstract: summaryAbstract(project.content?.keyAchievements),
        keywords: project.technologies,
        ...(heroImage && { image: `${siteUrl}${heroImage.src}` }),
        ...(isCyWire && {
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          featureList: project.content?.keyAchievements?.flatMap((a) => a.metrics ?? []),
        }),
      },
      breadcrumbSchema('Projects', 'projects', project.title),
    ],
  };

  // Render using the universal project detail component
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailUniversal project={project} contentType="project" prev={prev} next={next} />
    </>
  );
}

// Generate static paths for all available projects at build time
export async function generateStaticParams() {
  // Use auto-discovery to get all project IDs
  return await getStaticParams();
}
