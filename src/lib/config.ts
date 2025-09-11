/**
 * Site Configuration
 * 
 * Only contains values that are actually used in the application.
 * All values come from environment variables - no fallbacks to avoid confusion.
 */

export const siteConfig = {
  // Contact Information (used in Footer and email obfuscation)
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  
  // Site URL (used for canonical URLs)
  url: process.env.NEXT_PUBLIC_SITE_URL,
  
  // Resume File (obfuscated path for bot protection)
  resumePath: process.env.NEXT_PUBLIC_RESUME_PATH,
  
  // This code should not be changed from false. Only toggle env variable.
  showResume: process.env.NEXT_PUBLIC_SHOW_RESUME !== 'false'
};

/**
 * Generate bot-resistant resume download links
 * Using DOCX format as preferred by most employers and ATS systems
 */
export const resumeLinks = {
  // Client-side dynamic download (most secure)
  download: () => {
    const path = siteConfig.resumePath;
    if (!path) {
      console.error('NEXT_PUBLIC_RESUME_PATH not configured');
      return;
    }
    
    // Extract filename from path (e.g., '/my_resume.docx' -> 'my_resume.docx')
    const filename = path.split('/').pop();
    if (!filename) {
      console.error('Invalid resume path - could not extract filename:', path);
      return;
    }
    
    // Create dynamic download
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  
  // Static path for SSR-compatible links (still obfuscated via env)
  getPath: () => {
    return siteConfig.resumePath || '#';
  },
  
  // Client-side URL with origin (for sharing, etc.)
  getFullUrl: () => {
    if (!siteConfig.resumePath) return '#';
    if (typeof window === 'undefined') {
      return siteConfig.resumePath; // Fallback for SSR
    }
    return `${window.location.origin}${siteConfig.resumePath}`;
  }
};

/**
 * Generate bot-resistant email links
 * These are dynamically constructed to avoid static scraping
 */
export const emailLinks = {
  portfolio: () => {
    if (!siteConfig.email) return '#';
    const e = siteConfig.email;
    const s = "Hello%20from%20your%20portfolio&body=Hi%20there,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20say%20hello...";
    return `${'mailto'}:${e}?${'subject'}=${s}`;
  },
  blog: () => {
    if (!siteConfig.email) return '#';
    const e = siteConfig.email;
    const s = "Loved%20your%20blog%20post&body=Hi%20there,%0D%0A%0D%0AI%20really%20enjoyed%20reading%20your%20blog%20post%20about...";
    return `${'mailto'}:${e}?${'subject'}=${s}`;
  },
  connect: () => {
    if (!siteConfig.email) return '#';
    const e = siteConfig.email;
    const s = "Let's%20Connect&body=Hi%20there,%0D%0A%0D%0AI'd%20love%20to%20connect%20and%20chat%20about...";
    return `${'mailto'}:${e}?${'subject'}=${s}`;
  },
  project: () => {
    if (!siteConfig.email) return '#';
    const e = siteConfig.email;
    const s = "Interested%20in%20your%20projects&body=Hi%20there,%0D%0A%0D%0AI%20saw%20your%20projects%20and%20would%20love%20to%20learn%20more%20about...";
    return `${'mailto'}:${e}?${'subject'}=${s}`;
  },
  workTogether: () => {
    if (!siteConfig.email) return '#';
    const e = siteConfig.email;
    const s = "Hello%20and%20thanks%20for%20sharing&body=Hi%20there,%0D%0A%0D%0AThanks%20for%20sharing%20your%20knowledge%20and%20projects...";
    return `${'mailto'}:${e}?${'subject'}=${s}`;
  }
};

/**
 * Generate canonical URLs for blog posts
 */
export function getCanonicalUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/**
 * Get obfuscated email for display (replaces @ with [at])
 */
export function getDisplayEmail(): string {
  if (!siteConfig.email) {
    return "Email not configured";
  }
  return siteConfig.email.replace('@', ' [at] ').replace('.', ' [dot] ');
}
