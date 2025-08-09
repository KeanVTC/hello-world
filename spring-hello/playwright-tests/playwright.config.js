// spring-hello/playwright-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Function to read the report title from CSV file
function readTitleFromCSV() {
  const csvPath = path.join(__dirname, 'data', 'report-title.csv');
  if (!fs.existsSync(csvPath)) {
    console.warn(`CSV file not found at ${csvPath}, using default title.`);
    return 'Test Report';
  }
  const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(Boolean);
  return lines[0].trim();
}

const reportTitle = readTitleFromCSV();

module.exports = defineConfig({
  reporter: [
    // Custom reporter with title and output folder options
    [path.join(__dirname, 'CustomReporter.js'), { reportTitle, outputDir: path.join(__dirname, 'custom-report') }],
    // Optional default HTML reporter for comparison or fallback
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' }
    }
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true,
  },
});
