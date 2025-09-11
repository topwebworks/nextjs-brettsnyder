import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'default' | 'elevated' | 'accent' | 'none';
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children,
  spacing = 'lg',
  background = 'default',
  className = '',
  id
}) => {
  const spacingClasses = {
    none: '',
    xs: 'py-8',           // Small sections, tight spacing
    sm: 'py-12',          // Medium sections
    md: 'py-16',          // Standard sections  
    lg: 'py-20 md:py-24', // Large sections (default)
    xl: 'py-24 md:py-32'  // Hero sections, major blocks
  };

  const backgroundClasses = {
    default: 'bg-primary',
    elevated: 'bg-elevated',
    accent: 'bg-accent text-primary-inverted',
    none: ''
  };

  return (
    <section 
      id={id}
      className={`
        ${spacingClasses[spacing]}
        ${backgroundClasses[background]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </section>
  );
};

export default Section;
