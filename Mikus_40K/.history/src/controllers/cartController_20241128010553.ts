import { getOrCreateCart, addProductToCart, CartItem, Cart } from '../models/CartModel';

export const CartController = {
  // Obtener o crear un carrito
  async fetchCart(email: string): Promise<Cart | null> {
    try {
      const cart = await getOrCreateCart(email);
      console.log('Carrito cargado:', cart);
      return cart;
    } catch (error: unknown) {
      console.error('Error al cargar el carrito:', error);
      return null; // En caso de error, devuelve null
    }
  },

  // Agregar un producto al carrito
  async addItemToCart(email: string, product: Omit<CartItem, 'price'>): Promise<boolean> {
    try {
      const response = await addProductToCart(email, product);
      console.log(response.mensaje); // Mensaje de confirmación
      return true; // Indica que la operación fue exitosa
    } catch (error: unknown) {
      console.error('Error al agregar producto al carrito:', error);
      return false; // Indica que la operación falló
    }
  },

};
