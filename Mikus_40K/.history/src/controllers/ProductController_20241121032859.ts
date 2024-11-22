// controllers/ProductController.ts
import { obtenerProductos } from '../models/ProductModel'; // Asegúrate de que la ruta sea correcta
import { Product } from '../models/ProductModel';

// Aquí puedes escribir la lógica que llama a la función obtenerProductos
export const obtenerProductosControlador = async (): Promise<Product[]> => {
  try {
    const productos = await obtenerProductos(); // Llamamos a la función del modelo
    return productos;
  } catch (error) {
    console.error('Error al obtener productos en el controlador:', error);
    throw error; // Lanza el error para que lo manejen más arriba
  }
};
