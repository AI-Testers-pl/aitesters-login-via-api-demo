import type { ProductCategory } from '@enums/productCategory';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: ProductCategory;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
