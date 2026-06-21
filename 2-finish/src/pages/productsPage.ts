import { BasePage } from '@pages/basePage';
import type { Locator, Page } from '@playwright/test';
import type { Product } from '@typings/product';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly countSummary: Locator;
  readonly productListTitle: Locator;

  readonly inputs: {
    readonly search: Locator;
    readonly sort: Locator;
  };

  readonly categoryButtons: {
    readonly all: Locator;
    readonly audio: Locator;
    readonly books: Locator;
    readonly computers: Locator;
    readonly electronics: Locator;
    readonly gaming: Locator;
    readonly homeAndKitchen: Locator;
    readonly wearables: Locator;
  };

  readonly productList: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page, '/products');

    this.title = page.getByTestId('products-title');
    this.countSummary = page.getByTestId('products-count-summary');
    this.productListTitle = page.getByTestId('product-list-title');

    this.inputs = {
      search: page.getByTestId('product-search'),
      sort: page.getByTestId('product-sort'),
    };

    this.categoryButtons = {
      all: page.getByTestId('products-category-all'),
      audio: page.getByTestId('products-category-audio'),
      books: page.getByTestId('products-category-books'),
      computers: page.getByTestId('products-category-computers'),
      electronics: page.getByTestId('products-category-electronics'),
      gaming: page.getByTestId('products-category-gaming'),
      homeAndKitchen: page.getByTestId('products-category-home-&-kitchen'),
      wearables: page.getByTestId('products-category-wearables'),
    };

    this.productList = page.getByTestId('product-list');
    this.productNames = this.productList.getByTestId('product-name');
  }

  async mockProducts(products: Product[]): Promise<void> {
    await this.page.route('**/api/v1/products', (route) => route.fulfill({ json: products }));
  }

  productByName(name: string): Locator {
    return this.productList.getByTestId('product-name').filter({ hasText: name });
  }

  productCard(index: number) {
    const card = this.productList.getByTestId('product-item').nth(index);

    return {
      container: card,
      name: card.getByTestId('product-name'),
      price: card.getByTestId('product-price'),
      category: card.getByTestId('product-category'),
      description: card.getByTestId('product-description'),
      quantityValue: card.getByTestId('product-quantity-value'),
      buttons: {
        decreaseQuantity: card.getByTestId('product-decrease-quantity'),
        increaseQuantity: card.getByTestId('product-increase-quantity'),
        addToCart: card.getByTestId('product-add-button'),
      },
    };
  }
}
