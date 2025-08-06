const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(__dirname, '../expected-response.csv');
const expected = fs.readFileSync(csvPath, 'utf8').trim().split('\n')[1]; // skip header

test('Validate / returns correct greeting', async ({ request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain(expected);
});
