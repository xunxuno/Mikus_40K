import React from 'react';
import './home.css';
import image1 from '../images/HALLOWEEN(1).png';
import image2 from '../images/HALLOWEEN.png';
import ImageCarousel from './ImageCarousel';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const images = [image1, image2];


function Home() {
    return (

        <div>
            <Navbar />
            <ImageCarousel images={images} />
            <Sidebar />
        </div>
    );
}

export default Home;