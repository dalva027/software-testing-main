// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Product Sorting Tests
 * Tests for sorting products by name and price
 * Covers scenarios: 2.1, 2.2, 2.3, 2.4
 */

test.describe('Product Sorting', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 2.1 Sort by name (alphabetical)
  test('should-sort-products-by-name-alphabetical', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select "Name" from sort dropdown
    const sortBy = page.locator('#sortBy');
    await sortBy.selectOption('name');

    // 3. Verify product order
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    // Verify alphabetical order: Mechanical Keyboard, Monitor Stand, Mouse Pad XL, USB-C Hub, Webcam HD, Wireless Headphones
    const names = [];
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const name = await card.locator('.product-info h3').textContent();
      names.push(name);
    }

    expect(names[0]).toBe('Mechanical Keyboard');
    expect(names[1]).toBe('Monitor Stand');
    expect(names[2]).toBe('Mouse Pad XL');
    expect(names[3]).toBe('USB-C Hub');
    expect(names[4]).toBe('Webcam HD');
    expect(names[5]).toBe('Wireless Headphones');
  });

  // 2.2 Sort by price low to high
  test('should-sort-products-by-price-low-to-high', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select "Price: Low to High" from sort dropdown
    const sortBy = page.locator('#sortBy');
    await sortBy.selectOption('price-low');

    // 3. Verify product order
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    // Verify ascending price order
    // First product is $24.99 (Mouse Pad XL), last is $129.99 (Mechanical Keyboard)
    const firstPrice = await productCards.first().locator('.product-price').textContent();
    const lastPrice = await productCards.last().locator('.product-price').textContent();

    expect(firstPrice).toBe('$24.99');
    expect(lastPrice).toBe('$129.99');

    // Verify all prices are in ascending order
    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productCards.nth(i).locator('.product-price').textContent();
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }

    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  // 2.3 Sort by price high to low
  test('should-sort-products-by-price-high-to-low', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Select "Price: High to Low" from sort dropdown
    const sortBy = page.locator('#sortBy');
    await sortBy.selectOption('price-high');

    // 3. Verify product order
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    // Verify descending price order
    // First product is $129.99 (Mechanical Keyboard), last is $24.99 (Mouse Pad XL)
    const firstPrice = await productCards.first().locator('.product-price').textContent();
    const lastPrice = await productCards.last().locator('.product-price').textContent();

    expect(firstPrice).toBe('$129.99');
    expect(lastPrice).toBe('$24.99');

    // Verify all prices are in descending order
    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productCards.nth(i).locator('.product-price').textContent();
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }

    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

  // 2.4 Sort works in combination with category filter
  test('should-sort-with-category-filter-combined', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Filter to "Electronics" category
    const categoryFilter = page.locator('#categoryFilter');
    await categoryFilter.selectOption('electronics');
    await page.waitForTimeout(500);

    // 3. Sort by "Price: Low to High"
    const sortBy = page.locator('#sortBy');
    await sortBy.selectOption('price-low');
    await page.waitForTimeout(500);

    // 4. Verify filtered and sorted results
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(4); // Only electronics products

    // Verify only electronics products are shown
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const category = await card.locator('.product-category').textContent();
      expect(category.toLowerCase()).toBe('electronics');
    }

    // Verify electronics products are sorted by ascending price
    const firstPrice = await productCards.first().locator('.product-price').textContent();
    const lastPrice = await productCards.last().locator('.product-price').textContent();

    // Electronics prices: USB-C Hub ($49.99), Webcam HD ($69.99), Wireless Headphones ($79.99), Mechanical Keyboard ($129.99)
    expect(firstPrice).toBe('$49.99');
    expect(lastPrice).toBe('$129.99');
  });

});