import React from 'react';
import './home.css';
import image1 from '../images/HALLOWEEN(1).png';
import image2 from '../images/HALLOWEEN.png';
import image3 from '../images/test.png'
import ImageCarousel from './ImageCarousel';
import Sidebar from './Sidebar';
import ProductComponent from './Product';
import imageProduct from '../images/si2.png'


const images = [image1, image2, image3];


function Home() {
    return (
        <>
            <div>
            <ImageCarousel images={images} />
            <Sidebar />
            </div>
            <div>
            <img src={imageProduct} alt="Product" />
            <ProductComponent />
            </div>
        </>

    );
}

export default Home;