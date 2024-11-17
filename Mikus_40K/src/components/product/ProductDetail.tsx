// ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../controllers/ProductDetailController'; // Importamos el controlador
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(parseInt(id || ''));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <div className="product-price">
            <strong>Precio:</strong> ${product.price}
          </div>
          <div className="product-shipping">
            <strong>Envío:</strong> {product.shippingType} ({product.shippingPrice !== undefined ? `+$${product.shippingPrice}` : 'Gratis'})
          </div>
          <div className="product-size">
            <strong>Medidas:</strong> {product.size}
          </div>
          <div className="product-weight">
            <strong>Peso:</strong> {product.weight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
