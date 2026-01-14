# Resume System

This project includes an automated HTML-to-PDF resume generation system.

## Files

- **`public/resume-brett-snyder.html`** - Source HTML resume with inline styles
- **`public/resume-brett-snyder.pdf`** - Auto-generated PDF (do not edit manually)
- **`scripts/generate-resume-pdf.js`** - PDF generation script using Puppeteer

## Usage

### Generate PDF Manually
```bash
npm run generate-resume
```

### Auto-generate During Build
The PDF is automatically generated during the build process via the `prebuild` script.

## Making Changes

1. **Edit the HTML file only**: `public/resume-brett-snyder.html`
2. **Run the generator**: `npm run generate-resume`
3. The PDF will be created/updated automatically

## Page Break Controls

The HTML includes strategic page breaks to prevent awkward content splits:

- `page-break-before: always` - Forces new page before Professional Experience
- `page-break-inside: avoid` - Keeps job listings and projects together
- `page-break-after: avoid` - Prevents breaks after headings

### To Add More Page Breaks

Add inline style to any section:
```html
<section style="page-break-before: always;">
```

Or use CSS classes in the print media query.

## Download Options

The `ResumeButton` component provides three options:
1. **View in Modal** - Opens HTML resume for reading
2. **Download PDF** - Direct PDF download for applications/Indeed
3. **Print** - Opens print dialog (also allows save as PDF)

## For Indeed/Job Applications

Use the generated PDF: `public/resume-brett-snyder.pdf`

The PDF maintains all styling from the HTML and is optimized for:
- Print/digital viewing
- ATS systems
- Professional presentation
- 2-page format with smart page breaks
