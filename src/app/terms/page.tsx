import type { Metadata } from 'next';
import { Scale, FileText } from 'lucide-react';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import styles from '@/components/legal/LegalPageLayout.module.css';
import { emailLinks } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Brett Snyder Portfolio',
  description: 'Terms and conditions for using the Brett Snyder portfolio website.',
  openGraph: {
    title: 'Terms & Conditions | Brett Snyder Portfolio',
    description: 'Terms and conditions for using the Brett Snyder portfolio website.',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      icon={Scale}
      title="Terms & Conditions"
      dateLabel="Effective date"
      dateValue="January 1, 2025"
      intro="Please read these Terms and Conditions carefully before using the Brett Snyder portfolio website."
    >
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWithIcon}`}>
          <FileText size={20} className={styles.sectionIcon} />
          Agreement to Terms
        </h2>
        <p className={styles.text}>
          By accessing and using this portfolio website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use the site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Use License</h2>
        <p className={styles.text}>
          Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only. Under this license, you may not:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>modify or copy the materials</li>
          <li className={styles.listItem}>use the materials for any commercial purpose or public display</li>
          <li className={styles.listItem}>attempt to decompile or reverse engineer any software on the website</li>
          <li className={styles.listItem}>remove copyright or proprietary notices from the materials</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Content Ownership</h2>
        <p className={styles.text}>
          All content on this website, including text, graphics, logos, images, downloads, and software, is the property of the site owner or the respective content owners and is protected by applicable copyright and intellectual property laws.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Portfolio Projects & Code</h2>
        <p className={styles.text}>
          Portfolio projects shown on this site are for demonstration purposes. Some projects may include open-source materials, but commercial use of project code, concepts, or designs requires explicit written permission unless a separate license states otherwise.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>User Conduct & Prohibited Uses</h2>
        <p className={styles.text}>
          You agree not to use the website for unlawful purposes or in ways that interfere with its operation. Prohibited uses include:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>violating applicable laws or regulations</li>
          <li className={styles.listItem}>attempting to gain unauthorized access to any portion of the website</li>
          <li className={styles.listItem}>engaging in scraping, data harvesting, or similar automated collection</li>
          <li className={styles.listItem}>transmitting malicious software or spam</li>
          <li className={styles.listItem}>interfering with or disrupting site functionality</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Termination</h2>
        <p className={styles.text}>
          Access to the website may be restricted or terminated at any time, without notice, if misuse or harmful activity is detected.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Disclaimer</h2>
        <p className={styles.text}>
          The materials on this website are provided on an &quot;as is&quot; basis. No warranties, express or implied, are made regarding the accuracy, completeness, or suitability of the materials.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Limitations</h2>
        <p className={styles.text}>
          In no event shall the site owner be liable for damages arising out of the use or inability to use the materials on this website, even if advised of the possibility of such damages.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Indemnification</h2>
        <p className={styles.text}>
          You agree to indemnify and hold harmless the site owner from claims, damages, losses, costs, or expenses arising from your use of the website or violation of these terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accuracy of Materials</h2>
        <p className={styles.text}>
          Materials on this website may include technical, typographical, or photographic errors. Content may be updated, changed, or removed at any time without notice.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Links to Third-Party Sites</h2>
        <p className={styles.text}>
          This website may link to third-party websites or services. The site owner is not responsible for their content, privacy policies, or practices.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Modifications</h2>
        <p className={styles.text}>
          These terms may be revised at any time without notice. By continuing to use the website, you agree to the current version of the Terms and Conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Severability</h2>
        <p className={styles.text}>
          If any provision of these Terms and Conditions is held invalid or unenforceable, the remaining provisions will remain in full force and effect.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Force Majeure</h2>
        <p className={styles.text}>
          The site owner is not liable for delays or failure to perform obligations caused by circumstances beyond reasonable control, including natural disasters, war, terrorism, epidemics, government action, or technical failures.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Governing Law</h2>
        <p className={styles.text}>
          These Terms and Conditions are governed by the laws of the jurisdiction in which the site owner resides, without regard to conflict-of-law principles.
        </p>
      </section>

      <div className={styles.summaryBox}>
        <h3 className={styles.summaryTitle}>Questions?</h3>
        <p className={styles.text}>
          Questions about these Terms &amp; Conditions can be sent by{' '}
          <a href={emailLinks.connect()} className={styles.link}>
            email
          </a>.
        </p>
      </div>
    </LegalPageLayout>
  );
}
