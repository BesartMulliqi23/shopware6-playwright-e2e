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
});