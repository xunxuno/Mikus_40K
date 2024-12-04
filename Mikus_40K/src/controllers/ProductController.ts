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