import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { CartController } from '../../controllers/cartController';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, clearCart, removeFromCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem } from '../../models/CartModel';
import { getAllProducts } from '../../controllers/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Cargar productos desde el servidor
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

  // Sincronizar carrito con el servidor
  const handleCheckout = async () => {
    const failedItems: CartItem[] = [];
    try {
      for (const item of cartItems) {
        const success = await CartController.addItemToCart(userEmail!, {
          productId: item.productId,
          quantity: item.quantity,
        });
        if (!success) {
          failedItems.push(item);
        }
      }

      if (failedItems.length > 0) {
        console.error('Error al sincronizar los siguientes productos:', failedItems);
        alert('Algunos productos no pudieron ser sincronizados.');
      } else {
        console.log('Carrito sincronizado con el servidor');
        dispatch(clearCart());
      }
    } catch (error) {
      console.error('Error general al sincronizar el carrito:', error);
    }
  };

  // Manejar agregar productos al carrito
  const handleAddToCart = (productId: number) => {
    const product = cartProducts.find((item) => item.id === productId);
    if (product) {
      const cartItem: CartItem = {
        productId: product.id,
        quantity: 1,
        price: product.price || 0,
        product_Name: product.product_Name,
        product_Description: product.product_Description,
        imageUrl: product.image_path,
      };
      dispatch(addToCart(cartItem));
    }
  };

  // Manejar disminuir cantidad
  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  // Manejar eliminar producto con animación
  const handleRemoveFromCart = (productId: number) => {
    setIsRemoving(productId);
    setTimeout(() => {
      dispatch(removeFromCart(productId));  // Eliminar el producto después de la animación
    }, 500); // Espera para que la animación ocurra antes de eliminar
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
            <th>Tipo de Envío</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item) => {
            const cartItem = cartItems.find((cartItem: CartItem) => cartItem.productId === item.id);
            if (!cartItem || cartItem.quantity === 0) return null; // No mostrar si la cantidad es 0

            return (
              <tr key={item.id} className={isRemoving === item.id ? 'removing' : ''}>
                <td>
                  <img src={item.image_path} alt={item.product_Name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                </td>
                <td>{item.product_Name}</td>
                <td>{item.product_Description}</td>
                <td>{item.shippingType}</td>
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
          const quantity = cartItems.find((cartItem: CartItem) => cartItem.productId === item.id)?.quantity || 0;
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
