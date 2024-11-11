// ProductDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './Product'; // Importamos la interfaz Product desde Product.tsx
import './ProductDetail.css';

// Datos temporales de productos para simular la vista
const products: Product[] = [
  {
    id: 1,
    name: 'Miku Veraniega Edición 5',
    description: 'Figura Miku edición Veraniega. Perfecta para coleccionistas.',
    price: 100,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Estándar',
    shippingPrice: 10,
    size: '25cm x 15cm x 10cm',
    weight: '500g',
  },
  {
    id: 2,
    name: 'Spacemarine',
    description: 'Figura Spacemarine del videojuego Spacemarine 2. Impresionante detalle.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Exprés',
    shippingPrice: 20,
    size: '30cm x 18cm x 12cm',
    weight: '700g',
  },
  {
    id: 3,
    name: 'Miku Maid',
    description: 'Figura Miku como sirvienta en versión coleccionista.',
    price: 150,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '20cm x 12cm x 8cm',
    weight: '400g',
  },
  {
    id: 4,
    name: 'Reductus Saboteur',
    description: 'Figura de Reductus Saboteur del universo Warhammer 40k.',
    price: 300,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '28cm x 16cm x 10cm',
    weight: '900g',
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === parseInt(id || ''))!;

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
            <strong>Envío:</strong> {product.shippingType} ({product.shippingPrice > 0 ? `+$${product.shippingPrice}` : 'Gratis'})
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
