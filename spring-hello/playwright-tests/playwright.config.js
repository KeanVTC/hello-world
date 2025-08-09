// spring-hello/playwright-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

function readTitleFromCSV() {
  const csvPath = path.join(__dirname, 'data', 'report-title.csv');
  if (!fs.existsSync(csvPath)) {
    console.warn(`CSV file not found at ${csvPath}, using default title.`);
    return 'Test Report';
  }
  const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(Boolean);
  return lines[0].trim();
}

const reportTitle = readTitleFromCSV();

module.exports = defineConfig({
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],  // Default Playwright report
    [path.join(__dirname, 'CustomReporter.js'), { reportTitle, outputDir: path.join(__dirname, 'custom-report') }],
  ],
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true,
  },
});
