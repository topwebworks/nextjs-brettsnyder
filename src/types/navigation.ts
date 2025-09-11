/**
 * Navigation Component Types
 */

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavigationProps {
  items: NavItem[];
  logo?: string;
  className?: string;
  sticky?: boolean;
}
