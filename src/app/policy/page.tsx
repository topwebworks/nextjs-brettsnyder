import type { Metadata } from 'next';
import { Shield, Database, Globe, Lock } from 'lucide-react';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import styles from '@/components/legal/LegalPageLayout.module.css';
import { emailLinks } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy | Brett Snyder Portfolio',
  description: 'Privacy policy for the Brett Snyder portfolio website.',
  openGraph: {
    title: 'Privacy Policy | Brett Snyder Portfolio',
    description: 'Privacy policy for the Brett Snyder portfolio website.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      icon={Shield}
      title="Privacy Policy"
      dateLabel="Last updated"
      dateValue="January 1, 2025"
      intro="This Privacy Policy describes how personal information is collected, used, and protected when you visit the Brett Snyder portfolio website."
    >
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWithIcon}`}>
          <Database size={20} className={styles.sectionIcon} />
          Information We Collect
        </h2>
        <p className={styles.text}>
          When you visit this portfolio website, certain information about your device may be collected automatically, including:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Information about your browser, IP address, time zone, and installed cookies</li>
          <li className={styles.listItem}>Details about your browsing behavior, including which pages you view and how you interact with the site</li>
          <li className={styles.listItem}>Device information such as screen size, operating system, and browser type</li>
        </ul>
        <p className={styles.text}>
          This automatically collected information is referred to as Device Information. If you contact me by email, the details you provide such as your name, email address, and message are also retained.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWithIcon}`}>
          <Globe size={20} className={styles.sectionIcon} />
          How Information Is Used
        </h2>
        <p className={styles.text}>
          Device Information is used to help screen for potential risk and fraud, improve website performance, and better understand how visitors browse and interact with the site.
        </p>
        <p className={styles.text}>
          Contact information is used only to respond to inquiries and is not shared with third parties for marketing purposes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sharing Personal Information</h2>
        <p className={styles.text}>
          Personal information is not sold, traded, or otherwise transferred to third parties, except when a trusted service provider is needed to operate the site or when disclosure is required to comply with the law or protect rights and safety.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cookies and Tracking Technologies</h2>
        <p className={styles.text}>
          Cookies and similar tracking technologies may be used to track activity on the website and store certain information. Cookies are small files that may include an anonymous unique identifier.
        </p>
        <div className={styles.callout}>
          <h3 className={styles.calloutTitle}>Types of cookies used</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}><strong>Essential cookies:</strong> required for basic site functionality</li>
            <li className={styles.listItem}><strong>Analytics cookies:</strong> help measure how visitors use the site</li>
            <li className={styles.listItem}><strong>Preference cookies:</strong> remember settings and preferences</li>
          </ul>
        </div>
        <p className={styles.text}>
          Your browser can be configured to refuse cookies or alert you when a cookie is being sent. Some parts of the website may not function properly if cookies are disabled.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWithIcon}`}>
          <Lock size={20} className={styles.sectionIcon} />
          Data Security
        </h2>
        <p className={styles.text}>
          Appropriate safeguards are used to protect against unauthorized access, alteration, disclosure, or destruction of personal information. Data transmitted between your browser and this website is protected with standard web security measures.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>International Data Transfers</h2>
        <p className={styles.text}>
          Information may be transferred to and processed in countries other than your own. When this happens, reasonable safeguards are used to protect personal information in line with this policy.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data Retention</h2>
        <p className={styles.text}>
          Contact information and correspondence are retained for record-keeping unless deletion is requested. Anonymous analytics information may be retained to help improve the website experience.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Children&apos;s Privacy</h2>
        <p className={styles.text}>
          This website is not intended for children under 13 years of age, and personal information is not knowingly collected from children under 13.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Rights</h2>
        <p className={styles.text}>
          If you are a resident of certain jurisdictions, including the European Economic Area, you may have rights to access, correct, update, delete, object to processing of, or restrict the use of your personal information.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Request access to your personal data</li>
          <li className={styles.listItem}>Request correction of your personal data</li>
          <li className={styles.listItem}>Request erasure of your personal data</li>
          <li className={styles.listItem}>Object to processing of your personal data</li>
          <li className={styles.listItem}>Request restriction of processing your personal data</li>
          <li className={styles.listItem}>Request transfer of your personal data</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Third-Party Services</h2>
        <p className={styles.text}>
          This site may rely on third-party services for hosting, analytics, and delivery infrastructure. Those services may process limited technical information needed to operate the website.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Web hosting providers may access server logs</li>
          <li className={styles.listItem}>Analytics tools may collect usage statistics</li>
          <li className={styles.listItem}>Content delivery networks may process requests</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
        <p className={styles.text}>
          This Privacy Policy may be updated from time to time to reflect operational, legal, or regulatory changes. Updates will be posted on this page with a revised date.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={styles.text}>
          Questions about this Privacy Policy can be sent by{' '}
          <a href={emailLinks.connect()} className={styles.link}>
            email
          </a>.
        </p>
      </section>

      <div className={styles.summaryBox}>
        <h3 className={styles.summaryTitle}>Privacy Summary</h3>
        <p className={styles.text}>
          Minimal information is collected to operate and improve the site, personal information is never sold, and reasonable safeguards are used to protect visitor data.
        </p>
      </div>
    </LegalPageLayout>
  );
}
