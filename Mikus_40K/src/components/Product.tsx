import React from 'react';
import './Product.css'

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
    name: 'Producto 1',
    description: 'Descripción breve del producto 1.',
    price: 100,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción breve del producto 2.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
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
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="shipping">Envío: {product.shippingType}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;
