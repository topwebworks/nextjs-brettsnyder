'use client';

import { useEffect, useRef, useState } from 'react';
import Button, { type ButtonSize, type ButtonVariant } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ButtonDemo.module.css';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost'];

export default function ButtonDemo() {
  const { theme, setTheme } = useTheme();
  const [size, setSize] = useState<ButtonSize>('medium');
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('Hover, press, or use Tab to explore the buttons.');
  const previewRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ height: '—', radius: '—', transition: '—', hoverLift: '—' });

  useEffect(() => {
    const button = previewRef.current?.querySelector('button');
    if (!button) return;
    const readStats = () => {
      const css = getComputedStyle(button);
      setStats({
        height: `${Math.round(parseFloat(css.height))} px`,
        radius: `${Math.round(parseFloat(css.borderTopLeftRadius))} px`,
        transition: `${Math.round(parseFloat(css.transitionDuration) * 1000)} ms`,
        hoverLift: `${parseFloat(css.getPropertyValue('--button-hover-lift'))} px`,
      });
    };
    const observer = new ResizeObserver(readStats);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    observer.observe(button);
    button.addEventListener('transitionend', readStats);
    motion.addEventListener('change', readStats);
    return () => {
      observer.disconnect();
      button.removeEventListener('transitionend', readStats);
      motion.removeEventListener('change', readStats);
    };
  }, [size, disabled, theme]);

  return (
    <main className={styles.demo}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Portfolio design system / Component 01</p>
        <h1>Button</h1>
        <p>Three variants, rendered with the same component used throughout this site.</p>
      </header>

      <div className={styles.controls}>
        <fieldset>
          <legend>Theme</legend>
          <div className={styles.segmented}>
            {(['dark', 'light'] as const).map(value => (
              <button key={value} type="button" data-theme-option={value} aria-pressed={theme === value} onClick={() => setTheme(value)}>{value}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Size</legend>
          <div className={styles.segmented}>
            {(['small', 'medium', 'large'] as const).map(value => (
              <button key={value} type="button" data-size-option={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value}</button>
            ))}
          </div>
        </fieldset>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
          Disabled
        </label>
      </div>

      <div ref={previewRef} className={styles.variants}>
        {variants.map((variant) => (
          <section key={variant} className={styles.preview} aria-labelledby={`${variant}-label`}>
            <h2 id={`${variant}-label`}>{variant}</h2>
            <div className={styles.buttonArea}>
              <Button variant={variant} size={size} icon="arrow-right" disabled={disabled}
                onClick={() => setMessage(`${variant[0].toUpperCase()}${variant.slice(1)} button activated.`)}>
                View projects
              </Button>
            </div>
          </section>
        ))}
      </div>

      <p className={styles.status} role="status">{message}</p>

      <dl className={styles.specs}>
        <div><dt>Height</dt><dd>{stats.height}</dd></div>
        <div><dt>Corner radius</dt><dd>{stats.radius}</dd></div>
        <div><dt>Transition</dt><dd>{stats.transition}</dd></div>
        <div><dt>Hover lift</dt><dd>{stats.hoverLift}</dd></div>
      </dl>
      <p className={styles.note}>Keyboard focus uses a 2 px blue outline. Reduced motion removes animated movement.</p>
    </main>
  );
}
