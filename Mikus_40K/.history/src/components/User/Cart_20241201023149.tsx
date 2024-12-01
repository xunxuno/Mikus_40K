import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Product } from '../../models/ProductModel';
import { CartController } from '../../controllers/cartController';
import ProductComponent from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem } from '../../models/CartModel';  // Asegúrate de que el tipo esté bien importado
import { getAllProducts } from '../../controllers/ProductController';

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]); // Productos del servidor
  const userEmail = 'user@example.com'; // Reemplaza con el email real del usuario

  const cartItems = useSelector((state: RootState) => state.cart.items); // Obtener el carrito del estado de Redux
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
        const success = await CartController.addItemToCart(userEmail, item);
        if (!success) {
          // failedItems.push(item);
          console.log('Error sincronizando el producto', item);
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

  // Manejar agregar productos al carrito con los datos completos
  const handleAddToCart = (productId: number) => {
    const product = cartProducts.find((item) => item.id === productId);
    if (product) {
      const cartItem: CartItem = {
        productId: product.id,
        quantity: 1,  // Asegúrate de manejar la cantidad correctamente
        price: product.price,
        product_Name: product.product_Name,
        product_Description: product.product_Description,
        imageUrl: product.image_path,
      };
      dispatch(addToCart(cartItem)); // Asegúrate de que el payload sea un CartItem completo
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
          const price = item.price || 0; // Asegúrate de que price esté definido
          return total + price * quantity;
        }, 0)}
      </h2>
      <button className="checkout-button" onClick={handleCheckout}>
        Comprar Ahora
      </button>
    </div>
  );
};

export default Cart;
