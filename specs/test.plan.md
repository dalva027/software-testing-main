# TechMart - Test Plan for Untested Functionality

## 1. Product Category Filter

### 1.1 Filter products by Electronics category
- **Steps:**
  1. Navigate to homepage
  2. Select "Electronics" from the category filter dropdown
  3. Wait for products to re-render
  4. Verify only electronics products are displayed
  5. Verify exactly 4 products are shown
- **Verifications:**
  - Only products with category "electronics" are visible
  - Products count equals 4

### 1.2 Filter products by Accessories category
- **Steps:**
  1. Navigate to homepage
  2. Select "Accessories" from the category filter dropdown
  3. Wait for products to re-render
  4. Verify only accessories products are displayed
- **Verifications:**
  - Only products with category "accessories" are visible
  - Products count equals 2

### 1.3 Switch category filter back to All Categories
- **Steps:**
  1. Navigate to homepage
  2. Select a category (e.g., Electronics)
  3. Then select "All Categories" from dropdown
  4. Verify all 6 products are displayed again
- **Verifications:**
  - All 6 product cards are visible
  - Mixed categories are present

## 2. Product Sorting

### 2.1 Sort by name (alphabetical)
- **Steps:**
  1. Navigate to homepage
  2. Select "Name" from sort dropdown
  3. Verify product order
- **Verifications:**
  - Products are in alphabetical order by name
  - Order: Mechanical Keyboard, Monitor Stand, Mouse Pad XL, USB-C Hub, Webcam HD, Wireless Headphones

### 2.2 Sort by price low to high
- **Steps:**
  1. Navigate to homepage
  2. Select "Price: Low to High" from sort dropdown
  3. Verify product order
- **Verifications:**
  - Products are sorted by ascending price
  - First product is $24.99 (Mouse Pad XL), last is $129.99 (Mechanical Keyboard)

### 2.3 Sort by price high to low
- **Steps:**
  1. Navigate to homepage
  2. Select "Price: High to Low" from sort dropdown
  3. Verify product order
- **Verifications:**
  - Products are sorted by descending price
  - First product is $129.99 (Mechanical Keyboard), last is $24.99 (Mouse Pad XL)

### 2.4 Sort works in combination with category filter
- **Steps:**
  1. Navigate to homepage
  2. Filter to "Electronics" category
  3. Sort by "Price: Low to High"
  4. Verify filtered and sorted results
- **Verifications:**
  - Only electronics products are shown
  - Electronics products are sorted by ascending price

## 3. Price Range Filter

### 3.1 Filter products with price slider (low max price)
- **Steps:**
  1. Navigate to homepage
  2. Move price range slider to a low value (e.g., $60)
  3. Release slider to trigger filter
  4. Verify filtered products
- **Verifications:**
  - Only products with price <= $60 are shown
  - Products: USB-C Hub ($49.99), Mouse Pad XL ($24.99)

### 3.2 Filter products with price slider (high max price)
- **Steps:**
  1. Navigate to homepage
  2. Move price range slider to $90
  3. Verify filtered products
- **Verifications:**
  - Only products with price <= $90 are shown
  - Products: Wireless Headphones ($79.99), USB-C Hub ($49.99), Monitor Stand ($89.99), Webcam HD ($69.99), Mouse Pad XL ($24.99) = 5 products

### 3.3 Verify price value display updates as slider moves
- **Steps:**
  1. Navigate to homepage
  2. Move slider to value $100
  3. Verify the displayed price value text updates to show 100
- **Verifications:**
  - The priceValue span shows "100"

## 4. Search Functionality

### 4.1 Search for product by name (case-insensitive)
- **Steps:**
  1. Navigate to homepage
  2. Type "webcam" in search input
  3. Click search button
  4. Verify results
- **Verifications:**
  - Only Webcam HD product is shown
  - Single result

### 4.2 Search by partial name match
- **Steps:**
  1. Navigate to homepage
  2. Type "keyboard" in search input
  3. Click search button
  4. Verify results
- **Verifications:**
  - Mechanical Keyboard is shown
  - Single result

### 4.3 Search results clear when input is cleared
- **Steps:**
  1. Navigate to homepage
  2. Type a search term and search
  3. Clear the search input
  4. Click search button (or verify auto-clear behavior)
  5. Verify all products are shown again
