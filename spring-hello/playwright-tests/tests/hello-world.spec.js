// spring-hello/playwright-tests/hello-world.spec.js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Check expected response from /hello', async ({ request }) => {
  const csv = fs.readFileSync('./playwright-tests/data/expected-values.csv', 'utf-8');
  const [path, expectedHtml] = csv.trim().split(',');

  const response = await request.get(path);
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body.trim()).toBe(expectedHtml.trim());
});
