const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Helper to read CSV and convert to test cases
function readCSV(filePath) {
  const csv = fs.readFileSync(filePath, 'utf8');
  const lines = csv.trim().split('\n').slice(1); // skip header

  return lines.map(line => {
    const [route, expected] = line.split(',');
    return { route: route.trim(), expected: expected.trim() };
  });
}

// Load test data
const testCases = readCSV(path.resolve(__dirname, '../data/expected-values.csv'));

for (const { route, expected } of testCases) {
  test(`Check content at ${route}`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain(expected); // validate against CSV value
  });
}
