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
    const response = await axiosInstance.get('/api/products/search', {
      params: { product_Name: nombre },
    }); // Enviamos `product_Name` como parámetro
    console.log('Resultados de búsqueda:', response.data);

    return response.data; // Retorna los productos encontrados
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al buscar productos:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; // Lanza el error
  }
};

export const getProductName = async (productId: number): Promise<string> => {
  try {
    const response = await axiosInstance.get(`api/product-details/${productId}`);
    return response.data.product_name; // Retorna el nombre del producto
  } catch (error) {
    console.error('Error al obtener el nombre del producto:', error);
    return 'Nombre no disponible'; // Devuelve un valor predeterminado en caso de error
  }
};