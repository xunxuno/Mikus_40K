// controllers/ProductDetailController.ts
import { obtenerProductos } from '../models/ProductModel'; // Asegúrate de que la ruta sea correcta
import { Product } from '../models/ProductModel';

// Función para obtener un producto por su id
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const productos = await obtenerProductos(); // Obtén todos los productos
    const product = productos.find(product => product.id === id); // Busca el producto por id
    return product || null; // Si no lo encuentra, devuelve null
  } catch (error) {
    console.error('Error al obtener producto por id:', error);
    return null; // Devuelve null si hay un error
  }
};
