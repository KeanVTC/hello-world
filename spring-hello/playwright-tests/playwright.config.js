// spring-hello/playwright.config.js
import { defineConfig } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:9090';

export default defineConfig({
  use: {
    baseURL: BASE_URL,
    headless: true,
    trace: 'on-first-retry',
  },
  reporter: 'html',
  testDir: './playwright-tests/tests',
});
