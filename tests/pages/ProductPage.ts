import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly relatedProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.relatedProducts = page.locator(".related-product");
  }

  async openProduct(url: string) {
    await this.page.goto(url);
  }

  async getRelatedProductCount() {
    return await this.relatedProducts.count();
  }

  async clickFirstRelatedProduct() {
    await this.relatedProducts.first().click();
  }
}
