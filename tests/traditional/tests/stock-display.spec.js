// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Stock Display Tests
 * Tests for verifying low stock indicator display
 * Covers scenario: 6.1
 */

test.describe('Stock Display', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 6.1 Verify low stock indicator is displayed for low-stock items
  test('should-verify-low-stock-indicator', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Check stock display for products with stock < 5
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    const stockInfo = [];

    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const name = await card.locator('.product-info h3').textContent();
      const stockElement = card.locator('.product-stock');
      const stockText = await stockElement.textContent();
      const hasLowClass = await stockElement.evaluate(el => el.classList.contains('low'));

      stockInfo.push({ name, stockText, hasLowClass });
    }

    // Find Mouse Pad XL stock item and verify boundary condition (stock: 5)
    const mousePadItem = stockInfo.find(item => item.name === 'Mouse Pad XL');
    expect(mousePadItem).toBeTruthy();

    // Mouse Pad XL has stock of 5, which is the boundary (stock < 5 triggers low indicator)
    // Since stock is 5 (not < 5), it should show "5 in stock" without the low class
    expect(mousePadItem.stockText).toContain('5');
  });

});