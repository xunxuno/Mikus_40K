import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController'; // Importamos la función desde el controlador
import { addProductToCart, getOrCreatePendingCart, updateProductQuantityInCart, getProductQuantityInCart } from '../../models/CartModel'; // Importamos funciones de la API
import { useSelector } from 'react-redux'; // Para acceder al estado de usuario
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import { RootState } from '../../redux/store'; // Estado global
import './Product.css';

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (productId: number) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = async (product: Product) => {
    if (!userId) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      // Asegurarse de que el usuario tiene un carrito pendiente
      const cart_id = await getOrCreatePendingCart(userId);

      // Verificar si el producto ya está en el carrito
      const existingProduct = await getProductQuantityInCart(cart_id, product.id);

      if (existingProduct>=1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        await updateProductQuantityInCart(userId, {
          productId: product.id,
          quantity: existingProduct + 1, // Aumentamos la cantidad
          price: product.price || 0
        });
        alert(`La cantidad del producto "${product.product_Name}" fue actualizada en el carrito.`);
      } else {
        // Si el producto no está en el carrito, lo agregamos normalmente
        await addProductToCart(userId, {
          productId: product.id,
          quantity: 1,
          price: product.price || 0,
        });
        alert(`El producto "${product.product_Name}" fue agregado al carrito.`);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('Hubo un error al agregar el producto al carrito. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} className="product-link">
            <img src={product.image_path} alt={product.product_Name} className="product-image" />
            <h3>{product.product_Name}</h3>
            <p className="description">{product.product_Description}</p>
            <p className="price">${product.price}</p>
            <p className="shipping">Envío: {product.shippingType}</p>
          </Link>

          {/* Botón de wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="favorite-btn"
            aria-label={wishlist.includes(product.id) ? 'Quitar de la wishlist' : 'Agregar a la wishlist'}
          >
            {wishlist.includes(product.id) ? (
              <span role="img" aria-label="Corazón" className="favorite-icon">
                ❤️
              </span>
            ) : (
              <span role="img" aria-label="Agregar a la wishlist" className="favorite-icon">
                ➕
              </span>
            )}
          </button>

          {/* Botón para agregar al carrito */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="cart-btn"
            aria-label="Agregar al carrito"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
