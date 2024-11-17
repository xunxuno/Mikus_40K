// components/ProductCatalog.tsx
import React from 'react';
import { Product, products } from '../../models/ProductModel';
import './ProductCatalog.css'; 

const ProductCatalog: React.FC = () => {
  return (
    <div className="product-catalog">
      {products.map((product: Product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-shipping">
            {product.shippingType} {product.shippingPrice !== 0 && `- $${product.shippingPrice}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
