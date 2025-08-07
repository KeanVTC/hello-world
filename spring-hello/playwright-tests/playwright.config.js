const { test, expect } = require('@playwright/test');

test('Hello World page should load', async ({ page }) => {
  await page.goto('http://localhost:9090');
  await expect(page.locator('body')).toContainText('Hello World');
});
