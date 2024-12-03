import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { 
  getOrCreatePendingCart, 
  addProductToCart, 
  updateProductQuantityInCart, 
  removeProductFromCart, 
  clearPendingCart 
} from '../../models/CartModel';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, clearCart, removeFromCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem } from '../../redux/cartSlice';
import { getAllProducts } from '../../controllers/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setCartProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = async () => {
    try {
      if (!userId) return alert('Inicia sesión para realizar la compra.');
      const pendingCart = await getOrCreatePendingCart(userId);

      for (const item of cartItems) {
        await addProductToCart(userId, {
          productId: item.productId,
          quantity: item.quantity,
        });
      }

      alert('Compra realizada exitosamente.');
      dispatch(clearCart());
      await clearPendingCart(userId);
    } catch (error) {
      console.error('Error durante el checkout:', error);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const product = cartProducts.find((item) => item.id === productId);
      if (product) {
        dispatch(
          addToCart({
            productId: product.id,
            quantity: 1,
            price: product.price || 0,
            productName: product.product_Name,  // Usar product_Name como en el modelo
            productDescription: product.product_Description,  // Usar product_Description como en el modelo
            imageUrl: product.image_path,
          })
        );
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const handleDecreaseQuantity = async (productId: number) => {
    try {
      const cartItem = cartItems.find((item) => item.productId === productId);
      if (cartItem && cartItem.quantity > 1) {
        await updateProductQuantityInCart(userId!, productId, cartItem.quantity - 1);
        dispatch(decreaseQuantity(productId));
      } else {
        handleRemoveFromCart(productId);
      }
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
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

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item) => {
            const cartItem = cartItems.find((cartItem) => cartItem.productId === item.id);
            if (!cartItem || cartItem.quantity === 0) return null;

            return (
              <tr key={item.id} className={isRemoving === item.id ? 'removing' : ''}>
                <td>
                  <img
                    src={item.image_path}
                    alt={item.product_Name}
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </td>
                <td>{item.product_Name}</td> {/* Usar product_Name como en el modelo */}
                <td>{item.product_Description}</td> {/* Usar product_Description como en el modelo */}
                <td>{cartItem.quantity}</td>
                <td>
                  <button onClick={() => handleAddToCart(item.id)} className="quantity-button">+</button>
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="quantity-button">-</button>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-button"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 className="cart-total">
        Total: $ 
        {cartProducts.reduce((total, item) => {
          const quantity = cartItems.find((cartItem) => cartItem.productId === item.id)?.quantity || 0;
          return total + (item.price || 0) * quantity;
        }, 0)}
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