- **Verifications:**
  - All 6 products are displayed after clearing

### 4.4 Search via Enter key press
- **Steps:**
  1. Navigate to homepage
  2. Type "headphones" in search input
  3. Press Enter key
  4. Verify results
- **Verifications:**
  - Wireless Headphones is shown
  - Search works without clicking the button

## 5. Product Display Details

### 5.1 Verify each product card displays all expected information
- **Steps:**
  1. Navigate to homepage
  2. Inspect a product card
  3. Verify all elements are present
- **Verifications:**
  - Product image is present with correct alt text
  - Product name is displayed
  - Category label is displayed
  - Price is displayed with dollar sign and 2 decimal places
  - Stock quantity text is displayed
  - Add to Cart button is present and enabled

### 5.2 Verify product names match expected values
- **Steps:**
  1. Navigate to homepage
  2. Read all product card names
- **Verifications:**
  - "Wireless Headphones", "Mechanical Keyboard", "USB-C Hub", "Monitor Stand", "Webcam HD", "Mouse Pad XL"

### 5.3 Verify product prices match expected values
- **Steps:**
  1. Navigate to homepage
  2. Read all product prices
- **Verifications:**
  - Prices: $79.99, $129.99, $49.99, $89.99, $69.99, $24.99

## 6. Stock Display

### 6.1 Verify low stock indicator is displayed for low-stock items
- **Steps:**
  1. Navigate to homepage
  2. Check stock display for products with stock < 5
- **Verifications:**
  - Products with stock < 5 show "Only X left!" text
  - Check Mouse Pad XL (stock: 5) boundary condition

## 7. Navigation Elements

### 7.1 Verify logo is clickable and navigates to homepage
- **Steps:**
  1. Navigate to any sub-page (e.g., /cart.html)
  2. Click the TechMart logo
  3. Verify navigation
- **Verifications:**
  - URL changes to "/"
  - Homepage content is displayed

### 7.2 Verify all nav links are accessible from every page
- **Steps:**
  1. Navigate to each page (/, /cart.html, /checkout.html, /login.html, /register.html)
  2. Verify logo link and cart link are visible on each page
- **Verifications:**
  - Logo always links to "/"
  - Cart link always visible

## 8. Toast Notifications

### 8.1 Verify toast displays on add to cart success
- **Steps:**
  1. Navigate to homepage
  2. Add an item to cart
  3. Verify toast appears with success message
- **Verifications:**
  - Toast is visible
  - Toast contains "Added to cart" text

### 8.2 Verify toast disappears after timeout
- **Steps:**
  1. Navigate to homepage
  2. Add an item to cart
  3. Wait for 4 seconds
  4. Verify toast is hidden
- **Verifications:**
  - Toast is no longer visible after timeout

### 8.3 Verify toast displays on login success
- **Steps:**
  1. Navigate to /login.html
  2. Fill valid credentials
  3. Submit form
  4. Verify toast message
- **Verifications:**
  - Toast shows "Login successful" text

### 8.4 Verify toast displays on checkout success
- **Steps:**
  1. Add item to cart
  2. Navigate to /checkout.html
  3. Fill all form fields
  4. Submit order
  5. Verify order confirmation modal
- **Verifications:**
  - Order confirmation modal is visible
  - Contains "Order Confirmed" text
  - Contains a non-empty order ID

## 9. Cart Functionality (additional edge cases)

### 9.1 Verify cart count updates when adding multiple items
- **Steps:**
  1. Navigate to homepage
  2. Clear cart via API
  3. Add product 1 to cart
  4. Verify cart count is 1
  5. Add product 2 to cart
  6. Verify cart count is 2
- **Verifications:**
  - Cart count reflects total quantity across all items

### 9.2 Verify decrease quantity button works
- **Steps:**
  1. Navigate to /cart.html with an item
  2. Click decrease (-) button
  3. Verify quantity decreases
- **Verifications:**
  - Quantity value decreases by 1
  - Total is recalculated

### 9.3 Verify "Start Shopping" button on empty cart redirects to homepage
- **Steps:**
  1. Clear cart
  2. Navigate to /cart.html
  3. Click "Start Shopping" button
  4. Verify navigation
- **Verifications:**
  - URL changes to "/"

