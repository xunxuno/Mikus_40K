import React from 'react';
import './Product.css';

// Definimos la interfaz Product dentro del componente
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shippingType: string; // Por ejemplo: "Standard", "Express"
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
  },
  {
    id: 2,
    name: 'Spacemarine',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
  },
  {
    id: 3,
    name: 'Miku Maid',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 150,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
  },
  {
    id: 4,
    name: 'Reductus Saboteur',
    description: 'Figura Spacemarine del videojuego Spacemarine 2.',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Gratis',
  },
  // Agrega más productos si es necesario
];

const ProductComponent: React.FC = () => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p> {/* Agregamos la clase 'description' */}
          <p className="price">${product.price}</p>
          <p className="shipping">Envío: {product.shippingType}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;