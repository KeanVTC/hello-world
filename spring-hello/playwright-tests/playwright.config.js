import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  retries: 0,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:9090',
    headless: true,
  },
});
