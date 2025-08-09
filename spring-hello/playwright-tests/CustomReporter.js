// spring-hello/playwright-tests/CustomReporter.js
const fs = require('fs');
const path = require('path');
const { Reporter } = require('@playwright/test/reporter');

class CustomReporter {
  constructor(options) {
    this.options = options;
    this.reportTitle = this._readTitleFromCSV();
  }

  // Read title from CSV file
  _readTitleFromCSV() {
    try {
      const csvPath = path.join(__dirname, 'data', 'report-title.csv');
      if (!fs.existsSync(csvPath)) {
        console.warn(`[CustomReporter] CSV file not found: ${csvPath}`);
        return 'Test Report';
      }
      const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(Boolean);
      return lines[0].trim() || 'Test Report';
    } catch (err) {
      console.error('[CustomReporter] Failed to read CSV:', err);
      return 'Test Report';
    }
  }

  onEnd(result) {
    try {
      // Locate the generated Playwright HTML report
      const reportPath = path.join(__dirname, 'playwright-report', 'index.html');
      if (!fs.existsSync(reportPath)) {
        console.warn('[CustomReporter] Report file not found:', reportPath);
        return;
      }

      let html = fs.readFileSync(reportPath, 'utf-8');

      // Replace the default "Test Report" title with custom one
      html = html.replace(/<title>.*?<\/title>/, `<title>${this.reportTitle}</title>`);

      // Also replace the visible heading (usually <h1>)
      html = html.replace(/<h1[^>]*>.*?<\/h1>/, `<h1>${this.reportTitle}</h1>`);

      fs.writeFileSync(reportPath, html, 'utf-8');
      console.log(`[CustomReporter] Report title set to: "${this.reportTitle}"`);
    } catch (err) {
      console.error('[CustomReporter] Failed to update report title:', err);
    }
  }
}

module.exports = CustomReporter;
