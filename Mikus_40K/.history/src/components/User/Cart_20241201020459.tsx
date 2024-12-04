import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { CartController } from '../../controllers/cartController';
import ProductComponent from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';  // Importar RootState
import {getAllProducts} from '../../controllers/ProductController';
import { CartItem } from '../../models/CartModel';  // Asegúrate de que la ruta sea correcta


const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]); // Productos del servidor
  const userEmail = 'user@example.com'; // Reemplaza con el email real del usuario

  const cartItems = useSelector((state: RootState) => state.cart.items); // Obtener el carrito del estado de Redux
  const dispatch = useDispatch();

  // Cargar productos desde el servidor
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts(); // Asegúrate de que esta función traiga los productos
        setCartProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Sincronizar carrito con el servidor
  const handleCheckout = async () => {
    const failedItems: any[] = [];
    try {
      for (const item of cartItems) {
        const success = await CartController.addItemToCart(userEmail, item);
        if (!success) {
          failedItems.push(item);
        }
      }

      if (failedItems.length > 0) {
        console.error('Error al sincronizar los siguientes productos:', failedItems);
        alert('Algunos productos no pudieron ser sincronizados.');
      } else {
        console.log('Carrito sincronizado con el servidor');
        dispatch(clearCart()); // Limpiar el carrito en Redux tras el envío
      }
    } catch (error) {
      console.error('Error general al sincronizar el carrito:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      <ProductComponent addToLocalCart={(productId: number) => dispatch(addToCart(productId))} />
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
                {cartItems.find((cartItem: CartItem) => cartItem.productId === item.id)?.quantity || 0}
              </td>
              <td>
                <button onClick={() => dispatch(addToCart(item.id))}>Agregar</button>
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
          return total + item.price * quantity;
        }, 0)}
      </h2>
      <button className="checkout-button" onClick={handleCheckout}>
        Comprar Ahora
      </button>
    </div>
  );
};

export default Cart;
