"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, FileText } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ResumeButton from '@/components/ui/ResumeButton';
import { emailLinks, siteConfig } from '@/lib/config';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll detection for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Full drawer menu items (many items for drawer)  
  const drawerNavigation = [
    { href: '/', label: 'Home', icon: null },
    { href: '/about', label: 'About', icon: null },
    { href: '/projects', label: 'Projects', icon: null },
    { href: '/tools', label: 'Tools', icon: null },
    { href: '/blog', label: 'Blog', icon: null },
    { href: emailLinks.portfolio(), label: 'Email Me', icon: Mail, external: true },
  ];

  return (
    <>
      {/* Sticky Header - Elegant Glassmorphism */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : styles.headerTransparent}`}>
        {/* 1400px max-width centered content */}
        <div className={styles.container}>
          {/* Left Side: Logo + Main Menu Items */}
          <div className={styles.leftSection}>
            {/* Logo */}
            <Link 
              href="/" 
              className={styles.logo}
            >
              Brett Snyder
            </Link>


          </div>

          {/* Right Side: Theme Toggle + Mobile Menu */}
          <div className={styles.rightSection}>
            {/* Theme Toggle */}
            <ThemeToggle size="sm" />
            
            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : styles.mobileDrawerClosed}`}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>
            Menu
          </h2>
          
          <button
            className={styles.drawerCloseButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Navigation */}
        <nav className={styles.drawerNav}>
          {drawerNavigation.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              download={link.label === 'Resume' ? 'resume-brett-snyder.pdf' : undefined}
              className={`${styles.drawerNavLink} ${isMobileMenuOpen ? styles.drawerLinkAnimated : styles.drawerLinkHidden} ${styles[`animateDelay${Math.min(index, 6)}` as keyof typeof styles]}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon && <link.icon size={18} strokeWidth={1.5} />}
              {link.label}
            </a>
          ))}
          
          {/* Resume Link with Modal */}
          {siteConfig.showResume && (
            <ResumeButton>
              <a
                className={`${styles.drawerNavLink} ${isMobileMenuOpen ? styles.drawerLinkAnimated : styles.drawerLinkHidden} ${styles[`animateDelay${drawerNavigation.length}` as keyof typeof styles]}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText size={18} strokeWidth={1.5} />
                Resume
              </a>
            </ResumeButton>
          )}
        </nav>

        {/* Drawer Footer */}
        <div className={styles.drawerFooter}>
          <p className={styles.drawerFooterText}>
            © 2025 Brett Snyder
          </p>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={`${styles.backdrop} ${isMobileMenuOpen ? styles.backdropVisible : styles.backdropHidden}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
