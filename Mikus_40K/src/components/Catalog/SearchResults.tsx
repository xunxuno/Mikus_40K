import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Product } from '../../models/ProductModel';
import '../product/Product.css';
import './SearchResults.css'

const SearchResults: React.FC = () => {
  // Obtiene los resultados de la búsqueda desde el estado de navegación
  const location = useLocation();
  const results = location.state?.results as Product[] || [];

  if (results.length === 0) {
    return <div className="no-results">No se encontraron resultados para tu búsqueda.</div>;
  }

  return (
    <div className='space'>
    <div className="products-container">
      {results.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
          <div className="product-card">
            <img src={product.image_path} alt={product.product_Name} className="product-card-img" />
            <h3>{product.product_Name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="shipping">
              {product.shippingType} {product.shippingPrice !== 0 && `- $${product.shippingPrice}`}
            </p>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default SearchResults;

