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
  category?: 'Miku' | 'Warhammer';
  //quantity: number;
};

// Función para obtener todos los productos desde la API
export const obtenerProductos = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/api/products'); // Asegúrate de que esta es la URL correcta de tu API
    console.log('Productos recibidos:', response.data);

    return response.data; // Devuelve los productos recibidos de la API
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener productos:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; // Lanza el error para que pueda ser manejado más arriba
  }
};