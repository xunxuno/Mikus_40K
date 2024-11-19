import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController';
import './Wishlist.css';

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<number[]>([]); // IDs de productos en la wishlist
  const products = getAllProducts(); // Obtiene todos los productos

  // Cargar los productos en la wishlist desde localStorage (o puedes usar un estado global)
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  // Filtrar los productos que están en la wishlist
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  // Función para eliminar un producto de la wishlist
  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(id => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Guardar en localStorage
  };

  return (
    <div className="wishlist-container">
      <h2>Mi Lista de Deseados</h2>
      <div className="products-container-1">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">${product.price}</p>
                <p className="shipping">Envío: {product.shippingType}</p>
              </Link>

              {/* Botón para eliminar de la wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita la redirección al hacer clic en el botón
                  removeFromWishlist(product.id);
                }}
                className="remove-btn"
                aria-label="Eliminar de la wishlist"
              >
                <span role="img" aria-label="Bote de basura" className="remove-icon">
                  🗑️
                </span>
              </button>
            </div>
          ))
        ) : (
          <p className='p-nothing'>No has agregado productos a tu wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
