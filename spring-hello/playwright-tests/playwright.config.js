import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:9090', // test container port
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
