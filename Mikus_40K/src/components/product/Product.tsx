// components/Product.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController'; // Importamos la función desde el controlador
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import './Product.css';

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Define el tipo de products como Product[]
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Cargar wishlist desde localStorage al cargar el componente
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });

  useEffect(() => {
    // Obtener productos al cargar el componente
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts); // Establecer productos en el estado
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProducts();
  }, []); // Este efecto solo se ejecuta una vez al cargar el componente

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
            <img src={product.image_path} alt={product.product_Name} className="product-image" />
            <h3>{product.product_Name}</h3>
            <p className="description">{product.product_Description}</p>
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
