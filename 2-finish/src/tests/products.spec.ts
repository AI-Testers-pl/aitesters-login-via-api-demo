import { expect, test } from '@fixtures/pages';
import { generateProducts } from '@helpers/productsGenerator';
import type { Product } from '@typings/product';

test.describe('Products page tests', () => {
  test('Products page renders mocked products', async ({ productsPage }) => {
    const mockedProducts: Product[] = generateProducts(200);
    const firstProduct = mockedProducts[0];

    await productsPage.mockProducts(mockedProducts);
    await productsPage.goTo();
    await expect(productsPage.title).toBeVisible();

    if (firstProduct) {
      await expect(productsPage.productByName(firstProduct.name)).toBeVisible();
    }
  });
});
