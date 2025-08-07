// playwright.config.js

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:9090',
    headless: true,
  },
  reporter: [['html', { outputFolder: '../playwright-report', open: 'never' }]],
});
