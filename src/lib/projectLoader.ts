// Auto-Discovery Project Loader - OPTIMIZED BUILD VERSION
// Uses pre-generated manifest to eliminate filesystem scanning during builds


import fs from 'fs';
import path from 'path';
import { ProjectData } from '@/lib/types/project';

// Re-export the type for convenience
export type { ProjectData };

const PROJECTS_DIR = path.join(process.cwd(), 'src/app/projects/content');

// OPTIMIZED: Use pre-generated manifest or fallback to filesystem scanning
export async function discoverProjects(silent = false): Promise<string[]> {
  // FAST PATH: Try to use pre-generated manifest (no filesystem calls)
  try {
    const projectManifest = await import('@/lib/generated/projectManifest');
    const projectIds = projectManifest.getProjectIds();
    if (!silent) {
      console.log('Discovered project folders:', projectIds);
    }
    return [...projectIds]; // Convert readonly to mutable array
  } catch {
    // FALLBACK: Filesystem scanning (only during development or if manifest missing)
    if (!silent) {
      console.log('⚠️  Using filesystem fallback - consider running npm run generate-project-data');
    }
    try {
      const entries = await fs.promises.readdir(PROJECTS_DIR, { withFileTypes: true });
      const projectFolders = entries
        .filter((entry: fs.Dirent) => entry.isDirectory())
        .map((entry: fs.Dirent) => entry.name);
      
      if (!silent) {
        console.log('Discovered project folders:', projectFolders);
      }
      return projectFolders;
    } catch (error) {
      console.error('Failed to discover projects:', error);
      return [];
    }
  }
}

// Load project data from project.json
export async function loadProjectData(projectId: string): Promise<ProjectData> {
  try {
    const projectDir = path.join(PROJECTS_DIR, projectId);
    const dataPath = path.join(projectDir, 'project.json');
    
    const rawData = await fs.promises.readFile(dataPath, 'utf-8');
    const projectData = JSON.parse(rawData) as Omit<ProjectData, 'id' | 'images'>;

    // OPTIMIZED: Use pre-generated static image imports (no filesystem scanning)
    // The images are already processed during build script
    return {
      ...projectData,
      id: projectId,
      images: {}, // Images handled by static imports in getProjectImages()
    };
  } catch (error) {
    console.error(`Failed to load project data for ${projectId}:`, error);
    throw new Error(`Project data not found: ${projectId}`);
  }
}



// Get all projects for listing page
export async function getAllProjects(): Promise<ProjectData[]> {
  const projectIds = await discoverProjects(); // Keep logging for listing pages
  const projects: ProjectData[] = [];
  
  for (const projectId of projectIds) {
    try {
      const projectData = await loadProjectData(projectId);
      projects.push(projectData);
    } catch (error) {
      console.warn(`Skipping project ${projectId}:`, error);
    }
  }
  
  return projects.sort((a, b) => {
    // Featured projects first, then by publishDate (newest first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

// Get project by ID for detail page
export async function getProject(projectId: string): Promise<ProjectData | null> {
  try {
    return await loadProjectData(projectId);
  } catch {
    return null;
  }
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<ProjectData[]> {
  const allProjects = await getAllProjects();
  if (category === 'All' || !category) {
    return allProjects;
  }
  return allProjects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
}

// Get featured projects
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured);
}

// Generate static params for Next.js
export async function generateStaticParams() {
  try {
    // Use pre-generated static manifest for better reliability
    const { getStaticProjectParams } = await import('@/lib/generated/projectManifest');
    return getStaticProjectParams();
  } catch {
    // Fallback to filesystem discovery with validation
    try {
      const projectIds = await discoverProjects(true);
      
      // Add validation and sanitization
      return projectIds
        .filter(Boolean)
        .filter(id => typeof id === 'string' && id.length > 0)
        .map(id => ({ 
          slug: String(id).replace(/[^a-zA-Z0-9-_]/g, '')
        }))
        .filter(({ slug }) => slug.length > 0);
    } catch (error) {
      console.error('Error generating static params for projects:', error);
      return [];
    }
  }
}
