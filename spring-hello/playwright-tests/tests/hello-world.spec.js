// playwright-tests/tests/hello-world.spec.js
import { test, expect } from '@playwright/test';
import { getExpectedResponse } from '../utils/response-utils';

test('Validate /hello returns correct greeting', async ({ request }) => {
  const response = await request.get('/hello'); // uses baseURL from config
  expect(response.status()).toBe(200);

  const body = await response.text();
  const expected = getExpectedResponse('/hello');
  expect(body).toContain(expected);
});
