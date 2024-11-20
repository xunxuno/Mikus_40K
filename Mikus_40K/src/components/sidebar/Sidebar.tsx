import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { products } from '../../models/ProductModel'; // Importamos los productos directamente desde el modelo

const Sidebar: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Extraemos solo las imágenes de los productos
    const imageUrls = products.map((product) => product.imageUrl);
    
    // Puedes repetir las imágenes si lo deseas para hacer que se vean más
    setImages([...imageUrls, ...imageUrls, ...imageUrls]);
  }, []);

  return (
    <div className="sidebar">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="falling-image"
          style={{
            animationDelay: `${Math.random() * 5}s`, // Aleatorizamos el retraso
            left: `${Math.random() * 90}%`, // Posición aleatoria horizontal
            top: `${-Math.random() * 100}%`, // Posición inicial aleatoria arriba
            width: `${Math.random() * 50 + 30}px`, // Tamaño aleatorio entre 30px y 80px
            height: `${Math.random() * 50 + 30}px`, // Tamaño aleatorio entre 30px y 80px
          }}
        >
          <img src={imageUrl} alt={`Producto ${index + 1}`} className="falling-img" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
