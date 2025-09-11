/**
 * Button Component Types
 */

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

export interface ButtonVariantStyles {
  base: string;
  variants: {
    primary: string;
    secondary: string;
    ghost: string;
    outline: string;
  };
  sizes: {
    sm: string;
    md: string;
    lg: string;
  };
}
