// components/Product.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController';
import './Product.css';

const Product: React.FC = () => {
  const products = getAllProducts();
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Cargar wishlist desde localStorage al cargar el componente
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });

  // Función para alternar el estado de wishlist
  const toggleWishlist = (productId: number) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Guardar en localStorage
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} className="product-link">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="shipping">Envío: {product.shippingType}</p>
          </Link>

          {/* Botón de wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita la redirección al hacer clic en el botón
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

        </div>
      ))}
    </div>
  );
};

export default Product;
