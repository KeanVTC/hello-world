// tests/hello-world.spec.js
const { test, expect } = require('@playwright/test');

test('Hello World app should return greeting message', async ({ request }) => {
  // The baseURL (http://localhost:8086) is set in playwright.config.js
  const response = await request.get('/');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Hello, World');
});
