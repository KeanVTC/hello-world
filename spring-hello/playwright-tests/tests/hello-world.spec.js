const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Utility function to get expected value from CSV
function getExpectedResponse(route) {
  const csvPath = path.resolve(__dirname, '../data/expected-values.csv');
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n');
  for (const line of lines) {
    const [pathFromCsv, expected] = line.trim().split(',');
    if (pathFromCsv === route) {
      return expected;
    }
  }
  return undefined;
}

test('Validate /hello returns correct greeting', async ({ request }) => {
  const expected = getExpectedResponse('/hello');
  const response = await request.get('/hello');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain(expected);
});
