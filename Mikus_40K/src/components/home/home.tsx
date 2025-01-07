import React from 'react';
import './home.css';
import image1 from '../../../public/images/HALLOWEEN(1).png';
import image2 from '../../../public/images/HALLOWEEN.png';
import image3 from '../../../public/images/test.png';
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
        <ProductComponent />
      </div>
    </>
  );
};

export default Home;
