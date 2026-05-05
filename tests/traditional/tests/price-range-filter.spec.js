// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Price Range Filter Tests
 * Tests for filtering products by price using the range slider
 * Covers scenarios: 3.1, 3.2, 3.3
 */

test.describe('Price Range Filter', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 3.1 Filter products with price slider (low max price)
  test('should-filter-products-with-low-max-price', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Move price range slider to a low value (e.g., $60)
    const priceRange = page.locator('#priceRange');
    await page.evaluate((slider) => {
      slider.value = 60;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }, await priceRange.elementHandle());

    // 3. Wait for filter to apply
    await page.waitForTimeout(500);

    // 4. Verify filtered products
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Only products with price <= $60 are shown
    // Products: USB-C Hub ($49.99), Mouse Pad XL ($24.99)
    expect(count).toBe(2);

    // Verify the specific products shown
    const productNames = [];
    for (let i = 0; i < count; i++) {
      const name = await productCards.nth(i).locator('.product-info h3').textContent();
      productNames.push(name);
    }

    expect(productNames).toContain('USB-C Hub');
    expect(productNames).toContain('Mouse Pad XL');

    // Verify no product exceeds $60
    for (let i = 0; i < count; i++) {
      const priceText = await productCards.nth(i).locator('.product-price').textContent();
      const price = parseFloat(priceText.replace('$', ''));
      expect(price).toBeLessThanOrEqual(60);
    }
  });

  // 3.2 Filter products with price slider (high max price)
  test('should-filter-products-with-high-max-price', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Move price range slider to $90
    const priceRange = page.locator('#priceRange');
    await page.evaluate((slider) => {
      slider.value = 90;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }, await priceRange.elementHandle());

    // 3. Wait for filter to apply
    await page.waitForTimeout(500);

    // 4. Verify filtered products
    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Only products with price <= $90 are shown
    // Products: Wireless Headphones ($79.99), USB-C Hub ($49.99), Monitor Stand ($89.99), Webcam HD ($69.99), Mouse Pad XL ($24.99)
    // = 5 products (Mechanical Keyboard at $129.99 is excluded)
    expect(count).toBe(5);

    // Verify the specific products shown
    const productNames = [];
    for (let i = 0; i < count; i++) {
      const name = await productCards.nth(i).locator('.product-info h3').textContent();
      productNames.push(name);
    }

    expect(productNames).toContain('Wireless Headphones');
    expect(productNames).toContain('USB-C Hub');
    expect(productNames).toContain('Monitor Stand');
    expect(productNames).toContain('Webcam HD');
    expect(productNames).toContain('Mouse Pad XL');

    // Verify Mechanical Keyboard is NOT shown
    expect(productNames).not.toContain('Mechanical Keyboard');
  });

  // 3.3 Verify price value display updates as slider moves
  test('should-update-price-value-display-when-slider-moves', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Move slider to value $100
    const priceRange = page.locator('#priceRange');
    await page.evaluate((slider) => {
      slider.value = 100;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }, await priceRange.elementHandle());

    // 3. Verify the displayed price value text updates to show 100
    const priceValue = page.locator('#priceValue');
    await expect(priceValue).toHaveText('100');
  });

});