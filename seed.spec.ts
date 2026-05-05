// @ts-ignore
import { test, expect, Page } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }: { page: Page }) => {
    // generate code here.
    await page.goto('/');
    await expect(page).toHaveTitle(/TechMart/);
  });
});
