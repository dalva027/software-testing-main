# TechMart — Software Testing Project

A comprehensive test suite for a demo e-commerce application, demonstrating modern software QA practices across functional, accessibility, API, and edge-case testing.

## Sample Application

**TechMart** is a single-page e-commerce app built with Node.js/Express that includes:

- Product catalog with category filtering and price sorting
- Shopping cart with real-time quantity management
- User authentication (register, login, logout)
- Checkout flow with shipping and payment forms
- RESTful API for all data operations


## Testing Framework

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Cross-browser UI automation (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) |
| [axe-core](https://www.deque.com/axe/) | Automated WCAG 2.0/2.1 AA accessibility auditing |
| Node.js / Express | Test server and API backend |

### Test Runner Configuration

- **Projects:** 5 browser targets (Desktop Chrome/Firefox/Safari + Mobile Chrome/Safari)
- **Execution:** Serial (to maintain consistent state with in-memory storage)
- **Auto-start:** Dev server launched automatically via `webServer` config hook
- **Artifacts:** Screenshot on failure, trace files on retry, HTML report

## Types of Tests (23 test files, 565+ individual tests)

| Category | Files | What It Covers |
|---|---|---|
| **Functional — UI** | 12 files | Homepage rendering, product listing, navigation, hero section, footer |
| **Category Filter** | 1 file | Filtering by Electronics, Accessories, and reverting to All |
| **Product Sorting** | 1 file | Name, price low-to-high, price high-to-low, combined with filter |
| **Price Range Filter** | 1 file | Slider interaction, value display updates, boundary conditions |
| **Search** | 1 file | Case-insensitive match, partial match, empty input, Enter key |
| **Shopping Cart** | 2 files | Add/remove items, quantity updates, cart count, empty state |
| **Cart Edge Cases** | 1 file | Multi-item count, decrease quantity, navigation buttons |
| **Checkout** | 2 files | Form validation, empty cart redirect, order confirmation, order summary |
| **Checkout Edge Cases** | 1 file | Back to Cart, Continue Shopping, tax calculation |
| **Authentication** | 2 files | Login, register, logout, duplicate email, link redirects |
| **Toast Notifications** | 1 file | Add-to-cart toast, timeout dismissal, login/checkout toasts |
| **Navigation** | 1 file | Logo navigation, cross-page link consistency |
| **Accessibility** | 2 files | Alt text, form labels, heading hierarchy, color contrast, keyboard nav, axe/wcag audit |
| **API** | 1 file | Products, cart, auth, and health endpoints (23 API tests) |
| **Mocking** | 1 file | API response mocking for out-of-stock and add-to-cart failure scenarios |
| **Edge Cases** | 1 file | Whitespace search, empty cart checkout, duplicate registration |
| **Cross-Page State** | 1 file | Cart count consistency across pages |

## Test Results

| Browser | Status |
|---|---|
| Desktop Chrome | Passing |
| Desktop Firefox | Passing |
| Desktop WebKit | Passing |
| Mobile Chrome | Passing |
| Mobile Safari | Minor failures (checkout validation, cart count) |

**Overall:** ~95% pass rate. Remaining failures are browser-specific (Mobile Safari form validation quirks) and edge-case tests that expose gaps in the sample app's validation logic.

## Test Artifacts

| Artifact | Location |
|---|---|
| HTML Report | `tests/playwright/playwright-report/index.html` |
| Failure Screenshots | `tests/playwright/test-results/<test-name>/test-failed-1.png` |
| Trace Files | `tests/playwright/test-results/` (`.zip`) |
| Test Plan | `specs/test.plan.md` |

## AI Agent-Assisted Testing

This project used Claude Code's specialized Playwright test generation agents to:

1. **Analyze** the running application at `localhost:3000` and identify all testable features
2. **Compare** existing test coverage against a comprehensive test plan (34 scenarios identified)
3. **Generate** 14 new test files covering category filters, sorting, price range, search, product display, stock indicators, toast notifications, navigation, authentication flows, checkout edge cases, footer/hero sections, and cross-page state consistency
4. **Debug** locator mismatches by inspecting the actual HTML structure of each page

## QA Concepts Demonstrated

- **Cross-browser testing** — Same tests across 5 browser/engine targets
- **Test pyramid** — API tests (fast, no browser) at the base, UI tests at the top
- **Edge-case testing** — Whitespace input, empty states, duplicate operations
- **Accessibility testing** — axe-core WCAG audit + manual checks for alt text, labels, headings, contrast, keyboard navigation
- **API mocking** — Simulating failure responses to test error handling paths
- **Test isolation** — Cart cleanup via `page.request.delete` in `beforeEach`
- **Page-object awareness** — Locators derived from actual DOM structure, not guessed
- **Test planning** — Structured test plan with prioritized scenarios before implementation

## Running Tests

```bash
# From tests/playwright/
npx playwright test                          # All browsers, headed
npx playwright test --headed                # Headed mode
npx playwright test --project=chromium      # Single browser
npx playwright test tests/cart.spec.js      # Single file
npx playwright show-report                  # Open HTML report
```
