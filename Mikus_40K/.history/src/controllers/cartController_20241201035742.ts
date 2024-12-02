import { getOrCreateCart, addProductToCart, Cart,  CartItem} from '../models/CartModel';

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

  async addItemToCart(userEmail: string, product: Omit<CartItem, 'price'>): Promise<boolean> {
    try {
      const response = await addProductToCart(userEmail, product);
      console.log(response.mensaje);
      return true;
    } catch (error: unknown) {
      console.error('Error al agregar producto al carrito:', error);
      console.log('product: ', product);
      console.log('email: ', userEmail);
      return false;
    }
  }
};
