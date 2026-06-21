import { ProductCategory } from '@enums/productCategory';
import { faker } from '@faker-js/faker';
import type { Product } from '@typings/product';

export function generateProduct(id: number): Product {
  const dateInThePast = faker.date.past().toISOString();

  return {
    id,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 2500, dec: 2 })),
    stockQuantity: faker.number.int({ min: 0, max: 200 }),
    category: faker.helpers.enumValue(ProductCategory),
    imageUrl: '/images/iphone.png',
    createdAt: dateInThePast,
    updatedAt: dateInThePast,
  };
}

export function generateProducts(count = 8): Product[] {
  const products: Product[] = [];

  for (let i = 1; i <= count; i++) {
    products.push(generateProduct(i));
  }

  return products;
}
