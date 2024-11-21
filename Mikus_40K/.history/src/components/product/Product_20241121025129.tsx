import React, { useEffect, useState } from 'react';
import { obtenerProductos, Product } from './models/productModel'; // Asegúrate de importar la función
import './productList.css'; // Estilos si los necesitas

const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]); // Estado para los productos
  const [cargando, setCargando] = useState<boolean>(true); // Estado para saber si está cargando
  const [error, setError] = useState<string>(''); // Estado para manejar errores

  useEffect(() => {
    // Llamada a la API para obtener los productos cuando el componente se monte
    const cargarProductos = async () => {
      try {
        const productosData = await obtenerProductos(); // Llamamos a la API
        setProductos(productosData); // Guardamos los productos en el estado
        setCargando(false); // Deja de cargar
      } catch (error) {
        setError('Hubo un error al cargar los productos');
        setCargando(false); // También dejamos de cargar en caso de error
      }
    };

    cargarProductos(); // Ejecutamos la función de carga
  }, []); // El arreglo vacío asegura que se ejecute solo una vez

  if (cargando) {
    return <div className="loading">Cargando productos...</div>; // Muestra el mensaje de carga mientras espera la respuesta
  }

  if (error) {
    return <div className="error">{error}</div>; // Muestra el mensaje de error si algo salió mal
  }

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <div className="product-items">
        {productos.map((producto) => (
          <div className="product-card" key={producto.id}>
            <h3>{producto.name}</h3>
            <p>{producto.description}</p>
            <p>${producto.price}</p>
            <img
              src={producto.imageUrl}
              alt={producto.name}
              className="product-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
