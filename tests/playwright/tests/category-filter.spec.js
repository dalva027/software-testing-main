// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Product Category Filter Tests
 * Tests for filtering products by category
 * Covers scenarios: 1.1, 1.2, 1.3
 */

test.describe('Product Category Filter', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 1.1 Filter products by Electronics category
  test('should-filter-products-by-electronics', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select "Electronics" from the category filter dropdown
    const categoryFilter = page.locator('#categoryFilter');
    await categoryFilter.selectOption('electronics');

    // 3. Wait for products to re-render
    await page.waitForTimeout(500);

    // 4. Verify only electronics products are displayed
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // 5. Verify exactly 4 products are shown
    expect(count).toBe(4);

    // Verify only products with category "electronics" are visible
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const category = await card.locator('.product-category').textContent();
      expect(category.toLowerCase()).toBe('electronics');
    }
  });

  // 1.2 Filter products by Accessories category
  test('should-filter-products-by-accessories', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select "Accessories" from the category filter dropdown
    const categoryFilter = page.locator('#categoryFilter');
    await categoryFilter.selectOption('accessories');

    // 3. Wait for products to re-render
    await page.waitForTimeout(500);

    // 4. Verify only accessories products are displayed
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Verify exactly 2 products are shown
    expect(count).toBe(2);

    // Verify only products with category "accessories" are visible
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const category = await card.locator('.product-category').textContent();
      expect(category.toLowerCase()).toBe('accessories');
    }
  });

  // 1.3 Switch category filter back to All Categories
  test('should-switch-filter-back-to-all-categories', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select a category (e.g., Electronics)
    const categoryFilter = page.locator('#categoryFilter');
    await categoryFilter.selectOption('electronics');
    await page.waitForTimeout(500);

    // 3. Then select "All Categories" from dropdown
    await categoryFilter.selectOption('all');
    await page.waitForTimeout(500);

    // 4. Verify all 6 products are displayed again
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    // Verify mixed categories are present
    const categories = [];
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const category = await card.locator('.product-category').textContent();
      categories.push(category.toLowerCase());
    }
    expect(categories).toContain('electronics');
    expect(categories).toContain('accessories');
  });

});