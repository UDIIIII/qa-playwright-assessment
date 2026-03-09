import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

test("Verify max 6 related products displayed", async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.openProduct("https://example.com");

  const count = await productPage.getRelatedProductCount();

  expect(count).toBeLessThanOrEqual(6);
});
test("Verify navigation when clicking related product", async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.openProduct("https://example.com");

  await productPage.clickFirstRelatedProduct();

  await expect(page).toHaveURL(/product/);
});
