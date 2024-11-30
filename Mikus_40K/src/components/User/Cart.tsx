import React, { useEffect, useState } from 'react';
import './Cart.css';
import { obtenerProductos, Product } from '../../models/ProductModel';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await obtenerProductos(); // Obtenemos los productos desde la API
        setCartProducts(products);
      } catch (error) {
        console.error('Error al obtener productos para el carrito:', error);
      }
    };

    fetchCartProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Definir si es móvil según el ancho de la ventana
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al inicio para verificar el tamaño inicial de la pantalla

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calcular el total de la compra, incluyendo los precios de envío como parte del total final.
  const calculateTotal = () => {
    return cartProducts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calcular el total de envío, solo sumando los costos de envío de los productos
  const calculateShipping = () => {
    return cartProducts
      .reduce((shipping, item) => shipping + (item.shippingPrice || 0), 0)
      .toFixed(2);
  };

  const increaseQuantity = (id: number) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    const productToRemove = document.getElementById(`product-${id}`);
    if (productToRemove) {
      productToRemove.classList.add('remove-animation');
      setTimeout(() => {
        setCartProducts(cartProducts.filter((product) => product.id !== id));
      }, 500);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            {!isMobile && <th>Descripción</th>} {/* Solo mostrar columna de descripción si no es móvil */}
            <th>Precio</th>
            {!isMobile && <th className="shipping-column">Envío</th>} {/* Solo mostrar columna de envío si no es móvil */}
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
              {!isMobile && <td>{item.product_Description}</td>} {/* Solo mostrar descripción si no es móvil */}
              <td>${item.price.toFixed(2)}</td>
              {!isMobile && <td className="shipping-column">
                {item.shippingPrice ? `$${item.shippingPrice.toFixed(2)}` : 'Gratis'}
              </td>} {/* Solo mostrar envío si no es móvil */}
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
