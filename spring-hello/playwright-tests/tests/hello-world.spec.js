const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// ✅ Utility to read CSV and get expected value by route
function getExpectedResponse(route) {
  const csvPath = path.resolve(__dirname, '../data/expected-values.csv');

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at: ${csvPath}`);
  }

  const data = fs.readFileSync(csvPath, 'utf8').trim();
  const lines = data.split('\n');

  for (const line of lines) {
    const [pathFromCsv, expected] = line.split(',').map(s => s.trim());
    if (pathFromCsv === route) {
      return expected;
    }
  }

  throw new Error(`Expected value not found for route: ${route}`);
}

test('Validate /hello returns correct greeting', async ({ request }) => {
  const route = '/hello';
  const expected = getExpectedResponse(route);

  const response = await request.get(route); // uses baseURL from config
  expect(response.status(), 'Response status should be 200').toBe(200);

  const body = await response.text();
  expect(body, `Response body should contain: "${expected}"`).toContain(expected);
});
