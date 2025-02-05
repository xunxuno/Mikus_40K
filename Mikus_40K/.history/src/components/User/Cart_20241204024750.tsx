import React, { useEffect, useState } from 'react';
import './Cart.css';
import { 
  getOrCreatePendingCart, 
  removeProductFromCart, 
  clearPendingCart, 
  getCartItems,
  updateProductQuantityInCart
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
        const formattedItems = items.map((item: any) => {
          return {
            ...item,
            productId: item.product_id, // Mapear product_id a productId
          };
        });
        dispatch(setCartItems(formattedItems)); // Actualizar Redux con los items del carrito
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };
    

    fetchCart();
  }, [userId, dispatch]);

  const handleAddToCart = async (productId: number) => {
    try {
      const existingItem = cartItems.find((item: CartItem) => item.productId === productId);

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;

        // Llamamos a la función updateProductQuantityInCart con el formato correcto
        await updateProductQuantityInCart(userId!, {
          productId: existingItem.productId,
          quantity: updatedQuantity,
          price: existingItem.price || 0
        });

        dispatch(addToCart({ productId, quantity: 1, price: existingItem.price }));
      } else {
        // Si el producto no existe, lo agregamos con una cantidad de 1
        await updateProductQuantityInCart(userId!, {
          productId,
          quantity: 1,
          price: 0
        });

        dispatch(addToCart({ productId, quantity: 1, price: 0 }));
      }

      alert('Cantidad del producto actualizada en el carrito.');
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
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
  
    const existingItem = cartItems.find((item: CartItem) => item.productId === productId);
    console.log('existingItem: ', existingItem); // Verifica que esta línea esté mostrando el valor correcto de productId
  
    if (existingItem) {
      const payload = {
        userId: userId!,
        productId: existingItem.productId, // Usamos productId aquí
        quantity: newQuantity,
        price: existingItem.price || 0,
      };
      console.log('payload productId: ', payload.productId); // Aquí deberías ver el valor correcto de productId
  
      try {
        // Llamada a la función con el formato correcto
        await updateProductQuantityInCart(userId!, payload);
  
        // Actualizamos Redux con la nueva cantidad
        dispatch(addToCart({
          productId: existingItem.productId, // Usamos productId aquí
          quantity: newQuantity - existingItem.quantity, // Solo modificamos la diferencia
          price: existingItem.price
        }));
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
      }
    } else {
      console.error('Producto no encontrado para actualización');
    }
  };
  
  

  const handleCheckout = async () => {
    try {
      if (!userId) return alert('Inicia sesión para realizar la compra.');
      if (!cartId) return alert('No se pudo obtener el carrito pendiente.');

      for (const item of cartItems) {
        await updateProductQuantityInCart(userId!, item); // Usar la función para actualizar cantidades durante el checkout
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
          {cartItems.map((item: CartItem) => (
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
