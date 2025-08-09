// spring-hello/playwright-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Path to the CSV file
const csvFilePath = path.join(__dirname, 'report-title.csv');

// Default title if CSV not found or empty
let reportTitle = 'Default Report Title';

// Try reading CSV
try {
  if (fs.existsSync(csvFilePath)) {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8').trim();
    // Assuming CSV has one value in first cell for title
    const firstLine = csvContent.split('\n')[0];
    reportTitle = firstLine.split(',')[0].trim();
  }
} catch (err) {
  console.error('Error reading CSV file for report title:', err);
}

// Pass title to CustomReporter via env var
process.env.REPORT_TITLE = reportTitle;

module.exports = defineConfig({
  reporter: [
    [path.join(__dirname, 'CustomReporter.js')],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true
  },
});
