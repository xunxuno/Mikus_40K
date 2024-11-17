// ProductDetailController.ts
import { Product, products } from '../models/ProductModel';

// Función para obtener un producto por su ID
export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};
