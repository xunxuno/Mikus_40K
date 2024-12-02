import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from './authSlice'; // Asegúrate de importar correctamente la acción de logout

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { productId, price } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);  // Guardamos el carrito actualizado en localStorage
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.productId !== action.payload);
      saveCartToLocalStorage(state.items);  // Guardamos el carrito actualizado en localStorage
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart');  // Eliminamos el carrito de localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.items = [];
      localStorage.removeItem('cart');  // Limpiamos el carrito cuando se cierra sesión
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
