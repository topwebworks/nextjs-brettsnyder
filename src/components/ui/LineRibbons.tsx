import styles from './LineRibbons.module.css';

interface LineRibbonsProps {
  /** Fewer lines and no drift, for secondary placements */
  subtle?: boolean;
  /** Placement styles: opacity, mask, entrance */
  className?: string;
}

// A ribbon of hairline waves in a 2880x800 viewBox. The wavelength divides 1440,
// so sliding the double-width SVG by -50% loops seamlessly.
const waveRibbon = (count: number, baseY: number, spread: number, amp: number, len: number) =>
  Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y = baseY + (t - 0.5) * spread;
    const x0 = -len * (1 + 0.3 * t); // phase shift fans the lines so they weave
    let d = `M${x0} ${y} q${len / 4} ${-2 * amp * (0.5 + t)} ${len / 2} 0`;
    for (let x = x0 + len / 2; x < 2880 + len; x += len / 2) d += ` t${len / 2} 0`;
    return d;
  });

const fullRibbons = [waveRibbon(14, 400, 240, 60, 1440), waveRibbon(9, 470, 180, 45, 1440)];
const subtleRibbons = [waveRibbon(7, 380, 420, 110, 1440), waveRibbon(5, 440, 300, 80, 1440)];

/** Decorative line art: an indigo and a teal ribbon that drift in opposite directions. */
export default function LineRibbons({ subtle = false, className = '' }: LineRibbonsProps) {
  return (
    <div className={`${styles.lines} ${subtle ? styles.static : ''} ${className}`} aria-hidden="true">
      {(subtle ? subtleRibbons : fullRibbons).map((ribbon, i) => (
        <svg key={i} viewBox="0 0 2880 800" preserveAspectRatio="none">
          {ribbon.map((d) => (
            <path key={d} d={d} fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      ))}
    </div>
  );
}
