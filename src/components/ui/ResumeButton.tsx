'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Download, Printer, X } from 'lucide-react';
import Button from './Button';
import styles from './ResumeButton.module.css';

interface ResumeButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: 'download' | 'file';
  showText?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * ResumeButton Component
 * 
 * Handles both HTML resume viewing and PDF generation via print
 * Replaces the old download pattern with a modal viewer + print option
 */
export const ResumeButton: React.FC<ResumeButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon = 'download',
  showText = true,
  children,
  className = ''
}) => {
  const [showModal, setShowModal] = useState(false);
  const resumeHtmlPath = '/resume-brett-snyder.html';
  const resumePdfPath = '/resume-brett-snyder.pdf';

  const openResume = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const downloadPDF = () => {
    // Direct PDF download
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = 'resume-brett-snyder.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printResume = () => {
    // Open HTML in new window for printing
    const printWindow = window.open(resumeHtmlPath, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const IconComponent = icon === 'file' ? FileText : Download;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        icon={IconComponent}
        onClick={openResume}
        className={className}
      >
        {showText && (children || 'Download Resume')}
      </Button>

      {showModal && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Resume</h2>
              <div className={styles.modalActions}>
                <Button
                  variant="primary"
                  size="small"
                  icon={Download}
                  onClick={downloadPDF}
                >
                  <span className={styles.buttonText}>Download PDF</span>
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  icon={Printer}
                  onClick={printResume}
                >
                  <span className={styles.buttonText}>Print</span>
                </Button>
                <button
                  onClick={closeModal}
                  className={styles.closeButton}
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className={styles.modalBody}>
              <iframe
                src={resumeHtmlPath}
                className={styles.resumeFrame}
                title="Resume"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ResumeButton;
