// spring-hello/playwright-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true
  },
  reporter: [
    [
      path.join(__dirname, 'my-html-reporter.js'), // custom reporter file
      { outputFolder: path.join(__dirname, 'playwright-report'), open: 'never' }
    ]
  ],
});
