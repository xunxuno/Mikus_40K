// components/Product.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../controllers/ProductController';
import './Product.css';

const Product: React.FC = () => {
  const products = getAllProducts();

  return (
    <div className="products-container">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-link">
          <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="shipping">Envío: {product.shippingType}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Product;
