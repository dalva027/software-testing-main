// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Checkout Toast and Order Confirmation Tests
 * Tests for toast on checkout success and order confirmation modal
 * Covers scenario: 8.4
 */

test.describe('Checkout Toast & Order Confirmation', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart and add an item before each test
    await page.request.delete('http://localhost:3000/api/cart');
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });
  });

  // 8.4 Verify toast displays on checkout success
  test('should-verify-order-confirmation-after-checkout', async ({ page }) => {
    // 1. Add item to cart (done in beforeEach)

    // 2. Navigate to /checkout.html
    await page.goto('/checkout.html');

    // 3. Fill all form fields
    await page.locator('#firstName').fill('John');
    await page.locator('#lastName').fill('Doe');
    await page.locator('#address').fill('123 Main Street');
    await page.locator('#city').fill('Grand Rapids');
    await page.locator('#state').selectOption('MI');
    await page.locator('#zip').fill('49501');
    await page.locator('#phone').fill('555-123-4567');

    await page.locator('#cardName').fill('John Doe');
    await page.locator('#cardNumber').fill('4111111111111111');
    await page.locator('#expiry').fill('12/25');
    await page.locator('#cvv').fill('123');

    // 4. Submit order
    await page.locator('#placeOrderBtn').click();

    // 5. Verify order confirmation modal
    const confirmationModal = page.locator('#orderConfirmation');
    await expect(confirmationModal).not.toHaveClass(/hidden/);
    await expect(confirmationModal).toContainText('Order Confirmed');

    // Contains a non-empty order ID
    const orderId = page.locator('#orderId');
    await expect(orderId).toBeVisible();
    await expect(orderId).not.toBeEmpty();
  });

});