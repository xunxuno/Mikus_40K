// models/ProductModel.ts
import axiosInstance from './axiosInstance'; // Asegúrate de tener configurada la instancia de Axios

export interface Product {
  id: number;
  product_Name: string;
  price: number;
  product_Description: string;
  image_path: string;
  shippingType: string;
  shippingPrice?: number;
  //category?: 'Miku' | 'Warhammer';
  quantity: number;
  /*size: string;  // Agregar tamaño
  weight: string; // Agregar peso
  imageUrl: string; */// Aseguramos que esta propiedad exista
};

// Función para obtener todos los productos desde la API
export const obtenerProductos = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/api/products'); 
    console.log('Productos recibidos:', response.data);

    return response.data; // Devuelve los productos recibidos de la API
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener productos:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; 
  }
};

export const buscarProductos = async (nombre: string): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(`/products/search`, {
      params: { query: nombre },
    });
    console.log('Resultados de búsqueda:', response.data);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al buscar productos:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};
