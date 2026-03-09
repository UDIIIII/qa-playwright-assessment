import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly relatedSection: Locator;
  readonly relatedProducts: Locator;
  readonly mainProductPrice: Locator;
  readonly mainProductCategory: Locator;

  constructor(page: Page) {
    this.page = page;

    this.relatedSection = page.locator("text=Similar sponsored items");
    this.relatedProducts = page.locator(".related-product-card");
    this.mainProductPrice = page.locator(".x-price-primary");
    this.mainProductCategory = page.locator(".breadcrumbs__item").last();
  }

  async openProduct(url: string) {
    await this.page.goto(url);

    await this.relatedSection.waitFor({ state: "visible", timeout: 10000 });
  }

  async getRelatedProductCount(): Promise<number> {
    return await this.relatedProducts.count();
  }

  async getMainProductPrice(): Promise<number> {
    const priceText = await this.mainProductPrice.innerText();
    return this.parsePrice(priceText);
  }

  async getRelatedProductData() {
    const products = await this.relatedProducts.all();
    return Promise.all(
      products.map(async (card) => {
        const priceText = await card.locator(".price-selector").innerText();
        const name = await card.locator(".product-title").innerText();
        return { name, price: this.parsePrice(priceText) };
      }),
    );
  }

  private parsePrice(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ""));
  }
}
