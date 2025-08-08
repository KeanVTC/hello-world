const { defineConfig } = require('@playwright/test');

// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true
  },
});

