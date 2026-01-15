"use client"

import React, { useState } from 'react';
import { NavigationProps } from '@/types/navigation';
import Button from '@/components/ui/Button';

export const Navigation: React.FC<NavigationProps> = ({
  items,
  logo = "Brett Snyder",
  className = '',
  sticky = true
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const baseClasses = `
    w-full bg-card/90 backdrop-blur-md border-b border-primary
    transition-all duration-300
    ${sticky ? 'sticky top-0 z-50' : ''}
    ${className}
  `;

  return (
    <nav className={baseClasses}>
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-xl font-bold text-primary">
              {logo}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  text-base font-medium transition-colors duration-200
                  hover:text-accent focus:text-accent focus:outline-none
                  ${item.isActive ? 'text-accent' : 'text-primary'}
                `}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button variant="primary" size="small">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary">
            <div className="space-y-4">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`
                    block text-base font-medium py-2 transition-colors duration-200
                    hover:text-accent focus:text-accent focus:outline-none
                    ${item.isActive ? 'text-accent' : 'text-primary'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Button variant="primary" size="medium" className="w-full">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
