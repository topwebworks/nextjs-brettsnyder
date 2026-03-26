"use client"

import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import { siteConfig, emailLinks } from '../../lib/config';
import ResumeButton from '../ui/ResumeButton';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundOrb} />

      <div className={styles.container}>
        <div className={styles.footerLayout}>
          <div className={styles.footerLeft}>
            <div className={styles.linksContainer}>
              <div className={styles.mainNavGroup}>
                {[
                  { name: 'About', href: '/about' },
                  { name: 'Projects', href: '/projects' },
                  { name: 'Blog', href: '/blog' }
                ].map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${styles.mainNavLink} ${styles[`animateLink${index + 1}` as keyof typeof styles]}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className={styles.legalLinksGroup}>
                {[
                  { name: 'Privacy', href: '/policy' },
                  { name: 'Terms', href: '/terms' },
                  { name: 'Cookies', href: '#', isTermlyLink: true }
                ].map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={
                      link.isTermlyLink
                        ? `termly-display-preferences ${styles.legalLink} ${styles[`animateLink${index + 4}` as keyof typeof styles]}`
                        : `${styles.legalLink} ${styles[`animateLink${index + 4}` as keyof typeof styles]}`
                    }
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.copyright}>
              © {currentYear} Brett Snyder. All rights reserved worldwide.
            </div>
          </div>

          <div className={styles.footerIcons}>
            <div className={styles.iconsContainer}>
              <a
                href={emailLinks.portfolio()}
                className={styles.socialIcon}
                aria-label="Email Brett Snyder"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub profile"
              >
                <Github size={16} strokeWidth={1.5} />
              </a>

              {siteConfig.showResume && (
                <ResumeButton aria-label="Open resume">
                  <span className={`${styles.socialIcon} ${styles.resumeIcon}`}>
                    <FileText size={16} strokeWidth={1.5} />
                  </span>
                </ResumeButton>
              )}
            </div>

            <div className={styles.builtWith}>
              <span className={styles.builtWithLabel}>Built with</span>
              {['Next.js', 'TypeScript', 'React', 'CSS3', 'Lucide Icons'].map((tech, index) => (
                <span
                  key={tech}
                  className={`${styles.techTag} ${styles[`animateTech${index + 1}` as keyof typeof styles]}`}
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
