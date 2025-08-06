const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// 🔧 Correct path to the CSV file
const csvPath = path.resolve(__dirname, '../data/expected-values.csv');
const expected = fs.readFileSync(csvPath, 'utf8').trim().split('\n')[1].split(',')[1]; // get second row's second column

test('Validate / returns correct greeting', async ({ request }) => {
  const response = await request.get('/hello'); 
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain(expected);
});
