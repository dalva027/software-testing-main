// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Search Functionality Tests
 * Tests for product search including case-insensitive, partial match, clear, and Enter key
 * Covers scenarios: 4.1, 4.2, 4.3, 4.4
 */

test.describe('Search Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 4.1 Search for product by name (case-insensitive)
  test('should-search-by-name-case-insensitive', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Type "webcam" in search input
    const searchInput = page.locator('#searchInput');
    await searchInput.fill('webcam');

    // 3. Click search button
    const searchBtn = page.locator('#searchBtn');
    await searchBtn.click();

    // 4. Verify results
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Only Webcam HD product is shown
    expect(count).toBe(1);

    const name = await productCards.first().locator('.product-info h3').textContent();
    expect(name).toBe('Webcam HD');
  });

  // 4.2 Search by partial name match
  test('should-search-by-partial-name-match', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Type "keyboard" in search input
    const searchInput = page.locator('#searchInput');
    await searchInput.fill('keyboard');

    // 3. Click search button
    const searchBtn = page.locator('#searchBtn');
    await searchBtn.click();

    // 4. Verify results
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Mechanical Keyboard is shown
    expect(count).toBe(1);

    const name = await productCards.first().locator('.product-info h3').textContent();
    expect(name).toBe('Mechanical Keyboard');
  });

  // 4.3 Search results clear when input is cleared
  test('should-clear-results-when-input-is-cleared', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Type a search term and search
    const searchInput = page.locator('#searchInput');
    const searchBtn = page.locator('#searchBtn');

    await searchInput.fill('keyboard');
    await searchBtn.click();
    await page.waitForTimeout(500);

    // Verify search results are filtered
    let productCards = page.locator('.product-card');
    let count = await productCards.count();
    expect(count).toBe(1);

    // 3. Clear the search input
    await searchInput.clear();

    // 4. Click search button (or verify auto-clear behavior)
    await searchBtn.click();
    await page.waitForTimeout(500);

    // 5. Verify all products are shown again
    productCards = page.locator('.product-card');
    count = await productCards.count();
    expect(count).toBe(6);
  });

  // 4.4 Search via Enter key press
  test('should-search-via-enter-key-press', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Type "headphones" in search input
    const searchInput = page.locator('#searchInput');
    await searchInput.fill('headphones');

    // 3. Press Enter key
    await searchInput.press('Enter');

    // 4. Verify results
    await page.waitForTimeout(500);

    const productCards = page.locator('.product-card');
    const count = await productCards.count();

    // Wireless Headphones is shown
    expect(count).toBe(1);

    const name = await productCards.first().locator('.product-info h3').textContent();
    expect(name).toBe('Wireless Headphones');
  });

});