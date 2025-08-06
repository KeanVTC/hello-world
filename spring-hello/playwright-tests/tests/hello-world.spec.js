const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Helper function to read and parse the CSV file
function readCSV(filePath) {
  const csv = fs.readFileSync(filePath, 'utf8');
  const lines = csv.trim().split('\n').slice(1); // skip header
  return lines.map(line => {
    const [route, expected] = line.split(',');
    return { route: route.trim(), expected: expected.trim() };
  });
}

const csvPath = path.resolve(__dirname, '../data/expected-values.csv');
const testCases = readCSV(csvPath);

// Run a test for each row in the CSV
for (const { route, expected } of testCases) {
  test(`Validate ${route} returns "${expected}"`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain(expected);
  });
}
