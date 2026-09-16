"use client";

import { useEffect, useState } from 'react';
import styles from './CookieConsent.module.css';

interface CookiePrefs {
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_NAME = 'brettsnyder-cookie-prefs';
const DEFAULT_PREFS: CookiePrefs = { analytics: false, marketing: false };

function readPrefs(): CookiePrefs | null {
  const row = document.cookie.split('; ').find((r) => r.startsWith(`${COOKIE_NAME}=`));
  if (!row) return null;
  try {
    return JSON.parse(decodeURIComponent(row.split('=')[1]));
  } catch {
    return null;
  }
}

function writePrefs(prefs: CookiePrefs) {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(prefs))}; expires=${expiry.toUTCString()}; path=/; SameSite=Lax`;
}

function applyConsent(prefs: CookiePrefs) {
  const update = {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'consent_update', consent: update });
  window.gtag?.('consent', 'update', update);
}

export default function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const saved = readPrefs();
    if (saved) {
      setPrefs(saved);
      applyConsent(saved);
    } else {
      setBannerVisible(true);
    }

    const openSettings = () => setSettingsOpen(true);
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  const save = (next: CookiePrefs) => {
    setPrefs(next);
    writePrefs(next);
    applyConsent(next);
    setBannerVisible(false);
    setSettingsOpen(false);
  };

  return (
    <>
      {bannerVisible && (
        <div className={styles.banner} role="dialog" aria-label="Cookie consent">
          <p className={styles.text}>
            We use cookies for analytics to understand how visitors use this site.{' '}
            <a href="/policy" className={styles.link}>Privacy policy</a>
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => save(DEFAULT_PREFS)}
            >
              Decline
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setSettingsOpen(true)}
            >
              Customize
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => save({ analytics: true, marketing: true })}
            >
              Accept all
            </button>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className={styles.overlay} onClick={() => setSettingsOpen(false)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-label="Cookie settings"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Cookie settings</h2>
            <p className={styles.text}>Choose which cookies you allow. Essential cookies are always on.</p>

            <div className={styles.prefRow}>
              <div>
                <p className={styles.prefName}>Essential</p>
                <p className={styles.prefDescription}>Required for the site to work. Cannot be disabled.</p>
              </div>
              <span className={styles.alwaysOn}>Always on</span>
            </div>

            <div className={styles.prefRow}>
              <div>
                <p className={styles.prefName}>Analytics</p>
                <p className={styles.prefDescription}>Helps understand how visitors use the site (Google Analytics).</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                />
                <span className={styles.toggleTrack} />
              </label>
            </div>

            <div className={styles.prefRow}>
              <div>
                <p className={styles.prefName}>Marketing</p>
                <p className={styles.prefDescription}>Used to measure ad effectiveness and deliver relevant ads.</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                />
                <span className={styles.toggleTrack} />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.secondaryButton} onClick={() => save(DEFAULT_PREFS)}>
                Reject all
              </button>
              <button type="button" className={styles.primaryButton} onClick={() => save(prefs)}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
