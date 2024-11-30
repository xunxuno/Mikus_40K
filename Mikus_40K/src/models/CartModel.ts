import axiosInstance from './axiosInstance';

// Interfaz para los productos en el carrito
export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

// Interfaz para el carrito
export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
}

// Función para obtener o crear un carrito
export const getOrCreateCart = async (email: string): Promise<Cart> => {
  try {
    const response = await axiosInstance.post('/api/cart', {
      secureData: { email },
    });

    console.log('Carrito obtenido o creado:', response.data);
    return response.data; // Devuelve el carrito desde el servidor
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener o crear el carrito:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para añadir un producto al carrito
export const addProductToCart = async (
  email: string,
  product: Omit<CartItem, 'price'>
): Promise<{ mensaje: string }> => {
  try {
    const response = await axiosInstance.post('/api/cart/items', {
      secureData: { email },
      product,
    });

    console.log('Producto agregado al carrito:', response.data);
    return response.data; // Mensaje de confirmación del servidor
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al agregar producto al carrito:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};