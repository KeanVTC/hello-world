import { test, expect } from '@playwright/test';

test('Hello World app should return greeting message', async ({ request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Hello, World'); // Adjust based on actual response
});
