// components/Product.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductosControlador } from '../../controllers/ProductController';
import './Product.css';

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar los productos
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Cargar wishlist desde localStorage al cargar el componente
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga de productos
  const [error, setError] = useState<string>(''); // Estado para manejar los errores

  // Función para obtener productos del controlador
  const cargarProductos = async () => {
    try {
      const productos = await obtenerProductosControlador(); // Llamamos al controlador
      setProducts(productos); // Establecemos los productos en el estado
      setLoading(false); // Cambiamos el estado de carga a falso
    } catch (error) {
      setError('Error al cargar los productos');
      setLoading(false); // Cambiamos el estado de carga a falso
    }
  };

  // Llamamos a cargarProductos cuando el componente se monta
  useEffect(() => {
    cargarProductos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
