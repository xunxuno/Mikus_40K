import axiosInstance from './axiosInstance';
import { CartItem } from '../redux/cartSlice';

interface OrderPayload {
  userId: number;
  cartId: number;
}

interface OrderResponse {
  id: number;
  user_id: number;
  total_price: number;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name: string; // Suponiendo que traes el nombre del producto
}

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  created_at: string;
  items: ProductItem[]; // Aquí se define que un pedido puede tener una lista de productos asociados
}

export interface ProductItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name: string;
}

// Función para obtener o crear un carrito pendiente
export const getOrCreatePendingCart = async (userId: number): Promise<number> => {
  try {
    // Enviar el userId directamente al backend
    const response = await axiosInstance.post('/api/cart', { userId });
    console.log("userId: ", userId);

    console.log('Carrito pendiente obtenido o creado:', response.data);
    return response.data.cartId; // Devuelve el ID del carrito desde el servidor
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener o crear el carrito pendiente:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para agregar un producto al carrito pendiente
export const addProductToCart = async (
  userId: number,
  product: Omit<CartItem, 'imageUrl'>
): Promise<{ mensaje: string }> => {
  try {
    const payload = {
      userId,
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
      product_name: product.product_name
    };

    const response = await axiosInstance.post('/api/cart/add', payload);

    console.log('Producto agregado al carrito pendiente:', response.data);
    return response.data; // Mensaje de confirmación del servidor
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al agregar producto al carrito pendiente:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateProductQuantityInCart = async (
  userId: number,
  product: Omit<CartItem, 'imageUrl'>
): Promise<{ mensaje: string }> => {
  try {
    const payload = {
      userId,
      productId: product.productId,
      quantity: product.quantity,
    };

    const response = await axiosInstance.put('/api/cart/update-quantity', payload);

    console.log('Cantidad del producto actualizada:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al actualizar cantidad del producto:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para eliminar un producto del carrito
export const removeProductFromCart = async (
  userId: number,
  productId: number
): Promise<{ mensaje: string }> => {
  try {
    const payload = {
      userId,
      productId,
    };

    const response = await axiosInstance.delete('/api/cart/remove-product', { data: payload });

    console.log('Producto eliminado del carrito:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al eliminar producto del carrito:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para vaciar el carrito pendiente
export const clearPendingCart = async (userId: number): Promise<{ mensaje: string }> => {
  try {
    const payload = {
      userId,
    };

    const response = await axiosInstance.delete('/api/cart/clear', { data: payload });

    console.log('Carrito pendiente vaciado:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al vaciar el carrito pendiente:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

export const getProductQuantityInCart = async (cart_id: number, productId: number): Promise<{ quantity: number }> => {
  try {
    const response = await axiosInstance.get(`/api/cart/product/${cart_id}/${productId}`);
    return response.data || { quantity: 0 }; // Devuelve `null` si no hay datos
  } catch (error) {
    console.error('Error al verificar cantidad del producto en el carrito:', error);
    return { quantity: 0 }; // Si hay error, devolvemos cantidad 0
  }
};

// Función para obtener los items de un carrito
export const getCartItems = async (cart_id: number): Promise<CartItem[]> => {
  try {
    const response = await axiosInstance.get(`/api/cart/${cart_id}/items`);
    console.log('Items obtenidos del carrito:', response.data);
    return response.data; // Retorna los items del carrito
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener items del carrito:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};


export const createOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post('/api/create-order', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderHistory = async (userId: number): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get(`api/users/${userId}/order-history`);
    return response.data as Order[];
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
