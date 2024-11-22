import React, { useEffect, useState } from 'react';
import './home.css';
import { Product, obtenerProductos } from '../../models/ProductModel'; // Asegúrate de importar el tipo correcto
import image1 from '../../images/HALLOWEEN(1).png';
import image2 from '../../images/HALLOWEEN.png';
import image3 from '../../images/test.png';
import ImageCarousel from '../ImageCarousel';
import Sidebar from '../sidebar/Sidebar';
import ProductComponent from '../product/Product';

const images = [image1, image2, image3];

const Home: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]); // Estado para productos

  useEffect(() => {
    const cargarProductos = async () => {
      const productosData = await obtenerProductos(); // Llamar a la API para obtener productos
      setProductos(productosData); // Establecer los productos en el estado
    };

    cargarProductos();
  }, []);

  return (
    <>
      <div>
        <ImageCarousel images={images} />
      </div>
      <div>
        <Sidebar />
        <h3 className='products'>PRODUCTOS DESTACADOS</h3>
        {/* <ProductComponent productos={productos} />*/}
        
      </div>
    </>
  );
};

export default Home;
