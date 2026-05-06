// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Product Display Details Tests
 * Tests for verifying product card elements, names, and prices
 * Covers scenarios: 5.1, 5.2, 5.3
 */

test.describe('Product Display', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 5.1 Verify each product card displays all expected information
  test('should-verify-product-card-displays-all-information', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Inspect product cards
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    // 3. Verify all elements are present on each product card
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);

      // Product image is present with correct alt text
      const image = card.locator('img');
      await expect(image).toBeVisible();
      const altText = await image.getAttribute('alt');
      expect(altText).toBeTruthy();

      // Product name is displayed
      const productName = card.locator('.product-info h3');
      await expect(productName).toBeVisible();
      const nameText = await productName.textContent();
      expect(nameText.length).toBeGreaterThan(0);

      // Category label is displayed
      const categoryLabel = card.locator('.product-category');
      await expect(categoryLabel).toBeVisible();
      const categoryText = await categoryLabel.textContent();
      expect(categoryText.length).toBeGreaterThan(0);

      // Price is displayed with dollar sign and 2 decimal places
      const priceElement = card.locator('.product-price');
      await expect(priceElement).toBeVisible();
      const priceText = await priceElement.textContent();
      expect(priceText).toMatch(/\$\d+\.\d{2}/);

      // Stock quantity text is displayed
      const stockElement = card.locator('.product-stock');
      await expect(stockElement).toBeVisible();
      const stockText = await stockElement.textContent();
      expect(stockText.length).toBeGreaterThan(0);

      // Add to Cart button is present and enabled
      const addToCartBtn = card.locator('.add-to-cart-btn');
      await expect(addToCartBtn).toBeVisible();
      const isDisabled = await addToCartBtn.isEnabled();
      expect(isDisabled).toBeTruthy();
    }
  });

  // 5.2 Verify product names match expected values
  test('should-verify-product-names-match-expected-values', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Read all product card names
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    const names = [];
    for (let i = 0; i < count; i++) {
      const name = await productCards.nth(i).locator('.product-info h3').textContent();
      names.push(name);
    }

    // Verify all expected names are present
    expect(names).toContain('Wireless Headphones');
    expect(names).toContain('Mechanical Keyboard');
    expect(names).toContain('USB-C Hub');
    expect(names).toContain('Monitor Stand');
    expect(names).toContain('Webcam HD');
    expect(names).toContain('Mouse Pad XL');
  });

  // 5.3 Verify product prices match expected values
  test('should-verify-product-prices-match-expected-values', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Read all product prices
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBe(6);

    const priceMap = {};
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const name = await card.locator('.product-info h3').textContent();
      const priceText = await card.locator('.product-price').textContent();
      priceMap[name] = priceText;
    }

    // Verify prices match expected values:
    // "Wireless Headphones", $79.99
    // "Mechanical Keyboard", $129.99
    // "USB-C Hub", $49.99
    // "Monitor Stand", $89.99
    // "Webcam HD", $69.99
    // "Mouse Pad XL", $24.99
    expect(priceMap['Wireless Headphones']).toBe('$79.99');
    expect(priceMap['Mechanical Keyboard']).toBe('$129.99');
    expect(priceMap['USB-C Hub']).toBe('$49.99');
    expect(priceMap['Monitor Stand']).toBe('$89.99');
    expect(priceMap['Webcam HD']).toBe('$69.99');
    expect(priceMap['Mouse Pad XL']).toBe('$24.99');
  });

});