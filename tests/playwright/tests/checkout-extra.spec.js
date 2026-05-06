// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Checkout Extra Tests
 * Tests for Back to Cart button, Continue Shopping link, and order summary
 * Covers scenarios: 11.1, 11.2, 11.3
 */

test.describe('Checkout Extra Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cart and add items before each test
    await page.request.delete('http://localhost:3000/api/cart');
  });

  // 11.1 Verify "Back to Cart" button on checkout page
  test('should-verify-back-to-cart-button', async ({ page }) => {
    // 1. Add an item to cart
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });

    // 2. Navigate to /checkout.html
    await page.goto('/checkout.html');

    // 3. Click "Back to Cart" button
    const backToCartBtn = page.locator('.btn:has-text("Back to Cart")');
    await backToCartBtn.click();

    // 4. Verify navigation
    // URL changes to "/cart.html"
    await expect(page).toHaveURL('/cart.html');
  });

  // 11.2 Verify Continue Shopping link on order confirmation
  test('should-verify-continue-shopping-link', async ({ page }) => {
    // 1. Add an item to cart
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });

    // 2. Navigate to /checkout.html
    await page.goto('/checkout.html');

    // Fill checkout form
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

    // 3. Submit order
    await page.locator('#placeOrderBtn').click();

    // 4. Click "Continue Shopping" in confirmation modal
    const continueShoppingBtn = page.locator('#orderConfirmation a:has-text("Continue Shopping")');
    await continueShoppingBtn.click();

    // 5. Verify navigation
    // URL changes to "/"
    await expect(page).toHaveURL('/');
  });

  // 11.3 Verify checkout form displays correct order summary items
  test('should-verify-correct-order-summary', async ({ page }) => {
    // 1. Add products 1 and 2 (quantity 1 each) to cart
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 2, quantity: 1 }
    });

    // 2. Navigate to /checkout.html
    await page.goto('/checkout.html');
    await page.waitForTimeout(500);

    // 3. Verify order summary sidebar
    const orderSummary = page.locator('.order-summary-sidebar');
    await expect(orderSummary).toBeVisible();

    // Both items are listed in order summary
    const orderItems = page.locator('.order-item');
    await expect(orderItems).toHaveCount(2);

    // Verify product names in order summary
    const itemNames = [];
    for (let i = 0; i < 2; i++) {
      const name = await orderItems.nth(i).locator('.item-name').textContent();
      itemNames.push(name);
    }
    expect(itemNames.some(n => n.includes('Wireless Headphones'))).toBeTruthy();
    expect(itemNames.some(n => n.includes('Mechanical Keyboard'))).toBeTruthy();

    // Subtotal reflects correct sum
    // Product 1: $79.99, Product 2: $129.99, Subtotal: $209.98
    const subtotal = page.locator('#subtotal');
    await expect(subtotal).toContainText('209.98');

    // Tax is calculated correctly (8%)
    // Tax: $209.98 * 0.08 = $16.80 (rounded)
    const tax = page.locator('#tax');
    await expect(tax).toContainText('16.80');

    // Total reflects subtotal + tax
    // Total: $209.98 + $16.80 = $226.78
    const total = page.locator('#total');
    await expect(total).toContainText('226.78');
  });

});