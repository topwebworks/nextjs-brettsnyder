// 404 Not Found Page

'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';

export default function NotFound() {
  return (
    <>
      
      <style jsx global>{`
        .not-found-page {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient-primary);
          color: var(--text-primary);
          padding: var(--space-4);
        }
        
        .not-found-content {
          text-align: center;
          max-width: 28rem;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          background: var(--glass-gradient-linear);
          backdropFilter: var(--glass-backdrop-medium);
          border-radius: var(--radius-xl);
          border: 1px solid var(--glass-border-primary);
          box-shadow: var(--shadow-glass);
          padding: var(--space-6);
        }
        
        .not-found-icon {
          display: flex;
          justify-content: center;
          margin-bottom: var(--space-4);
          color: var(--text-secondary);
        }
        
        .not-found-number {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin-bottom: var(--space-3);
          line-height: 0.9;
          letter-spacing: -0.05em;
          text-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);
        }
        
        .not-found-title {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          margin-bottom: var(--space-3);
          line-height: 1.2;
        }
        
        .not-found-description {
          font-size: var(--text-base);
          color: var(--text-secondary);
          margin-bottom: var(--space-4);
          line-height: var(--leading-relaxed);
          font-weight: var(--font-weight-normal);
        }
        
        .not-found-links {
          background: var(--glass-bg-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          margin-bottom: var(--space-4);
          text-align: left;
          border: 1px solid var(--glass-border-subtle);
        }
        
        .not-found-links-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }
        
        .not-found-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .not-found-links-list li {
          margin-bottom: 0;
        }
        
        .not-found-link {
          color: var(--color-primary);
          text-decoration: none;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
        }
        
        .not-found-link:hover {
          color: var(--color-accent);
          transform: translateX(4px);
        }
        
        .not-found-actions {
          display: flex;
          gap: var(--space-2);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-3);
        }
        
        .not-found-tip {
          padding: var(--space-2);
          background: var(--glass-bg-subtle);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border-subtle);
        }
        
        .not-found-tip-text {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          margin: 0;
          line-height: var(--leading-relaxed);
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .not-found-content {
            padding: var(--space-4);
            margin: var(--space-2);
          }
          
          .not-found-number {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          
          .not-found-title {
            font-size: var(--text-lg);
          }
          
          .not-found-description {
            font-size: var(--text-sm);
          }
          
          .not-found-actions {
            flex-direction: column;
            align-items: center;
          }
        }
        
        /* Theme-specific enhancements */
        [data-theme="dark"] .not-found-number {
          text-shadow: 0 2px 12px rgba(var(--primary-rgb), 0.4);
        }
        
        [data-theme="light"] .not-found-number {
          text-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.2);
        }
      `}</style>

      <div className="not-found-page">
        {/* Atmospheric Background Component */}
        <AtmosphericBackground variant="subtle" orbCount={2} />
        
        <Section 
          padding="xl"
          className="not-found-section"
        >
          <Container size="md">
            <div className="not-found-content">
              {/* 404 Icon */}
              <div className="not-found-icon">
                <Search size={48} strokeWidth={1.5} />
              </div>
              
              {/* 404 Number */}
              <h1 className="not-found-number">
                404
              </h1>
              
              <h2 className="not-found-title">
                Page Not Found
              </h2>
              
              <p className="not-found-description">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              {/* Helpful Links */}
              <div className="not-found-links">
                <h3 className="not-found-links-title">
                  Try these instead:
                </h3>
                <ul className="not-found-links-list">
                  <li>
                    <Link href="/" className="not-found-link">
                      → Homepage
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="not-found-link">
                      → Projects Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="not-found-link">
                      → About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="not-found-actions">
                <Link href="/">
                  <Button 
                    variant="primary" 
                    icon={Home}
                    aria-label="Go to homepage"
                  >
                    Go Home
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  icon={ArrowLeft}
                  onClick={() => window.history.back()}
                  aria-label="Go back to previous page"
                >
                  Go Back
                </Button>
              </div>

              {/* Search Suggestion */}
              <div className="not-found-tip">
                <p className="not-found-tip-text">
                  <strong>Lost?</strong> Check the URL for typos or use the navigation menu to find what you&apos;re looking for.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
