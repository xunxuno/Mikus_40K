import React, { useEffect, useState } from 'react';
import './Cart.css';
import { 
  getOrCreatePendingCart, 
  addProductToCart, 
  removeProductFromCart, 
  clearPendingCart, 
  getCartItems 
} from '../../models/CartModel';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart, setCartItems } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem } from '../../redux/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart: React.FC = () => {
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) return;

        const pendingCartId = await getOrCreatePendingCart(userId);
        setCartId(pendingCartId);

        const items = await getCartItems(pendingCartId);
        const formattedItems = items.map((item: any) => ({
          ...item,
          productId: item.productId,
        }));
        dispatch(setCartItems(formattedItems)); // Actualizar Redux con los items del carrito
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  const handleAddToCart = async (productId: number) => {
    try {
      const existingItem = cartItems.find((item) => item.productId === productId);

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;
        await addProductToCart(userId!, { productId, quantity: updatedQuantity, price: existingItem.price });
        dispatch(addToCart({ productId, quantity: 1, price: existingItem.price }));
      } else {
        await addProductToCart(userId!, { productId, quantity: 1, price: 0 });
        dispatch(addToCart({ productId, quantity: 1, price: 0 }));
      }

      alert('Producto actualizado en el carrito.');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      setIsRemoving(productId);
      await removeProductFromCart(userId!, productId);
      setTimeout(() => {
        dispatch(removeFromCart(productId));
        setIsRemoving(null);
      }, 500);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return; // No permitir cantidades negativas o cero

    const existingItem = cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      await addProductToCart(userId!, { productId, quantity: newQuantity, price: existingItem.price });
      dispatch(addToCart({ productId, quantity: newQuantity - existingItem.quantity, price: existingItem.price }));
    }
  };

  const handleCheckout = async () => {
    try {
      if (!userId) return alert('Inicia sesión para realizar la compra.');
      if (!cartId) return alert('No se pudo obtener el carrito pendiente.');

      for (const item of cartItems) {
        await addProductToCart(userId, item);
      }

      alert('Compra realizada exitosamente.');
      dispatch(clearCart());
      await clearPendingCart(userId);
    } catch (error) {
      console.error('Error durante el checkout:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId} className={isRemoving === item.productId ? 'removing' : ''}>
              <td>{item.product_name}</td>
              <td>
                <button 
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} 
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                {item.quantity}
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                  +
                </button>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="remove-button"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="cart-total">
        Total: $ 
        {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </h2>
      <div className="checkout-container">
        <button className="checkout-button" onClick={handleCheckout}>
          Comprar Ahora
        </button>
      </div>
    </div>
  );
};

export default Cart;
