import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { CartController } from '../../controllers/cartController';

interface CartItem {
  productId: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]); // Productos del servidor
  const [localCart, setLocalCart] = useState<CartItem[]>([]); // Carrito falso
  const userEmail = 'user@example.com'; // Reemplaza con el email real del usuario

  // Función para añadir un producto al carrito falso
  const addToLocalCart = (productId: number) => {
    setLocalCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex((item) => item.productId === productId);

      if (index !== -1) {
        updatedCart[index].quantity += 1;
      } else {
        updatedCart.push({ productId, quantity: 1 });
      }

      return updatedCart;
    });
  };

  // Sincronizar carrito local con productos disponibles
  useEffect(() => {
    const syncLocalCart = () => {
      setLocalCart((prevCart) =>
        prevCart.filter((item) =>
          cartProducts.some((product) => product.id === item.productId)
        )
      );
    };
    syncLocalCart();
  }, [cartProducts]);

  // Enviar el carrito falso al servidor
  const handleCheckout = async () => {
    const failedItems: CartItem[] = [];
    try {
      for (const item of localCart) {
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
        setLocalCart([]); // Limpiar el carrito local tras el envío
      }
    } catch (error) {
      console.error('Error general al sincronizar el carrito:', error);
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
      <h2 className="cart-total">
        Total: $
        {cartProducts.reduce((total, item) => {
          const quantity =
            localCart.find((cartItem) => cartItem.productId === item.id)?.quantity ||
            0;
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
