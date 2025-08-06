// playwright-tests/playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 10000,
  retries: 1,
  use: {
    headless: true,
    baseURL: 'http://localhost:8086',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
};
