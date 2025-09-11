// Utility functions for Portfolio

import { Project, Skill, WorkExperience, ThemeType } from './types';

// ===== THEME UTILITIES =====
export const themeUtils = {
  /**
   * Get system preferred theme
   */
  getSystemTheme: (): ThemeType => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * Save theme to localStorage
   */
  saveTheme: (theme: ThemeType): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio-theme', theme);
  },

  /**
   * Load theme from localStorage
   */
  loadTheme: (): ThemeType | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('portfolio-theme') as ThemeType | null;
  },

  /**
   * Apply theme to document
   */
  applyTheme: (theme: ThemeType): void => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
  }
};

// ===== PROJECT UTILITIES =====
export const projectUtils = {
  /**
   * Filter projects by category
   */
  filterByCategory: (projects: Project[], category: string): Project[] => {
    if (category === 'All') return projects;
    return projects.filter(project => project.category === category);
  },

  /**
   * Get featured projects
   */
  getFeatured: (projects: Project[]): Project[] => {
    return projects.filter(project => project.featured);
  },

  /**
   * Sort projects by publishDate (newest first)
   */
  sortByDate: (projects: Project[]): Project[] => {
    return [...projects].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  },

  /**
   * Get project categories
   */
  getCategories: (projects: Project[]): string[] => {
    const categories = new Set(projects.map(project => project.category));
    return ['All', ...Array.from(categories)];
  },

  /**
   * Get project technologies
   */
  getAllTechnologies: (projects: Project[]): string[] => {
    const technologies = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => technologies.add(tech));
    });
    return Array.from(technologies).sort();
  },

  /**
   * Search projects by title, description, or technology
   */
  searchProjects: (projects: Project[], query: string): Project[] => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return projects;

    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.longDescription.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm)
    );
  }
};

// ===== SKILL UTILITIES =====
export const skillUtils = {
  /**
   * Get skills by category
   */
  getByCategory: (skills: Skill[], category: string): Skill[] => {
    return skills.filter(skill => skill.category === category);
  },

  /**
   * Sort skills by proficiency level (highest first)
   */
  sortByLevel: (skills: Skill[]): Skill[] => {
    return [...skills].sort((a, b) => b.level - a.level);
  },

  /**
   * Get top skills by level
   */
  getTopSkills: (skills: Skill[], count: number = 5): Skill[] => {
    return skillUtils.sortByLevel(skills).slice(0, count);
  },

  /**
   * Calculate average skill level
   */
  getAverageLevel: (skills: Skill[]): number => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
  },

  /**
   * Get skill level label
   */
  getLevelLabel: (level: number): string => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    if (level >= 40) return 'Beginner';
    return 'Learning';
  },

  /**
   * Get skills by experience years
   */
  getByExperience: (skills: Skill[], minYears: number): Skill[] => {
    return skills.filter(skill => skill.years >= minYears);
  }
};

// ===== EXPERIENCE UTILITIES =====
export const experienceUtils = {
  /**
   * Sort experience by start date (newest first)
   */
  sortByDate: (experiences: WorkExperience[]): WorkExperience[] => {
    return [...experiences].sort((a, b) => {
      const dateA = new Date(a.startDate + '-01');
      const dateB = new Date(b.startDate + '-01');
      return dateB.getTime() - dateA.getTime();
    });
  },

  /**
   * Get current position
   */
  getCurrentPosition: (experiences: WorkExperience[]): WorkExperience | null => {
    return experiences.find(exp => exp.current) || null;
  },

  /**
   * Calculate total experience in years
   */
  getTotalExperience: (experiences: WorkExperience[]): number => {
    let totalMonths = 0;
    
    experiences.forEach(exp => {
      const startDate = new Date(exp.startDate + '-01');
      const endDate = exp.endDate ? new Date(exp.endDate + '-01') : new Date();
      
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average month length
      totalMonths += diffMonths;
    });

    return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
  },

  /**
   * Get all technologies from experience
   */
  getAllTechnologies: (experiences: WorkExperience[]): string[] => {
    const technologies = new Set<string>();
    experiences.forEach(exp => {
      exp.technologies.forEach(tech => technologies.add(tech));
    });
    return Array.from(technologies).sort();
  },

  /**
   * Format date range
   */
  formatDateRange: (startDate: string, endDate: string | null): string => {
    const start = new Date(startDate + '-01');
    const end = endDate ? new Date(endDate + '-01') : null;
    
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    };

    if (end) {
      return `${formatDate(start)} - ${formatDate(end)}`;
    } else {
      return `${formatDate(start)} - Present`;
    }
  }
};

// ===== DATE UTILITIES =====
export const dateUtils = {
  /**
   * Format date for display
   */
  formatDate: (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    const date = new Date(dateString + (dateString.includes('-') && dateString.split('-').length === 2 ? '-01' : ''));
    return date.toLocaleDateString('en-US', options || { 
      month: 'long', 
      year: 'numeric' 
    });
  },

  /**
   * Calculate age or duration
   */
  calculateAge: (startDate: string, endDate?: string): string => {
    const start = new Date(startDate + '-01');
    const end = endDate ? new Date(endDate + '-01') : new Date();
    
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return months > 0 ? `${years}y ${months}m` : `${years}y`;
    } else {
      return `${months}m`;
    }
  },

  /**
   * Check if date is current (within last month)
   */
  isCurrent: (endDate: string | null): boolean => {
    if (!endDate) return true;
    const end = new Date(endDate + '-01');
    const now = new Date();
    const diffTime = now.getTime() - end.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);
    return diffMonths <= 1;
  }
};

// ===== STRING UTILITIES =====
export const stringUtils = {
  /**
   * Truncate text with ellipsis
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  },

  /**
   * Convert string to URL slug
   */
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Capitalize first letter of each word
   */
  titleCase: (text: string): string => {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Extract initials from name
   */
  getInitials: (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }
};

// ===== ARRAY UTILITIES =====
export const arrayUtils = {
  /**
   * Shuffle array randomly
   */
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Get random items from array
   */
  getRandomItems: <T>(array: T[], count: number): T[] => {
    const shuffled = arrayUtils.shuffle(array);
    return shuffled.slice(0, count);
  },

  /**
   * Remove duplicates from array
   */
  unique: <T>(array: T[]): T[] => {
    return Array.from(new Set(array));
  },

  /**
   * Group array by key
   */
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const value = String(item[key]);
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
};

// ===== VALIDATION UTILITIES =====
export const validationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL format
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if string is not empty
   */
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  /**
   * Validate minimum length
   */
  hasMinLength: (value: string, minLength: number): boolean => {
    return value.trim().length >= minLength;
  }
};

// ===== PERFORMANCE UTILITIES =====
export const performanceUtils = {
  /**
   * Debounce function calls
   */
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function calls
   */
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// ===== ACCESSIBILITY UTILITIES =====
export const a11yUtils = {
  /**
   * Generate unique ID for form elements
   */
  generateId: (prefix: string = 'id'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Create ARIA label for screen readers
   */
  createAriaLabel: (base: string, context?: string): string => {
    return context ? `${base}, ${context}` : base;
  }
};

// ===== UTILITY COLLECTIONS =====
// Individual utilities are exported above for tree-shaking optimization
// Import specific utilities as needed: import { themeUtils, projectUtils } from '@/lib/utils'

const utils = {
  theme: themeUtils,
  project: projectUtils,
  skill: skillUtils,
  experience: experienceUtils,
  date: dateUtils,
  string: stringUtils,
  array: arrayUtils,
  validation: validationUtils,
  performance: performanceUtils,
  a11y: a11yUtils
};

export default utils;
