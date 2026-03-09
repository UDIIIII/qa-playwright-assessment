import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

test.describe("eBay Related Products Business Logic", () => {
  let productPage: ProductPage;
  const targetUrl = "itm/1950605167537";
  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.openProduct(targetUrl);
  });

  test("TC_002: Should display a maximum of 6 related products", async () => {
    const count = await productPage.getRelatedProductCount();
    expect(count).toBeLessThanOrEqual(6);
  });

  test("TC_005: All related products must be within ±20% of main price", async () => {
    const mainPrice = await productPage.getMainProductPrice();
    const relatedItems = await productPage.getRelatedProductData();

    const lowerBound = mainPrice * 0.8;
    const upperBound = mainPrice * 1.2;

    for (const item of relatedItems) {
      expect(
        item.price,
        `Product ${item.name} price ${item.price} is out of range`,
      ).toBeGreaterThanOrEqual(lowerBound);
      expect(
        item.price,
        `Product ${item.name} price ${item.price} is out of range`,
      ).toBeLessThanOrEqual(upperBound);
    }
  });

  test("TC_009: Should navigate to the correct page on click", async ({
    page,
  }) => {
    const relatedItems = await productPage.getRelatedProductData();
    const firstItemName = relatedItems[0].name;

    await productPage.relatedProducts.first().click();
    await expect(page).not.toHaveURL(new RegExp(targetUrl));
    await expect(page.locator("h1")).toContainText(firstItemName);
  });
});
