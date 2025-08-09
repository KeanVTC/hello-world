const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

function getReportTitle() {
  try {
    const csvPath = path.join(__dirname, 'data', 'report-title.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(Boolean);
    const map = {};
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) map[key.trim()] = value.trim();
    });

    const reportType = process.env.REPORT_TYPE || 'test'; // default to 'test'
    return map[reportType] || 'Default Playwright Report';
  } catch (e) {
    console.warn('Failed to read report-title.csv, using default title');
    return 'Default Playwright Report';
  }
}

const reportTitle = getReportTitle();

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
    headless: true,
  },
});
