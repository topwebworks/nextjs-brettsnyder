// TypeScript interfaces for Portfolio Data


// ===== PROJECT INTERFACES =====
export interface ProjectLinks {
  live?: string;
  github?: string;
  case_study?: string;
  npm?: string;
  demo_video?: string;
}

export interface ProjectMetrics {
  conversion_increase?: string;
  page_load_time?: string;
  lighthouse_score?: string;
  active_users?: string;
  performance_score?: string;
  uptime?: string;
  npm_downloads?: string;
  test_coverage?: string;
  components_count?: string;
  data_points?: string;
  chart_types?: string;
  response_time?: string;
  screens_count?: string;
  animation_fps?: string;
  platform_support?: string;
}

export interface KeyAchievement {
  type: 'performance' | 'technical' | 'impact';
  icon: string;
  title: string;
  description: string;
  metrics: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Data Visualization' | 'Open Source' | 'UI/UX';
  status: 'Completed' | 'In Progress' | 'Active Development' | 'Maintenance';
  featured: boolean;
  publishDate: string;
  image: string;
  gallery: string[];
  links: ProjectLinks;
  metrics: ProjectMetrics;
  challenges: string[];
  solutions: string[];
}

export interface ProjectsData {
  projects: Project[];
}

// ===== SKILLS INTERFACES =====
export interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  category: 'Framework' | 'Language' | 'Tool' | 'Database' | 'Platform' | 'Methodology' | 'Library';
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsSummary {
  totalSkills: number;
  averageLevel: number;
  topSkills: string[];
  learningNext: string[];
  certifications: string[];
}

export interface SkillsData {
  skillCategories: SkillCategory[];
  summary: SkillsSummary;
}

// ===== EXPERIENCE INTERFACES =====
export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  startDate: string; // YYYY-MM format
  endDate: string | null; // YYYY-MM format or null for current
  current: boolean;
  duration: string; // Human readable duration
  logo: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string; // YYYY-MM format
  gpa?: string;
  logo: string;
  description: string;
  coursework: string[];
  projects: string[];
  activities: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM format
  expiryDate?: string | null; // YYYY-MM format or null for no expiry
  credentialId: string;
  credentialUrl?: string;
  logo: string;
  status: 'Active' | 'Expired' | 'Pending';
}

export interface ExperienceSummary {
  totalExperience: string;
  currentRole: string;
  keySkills: string[];
  industries: string[];
  teamSizes: string[];
}

export interface ExperienceData {
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  summary: ExperienceSummary;
}

// ===== THEME INTERFACES =====
export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

// ===== COMPONENT INTERFACES =====
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export interface ContainerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

export interface SectionProps extends BaseComponentProps {
  background?: 'primary' | 'secondary' | 'tertiary' | 'elevated' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  spacing?: 'tight' | 'normal' | 'loose' | 'none';
}

export interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  style?: React.CSSProperties;
}

export interface ThemeToggleProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

// ===== NAVIGATION INTERFACES =====
export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface HeaderProps extends BaseComponentProps {
  fixed?: boolean;
  transparent?: boolean;
  logo?: string;
  navigation?: NavigationLink[];
}

export interface FooterProps extends BaseComponentProps {
  links?: NavigationLink[];
  social?: SocialLink[];
  copyright?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
}

// ===== FORM INTERFACES =====
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea' | 'tel' | 'url';
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

// ===== SEO INTERFACES =====
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// ===== ANALYTICS INTERFACES =====
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// ===== ERROR INTERFACES =====
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorPageProps {
  statusCode: number;
  title: string;
  message: string;
  showReload?: boolean;
  showHome?: boolean;
}

// ===== LOADING INTERFACES =====
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface SkeletonProps extends BaseComponentProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

// ===== ANIMATION INTERFACES =====
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  config?: AnimationConfig;
}

// ===== UTILITY TYPES =====
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// ===== API INTERFACES =====
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// ===== EXPORT ALL TYPES =====
// All interfaces and types are exported individually above for tree-shaking optimization
// Import specific types as needed: import { Project, Skill, ThemeType } from '@/lib/types'
