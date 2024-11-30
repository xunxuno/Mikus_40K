import React, { useEffect, useState } from 'react';
import './home.css';
import image1 from '../../images/HALLOWEEN(1).png';
import image2 from '../../images/HALLOWEEN.png';
import image3 from '../../images/test.png';
import ImageCarousel from '../ImageCarousel';
import Sidebar from '../sidebar/Sidebar';
import ProductCatalog from '../Catalog/Catalog'; // Asegúrate de importar ProductCatalog correctamente
import { obtenerProductos, Product } from '../../models/ProductModel'; // Importamos la función y la interfaz

const images = [image1, image2, image3];

const Home: React.FC = () => {
  const [productosDestacados, setProductosDestacados] = useState<Product[]>([]); // Estado para los productos destacados
  const [cargando, setCargando] = useState<boolean>(true); // Estado para saber si está cargando
  const [error, setError] = useState<string>(''); // Estado para manejar errores

  useEffect(() => {
    // Función para cargar los productos destacados
    const cargarProductosDestacados = async () => {
      try {
        const productosData = await obtenerProductos(); // Llamamos a la API para obtener los productos
        setProductosDestacados(productosData); // Guardamos los productos en el estado
        setCargando(false); // Cambiamos el estado de carga
      } catch (error) {
        setError('Hubo un error al cargar los productos destacados');
        setCargando(false); // También dejamos de cargar en caso de error
      }
    };

    cargarProductosDestacados(); // Ejecutamos la función para cargar los productos
  }, []); // El arreglo vacío asegura que se ejecute solo una vez cuando el componente se monte

  return (
    <>
      <div>
        <ImageCarousel images={images} />
      </div>
      <div>
        <Sidebar />
        <h3 className="products">PRODUCTOS DESTACADOS</h3>
        {/* Si está cargando, mostramos el mensaje de carga; si hay un error, lo mostramos */}
        {cargando ? (
          <div className="loading">Cargando productos destacados...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ProductCatalog productos={productosDestacados} /> // Pasamos los productos destacados a ProductCatalog
        )}
      </div>
    </>
  );
};

export default Home;
