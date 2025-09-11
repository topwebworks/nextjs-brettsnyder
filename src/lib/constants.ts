/**
 * Font Configuration System
 * 
 * IMPORTANT: Only ONE font combination should be active at a time
 * to optimize performance and loading times.
 * 
 * Uncomment the desired combination and comment out the others. Although I remove the extra fonts from the Public folder. Leaving this data for reference.
 */

// ============================================================================
// FONT CONFIGURATION - Choose ONE combination only
// ============================================================================

export const FONT_CONFIG = {
  // Option 1: Professional & Modern (DEFAULT - RECOMMENDED)
  primary: 'Inter Variable',
  display: 'Inter Variable', // Same as primary for consistency
  mono: 'JetBrains Mono Variable'
  
  // Option 2: Friendly & Approachable
  // primary: 'Plus Jakarta Sans Variable',
  // display: 'Outfit Variable',
  // mono: 'JetBrains Mono Variable'
  
  // Option 3: Geometric & Tech-Forward  
  // primary: 'DM Sans Variable',
  // display: 'Space Grotesk Variable',
  // mono: 'Fira Code Variable'
  
  // Option 4: Bold & Distinctive
  // primary: 'Manrope Variable',
  // display: 'Outfit Variable',
  // mono: 'JetBrains Mono Variable'
  
  // Option 5: Classic & Elegant
  // primary: 'Work Sans Variable',
  // display: 'Playfair Display Variable', // Serif accent
  // mono: 'Source Code Pro Variable'
};

// ============================================================================
// FONT FILE MAPPINGS - ACTIVE FONTS ONLY
// ============================================================================

export const FONT_FILES = {
  // Primary Font - Inter Variable (Currently Active)
  'Inter Variable': {
    regular: '/fonts/Inter-VariableFont_opsz,wght.woff2',
    italic: '/fonts/Inter-Italic-VariableFont_opsz,wght.woff2',
    weights: '100 900',
    style: 'normal'
  },

  // Monospace Fonts - Code Display
  'JetBrains Mono Variable': {
    regular: '/fonts/JetBrainsMono-VariableFont_wght.woff2',
    italic: '/fonts/JetBrainsMono-Italic-VariableFont_wght.woff2',
    weights: '100 800',
    style: 'normal'
  }

  // Note: Other font files have been removed during Phase 1.3 housekeeping
  // to reduce bundle size. Only Inter and JetBrains Mono are currently loaded.
};

// ============================================================================
// FONT COMBINATIONS - UPDATED FOR ACTIVE FONTS ONLY
// ============================================================================

// Current active font combination (Inter + JetBrains Mono)
export const ACTIVE_FONTS = {
  primary: 'Inter Variable',
  display: 'Inter Variable', // Using same font for consistency
  mono: 'JetBrains Mono Variable'
};

// ============================================================================
// FONT FALLBACK SYSTEMS
// ============================================================================

export const FONT_STACKS = {
  primary: `var(--font-primary), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  display: `var(--font-display), var(--font-primary), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  mono: `var(--font-mono), ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace`
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the active fonts from the current configuration
 * @returns Array of font names that should be loaded
 */
export function getActiveFonts(): string[] {
  const fonts = new Set<string>();
  
  fonts.add(FONT_CONFIG.primary);
  if (FONT_CONFIG.display !== FONT_CONFIG.primary) {
    fonts.add(FONT_CONFIG.display);
  }
  fonts.add(FONT_CONFIG.mono);
  
  return Array.from(fonts);
}

/**
 * Generate CSS font-face declarations for active fonts
 * @ returns CSS string with @font-face declarations
 */

export function generateFontFaceCSS(): string {
  const activeFonts = getActiveFonts();
  let css = '';
  
  activeFonts.forEach(fontName => {
    const fontData = FONT_FILES[fontName as keyof typeof FONT_FILES];
    if (!fontData) return;
    
    // Regular font-face
    css += `
@font-face {
  font-family: '${fontName}';
  font-style: normal;
  font-weight: ${fontData.weights};
  font-display: swap;
  src: url('${fontData.regular}') format('woff2-variations');
}
`;
    
    // Italic font-face (if available)
    if (fontData.italic) {
      css += `
@font-face {
  font-family: '${fontName}';
  font-style: italic;
  font-weight: ${fontData.weights};
  font-display: swap;
  src: url('${fontData.italic}') format('woff2-variations');
}
`;
    }
  });
  
  return css;
}

// ============================================================================
// CSS CUSTOM PROPERTIES FOR FONTS
// ============================================================================

export const FONT_CSS_VARIABLES = `
  --font-primary: '${FONT_CONFIG.primary}';
  --font-display: '${FONT_CONFIG.display}';
  --font-mono: '${FONT_CONFIG.mono}';
`;
