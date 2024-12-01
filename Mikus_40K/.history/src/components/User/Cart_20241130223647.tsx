import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import {CartController} from '../../controllers/cartController';

interface CartItem {
  productId: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [localCart, setLocalCart] = useState<CartItem[]>([]); // Carrito falso
  const userEmail = 'user@example.com'; // Reemplaza con el email real del usuario

  // Función para añadir un producto al carrito falso
  const addToLocalCart = (productId: number) => {
    setLocalCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  };

  // Enviar el carrito falso al servidor
  const handleCheckout = async () => {
    try {
      for (const item of localCart) {
        const success = await CartController.addItemToCart(userEmail, item);
        if (!success) {
          throw new Error(`No se pudo agregar el producto ${item.productId} al carrito`);
        }
      }
      console.log('Carrito sincronizado con el servidor');
      setLocalCart([]); // Limpiar el carrito local tras el envío
    } catch (error) {
      console.error('Error al sincronizar el carrito:', error);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item) => (
            <tr key={item.id}>
              <td>{item.product_Name}</td>
              <td>
                {
                  localCart.find((cartItem) => cartItem.productId === item.id)
                    ?.quantity || 0
                }
              </td>
              <td>
                <button onClick={() => addToLocalCart(item.id)}>Agregar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCheckout}>Comprar Ahora</button>
    </div>
  );
};

export default Cart;
