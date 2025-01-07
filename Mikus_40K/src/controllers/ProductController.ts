// controllers/ProductController.ts
import { obtenerProductos } from '../models/ProductModel'; // Importamos la función obtenerProductos desde el modelo
import type { Product } from '../models/ProductModel'; // Importación tipo-only para Product

export type { Product }; // Exportamos el tipo Product

// Función que llama a obtener productos desde el modelo
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productos = await obtenerProductos(); // Llamamos a la función del modelo
    return productos; // Devolvemos los productos obtenidos
  } catch (error) {
    console.error('Error al obtener productos en getAllProducts:', error);
    throw error; // Lanza el error para que lo manejen más arriba
  }
};

// Función que obtiene un producto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const allProducts = await getAllProducts(); // Obtenemos todos los productos
    const product = allProducts.find((p) => p.id === id); // Filtramos por ID
    return product || null; // Retornamos el producto encontrado o null si no se encuentra
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    return null; // En caso de error, retornamos null
  }
};
