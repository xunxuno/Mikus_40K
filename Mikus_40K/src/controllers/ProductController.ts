// controllers/ProductController.ts

import { products, Product } from '../models/ProductModel';

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return products;
};
