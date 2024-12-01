import { getOrCreateCart, addProductToCart, Cart } from '../models/CartModel';

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
  async addItemToCart(email: string, product: { productId: number; quantity: number }): Promise<boolean> {
    try {
      const response = await addProductToCart(email, product);
      console.log(response.mensaje);
      return true;
    } catch (error: unknown) {
      console.error('Error al agregar producto al carrito:', error);
      return false;
    }
  }
  ,

};
