// spring-hello/playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  timeout: 10000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:9090',
    headless: true,
  },
});
