import { test, expect } from '@playwright/test';

test('guest can complete checkout using Cash on Delivery', async ({ page }) => {
    // Open the storefront page
    await page.goto('/');

    // Verify that the storefront loaded
    await expect(page).toHaveURL(/shopware6-demo/);

    // Search for a product.
    const searchBox = page.locator('#header-main-search-input');

    await searchBox.fill('Demo product');
    await searchBox.press('Enter');

    // Verify that the search results page is displayed
    await expect(page).toHaveURL(/\/search\?search=Demo\+product/);

    // Find and open the product from the search results
    await page.locator('a[href*="/Demo-Produkt/SW10001"]').click();

    // Verify that the product detail page is displayed
    await expect(page).toHaveURL(/Demo-Produkt\/SW10001/);

    // Add the product to the cart
    const addToCartButton = page.getByRole('button', {
        name: 'In den Warenkorb',
    });

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Verify that the product was added successfully
    await expect(page.getByRole('alert')).toContainText(
        '1 Produkt zum Warenkorb hinzugefügt.'
    );

    await page.goto('/checkout/cart');

    await expect(page).toHaveURL(/\/checkout\/cart/);

    await expect(page.getByText('Demo Produkt')).toBeVisible();

    // Proceed to checkout
    const checkoutButton = page.getByRole('link', { name: 'Zur Kasse' });

    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    await expect(page).toHaveURL(/\/checkout\/register/);

    // Fill in billing/customer information
    await page.locator('#billingAddress-personalFirstName').fill('Max');
    await page.locator('#billingAddress-personalLastName').fill('Mustermann');
    await page.locator('#personalMail').fill('max.mustermann@example.com');

    await page.locator('#billingAddress-AddressStreet').fill('Musterstraße 123');
    await page.locator('#billingAddressAddressZipcode').fill('12345');
    await page.locator('#billingAddressAddressCity').fill('Berlin');

    // Enable separate shipping address
    const differentShippingAddress = page.locator('#differentShippingAddress');

    await differentShippingAddress.check();

    await expect(
        page.locator('#shippingAddress-personalFirstName')
    ).toBeVisible();

    // Fill in shipping address
    await page.locator('#shippingAddress-personalFirstName').fill('Max');
    await page.locator('#shippingAddress-personalLastName').fill('Mustermann');
    await page.locator('#shippingAddress-AddressStreet').fill('Musterstraße 123');
    await page.locator('#shippingAddressAddressZipcode').fill('12345');
    await page.locator('#shippingAddressAddressCity').fill('Berlin');

    // Accept privacy policy and terms
    await page.getByRole('checkbox').last().check();

    // Continue
    const continueButton = page.getByRole('button', { name: 'Weiter' });

    await expect(continueButton).toBeVisible();
    await continueButton.click();

    await expect(page).toHaveURL(/\/checkout\/confirm/);

    // Wait for the confirmation page content to load
    await page.waitForLoadState('networkidle');

    // Accept the terms and conditions
    const termsCheckbox = page.locator('#tos');

    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();

    // Select Cash on Delivery
    const cashOnDelivery = page.getByText('Cash on delivery', {
        exact: true,
    });

    await expect(cashOnDelivery).toBeVisible();
    await cashOnDelivery.click();

    // Click the final order button
    const placeOrderButton = page.getByRole('button', {
        name: 'Zahlungspflichtig bestellen',
    });

    await expect(placeOrderButton).toBeVisible();
    await placeOrderButton.click();

    // Verify that the order was completed
    await expect(page).toHaveURL(/\/checkout\/finish\?orderId=/);

    const orderNumber = page.locator('.finish-ordernumber');

    await expect(orderNumber).toBeVisible();
    await expect(orderNumber).toHaveAttribute(
        'data-order-number',
        /\d+/
    );
});