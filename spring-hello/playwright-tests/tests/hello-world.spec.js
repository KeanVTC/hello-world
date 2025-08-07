const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(__dirname, '../data/expected-values.csv');
const lines = fs.readFileSync(csvPath, 'utf8').split('\n').filter(Boolean);

for (const line of lines) {
  const [route, expectedHtml] = line.split(',');

  test(`GET ${route} should return expected HTML`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain(expectedHtml);
  });
}
