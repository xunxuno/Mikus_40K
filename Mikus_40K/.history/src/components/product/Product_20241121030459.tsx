// components/Product.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../../models/ProductModel';
import type { Product } from '../../models/ProductModel';  // Usar type-only import
import './Product.css';

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
  const [cargando, setCargando] = useState<boolean>(true); // Estado para saber si está cargando
  const [error, setError] = useState<string>(''); // Estado para manejar errores
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Cargar wishlist desde localStorage al cargar el componente
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return savedWishlist;
  });

  useEffect(() => {
    // Llamada a la API para obtener los productos cuando el componente se monte
    const cargarProductos = async () => {
      try {
        const productosData = await obtenerProductos(); // Llamamos a la API
        setProducts(productosData); // Guardamos los productos en el estado
        setCargando(false); // Deja de cargar
      } catch (error) {
        setError('Hubo un error al cargar los productos');
        setCargando(false); // También dejamos de cargar en caso de error
      }
    };

    cargarProductos(); // Ejecutamos la función de carga
  }, []); // El arreglo vacío asegura que se ejecute solo una vez

  const toggleWishlist = (productId: number) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Guardar en localStorage
  };

  if (cargando) {
    return <div className="loading">Cargando productos...</div>; // Muestra el mensaje de carga mientras espera la respuesta
  }

  if (error) {
    return <div className="error">{error}</div>; // Muestra el mensaje de error si algo salió mal
  }

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
              if (product.id !== undefined) {  // Verificar que el id no sea undefined
                toggleWishlist(product.id);
              }
            }}
            className="favorite-btn"
            aria-label={wishlist.includes(product.id as number) ? 'Quitar de la wishlist' : 'Agregar a la wishlist'}
          > 
            {wishlist.includes(product.id as number) ? (
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
