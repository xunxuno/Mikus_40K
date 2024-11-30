import React, { useEffect, useState } from 'react';
import './Cart.css';
import { obtenerProductos, Product } from '../../models/ProductModel'; // Importamos la función para obtener productos desde el modelo

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await obtenerProductos(); // Obtenemos los productos desde la API
        // Inicialmente, asumimos que todos los productos están en el carrito
        setCartProducts(products);
      } catch (error) {
        console.error('Error al obtener productos para el carrito:', error);
      }
    };

    fetchCartProducts();
  }, []);

  // Calcular el total de la compra
  const calculateTotal = () => {
    return cartProducts
      .reduce((total, item) => total + item.price * item.quantity + (item.shippingPrice || 0), 0)
      .toFixed(2);
  };

  // Manejar el aumento de la cantidad
  const increaseQuantity = (id: number) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  // Manejar la reducción de la cantidad
  const decreaseQuantity = (id: number) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Eliminar un producto del carrito (con animación)
  const removeProduct = (id: number) => {
    const productToRemove = document.getElementById(`product-${id}`);
    if (productToRemove) {
      productToRemove.classList.add('remove-animation');
      setTimeout(() => {
        setCartProducts(cartProducts.filter((product) => product.id !== id));
      }, 500); // Espera el tiempo de la animación para eliminar el producto
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>

      {/* Tabla de productos */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Envío</th>
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
                  src={item.imageUrl}
                  alt={item.product_Name}
                  className="cart-item-image"
                />
              </td>
              <td>{item.product_Description}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.shippingPrice ? `$${item.shippingPrice.toFixed(2)}` : 'Gratis'}</td>
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
        <div className="summary-item total">
          <span>Total a Pagar:</span>
          <span>${calculateTotal()}</span>
        </div>
        <button className="checkout-button">Proceder al pago</button>
      </div>
    </div>
  );
};

export default Cart;
