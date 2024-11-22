// components/ProductCatalog.tsx
import React, { useEffect, useState } from 'react';
import { Product, obtenerProductos } from '../../models/ProductModel';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import './ProductCatalog.css';

const ProductCatalog: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]); // Estado para almacenar los productos
  const [cargando, setCargando] = useState<boolean>(true); // Estado para saber si está cargando
  const [error, setError] = useState<string>(''); // Estado para manejar errores

  useEffect(() => {
    // Función para cargar los productos desde la API
    const cargarProductos = async () => {
      try {
        const productosData = await obtenerProductos(); // Llamamos a la función para obtener productos
        setProductos(productosData); // Guardamos los productos en el estado
        setCargando(false); // Cambiamos el estado de carga
      } catch (error) {
        setError('Hubo un error al cargar los productos');
        setCargando(false); // También dejamos de cargar en caso de error
      }
    };

    cargarProductos(); // Ejecutamos la función de carga
  }, []); // El arreglo vacío asegura que se ejecute solo una vez cuando el componente se monte

  // Si está cargando, mostramos un mensaje de carga
  if (cargando) {
    return <div className="loading">Cargando productos...</div>;
  }

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="catalog-container">
      {productos.map((product: Product) => (
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