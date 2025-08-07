import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Hello World endpoint returns expected HTML', async ({ request }) => {
  // Resolve path to CSV under playwright-tests/data/
  const csvPath = path.resolve(__dirname, '../data/expected-values.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  // Assumes line format: /hello,<h1>Spring Boot!</h1>
  const expectedLine = csvContent.split('\n').find(line => line.startsWith('/hello'));
  const expectedHtml = expectedLine?.split(',')[1]?.trim();

  if (!expectedHtml) {
    throw new Error('Expected HTML value not found in CSV.');
  }

  // Call the /hello endpoint
  const response = await request.get('/hello');
  const body = await response.text();

  // Assertions
  expect(response.status()).toBe(200);
  expect(body.trim()).toBe(expectedHtml);
});
