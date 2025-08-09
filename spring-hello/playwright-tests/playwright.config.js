const { defineConfig } = require('@playwright/test');
const path = require('path');

const staticReportTitle = 'Static Test Report Title';

module.exports = defineConfig({
  reporter: [
    [path.join(__dirname, 'CustomReporter.js'), { reportTitle: staticReportTitle }],
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
