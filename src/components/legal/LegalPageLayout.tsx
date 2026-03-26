import React from 'react';
import type { LucideIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import styles from './LegalPageLayout.module.css';

interface LegalPageLayoutProps {
  icon: LucideIcon;
  title: string;
  dateLabel: string;
  dateValue: string;
  intro: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  icon: Icon,
  title,
  dateLabel,
  dateValue,
  intro,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className={styles.page}>
      <AtmosphericBackground
        variant="subtle"
        orbCount={3}
        includeBackground={true}
        className={styles.background}
      />

      <Header />

      <div className={`${styles.floatPanel} float-panel`} />

      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.titleRow}>
            <Icon size={32} className={styles.heroIcon} />
            <h1 className={styles.title}>{title}</h1>
          </div>

          <div className={styles.metaRow}>
            <span>{dateLabel}:</span>
            <span>{dateValue}</span>
          </div>

          <p className={styles.intro}>{intro}</p>
        </header>

        <div className={styles.contentCard}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
