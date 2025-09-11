"use client"

import React from 'react';
import { Shield, Eye, Database, Lock, Globe } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import { emailLinks } from '@/lib/config';

export default function PrivacyPolicyPage() {
  
  // Set document title and meta tags
  React.useEffect(() => {
    document.title = 'Privacy Policy - RockitCode Portfolio';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy policy for this RockitCode portfolio website. Learn how we collect, use, and protect your personal information when you visit our site.');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Privacy Policy - RockitCode Portfolio');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Privacy policy for this RockitCode portfolio website. Learn how we collect, use, and protect your personal information when you visit our site.');
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
            <Shield size={32} color="var(--text-accent)" />
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Privacy Policy
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
            <Eye size={16} />
            <span>Last Updated: January 1, 2025</span>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit this RockitCode portfolio website.
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

          {/* Information We Collect */}
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
              <Database size={20} color="var(--text-accent)" />
              Information We Collect
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              When you visit this portfolio website, we automatically collect certain information about your device, including:
            </p>
            <ul style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              paddingLeft: '1.5rem',
              marginBottom: '1rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>Information about your web browser, IP address, time zone, and some of the cookies installed on your device</li>
              <li style={{ marginBottom: '0.5rem' }}>Details about your browsing behavior, including which pages you view and how you interact with the site</li>
              <li style={{ marginBottom: '0.5rem' }}>Device information such as screen size, operating system, and browser type</li>
            </ul>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We refer to this automatically collected information as &quot;Device Information&quot;. Additionally, if you contact us via email, we collect the information you provide, such as your name, email address, and message content.
            </p>
          </section>

          {/* How We Use Your Information */}
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
              <Globe size={20} color="var(--text-accent)" />
              How We Use Your Information
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              We use the Device Information that we collect to help us screen for potential risk and fraud, improve and optimize our website, and generate analytics to understand how visitors browse and interact with the site.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Contact information is used solely to respond to your inquiries and is never shared with third parties for marketing purposes.
            </p>
          </section>

          {/* Sharing Your Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Sharing Your Personal Information
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Cookies and Tracking Technologies
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <div style={{
              background: 'var(--glass-bg-subtle)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--glass-border-subtle)',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Types of cookies we use:
              </h4>
              <ul style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                paddingLeft: '1rem',
                margin: 0
              }}>
                <li style={{ marginBottom: '0.25rem' }}><strong>Essential cookies:</strong> Required for basic website functionality</li>
                <li style={{ marginBottom: '0.25rem' }}><strong>Analytics cookies:</strong> Help us understand how visitors use the site</li>
                <li style={{ marginBottom: '0.25rem' }}><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          {/* Data Security */}
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
              <Lock size={20} color="var(--text-accent)" />
              Data Security
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our site. All data transmission between your browser and our website is secured using SSL encryption.
            </p>
          </section>

          {/* International Data Transfers */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              International Data Transfers
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Data Retention */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Data Retention
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              When you contact us through this website, we maintain your contact information and correspondence for our records unless and until you ask us to delete this information. Anonymous analytics data may be retained indefinitely to help improve the website experience.
            </p>
          </section>

          {/* Children's Privacy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Children&apos;s Privacy
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              This website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          {/* Your Rights */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Your Rights
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. You also have the right to:
            </p>
            <ul style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>Request access to your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request correction of your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request erasure of your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Object to processing of your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request restriction of processing your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request transfer of your personal data</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Third-Party Services
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              This website may use third-party services for analytics, hosting, and other functionality. These services have their own privacy policies governing the use of your information:
            </p>
            <ul style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem',
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>Web hosting providers may have access to server logs</li>
              <li style={{ marginBottom: '0.5rem' }}>Analytics services may collect usage statistics</li>
              <li style={{ marginBottom: '0.5rem' }}>Content delivery networks may process requests</li>
            </ul>
          </section>

          {/* Changes to Privacy Policy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Changes to This Privacy Policy
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              We may update this privacy policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Contact Us
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please{' '}
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
          </section>

          {/* Summary Box */}
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
              Privacy Summary
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontSize: '0.95rem',
              margin: 0
            }}>
              We collect minimal information necessary to provide and improve our services, never sell your data to third parties, use industry-standard security measures, and respect your privacy rights. Your trust is important to us.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
