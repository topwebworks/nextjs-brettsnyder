/**
 * Generate PDF Resume from HTML
 * 
 * This script uses Puppeteer to convert the HTML resume to PDF
 * while preserving all styling, fonts, and page breaks.
 * 
 * Run: npm run generate-resume
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateResumePDF() {
  console.log('🚀 Starting resume PDF generation...');
  
  const htmlPath = path.join(__dirname, '..', 'public', 'resume-brett-snyder.html');
  const pdfPath = path.join(__dirname, '..', 'public', 'resume-brett-snyder.pdf');
  
  // Check if HTML file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: resume-brett-snyder.html not found in public folder');
    process.exit(1);
  }
  
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Load HTML file
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF with optimized settings
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      scale: 0.932, // Scale down to fit more content per page
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.5in',
        bottom: '0.4in',
        left: '0.5in'
      },
      preferCSSPageSize: false
    });
    
    await browser.close();
    
    console.log('✅ PDF generated successfully!');
    console.log(`📄 Location: ${pdfPath}`);
    
    // Display file size
    const stats = fs.statSync(pdfPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 File size: ${fileSizeInKB} KB`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    process.exit(1);
  }
}

// Run the script
generateResumePDF();
