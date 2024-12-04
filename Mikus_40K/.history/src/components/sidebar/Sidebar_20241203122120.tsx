import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { obtenerProductos } from '../../models/ProductModel'; // Importamos la función para obtener productos desde la API

const Sidebar: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Llamamos a la API para obtener los productos
        const products = await obtenerProductos();
        // Extraemos las URLs de las imágenes
        const imageUrls = products.map((product) => product.image_path);
        // Opcionalmente duplicamos las imágenes para mayor visibilidad
        setImages([...imageUrls, ...imageUrls, ...imageUrls]);
      } catch (error) {
        console.error('Error al obtener imágenes para el sidebar:', error);
      }
    };

    fetchImages();
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
