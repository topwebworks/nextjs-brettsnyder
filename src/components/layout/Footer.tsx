"use client"

import React from 'react';
import { Mail, FileText, Linkedin, Github } from 'lucide-react';
import { siteConfig, emailLinks, resumeLinks } from '../../lib/config';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Subtle Background Orb */}
      <div className={styles.backgroundOrb} />
      
      <div className={styles.container}>
        {/* Simple Layout: Single Row Links + Icons */}
        <div className={styles.footerLayout}>
          {/* Left Side - All Links in One Line + Copyright Below */}
          <div className={styles.footerLeft}>
            {/* Single Row: All Links */}
            <div className={styles.linksContainer}>
              {/* Main Navigation Links (Bold) - No Wrap Group */}
              <div className={styles.mainNavGroup}>
                {[
                  { name: 'About', href: '/about' },
                  { name: 'Projects', href: '/projects' },
                  { name: 'Blog', href: '/blog' }
                ].map((link, index) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className={`${styles.mainNavLink} ${styles[`animateLink${index + 1}` as keyof typeof styles]}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Legal/Compliance Links (Regular) - No Wrap Group */}
              <div className={styles.legalLinksGroup}>
                {[
                  { name: 'Privacy', href: '/policy' },
                  { name: 'Terms', href: '/terms' },
                  { name: 'Cookies', href: '#', isTermlyLink: true }
                ].map((link, index) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className={link.isTermlyLink ? `termly-display-preferences ${styles.legalLink} ${styles[`animateLink${index + 4}` as keyof typeof styles]}` : `${styles.legalLink} ${styles[`animateLink${index + 4}` as keyof typeof styles]}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      // e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright Below Links */}
            <div className={styles.copyright}>
              © 2025 Brett Snyder. All rights reserved worldwide. Non-commercial site.
            </div>
          </div>

          {/* Right Side - Contact Icons + Built With */}
          <div className={styles.footerIcons}>
            {/* Contact Icons */}
            <div className={styles.iconsContainer}>
              <a
                href={emailLinks.portfolio()}
                className={styles.socialIcon}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-medium)';
                  e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.4)';
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--accent-rgb), 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-subtle)';
                  e.currentTarget.style.borderColor = 'var(--glass-border-subtle)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-medium)';
                  e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.4)';
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--accent-rgb), 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-subtle)';
                  e.currentTarget.style.borderColor = 'var(--glass-border-subtle)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-medium)';
                  e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.4)';
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--accent-rgb), 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg-subtle)';
                  e.currentTarget.style.borderColor = 'var(--glass-border-subtle)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Github size={16} strokeWidth={1.5} />
              </a>
              
              {siteConfig.showResume && (
                <button
                  onClick={resumeLinks.download}
                  className={`${styles.socialIcon} ${styles.resumeIcon}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--glass-bg-medium)';
                    e.currentTarget.style.borderColor = 'rgba(var(--success-rgb), 0.4)';
                    e.currentTarget.style.color = 'rgba(var(--success-rgb), 1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--success-rgb), 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--glass-bg-subtle)';
                    e.currentTarget.style.borderColor = 'var(--glass-border-subtle)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <FileText size={16} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Built With Technologies */}
            <div className={styles.builtWith}>
              <span className={styles.builtWithLabel}>Built with</span>
              {['Next.js', 'TypeScript', 'React', 'CSS3', 'Lucide Icons'].map((tech, index) => (
                <span
                  key={tech}
                  className={`${styles.techTag} ${styles[`animateTech${index + 1}` as keyof typeof styles]}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'var(--glass-bg-medium)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'var(--glass-bg-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
