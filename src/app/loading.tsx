// Loading Page

"use client";

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';

export default function Loading() {
  return (
    <>
    
      <style jsx global>{`
        .loading-page {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient-primary);
          color: var(--text-primary);
          z-index: 9999;
        }
        
        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .loading-page {
            padding: var(--space-2);
          }
        }
      `}</style>

      <div className="loading-page">
        {/* Atmospheric Background Component */}
        <AtmosphericBackground variant="subtle" orbCount={3} />
        
        <div className="loading-content">
          {/* Loading Spinner Only */}
          <LoadingSpinner size="lg" />
        </div>
      </div>
    </>
  );
}
