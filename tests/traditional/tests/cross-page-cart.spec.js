// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Cross-page Cart Count Consistency Test
 * Tests for verifying cart count is consistent across different pages
 * Covers scenario: 14.1
 */

test.describe('Cross-page Cart Count Consistency', () => {

  // 14.1 Verify cart count updates on non-home pages
  test('should-verify-cart-count-on-non-home-pages', async ({ page }) => {
    // 1. Clear cart first
    await page.request.delete('http://localhost:3000/api/cart');

    // 2. Navigate to /cart.html
    await page.goto('/cart.html');

    // 3. Add item to cart via API for consistency
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });

    // 4. Navigate to /login.html to verify cart count is consistent
    await page.goto('/login.html');
    await page.waitForTimeout(500);

    // 5. Verify cart count is correct on login page
    const cartCount = page.locator('#cartCount');
    await expect(cartCount).toHaveText('1');

    // 6. Navigate to /register.html and verify cart count is still correct
    await page.goto('/register.html');
    await page.waitForTimeout(500);

    await expect(cartCount).toHaveText('1');
  });

});
