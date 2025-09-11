// Error Page 

'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, ArrowLeft, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <>
      {/* Enhanced CSS for Production Glassmorphism Error Page */}
      <style jsx global>{`
        .error-page {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient-primary);
          color: var(--text-primary);
          padding: var(--space-4);
        }
        
        .error-content {
          text-align: center;
          max-width: 32rem;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding: var(--space-8);
          background: var(--glass-gradient-linear);
          backdropFilter: var(--glass-backdrop-medium);
          border-radius: var(--radius-xl);
          border: 1px solid var(--glass-border-primary);
          box-shadow: var(--shadow-glass);
          width: 100%;
        }
        
        .error-icon {
          color: var(--text-error);
          margin-bottom: var(--space-6);
          display: flex;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .error-title {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          margin-bottom: var(--space-4);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .error-description {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          margin-bottom: var(--space-8);
          line-height: var(--leading-relaxed);
          opacity: 0.9;
        }
        
        .error-details {
          text-align: left;
          margin: var(--space-6) 0;
          border: 1px solid var(--glass-border-primary);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--glass-bg-subtle);
          backdrop-filter: var(--glass-backdrop-light);
        }
        
        .error-details summary {
          background: var(--glass-bg-secondary);
          padding: var(--space-4);
          cursor: pointer;
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          border-bottom: 1px solid var(--glass-border-subtle);
          transition: var(--transition-fast);
        }
        
        .error-details summary:hover {
          background: var(--glass-bg-tertiary);
        }
        
        .error-details-content {
          padding: var(--space-4);
          background: var(--glass-bg-primary);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }
        
        .error-details pre {
          background: var(--glass-bg-secondary);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          overflow-x: auto;
          white-space: pre-wrap;
          margin: var(--space-2) 0;
          border: 1px solid var(--glass-border-subtle);
          color: var(--text-tertiary);
        }
        
        .error-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: var(--space-8);
        }
        
        .error-action-primary,
        .error-action-secondary,
        .error-action-tertiary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }
        
        .error-action-primary {
          min-width: 140px;
        }
        
        .error-action-secondary {
          min-width: 120px;
        }
        
        .error-action-tertiary {
          min-width: 110px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .error-content {
            padding: var(--space-6);
            margin: var(--space-2);
          }
          
          .error-title {
            font-size: var(--text-2xl);
          }
          
          .error-description {
            font-size: var(--text-base);
          }
          
          .error-actions {
            flex-direction: column;
            gap: var(--space-3);
            align-items: stretch;
          }
          
          .error-action-primary,
          .error-action-secondary,
          .error-action-tertiary {
            width: 100%;
            justify-content: center;
            min-width: unset;
          }
        }
        
        /* Focus styles for accessibility */
        .error-details summary:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>

      <div className="error-page">
        {/* Atmospheric Background Component */}
        <AtmosphericBackground variant="subtle" orbCount={2} />
        
        <Section 
          padding="xl"
          className="error-section"
        >
          <Container size="md">
            <div className="error-content">
              {/* Error Icon */}
              <div className="error-icon">
                <AlertTriangle size={64} strokeWidth={1.5} />
              </div>
              
              <h1 className="error-title">
                Something went wrong!
              </h1>
              
              <p className="error-description">
                We encountered an unexpected error. Please try again or go back to continue browsing.
              </p>

              {/* Development Error Details */}
              {process.env.NODE_ENV === 'development' && (
                <details className="error-details">
                  <summary>
                    Error Details (Development Only)
                  </summary>
                  <div className="error-details-content">
                    <div>
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.digest && (
                      <div style={{ marginTop: 'var(--space-2)' }}>
                        <strong>Digest:</strong> {error.digest}
                      </div>
                    )}
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <strong>Stack:</strong>
                      <pre>
                        {error.stack}
                      </pre>
                    </div>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="error-actions">
                <Button
                  variant="primary"
                  onClick={reset}
                  aria-label="Try again"
                  className="error-action-primary"
                  icon={RotateCcw}
                >
                  Try Again
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.location.href = '/'}
                  aria-label="Go to homepage"
                  className="error-action-secondary"
                  icon={Home}
                >
                  Go Home
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  aria-label="Go back"
                  className="error-action-tertiary"
                  icon={ArrowLeft}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
