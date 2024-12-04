import React, { useEffect, useState } from 'react';
import './Cart.css';
import { CartController } from '../../controllers/cartController';
import { Product } from '../../models/ProductModel';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const userEmail = 'usuario@ejemplo.com'; // Simulando el email del usuario autenticado

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await CartController.fetchCart(userEmail); // Obtener carrito desde el controlador
        if (cart && cart.items) {
          const transformedProducts: Product[] = cart.items.map((item) => ({
            id: item.productId,
            product_Name: item.product_Name || 'Producto sin nombre',
            product_Description: item.product_Description || 'Sin descripción',
            price: item.price,
            quantity: item.quantity,
            shippingPrice: item.shippingPrice || 0,
            imageUrl: item.imageUrl || '',
            image_path: item.imageUrl || '', // Usa el mismo campo si no tienes otro
            shippingType: 'standard', // Valor predeterminado (puedes cambiarlo según tu lógica)
            category: 'general', // Valor predeterminado para la categoría
          }));
          setCartProducts(transformedProducts); // Actualizamos el estado con productos transformados
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };
  
    fetchCart();
  }, [userEmail]);
  

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateShipping = () => {
    return cartProducts
      .reduce((shipping, item) => shipping + (item.shippingPrice || 0), 0)
      .toFixed(2);
  };

  const increaseQuantity = async (id: number) => {
    const product = cartProducts.find((item) => item.id === id);
    if (product) {
      try {
        await CartController.addItemToCart(userEmail, { productId: id, quantity: 1 });
        setCartProducts(
          cartProducts.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } catch (error) {
        console.error('Error al aumentar la cantidad:', error);
      }
    }
  };

  const decreaseQuantity = async (id: number) => {
    const product = cartProducts.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      try {
        await CartController.addItemToCart(userEmail, { productId: id, quantity: -1 });
        setCartProducts(
          cartProducts.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } catch (error) {
        console.error('Error al disminuir la cantidad:', error);
      }
    }
  };

  /*const removeProduct = async (id: number) => {
    const productToRemove = document.getElementById(`product-${id}`);
    if (productToRemove) {
      productToRemove.classList.add('remove-animation');
      setTimeout(async () => {
        try {
          await CartController.clearCartItems(userEmail);
          setCartProducts(cartProducts.filter((product) => product.id !== id));
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      }, 500);
    }
  };*/

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            {!isMobile && <th>Descripción</th>}
            <th>Precio</th>
            {!isMobile && <th className="shipping-column">Envío</th>}
            <th>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item: Product) => (
            <tr id={`product-${item.id}`} key={item.id}>
              <td>
                <img
                  src={item.image_path}
                  alt={item.product_Name}
                  className="cart-item-image"
                />
              </td>
              {!isMobile && <td>{item.product_Description}</td>}
              <td>${item.price.toFixed(2)}</td>
              {!isMobile && <td className="shipping-column">
                {item.shippingPrice ? `$${item.shippingPrice.toFixed(2)}` : 'Gratis'}
              </td>}
              <td>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="quantity-button"
                >
                  +
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="quantity-input"
                />
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className={`quantity-button ${item.quantity <= 1 ? 'disabled' : ''}`}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </td>
              <td>
                ${(
                  item.price * item.quantity +
                  (item.shippingPrice || 0)
                ).toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => removeProduct(item.id)}
                  className="remove-button"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="summary-item">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
        {!isMobile && (
          <div className="summary-item">
            <span>Total de Envío:</span>
            <span>${calculateShipping()}</span>
          </div>
        )}
        <div className="summary-item total">
          <span>Total a Pagar:</span>
          <span>
            ${(
              parseFloat(calculateTotal()) + parseFloat(calculateShipping())
            ).toFixed(2)}
          </span>
        </div>
        <button className="checkout-button">Proceder al pago</button>
      </div>
    </div>
  );
};

export default Cart;
