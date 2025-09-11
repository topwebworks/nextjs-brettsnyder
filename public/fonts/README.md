# Local Fonts Directory

This directory contains downloaded variable font files to avoid external dependencies and improve performance. All fonts are optimized .woff2 variable fonts for maximum performance and flexibility.

## Available Variable Fonts (.woff2 format):

### Primary Font Options (Body Text):

#### **Inter Variable** - Most versatile, excellent readability, 9 weights (100-900)
- **Best for**: Universal usage, professional sites, high readability requirements
- **Characteristics**: Clean, neutral, excellent at all sizes, optimized for UI
- **Files**: 
  - `Inter-VariableFont_opsz,wght.woff2`
  - `Inter-Italic-VariableFont_opsz,wght.woff2`

#### **Plus Jakarta Sans Variable** - Friendly professional, perfect balance, 8 weights (200-800)
- **Best for**: Modern startups, friendly brands, approachable professional sites
- **Characteristics**: Rounded corners, warm feel, great for tech companies
- **Files**: 
  - `PlusJakartaSans-VariableFont_wght.woff2`
  - `PlusJakartaSans-Italic-VariableFont_wght.woff2`

#### **DM Sans Variable** - Clean, professional, great for UI, 5 weights (400-1000)
- **Best for**: Design systems, UI-heavy sites, clean corporate looks
- **Characteristics**: Geometric precision, excellent for interfaces
- **Files**: 
  - `DMSans-VariableFont_opsz,wght.woff2`
  - `DMSans-Italic-VariableFont_opsz,wght.woff2`

#### **Manrope Variable** - Modern sans-serif with character, 8 weights (200-800)
- **Best for**: Creative portfolios, design agencies, modern brands
- **Characteristics**: Distinctive character, open letterforms, modern feel
- **Files**: 
  - `Manrope-VariableFont_wght.woff2`

#### **Outfit Variable** - Modern geometric, great for headings, 9 weights (100-900)
- **Best for**: Tech companies, modern brands, bold statements
- **Characteristics**: Strong geometric forms, excellent for display use
- **Files**: 
  - `Outfit-VariableFont_wght.woff2`

#### **Work Sans Variable** - Optimized for screen reading, 9 weights (100-900)
- **Best for**: Content-heavy sites, blogs, professional documentation
- **Characteristics**: Optimized for on-screen reading, excellent legibility
- **Files**: 
  - `WorkSans-VariableFont_wght.woff2`
  - `WorkSans-Italic-VariableFont_wght.woff2`

#### **Space Grotesk Variable** - Distinctive, modern, tech-forward, 5 weights (300-700)
- **Best for**: Tech portfolios, developer sites, modern digital brands
- **Characteristics**: Unique character, tech aesthetic, strong personality
- **Files**: 
  - `SpaceGrotesk-VariableFont_wght.woff2`

### Display Font Options (Headings & Large Text):

#### **Playfair Display Variable** - Elegant serif for sophisticated brands, 9 weights (400-900)
- **Best for**: Luxury brands, editorial sites, sophisticated portfolios
- **Characteristics**: High contrast serif, elegant, traditional yet modern
- **Usage**: Headings, hero text, elegant statements
- **Files**: 
  - `PlayfairDisplay-VariableFont_wght.woff2`
  - `PlayfairDisplay-Italic-VariableFont_wght.woff2`

#### **Oswald Variable** - Strong impact font, narrow width, 7 weights (200-700)
- **Best for**: Bold statements, sports brands, high-impact headers
- **Characteristics**: Condensed, strong vertical emphasis, attention-grabbing
- **Usage**: Hero headings, call-to-action text, bold statements
- **Files**: 
  - `Oswald-VariableFont_wght.woff2`

#### **Libre Franklin Variable** - Clean, wide character set, 9 weights (100-900)
- **Best for**: Corporate sites, professional services, clean modern looks
- **Characteristics**: Wide character set, clean lines, professional
- **Usage**: Headings, subheadings, professional display text
- **Files**: 
  - `LibreFranklin-VariableFont_wght.woff2`
  - `LibreFranklin-Italic-VariableFont_wght.woff2`

### Monospace Options (Code Blocks):

#### **JetBrains Mono Variable** - Designed for developers, excellent ligatures, 8 weights (100-800)
- **Best for**: Developer portfolios, technical documentation, code display
- **Characteristics**: Programming ligatures, excellent readability, developer-focused
- **Usage**: Code blocks, technical content, developer portfolios
- **Files**: 
  - `JetBrainsMono-VariableFont_wght.woff2`
  - `JetBrainsMono-Italic-VariableFont_wght.woff2`

#### **Fira Code Variable** - Popular programming font, great ligatures, 7 weights (300-700)
- **Best for**: Code demonstrations, technical blogs, programming content
- **Characteristics**: Programming ligatures, popular in dev community
- **Usage**: Code blocks, technical documentation
- **Files**: 
  - `FiraCode-VariableFont_wght.woff2`

#### **Source Code Pro Variable** - Adobe's code font, highly readable, 7 weights (200-900)
- **Best for**: Professional documentation, corporate code examples
- **Characteristics**: Highly readable, professional, clean monospace
- **Usage**: Code blocks, technical content, professional sites
- **Files**: 
  - `SourceCodePro-VariableFont_wght.woff2`
  - `SourceCodePro-Italic-VariableFont_wght.woff2`

## Font Selection Strategy:
**IMPORTANT**: Only load ONE font combination to avoid performance issues.
Configure your selection in `src/lib/constants.ts`:

```typescript
// Font Configuration - Choose ONE combination only
export const FONT_CONFIG = {
  // Option 1: Professional & Modern (Recommended - DEFAULT)
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
```

## Brand Personality Font Combinations:

### Professional & Corporate
- **Primary**: Inter Variable or DM Sans Variable
- **Display**: Same as primary or Libre Franklin Variable
- **Code**: Source Code Pro Variable
- **Best for**: Consultants, agencies, corporate portfolios

### Creative & Modern
- **Primary**: Plus Jakarta Sans Variable or Manrope Variable
- **Display**: Outfit Variable or Space Grotesk Variable
- **Code**: JetBrains Mono Variable
- **Best for**: Designers, creative developers, startups

### Tech & Developer-Focused
- **Primary**: Work Sans Variable or Inter Variable
- **Display**: Space Grotesk Variable
- **Code**: JetBrains Mono Variable or Fira Code Variable
- **Best for**: Software engineers, tech leads, DevOps

### Sophisticated & Premium
- **Primary**: Work Sans Variable or Libre Franklin Variable
- **Display**: Playfair Display Variable (serif accent)
- **Code**: Source Code Pro Variable
- **Best for**: Senior professionals, luxury brands, consultants

### Bold & Distinctive
- **Primary**: Outfit Variable or Manrope Variable
- **Display**: Oswald Variable (for strong impact)
- **Code**: Fira Code Variable
- **Best for**: Personal brands, influencers, creative leads

## Implementation Notes:
- Fonts are loaded conditionally via CSS @font-face declarations in globals.css
- Only selected fonts from FONT_CONFIG are loaded to optimize performance
- System font fallbacks (ui-sans-serif, system-ui) ensure instant loading
- Variable fonts provide optimal file size and design flexibility
- Font loading is configured in src/app/layout.tsx for Next.js optimization
- All fonts support font-weight ranges and font-style variations
