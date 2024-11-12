// Product.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

// Exportamos la interfaz Product para poder usarla en otros archivos
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shippingType: string;
  shippingPrice?: number;
  size?: string;
  weight?: string;
}

// Datos temporales de productos
const products: Product[] = [
  {
    id: 1,
    name: 'Miku Veraniega Edicion 5',
    description: 'Figura Miku edicion Veraniega.',
    price: 100,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 90,
    size: '25cm x 15cm x 10cm',
    weight: '500g'

  },
  {
    id: 2,
    name: 'Spacemarine',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 150,
    size: '30cm x 18cm x 12cm',
    weight: '700g'
  },
  {
    id: 3,
    name: 'Miku Maid',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 150,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 150,
    size: '20cm x 12cm x 8cm',
    weight: '400g'
  },
  {
    id: 4,
    name: 'Reductus Saboteur',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '28cm x 16cm x 10cm',
    weight: '900g'
  },
];

const Product: React.FC = () => {
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
