/**
 * Generate a one-page PDF cover letter from the public text source.
 *
 * Run: npm run generate-cover-letter
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

async function generateCoverLetterPDF() {
  if (process.env.VERCEL || process.env.CI) {
    console.log('Skipping cover letter PDF generation in CI/production');
    return;
  }

  const textPath = path.join(__dirname, '..', 'public', 'cover-letter-brett-snyder.txt');
  const pdfPath = path.join(__dirname, '..', 'public', 'cover-letter-brett-snyder.pdf');

  if (!fs.existsSync(textPath)) {
    console.error('Error: cover-letter-brett-snyder.txt not found in public folder');
    process.exit(1);
  }

  const blocks = fs.readFileSync(textPath, 'utf8')
    .replaceAll('\r\n', '\n')
    .trim()
    .split(/\n\s*\n/);
  const [name, ...contactLines] = blocks.shift().split('\n');
  const body = blocks.map((block) => {
    const className = block.startsWith('Sincerely,') ? 'closing' : '';
    return `<p class="${className}">${escapeHtml(block).replaceAll('\n', '<br>')}</p>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cover Letter | ${escapeHtml(name)}</title>
  <style>
    @page { size: Letter; margin: 0; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #1e293b;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
    }
    .page {
      width: 8.5in;
      min-height: 11in;
      padding: 0.62in 0.72in;
    }
    header {
      margin-bottom: 0.3in;
      padding-bottom: 0.16in;
      border-bottom: 2px solid #4f5ff6;
    }
    h1 {
      margin: 0 0 5px;
      color: #111827;
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .contact {
      color: #475569;
      font-size: 9.5pt;
    }
    p { margin: 0 0 0.14in; }
    .closing { margin-top: 0.2in; }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <h1>${escapeHtml(name)}</h1>
      <div class="contact">${contactLines.map(escapeHtml).join(' | ')}</div>
    </header>
    ${body}
  </main>
</body>
</html>`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true
    });

    const stats = fs.statSync(pdfPath);
    console.log(`Cover letter PDF generated: ${pdfPath}`);
    console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('Error generating cover letter PDF:', error.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

generateCoverLetterPDF();
