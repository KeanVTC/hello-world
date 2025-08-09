// spring-hello/playwright-tests/CustomReporter.js
const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(options) {
    this.options = options || {};
  }

  onEnd(result) {
    const reportFolder = path.join(process.cwd(), 'spring-hello', 'playwright-tests', 'playwright-report');
    const indexPath = path.join(reportFolder, 'index.html');

    if (!fs.existsSync(indexPath)) {
      console.warn('HTML report not found, skipping title injection.');
      return;
    }

    let html = fs.readFileSync(indexPath, 'utf-8');

    // Title from CSV
    const csvPath = path.join(__dirname, 'data', 'report-title.csv');
    let csvTitle = '';
    if (fs.existsSync(csvPath)) {
      csvTitle = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(Boolean)[0].trim();
    }

    // Find timestamp in HTML and append title
    html = html.replace(
      /(Generated at\s*<span[^>]*>[^<]+<\/span>)/,
      `$1 | <span>${csvTitle}</span>`
    );

    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log(`✅ Report updated with title: ${csvTitle}`);
  }
}

module.exports = CustomReporter;
