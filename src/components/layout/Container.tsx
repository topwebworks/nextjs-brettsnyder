import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}


const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',      // ~672px - narrow content (blog posts, forms)
    md: 'max-w-4xl',      // ~896px - standard content 
    lg: 'max-w-6xl',      // ~1152px - portfolio showcase (default)
    xl: 'max-w-7xl',      // ~1280px - wide layouts
    full: 'max-w-full'    // Full width for special cases
  };

  return (
    <div 
      className={`
        container 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        ${sizeClasses[size]} 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
};

export default Container;
