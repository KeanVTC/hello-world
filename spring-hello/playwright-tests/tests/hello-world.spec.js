// hello-world.spec.js
import { test, expect, request } from '@playwright/test';

test('Hello World app should return greeting message', async () => {
  const baseURL = 'http://localhost:9090'; // ✅ FIXED: use mapped host port
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${baseURL}/`);
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain('Hello World');
});
