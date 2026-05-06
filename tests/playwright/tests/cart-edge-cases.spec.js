// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Cart Edge Case Tests
 * Tests for cart count updates, decrease quantity, and button redirects
 * Covers scenarios: 9.1, 9.2, 9.3, 9.4
 */

test.describe('Cart Edge Cases', () => {

  // 9.1 Verify cart count updates when adding multiple items
  test('should-verify-cart-count-updates-with-multiple-items', async ({ page }) => {
    // 1. Navigate to homepage
    await page.request.delete('http://localhost:3000/api/cart');
    await page.goto('/');

    // 2. Clear cart via API (done above)

    // 3. Add product 1 to cart
    const addToCartBtns = page.locator('.add-to-cart-btn');
    await addToCartBtns.first().click();
    await page.waitForTimeout(500);

    // 4. Verify cart count is 1
    const cartCount = page.locator('#cartCount');
    await expect(cartCount).toHaveText('1');

    // 5. Add product 2 to cart
    await addToCartBtns.nth(1).click();
    await page.waitForTimeout(500);

    // 6. Verify cart count is 2
    await expect(cartCount).toHaveText('2');
  });

  // 9.2 Verify decrease quantity button works
  test('should-verify-decrease-quantity-button', async ({ page }) => {
    // 1. Navigate to /cart.html with an item
    await page.request.delete('http://localhost:3000/api/cart');
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 3 }
    });
    await page.goto('/cart.html');
    await page.waitForTimeout(500);

    // 2. Click decrease (-) button
    // First cart item has qty-btn buttons: first is -, second is +
    const qtyBtns = page.locator('.qty-btn');
    const decreaseBtn = qtyBtns.first(); // First button is the decrease (-) button
    await decreaseBtn.click();

    // Wait for update
    await page.waitForTimeout(500);

    // 3. Verify quantity decreases
    const qtyValue = page.locator('.qty-value').first();
    await expect(qtyValue).toHaveText('2');

    // Total is recalculated
    // Product 1 price is $79.99, so total should be $159.98
    const total = page.locator('#total');
    await expect(total).toContainText('159.98');
  });

  // 9.3 Verify "Start Shopping" button on empty cart redirects to homepage
  test('should-verify-start-shopping-button-redirects', async ({ page }) => {
    // 1. Clear cart
    await page.request.delete('http://localhost:3000/api/cart');

    // 2. Navigate to /cart.html
    await page.goto('/cart.html');

    // 3. Click "Start Shopping" button
    const startShoppingBtn = page.locator('#emptyCart a:has-text("Start Shopping")');
    await startShoppingBtn.click();

    // 4. Verify navigation
    // URL changes to "/"
    await expect(page).toHaveURL('/');
  });

  // 9.4 Verify "Proceed to Checkout" button redirects correctly
  test('should-verify-proceed-to-checkout-redirect', async ({ page }) => {
    // 1. Add an item to cart
    await page.request.delete('http://localhost:3000/api/cart');
    await page.request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 1 }
    });

    // 2. Navigate to /cart.html
    await page.goto('/cart.html');
    await page.waitForTimeout(500);

    // 3. Click "Proceed to Checkout"
    const checkoutBtn = page.locator('#checkoutBtn');
    await checkoutBtn.click();

    // 4. Verify navigation
    // URL changes to "/checkout.html"
    await expect(page).toHaveURL('/checkout.html');
  });

});