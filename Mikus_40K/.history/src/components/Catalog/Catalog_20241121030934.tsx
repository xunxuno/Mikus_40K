// components/ProductCatalog.tsx
import React from 'react';
import { Product, products } from '../../models/ProductModel';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import './ProductCatalog.css';

const ProductCatalog: React.FC = () => {
  return (
    <div className="catalog-container">
      {products.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="catalog-item-link">
          <div className="catalog-item">
            <img src={product.image_path} alt={product.product_Name} className="item-image" />
            <h3 className="item-title">{product.product_Name}</h3>
            <p className="item-price">${product.price.toFixed(2)}</p>
            <p className="item-shipping">
              {product.shippingType} {product.shippingPrice !== 0 && `- $${product.shippingPrice}`}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCatalog;
