import React, { useEffect, useState } from 'react';
import './Sidebar.css';

// Asegúrate de importar la interfaz Product desde el archivo adecuado si ya la tienes definida
import { Product } from '../../models/ProductModel'; // Asumiendo que esta es la ubicación de tu interfaz Product

const Sidebar: React.FC = () => {
  // Datos temporales de productos (esto normalmente lo traerías de un estado global o API)
  const products: Product[] = [
    { id: 1, name: 'Miku Veraniega Edicion 5', description: 'Figura Miku edición Veraniega.', price: 100, imageUrl: 'https://via.placeholder.com/150', shippingType: 'Estándar' },
    { id: 2, name: 'Spacemarine', description: 'Figura Spacemarine del videojuego Spacemarine 2.', price: 200, imageUrl: 'https://via.placeholder.com/150', shippingType: 'Exprés' },
    { id: 3, name: 'Miku Maid', description: 'Figura Spacemarine del videojuego Spacemarine 2.', price: 150, imageUrl: 'https://via.placeholder.com/150', shippingType: 'Exprés' },
    { id: 4, name: 'Reductus Saboteur', description: 'Figura Spacemarine del videojuego Spacemarine 2.', price: 800, imageUrl: 'https://via.placeholder.com/150', shippingType: 'Gratis' },
  ];

  const [images, setImages] = useState<Product[]>([]);

  useEffect(() => {
    // Agregar más imágenes para dar la sensación de abundancia
    setImages([...products, ...products, ...products]); // Repetimos las imágenes para hacer más cantidad
  }, []);

  return (
    <div className="sidebar">
      {images.map((product) => (
        <div
          key={product.id}
          className="falling-image"
          style={{
            animationDelay: `${Math.random() * 5}s`, // Aleatorizamos el retraso
            left: `${Math.random() * 90}%`, // Posición aleatoria horizontal
            top: `${-Math.random() * 100}%`, // Posición inicial aleatoria arriba
            width: `${Math.random() * 50 + 30}px`, // Tamaño aleatorio entre 30px y 80px
            height: `${Math.random() * 50 + 30}px`, // Tamaño aleatorio entre 30px y 80px
          }}
        >
          <img src={product.imageUrl} alt={`Producto ${product.id}`} className="falling-img" />
        </div>
      ))}
      <p className="sidebar-text">Sidebar</p>
    </div>
  );
};

export default Sidebar;
