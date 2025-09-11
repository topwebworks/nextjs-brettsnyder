"use client"

import React from 'react';
import { FileText, Calendar, Scale } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import { emailLinks } from '@/lib/config';

export default function TermsPage() {
  
  // Set document title and meta tags
  React.useEffect(() => {
    document.title = 'Terms & Conditions - RockitCode Portfolio';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms and conditions for using this RockitCode portfolio website. Please read these terms carefully before using our services.');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Terms & Conditions - RockitCode Portfolio');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Terms and conditions for using this RockitCode portfolio website. Please read these terms carefully before using our services.');
    }
  }, []);

  return (
    <>
      <AtmosphericBackground 
        variant="subtle" 
        orbCount={3} 
        includeBackground={true}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          minHeight: '100%',
          zIndex: -1
        }}
      />
      <Header />

      {/* Subtle Background Glass Panel */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        background: 'rgba(var(--glass-border-rgb), 0.2)',
        backdropFilter: 'var(--glass-backdrop-heavy)',
        borderRadius: '8px',
        border: '1px solid var(--glass-border-subtle)',
        opacity: '0.2',
        zIndex: 0
      }} 
      className='float-panel'
      />
      
      <main style={{
        minHeight: '100vh',
        paddingTop: 'clamp(2rem, 6vh, 4rem)',
        paddingBottom: 'clamp(2rem, 6vh, 4rem)',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto',
        zIndex: 1
      }}>
        
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 5vh, 3rem)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <Scale size={32} color="var(--text-accent)" />
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Terms & Conditions
            </h1>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            <Calendar size={16} />
            <span>Effective Date: January 1, 2025</span>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Please read these Terms and Conditions carefully before using this portfolio website.
          </p>
        </div>

        {/* Content Container */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 100%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.01) 10%)',
          borderRadius: '8px',
          border: '1px solid var(--glass-border-primary)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>

          {/* Agreement Section */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={20} color="var(--text-accent)" />
              Agreement to Terms
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              By accessing and using this portfolio website (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Use License
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              Permission is granted to temporarily download one copy of the materials on this portfolio website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>modify or copy the materials;</li>
              <li style={{ marginBottom: '0.5rem' }}>use the materials for any commercial purpose or for any public display (commercial or non-commercial);</li>
              <li style={{ marginBottom: '0.5rem' }}>attempt to decompile or reverse engineer any software contained on the website;</li>
              <li style={{ marginBottom: '0.5rem' }}>remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          {/* Content Ownership */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Content Ownership
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              All content on this portfolio website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of the site owner or its content suppliers and is protected by copyright laws. The compilation of all content on this site is the exclusive property of the site owner.
            </p>
          </section>

          {/* Portfolio Projects */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Portfolio Projects & Code
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              The portfolio projects displayed on this website are for demonstration purposes. While some projects may include open-source code or resources, commercial use of any project code, concepts, or designs requires explicit written permission. Each project may have its own specific license terms, which take precedence over these general terms.
            </p>
          </section>

          {/* User Conduct & Prohibited Uses */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              User Conduct & Prohibited Uses
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              You agree not to use this website for any unlawful purpose or any purpose prohibited under this clause. Prohibited uses include but are not limited to:
            </p>
            <ul style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>Using the website to violate any applicable laws or regulations</li>
              <li style={{ marginBottom: '0.5rem' }}>Attempting to gain unauthorized access to any portion of the website</li>
              <li style={{ marginBottom: '0.5rem' }}>Engaging in any data mining, data harvesting, or similar activities</li>
              <li style={{ marginBottom: '0.5rem' }}>Using the website to transmit malicious software or spam</li>
              <li style={{ marginBottom: '0.5rem' }}>Interfering with or disrupting the website&apos;s functionality</li>
            </ul>
          </section>

          {/* Termination */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Termination
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We reserve the right to terminate or restrict your access to this website at any time, without cause or notice. All provisions that should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          {/* Disclaimer */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Disclaimer
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              The materials on this portfolio website are provided on an &apos;as is&apos; basis. The site owner makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          {/* Limitations */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Limitations
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              In no event shall the site owner or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this portfolio website, even if the site owner or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Indemnification */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Indemnification
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              You agree to indemnify and hold harmless the site owner from any claims, damages, losses, costs, or expenses arising from your use of the website or violation of these Terms and Conditions.
            </p>
          </section>

          {/* Accuracy of Materials */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Accuracy of Materials
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              The materials appearing on this portfolio website could include technical, typographical, or photographic errors. The site owner does not warrant that any of the materials on its website are accurate, complete, or current. The site owner may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          {/* Links */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Links to Third-Party Sites
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              This portfolio website may contain links to third-party websites or services that are not owned or controlled by the site owner. The site owner has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          {/* Modifications */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Modifications
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              The site owner may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Severability */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Severability
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              If any provision of these Terms and Conditions is held invalid or unenforceable, the remaining provisions will remain in full force and effect. These Terms constitute the entire agreement between you and us regarding the website.
            </p>
          </section>

          {/* Force Majeure */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Force Majeure
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We shall not be liable for any failure to perform our obligations under these terms if such failure is due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, epidemic, government action, or technical failures.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Governing Law
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the site owner resides, and you irrevocably submit to the exclusive jurisdiction of the courts in that jurisdiction.
            </p>
          </section>

          {/* Contact Section */}
          <div style={{
            marginTop: '2.5rem',
            padding: '1.5rem',
            background: 'var(--glass-bg-subtle)',
            borderRadius: '8px',
            border: '1px solid var(--glass-border-subtle)'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Questions?
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              If you have any questions about these Terms & Conditions, please{' '}
              <a 
                href={emailLinks.connect()} 
                style={{
                  color: 'var(--text-accent)',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--text-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                contact us via email
              </a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
