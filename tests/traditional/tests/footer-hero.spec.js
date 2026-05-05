// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Footer and Hero Section Tests
 * Tests for footer display on homepage and hero section content
 * Covers scenarios: 12.1, 13.1
 */

test.describe('Footer and Hero Section', () => {

  test.beforeEach(async ({ page }) => {
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');
  });

  // 12.1 Verify footer displays on homepage
  test('should-verify-footer-displays-on-homepage', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Verify footer element
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Contains copyright text with TechMart
    await expect(footer).toContainText('TechMart');
    await expect(footer).toContainText('2024');
  });

  // 13.1 Verify hero section content on homepage
  test('should-verify-hero-section-content', async ({ page }) => {
    // 1. Navigate to homepage (done in beforeEach)

    // 2. Verify hero section
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Heading contains "Welcome to TechMart"
    const heroHeading = hero.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Welcome to TechMart');

    // Description text is visible
    const heroDescription = hero.locator('p');
    await expect(heroDescription).toBeVisible();
    await expect(heroDescription).toContainText('tech accessories');
  });

});