### 9.4 Verify "Proceed to Checkout" button redirects correctly
- **Steps:**
  1. Add an item to cart
  2. Navigate to /cart.html
  3. Click "Proceed to Checkout"
  4. Verify navigation
- **Verifications:**
  - URL changes to "/checkout.html"

## 10. Authentication (additional scenarios)

### 10.1 Verify auth area updates after login (shows user name and logout button)
- **Steps:**
  1. Navigate to /login.html
  2. Login with valid credentials
  3. Wait for redirect to homepage
  4. Verify auth area content
- **Verifications:**
  - Auth area shows "Hi, Demo User"
  - Logout button is visible
  - Login and Sign Up links are removed

### 10.2 Verify login link redirects to login page
- **Steps:**
  1. Navigate to homepage
  2. Click "Login" link
  3. Verify URL
- **Verifications:**
  - URL changes to "/login.html"

### 10.3 Verify sign up link redirects to registration page
- **Steps:**
  1. Navigate to homepage
  2. Click "Sign Up" link
  3. Verify URL
- **Verifications:**
  - URL changes to "/register.html"

### 10.4 Verify registered user can login with new credentials
- **Steps:**
  1. Navigate to /register.html
  2. Register a new account
  3. Wait for redirect
  4. Logout
  5. Navigate to /login.html
  6. Login with new credentials
  7. Verify success
- **Verifications:**
  - Login is successful
  - Toast shows success message

## 11. Checkout (additional scenarios)

### 11.1 Verify "Back to Cart" button on checkout page
- **Steps:**
  1. Navigate to /checkout.html
  2. Click "Back to Cart" button
  3. Verify navigation
- **Verifications:**
  - URL changes to "/cart.html"

### 11.2 Verify Continue Shopping link on order confirmation
- **Steps:**
  1. Complete a checkout
  2. Click "Continue Shopping" in confirmation modal
  3. Verify navigation
- **Verifications:**
  - URL changes to "/"

### 11.3 Verify checkout form displays correct order summary items
- **Steps:**
  1. Add products 1 and 2 (quantity 1 each) to cart
  2. Navigate to /checkout.html
  3. Verify order summary sidebar
- **Verifications:**
  - Both items are listed in order summary
  - Subtotal reflects correct sum
  - Tax is calculated correctly (8%)
  - Total reflects subtotal + tax

## 12. Footer

### 12.1 Verify footer displays on homepage
- **Steps:**
  1. Navigate to homepage
  2. Verify footer element
- **Verifications:**
  - Footer is visible
  - Contains copyright text with TechMart

## 13. Hero Section

### 13.1 Verify hero section content on homepage
- **Steps:**
  1. Navigate to homepage
  2. Verify hero section
- **Verifications:**
  - Hero section with heading and description text is visible
  - Heading contains "Welcome to TechMart"

## 14. Cross-page Cart Count Consistency

### 14.1 Verify cart count updates on non-home pages
- **Steps:**
  1. Navigate to /cart.html
  2. Add item to cart from cart page (or add via API)
  3. Navigate to /login.html
  4. Verify cart count is correct on login page
- **Verifications:**
  - Cart count is consistent across pages

---

## Summary of Test Coverage Gaps

| Area | # of Untest Scenarios | Priority |
|---|---|---|
| Category Filter (All, Electronics, Accessories, revert) | 3 | High |
| Sorting (Name, Price Low-High, Price High-Low, combined) | 4 | High |
| Price Range Filter (low, high, display update) | 3 | High |
| Search (partial match, case-insensitive, clear, Enter key) | 4 | High |
| Product Display (card details, names, prices, stock indicators) | 4 | Medium |
| Navigation (logo, cross-page links) | 2 | Medium |
| Toast Notifications (success, timeout, login, checkout) | 4 | Medium |
| Cart (multi-item count, decrease qty, Start Shopping, Proceed to Checkout) | 4 | Medium |
| Authentication (post-login UI, login/signup link redirects, register-then-login) | 4 | Medium |
| Checkout (Back to Cart, Continue Shopping, order summary) | 3 | Medium |
| Footer & Hero Section | 2 | Low |
| Cross-page Cart Count Consistency | 1 | Low |
| **Total Untest Scenarios** | **34** | |
