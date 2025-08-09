// spring-hello/playwright-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Read title from CSV
function readTitleFromCSV() {
  const csvPath = path.join(__dirname, 'data', 'report-title.csv'); // ✅ correct folder & name
  if (!fs.existsSync(csvPath)) return 'Test Report';
  const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(Boolean);
  return lines[0].trim();
}

const reportTitle = readTitleFromCSV();

module.exports = defineConfig({
  reporter: [
    [path.join(__dirname, 'CustomReporter.js'), { reportTitle }],
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
