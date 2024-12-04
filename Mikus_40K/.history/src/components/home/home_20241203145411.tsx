import React from 'react';
import './home.css';
import image1 from '../../images/HALLOWEEN(1).png';
import image2 from '../../images/HALLOWEEN.png';
import image3 from '../../images/test.png';
import ImageCarousel from '../ImageCarousel';
import Sidebar from '../sidebar/Sidebar';
import ProductComponent from '../product/Product';

const images = [image1, image2, image3];

const Home: React.FC = () => {
  return (
    <>
      <div>
        <ImageCarousel images={images} />
      </div>
      <div>
        <Sidebar />
        <h3 className="products">PRODUCTOS DESTACADOS</h3>
        {/* Eliminamos la función de carrito local, ya no es necesaria */}
        <ProductComponent />
      </div>
    </>
  );
};

export default Home;
