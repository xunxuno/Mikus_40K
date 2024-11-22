import axiosInstance from './axiosInstance';

export interface Product {
  id: number;
  product_Name: string;
  price: number;
  product_Description: string;
  image_path: string;
  shippingType: string;
  shippingPrice: number;
  category: 'Miku' | 'Warhammer'; 
}

// Función para obtener todos los productos
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
