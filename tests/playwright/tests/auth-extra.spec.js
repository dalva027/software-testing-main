// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Authentication Extra Tests
 * Tests for login/signup link redirects and registered user login flow
 * Covers scenarios: 10.2, 10.3, 10.4
 */

test.describe('Authentication - Link Redirects & Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.request.delete('http://localhost:3000/api/cart');
  });

  // 10.2 Verify login link redirects to login page
  test('should-verify-login-link-redirects-to-login-page', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('/');

    // 2. Click "Login" link
    const loginLink = page.locator('#authArea a:has-text("Login")');
    await loginLink.click();

    // 3. Verify URL
    // URL changes to "/login.html"
    await expect(page).toHaveURL('/login.html');
  });

  // 10.3 Verify sign up link redirects to registration page
  test('should-verify-signup-link-redirects-to-registration-page', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('/');

    // 2. Click "Sign Up" link
    const signUpLink = page.locator('#authArea a:has-text("Sign Up")');
    await signUpLink.click();

    // 3. Verify URL
    // URL changes to "/register.html"
    await expect(page).toHaveURL('/register.html');
  });

  // 10.4 Verify registered user can login with new credentials
  test('should-verify-registered-user-can-login', async ({ page }) => {
    // 1. Navigate to /register.html
    await page.goto('/register.html');

    // 2. Register a new account with unique email
    const uniqueEmail = `user${Date.now()}@example.com`;
    await page.locator('#name').fill('New Test User');
    await page.locator('#email').fill(uniqueEmail);
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');

    // 3. Submit registration
    await page.locator('button[type="submit"]').click();

    // 4. Wait for redirect to homepage
    await page.waitForURL('/');
    await page.waitForTimeout(1000);

    // 5. Logout (to prepare for login step)
    const logoutBtn = page.locator('#logoutBtn');
    const isLogoutVisible = await logoutBtn.isVisible();
    if (isLogoutVisible) {
      await logoutBtn.click();
      await page.waitForTimeout(500);
    }

    // 6. Navigate to /login.html
    await page.goto('/login.html');

    // 7. Login with new credentials
    await page.locator('#email').fill(uniqueEmail);
    await page.locator('#password').fill('password123');
    await page.locator('button[type="submit"]').click();

    // 8. Verify success
    // Toast shows success message
    const toast = page.locator('#toast');
    await expect(toast).toContainText('Login successful');

    // Verify redirect to homepage
    await page.waitForURL('/');
  });

});