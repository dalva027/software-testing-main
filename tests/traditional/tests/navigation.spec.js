// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Navigation Elements Tests
 * Tests for verifying logo navigation and cross-page nav link accessibility
 * Covers scenarios: 7.1, 7.2
 */

test.describe('Navigation Elements', () => {

  // 7.1 Verify logo is clickable and navigates to homepage
  test('should-verify-logo-navigates-to-homepage', async ({ page }) => {
    // 1. Navigate to any sub-page (e.g., /cart.html)
    await page.goto('/cart.html');

    // 2. Click the TechMart logo
    const logo = page.locator('.logo');
    await logo.click();

    // 3. Verify navigation
    // URL changes to "/"
    await expect(page).toHaveURL('/');

    // Homepage content is displayed
    await expect(page.locator('.hero h1')).toContainText('Welcome to TechMart');
    await expect(page.locator('#productGrid')).toBeVisible();
  });

  // 7.2 Verify all nav links are accessible from every page
  test('should-verify-nav-links-from-every-page', async ({ page }) => {
    const pages = ['/', '/cart.html', '/checkout.html', '/login.html', '/register.html'];

    for (const pageUrl of pages) {
      // 1. Navigate to each page
      await page.goto(pageUrl);

      // 2. Verify logo link and cart link are visible on each page

      // Logo always links to "/"
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
      const logoHref = await logo.getAttribute('href');
      expect(logoHref).toBe('/');

      // Cart link always visible
      const cartLink = page.locator('.cart-link');
      await expect(cartLink).toBeVisible();
      const cartHref = await cartLink.getAttribute('href');
      expect(cartHref).toBe('/cart.html');
    }
  });

});