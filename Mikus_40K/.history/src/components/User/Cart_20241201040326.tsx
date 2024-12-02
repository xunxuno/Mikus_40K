import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { CartController } from '../../controllers/cartController';
import ProductComponent from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem } from '../../models/CartModel';
import { getAllProducts } from '../../controllers/ProductController';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  //const userEmail = 'user@example.com'; // Reemplaza con el email real del usuario

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
    console.log('localStorage userEmail:', localStorage.getItem('userEmail'));

    const failedItems: CartItem[] = [];
    try {
      for (const item of cartItems) {
        const success = await CartController.addItemToCart(userEmail!, {
          productId: item.productId,
          quantity: item.quantity,
        });
        console.log('email: ', userEmail);        
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

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      <ProductComponent addToLocalCart={(productId: number) => handleAddToCart(productId)} />
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item) => (
            <tr key={item.id}>
              <td>{item.product_Name}</td>
              <td>
                {cartItems.find((cartItem: CartItem) => cartItem.productId === item.id)?.quantity ?? 0}
              </td>
              <td>
                <button onClick={() => handleAddToCart(item.id)}>Agregar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="cart-total">
        Total: $
        {cartProducts.reduce((total, item) => {
          const quantity =
            cartItems.find((cartItem: CartItem) => cartItem.productId === item.id)?.quantity || 0;
          return total + (item.price || 0) * quantity;
        }, 0)}
      </h2>
      <button className="checkout-button" onClick={handleCheckout}>
        Comprar Ahora
      </button>
    </div>
  );
};

export default Cart;
