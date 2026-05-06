// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Toast Notification Tests - Add to Cart and Timeout
 * Tests for toast appearing on add to cart and disappearing after timeout
 * Covers scenarios: 8.1, 8.2
 */

test.describe('Toast Notifications - Add to Cart & Timeout', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 8.1 Verify toast displays on add to cart success
  test('should-verify-toast-on-add-to-cart', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Add an item to cart
    const addButton = page.locator('.add-to-cart-btn').first();
    await addButton.click();

    // 3. Verify toast appears with success message
    const toast = page.locator('#toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Added to cart');
  });

  // 8.2 Verify toast disappears after timeout
  test('should-verify-toast-disappears-after-timeout', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Add an item to cart
    const addButton = page.locator('.add-to-cart-btn').first();
    await addButton.click();

    // Verify toast is visible initially
    const toast = page.locator('#toast');
    await expect(toast).toBeVisible();

    // 3. Wait for 4 seconds
    await page.waitForTimeout(4000);

    // 4. Verify toast is hidden
    await expect(toast).not.toBeVisible();
  });

});