// spring-hello/playwright-tests/CustomReporter.js
const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(options) {
    this.reportTitle = options?.reportTitle || 'Test Report';
  }

  async onEnd(result) {
    const reportPath = path.join(process.cwd(), 'spring-hello', 'playwright-report', 'index.html');
    if (!fs.existsSync(reportPath)) return;

    let html = fs.readFileSync(reportPath, 'utf-8');

    // Inject title with timestamp
    const timestamp = new Date().toLocaleString();
    const customTitle = `${this.reportTitle} - ${timestamp}`;
    html = html.replace(/<title>.*<\/title>/, `<title>${customTitle}</title>`);

    // Optionally insert into body header
    html = html.replace(
      /<body[^>]*>/,
      `$&<h1 style="text-align:center; margin-top:20px;">${customTitle}</h1>`
    );

    fs.writeFileSync(reportPath, html, 'utf-8');
    console.log(`✅ Custom report title applied: ${customTitle}`);
  }
}

module.exports = CustomReporter;
