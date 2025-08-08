const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// ✅ CSV Utility to get expected response by route
function getExpectedResponse(route) {
  const csvPath = path.resolve(__dirname, '../data/expected-values.csv');

  if (!fs.existsSync(csvPath)) {
    throw new Error(`❌ CSV file not found: ${csvPath}`);
  }

  const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');

  for (const line of lines) {
    const [csvRoute, expectedValue] = line.split(',').map(s => s.trim());
    if (csvRoute === route) {
      return expectedValue;
    }
  }

  throw new Error(`❌ Expected value for route "${route}" not found in CSV.`);
}

// ✅ Main test 
test.describe('API Route Validation (Hardcoded URL)', () => {
  const route = '/hello';
  const fullUrl = `http://localhost:9090${route}`;

  test(`GET ${route} should return correct greeting`, async ({ request }) => {
    const expected = getExpectedResponse(route);

    const response = await request.get(fullUrl); // hardcoded full URL
    expect(response.status(), 'Expected HTTP 200 OK').toBe(200);

    const body = await response.text();
    expect(body, `Expected body to contain "${expected}"`).toContain(expected);
  });
});

