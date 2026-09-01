# Shopware 6 Storefront – QA Automation Exercise

This repository contains my automated test solution for the Solution25 QA / Automation Tester Intern practical exercise.

## Test Environment

The automated test targets the public Shopware 6 demo storefront:

https://www.shopware6-demo.development-s25.com/

The test was developed and executed using:

* Playwright
* TypeScript
* Chromium
* Windows 10 with WSL (Ubuntu)

## Setup

Install the project dependencies:

```bash
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running the Automated Test

Run the guest checkout test:

```bash
npx playwright test tests/guest-checkout.spec.ts
```

The test covers the complete guest checkout flow:

1. Open the storefront
2. Search for a product
3. Open the product
4. Add the product to the cart
5. Proceed to checkout as a guest
6. Enter customer and address information
7. Select Cash on Delivery
8. Accept the terms and conditions
9. Place the order
10. Verify the order confirmation and generated order number

To run the test with the browser visible:

```bash
npx playwright test tests/guest-checkout.spec.ts --headed
```

To view the Playwright HTML report:

```bash
npx playwright show-report
```