const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Read title from env var or fallback
const reportTitle = process.env.REPORT_TITLE || 'Default Playwright Report';

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
