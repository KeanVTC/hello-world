const { test, expect } = require('@playwright/test');

test('Hello World app should return greeting message', async ({ request }) => {
  const response = await request.get('http://localhost:8086');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Hello'); // adjust this based on your app's message
});
