import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController';
import './Product.css';

interface Product {
  id: number;
  product_Name: string;
  product_Description: string;
  image_path: string;
  price: number;
  shippingType: string;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Usamos el tipo Product[] para los productos
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Cargar wishlist desde localStorage al cargar el componente
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });

  // Cargar los productos desde getAllProducts() al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts(); // Esto debería retornar un arreglo de productos del tipo Product[]
      setProducts(productsData);
    };

    fetchProducts();
  }, []); // Este useEffect solo se ejecuta una vez al montar el componente

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
              toggleWishlist(product.id);  // Aseguramos que product.id nunca sea undefined
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
